"use client";

import { useState, useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";
const LINE_STRONG = "oklch(0.78 0.005 75)";

const CC_METRICS = [
  { id: "tax_rent",     label: "Налог на аренду",      icon: "tax",      better: "min", unit: "%" },
  { id: "tax_capital",  label: "Налог на прирост",     icon: "trend",    better: "min", unit: "%" },
  { id: "roi",          label: "Средний ROI",          icon: "chart",    better: "max", unit: "%" },
  { id: "appreciation", label: "Рост цен 2024",        icon: "growth",   better: "max", unit: "%" },
  { id: "safety",       label: "Индекс безопасности",  icon: "shield",   better: "max", unit: "/100" },
  { id: "visa",         label: "ВНЖ за инвестиции",    icon: "visa",     better: "yes", unit: "" },
  { id: "currency",     label: "Стабильность валюты",  icon: "currency", better: "max", unit: "/10" },
];

const CC_COUNTRIES = {
  uae: {
    name: "ОАЭ",
    code: "AE",
    isHero: true,
    flagSvg: (
      <g>
        <rect x="0" y="0" width="9" height="18" fill="#ce1126" />
        <rect x="9" y="0" width="15" height="6" fill="#009a3a" />
        <rect x="9" y="6" width="15" height="6" fill="#fff" />
        <rect x="9" y="12" width="15" height="6" fill="#000" />
      </g>
    ),
    values: { tax_rent: 0, tax_capital: 0, roi: 8.4, appreciation: 18.4, safety: 84.5, visa: "10 лет", currency: 9.8 },
  },
  russia: {
    name: "Россия",
    code: "RU",
    flagSvg: (
      <g>
        <rect x="0" y="0" width="24" height="6" fill="#fff" />
        <rect x="0" y="6" width="24" height="6" fill="#0039a6" />
        <rect x="0" y="12" width="24" height="6" fill="#d52b1e" />
      </g>
    ),
    values: { tax_rent: 13, tax_capital: 13, roi: 5.1, appreciation: 7.2, safety: 58.2, visa: "нет", currency: 4.1 },
  },
  kazakhstan: {
    name: "Казахстан",
    code: "KZ",
    flagSvg: (
      <g>
        <rect x="0" y="0" width="24" height="18" fill="#00afca" />
        <circle cx="12" cy="9" r="3.2" fill="#fec50c" />
      </g>
    ),
    values: { tax_rent: 10, tax_capital: 10, roi: 6.8, appreciation: 9.1, safety: 67.3, visa: "нет", currency: 5.6 },
  },
  uk: {
    name: "Великобритания",
    code: "GB",
    flagSvg: (
      <g>
        <rect width="24" height="18" fill="#012169" />
        <path d="M0 0L24 18M24 0L0 18" stroke="#fff" strokeWidth="2.5" />
        <path d="M12 0V18M0 9H24" stroke="#fff" strokeWidth="4" />
        <path d="M12 0V18M0 9H24" stroke="#c8102e" strokeWidth="2" />
      </g>
    ),
    values: { tax_rent: 28, tax_capital: 24, roi: 4.2, appreciation: 2.1, safety: 73.4, visa: "$2M+", currency: 7.2 },
  },
  usa: {
    name: "США",
    code: "US",
    flagSvg: (
      <g>
        <rect width="24" height="18" fill="#b22234" />
        {[1, 3, 5, 7, 9, 11].map((i) => (
          <rect key={i} y={i * 1.4} width="24" height="1.4" fill="#fff" />
        ))}
        <rect width="11" height="9.8" fill="#3c3b6e" />
      </g>
    ),
    values: { tax_rent: 25, tax_capital: 20, roi: 6.3, appreciation: 5.4, safety: 65.2, visa: "EB-5 $800K", currency: 8.4 },
  },
  germany: {
    name: "Германия",
    code: "DE",
    flagSvg: (
      <g>
        <rect width="24" height="6" fill="#000" />
        <rect y="6" width="24" height="6" fill="#dd0000" />
        <rect y="12" width="24" height="6" fill="#ffce00" />
      </g>
    ),
    values: { tax_rent: 26, tax_capital: 26, roi: 3.8, appreciation: 1.8, safety: 79.6, visa: "нет", currency: 7.8 },
  },
  turkey: {
    name: "Турция",
    code: "TR",
    flagSvg: (
      <g>
        <rect width="24" height="18" fill="#e30a17" />
        <circle cx="9" cy="9" r="3.2" fill="#fff" />
        <circle cx="9.8" cy="9" r="2.6" fill="#e30a17" />
        <path d="M14 7 l1 1.4 1.7 .2 -1.3 1.2 .3 1.7 -1.5 -.8 -1.5 .8 .3 -1.7 -1.3 -1.2 1.7 -.2 z" fill="#fff" />
      </g>
    ),
    values: { tax_rent: 20, tax_capital: 0, roi: 5.9, appreciation: 12.4, safety: 56.1, visa: "$400K", currency: 3.2 },
  },
  georgia: {
    name: "Грузия",
    code: "GE",
    flagSvg: (
      <g>
        <rect width="24" height="18" fill="#fff" />
        <rect x="10" width="4" height="18" fill="#ff0000" />
        <rect y="7" width="24" height="4" fill="#ff0000" />
      </g>
    ),
    values: { tax_rent: 5, tax_capital: 5, roi: 7.4, appreciation: 8.6, safety: 64.8, visa: "нет", currency: 5.0 },
  },
  cyprus: {
    name: "Кипр",
    code: "CY",
    flagSvg: (
      <g>
        <rect width="24" height="18" fill="#fff" />
        <path d="M9 7 q3 -1 6 0 q-1 2 -3 3 q-2 -1 -3 -3 z" fill="#d57800" />
        <path d="M8 12 q1 -1 3 -1 m2 0 q2 0 3 1" fill="none" stroke="#4e5b31" strokeWidth=".5" />
      </g>
    ),
    values: { tax_rent: 22, tax_capital: 20, roi: 5.2, appreciation: 4.1, safety: 71.0, visa: "€300K", currency: 7.6 },
  },
  belarus: {
    name: "Беларусь",
    code: "BY",
    flagSvg: (
      <g>
        <rect width="24" height="18" fill="#ce0e2d" />
        <rect y="12" width="24" height="6" fill="#7bba39" />
        <rect width="3" height="18" fill="#fff" />
      </g>
    ),
    values: { tax_rent: 13, tax_capital: 13, roi: 4.6, appreciation: 3.2, safety: 60.4, visa: "нет", currency: 3.6 },
  },
  uzbekistan: {
    name: "Узбекистан",
    code: "UZ",
    flagSvg: (
      <g>
        <rect width="24" height="6" fill="#1eb53a" />
        <rect y="6" width="24" height="6" fill="#fff" />
        <rect y="12" width="24" height="6" fill="#ce1126" />
      </g>
    ),
    values: { tax_rent: 12, tax_capital: 12, roi: 6.2, appreciation: 7.8, safety: 62.1, visa: "нет", currency: 4.2 },
  },
  azerbaijan: {
    name: "Азербайджан",
    code: "AZ",
    flagSvg: (
      <g>
        <rect width="24" height="6" fill="#3f9c35" />
        <rect y="6" width="24" height="6" fill="#ed2939" />
        <rect y="12" width="24" height="6" fill="#00b9e4" />
        <circle cx="11" cy="9" r="2.5" fill="#fff" />
        <circle cx="11.6" cy="9" r="2" fill="#ed2939" />
      </g>
    ),
    values: { tax_rent: 14, tax_capital: 14, roi: 5.4, appreciation: 5.8, safety: 65.8, visa: "нет", currency: 5.2 },
  },
};

const CC_PICKER_KEYS = Object.keys(CC_COUNTRIES).filter((k) => k !== "uae");

function CCMetricIcon({ kind, size = 14 }) {
  const s = {
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (kind === "tax")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <path d="M3 13 V5 H13 V13 Z" />
        <path d="M5 8 H11 M5 11 H8" />
      </svg>
    );
  if (kind === "trend")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <path d="M3 12 L7 7 L9 9 L13 4 M13 4 H10 M13 4 V7" />
      </svg>
    );
  if (kind === "chart")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <path d="M3 13 H13 M5 11 V8 M8 11 V5 M11 11 V7" />
      </svg>
    );
  if (kind === "growth")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <path d="M8 14 V6 M5 9 L8 6 L11 9" />
        <circle cx="8" cy="3" r="1.5" />
      </svg>
    );
  if (kind === "shield")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <path d="M8 2 L13 4 V8 C13 11 10.5 13.5 8 14 C5.5 13.5 3 11 3 8 V4 Z" />
        <path d="M5.5 8 L7 9.5 L10.5 6.5" />
      </svg>
    );
  if (kind === "visa")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <rect x="2.5" y="3.5" width="11" height="9" rx="1.4" />
        <circle cx="6" cy="7" r="1.5" />
        <path d="M9 6 H12 M9 8 H12 M4 11 H12" />
      </svg>
    );
  if (kind === "currency")
    return (
      <svg {...s} viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="5.5" />
        <path d="M9.5 6.5 a 1.5 1.5 0 0 0 -3 0 c 0 1.5 3 1 3 2.5 a 1.5 1.5 0 0 1 -3 0 M8 4.5 V11.5" />
      </svg>
    );
  return null;
}

function CCFlagHeader({ country, hero }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "flex-start",
      }}
    >
      <span
        style={{
          width: 26,
          height: 18,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.12)",
          flexShrink: 0,
        }}
      >
        <svg width="26" height="18" viewBox="0 0 24 18">
          {country.flagSvg}
        </svg>
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
          }}
        >
          {country.name}
        </div>
        {hero && (
          <div
            style={{
              fontSize: 9,
              color: "var(--sand-deep)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ★ Лидер
          </div>
        )}
      </div>
    </div>
  );
}

function CCValueCell({ value, unit, wins, hero }) {
  const display =
    typeof value === "number"
      ? (value % 1 === 0 ? value : value.toFixed(1)) + unit
      : value;
  const isNo = value === "нет";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: wins
            ? hero
              ? "oklch(0.55 0.13 145)"
              : "var(--ink)"
            : isNo
            ? "oklch(0.55 0.18 25)"
            : "var(--ink-2)",
          whiteSpace: "nowrap",
        }}
      >
        {display}
      </span>
      {wins && (
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "oklch(0.55 0.13 145)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7 L6 10 L11 4" />
          </svg>
        </span>
      )}
      {isNo && (
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "oklch(0.92 0.05 25)",
            color: "oklch(0.55 0.18 25)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 3.5 L10.5 10.5 M10.5 3.5 L3.5 10.5" />
          </svg>
        </span>
      )}
    </div>
  );
}

function CCInsight({ icon, title, body }) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        boxShadow: NEU_FLAT,
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          flexShrink: 0,
          background: "var(--bg)",
          color: "var(--sand-deep)",
          display: "grid",
          placeItems: "center",
          boxShadow:
            "-1px -1px 3px var(--shadow-light), 1px 1px 3px var(--shadow-dark)",
        }}
      >
        <CCMetricIcon kind={icon} size={16} />
      </span>
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: "var(--muted)",
            marginTop: 4,
            lineHeight: 1.5,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

function CountryCompareInner({ isMobile }) {
  const [opponentId, setOpponentId] = useState("russia");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const opponent = CC_COUNTRIES[opponentId];
  const dubai = CC_COUNTRIES.uae;
  const pickerRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const winsCount = CC_METRICS.filter((m) => {
    const d = dubai.values[m.id],
      o = opponent.values[m.id];
    if (m.better === "min") return d < o;
    if (m.better === "max")
      return typeof d === "number" && typeof o === "number"
        ? d > o
        : false;
    if (m.better === "yes") return d !== "нет" && o === "нет";
    return false;
  }).length;

  const filtered = CC_PICKER_KEYS.filter((k) =>
    CC_COUNTRIES[k].name.toLowerCase().includes(search.toLowerCase())
  );
  const quickPicks = ["russia", "kazakhstan", "uk"];

  return (
    <section
      style={{
        paddingTop: isMobile ? 60 : 100,
        paddingBottom: isMobile ? 40 : 70,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 24 : 32,
          marginBottom: isMobile ? 28 : 40,
        }}
      >
        <div style={{ flex: 1, maxWidth: 720 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 10.5 : 11.5,
              fontWeight: 500,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--sand-deep)",
              marginBottom: isMobile ? 14 : 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 32,
                height: 1,
                background: "var(--sand-deep)",
                opacity: 0.55,
              }}
            />
            Сравнить с вашей страной
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: isMobile
                ? "clamp(30px, 8vw, 40px)"
                : "clamp(42px, 4.4vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.012em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            ОАЭ{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--sand-deep)",
                fontWeight: 400,
              }}
            >
              vs
            </span>{" "}
            ваша страна
          </h2>
          <p
            style={{
              margin: isMobile ? "14px 0 0" : "18px 0 0",
              maxWidth: 540,
              fontSize: isMobile ? 14 : 15.5,
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            7 ключевых метрик для инвестора. Выберите свою страну из списка —
            сравним напрямую.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              padding: 4,
              borderRadius: 999,
              display: "inline-flex",
              gap: 2,
              boxShadow: NEU_INSET,
            }}
          >
            {quickPicks.map((id) => {
              const a = id === opponentId;
              return (
                <button
                  key={id}
                  onClick={() => setOpponentId(id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: isMobile ? "8px 12px" : "10px 14px",
                    borderRadius: 999,
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 500,
                    color: a ? "var(--bg)" : "var(--muted)",
                    background: a ? "var(--ink)" : "transparent",
                    boxShadow: a
                      ? "0 4px 12px rgba(10,10,11,.25)"
                      : "none",
                    transition: "all .25s",
                  }}
                >
                  {CC_COUNTRIES[id].name}
                </button>
              );
            })}
          </div>

          <div ref={pickerRef} style={{ position: "relative" }}>
            <button
              onClick={() => setPickerOpen((o) => !o)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "10px 16px 10px 12px",
                borderRadius: 999,
                border: pickerOpen
                  ? "1.5px solid var(--ink)"
                  : `1.5px solid ${LINE_STRONG}`,
                background: !quickPicks.includes(opponentId)
                  ? "var(--ink)"
                  : "transparent",
                color: !quickPicks.includes(opponentId)
                  ? "var(--bg)"
                  : "var(--ink)",
                fontSize: 13,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all .2s",
              }}
            >
              {!quickPicks.includes(opponentId) ? (
                <>
                  <span
                    style={{
                      width: 18,
                      height: 13,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 0 0 1px rgba(255,255,255,.3)",
                    }}
                  >
                    <svg width="18" height="13" viewBox="0 0 24 18">
                      {opponent.flagSvg}
                    </svg>
                  </span>
                  {opponent.name}
                </>
              ) : (
                "Другая страна"
              )}
              <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: pickerOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform .2s",
                }}
              >
                <path d="M3 5 L7 9 L11 5" />
              </svg>
            </button>

            {pickerOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "var(--bg)",
                  borderRadius: 16,
                  padding: 8,
                  minWidth: 280,
                  zIndex: 50,
                  boxShadow:
                    NEU_RAISED + ", 0 18px 40px rgba(10,10,11,.18)",
                }}
              >
                <div style={{ padding: "4px 8px 8px" }}>
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск страны…"
                    style={{
                      all: "unset",
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      fontSize: 13,
                      background: "var(--bg-2)",
                      color: "var(--ink)",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <div
                  style={{
                    maxHeight: 280,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {filtered.length === 0 && (
                    <div
                      style={{
                        padding: "12px 14px",
                        fontSize: 12.5,
                        color: "var(--muted)",
                        textAlign: "center",
                      }}
                    >
                      Не найдено
                    </div>
                  )}
                  {filtered.map((k) => {
                    const c = CC_COUNTRIES[k];
                    const sel = k === opponentId;
                    return (
                      <button
                        key={k}
                        onClick={() => {
                          setOpponentId(k);
                          setPickerOpen(false);
                          setSearch("");
                        }}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          padding: "9px 12px",
                          borderRadius: 10,
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          gap: 10,
                          alignItems: "center",
                          background: sel
                            ? "rgba(10,10,11,.05)"
                            : "transparent",
                          transition: "background .15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!sel)
                            e.currentTarget.style.background =
                              "rgba(10,10,11,.03)";
                        }}
                        onMouseLeave={(e) => {
                          if (!sel)
                            e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span
                          style={{
                            width: 22,
                            height: 16,
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: "0 0 0 1px rgba(0,0,0,.08)",
                          }}
                        >
                          <svg width="22" height="16" viewBox="0 0 24 18">
                            {c.flagSvg}
                          </svg>
                        </span>
                        <span
                          style={{
                            fontSize: 13.5,
                            fontWeight: 500,
                            color: "var(--ink)",
                          }}
                        >
                          {c.name}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontFamily: "'JetBrains Mono', monospace",
                            color: "var(--muted)",
                            letterSpacing: ".08em",
                          }}
                        >
                          {c.code}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 22,
          padding: isMobile ? "18px 18px" : "20px 26px",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          boxShadow: NEU_RAISED,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, oklch(0.86 0.13 88) 0%, oklch(0.74 0.14 78) 100%)",
              color: "#3a2d10",
              display: "grid",
              placeItems: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "-0.02em",
              boxShadow:
                "0 6px 14px oklch(0.74 0.14 78 / .35), inset 0 1px 0 rgba(255,255,255,.5)",
            }}
          >
            {winsCount}
          </span>
          <div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--muted)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              ОАЭ выигрывает
            </div>
            <div
              style={{
                fontSize: 14.5,
                fontWeight: 600,
                color: "var(--ink)",
                marginTop: 3,
              }}
            >
              из {CC_METRICS.length} метрик vs <strong>{opponent.name}</strong>
            </div>
          </div>
        </div>
        <PrimaryButton size="md" trailingArrow>
          Получить детальный анализ
        </PrimaryButton>
      </div>

      <div
        style={{
          borderRadius: 22,
          padding: isMobile ? "8px 4px" : "12px 8px",
          overflow: "hidden",
          boxShadow: NEU_RAISED,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1.4fr 1fr 1fr"
              : "1.4fr 1fr 1fr",
            gap: 0,
            padding: isMobile ? "10px 12px" : "10px 18px",
            borderBottom: "1px solid var(--line)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 10.5,
              color: "var(--muted)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            Метрика
          </div>
          <CCFlagHeader country={dubai} hero />
          <CCFlagHeader country={opponent} />
        </div>

        {CC_METRICS.map((m, i) => {
          const d = dubai.values[m.id],
            o = opponent.values[m.id];
          let dWins = false,
            oWins = false;
          if (m.better === "min" && typeof d === "number") {
            dWins = d < o;
            oWins = o < d;
          } else if (m.better === "max" && typeof d === "number") {
            dWins = d > o;
            oWins = o > d;
          } else if (m.better === "yes") {
            dWins = d !== "нет";
            oWins = o !== "нет" && o !== d;
          }
          return (
            <div
              key={m.id}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1.4fr 1fr 1fr"
                  : "1.4fr 1fr 1fr",
                gap: 0,
                padding: isMobile ? "12px 12px" : "14px 18px",
                borderBottom:
                  i < CC_METRICS.length - 1
                    ? "1px solid var(--line)"
                    : "none",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "var(--bg-2)",
                    color: "var(--sand-deep)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <CCMetricIcon kind={m.icon} />
                </span>
                <span
                  style={{
                    fontSize: isMobile ? 12.5 : 13.5,
                    fontWeight: 500,
                    color: "var(--ink-2)",
                    lineHeight: 1.25,
                  }}
                >
                  {m.label}
                </span>
              </div>
              <CCValueCell value={d} unit={m.unit} wins={dWins} hero />
              <CCValueCell value={o} unit={m.unit} wins={oWins} />
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
        }}
      >
        <CCInsight
          icon="tax"
          title="0% налогов на аренду и прирост"
          body={(() => {
            const taxLost = opponent.values.tax_rent;
            if (taxLost === 0)
              return `В ${opponent.name} тоже 0% налог — но рынок Дубая растёт быстрее.`;
            return `В ${opponent.name} ${taxLost}% налог. На $1M портфеле теряете ~$${Math.round(
              taxLost * 12
            )}K за 5 лет.`;
          })()}
        />
        <CCInsight
          icon="visa"
          title="Golden Visa на 10 лет"
          body="Виза для всей семьи + право работать. Без обязательного проживания."
        />
      </div>
    </section>
  );
}

export default function CountryCompare() {
  const isMobile = useIsMobile();
  return (
    <Container>
      <CountryCompareInner isMobile={isMobile} />
    </Container>
  );
}
