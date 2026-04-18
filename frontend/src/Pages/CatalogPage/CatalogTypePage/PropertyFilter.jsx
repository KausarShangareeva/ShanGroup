"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Flag from "react-world-flags";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import MultiSelect from "./MultiSelect";
import Dropdown from "./Dropdown";
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
  { key: "ready", label: "Готово к заселению" },
  { key: "offPlan", label: "Строящаяся" },
  { key: "installment", label: "Рассрочка" },
  { key: "investment", label: "Для инвестиций" },
];

// Per-type extra dropdown configs
const TYPE_EXTRA_FIELDS = {
  "new-builds": [
    {
      key: "type",
      label: "Тип",
      values: (items) =>
        uniq(items, "type")
          .sort()
          .map((v) => ({ val: v, label: v })),
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
          tags.push({ key: `status_${key}`, label: opt.label, icon: "status" });
      }
    });
    Object.entries(pendingExtra || {}).forEach(([key, val]) => {
      if (val) {
        const field = extraFields.find((f) => f.key === key);
        const icon = key === "beds" || key === "levels" ? "beds" : "filter";
        tags.push({
          key: `extra_${key}`,
          label: `${field?.label ?? key}: ${val}`,
          icon,
        });
      }
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
      const k = tagKey.replace("extra_", "");
      setPendingExtra((prev) => {
        const next = { ...prev, [k]: "" };
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
      for (const [key, val] of Object.entries(applied.extra || {})) {
        if (val && String(p[key]) !== String(val)) return false;
      }
      return true;
    });
  }, [items, applied]);

  const hasFilters = activeTags.length > 0 || (applied && !isDirty);

  return (
    <>
      <div className={styles.filter}>
        {/* Dropdowns grid */}
        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.label}>Район</span>
            <MultiSelect
              options={districtOptions}
              selected={pending.districts}
              onChange={(val) => setPendingField("districts", val)}
              placeholder="Все районы"
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Застройщик</span>
            <MultiSelect
              options={developerOptions}
              selected={pending.developers}
              onChange={(val) => setPendingField("developers", val)}
              placeholder="Все застройщики"
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Цена</span>
            <PricePill
              priceIdx={pending.priceIdx}
              currency={currency}
              onCurrency={setCurrency}
              onPrice={(i) => setPendingField("priceIdx", i)}
              pillStyles={pillStyles}
            />
          </div>

          {extraFields.map((field) => (
            <div key={field.key} className={styles.field}>
              <span className={styles.label}>{field.label}</span>
              <Dropdown
                placeholder={`Все`}
                value={pendingExtra[field.key] ?? ""}
                options={[{ val: "", label: "Все" }, ...field.values(items)]}
                onChange={(val) => setExtraField(field.key, val)}
              />
            </div>
          ))}
        </div>

        {/* Status pills */}
        <div className={styles.statusRow}>
          {STATUS_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleStatus(key)}
              className={`${styles.statusBtn} ${pending.status[key] ? styles.statusBtnActive : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bottom: active tags + actions */}
        <div className={styles.bottomRow}>
          <div className={styles.tags}>
            {activeTags.map((t) => (
              <span key={t.key} className={styles.tag}>
                <span className={styles.tagIcon}>{TAG_ICONS[t.icon]}</span>
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
            <button
              type="button"
              className={`${styles.applyBtn} ${isDirty ? styles.applyBtnDirty : ""}`}
              onClick={applyFilters}
            >
              {isDirty ? "Применить ●" : "Применить"}
            </button>
            {(hasFilters || applied) && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={resetFilters}
              >
                Сбросить
              </button>
            )}
          </div>
        </div>
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

function PricePill({ priceIdx, currency, onCurrency, onPrice, pillStyles }) {
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
        className={`${pillStyles.pill} ${isSet ? pillStyles.pillActive : ""} ${open ? pillStyles.pillOpen : ""}`}
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
        <div className={pillStyles.dropdown}>
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
