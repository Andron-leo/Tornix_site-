import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { ORDER_STEPS } from "@/lib/shop";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const NEED = [
  "PDF креслення. Якщо є — STEP (3D) або DXF.",
  "Матеріал (C45, S355, AISI 304…) або «як на кресленні».",
  "Кількість: зразок і серія окремо.",
  "Допуск, якщо не стоїть на виді. Термін.",
  "Куди везти: Україна чи DAP Польща / інше місто ЄС.",
] as const;

const PAY = [
  "Новій деталі — спочатку 1–5 штук.",
  "Передоплата на метал зразка. Серія — за домовленістю, метал завжди закритий.",
  "Ціна в грн або EUR. Дорога в ЄС — окремим рядком, не «в подарунок».",
] as const;

function OrdersPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <PageIntro
          kicker="ЗАМОВЛЕННЯ"
          title="Як замовити деталь"
          lead="Креслення → ціна → зразок → серія. Без «прайсу на все»: кожна позиція рахується."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {ORDER_STEPS.map((s) => (
            <li key={s.n} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
              <span className="font-display text-4xl tabular-nums text-muted-foreground">{s.n}</span>
              <h2 className="mt-2 font-display text-2xl tracking-tight">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.text}</p>
            </li>
          ))}
        </ol>

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
            <h2 className="font-display text-2xl tracking-tight">Що надіслати</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed">
              {NEED.map((t) => (
                <li key={t} className="border-l border-border pl-3">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
            <h2 className="font-display text-2xl tracking-tight">Оплата і зразок</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed">
              {PAY.map((t) => (
                <li key={t} className="border-l border-border pl-3">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/quote">Залишити заявку</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/calculator">Порахувати масу</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
