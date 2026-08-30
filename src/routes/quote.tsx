import { createFileRoute, Link } from "@tanstack/react-router";
import { QuoteForm } from "@/components/quote-form";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/quote")({ component: QuotePage });

function QuotePage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">ЗАЯВКА</p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight sm:text-6xl">
          Креслення — і ціна
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          PDF обов’язково, STEP якщо є. Матеріал, кількість, термін. Позиції з{" "}
          <Link to="/calculator" className="text-foreground underline-offset-4 hover:underline">
            калькулятора маси
          </Link>{" "}
          підтягнуться самі.
        </p>
        <div className="mt-10">
          <QuoteForm />
        </div>
      </main>
    </SiteShell>
  );
}
