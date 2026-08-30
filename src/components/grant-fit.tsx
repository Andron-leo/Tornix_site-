import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  { id: "legal", label: "Є ФОП або ТОВ" },
  { id: "kved", label: "КВЕД переробки (25.хх металообробка)" },
  { id: "jobs", label: "Можемо найняти ще 5 людей і тримати 3 роки" },
  { id: "cash", label: "Є половина грошей (свої або кредит)" },
  { id: "capex", label: "Потрібен новий верстат, не оренда залу" },
  { id: "damage", label: "Вже було обладнання, є акти збитків від війни" },
] as const;

type Id = (typeof QUESTIONS)[number]["id"];

export function GrantFit() {
  const [on, setOn] = useState<Record<Id, boolean>>({
    legal: false,
    kved: false,
    jobs: false,
    cash: false,
    capex: false,
    damage: false,
  });

  const result = useMemo(() => {
    const ready = on.legal && on.kved && on.jobs && on.cash && on.capex;
    if (on.damage && on.legal) {
      return {
        title: "До 16 млн грн — відновлення",
        text: "Якщо акти збитків справжні — держава може дати 80%. Це не шлях «з нуля».",
      };
    }
    if (ready) {
      return {
        title: "Можна подаватись на 8 млн у Дії",
        text: "Грант — на новий верстат. Б.у. беріть окремо в кредит 5–7–9. Залу грант не оплатить. Покладіть у заявку лист від клієнта.",
      };
    }
    if (on.legal && on.kved && on.capex && !on.cash) {
      return {
        title: "Без половини грошей грант не дадуть",
        text: "Ідіть у банк по 5–7–9 на свою частку. Або беріть дешевший б.у. зараз, а грант — пізніше на новий.",
      };
    }
    if (!on.legal || !on.kved) {
      return {
        title: "Спочатку компанія",
        text: "Відкрийте ТОВ, поставте КВЕД 25.хх. На себе як на людину грант на верстат не дають.",
      };
    }
    return {
      title: "Ще не сходиться",
      text: "Увімкніть умови, які вже виконуєте. Чесні відповіді важливіші за оптимістичні: невиконання — повернення гранту.",
    };
  }, [on]);

  return (
    <div className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
      <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">ПЕРЕВІРКА</p>
      <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Чи підійде грант Дії</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Натисніть те, що вже є. Це не заявка — лише підказка.
      </p>
      <ul className="mt-6 space-y-2">
        {QUESTIONS.map((q) => {
          const active = on[q.id];
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => setOn((s) => ({ ...s, [q.id]: !s[q.id] }))}
                className={cn(
                  "flex min-h-12 w-full items-center justify-between gap-4 rounded-md px-4 text-left text-sm transition-[background-color] duration-150",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                <span>{q.label}</span>
                <span className="shrink-0 text-xs tracking-wide opacity-70">{active ? "так" : "ні"}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 rounded-lg bg-muted p-5">
        <p className="font-display text-xl tracking-tight">{result.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.text}</p>
        <Button asChild className="mt-5" variant="outline">
          <a href="https://diia.gov.ua/services/grant-na-pererobne-pidpriyemstvo" target="_blank" rel="noreferrer">
            Форма в Дії
          </a>
        </Button>
      </div>
    </div>
  );
}
