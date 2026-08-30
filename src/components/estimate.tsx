import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRICE_NOTE } from "@/lib/orders";
import { useQuoteCart } from "@/lib/quote-store";
import { cn, formatKg, formatUah } from "@/lib/utils";

type Path = "sheet" | "cnc";

function parse(raw: string): number {
  const v = Number.parseFloat(raw.replace(",", "."));
  return Number.isFinite(v) ? v : 0;
}

export function Estimate() {
  const cartKg = useQuoteCart((s) => s.items.reduce((sum, i) => sum + i.weightKg, 0));
  const [path, setPath] = useState<Path>("cnc");
  const [qty, setQty] = useState("10");
  const [kg, setKg] = useState("");
  const [metalPrice, setMetalPrice] = useState("32");
  const [scrap, setScrap] = useState("10");
  const [minutes, setMinutes] = useState("40");
  const [rate, setRate] = useState("900");
  const [extra, setExtra] = useState("0");
  const [markup, setMarkup] = useState("1.6");

  function pickPath(next: Path) {
    setPath(next);
    setScrap(next === "sheet" ? "15" : "10");
    setRate(next === "sheet" ? "1200" : "900");
  }

  const r = useMemo(() => {
    const q = Math.max(1, Math.round(parse(qty)));
    const net = parse(kg);
    const metal = net * (1 + parse(scrap) / 100) * parse(metalPrice);
    const labor = (parse(minutes) / 60) * parse(rate);
    const add = parse(extra);
    const cost = metal + labor + add;
    const k = Math.max(1, parse(markup));
    const total = cost * k;
    return {
      q,
      net,
      metal,
      labor,
      add,
      cost,
      total,
      piece: total / q,
    };
  }, [qty, kg, scrap, metalPrice, minutes, rate, extra, markup]);

  const letter = [
    "Комерційна пропозиція",
    `Напрям: ${path === "sheet" ? "лист (розкрій)" : "ЧПУ"}`,
    `Кількість: ${r.q} шт`,
    r.net > 0 ? `Маса деталей: ${formatKg(r.net)}` : null,
    `Ціна за шт: ${formatUah(r.piece)}`,
    `Разом: ${formatUah(r.total)}`,
    "У ціні: метал з відходом і робота. Гибка / зварка / фарба / доставка — якщо не вписані окремо, не входять.",
    "КП дійсне 7 днів (метал рухається).",
    "Новому клієнту: передоплата 80% на метал до запуску.",
  ]
    .filter(Boolean)
    .join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(letter);
      toast.success("КП скопійовано");
    } catch {
      toast.error("Не вдалося скопіювати");
    }
  }

  return (
    <div className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
      <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">ПРОРАХУНОК</p>
      <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Ціна за годину</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{PRICE_NOTE}</p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {(
          [
            ["sheet", "Лист"],
            ["cnc", "ЧПУ"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => pickPath(id)}
            className={cn(
              "min-h-11 rounded-md text-sm",
              path === id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="qty" label="Кількість, шт" value={qty} onChange={setQty} />
        <div className="space-y-1.5">
          <Label htmlFor="kg">Маса всіх деталей, кг</Label>
          <Input id="kg" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} />
          {cartKg > 0 ? (
            <button
              type="button"
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setKg(String(Math.round(cartKg * 1000) / 1000))}
            >
              Підставити з калькулятора: {formatKg(cartKg)}
            </button>
          ) : (
            <Link to="/calculator" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
              Спочатку порахуйте масу в калькуляторі
            </Link>
          )}
        </div>
        <Field id="price" label="Метал, грн/кг" value={metalPrice} onChange={setMetalPrice} />
        <Field id="scrap" label="Відхід, %" value={scrap} onChange={setScrap} />
        <Field id="min" label="Час верстата, хв" value={minutes} onChange={setMinutes} />
        <Field id="rate" label="Ставка, грн/год" value={rate} onChange={setRate} />
        <Field id="extra" label="Гибка / зварка / субпідряд, грн" value={extra} onChange={setExtra} />
        <Field id="k" label="Націнка (1.6 = +60%)" value={markup} onChange={setMarkup} />
      </div>

      <dl className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        <Row label="Метал з відходом" value={formatUah(r.metal)} />
        <Row label="Верстат" value={formatUah(r.labor)} />
        <Row label="Додаткові операції" value={formatUah(r.add)} />
        <Row label="Собівартість" value={formatUah(r.cost)} />
        <Row label="Ціна за шт" value={formatUah(r.piece)} big />
        <Row label="Разом" value={formatUah(r.total)} big />
      </dl>

      <pre className="mt-6 whitespace-pre-wrap rounded-md bg-muted p-4 font-sans text-sm leading-relaxed">
        {letter}
      </pre>
      <Button type="button" className="mt-4" onClick={copy}>
        Скопіювати КП
      </Button>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={cn("tabular-nums", big ? "font-display text-2xl tracking-tight" : "text-sm")}>{value}</dd>
    </div>
  );
}
