"use client";

// ============ SEARCH BAR (working filter) ============
// Faithful port of the artifact `search-bar.jsx`:
//  - desktop: pill bar with per-field popovers (per-field grid positioning)
//  - mobile: pill trigger + bottom sheet
// Each field opens its own panel that reuses the same UI tokens as
// the rest of the editorial-neumorphic system.

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  IcPin,
  IcBuilding,
  IcDollar,
  IcBed,
  IcSliders,
  IcSearch,
  IcClose,
  IcCheck,
} from "@/components/HeroIcons/HeroIcons";
import { getIconComponent } from "@/components/Icon/Icon";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import styles from "./SearchBar.module.css";

// Type-tile icons — берём из единого реестра как чистые SVG-компоненты.
const TypeApartments = getIconComponent("building-2");
const TypeVilla = getIconComponent("home");
const TypeTownhouse = getIconComponent("building");
const TypePenthouse = getIconComponent("trees");
const TypeOffice = getIconComponent("briefcase");
const TypeLand = getIconComponent("land-plot");

// ── DATA (фабрики, чтобы лейблы шли из next-intl) ─────────────
function buildLocations(tSB) {
  return [
    { id: "dxb", label: tSB("locations.dxb.label"), count: 2840, sub: tSB("locations.dxb.sub") },
    { id: "dm", label: tSB("locations.dm.label"), count: 312, sub: tSB("locations.dm.sub") },
    { id: "dt", label: tSB("locations.dt.label"), count: 184, sub: tSB("locations.dt.sub") },
    { id: "pj", label: tSB("locations.pj.label"), count: 96, sub: tSB("locations.pj.sub") },
    { id: "bh", label: tSB("locations.bh.label"), count: 268, sub: tSB("locations.bh.sub") },
    { id: "jvc", label: tSB("locations.jvc.label"), count: 540, sub: tSB("locations.jvc.sub") },
    { id: "ah", label: tSB("locations.ah.label"), count: 78, sub: tSB("locations.ah.sub") },
    { id: "dh", label: tSB("locations.dh.label"), count: 124, sub: tSB("locations.dh.sub") },
    { id: "auh", label: tSB("locations.auh.label"), count: 412, sub: tSB("locations.auh.sub") },
    { id: "rak", label: tSB("locations.rak.label"), count: 96, sub: tSB("locations.rak.sub") },
  ];
}

function buildTypes(tSB) {
  return [
    { id: "apt", label: tSB("types.apt"), Icon: TypeApartments },
    { id: "villa", label: tSB("types.villa"), Icon: TypeVilla },
    { id: "th", label: tSB("types.th"), Icon: TypeTownhouse },
    { id: "ph", label: tSB("types.ph"), Icon: TypePenthouse },
    { id: "off", label: tSB("types.off"), Icon: TypeOffice },
    { id: "land", label: tSB("types.land"), Icon: TypeLand },
  ];
}

function buildBeds(tSB) {
  return [tSB("values.studio"), "1", "2", "3", "4", "5+"];
}

function buildPricePresets(tSB) {
  return [
    { id: "any", label: tSB("values.any"), min: 0, max: 10_000_000 },
    { id: "sub300", label: "до $300K", min: 0, max: 300_000 },
    { id: "300-700", label: "$300K — $700K", min: 300_000, max: 700_000 },
    { id: "700-1.5", label: "$700K — $1.5M", min: 700_000, max: 1_500_000 },
    { id: "1.5-3", label: "$1.5M — $3M", min: 1_500_000, max: 3_000_000 },
    { id: "3plus", label: "$3M+", min: 3_000_000, max: 10_000_000 },
  ];
}

function buildExtras(tSB) {
  return [
    { id: "offplan", label: tSB("extras.offplan") },
    { id: "ready", label: tSB("extras.ready") },
    { id: "resale", label: tSB("extras.resale") },
    { id: "golden", label: tSB("extras.golden") },
    { id: "roi8", label: tSB("extras.roi8") },
    { id: "yield", label: tSB("extras.yield") },
    { id: "branded", label: tSB("extras.branded") },
    { id: "instal", label: tSB("extras.instal") },
  ];
}

// ── helpers ───────────────────────────────────────────────────
function fmtPrice(min, max, tSB) {
  if (min === 0 && max >= 10_000_000) return tSB ? tSB("values.any") : "Любая";
  const f = (n) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
      : `${Math.round(n / 1000)}K`;
  const fromLabel = tSB ? tSB("values.fromLabel").toLowerCase() : "от";
  if (min === 0) return `${fromLabel === "от" ? "до" : "to"} $${f(max)}`;
  if (max >= 10_000_000) return `$${f(min)}+`;
  return `$${f(min)} — $${f(max)}`;
}

function useClickOutside(ref, onOutside, when = true) {
  useEffect(() => {
    if (!when) return;
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside(e);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [when, onOutside, ref]);
}

function useEscape(onEsc, when = true) {
  useEffect(() => {
    if (!when) return;
    const fn = (e) => {
      if (e.key === "Escape") onEsc();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [when, onEsc]);
}

// ── ROOT ──────────────────────────────────────────────────────
export default function SearchBar() {
  const tSB = useTranslations("SearchBar");
  const SB_LOCATIONS = buildLocations(tSB);
  const SB_TYPES = buildTypes(tSB);
  const SB_PRICE_PRESETS = buildPricePresets(tSB);
  const ANY_BEDS = tSB("values.anyBeds");

  const [filters, setFilters] = useState(() => ({
    location: SB_LOCATIONS[0],
    type: SB_TYPES[0],
    price: SB_PRICE_PRESETS[0],
    priceMin: 0,
    priceMax: 10_000_000,
    beds: ANY_BEDS,
    extras: [],
  }));
  const [isMobile, setIsMobile] = useState(false);

  // Если язык поменялся — обновляем label-поля у выбранных значений,
  // чтобы не показывать русский лейбл при английской локали.
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      location:
        SB_LOCATIONS.find((l) => l.id === f.location.id) || SB_LOCATIONS[0],
      type: SB_TYPES.find((t) => t.id === f.type.id) || SB_TYPES[0],
      beds: f.beds === "Любые" || f.beds === "Any" ? ANY_BEDS : f.beds,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tSB]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 920);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const update = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const totalCount = 2840;

  if (isMobile) {
    return (
      <MobileSearch filters={filters} update={update} totalCount={totalCount} />
    );
  }
  return (
    <DesktopSearch filters={filters} update={update} totalCount={totalCount} />
  );
}

// ============================================================
// DESKTOP — pill bar with per-field dropdowns
// ============================================================
function DesktopSearch({ filters, update, totalCount }) {
  const tSB = useTranslations("SearchBar");
  const tCommon = useTranslations("Common");
  const [openField, setOpenField] = useState(null);
  const wrapRef = useRef(null);
  useClickOutside(wrapRef, () => setOpenField(null), !!openField);
  useEscape(() => setOpenField(null), !!openField);

  const fields = [
    {
      id: "location",
      Icon: IcPin,
      label: tSB("fields.location"),
      value: filters.location.label,
    },
    {
      id: "type",
      Icon: IcBuilding,
      label: tSB("fields.type"),
      value: filters.type.label,
    },
    {
      id: "price",
      Icon: IcDollar,
      label: tSB("fields.price"),
      value: fmtPrice(filters.priceMin, filters.priceMax, tSB),
    },
    { id: "beds", Icon: IcBed, label: tSB("fields.beds"), value: filters.beds },
    {
      id: "extras",
      Icon: IcSliders,
      label: tSB("fields.extras"),
      value: filters.extras.length
        ? tSB("values.filtersBadge", { count: filters.extras.length })
        : tSB("values.filtersDefault"),
    },
  ];

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.bar}>
        {fields.map((f, i) => (
          <DesktopField
            key={f.id}
            Icon={f.Icon}
            label={f.label}
            value={f.value}
            active={openField === f.id}
            divider={i > 0}
            onClick={() =>
              setOpenField(openField === f.id ? null : f.id)
            }
          />
        ))}
        <div className={styles.searchBtnWrap}>
          <PrimaryButton size="md" icon={<IcSearch />}>
            {tCommon("actions.find")}
          </PrimaryButton>
        </div>
      </div>

      {openField && (
        <DropdownPanel field={openField}>
          {openField === "location" && (
            <LocationPanel
              value={filters.location}
              onPick={(v) => {
                update({ location: v });
                setOpenField(null);
              }}
            />
          )}
          {openField === "type" && (
            <TypePanel
              value={filters.type}
              onPick={(v) => {
                update({ type: v });
                setOpenField(null);
              }}
            />
          )}
          {openField === "price" && (
            <PricePanel
              min={filters.priceMin}
              max={filters.priceMax}
              onChange={(min, max) =>
                update({ priceMin: min, priceMax: max })
              }
              onApply={() => setOpenField(null)}
            />
          )}
          {openField === "beds" && (
            <BedsPanel
              value={filters.beds}
              onPick={(v) => {
                update({ beds: v });
                setOpenField(null);
              }}
            />
          )}
          {openField === "extras" && (
            <ExtrasPanel
              value={filters.extras}
              onChange={(v) => update({ extras: v })}
              onApply={() => setOpenField(null)}
            />
          )}
        </DropdownPanel>
      )}
    </div>
  );
}

function DesktopField({ Icon, label, value, active, divider, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.field} ${active ? styles.fieldActive : ""} ${
        divider ? styles.fieldDivider : ""
      }`}
    >
      <div className={styles.fieldLabelRow}>
        <span className={styles.fieldIcon}>
          <Icon size={13} />
        </span>
        {label}
      </div>
      <div className={styles.fieldValueRow}>
        <span className={styles.fieldValue}>{value}</span>
        <span
          aria-hidden
          className={`${styles.fieldChevron} ${active ? styles.fieldChevronOpen : ""}`}
        >
          ▾
        </span>
      </div>
    </button>
  );
}

// Generic dropdown chrome — positioned per the artifact's grid math
function DropdownPanel({ field, children }) {
  const wide = field === "location" || field === "extras" || field === "type";
  const positionClass = styles[`pos_${field}`] || "";
  return (
    <div
      className={`${styles.panelWrap} ${positionClass} ${
        wide ? styles.panelWide : ""
      }`}
    >
      <div className={styles.panel}>{children}</div>
    </div>
  );
}

// ============================================================
// PANELS
// ============================================================

function PanelTitle({ children }) {
  return <div className={styles.panelTitle}>{children}</div>;
}

function LocationPanel({ value, onPick }) {
  const tSB = useTranslations("SearchBar");
  const tCommon = useTranslations("Common");
  const SB_LOCATIONS = buildLocations(tSB);
  const [q, setQ] = useState("");
  const filtered = SB_LOCATIONS.filter(
    (l) =>
      l.label.toLowerCase().includes(q.toLowerCase()) ||
      l.sub.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <PanelTitle>{tSB("panels.locationTitle")}</PanelTitle>
      <div className={styles.searchInput}>
        <span className={styles.searchInputIcon}>
          <IcSearch size={14} />
        </span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tSB("placeholders.locationSearch")}
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className={styles.searchClear}
            aria-label={tCommon("actions.reset")}
          >
            <IcClose size={12} />
          </button>
        )}
      </div>
      <div className={styles.listScroll}>
        {filtered.length === 0 && (
          <div className={styles.empty}>{tCommon("common.nothingFound")}</div>
        )}
        {filtered.map((l) => (
          <PanelRow
            key={l.id}
            active={l.id === value.id}
            onClick={() => onPick(l)}
            primary={l.label}
            secondary={l.sub}
            trail={
              <span className={styles.rowCount}>
                {l.count.toLocaleString("ru")}
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

function TypePanel({ value, onPick }) {
  const tSB = useTranslations("SearchBar");
  const SB_TYPES = buildTypes(tSB);
  return (
    <div>
      <PanelTitle>{tSB("panels.typeTitle")}</PanelTitle>
      <div className={styles.typeGrid}>
        {SB_TYPES.map((t) => {
          const active = t.id === value.id;
          const Icon = t.Icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onPick(t)}
              className={`${styles.typeTile} ${active ? styles.typeTileActive : ""}`}
            >
              <span className={styles.typeIcon}>
                <Icon size={22} strokeWidth={1.4} />
              </span>
              <span className={styles.typeLabel}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PricePanel({ min, max, onChange, onApply }) {
  const tSB = useTranslations("SearchBar");
  const tCommon = useTranslations("Common");
  const SB_PRICE_PRESETS = buildPricePresets(tSB);
  const cap = 10_000_000;
  return (
    <div>
      <PanelTitle>{tSB("panels.priceTitle")}</PanelTitle>
      <div className={styles.pricePresets}>
        {SB_PRICE_PRESETS.map((p) => {
          const active = p.min === min && p.max === max;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange(p.min, p.max)}
              className={`${styles.presetChip} ${active ? styles.presetChipActive : ""}`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className={styles.priceRange}>
        <PriceInput
          label={tSB("values.fromLabel")}
          value={min}
          onChange={(v) => onChange(v, max)}
        />
        <PriceInput
          label={tSB("values.toLabel")}
          value={max >= cap ? "" : max}
          onChange={(v) => onChange(min, v || cap)}
          placeholder={tSB("values.noLimit")}
        />
      </div>
      <div className={styles.panelFooter}>
        <button
          type="button"
          onClick={() => onChange(0, cap)}
          className={styles.resetBtn}
        >
          {tCommon("actions.reset")}
        </button>
        <PrimaryButton size="sm" onClick={onApply}>
          {tCommon("actions.apply")}
        </PrimaryButton>
      </div>
    </div>
  );
}

function PriceInput({ label, value, onChange, placeholder }) {
  const display =
    value === ""
      ? ""
      : typeof value === "number"
        ? value.toLocaleString("ru")
        : value;
  return (
    <label className={styles.priceField}>
      <span className={styles.priceFieldLabel}>{label}, $</span>
      <input
        inputMode="numeric"
        value={display}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          onChange(raw === "" ? 0 : parseInt(raw, 10));
        }}
      />
    </label>
  );
}

function BedsPanel({ value, onPick }) {
  const tSB = useTranslations("SearchBar");
  const opts = [tSB("values.anyBeds"), ...buildBeds(tSB)];
  return (
    <div>
      <PanelTitle>{tSB("panels.bedsTitle")}</PanelTitle>
      <div className={styles.bedsRow}>
        {opts.map((b) => {
          const active = b === value;
          return (
            <button
              key={b}
              type="button"
              onClick={() => onPick(b)}
              className={`${styles.bedChip} ${active ? styles.bedChipActive : ""}`}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ExtrasPanel({ value, onChange, onApply }) {
  const tSB = useTranslations("SearchBar");
  const tCommon = useTranslations("Common");
  const SB_EXTRAS = buildExtras(tSB);
  const toggle = (id) => {
    if (value.includes(id)) onChange(value.filter((x) => x !== id));
    else onChange([...value, id]);
  };
  return (
    <div>
      <PanelTitle>{tSB("panels.extrasTitle")}</PanelTitle>
      <div className={styles.extrasGrid}>
        {SB_EXTRAS.map((ex) => {
          const active = value.includes(ex.id);
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => toggle(ex.id)}
              className={`${styles.extraChip} ${active ? styles.extraChipActive : ""}`}
            >
              <span
                aria-hidden
                className={`${styles.checkbox} ${active ? styles.checkboxActive : ""}`}
              >
                {active && <IcCheck size={11} />}
              </span>
              {ex.label}
            </button>
          );
        })}
      </div>
      <div className={styles.panelFooter}>
        <button
          type="button"
          onClick={() => onChange([])}
          className={styles.resetBtn}
        >
          {tCommon("actions.reset")}
        </button>
        <PrimaryButton size="sm" onClick={onApply}>
          {tCommon("actions.apply")}{value.length ? ` (${value.length})` : ""}
        </PrimaryButton>
      </div>
    </div>
  );
}

function PanelRow({ primary, secondary, trail, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.row} ${active ? styles.rowActive : ""}`}
    >
      <div className={styles.rowMain}>
        <div className={styles.rowPrimary}>
          {active && (
            <span className={styles.rowDot} aria-hidden>
              •
            </span>
          )}
          {primary}
        </div>
        {secondary && <div className={styles.rowSecondary}>{secondary}</div>}
      </div>
      {trail && <div className={styles.rowTrail}>{trail}</div>}
    </button>
  );
}

// ============================================================
// MOBILE — pill trigger + bottom sheet
// ============================================================
function MobileSearch({ filters, update, totalCount }) {
  const tSB = useTranslations("SearchBar");
  const tCommon = useTranslations("Common");
  const ANY_BEDS = tSB("values.anyBeds");
  const [open, setOpen] = useState(false);
  const activeCount =
    (filters.extras.length || 0) +
    (filters.beds !== ANY_BEDS ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 10_000_000 ? 1 : 0);

  return (
    <>
      <div className={styles.mobileTrigger}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={styles.mobileTriggerBtn}
        >
          <span className={styles.mobileTriggerPin}>
            <IcPin size={16} />
          </span>
          <div className={styles.mobileTriggerText}>
            <div className={styles.mobileTriggerKicker}>
              {filters.type.label} ·{" "}
              {filters.beds === ANY_BEDS
                ? tSB("values.anyBedsLowercase")
                : tSB("values.bedsAbbr", { n: filters.beds })}
              {activeCount > 0
                ? ` · ${tSB("values.filtersBadge", { count: activeCount })}`
                : ""}
            </div>
            <div className={styles.mobileTriggerValue}>
              {filters.location.label}
            </div>
          </div>
        </button>
        <PrimaryButton
          size="md"
          icon={<IcSearch />}
          onClick={() => setOpen(true)}
        >
          {tCommon("actions.find")}
        </PrimaryButton>
      </div>

      {open && (
        <MobileSheet
          filters={filters}
          update={update}
          totalCount={totalCount}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function MobileSheet({ filters, update, totalCount, onClose }) {
  const tSB = useTranslations("SearchBar");
  const tCommon = useTranslations("Common");
  const SB_LOCATIONS = buildLocations(tSB);
  const SB_TYPES = buildTypes(tSB);
  const SB_PRICE_PRESETS = buildPricePresets(tSB);
  const SB_BEDS = buildBeds(tSB);
  const SB_EXTRAS = buildExtras(tSB);
  const ANY_BEDS = tSB("values.anyBeds");
  useEscape(onClose, true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className={styles.sheetWrap}>
      <div className={styles.sheetBackdrop} onClick={onClose} />
      <div role="dialog" aria-modal="true" className={styles.sheet}>
        <div className={styles.sheetHeader}>
          <div className={styles.sheetHandle} aria-hidden />
          <div className={styles.sheetHeaderRow}>
            <div className={styles.sheetTitle}>{tSB("mobile.title")}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label={tCommon("actions.close")}
              className={styles.sheetClose}
            >
              <IcClose size={14} />
            </button>
          </div>
        </div>

        <div className={styles.sheetBody}>
          <MobileSection label={tSB("mobile.secLocation")}>
            <MobileLocation
              value={filters.location}
              onPick={(v) => update({ location: v })}
            />
          </MobileSection>

          <MobileSection label={tSB("mobile.secType")}>
            <div className={styles.typeGrid}>
              {SB_TYPES.map((t) => {
                const active = t.id === filters.type.id;
                const Icon = t.Icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => update({ type: t })}
                    className={`${styles.typeTile} ${active ? styles.typeTileActive : ""}`}
                  >
                    <span className={styles.typeIcon}>
                      <Icon size={20} strokeWidth={1.4} />
                    </span>
                    <span className={styles.typeLabel}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </MobileSection>

          <MobileSection label={tSB("mobile.secPrice")}>
            <div className={styles.pricePresets}>
              {SB_PRICE_PRESETS.map((p) => {
                const active =
                  p.min === filters.priceMin && p.max === filters.priceMax;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      update({ priceMin: p.min, priceMax: p.max })
                    }
                    className={`${styles.presetChip} ${active ? styles.presetChipActive : ""}`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            <div className={styles.priceRange}>
              <PriceInput
                label={tSB("values.fromLabel")}
                value={filters.priceMin}
                onChange={(v) => update({ priceMin: v })}
              />
              <PriceInput
                label={tSB("values.toLabel")}
                value={filters.priceMax >= 10_000_000 ? "" : filters.priceMax}
                onChange={(v) => update({ priceMax: v || 10_000_000 })}
                placeholder={tSB("values.noLimit")}
              />
            </div>
          </MobileSection>

          <MobileSection label={tSB("mobile.secBeds")}>
            <div className={styles.bedsRow}>
              {[ANY_BEDS, ...SB_BEDS].map((b) => {
                const active = b === filters.beds;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => update({ beds: b })}
                    className={`${styles.bedChip} ${active ? styles.bedChipActive : ""}`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </MobileSection>

          <MobileSection label={tSB("mobile.secExtras")}>
            <div className={styles.extrasList}>
              {SB_EXTRAS.map((ex) => {
                const active = filters.extras.includes(ex.id);
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => {
                      if (active)
                        update({
                          extras: filters.extras.filter((x) => x !== ex.id),
                        });
                      else update({ extras: [...filters.extras, ex.id] });
                    }}
                    className={`${styles.extraChipMobile} ${active ? styles.extraChipMobileActive : ""}`}
                  >
                    <span
                      aria-hidden
                      className={`${styles.checkboxLg} ${active ? styles.checkboxLgActive : ""}`}
                    >
                      {active && <IcCheck size={13} />}
                    </span>
                    <span>{ex.label}</span>
                  </button>
                );
              })}
            </div>
          </MobileSection>
        </div>

        <div className={styles.sheetFooter}>
          <button
            type="button"
            onClick={() =>
              update({
                location: SB_LOCATIONS[0],
                type: SB_TYPES[0],
                priceMin: 0,
                priceMax: 10_000_000,
                beds: ANY_BEDS,
                extras: [],
              })
            }
            className={styles.sheetReset}
          >
            {tCommon("actions.reset")}
          </button>
          <PrimaryButton
            size="md"
            fullWidth
            icon={<IcSearch />}
            onClick={onClose}
          >
            {tSB("values.findCount", { count: totalCount.toLocaleString("ru") })}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function MobileSection({ label, children }) {
  return (
    <div>
      <div className={styles.mobileSectionLabel}>{label}</div>
      {children}
    </div>
  );
}

function MobileLocation({ value, onPick }) {
  const tSB = useTranslations("SearchBar");
  const SB_LOCATIONS = buildLocations(tSB);
  const [q, setQ] = useState("");
  const filtered = SB_LOCATIONS.filter(
    (l) =>
      l.label.toLowerCase().includes(q.toLowerCase()) ||
      l.sub.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <div className={`${styles.searchInput} ${styles.searchInputBordered}`}>
        <span className={styles.searchInputIcon}>
          <IcSearch size={14} />
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tSB("placeholders.locationSearchMobile")}
        />
      </div>
      <div className={styles.mobileLocList}>
        {filtered.map((l, i) => {
          const active = l.id === value.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onPick(l)}
              className={`${styles.mobileLocRow} ${active ? styles.mobileLocRowActive : ""}`}
              style={i === 0 ? { borderTop: "none" } : undefined}
            >
              <div>
                <div className={styles.mobileLocName}>
                  {active && (
                    <span className={styles.rowDot} aria-hidden>
                      •
                    </span>
                  )}
                  {l.label}
                </div>
                <div className={styles.mobileLocSub}>{l.sub}</div>
              </div>
              <span className={styles.rowCount}>
                {l.count.toLocaleString("ru")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
