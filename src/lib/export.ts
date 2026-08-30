export const SIMPLE_CLIENTS = [
  {
    yes: true,
    name: "Кінцевий завод — більша маржа",
    text: "Фірма, яка ставить вашу втулку у свій насос, комбайн, гідравліку. Платить вам напряму. Шукати важче: потрібні фото, строк, DAP і людина, яка купує деталі — не господар чужого ЧПУ.",
  },
  {
    yes: true,
    name: "Чужий цех — менша маржа, легше зайти",
    text: "Так, він посередник. Залишає собі 20–40% і клієнта. Ви отримуєте роботу, логістику «до Польщі» і перші відгуки. Це плата за вхід, не бізнес назавжди.",
  },
  {
    yes: true,
    name: "Біржа (Xometry, Facturee)",
    text: "Теж посередник, часто відрізає ще більше. Клієнта ви не бачите. Беріть лише щоб завантажити вікна, не як основний продаж.",
  },
  {
    yes: false,
    name: "Не клієнт",
    text: "Volkswagen, Siemens, OLX, Amazon. Або тендери з ISO, або штучний кронштейн.",
  },
] as const;

export const WHO_ELSE = [
  {
    place: "Чехія",
    why: "Багато машинобудування і автокомпонентів. Мова: англійська, іноді німецька. Везете через Польщу або Словаччину.",
    search: "výrobce čerpadel, zemědělské stroje, hydraulika",
  },
  {
    place: "Словаччина",
    why: "Близько, багато заводів німецьких брендів. Закупівельник часто сидить у СК, креслення — з Німеччини.",
    search: "výrobca čerpadiel, poľnohospodárske stroje",
  },
  {
    place: "Угорщина",
    why: "Авто, сільгосп, гідравліка. Англійська. Логістика нормальна.",
    search: "szivattyú gyártó, mezőgazdasági gép, hidraulika",
  },
  {
    place: "Румунія",
    why: "Дешевше ніж Чехія, росте виробництво. Конкуренти вам подібні. Англійська.",
    search: "producător pompe, utilaje agricole",
  },
  {
    place: "Німеччина (середні заводи)",
    why: "Найкраща ціна за деталь. Важче: німецька або дуже добра англійська, часто хочуть ISO і рахунок у ЄС. Не Volkswagen — Maschinenbau на 30–150 людей (Баварія, Саксонія, Баден-Вюртемберг).",
    search: "Pumpenhersteller, Landmaschinen, Hydraulik Einkauf",
  },
  {
    place: "Австрія",
    why: "Як південь Німеччини, ринок менший. Часто той самий закупівельник, що й у DE.",
    search: "Pumpen, Landtechnik, Hydraulik",
  },
  {
    place: "Українські експортери вдома",
    why: "Платять у гривні, без митниці. Роблять насоси, котли, сільгосп, гідравліку на ЄС — їм потрібні ваші фланці. Це теж «закордонний» ланцюг, тільки ви всередині.",
    search: "виробник насосів Україна, гідроциліндри, котли",
  },
] as const;

export const WHO_BRANCH = [
  { name: "Насоси й арматура", parts: "фланці, втулки, вали, кришки" },
  { name: "Гідравліка", parts: "втулки, поршні, фланці, пальці" },
  { name: "Сільгоспмашини і запчастини", parts: "втулки, осі, фланці маточин" },
  { name: "Котли, тепло, димоходи", parts: "фланці, гільзи, фланцеві пари" },
  { name: "Верстатобудування / редуктори", parts: "втулки, фланці корпусів, вали" },
  { name: "Причепи, комунальна техніка", parts: "осі, втулки, кронштейни (якщо є фрезер)" },
] as const;

export const MARGIN_PATHS = [
  {
    name: "Прямо на завод",
    keep: "Ви тримаєте майже всю маржу",
    hard: "Важко: немає історії, немає ISO, креслення не дадуть з першого листа",
    do: "Писати закупівельнику заводу (насоси, сільгосп, гідравліка), не цеху з верстатами.",
  },
  {
    name: "Через польський цех",
    keep: "Вони забирають 20–40%",
    hard: "Легше: їм не треба «відкрити Україну», їм треба зайві години токарки",
    do: "Лише щоб провезти перші 5–10 партій. Потім тих самих кінцевих клієнтів шукайте самі — не через цей цех.",
  },
  {
    name: "Через біржу",
    keep: "Вони ріжуть ціну сильніше за цех",
    hard: "Клієнт не ваш. Строки короткі.",
    do: "Не старт.",
  },
] as const;

export const SIMPLE_PEOPLE = [
  {
    who: "Закупівельник на заводі (це ваш клієнт)",
    pl: "zaopatrzenie, zakupowiec, buyer",
    why: "Людина, яка купує втулки для насосів / сільгоспу / гідравліки. Маржа ваша. Пишіть їй.",
  },
  {
    who: "Власник польського ЧПУ-цеху (це посередник)",
    pl: "właściciel, prezes",
    why: "Віддасть роботу, забере частку. Корисно на 5 перших партій, не як єдина стратегія.",
  },
  {
    who: "Не секретарка і не «відділ» взагалі",
    pl: "recepcja, info@",
    why: "Можна надіслати коротко, але ціль — ім’я закупівельника або господаря.",
  },
] as const;

export const SIMPLE_SITES = [
  {
    name: "Google і Google Maps",
    kind: "пошук заводів",
    pay: "безкоштовно",
    text: "Вбиваєте producent pomp Polska або maszyny rolnicze producent. Це заводи, не цехи. З сайту — закупівельник.",
    href: "https://www.google.com/maps/search/producent+pomp+Polska",
  },
  {
    name: "LinkedIn",
    kind: "написати людині",
    pay: "безкоштовно",
    text: "Шукаєте zaopatrzenie + pompy / maszyny rolnicze / hydraulika + Poland. Не власника чужого ЧПУ, якщо хочете свою маржу.",
    href: "https://www.linkedin.com/",
  },
  {
    name: "Europages",
    kind: "жовті сторінки Європи",
    pay: "картка безкоштовна",
    text: "Вивіска в інтернеті: «український цех, токарка, фрезер». Самі замовлення звідти рідко падають. Щоб вас можна було нагуглити.",
    href: "https://www.europages.co.uk/en/supplier-registration",
  },
  {
    name: "Дія.Бізнес, каталог експортерів",
    kind: "держсписок",
    pay: "безкоштовно",
    text: "Офіційна картка «ми експортуємо». Для місій і щоб іноземець бачив, що фірма жива. Не магазин замовлень.",
    href: "https://business.diia.gov.ua/export/signup",
  },
  {
    name: "Xometry Europe",
    kind: "біржа деталей",
    pay: "без абонплати, вони ріжуть ціну",
    text: "Інженер кидає креслення, платформа питає вас «зробите за стільки?». Потрібен уже свій верстат і швидкість. Для старту слабко.",
    href: "https://xometry.eu/en/partners/",
  },
  {
    name: "Facturee",
    kind: "німецька біржа",
    pay: "так само",
    text: "Те саме, що Xometry, акцент на Німеччину. Теж після того, як вмієте робити і возити.",
    href: "https://www.facturee.de/en/manufacturing-partners/",
  },
] as const;

export const SIMPLE_NO_SITES = [
  "OLX, Prom, Amazon, Allegro — там купують готове, не «зробіть фланець по кресленню».",
  "Facebook-групи «робота в Польщі» — це вакансії людей, не замовлення на деталі.",
  "Сайти тендерів великих заводів — без ISO і історії вас відсіють за 2 хвилини.",
] as const;

export const EU_TRUTH = [
  "Завод платить більше, але без фото деталей і кількох відвантажень креслення не надішле.",
  "Чужий ЧПУ-цех і біржа — посередники. Вони забирають маржу. Це плата за вхід, не ціль.",
  "Пишіть польською або англійською. Українською в ЄС не читають.",
] as const;

export const EU_ORDER = [
  {
    n: "0",
    time: "Поки немає свого верстата",
    title: "Не продавайте ЄС повітря",
    out: "Таблиця: 30 заводів + 15 цехів (цехи — запасний вхід). Листів ще не шлете.",
    do: [
      "Дві колонки в таблиці: «завод» (насоси, сільгосп, гідравліка) і «цех» (якщо прямий лист не зайде).",
      "Заводи: Google «producent pomp Polska», «maszyny rolnicze producent». 10–200 людей, не холдинг.",
      "Одна людина пише PL/EN. Картка в каталозі Дії й чорновик Europages.",
    ],
    dont: "Не розсилайте «візьмемо будь-що» без верстата й фото.",
  },
  {
    n: "1",
    time: "Коли є верстат і 10–20 своїх відвантажень",
    title: "Зберіть доказ, що ви існуєте",
    out: "PDF на 1 сторінку + папка з 8–12 фото.",
    do: [
      "Фото: верстат, деталь зі штангенциркулем, 2–3 типові позиції.",
      "PDF EN+PL: ТОВ, верстати, матеріали, допуск який тримаєте, DAP Польща.",
      "Перевізник Україна→PL, кур’єр для зразків, рахунок у EUR.",
    ],
    dont: "Не пишіть «повний цикл ±0,01». Пишіть те, що вже робили.",
  },
  {
    n: "2",
    time: "Один тиждень",
    title: "Спочатку заводи, цехи — запас",
    out: "20 заводів з ім’ям закупівельника + 10 цехів про запас.",
    do: [
      "На сайті заводу: zaopatrzenie, zakup, contact. LinkedIn: zaopatrzenie + назва фірми.",
      "Цехи залишаєте другим списком: якщо заводи мовчать 3–4 тижні.",
      "Викресліть трейдерів без виробництва.",
    ],
    dont: "Не купуйте бази «5000 email».",
  },
  {
    n: "3",
    time: "Кожен тиждень",
    title: "10 листів на заводи",
    out: "Журнал: кому, коли, відповідь.",
    do: [
      "По 2 листи на день закупівельникам. Тема: CNC tuleje/kołnierze — współpraca bezpośrednia.",
      "PDF у вкладенні. На 8-й день — одне нагадування.",
      "Якщо тиждень заводів мовчить — 2–3 листи в цехи, свідомо як субпідряд.",
    ],
    dont: "Не ставте 40 адрес у копію.",
  },
  {
    n: "4",
    time: "Коли просять ціну",
    title: "КП в євро",
    out: "КП: шт, сума, DAP, строк, 7 днів.",
    do: [
      "Креслення, матеріал, кількість, допуск, термін.",
      "Дорога — окремим рядком. Зразок 1–5 шт, передоплата на метал.",
    ],
    dont: "Не ціна в чаті. Не DDP Берлін без брокера.",
  },
  {
    n: "5",
    time: "Зразок, 1–2 тижні",
    title: "Кур’єр",
    out: "Деталь у Польщі + фото відправки.",
    do: [
      "Інвойс, packing list, фото з лінійкою, трек того ж дня.",
      "Один безкоштовний перероб, якщо брак.",
    ],
    dont: "Не зразок за свій метал «щоб сподобались».",
  },
  {
    n: "6",
    time: "Після «ok, seria»",
    title: "Перша серія",
    out: "Гроші на рахунку, повтор.",
    do: [
      "Підтвердження в пошті. Метал закритий грошима. Палета, брокер.",
      "Не відкривайте другу країну, поки перший не заплатив і не повторив.",
    ],
    dont: "Не віддавайте цього клієнта польському цеху «на обслуговування».",
  },
  {
    n: "7",
    time: "2–3 прямі заводи",
    title: "Тоді ширше",
    out: "ISO 9001, біржі лише як довантаження.",
    do: [
      "Біржа — вікна верстата, не основний продаж: маржа там гірша за цех.",
      "Цех-посередник більше не потрібен, якщо заводи вже йдуть.",
    ],
    dont: "Не робіть польський цех своїм єдиним каналом на роки.",
  },
] as const;

export const EU_CHANNELS = [
  {
    name: "Заводи напряму (насоси, сільгосп, гідравліка)",
    money: "безкоштовно",
    fit: "Своя маржа",
    how: "Google Maps + сайт + LinkedIn zaopatrzenie. Це головний канал, якщо не хочете віддавати 20–40%.",
    href: "https://www.google.com/maps/search/producent+pomp+Polska",
  },
  {
    name: "Польські / чеські ЧПУ-цехи",
    money: "вони забирають 20–40%",
    fit: "Запасний вхід на 5–10 партій",
    how: "usługi CNC toczenie. Пишіть, лише якщо заводи мовчать.",
    href: "https://www.google.com/search?q=us%C5%82ugi+CNC+toczenie+Podkarpackie",
  },
  {
    name: "LinkedIn",
    money: "безкоштовно",
    fit: "Знайти закупівельника",
    how: "zaopatrzenie + pompy / maszyny rolnicze / hydraulika + Poland.",
    href: "https://www.linkedin.com/search/results/people/?keywords=zaopatrzenie%20pompy%20Poland",
  },
  {
    name: "Europages",
    money: "картка безкоштовна",
    fit: "Вивіска",
    how: "Щоб завод міг вас нагуглити. Не черга заявок.",
    href: "https://www.europages.co.uk/en/supplier-registration",
  },
  {
    name: "Дія.Бізнес · каталог експортерів",
    money: "безкоштовно",
    fit: "Офіційний слід",
    how: "Картка експортера, не магазин замовлень.",
    href: "https://business.diia.gov.ua/export/signup",
  },
  {
    name: "Xometry Europe / Facturee",
    money: "ріжуть ціну сильніше за цех",
    fit: "Не старт",
    how: "Біржа. Клієнт не ваш.",
    href: "https://xometry.eu/en/partners/",
  },
] as const;

export const EU_SKIP = [
  "Не пишіть лише цехам і не дивуйтесь, що маржа зникла — ви самі віддали клієнта.",
  "Не пишіть Volkswagen. Пишіть завод насосів на 40 людей у Польщі.",
  "Не ставте EXW з України. DAP склад у Польщі.",
  "Не обіцяйте ±0,01, якщо тримаєте ±0,05.",
] as const;

export const EU_LETTER_FACTORY = `Dzień dobry,

Produkujemy w Ukrainie detale CNC (tuleje, kołnierze, osie — toczenie / 3 osie).
Szukamy bezpośredniej współpracy z producentem, bez pośrednika-maszynowni.

Maszyny: [токарка / фрезер]
Materiały: C45, S355, AISI 304
Dostawa: DAP [місто в PL]
Załączam 1 stronę PDF i zdjęcia.

Mogę wykonać próbkę 1–5 szt. kurierem.

Pozdrawiam,
[ім’я] · [ТОВ] · [телефон]`;

export const EU_LETTER = `Dzień dobry,

Jesteśmy małym zakładem CNC w Ukrainie (toczenie / frezowanie 3 osie).
Szukamy partnera w Polsce na stały overflow: tuleje, kołnierze, osie.
Rozumiemy, że to kooperacja — nie odbieramy Państwa klientów.

Maszyny: [токарка, патрон, фрезер, стіл]
Materiały: C45, S355, AISI 304
Termin: [дні] · DAP [місто в PL]
Załączam 1-stronicowe PDF i zdjęcia detali.

Mogę wziąć próbkę 1–5 szt. kurierem.

Pozdrawiam,
[ім’я] · [ТОВ] · [телефон]`;

export const EU_FOLLOWUP = `Dzień dobry,

Krótko przypominam o współpracy CNC (tuleje/kołnierze, DAP PL).
PDF w poprzedniej wiadomości. Jeśli teraz nie aktualne — dajcie znać.

Pozdrawiam,
[ім’я]`;

export const EU_SEARCH = [
  "producent pomp Polska zaopatrzenie",
  "maszyny rolnicze producent zakup",
  "hydraulika siłowa części CNC",
  "zaopatrzenie obróbka skrawaniem (LinkedIn, завод — не цех)",
  "usługi CNC toczenie Podkarpackie (лише якщо свідомо йдете в посередника)",
] as const;
