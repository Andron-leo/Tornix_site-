import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { MATERIALS_SHOP, OPERATIONS, ORDER_STEPS, PARTS, SHOP, WHO_ORDERS } from "@/lib/shop";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <main>
        <section className="relative overflow-hidden">
          <img src="/images/cnc.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="hero-wash-x absolute inset-0" />
          <div className="hero-wash-y absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
            <p className="rise-in font-display text-xs tracking-[0.28em] text-primary">{SHOP.kicker}</p>
            <h1 className="rise-in rise-in-delay-1 mt-4 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {SHOP.headline}
            </h1>
            <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              {SHOP.lead}
            </p>
            <div className="rise-in rise-in-delay-3 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/quote">
                  Заявка
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/orders">Як замовити</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/tornix-cnc-site.zip" download="tornix-cnc-site.zip">
                  <Download className="size-4" />
                  Завантажити код
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Що робимо</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {OPERATIONS.map((o) => (
              <article key={o.slug} className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
                <img src={o.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-display text-2xl tracking-tight">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.lead}</p>
                  <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {o.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Типові деталі</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PARTS.map((p) => (
                <article key={p.name} className="rounded-xl bg-muted px-5 py-5">
                  <h3 className="font-display text-xl tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Як замовити</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {ORDER_STEPS.map((s) => (
              <li key={s.n} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
                <span className="font-display text-3xl tabular-nums text-muted-foreground">{s.n}</span>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-8" size="lg">
            <Link to="/quote">Надіслати креслення</Link>
          </Button>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl tracking-tight">Для кого</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {WHO_ORDERS.map((w) => (
                <article key={w.name} className="rounded-xl bg-muted px-5 py-5">
                  <p className="font-medium">{w.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-sm text-muted-foreground">
              Матеріали: {MATERIALS_SHOP.join(" · ")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/eu">Для замовників з ЄС</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/calculator">Маса заготовки</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
