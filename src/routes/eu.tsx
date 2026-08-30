import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { EU_BUYER, MATERIALS_SHOP, ORDER_STEPS, PARTS } from "@/lib/shop";

export const Route = createFileRoute("/eu")({ component: EuPage });

function EuPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <PageIntro kicker="ЄС" title="Для замовників з Європи" lead={EU_BUYER.lead} />

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {EU_BUYER.points.map((p) => (
            <li key={p.t} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
              <p className="font-display text-xl tracking-tight">{p.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ul>

        <section className="mt-16 rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8" lang="en">
          <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">{EU_BUYER.kicker}</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight">{EU_BUYER.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {EU_BUYER.lead}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Send PDF + STEP, material, quantity, tolerance. We reply in EUR. Sample first.
          </p>
          <Button asChild className="mt-6">
            <Link to="/quote">Request a quote</Link>
          </Button>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl tracking-tight">Що веземо</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PARTS.map((p) => (
              <li key={p.name} className="rounded-xl bg-muted px-5 py-4">
                <p className="font-medium">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Матеріали: {MATERIALS_SHOP.join(" · ")}</p>
        </section>

        <ol className="mt-16 grid gap-4 md:grid-cols-2">
          {ORDER_STEPS.map((s) => (
            <li key={s.n} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
              <span className="font-display text-3xl tabular-nums text-muted-foreground">{s.n}</span>
              <h3 className="mt-2 font-display text-2xl tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </main>
    </SiteShell>
  );
}
