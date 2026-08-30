import type { ShapeId } from "@/lib/metals";
import { cn } from "@/lib/utils";

export function ShapeIcon({
  id,
  className,
}: {
  id: ShapeId;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinejoin: "miter" as const,
  };
  return (
    <svg viewBox="0 0 40 40" className={cn("size-8", className)} aria-hidden>
      {id === "sheet" ? (
        <rect x="6" y="10" width="28" height="20" {...common} />
      ) : null}
      {id === "round" ? <circle cx="20" cy="20" r="11" {...common} /> : null}
      {id === "hex" ? (
        <polygon points="20,7 32,14 32,26 20,33 8,26 8,14" {...common} />
      ) : null}
      {id === "pipe" ? (
        <>
          <circle cx="20" cy="20" r="12" {...common} />
          <circle cx="20" cy="20" r="7" {...common} />
        </>
      ) : null}
      {id === "rect-pipe" ? (
        <>
          <rect x="7" y="10" width="26" height="20" {...common} />
          <rect x="12" y="15" width="16" height="10" {...common} />
        </>
      ) : null}
      {id === "angle" ? (
        <polyline points="10,8 10,32 32,32" {...common} />
      ) : null}
      {id === "channel" ? (
        <polyline points="10,8 30,8 30,14 16,14 16,26 30,26 30,32 10,32 10,8" {...common} />
      ) : null}
    </svg>
  );
}
