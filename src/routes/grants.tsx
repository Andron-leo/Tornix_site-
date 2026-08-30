import { createFileRoute, Link } from "@tanstack/react-router";
import { GrantFit } from "@/components/grant-fit";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { GRANT_PROGRAMS, GRANT_SIMPLE } from "@/lib/grants";

export const Route = createFileRoute("/grants")({ component: GrantsPage });

function GrantsPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <PageIntro
          kicker="УКРАЇНА"
          title="Гранти для української компанії"
          lead="Для старту з нуля реально працюють дві речі: грант Дії до 8 млн на нові верстати й кредит 5–7–9% — у тому числі на б.у. Польські й чеські фонди українському ТОВ не світять, поки немає фірми там."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl bg-muted p-5">
            <p className="text-xs tracking-wide text-muted-foreground">Б.у. лазер / ЧПУ</p>
            <p className="mt-2 font-display text-xl tracking-tight">Кредит 5–7–9%</p>
            <p className="mt-2 text-sm text-muted-foreground">Грант це майже не покриває.</p>
          </article>
          <article className="rounded-xl bg-muted p-5">
            <p className="text-xs tracking-wide text-muted-foreground">Новий другий верстат</p>
            <p className="mt-2 font-display text-xl tracking-tight">Дія, до 8 млн грн</p>
            <p className="mt-2 text-sm text-muted-foreground">Потрібні свої 50% і 5 робочих місць.</p>
          </article>
        </div>

        <div className="mt-12">
          <GrantFit />
        </div>

        <ol className="mt-16 space-y-4">
          {GRANT_PROGRAMS.map((p) => (
            <li key={p.id} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-display text-2xl tracking-tight">{p.name}</h2>
                <p className="font-display text-xl tabular-nums">{p.amount}</p>
              </div>
              <p className="mt-3 text-sm">{p.forWho}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.pays}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {p.youNeed.map((t) => (
                  <li key={t} className="border-l border-border pl-3">
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline"
              >
                {p.hrefLabel}
              </a>
            </li>
          ))}
        </ol>

        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Короткі відповіді</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {GRANT_SIMPLE.map((m) => (
              <article key={m.q} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
                <h3 className="font-display text-lg tracking-tight">{m.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.a}</p>
              </article>
            ))}
          </div>
        </section>

        <Button asChild className="mt-12">
          <Link to="/park">Повернутися до б.у. списку</Link>
        </Button>
      </main>
    </SiteShell>
  );
}
