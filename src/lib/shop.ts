export const SHOP = {
  kicker: "МЕТАЛООБРОБКА ЧПУ",
  headline: "Деталі по кресленню",
  lead: "Токарка й фрезер 3 осі. Фланці, втулки, осі, корпуси. Україна — відвантаження по країні та в ЄС (DAP Польща).",
} as const;

export const OPERATIONS = [
  {
    slug: "turn",
    title: "Токарна ЧПУ",
    image: "/images/cnc.jpg",
    lead: "Втулки, фланці, осі, кільця. Патрон до 250 мм, довжина до ~500 мм.",
    points: ["C45, S355, AISI 304", "Різьба, розточування, відрізка", "Серії та зразки"],
  },
  {
    slug: "mill",
    title: "Фрезер 3 осі",
    image: "/images/parts.jpg",
    lead: "Площини, кишені, отвори в фланцях, кришки, плити.",
    points: ["Стіл ~1000 × 500", "Свердління й нарізка", "Під складальний вузол"],
  },
  {
    slug: "check",
    title: "Замір і відвантаження",
    image: "/images/coating.jpg",
    lead: "Протокол заміру за запитом. Фото партії перед ящиком. Палета або кур’єр.",
    points: ["Штанген, мікрометр", "DAP PL / по Україні", "Інвойс у EUR або грн"],
  },
] as const;

export const PARTS = [
  { name: "Фланці", text: "Приєднувальні, глухі, перехідні. Отвір + токарка." },
  { name: "Втулки", text: "Під вал, під підшипник, розточені, з буртиком." },
  { name: "Осі та вали", text: "Ступінчасті, з різьбою, лиски під ключ." },
  { name: "Кришки й плити", text: "Фрезер, отвори по координатах, фаски." },
  { name: "Кільця й гайки", text: "Відрізка, внутрішня/зовнішня різьба." },
  { name: "Корпусні дрібні", text: "Кишені, площини, різьбові отвори." },
] as const;

export const MATERIALS_SHOP = [
  "Сталь С45 / C45",
  "S235 / S355",
  "AISI 304, 316",
  "Алюміній 6060 / 6082",
  "Латунь, бронза",
] as const;

export const ORDER_STEPS = [
  {
    n: "1",
    title: "Надішліть креслення",
    text: "PDF обов’язково. STEP або DXF — якщо є. Матеріал, кількість, допуск, термін.",
  },
  {
    n: "2",
    title: "Рахунок-пропозиція",
    text: "Ціна за штуку, сума, строк від грошей і файлу, DAP або самовивіз. Дійсна 7 днів.",
  },
  {
    n: "3",
    title: "Зразок, потім серія",
    text: "Новій деталі — 1–5 шт. Передоплата на метал. Якщо зразок зайшов — партія.",
  },
  {
    n: "4",
    title: "Відвантаження",
    text: "Україна — нова пошта / делівері. ЄС — кур’єр (зразок) або палета DAP Польща.",
  },
] as const;

export const EU_BUYER = {
  kicker: "EU BUYERS",
  title: "CNC parts from Ukraine",
  lead: "Turning and 3-axis milling. Bushings, flanges, shafts. Quote from PDF/STEP. Sample by courier, series DAP Poland.",
  points: [
    { t: "Direct", d: "We machine. No extra job-shop in between unless you ask." },
    { t: "Files", d: "PDF + STEP. Material, qty, tolerance, date." },
    { t: "Terms", d: "EUR. Sample prepaid. DAP PL warehouse or courier." },
    { t: "Who we fit", d: "Pump, hydraulic, agri, boiler, gearbox plants — not automotive OEM tenders." },
  ],
} as const;

export const WHO_ORDERS = [
  { name: "Насоси й арматура", text: "Фланці, втулки, вали, кришки." },
  { name: "Гідравліка", text: "Втулки, поршні, пальці, фланці." },
  { name: "Сільгосп і запчастини", text: "Осі, втулки, фланці маточин." },
  { name: "Котли та тепло", text: "Фланцеві пари, гільзи." },
  { name: "Редуктори, верстати", text: "Втулки, фланці корпусів." },
  { name: "Ремонт і МРО", text: "Повтор зношеної деталі по зразку чи ескізу." },
] as const;

export const QUOTE_SERVICES = [
  "Токарка ЧПУ",
  "Фрезер 3 осі",
  "Фланці",
  "Втулки",
  "Вали / осі",
  "Серія після зразка",
] as const;
