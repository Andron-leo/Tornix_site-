import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { MATERIALS_SHOP, OPERATIONS, PARTS } from "@/lib/shop";

export const Route = createFileRoute("/cnc")({ component: CncPage });

function CncPage() {
  return (
    <SiteShell>
      <main>
        <section className="relative overflow-hidden">
          <img src="/images/cnc.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="hero-wash-x absolute inset-0" />
          <div className="hero-wash-y absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
            <p className="rise-in font-display text-xs tracking-[0.28em] text-primary">ПОСЛУГИ</p>
            <h1 className="rise-in rise-in-delay-1 mt-4 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Токарка і фрезер
            </h1>
            <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              Одна задача — деталь по вашому кресленню. Не «повний цикл будь-якої складності». Те, що
              тримаємо: 3 осі, токарка, сталь і нержавійка.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {OPERATIONS.filter((o) => o.slug !== "check").map((o) => (
              <article key={o.slug} className="rounded-xl bg-card shadow-[var(--shadow-border)]">
                <img src={o.image} alt="" className="h-52 w-full rounded-t-xl object-cover" />
                <div className="p-6 sm:p-8">
                  <h2 className="font-display text-3xl tracking-tight">{o.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{o.lead}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {o.points.map((p) => (
                      <li key={p} className="border-l border-border pl-3">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl tracking-tight">Деталі</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PARTS.map((p) => (
                <li key={p.name} className="rounded-xl bg-muted px-5 py-5">
                  <p className="font-medium">{p.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 font-display text-2xl tracking-tight">Матеріали</h3>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{MATERIALS_SHOP.join(" · ")}</p>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground">
              Допуск — як на кресленні, у межах того, що тримає 3-осьовий верстат. 5 осей і Swiss не
              пропонуємо.
            </p>
            <Button asChild className="mt-8">
              <Link to="/quote">Заявка з кресленням</Link>
            </Button>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
