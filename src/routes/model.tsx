import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { EU_PATH, PL_CZ_MODEL, SITE_NEED } from "@/lib/launch";

export const Route = createFileRoute("/model")({ component: ModelPage });

function ModelPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <PageIntro
          kicker="ПОЛЬЩА · ЧЕХІЯ"
          title="Як виглядає ідеальний цех"
          lead="Не шоурум Trumpf. Це контрактний job shop на 15–40 людей: ріжуть чужий DXF, гнуть, зварять вузол, фарбують, відвантажують DAP Німеччина за 48–96 годин. Свій виріб — пізніше. Верстат — під повтор, не під «все вміємо»."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PL_CZ_MODEL.map((b) => (
            <article key={b.title} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-xl tracking-tight">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Майданчик року 1</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Стіни грант не купить. Оренда з правильною електрикою дешевша за власний бетон.
          </p>
          <div className="mt-8 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
            {SITE_NEED.map((s) => (
              <div key={s.label} className="grid gap-1 px-5 py-5 sm:grid-cols-[8rem_1fr_1.4fr] sm:items-baseline">
                <p className="text-xs tracking-wide text-muted-foreground">{s.label}</p>
                <p className="font-medium">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Європейський замовник</h2>
          <div className="mt-8 space-y-4">
            {EU_PATH.map((e) => (
              <article key={e.title} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
                <h3 className="font-display text-xl tracking-tight">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/park">Що купувати першим</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/grants">Гранти</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
