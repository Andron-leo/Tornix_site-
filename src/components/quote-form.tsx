import { Trash2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QUOTE_SERVICES } from "@/lib/shop";
import {
  loadSubmitted,
  persistSubmitted,
  useQuoteCart,
  type SubmittedQuote,
} from "@/lib/quote-store";
import { cn, formatKg, uid } from "@/lib/utils";

const SERVICE_OPTIONS = QUOTE_SERVICES;

export function QuoteForm() {
  const items = useQuoteCart((s) => s.items);
  const removeItem = useQuoteCart((s) => s.removeItem);
  const clearItems = useQuoteCart((s) => s.clearItems);

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [comment, setComment] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [sent, setSent] = useState<SubmittedQuote | null>(null);

  function toggleService(title: string) {
    setServices((cur) =>
      cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title],
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Вкажіть ім’я та телефон");
      return;
    }
    const quote: SubmittedQuote = {
      id: uid(),
      createdAt: new Date().toISOString(),
      company: company.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      comment: comment.trim(),
      services,
      deadline,
      items,
    };
    persistSubmitted([quote, ...loadSubmitted()]);
    clearItems();
    setSent(quote);
    toast.success("Заявку прийнято");
  }

  if (sent) {
    return (
      <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
          ЗАЯВКА {sent.id.slice(0, 8).toUpperCase()}
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight">Зафіксували</h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {sent.name}, заявку зафіксовано. Надішліть креслення PDF (і STEP, якщо є) у відповідь — без
          файлу ціну не порахуємо. Відповідаємо робочим днем.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSent(null)}>
          Нова заявка
        </Button>
      </div>
    );
  }

  const totalKg = items.reduce((s, i) => s + i.weightKg, 0);

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6 rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
        <div>
          <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
            ЗАЯВКА
          </p>
          <h2 className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">
            Креслення і кількість
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            PDF + матеріал + кількість. Для нової деталі почнемо зі зразка.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Компанія" id="company">
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          </Field>
          <Field label="Ім’я" id="name" required>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Телефон" id="phone" required>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="+380"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>
          <Field label="Пошта" id="email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Термін" id="deadline">
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Field>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">
            Операції
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((title) => {
              const on = services.includes(title);
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => toggleService(title)}
                  className={cn(
                    "min-h-11 rounded-md px-3 text-sm transition-[background-color] duration-150",
                    on
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        <Field label="Коментар, креслення, партія" id="comment">
          <Textarea
            id="comment"
            rows={4}
            placeholder="Матеріал, кількість, допуск, куди везти. Посилання на PDF/STEP, якщо файл великий."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Field>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Надіслати заявку
        </Button>
      </div>

      <aside className="h-fit rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
          ПОЗИЦІЇ
        </p>
        {items.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Порожньо. Додайте розрахунок з калькулятора — маса піде в заявку.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex gap-2 rounded-md bg-muted p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {item.shape} · {item.qty} шт
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.material}
                  </p>
                  <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                    {item.dims}
                  </p>
                  <p className="mt-1 text-sm tabular-nums">{formatKg(item.weightKg)}</p>
                </div>
                <button
                  type="button"
                  className="relative size-9 shrink-0 text-muted-foreground after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 hover:text-foreground"
                  aria-label="Видалити"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="mx-auto size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted-foreground">Маса</span>
          <span className="font-display text-xl tabular-nums">{formatKg(totalKg)}</span>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </Label>
      {children}
    </div>
  );
}
