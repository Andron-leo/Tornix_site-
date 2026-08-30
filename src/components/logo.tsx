import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden
    >
      <circle cx="15" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 16h5M27.5 13.5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-medium tracking-[0.14em]">TORNIX</span>
        <span className="mt-1 text-xs tracking-wide text-muted-foreground">CNC turning & milling</span>
      </span>
    </span>
  );
}
