export function PageIntro({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{lead}</p>
    </header>
  );
}
