"use client";

// ============ SEARCH BAR (working filter) ============
// Faithful port of the artifact `search-bar.jsx`:
//  - desktop: pill bar with per-field popovers (per-field grid positioning)
//  - mobile: pill trigger + bottom sheet
// Each field opens its own panel that reuses the same UI tokens as
// the rest of the editorial-neumorphic system.

import { useState, useEffect, useRef } from "react";
// Type-tile icons stay on lucide — they're large display glyphs, not field icons.
import {
  Home,
  Building,
  Building2,
  Trees,
  Briefcase,
  LandPlot,
} from "lucide-react";
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
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import styles from "./SearchBar.module.css";

// ── DATA ──────────────────────────────────────────────────────
const SB_LOCATIONS = [
  { id: "dxb", label: "Дубай, ОАЭ", count: 2840, sub: "Все районы" },
  { id: "dm", label: "Dubai Marina", count: 312, sub: "Премиум-район" },
  { id: "dt", label: "Downtown Dubai", count: 184, sub: "Burj Khalifa" },
  { id: "pj", label: "Palm Jumeirah", count: 96, sub: "Островная застройка" },
  { id: "bh", label: "Business Bay", count: 268, sub: "Бизнес-центр" },
  { id: "jvc", label: "JVC", count: 540, sub: "Семейный район" },
  { id: "ah", label: "Arabian Ranches", count: 78, sub: "Виллы" },
  { id: "dh", label: "Dubai Hills Estate", count: 124, sub: "Гольф-комьюнити" },
  { id: "auh", label: "Абу-Даби", count: 412, sub: "Saadiyat / Yas" },
  { id: "rak", label: "Рас-эль-Хайма", count: 96, sub: "Al Marjan Island" },
];

// Type icons rendered as 22px line icons above the label —
// matches the artifact's icon-text-stack layout (no surrounding circle).
const SB_TYPES = [
  { id: "apt", label: "Апартаменты", Icon: Building2 },
  { id: "villa", label: "Виллы", Icon: Home },
  { id: "th", label: "Таунхаусы", Icon: Building },
  { id: "ph", label: "Пентхаусы", Icon: Trees },
  { id: "off", label: "Офисы", Icon: Briefcase },
  { id: "land", label: "Земля", Icon: LandPlot },
];

const SB_BEDS = ["Студия", "1", "2", "3", "4", "5+"];

const SB_PRICE_PRESETS = [
  { id: "any", label: "Любая", min: 0, max: 10_000_000 },
  { id: "sub300", label: "до $300K", min: 0, max: 300_000 },
  { id: "300-700", label: "$300K — $700K", min: 300_000, max: 700_000 },
  { id: "700-1.5", label: "$700K — $1.5M", min: 700_000, max: 1_500_000 },
  { id: "1.5-3", label: "$1.5M — $3M", min: 1_500_000, max: 3_000_000 },
  { id: "3plus", label: "$3M+", min: 3_000_000, max: 10_000_000 },
];

const SB_EXTRAS = [
  { id: "offplan", label: "Off-plan / новостройки" },
  { id: "ready", label: "Готовое жильё" },
  { id: "resale", label: "Перепродажа" },
  { id: "golden", label: "Под Golden Visa" },
  { id: "roi8", label: "ROI 8%+" },
  { id: "yield", label: "Sea / Marina view" },
  { id: "branded", label: "Branded residences" },
  { id: "instal", label: "Рассрочка от застройщика" },
];

// ── helpers ───────────────────────────────────────────────────
function fmtPrice(min, max) {
  if (min === 0 && max >= 10_000_000) return "Любая";
  const f = (n) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
      : `${Math.round(n / 1000)}K`;
  if (min === 0) return `до $${f(max)}`;
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
  const [filters, setFilters] = useState({
    location: SB_LOCATIONS[0],
    type: SB_TYPES[0],
    price: SB_PRICE_PRESETS[0],
    priceMin: 0,
    priceMax: 10_000_000,
    beds: "Любые",
    extras: [],
  });
  const [isMobile, setIsMobile] = useState(false);

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
  const [openField, setOpenField] = useState(null);
  const wrapRef = useRef(null);
  useClickOutside(wrapRef, () => setOpenField(null), !!openField);
  useEscape(() => setOpenField(null), !!openField);

  const fields = [
    {
      id: "location",
      Icon: IcPin,
      label: "Локация",
      value: filters.location.label,
    },
    {
      id: "type",
      Icon: IcBuilding,
      label: "Тип недвижимости",
      value: filters.type.label,
    },
    {
      id: "price",
      Icon: IcDollar,
      label: "Цена",
      value: fmtPrice(filters.priceMin, filters.priceMax),
    },
    { id: "beds", Icon: IcBed, label: "Спальни", value: filters.beds },
    {
      id: "extras",
      Icon: IcSliders,
      label: "Ещё",
      value: filters.extras.length
        ? `${filters.extras.length} фильтра`
        : "Фильтры",
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
            Найти
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
  const [q, setQ] = useState("");
  const filtered = SB_LOCATIONS.filter(
    (l) =>
      l.label.toLowerCase().includes(q.toLowerCase()) ||
      l.sub.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <PanelTitle>Локация</PanelTitle>
      <div className={styles.searchInput}>
        <span className={styles.searchInputIcon}>
          <IcSearch size={14} />
        </span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Введите район или город…"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className={styles.searchClear}
            aria-label="Очистить"
          >
            <IcClose size={12} />
          </button>
        )}
      </div>
      <div className={styles.listScroll}>
        {filtered.length === 0 && (
          <div className={styles.empty}>Ничего не найдено</div>
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
  return (
    <div>
      <PanelTitle>Тип недвижимости</PanelTitle>
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
  const cap = 10_000_000;
  return (
    <div>
      <PanelTitle>Цена</PanelTitle>
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
          label="От"
          value={min}
          onChange={(v) => onChange(v, max)}
        />
        <PriceInput
          label="До"
          value={max >= cap ? "" : max}
          onChange={(v) => onChange(min, v || cap)}
          placeholder="без огр."
        />
      </div>
      <div className={styles.panelFooter}>
        <button
          type="button"
          onClick={() => onChange(0, cap)}
          className={styles.resetBtn}
        >
          Сбросить
        </button>
        <PrimaryButton size="sm" onClick={onApply}>
          Применить
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
  const opts = ["Любые", ...SB_BEDS];
  return (
    <div>
      <PanelTitle>Количество спален</PanelTitle>
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
  const toggle = (id) => {
    if (value.includes(id)) onChange(value.filter((x) => x !== id));
    else onChange([...value, id]);
  };
  return (
    <div>
      <PanelTitle>Дополнительные фильтры</PanelTitle>
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
          Сбросить
        </button>
        <PrimaryButton size="sm" onClick={onApply}>
          Применить{value.length ? ` (${value.length})` : ""}
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
  const [open, setOpen] = useState(false);
  const activeCount =
    (filters.extras.length || 0) +
    (filters.beds !== "Любые" ? 1 : 0) +
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
              {filters.beds === "Любые" ? "любые" : `${filters.beds} спал.`}
              {activeCount > 0 ? ` · ${activeCount} фильтра` : ""}
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
          Найти
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
            <div className={styles.sheetTitle}>Поиск объекта</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className={styles.sheetClose}
            >
              <IcClose size={14} />
            </button>
          </div>
        </div>

        <div className={styles.sheetBody}>
          <MobileSection label="Локация">
            <MobileLocation
              value={filters.location}
              onPick={(v) => update({ location: v })}
            />
          </MobileSection>

          <MobileSection label="Тип недвижимости">
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

          <MobileSection label="Цена">
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
                label="От"
                value={filters.priceMin}
                onChange={(v) => update({ priceMin: v })}
              />
              <PriceInput
                label="До"
                value={filters.priceMax >= 10_000_000 ? "" : filters.priceMax}
                onChange={(v) => update({ priceMax: v || 10_000_000 })}
                placeholder="без огр."
              />
            </div>
          </MobileSection>

          <MobileSection label="Спальни">
            <div className={styles.bedsRow}>
              {["Любые", ...SB_BEDS].map((b) => {
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

          <MobileSection label="Дополнительно">
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
                beds: "Любые",
                extras: [],
              })
            }
            className={styles.sheetReset}
          >
            Сбросить
          </button>
          <PrimaryButton
            size="md"
            fullWidth
            icon={<IcSearch />}
            onClick={onClose}
          >
            Найти {totalCount.toLocaleString("ru")} объектов
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
          placeholder="Район, город…"
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
