"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

// Скелет тиров — числовые границы и id; лейблы/описания подгружаются через t().
function buildTiers(t) {
  return [
    {
      min: 205_000,
      max: 545_000,
      visa: "none",
      label: t("tiers.noneLabel"),
      years: 0,
      desc: t("tiers.noneDesc"),
    },
    {
      min: 545_000,
      max: 2_180_000,
      visa: "2y",
      label: t("tiers.twoYearLabel"),
      years: 2,
      desc: t("tiers.twoYearDesc"),
    },
    {
      min: 2_180_000,
      max: Infinity,
      visa: "10y",
      label: t("tiers.tenYearLabel"),
      years: 10,
      desc: t("tiers.tenYearDesc"),
    },
  ];
}

const GV_DISTRICTS = [
  { id: "marina",   name: "Dubai Marina",        roi: 8.4,  occupancy: 91, ppm: 4_200 },
  { id: "downtown", name: "Downtown Dubai",      roi: 7.2,  occupancy: 94, ppm: 5_800 },
  { id: "palm",     name: "Palm Jumeirah",       roi: 6.8,  occupancy: 89, ppm: 7_400 },
  { id: "creek",    name: "Dubai Creek Harbour", roi: 9.6,  occupancy: 87, ppm: 3_100 },
  { id: "jvc",      name: "Jumeirah Village",    roi: 11.2, occupancy: 88, ppm: 1_900 },
];

const BUDGET_MIN = 205_000;
const BUDGET_MAX = 5_000_000;
const LOG_MIN = Math.log(BUDGET_MIN);
const LOG_MAX = Math.log(BUDGET_MAX);
const LOG_RES = 10_000;

// Локально-зависимое склонение лет: для русского — три формы,
// для остальных языков (en/ar) — единая форма из словаря.
function pluralYears(n, units) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return units.many;
  if (mod10 === 1) return units.one;
  if (mod10 >= 2 && mod10 <= 4) return units.few;
  return units.many;
}

function fmt(n) {
  return "$" + Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");
}
function fmtK(n) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  return "$" + Math.round(n / 1000) + "K";
}

function GVKpi({ label, value, divider, tone }) {
  return (
    <div
      style={{
        paddingLeft: divider ? 12 : 0,
        borderLeft: divider ? "1px solid rgba(255,255,255,.12)" : "none",
      }}
    >
      <div
        style={{
          fontSize: 9.5,
          opacity: 0.6,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20,
          fontWeight: 700,
          marginTop: 3,
          letterSpacing: "-0.02em",
          color: tone === "sand" ? "oklch(0.85 0.13 80)" : "#fff",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function GVVisaBadge({ tier }) {
  const styles =
    tier.visa === "10y"
      ? {
          bg: "linear-gradient(180deg, oklch(0.86 0.13 88) 0%, oklch(0.74 0.14 78) 100%)",
          color: "#3a2d10",
          glow:
            "0 8px 22px oklch(0.74 0.14 78 / .4), inset 0 1px 0 rgba(255,255,255,.5)",
        }
      : tier.visa === "2y"
      ? {
          bg: "var(--ink)",
          color: "#fff",
          glow: "0 6px 16px rgba(10,10,11,.28)",
        }
      : {
          bg: "var(--bg-2)",
          color: "var(--muted)",
          glow: "inset 1px 1px 3px var(--shadow-dark)",
        };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px 8px 8px",
        borderRadius: 999,
        background: styles.bg,
        color: styles.color,
        boxShadow: styles.glow,
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: ".06em",
        textTransform: "uppercase",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 22,
          height: 16,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-grid",
          placeItems: "center",
        }}
      >
        <svg width="22" height="16" viewBox="0 0 22 16">
          <rect x="0" y="0" width="7" height="16" fill="#ce1126" />
          <rect x="7" y="0" width="15" height="5.3" fill="#009a3a" />
          <rect x="7" y="5.3" width="15" height="5.3" fill="#fff" />
          <rect x="7" y="10.6" width="15" height="5.4" fill="#000" />
        </svg>
      </span>
      {tier.label}
    </div>
  );
}

function GVShareBtn({ children, onClick, bg, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        all: "unset",
        cursor: "pointer",
        width: 38,
        height: 38,
        borderRadius: 11,
        background: bg,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        boxShadow:
          "0 4px 10px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.15)",
        transition: "transform .18s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}

function GoldenVisaCalcInner({ isMobile }) {
  const t = useTranslations("HomePage.goldenVisaCalc");
  const yearsUnits = t.raw("yearsLong");
  const tiers = buildTiers(t);
  const [budget, setBudget] = useState(1_200_000);
  const [districtId, setDistrictId] = useState("creek");
  const [horizon, setHorizon] = useState(5);
  const [shared, setShared] = useState(false);

  const district = GV_DISTRICTS.find((d) => d.id === districtId);
  const tier = tiers.find((tt) => budget >= tt.min && budget < tt.max);
  const sqm = Math.round(budget / district.ppm);

  const annualRent = budget * (district.roi / 100);
  const monthlyRent = annualRent / 12;
  const netAnnual = annualRent;
  const totalCashflow = netAnnual * horizon;
  const appreciation = budget * Math.pow(1.055, horizon) - budget;
  const totalReturn = totalCashflow + appreciation;
  const roiTotal = (totalReturn / budget) * 100;

  // RU comparison: 13% rental income tax + 13% capital gains tax
  const ruTaxes = annualRent * 0.13 * horizon + appreciation * 0.13;
  const savedVsRu = ruTaxes;

  // Slider runs in log space so the thumb tracks the mouse and matches
  // the log-positioned tier markers ($545K, $2.18M).
  const budgetLogPct =
    ((Math.log(budget) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
  const sliderValue = Math.round((budgetLogPct / 100) * LOG_RES);
  const onSliderChange = (raw) => {
    const t = raw / LOG_RES;
    const exact = Math.exp(LOG_MIN + t * (LOG_MAX - LOG_MIN));
    setBudget(Math.round(exact / 5000) * 5000);
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Мой расчёт по недвижимости в Дубае: ${fmtK(budget)} — ROI ${roiTotal.toFixed(1)}% за ${horizon} ${pluralYears(horizon, yearsUnits)}, Golden Visa ${tier.years} ${pluralYears(tier.years, yearsUnits)}. Налоги — 0%.`;
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(text + "\n" + url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        /* clipboard blocked */
      }
      return;
    }
    const links = {
      tg: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      wa: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    };
    window.open(links[platform], "_blank", "noopener");
  };

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
          marginBottom: isMobile ? 28 : 44,
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
            <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
            {t("kicker")}
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
            {t("titleA")}{" "}
            <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
              {t("titleB")}
            </span>
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
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
          gap: isMobile ? 14 : 22,
        }}
      >
        <div
          style={{
            borderRadius: 26,
            padding: isMobile ? "22px 20px" : "30px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            boxShadow: NEU_RAISED,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 12,
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {t("budget")}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? "clamp(28px, 7vw, 38px)" : 42,
                    letterSpacing: "-0.025em",
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  {fmt(budget)}
                </div>
              </div>
              <GVVisaBadge tier={tier} />
            </div>

            <div style={{ position: "relative", padding: "26px 0 8px" }}>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: "var(--bg-2)",
                  boxShadow:
                    "inset 1px 1px 3px var(--shadow-dark), inset -1px -1px 3px var(--shadow-light)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    right: "auto",
                    width: `${budgetLogPct}%`,
                    background:
                      tier.visa === "10y"
                        ? "linear-gradient(90deg, var(--sand) 0%, oklch(0.78 0.14 80) 100%)"
                        : tier.visa === "2y"
                        ? "linear-gradient(90deg, var(--sand) 0%, var(--sand-deep) 100%)"
                        : "linear-gradient(90deg, var(--bg-2) 0%, var(--muted-2) 100%)",
                    borderRadius: 99,
                    transition: "background .3s",
                  }}
                />
              </div>

              {[
                { v: 545_000, label: "$545K", tone: "sand" },
                { v: 2_180_000, label: "$2.18M", tone: "gold" },
              ].map((m) => {
                const p =
                  ((Math.log(m.v) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
                const passed = budget >= m.v;
                return (
                  <div
                    key={m.v}
                    style={{
                      position: "absolute",
                      left: `${p}%`,
                      top: 22,
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 99,
                        background: passed
                          ? m.tone === "gold"
                            ? "oklch(0.78 0.14 80)"
                            : "var(--sand-deep)"
                          : "var(--bg)",
                        border: passed ? "none" : "2px solid var(--muted-2)",
                        boxShadow: passed ? "0 2px 6px rgba(0,0,0,.2)" : "none",
                        margin: "0 auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 9.5,
                        color: passed ? "var(--ink-2)" : "var(--muted-2)",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".06em",
                        marginTop: 6,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                );
              })}

              <input
                type="range"
                min={0}
                max={LOG_RES}
                step={1}
                value={sliderValue}
                onChange={(e) => onSliderChange(Number(e.target.value))}
                style={{
                  position: "absolute",
                  inset: "26px 0 8px",
                  width: "100%",
                  opacity: 0,
                  cursor: "pointer",
                  margin: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: `calc(${budgetLogPct}% - 14px)`,
                  top: 19,
                  width: 28,
                  height: 28,
                  borderRadius: 99,
                  background: "var(--ink)",
                  boxShadow:
                    "0 6px 16px rgba(10,10,11,.32), inset 0 1px 0 rgba(255,255,255,.12)",
                  pointerEvents: "none",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 99,
                    background:
                      tier.visa === "10y"
                        ? "oklch(0.85 0.13 80)"
                        : "var(--sand)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--muted)",
                marginTop: 18,
                lineHeight: 1.5,
              }}
            >
              {tier.desc}
            </div>
          </div>

          <div style={{ height: 1, background: "var(--line)" }} />

          <div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--muted)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {t("district")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {GV_DISTRICTS.map((d) => {
                const a = d.id === districtId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDistrictId(d.id)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      padding: "9px 14px",
                      borderRadius: 999,
                      fontSize: 12.5,
                      fontWeight: 500,
                      background: a ? "var(--ink)" : "var(--bg)",
                      color: a ? "var(--ink-inverse)" : "var(--ink-2)",
                      boxShadow: a
                        ? "0 6px 14px rgba(10,10,11,.22)"
                        : "-2px -2px 5px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                      transition: "all .2s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {d.name}
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: a
                          ? "oklch(0.78 0.14 80)"
                          : "oklch(0.55 0.13 145)",
                        fontWeight: 600,
                      }}
                    >
                      {d.roi}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ height: 1, background: "var(--line)" }} />

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
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
                {t("horizon")}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {horizon} {pluralYears(horizon, yearsUnits)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 3, 5, 7, 10, 15].map((y) => (
                <button
                  key={y}
                  onClick={() => setHorizon(y)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    flex: 1,
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    background: horizon === y ? "var(--ink)" : "var(--bg)",
                    color: horizon === y ? "var(--ink-inverse)" : "var(--ink-2)",
                    boxShadow:
                      horizon === y
                        ? "0 4px 10px rgba(10,10,11,.2)"
                        : "-2px -2px 5px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                    transition: "all .2s",
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 14 }}>
          <div
            style={{
              borderRadius: 26,
              padding: isMobile ? "22px 20px" : "26px 28px",
              background:
                tier.visa === "10y"
                  ? "linear-gradient(135deg, oklch(0.18 0.02 80) 0%, oklch(0.10 0.01 80) 100%)"
                  : "#0A0A0B",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              boxShadow: NEU_RAISED,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 220,
                height: 220,
                borderRadius: 999,
                background:
                  tier.visa === "10y"
                    ? "radial-gradient(circle, oklch(0.78 0.14 80 / .25) 0%, transparent 70%)"
                    : "radial-gradient(circle, oklch(0.7 0.08 80 / .15) 0%, transparent 70%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: 10.5,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  opacity: 0.65,
                  marginBottom: 8,
                }}
              >
                {t("result.netIncome", { n: horizon, unit: pluralYears(horizon, yearsUnits) })}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? "clamp(38px, 9vw, 52px)" : 64,
                  letterSpacing: "-0.035em",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  color: tier.visa === "10y" ? "oklch(0.92 0.10 85)" : "#fff",
                }}
              >
                {fmt(totalReturn)}
              </div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>
                {t("result.rentPlusGrowth", { rent: fmt(totalCashflow), growth: fmt(appreciation) })}
              </div>

              <div
                style={{
                  marginTop: 18,
                  paddingTop: 18,
                  borderTop: "1px solid rgba(255,255,255,.12)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                }}
              >
                <GVKpi label={t("result.roiTotal")} value={`${roiTotal.toFixed(1)}%`} tone="sand" />
                <GVKpi label={t("result.monthly")} value={fmtK(monthlyRent)} divider />
                <GVKpi label={t("result.sqm")} value={`${sqm} м²`} divider />
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              padding: isMobile ? "18px 18px" : "20px 22px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: NEU_RAISED,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, oklch(0.65 0.16 145) 0%, oklch(0.45 0.16 145) 100%)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                boxShadow: "0 6px 14px oklch(0.55 0.16 145 / .35)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                0%
              </span>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 10.5,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                {t("result.taxesUae")}
              </div>
              <div
                style={{
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginTop: 3,
                }}
              >
                {t("result.savedVs")}{" "}
                <span style={{ color: "oklch(0.5 0.13 145)" }}>
                  {fmt(savedVsRu)}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {t("result.noTaxNote")}
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              padding: isMobile ? "16px 16px" : "18px 20px",
              boxShadow: NEU_FLAT,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
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
                {t("result.matched", { district: district.name })}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-2)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                {Math.round(12 + (budget / 100_000) * 0.4)} {t("result.options")}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  name:
                    tier.visa === "10y"
                      ? "Bvlgari Lighthouse Penthouse"
                      : tier.visa === "2y"
                      ? "Marina Vista Tower"
                      : "JVC Garden Residences",
                  dev: "EMAAR",
                  size: sqm,
                  rooms:
                    budget > 2_000_000
                      ? "3BR + maid"
                      : budget > 600_000
                      ? "2BR"
                      : "1BR",
                },
                {
                  name: district.name + " Heights",
                  dev: "DAMAC",
                  size: Math.round(sqm * 0.85),
                  rooms:
                    budget > 2_000_000
                      ? "Penthouse"
                      : budget > 600_000
                      ? "2BR"
                      : "Studio",
                },
              ].map((o, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: i === 0 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 99,
                      background: "oklch(0.55 0.13 145)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "var(--ink)",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {o.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginTop: 2,
                        letterSpacing: ".05em",
                      }}
                    >
                      {o.dev} · {o.rooms} · {o.size} м²
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--ink-2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {fmtK(budget * (0.85 + i * 0.15))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: isMobile ? 14 : 18,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: 14,
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: 18,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            boxShadow: NEU_FLAT,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="4" cy="8" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M5.7 7 L10.3 4.7 M5.7 9 L10.3 11.3" />
            </svg>
            {t("result.shareLabel")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <GVShareBtn onClick={() => handleShare("tg")} bg="#229ED9" label="Telegram">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M14.6 2.2 1.7 7.1c-.9.3-.9.8-.2 1l3.3 1 1.3 4c.2.4.3.6.6.6.4 0 .5-.2.7-.4l1.6-1.5 3.3 2.4c.6.3 1 .2 1.2-.6L15.3 3c.2-1-.2-1.4-.7-.8Zm-3 3.4-6.2 5.6-.2 2.6L4 9.4l7.6-4.7c.3-.2.6 0 .4.2Z" />
              </svg>
            </GVShareBtn>
            <GVShareBtn onClick={() => handleShare("wa")} bg="#25D366" label="WhatsApp">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 1.14.3 2.21.83 3.13L1.5 14.5l3.45-.81A6.46 6.46 0 0 0 8 14.5c3.59 0 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5Zm3.71 9.16c-.16.43-.92.83-1.27.86-.34.03-.66.16-2.22-.46-1.88-.74-3.05-2.7-3.14-2.83-.09-.13-.74-1-.74-1.9s.47-1.36.64-1.55c.17-.18.37-.23.49-.23h.35c.11 0 .27-.04.41.32.16.39.55 1.34.6 1.43.05.1.08.2.02.32-.06.13-.09.21-.18.32-.09.11-.19.24-.27.32-.09.09-.18.18-.08.36.1.18.46.76.99 1.23.68.61 1.26.8 1.44.89.18.09.28.07.39-.04.11-.11.45-.52.57-.7.12-.18.24-.15.41-.09.17.06 1.07.5 1.25.6.18.09.31.13.36.21.04.07.04.46-.12.89Z" />
              </svg>
            </GVShareBtn>
            <GVShareBtn onClick={() => handleShare("x")} bg="#000" label="X">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M9.5 7 14.5 1h-1.4L8.9 5.7 5.5 1H1l5.3 7.4L1 15h1.4l4.6-5.2L11 15h4.4ZM7.7 8.7l-.5-.7L3 2H5l3.4 4.7.5.7 4.4 6h-2Z" />
              </svg>
            </GVShareBtn>
            <GVShareBtn
              onClick={() => handleShare("copy")}
              bg="var(--ink-2)"
              label={shared ? t("result.copied") : t("result.copy")}
            >
              {shared ? (
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7 L6 10 L11 4" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="5" width="9" height="9" rx="1.5" />
                  <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
                </svg>
              )}
            </GVShareBtn>
          </div>
        </div>

        <PrimaryButton
          size="lg"
          trailingArrow
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3 H10 L13 6 V13 a1 1 0 0 1 -1 1 H3 a1 1 0 0 1 -1 -1 V4 a1 1 0 0 1 1 -1 Z" />
              <path d="M10 3 V6 H13" />
              <path d="M5 9 H10 M5 11 H8" />
            </svg>
          }
        >
          {t("result.ctaPdf")}
        </PrimaryButton>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 11.5,
          color: "var(--muted)",
          lineHeight: 1.55,
          maxWidth: 720,
        }}
      >
        {t("disclaimer")}
      </div>
    </section>
  );
}

export default function GoldenVisaCalc() {
  const isMobile = useIsMobile();
  return (
    <Container>
      <GoldenVisaCalcInner isMobile={isMobile} />
    </Container>
  );
}
