// Пресеты районов Дубая для ROI калькулятора.
// price — типовая цена 1BR/2BR в тыс. USD; rent — gross yield %; growth —
// средний рост капитала %/год; occ — историческая заполняемость %.
// Источник: Property Monitor 2024 + Bayut.com усреднённые листинги.
// Метки районов берутся напрямую (бренд-имя), не локализуются.
export const DISTRICTS = [
  { id: "dt", l: "Downtown", price: 850, rent: 6.5, growth: 8.5, occ: 88 },
  { id: "mar", l: "Dubai Marina", price: 620, rent: 7.0, growth: 7.5, occ: 91 },
  { id: "jvc", l: "JVC", price: 320, rent: 8.8, growth: 9.0, occ: 89 },
  { id: "biz", l: "Business Bay", price: 540, rent: 7.4, growth: 8.0, occ: 87 },
  { id: "pj", l: "Palm Jumeirah", price: 1450, rent: 5.5, growth: 10.0, occ: 85 },
  { id: "dh", l: "Dubai Hills", price: 780, rent: 6.0, growth: 9.5, occ: 90 },
];
