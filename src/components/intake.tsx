import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ASK_CLIENT, missingMessage } from "@/lib/orders";
import { cn } from "@/lib/utils";

export function Intake() {
  const [have, setHave] = useState<Record<string, boolean>>({});
  const text = useMemo(() => missingMessage(have), [have]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Текст скопійовано — вставте клієнту");
    } catch {
      toast.error("Не вдалося скопіювати");
    }
  }

  return (
    <div className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
      <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">ПРИЙОМ</p>
      <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Що спитати в клієнта</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Відмітьте, що вже є. Решта збереться в повідомлення.
      </p>
      <ul className="mt-6 space-y-2">
        {ASK_CLIENT.map((q) => {
          const on = Boolean(have[q.id]);
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => setHave((s) => ({ ...s, [q.id]: !on }))}
                className={cn(
                  "flex min-h-12 w-full items-center justify-between gap-4 rounded-md px-4 text-left text-sm transition-[background-color] duration-150",
                  on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                <span>{q.label}</span>
                <span className="shrink-0 text-xs tracking-wide opacity-70">{on ? "є" : "немає"}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <pre className="mt-6 whitespace-pre-wrap rounded-md bg-muted p-4 font-sans text-sm leading-relaxed">
        {text}
      </pre>
      <Button type="button" className="mt-4" onClick={copy}>
        Скопіювати текст
      </Button>
    </div>
  );
}
