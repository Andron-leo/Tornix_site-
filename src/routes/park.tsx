import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { USED_CHECK, USED_CNC, USED_SHEET, type UsedItem } from "@/lib/start";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/park")({ component: ParkPage });

function ParkPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <PageIntro
          kicker="Б.У."
          title="Яке обладнання брати"
          lead="Один головний верстат, не вітрина. Ціни — орієнтир ринку б.у. Європа / Китай 2025–26, не рахунок продавця. Грант Дії на це, як правило, не спрацює: беріть за свої або в кредит 5–7–9."
        />

        <UsedBlock
          kicker="Шлях А"
          title="Якщо ріжете лист"
          intro="Першим беріть лазер. Гибочний — одразу після нього, інакше продаєте лише пластини, а клієнт хоче гнутий корпус."
          items={USED_SHEET}
        />

        <UsedBlock
          kicker="Шлях Б"
          title="Якщо точите й фрезеруєте"
          intro="Першим беріть фрезерний ЧПУ на 3 осях. Токарка — друга. П’ять осей не купуйте, поки три осі не стоять у черзі."
          items={USED_CNC}
        />

        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Перед оплатою перевірте</h2>
          <ol className="mt-6 space-y-3">
            {USED_CHECK.map((t, i) => (
              <li key={t} className="flex gap-4 rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
                <span className="font-display tabular-nums text-muted-foreground">{i + 1}</span>
                <p className="text-sm leading-relaxed">{t}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/grants">Що покриє грант (нове)</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Кроки з початку</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}

function UsedBlock({
  kicker,
  title,
  intro,
  items,
}: {
  kicker: string;
  title: string;
  intro: string;
  items: UsedItem[];
}) {
  return (
    <section className="mt-14">
      <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
      <div className="mt-6 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
        {items.map((item) => (
          <div key={item.name} className="grid gap-2 px-5 py-5 sm:grid-cols-[7rem_1fr_8rem] sm:items-start">
            <p
              className={cn(
                "text-xs tracking-wide",
                item.buy ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.buy ? "Брати" : "Не брати"}
            </p>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.spec}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.look}</p>
            </div>
            <p className="text-sm tabular-nums sm:text-right">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
