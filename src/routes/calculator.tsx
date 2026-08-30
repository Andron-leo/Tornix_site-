import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator } from "@/components/calculator";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { MATERIALS } from "@/lib/metals";
import { useQuoteCart } from "@/lib/quote-store";
import { formatKg } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({ component: CalculatorPage });

function CalculatorPage() {
  const count = useQuoteCart((s) => s.items.length);
  const total = useQuoteCart((s) => s.items.reduce((s, i) => s + i.weightKg, 0));

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">МАСА</p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight sm:text-6xl">
          Маса заготовки
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Орієнтир по кг до заявки. Ціну ставить цех після креслення — на сторінці{" "}
          <Link to="/quote" className="text-foreground underline-offset-4 hover:underline">
            Заявка
          </Link>
          .
        </p>
        {count > 0 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-border)]">
            <p className="text-sm">
              У заявці {count} поз. · <span className="tabular-nums">{formatKg(total)}</span>
            </p>
            <Button asChild size="sm">
              <Link to="/quote">До заявки</Link>
            </Button>
          </div>
        ) : null}
        <div className="mt-10">
          <Calculator />
        </div>
        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-tight">Густини</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-border text-xs tracking-wide text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4 font-medium">Матеріал</th>
                  <th className="py-3 pr-4 font-medium">Група</th>
                  <th className="py-3 font-medium">г/см³</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m) => (
                  <tr key={m.id} className="border-b border-border/70">
                    <td className="py-3 pr-4">{m.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{m.group}</td>
                    <td className="py-3 tabular-nums">{m.density.toLocaleString("uk-UA")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
