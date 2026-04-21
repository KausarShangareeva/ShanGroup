"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import { MapPin, Building2, CircleDollarSign, BedDouble, Home, Layers, Eye, Paintbrush, SlidersHorizontal, Search, CheckCircle2, HardHat, CreditCard, TrendingUp } from "lucide-react";
import Flag from "react-world-flags";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import MultiSelect from "./MultiSelect";
import Button from "@/components/Button/Button";
import { EMIRATES } from "@/utils/properties";
import styles from "./PropertyFilter.module.css";
import pillStyles from "./Pill.module.css";

const PAGE_SIZE = 9;

const EMIRATE_NAMES = Object.fromEntries(EMIRATES.map((e) => [e.slug, e.name]));

const TAG_ICONS = {
  location: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  building: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  price: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  status: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  filter: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  beds: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  ),
};
const RATES = { AED: 3.67, USD: 1, SEK: 10.5 };

const PRICE_RANGES = [
  { label: "Любая цена", min: 0, max: Infinity },
  { label: "до 500 000", min: 0, max: 500_000 },
  { label: "500 000 — 1 000 000", min: 500_000, max: 1_000_000 },
  { label: "1 000 000 — 2 500 000", min: 1_000_000, max: 2_500_000 },
  { label: "2 500 000 — 5 000 000", min: 2_500_000, max: 5_000_000 },
  { label: "от 5 000 000", min: 5_000_000, max: Infinity },
];

const STATUS_OPTIONS = [
  { key: "ready",       label: "Готово к заселению", Icon: CheckCircle2 },
  { key: "offPlan",     label: "Строящаяся",          Icon: HardHat      },
  { key: "installment", label: "Рассрочка",            Icon: CreditCard   },
  { key: "investment",  label: "Для инвестиций",       Icon: TrendingUp   },
];

// Per-type extra dropdown configs
const TYPE_EXTRA_FIELDS = {
  "new-builds": [
    {
      key: "type",
      label: "Тип",
      values: (items) => {
        const extra = ["Дуплекс", "Офис", "Отдельные апартаменты"];
        const all = [...new Set([...uniq(items, "type"), ...extra])].sort();
        return all.map((v) => ({ val: v, label: v }));
      },
    },
  ],
  villas: [
    {
      key: "beds",
      label: "Спальни",
      values: (items) =>
        uniq(items, "beds")
          .sort((a, b) => a - b)
          .map((v) => ({ val: v, label: `${v} спальни` })),
    },
    {
      key: "villaType",
      label: "Тип виллы",
      values: (items) =>
        uniq(items, "villaType")
          .sort()
          .map((v) => ({ val: v, label: v })),
    },
  ],
  apartments: [
    {
      key: "beds",
      label: "Комнат",
      values: (items) =>
        uniq(items, "beds")
          .sort((a, b) => a - b)
          .map((v) => ({ val: v, label: v === 0 ? "Студия" : `${v} комн.` })),
    },
    {
      key: "finishType",
      label: "Отделка",
      values: (items) =>
        uniq(items, "finishType")
          .sort()
          .map((v) => ({ val: v, label: v })),
    },
  ],
  townhouses: [
    {
      key: "beds",
      label: "Спальни",
      values: (items) =>
        uniq(items, "beds")
          .sort((a, b) => a - b)
          .map((v) => ({ val: v, label: `${v} спальни` })),
    },
    {
      key: "townhouseType",
      label: "Тип",
      values: (items) =>
        uniq(items, "townhouseType")
          .sort()
          .map((v) => ({ val: v, label: v })),
    },
  ],
  penthouses: [
    {
      key: "view",
      label: "Вид",
      values: (items) =>
        uniq(items, "view")
          .sort()
          .map((v) => ({ val: v, label: v })),
    },
    {
      key: "levels",
      label: "Уровней",
      values: (items) =>
        uniq(items, "levels")
          .sort((a, b) => a - b)
          .map((v) => ({ val: v, label: `${v} уровень` })),
    },
  ],
};

const EXTRA_ICONS = {
  type: Home,
  beds: BedDouble,
  villaType: Home,
  finishType: Paintbrush,
  townhouseType: Home,
  view: Eye,
  levels: Layers,
};

function uniq(items, key) {
  return [...new Set(items.map((p) => p[key]).filter(Boolean))];
}

function parsePrice(str) {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^\d]/g, "") || "0", 10);
}

function fmtRange(range, currency) {
  if (range.min === 0 && range.max === Infinity) return "Любая цена";
  const r = RATES[currency];
  const fmt = (n) =>
    Math.round(n * r)
      .toLocaleString("en-US")
      .replace(/,/g, " ");
  if (range.min === 0) return `до ${fmt(range.max)} ${currency}`;
  if (range.max === Infinity) return `от ${fmt(range.min)} ${currency}`;
  return `${fmt(range.min)} — ${fmt(range.max)} ${currency}`;
}

function asProps(p) {
  return {
    name: p.name,
    price: p.priceUsd,
    district: p.district,
    img: p.image,
    href: `/${p.id}`,
    featured: p.visa,
    offPlan: p.delivery && p.delivery !== "Готово",
    delivery: p.delivery && p.delivery !== "Готово" ? p.delivery : undefined,
    developer: p.developer,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
  };
}

const EMPTY_PENDING = {
  districts: [],
  developers: [],
  priceIdx: 0,
  status: {},
};

export default function PropertyFilter({ items, typeSlug = "villas" }) {
  const extraFields = TYPE_EXTRA_FIELDS[typeSlug] ?? [];

  const [currency, setCurrency] = useState("AED");
  const [showExtra, setShowExtra] = useState(false);

  const [pending, setPending] = useState(EMPTY_PENDING);
  const [pendingExtra, setPendingExtra] = useState({});
  const [applied, setApplied] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const districtOptions = useMemo(
    () => uniq(items, "district").sort(),
    [items],
  );
  const developerOptions = useMemo(
    () => uniq(items, "developer").sort(),
    [items],
  );

  function setPendingField(key, val) {
    setPending((prev) => ({ ...prev, [key]: val }));
  }

  function toggleStatus(key) {
    setPending((prev) => ({
      ...prev,
      status: { ...prev.status, [key]: !prev.status[key] },
    }));
  }

  function setExtraField(key, val) {
    setPendingExtra((prev) => ({ ...prev, [key]: val }));
  }

  function applyFilters() {
    setApplied({ ...pending, extra: { ...pendingExtra } });
    setVisibleCount(PAGE_SIZE);
  }

  function resetFilters() {
    setPending(EMPTY_PENDING);
    setPendingExtra({});
    setApplied(null);
    setVisibleCount(PAGE_SIZE);
  }

  // Tags derived from PENDING — show immediately on selection
  const activeTags = useMemo(() => {
    const tags = [];
    (pending.districts || []).forEach((d) =>
      tags.push({ key: `district_${d}`, label: d, icon: "location" }),
    );
    (pending.developers || []).forEach((d) =>
      tags.push({ key: `developer_${d}`, label: d, icon: "building" }),
    );
    if (pending.priceIdx > 0)
      tags.push({
        key: "price",
        label: fmtRange(PRICE_RANGES[pending.priceIdx], currency),
        icon: "price",
      });
    Object.entries(pending.status || {}).forEach(([key, on]) => {
      if (on) {
        const opt = STATUS_OPTIONS.find((s) => s.key === key);
        if (opt)
          tags.push({ key: `status_${key}`, label: opt.label, icon: "status", IconComponent: opt.Icon });
      }
    });
    // Beds range tag
    const bMin = pendingExtra.bedsMin;
    const bMax = pendingExtra.bedsMax;
    if ((bMin !== "" && bMin !== undefined) || (bMax !== "" && bMax !== undefined)) {
      const minL = bMin === 0 ? "Студия" : bMin !== "" && bMin !== undefined ? String(bMin) : "—";
      const maxL = bMax !== "" && bMax !== undefined ? String(bMax) : "—";
      tags.push({ key: "extra_beds_range", label: `Спальни: ${minL} → ${maxL}`, icon: "beds" });
    }
    Object.entries(pendingExtra || {}).forEach(([key, val]) => {
      if (key === "bedsMin" || key === "bedsMax") return;
      const field = extraFields.find((f) => f.key === key);
      const icon = key === "levels" ? "beds" : "filter";
      const arr = Array.isArray(val) ? val : val ? [val] : [];
      arr.forEach((v) =>
        tags.push({ key: `extra_${key}__${v}`, label: `${field?.label ?? key}: ${v}`, icon })
      );
    });
    return tags;
  }, [pending, pendingExtra, currency, extraFields]);

  // True when pending differs from what's applied
  const isDirty = useMemo(() => {
    if (!applied) return activeTags.length > 0;
    return (
      JSON.stringify({ ...pending, extra: pendingExtra }) !==
      JSON.stringify({ ...applied, extra: applied.extra })
    );
  }, [pending, pendingExtra, applied, activeTags.length]);

  function removeTag(tagKey) {
    if (tagKey === "extra_beds_range") {
      setPendingExtra((prev) => {
        const next = { ...prev, bedsMin: "", bedsMax: "" };
        setApplied((a) => ({ ...(a ?? pending), extra: next }));
        return next;
      });
      return;
    }
    // Update pending then immediately apply so results update
    setPending((prev) => {
      let next = { ...prev };
      if (tagKey.startsWith("district_")) {
        const d = tagKey.replace("district_", "");
        next.districts = (prev.districts || []).filter((v) => v !== d);
      }
      if (tagKey.startsWith("developer_")) {
        const d = tagKey.replace("developer_", "");
        next.developers = (prev.developers || []).filter((v) => v !== d);
      }
      if (tagKey === "price") next.priceIdx = 0;
      if (tagKey.startsWith("status_")) {
        const k = tagKey.replace("status_", "");
        next.status = { ...prev.status, [k]: false };
      }
      setApplied({ ...next, extra: pendingExtra });
      return next;
    });
    if (tagKey.startsWith("extra_")) {
      const rest = tagKey.replace("extra_", "");
      const sep = rest.indexOf("__");
      const fieldKey = rest.slice(0, sep);
      const fieldVal = rest.slice(sep + 2);
      setPendingExtra((prev) => {
        const arr = Array.isArray(prev[fieldKey]) ? prev[fieldKey] : [];
        const next = { ...prev, [fieldKey]: arr.filter((v) => v !== fieldVal) };
        setApplied((a) => ({ ...(a ?? pending), extra: next }));
        return next;
      });
    }
  }

  // Filtered results
  const filtered = useMemo(() => {
    if (!applied) return items;
    const range = PRICE_RANGES[applied.priceIdx || 0];
    return items.filter((p) => {
      if (applied.districts?.length && !applied.districts.includes(p.district))
        return false;
      if (
        applied.developers?.length &&
        !applied.developers.includes(p.developer)
      )
        return false;
      if (range.min > 0 || range.max < Infinity) {
        const price = parsePrice(p.priceUsd);
        if (price < range.min || price > range.max) return false;
      }
      if (applied.status?.ready && p.delivery !== "Готово") return false;
      if (applied.status?.offPlan && p.delivery === "Готово") return false;
      if (applied.status?.installment && p.delivery === "Готово") return false;
      if (applied.status?.investment && !p.visa) return false;
      const bMin = applied.extra?.bedsMin;
      const bMax = applied.extra?.bedsMax;
      if (bMin !== "" && bMin !== undefined && Number(p.beds) < Number(bMin)) return false;
      if (bMax !== "" && bMax !== undefined && Number(p.beds) > Number(bMax)) return false;
      for (const [key, val] of Object.entries(applied.extra || {})) {
        if (key === "bedsMin" || key === "bedsMax") continue;
        const arr = Array.isArray(val) ? val : val ? [val] : [];
        if (arr.length > 0 && !arr.map(String).includes(String(p[key]))) return false;
      }
      return true;
    });
  }, [items, applied]);

  const hasFilters = activeTags.length > 0 || (applied && !isDirty);

  return (
    <>
      <div className={styles.filter}>
        <h2 className={styles.filterTitle}>Найдите идеальное жильё</h2>

        {/* Pill-style filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterField}>
            <div className={styles.filterIconBadge}><MapPin size={18} /></div>
            <div className={styles.filterFieldInner}>
              <span className={styles.filterFieldLabel}>Район</span>
              <MultiSelect
                flat
                options={districtOptions}
                selected={pending.districts}
                onChange={(val) => setPendingField("districts", val)}
                placeholder="Все районы"
              />
            </div>
          </div>

          <div className={styles.filterField}>
            <div className={styles.filterIconBadge}><Building2 size={18} /></div>
            <div className={styles.filterFieldInner}>
              <span className={styles.filterFieldLabel}>Застройщик</span>
              <MultiSelect
                flat
                options={developerOptions}
                selected={pending.developers}
                onChange={(val) => setPendingField("developers", val)}
                placeholder="Все застройщики"
              />
            </div>
          </div>

          <div className={styles.filterField}>
            <div className={styles.filterIconBadge}><CircleDollarSign size={18} /></div>
            <div className={styles.filterFieldInner}>
              <span className={styles.filterFieldLabel}>Цена</span>
              <PricePill
                flat
                priceIdx={pending.priceIdx}
                currency={currency}
                onCurrency={setCurrency}
                onPrice={(i) => setPendingField("priceIdx", i)}
                pillStyles={pillStyles}
              />
            </div>
          </div>

          {extraFields.length > 0 && (
            <button
              type="button"
              className={`${styles.filterExtraBtn} ${showExtra ? styles.filterExtraBtnActive : ""}`}
              onClick={() => setShowExtra((v) => !v)}
              title="Дополнительные фильтры"
            >
              <SlidersHorizontal size={18} />
            </button>
          )}

          <button
            type="button"
            className={`${styles.filterSearchBtn} ${isDirty ? styles.filterSearchBtnDirty : ""}`}
            onClick={applyFilters}
          >
            <Search size={18} />
            Найти
          </button>
        </div>

        {/* Extra fields (expanded) */}
        {showExtra && extraFields.length > 0 && (
          <div className={styles.filterExtraRow}>
            {extraFields.map((field) => {
              const Icon = EXTRA_ICONS[field.key] ?? SlidersHorizontal;
              return (
                <div key={field.key} className={styles.filterField}>
                  <div className={styles.filterIconBadge}><Icon size={18} /></div>
                  <div className={styles.filterFieldInner}>
                    <span className={styles.filterFieldLabel}>{field.label}</span>
                    {field.key === "beds" ? (
                      <BedsRangePill
                        flat
                        bedsMin={pendingExtra.bedsMin ?? ""}
                        bedsMax={pendingExtra.bedsMax ?? ""}
                        onBedsMin={(v) => setExtraField("bedsMin", v)}
                        onBedsMax={(v) => setExtraField("bedsMax", v)}
                        pillStyles={pillStyles}
                      />
                    ) : (
                      <MultiSelect
                        flat
                        options={field.values(items).map((o) => o.label)}
                        selected={pendingExtra[field.key] ?? []}
                        onChange={(val) => setExtraField(field.key, val)}
                        placeholder="Все"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Status pills */}
        <p className={styles.statusLabel}>Статус объекта</p>
        <div className={styles.statusRow}>
          {STATUS_OPTIONS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleStatus(key)}
              className={`${styles.statusBtn} ${pending.status[key] ? styles.statusBtnActive : ""}`}
            >
              <Icon size={14} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>

        {/* Active tags + reset */}
        {(activeTags.length > 0 || applied) && (
          <div className={styles.bottomRow}>
            <div className={styles.tags}>
              {activeTags.map((t) => (
                <span key={t.key} className={styles.tag}>
                  <span className={styles.tagIcon}>
                    {t.IconComponent
                      ? <t.IconComponent size={12} strokeWidth={1.5} />
                      : TAG_ICONS[t.icon]}
                  </span>
                  <span className={styles.tagLabel}>{t.label}</span>
                  <button
                    type="button"
                    className={styles.tagX}
                    onClick={() => removeTag(t.key)}
                    aria-label="Удалить фильтр"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.resetBtn} onClick={resetFilters}>
                Сбросить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Count */}
      <div className={styles.count}>
        <h2 className={styles.countText}>Результаты поиска</h2>
        <span className={styles.countBadge}>{filtered.length}</span>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.slice(0, visibleCount).map((p, i) => (
          <div
            key={p.id}
            className={styles.cardWrap}
            style={{ animationDelay: `${(i % PAGE_SIZE) * 55}ms` }}
          >
            <PropertyCard {...asProps(p)} />
          </div>
        ))}
      </div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className={styles.loadMore}>
          <Button
            label={`${visibleCount} из ${filtered.length} — Посмотреть ещё`}
            icon="plus"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
          />
        </div>
      )}
    </>
  );
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function PricePill({ priceIdx, currency, onCurrency, onPrice, pillStyles, flat = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onOut(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, []);

  const isSet = priceIdx > 0;
  const label = isSet
    ? fmtRange(PRICE_RANGES[priceIdx], currency)
    : "Любая цена";

  return (
    <div className={pillStyles.wrap} ref={ref}>
      <button
        type="button"
        className={`${pillStyles.pill} ${flat ? pillStyles.pillFlat : ""} ${isSet ? (flat ? pillStyles.pillFlatActive : pillStyles.pillActive) : ""} ${!flat && open ? pillStyles.pillOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <svg
          className={`${pillStyles.chevron} ${open ? pillStyles.chevronOpen : ""}`}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={`${pillStyles.dropdown} ${flat ? pillStyles.dropdownFlat : ""}`}>
          {/* Currency toggle */}
          <div className={styles.currencyRow}>
            {[
              { code: "AED", country: "AE" },
              { code: "USD", country: "US" },
              { code: "SEK", country: "SE" },
            ].map(({ code, country }) => (
              <button
                key={code}
                type="button"
                onClick={() => onCurrency(code)}
                className={`${styles.currBtn} ${currency === code ? styles.currBtnActive : ""}`}
              >
                <Flag code={country} className={styles.currFlag} />
                {code}
              </button>
            ))}
          </div>
          <div className={pillStyles.list}>
            {PRICE_RANGES.map((r, i) => (
              <button
                key={i}
                type="button"
                className={`${pillStyles.option} ${priceIdx === i ? pillStyles.optionActive : ""}`}
                onClick={() => {
                  onPrice(i);
                  setOpen(false);
                }}
              >
                {fmtRange(r, currency)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const BED_OPTIONS = [
  { val: "", label: "Любое" },
  { val: 0, label: "Студия" },
  { val: 1, label: "1" },
  { val: 2, label: "2" },
  { val: 3, label: "3" },
  { val: 4, label: "4" },
  { val: 5, label: "5" },
  { val: 6, label: "6" },
  { val: 7, label: "7" },
];

function BedsRangePill({ bedsMin, bedsMax, onBedsMin, onBedsMax, pillStyles, flat = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onOut(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, []);

  const isSet = (bedsMin !== "" && bedsMin !== undefined) || (bedsMax !== "" && bedsMax !== undefined);
  const minLabel = bedsMin === 0 ? "Студия" : bedsMin !== "" && bedsMin !== undefined ? String(bedsMin) : "Мин";
  const maxLabel = bedsMax !== "" && bedsMax !== undefined ? String(bedsMax) : "Макс";
  const displayText = isSet ? `${minLabel} — ${maxLabel}` : "Все";

  return (
    <div className={pillStyles.wrap} ref={ref}>
      <button
        type="button"
        className={`${pillStyles.pill} ${flat ? pillStyles.pillFlat : ""} ${isSet ? (flat ? pillStyles.pillFlatActive : pillStyles.pillActive) : ""} ${!flat && open ? pillStyles.pillOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{displayText}</span>
        <svg
          className={`${pillStyles.chevron} ${open ? pillStyles.chevronOpen : ""}`}
          width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={`${pillStyles.dropdown} ${flat ? pillStyles.dropdownFlat : ""}`}>
          <div className={styles.bedsRow}>
            <div className={styles.bedsCol}>
              <p className={styles.bedsColLabel}>Мин. спален</p>
              <div className={pillStyles.list}>
                {BED_OPTIONS.map((o) => (
                  <button
                    key={String(o.val)}
                    type="button"
                    className={`${pillStyles.option} ${String(bedsMin) === String(o.val) ? pillStyles.optionActive : ""}`}
                    onClick={() => onBedsMin(o.val)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.bedsDivider} />
            <div className={styles.bedsCol}>
              <p className={styles.bedsColLabel}>Макс. спален</p>
              <div className={pillStyles.list}>
                {BED_OPTIONS.map((o) => (
                  <button
                    key={String(o.val)}
                    type="button"
                    className={`${pillStyles.option} ${String(bedsMax) === String(o.val) ? pillStyles.optionActive : ""}`}
                    onClick={() => onBedsMax(o.val)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
