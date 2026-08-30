export type Material = {
  id: string;
  name: string;
  density: number;
  group: "Сталь" | "Нержавійка" | "Кольорові";
};

export const MATERIALS: Material[] = [
  { id: "st3", name: "Сталь Ст3 / S235", density: 7.85, group: "Сталь" },
  { id: "09g2s", name: "Сталь 09Г2С / S355", density: 7.85, group: "Сталь" },
  { id: "st45", name: "Сталь 45 / C45", density: 7.85, group: "Сталь" },
  { id: "sus304", name: "AISI 304 / 08Х18Н10", density: 7.93, group: "Нержавійка" },
  { id: "sus316", name: "AISI 316 / 10Х17Н13М2", density: 8.0, group: "Нержавійка" },
  { id: "al", name: "Алюміній EN AW-6060", density: 2.7, group: "Кольорові" },
  { id: "cu", name: "Мідь Cu-ETP", density: 8.96, group: "Кольорові" },
  { id: "brass", name: "Латунь CuZn37", density: 8.5, group: "Кольорові" },
  { id: "ti", name: "Титан Grade 2", density: 4.51, group: "Кольорові" },
];

export type ShapeId =
  | "sheet"
  | "round"
  | "hex"
  | "pipe"
  | "rect-pipe"
  | "angle"
  | "channel";

export type Dims = Record<string, number>;

export type DimField = {
  key: string;
  label: string;
  hint: string;
};

export type Shape = {
  id: ShapeId;
  name: string;
  fields: DimField[];
};

export const SHAPES: Shape[] = [
  {
    id: "sheet",
    name: "Лист / смуга",
    fields: [
      { key: "length", label: "Довжина", hint: "мм" },
      { key: "width", label: "Ширина", hint: "мм" },
      { key: "thick", label: "Товщина", hint: "мм" },
    ],
  },
  {
    id: "round",
    name: "Круг",
    fields: [
      { key: "dia", label: "Діаметр", hint: "мм" },
      { key: "length", label: "Довжина", hint: "мм" },
    ],
  },
  {
    id: "hex",
    name: "Шестигранник",
    fields: [
      { key: "af", label: "Під ключ", hint: "мм" },
      { key: "length", label: "Довжина", hint: "мм" },
    ],
  },
  {
    id: "pipe",
    name: "Труба кругла",
    fields: [
      { key: "od", label: "Ø зовнішній", hint: "мм" },
      { key: "wall", label: "Стінка", hint: "мм" },
      { key: "length", label: "Довжина", hint: "мм" },
    ],
  },
  {
    id: "rect-pipe",
    name: "Профіль",
    fields: [
      { key: "width", label: "Ширина", hint: "мм" },
      { key: "height", label: "Висота", hint: "мм" },
      { key: "wall", label: "Стінка", hint: "мм" },
      { key: "length", label: "Довжина", hint: "мм" },
    ],
  },
  {
    id: "angle",
    name: "Кутик",
    fields: [
      { key: "a", label: "Полиця A", hint: "мм" },
      { key: "b", label: "Полиця B", hint: "мм" },
      { key: "thick", label: "Товщина", hint: "мм" },
      { key: "length", label: "Довжина", hint: "мм" },
    ],
  },
  {
    id: "channel",
    name: "Швелер",
    fields: [
      { key: "h", label: "Висота", hint: "мм" },
      { key: "b", label: "Полиця", hint: "мм" },
      { key: "s", label: "Стінка", hint: "мм" },
      { key: "t", label: "Полиця товщ.", hint: "мм" },
      { key: "length", label: "Довжина", hint: "мм" },
    ],
  },
];

function mm3ToKg(mm3: number, density: number) {
  if (mm3 <= 0) return 0;
  return (mm3 * density) / 1_000_000;
}

export function pieceMassKg(id: ShapeId, d: Dims, density: number) {
  const n = (k: string) => Math.max(0, d[k] ?? 0);
  let vol = 0;
  if (id === "sheet") vol = n("length") * n("width") * n("thick");
  else if (id === "round") vol = Math.PI * (n("dia") / 2) ** 2 * n("length");
  else if (id === "hex") vol = (Math.sqrt(3) / 2) * n("af") ** 2 * n("length");
  else if (id === "pipe") {
    const od = n("od");
    const idia = Math.max(0, od - 2 * n("wall"));
    vol = (Math.PI / 4) * (od ** 2 - idia ** 2) * n("length");
  } else if (id === "rect-pipe") {
    const w = n("width");
    const h = n("height");
    const t = n("wall");
    const iw = Math.max(0, w - 2 * t);
    const ih = Math.max(0, h - 2 * t);
    vol = (w * h - iw * ih) * n("length");
  } else if (id === "angle") {
    const t = n("thick");
    vol = (n("a") + n("b") - t) * t * n("length");
  } else if (id === "channel") {
    vol = (n("h") * n("s") + 2 * (n("b") - n("s")) * n("t")) * n("length");
  }
  return mm3ToKg(vol, density);
}

export function lengthMm(d: Dims) {
  return Math.max(0, d.length ?? 0);
}

export function surfaceM2(id: ShapeId, d: Dims) {
  const n = (k: string) => Math.max(0, d[k] ?? 0);
  const mm2 = (() => {
    if (id === "sheet") return 2 * (n("length") * n("width"));
    if (id === "round") return Math.PI * n("dia") * n("length");
    if (id === "hex") return 6 * (n("af") / Math.sqrt(3)) * n("length");
    if (id === "pipe") return Math.PI * n("od") * n("length");
    if (id === "rect-pipe") return 2 * (n("width") + n("height")) * n("length");
    if (id === "angle") return 2 * (n("a") + n("b") - n("thick")) * n("length");
    return 2 * (n("h") + n("b")) * n("length");
  })();
  return mm2 / 1_000_000;
}

export function describeDims(id: ShapeId, d: Dims) {
  const shape = SHAPES.find((s) => s.id === id);
  if (!shape) return "";
  return shape.fields
    .map((f) => `${f.label} ${d[f.key] ?? 0} ${f.hint}`)
    .join(" · ");
}

export const SERVICES = [
  {
    slug: "turn",
    title: "Токарка ЧПУ",
    lead: "Втулки, фланці, осі, кільця.",
    image: "/images/cnc.jpg",
    points: ["Патрон до 250 мм", "C45, S355, 304", "Різьба й розточування"],
  },
  {
    slug: "mill",
    title: "Фрезер 3 осі",
    lead: "Плити, кришки, отвори, кишені.",
    image: "/images/parts.jpg",
    points: ["Стіл ~1000 × 500", "Координати отворів", "Під вузол"],
  },
] as const;
