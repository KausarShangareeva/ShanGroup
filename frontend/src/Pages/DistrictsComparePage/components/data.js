// Numeric series for the 10 Dubai districts. Source: Property Monitor Q1 2026
// + Bayut averages + DLD transactions. District labels and prose come from
// the i18n JSON (districts-compare.json) — only the numbers live here so the
// derived columns (5-year ROI, SG score) stay locale-independent.
export const RAW = [
  { id: "jvc",      price1br: 320,  priceSqm: 1350, grossYield: 8.8, netYield: 7.2, growth: 9.0,  occ: 89 },
  { id: "jlt",      price1br: 480,  priceSqm: 1800, grossYield: 7.8, netYield: 6.3, growth: 8.2,  occ: 86 },
  { id: "bay",      price1br: 540,  priceSqm: 2000, grossYield: 7.4, netYield: 6.0, growth: 8.0,  occ: 87 },
  { id: "marina",   price1br: 620,  priceSqm: 2200, grossYield: 7.0, netYield: 5.8, growth: 7.5,  occ: 91 },
  { id: "creek",    price1br: 690,  priceSqm: 2300, grossYield: 6.8, netYield: 5.5, growth: 10.5, occ: 84 },
  { id: "mbr",      price1br: 720,  priceSqm: 2400, grossYield: 6.5, netYield: 5.2, growth: 9.0,  occ: 87 },
  { id: "hills",    price1br: 780,  priceSqm: 2500, grossYield: 6.0, netYield: 4.8, growth: 9.5,  occ: 90 },
  { id: "downtown", price1br: 850,  priceSqm: 2800, grossYield: 6.5, netYield: 5.2, growth: 8.5,  occ: 88 },
  { id: "sobha",    price1br: 950,  priceSqm: 2900, grossYield: 5.8, netYield: 4.5, growth: 11.0, occ: 88 },
  { id: "palm",     price1br: 1450, priceSqm: 3800, grossYield: 5.5, netYield: 4.2, growth: 10.0, occ: 85 },
];

function calc5yrROI(d) {
  const p = d.price1br * 1000;
  const init = p * 1.06;
  let cum = 0;
  let r = p * (d.netYield / 100);
  for (let i = 0; i < 5; i += 1) {
    cum += r;
    r *= 1.03;
  }
  const final = p * Math.pow(1 + d.growth / 100, 5);
  return ((cum + (final - p) - final * 0.06) / init) * 100;
}

function calcScore(d) {
  return Math.round(
    Math.min(d.netYield / 7.5, 1) * 36 +
      Math.min(d.growth / 11.5, 1) * 34 +
      Math.min(d.occ / 92, 1) * 20 +
      Math.max(1 - (d.price1br - 220) / 1500, 0) * 10
  );
}

// Merge numeric series with localized prose from the JSON catalog (district id
// is the join key). Returns rows enriched with derived roi5y + score.
export function buildDistricts(localized = []) {
  const byId = new Map(localized.map((d) => [d.id, d]));
  return RAW.map((d) => {
    const meta = byId.get(d.id) || {};
    return {
      ...d,
      ...meta,
      roi5y: calc5yrROI(d),
      score: calcScore(d),
    };
  });
}

export function fmtK(n) {
  if (n >= 1000) {
    const m = n / 1000;
    const fixed = m.toFixed(n >= 1500 ? 1 : 2).replace(/\.?0+$/, "");
    return `$${fixed}M`;
  }
  return `$${n}K`;
}
