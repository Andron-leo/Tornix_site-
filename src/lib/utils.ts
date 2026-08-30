import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKg(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value < 0.01) return `${value.toLocaleString("uk-UA", { maximumFractionDigits: 4 })} кг`;
  if (value < 1) return `${value.toLocaleString("uk-UA", { maximumFractionDigits: 3 })} кг`;
  if (value < 100) return `${value.toLocaleString("uk-UA", { maximumFractionDigits: 2 })} кг`;
  return `${value.toLocaleString("uk-UA", { maximumFractionDigits: 1 })} кг`;
}

export function formatUah(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "—";
  return `${Math.round(value).toLocaleString("uk-UA")} грн`;
}

export function formatNum(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("uk-UA", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

export function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
