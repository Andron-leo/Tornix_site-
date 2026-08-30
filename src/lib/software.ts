export const SOFTWARE = [
  {
    when: "Сьогодні, без верстата",
    items: [
      {
        name: "Google Таблиці або LibreOffice Calc",
        job: "Журнал запитів і прорахунок",
        money: "безкоштовно",
        href: "https://www.libreoffice.org/",
        note: "Колонки: дата, клієнт, деталь, кг, ціна, статус. ERP не потрібен.",
      },
      {
        name: "Калькулятор на цьому сайті",
        job: "Маса заготовки і ціна",
        money: "безкоштовно",
        href: "/calculator",
        note: "Спочатку кг, потім формула на сторінці Замовлення.",
        internal: true,
      },
      {
        name: "LibreCAD",
        job: "Відкрити і поправити DXF",
        money: "безкоштовно, можна в бізнес",
        href: "https://librecad.org/",
        note: "2D. Клієнт прислав DXF — перевіряєте контури, не перемальовуєте в SolidWorks.",
      },
    ],
  },
  {
    when: "Лист · коли з’явиться лазер",
    items: [
      {
        name: "CypCut / HypCut",
        job: "Різати лист",
        money: "йде з китайським лазером",
        href: "https://www.cypcut.net/",
        note: "Bodor, HSG і більшість б.у. 3 кВт. Ним і працюєте. Окремо SigmaNEST не купуйте в рік 1.",
      },
      {
        name: "Deepnest Next",
        job: "Розкласти деталі на лист",
        money: "безкоштовно (open source)",
        href: "https://github.com/deepnest-next/deepnest",
        note: "Якщо вбудований розкрій CypCut слабкий. Старий Deepnest.io давно не оновлюють — беріть цей форк. DXF краще зберігати старішою версією.",
      },
    ],
  },
  {
    when: "ЧПУ · фрезер / токарка",
    items: [
      {
        name: "FreeCAD",
        job: "Модель + простий CAM на 3 осі",
        money: "безкоштовно, можна в бізнес",
        href: "https://www.freecad.org/",
        note: "Workbench SheetMetal для гибки. CAM для кишень і контуру. Крива навчання є, ліцензія чиста.",
      },
      {
        name: "ПЗ зі стійки верстата",
        job: "Запуск програми на Haas / Fanuc",
        money: "вже в верстаті",
        href: "",
        note: "G-код рахуєте в CAM, на стійку лише віддаєте. Окремий Mastercam на старті не обов’язковий.",
      },
    ],
  },
] as const;

export const SOFTWARE_NO = [
  {
    name: "Fusion 360 Personal (безкоштовний)",
    why: "Ліцензія лише для хобі, не для цеху й не для клієнтських деталей. Комерційно — платна підписка або окрема програма Startup, якщо пройдете відбір.",
  },
  {
    name: "SolidWorks, Mastercam, SigmaNEST, Metalix",
    why: "Нормальні програми, але це рік 2–3, коли є каса. На б.у. лазері їх замінює CypCut.",
  },
  {
    name: "1С / BAS «з першого дня»",
    why: "Поки 5 замовлень на тиждень — вистачить таблиці. Складна обліковка з’їсть час, якого немає.",
  },
];
