// Единая «реестровая» точка для всех типов недвижимости. Любая страница
// каталога/эмирата читает данные отсюда, чтобы счётчики, фильтры и группировки
// автоматически обновлялись при добавлении новых записей в JSON-файлы.

import VILLAS from "@/data/properties/villas.json";
import APARTMENTS from "@/data/properties/apartments.json";
import TOWNHOUSES from "@/data/properties/townhouses.json";
import PENTHOUSES from "@/data/properties/penthouses.json";
import WATERFRONT from "@/data/properties/waterfront.json";
import OBJECTS from "@/data/properties/objects.json";

// ── Реестр эмиратов ──────────────────────────────────────────────────────────
// slug — это и URL `/<slug>`, и значение поля `emirate` в JSON.
export const EMIRATES = [
  {
    slug: "dubai",
    name: "Дубай",
    nameIn: "Дубае",
    short: "Дубай",
    href: "/dubai",
    description:
      "Главный экономический и инвестиционный центр ОАЭ. Премиальные комьюнити, мировая инфраструктура и самый ликвидный рынок аренды.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=987&auto=format&fit=crop",
  },
  {
    slug: "abu-dhabi",
    name: "Абу-Даби",
    nameIn: "Абу-Даби",
    short: "Абу-Даби",
    href: "/abu-dhabi",
    description:
      "Столица ОАЭ с фокусом на культуру, образование и стабильные инвестиции. Острова Yas, Saadiyat и Al Reem — главные точки роста.",
    image:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1364&auto=format&fit=crop",
  },
  {
    slug: "sharjah",
    name: "Шарджа",
    nameIn: "Шардже",
    short: "Шарджа",
    href: "/sharjah",
    description:
      "Третий по величине эмират — идеален для семейной жизни и инвестиций с низким порогом входа. Лидер по экологичным «умным» городам.",
    image:
      "https://images.trvl-media.com/place/3152/548a3e58-e90a-4f73-a174-e0c6eb1a03ef.jpg",
  },
  {
    slug: "ajman",
    name: "Аджман",
    nameIn: "Аджмане",
    short: "Аджман",
    href: "/ajman",
    description:
      "Самый маленький эмират ОАЭ с наиболее доступными ценами на недвижимость и активно развивающейся береговой линией.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/cd/e6/16/photo1jpg.jpg?w=1400&h=1400&s=1",
  },
  {
    slug: "umm-al-quwain",
    name: "Умм-эль-Кувейн",
    nameIn: "Умм-эль-Кувейне",
    short: "Умм-эль-Кувейн",
    href: "/umm-al-quwain",
    description:
      "Камерный эмират с уникальным проектом Sobha Siniya Island и нетронутой природой. Отличная локация для приватных инвестиций.",
    image:
      "https://dubaiofw.com/wp-content/uploads/2017/04/UAQ-UAE-FB-Page.jpg",
  },
  {
    slug: "ras-al-khaimah",
    name: "Рас-эль-Хайма",
    nameIn: "Рас-эль-Хайме",
    short: "Рас-эль-Хайма",
    href: "/ras-al-khaimah",
    description:
      "Эмират с самым высоким потенциалом роста цен. Здесь строится первое в ОАЭ казино и развивается курортная зона Al Marjan Island.",
    image:
      "https://www.sovereign.com/-/media/Bynder/Sovereign-destinations/United-Arab-Emirates/Ras-Al-Khaimah/Destination/Ras-Al-Khaimah-2024-Marjan-Island-Shutterstock-2028645407-Hybris.jpg?rev=589681ee8d06464ca02ba4339ed38889&hash=DC856DF018BCC9149329EB2986E2890C",
  },
  {
    slug: "fujairah",
    name: "Фуджейра",
    nameIn: "Фуджейре",
    short: "Фуджейра",
    href: "/fujairah",
    description:
      "Единственный эмират на побережье Индийского океана. Уникальные горные пейзажи, дайвинг-споты и спокойный курортный ритм жизни.",
    image:
      "https://a.storyblok.com/f/95452/2192x1368/a660fcf66c/uae-fujairah-grand-mosque-with-flowers.jpg",
  },
];

export const EMIRATE_BY_SLUG = Object.fromEntries(
  EMIRATES.map((e) => [e.slug, e]),
);

// ── Реестр типов недвижимости ───────────────────────────────────────────────
// Каждый тип знает: где взять список, как его называть и как фильтровать
// записи из всех источников (включая объекты из objects.json).
export const PROPERTY_TYPES = [
  {
    slug: "new-builds",
    label: "Все",
    title: "Вся недвижимость ОАЭ",
    subtitle:
      "Коллекция премиальных резиденций — откройте доступ к закрытым продажам элитных квартир и вилл в самых знаковых локациях Дубая. Мы предлагаем объекты, сочетающие высокую доходность и бескомпромиссный стиль. Ваша идеальная инвестиция в премиальный образ жизни начинается здесь.",
    isAll: true,
    source: [],
    matches: () => true,
  },
  {
    slug: "villas",
    label: "Виллы",
    title: "Виллы на продажу в ОАЭ",
    subtitle:
      "Эксклюзивные виллы и особняки от ведущих застройщиков. Премиальные комьюнити, частные пляжи и закрытые резиденции — гарантия приватности и высокого статуса.",
    source: VILLAS,
    matches: (p) => /вилл/i.test(p.type ?? ""),
  },
  {
    slug: "apartments",
    label: "Квартиры",
    title: "Квартиры на продажу в ОАЭ",
    subtitle:
      "Готовые и off-plan апартаменты в лучших башнях Дубая, Абу-Даби и других эмиратов — от уютных студий до многокомнатных резиденций с гарантированной арендной доходностью.",
    source: APARTMENTS,
    matches: (p) => /апартамент/i.test(p.type ?? ""),
  },
  {
    slug: "townhouses",
    label: "Таунхаусы",
    title: "Таунхаусы на продажу в ОАЭ",
    subtitle:
      "Современные таунхаусы с собственным двором и парковкой — оптимальный баланс между виллой и квартирой для семьи в экологически чистых районах.",
    source: TOWNHOUSES,
    matches: (p) => /таунхаус/i.test(p.type ?? ""),
  },
  {
    slug: "penthouses",
    label: "Пентхаусы",
    title: "Пентхаусы на продажу в ОАЭ",
    subtitle:
      "Эксклюзивные пентхаусы на верхних этажах самых престижных башен — панорамные виды, приватные террасы, брендированные интерьеры и полная налоговая оптимизация.",
    source: PENTHOUSES,
    matches: (p) => /пентхаус/i.test(p.type ?? ""),
  },
  {
    slug: "waterfront",
    label: "Набережная",
    title: "Набережная недвижимость в ОАЭ",
    subtitle:
      "Прибрежная недвижимость Дубая: доступ к яхтингу, пляжам и Michelin-ресторанам. Эксклюзивные резиденции у моря — это не просто дом, а инвестиция в роскошный образ жизни и премиальный комфорт.",
    source: WATERFRONT,
    matches: (p) => /набережная/i.test(p.type ?? ""),
  },
];

export const PROPERTY_TYPE_BY_SLUG = Object.fromEntries(
  PROPERTY_TYPES.map((t) => [t.slug, t]),
);

// ── Объединённый список всех объектов ───────────────────────────────────────
// Дедупликация по id, чтобы пентхаус из penthouses.json не появился дважды,
// если случайно попадёт ещё и в objects.json.
const RAW_ALL = [
  ...VILLAS,
  ...APARTMENTS,
  ...TOWNHOUSES,
  ...PENTHOUSES,
  ...WATERFRONT,
  ...OBJECTS,
];

const seen = new Set();
export const ALL_PROPERTIES = RAW_ALL.filter((p) => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

// ── Хелперы ─────────────────────────────────────────────────────────────────
export function getPropertiesByEmirate(emirateSlug) {
  return ALL_PROPERTIES.filter((p) => p.emirate === emirateSlug);
}

export function countByEmirate(emirateSlug) {
  return getPropertiesByEmirate(emirateSlug).length;
}

// Возвращает разбивку «эмират → количество объектов» по всем семи эмиратам.
// Используется в навигации и виджетах, чтобы цифры обновлялись автоматически.
export function buildEmirateCounts() {
  return EMIRATES.map((e) => ({
    ...e,
    count: countByEmirate(e.slug),
  }));
}

// Все объекты определённого типа из всех источников. Тип определяется по
// функции `matches` из реестра PROPERTY_TYPES, чтобы новые записи попадали
// в нужный тип независимо от того, в каком файле они лежат.
export function getPropertiesByType(typeSlug) {
  const type = PROPERTY_TYPE_BY_SLUG[typeSlug];
  if (!type) return [];
  return ALL_PROPERTIES.filter(type.matches);
}

export function countByType(typeSlug) {
  return getPropertiesByType(typeSlug).length;
}

// Группировка свойств эмирата по типам — нужна странице эмирата, где мы
// показываем отдельный блок для каждого типа.
export function groupEmiratePropertiesByType(emirateSlug) {
  const list = getPropertiesByEmirate(emirateSlug);
  return PROPERTY_TYPES.filter((t) => !t.isAll)
    .map((type) => ({
      type,
      items: list.filter(type.matches),
    }))
    .filter((g) => g.items.length > 0);
}
