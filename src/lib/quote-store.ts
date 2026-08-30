import { create } from "zustand";
import { uid } from "./utils";

export type QuoteItem = {
  id: string;
  shape: string;
  material: string;
  dims: string;
  qty: number;
  weightKg: number;
};

export type SubmittedQuote = {
  id: string;
  createdAt: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  comment: string;
  services: string[];
  deadline: string;
  items: QuoteItem[];
};

const STORAGE_KEY = "tornix-quotes";

export function loadSubmitted(): SubmittedQuote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SubmittedQuote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistSubmitted(quotes: SubmittedQuote[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes.slice(0, 20)));
}

type QuoteState = {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "id">) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
};

export const useQuoteCart = create<QuoteState>((set) => ({
  items: [],
  addItem: (item) =>
    set((s) => ({ items: [...s.items, { ...item, id: uid() }] })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clearItems: () => set({ items: [] }),
}));
