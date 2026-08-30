import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ShapeIcon } from "@/components/shape-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  MATERIALS,
  SHAPES,
  describeDims,
  lengthMm,
  pieceMassKg,
  surfaceM2,
  type Dims,
  type ShapeId,
} from "@/lib/metals";
import { useQuoteCart } from "@/lib/quote-store";
import { cn, formatKg, formatNum } from "@/lib/utils";

const DEFAULTS: Record<ShapeId, Dims> = {
  sheet: { length: 1000, width: 500, thick: 3 },
  round: { dia: 20, length: 1000 },
  hex: { af: 19, length: 1000 },
  pipe: { od: 48.3, wall: 3.5, length: 1000 },
  "rect-pipe": { width: 40, height: 20, wall: 2, length: 1000 },
  angle: { a: 50, b: 50, thick: 5, length: 1000 },
  channel: { h: 100, b: 50, s: 4.5, t: 7.6, length: 1000 },
};

export function Calculator({ compact = false }: { compact?: boolean }) {
  const [shapeId, setShapeId] = useState<ShapeId>("sheet");
  const [materialId, setMaterialId] = useState("st3");
  const [dims, setDims] = useState<Dims>(DEFAULTS.sheet);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const addItem = useQuoteCart((s) => s.addItem);

  const shape = SHAPES.find((s) => s.id === shapeId)!;
  const material = MATERIALS.find((m) => m.id === materialId)!;

  const result = useMemo(() => {
    const piece = pieceMassKg(shapeId, dims, material.density);
    const total = piece * Math.max(1, qty);
    const len = lengthMm(dims);
    const perMeter = len > 0 ? piece / (len / 1000) : 0;
    const area = surfaceM2(shapeId, dims) * Math.max(1, qty);
    const unitPrice = Number.parseFloat(price.replace(",", "."));
    const cost = Number.isFinite(unitPrice) && unitPrice > 0 ? total * unitPrice : 0;
    return { piece, total, perMeter, area, cost };
  }, [shapeId, dims, material.density, qty, price]);

  function pickShape(id: ShapeId) {
    setShapeId(id);
    setDims(DEFAULTS[id]);
  }

  function setDim(key: string, raw: string) {
    const v = Number.parseFloat(raw.replace(",", "."));
    setDims((d) => ({ ...d, [key]: Number.isFinite(v) ? v : 0 }));
  }

  function addToQuote() {
    if (result.total <= 0) {
      toast.error("Заповніть розміри");
      return;
    }
    addItem({
      shape: shape.name,
      material: material.name,
      dims: describeDims(shapeId, dims),
      qty: Math.max(1, qty),
      weightKg: result.total,
    });
    toast.success("Позицію додано до заявки");
  }

  const groups = Array.from(new Set(MATERIALS.map((m) => m.group)));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-8",
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
            МАСА
          </p>
          <h2 className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">
            Калькулятор металу
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Густина {material.density.toLocaleString("uk-UA")} г/см³
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {SHAPES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => pickShape(s.id)}
            className={cn(
              "flex min-h-11 flex-col items-center gap-1 rounded-md px-2 py-2.5 text-center text-xs transition-[background-color,box-shadow] duration-150",
              shapeId === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            <ShapeIcon id={s.id} className="size-6" />
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="material">Матеріал</Label>
              <Select
                id="material"
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
              >
                {groups.map((g) => (
                  <optgroup key={g} label={g}>
                    {MATERIALS.filter((m) => m.group === g).map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qty">Кількість, шт</Label>
              <Input
                id="qty"
                inputMode="numeric"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number.parseInt(e.target.value, 10) || 1))}
              />
            </div>
          </div>

          <div className={cn("grid gap-4", shape.fields.length > 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            {shape.fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label htmlFor={f.key}>
                  {f.label}, {f.hint}
                </Label>
                <Input
                  id={f.key}
                  inputMode="decimal"
                  value={dims[f.key] ?? ""}
                  onChange={(e) => setDim(f.key, e.target.value)}
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <Label htmlFor="price">Ціна за кг, € (необов.)</Label>
              <Input
                id="price"
                inputMode="decimal"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <aside className="flex flex-col justify-between rounded-lg bg-muted p-5">
          <div className="space-y-4">
            <ResultRow label="1 шт" value={formatKg(result.piece)} />
            {result.perMeter > 0 ? (
              <ResultRow label="На метр" value={`${formatNum(result.perMeter, 2)} кг/м`} />
            ) : null}
            {result.area > 0 ? (
              <ResultRow label="Площа 2 сторін" value={`${formatNum(result.area, 3)} м²`} />
            ) : null}
            <div>
              <p className="text-xs tracking-wide text-muted-foreground">Разом</p>
              <p className="mt-1 font-display text-4xl tracking-tight tabular-nums">
                {formatKg(result.total)}
              </p>
            </div>
            {result.cost > 0 ? (
              <ResultRow
                label="Матеріал"
                value={`${result.cost.toLocaleString("uk-UA", { maximumFractionDigits: 0 })} €`}
              />
            ) : null}
          </div>
          <Button className="mt-6 w-full" onClick={addToQuote}>
            <Plus className="size-4" />
            До заявки
          </Button>
        </aside>
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
