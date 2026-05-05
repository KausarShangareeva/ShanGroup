// Single source of truth for the homepage funnel: PropertyTabs (cards) + CompareTray (modal).
// Both read from FUNNEL_PROPERTIES so likes flow end-to-end via the shared `useLikes` hook.

const AGENT_ANNA = {
  name: "Анна Ким",
  role: "Property Consultant",
  phone: "+971 4 261 8838",
  email: "anna@shangroup.ae",
  whatsapp: "+971426188384",
  avatar:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop&crop=faces",
};
const AGENT_IGOR = {
  name: "Игорь Шан",
  role: "Senior Consultant",
  phone: "+971 4 261 8839",
  email: "igor@shangroup.ae",
  whatsapp: "+971426188385",
  avatar:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop&crop=faces",
};

export const FUNNEL_PROPERTIES = {
  "burj-vista": {
    name: "Burj Vista Tower",
    dev: "EMAAR",
    district: "Downtown Dubai",
    img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=900&q=80&auto=format&fit=crop",
    beds: "1–3",
    baths: 2,
    sqm: 78,
    price: 2_100_000,
    roi: 8.4,
    handover: "Q4 2027",
    occupancy: 91,
    paymentPlan: "60/40",
    agent: AGENT_ANNA,
  },
  "marina-vista-pt": {
    name: "Marina Vista",
    dev: "EMAAR",
    district: "Dubai Marina",
    img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?w=900&q=80&auto=format&fit=crop",
    beds: "1–4",
    baths: 2,
    sqm: 92,
    price: 412_000,
    roi: 12.8,
    handover: "Q4 2027",
    occupancy: 89,
    paymentPlan: "60/40",
    agent: AGENT_IGOR,
  },
  "creek-h-pt": {
    name: "Creek Harbour Heights",
    dev: "EMAAR",
    district: "Creek Harbour",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop",
    beds: "Studio–3",
    baths: 1,
    sqm: 64,
    price: 850_000,
    roi: 9.6,
    handover: "Q1 2028",
    occupancy: 87,
    paymentPlan: "50/50",
    agent: AGENT_ANNA,
  },
  "tilal-lagoon": {
    name: "Tilal Al Ghaf Lagoon",
    dev: "MAJID AL FUTTAIM",
    district: "Tilal Al Ghaf",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop",
    beds: "4–6",
    baths: 5,
    sqm: 412,
    price: 3_800_000,
    roi: 7.2,
    handover: "Q3 2027",
    occupancy: 84,
    paymentPlan: "40/60",
    agent: AGENT_IGOR,
  },
  "palm-beach-villas": {
    name: "Palm Beach Villas",
    dev: "NAKHEEL",
    district: "Palm Jumeirah",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop",
    beds: "5",
    baths: 6,
    sqm: 680,
    price: 12_400_000,
    roi: 6.4,
    handover: "Готов",
    occupancy: 92,
    paymentPlan: "100% наличные",
    agent: AGENT_ANNA,
  },
  "damac-lagoons": {
    name: "Damac Lagoons",
    dev: "DAMAC",
    district: "Damac Lagoons",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
    beds: "4–6",
    baths: 4,
    sqm: 320,
    price: 1_950_000,
    roi: 8.8,
    handover: "Q2 2028",
    occupancy: 86,
    paymentPlan: "50/50",
    agent: AGENT_IGOR,
  },
  "arabian-3": {
    name: "Arabian Ranches III",
    dev: "EMAAR",
    district: "Arabian Ranches",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop",
    beds: "3–4",
    baths: 4,
    sqm: 245,
    price: 680_000,
    roi: 9.2,
    handover: "Q1 2028",
    occupancy: 88,
    paymentPlan: "60/40",
    agent: AGENT_ANNA,
  },
  "the-valley": {
    name: "The Valley",
    dev: "EMAAR",
    district: "The Valley",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop",
    beds: "3–4",
    baths: 3,
    sqm: 210,
    price: 540_000,
    roi: 10.4,
    handover: "Q4 2027",
    occupancy: 90,
    paymentPlan: "70/30",
    agent: AGENT_IGOR,
  },
  "mudon-ranim": {
    name: "Mudon Al Ranim",
    dev: "DUBAI Properties",
    district: "Mudon",
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=900&q=80&auto=format&fit=crop",
    beds: "3–5",
    baths: 4,
    sqm: 268,
    price: 720_000,
    roi: 8.6,
    handover: "Q2 2028",
    occupancy: 85,
    paymentPlan: "50/50",
    agent: AGENT_ANNA,
  },
};

export const FUNNEL_TABS = {
  apt:   { label: "Апартаменты", count: 184, ids: ["burj-vista", "marina-vista-pt", "creek-h-pt"] },
  villa: { label: "Виллы",       count: 67,  ids: ["tilal-lagoon", "palm-beach-villas", "damac-lagoons"] },
  town:  { label: "Таунхаусы",   count: 42,  ids: ["arabian-3", "the-valley", "mudon-ranim"] },
};

export function formatPrice(n) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  return "$" + Math.round(n / 1000) + "K";
}

// Visa eligibility from price (in USD), per UAE rules:
//   ≥ $545K → 10y Golden Visa, ≥ $205K → 2y residence, else none.
export function visaTier(price) {
  if (price >= 545_000) return "10y";
  if (price >= 205_000) return "2y";
  return "none";
}
