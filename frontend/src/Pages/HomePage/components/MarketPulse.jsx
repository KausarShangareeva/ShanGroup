"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

const MP_DISTRICTS = [
  { id: "palm",     name: "Palm Jumeirah",       roi: 16.5, avgPpsm: 9_400, change: +18.4, supply: 142, demand: 91 },
  { id: "marina",   name: "Dubai Marina",        roi: 11.2, avgPpsm: 5_200, change: +9.7,  supply: 380, demand: 76 },
  { id: "creek",    name: "Dubai Creek Harbour", roi: 14.2, avgPpsm: 4_100, change: +14.2, supply: 220, demand: 84 },
  { id: "bb",       name: "Business Bay",        roi: 12.8, avgPpsm: 3_800, change: +11.4, supply: 520, demand: 71 },
  { id: "downtown", name: "Downtown Dubai",      roi: 13.6, avgPpsm: 6_900, change: +13.0, supply: 290, demand: 88 },
  { id: "jvc",      name: "JVC",                 roi: 8.7,  avgPpsm: 2_400, change: +6.2,  supply: 740, demand: 62 },
];

const MP_TREND_24M = [100, 102, 103, 104, 107, 109, 110, 113, 116, 118, 121, 124, 128, 130, 134, 138, 141, 145, 149, 153, 157, 162, 167, 173];

function monthLabel(i, monthsShort) {
  const start = new Date(2024, 4); // May 2024
  const d = new Date(start.getFullYear(), start.getMonth() + i);
  return `${monthsShort[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
}

function MiniKPI({ label, value, trend }) {
  return (
    <div style={{ borderRadius: 14, padding: "10px 14px", minWidth: 96, boxShadow: NEU_FLAT }}>
      <div
        style={{
          fontSize: 9.5,
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: ".14em",
          color: "var(--muted)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18,
          marginTop: 4,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "oklch(0.5 0.13 145)",
          fontFamily: "'JetBrains Mono', monospace",
          marginTop: 2,
        }}
      >
        {trend}
      </div>
    </div>
  );
}

function PulseChart({ data, isMobile }) {
  const t = useTranslations("HomePage.marketPulse");
  const monthsShort = t.raw("monthsShort");
  const ref = useRef(null);
  const [hover, setHover] = useState(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const H = isMobile ? 200 : 280;
  const padX = 10;
  const padY = 18;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: padX + (i / (data.length - 1)) * (width - padX * 2),
    y: padY + (1 - (v - min) / range) * (H - padY * 2),
    v,
    label: monthLabel(i, monthsShort),
  }));

  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)} ${H - padY} L${pts[0].x.toFixed(1)} ${H - padY} Z`;

  const grid = [0, 0.25, 0.5, 0.75, 1].map((t) => padY + t * (H - padY * 2));

  return (
    <div ref={ref} style={{ width: "100%", height: H, position: "relative" }}>
      <svg width={width} height={H} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="mp-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sand-deep)" stopOpacity=".22" />
            <stop offset="100%" stopColor="var(--sand-deep)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {grid.map((y, i) => (
          <line
            key={i}
            x1={padX}
            y1={y}
            x2={width - padX}
            y2={y}
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray={i === 0 || i === grid.length - 1 ? "0" : "2 4"}
          />
        ))}
        <path d={areaPath} fill="url(#mp-area)" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--sand-deep)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={pts[pts.length - 1].x}
          cy={pts[pts.length - 1].y}
          r="6"
          fill="var(--bg)"
          stroke="var(--sand-deep)"
          strokeWidth="2.5"
        />
        <circle
          cx={pts[pts.length - 1].x}
          cy={pts[pts.length - 1].y}
          r="3"
          fill="var(--sand-deep)"
        />

        {pts.map((p, i) => (
          <rect
            key={i}
            x={p.x - width / data.length / 2}
            y={0}
            width={width / data.length}
            height={H}
            fill="transparent"
            style={{ cursor: "crosshair" }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}

        {hover !== null && (
          <>
            <line
              x1={pts[hover].x}
              y1={padY}
              x2={pts[hover].x}
              y2={H - padY}
              stroke="var(--ink)"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity=".4"
            />
            <circle
              cx={pts[hover].x}
              cy={pts[hover].y}
              r="5"
              fill="var(--bg)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </>
        )}
      </svg>

      {hover !== null && (
        <div
          style={{
            position: "absolute",
            left: Math.min(width - 140, Math.max(0, pts[hover].x + 12)),
            top: Math.max(0, pts[hover].y - 30),
            padding: "8px 12px",
            borderRadius: 10,
            background: "var(--ink)",
            color: "var(--ink-inverse)",
            fontSize: 11.5,
            fontFamily: "'JetBrains Mono', monospace",
            boxShadow: "0 8px 18px rgba(0,0,0,.28)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ opacity: 0.6, fontSize: 10, marginBottom: 2, letterSpacing: ".1em" }}>
            {pts[hover].label}
          </div>
          <div style={{ fontWeight: 700 }}>{t("indexLabel", { n: pts[hover].v })}</div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: padX,
          right: padX,
          bottom: -4,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: "var(--muted)",
          letterSpacing: ".08em",
        }}
      >
        <span>2024 Q1</span>
        <span>2024 Q3</span>
        <span>2025 Q1</span>
        <span>2025 Q3</span>
        <span>2026 Q2</span>
      </div>
    </div>
  );
}

function LeadMagnetCard({ isMobile }) {
  const t = useTranslations("HomePage.marketPulse.leadMagnet");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.match(/.+@.+\..+/)) return;
    setSubmitted(true);
  };

  return (
    <div
      style={{
        borderRadius: 24,
        padding: isMobile ? 20 : 26,
        background: "#0A0A0B",
        color: "#fafaf7",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 18px 40px rgba(10,10,11,.32), inset 0 1px 0 rgba(255,255,255,.06)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="mp-grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 12 L12 12 M12 0 L12 12" stroke="currentColor" strokeWidth=".5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mp-grid)" />
      </svg>

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 11px 5px 9px",
            background: "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.78 0.14 80))",
            color: "#3a2d10",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 14,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "rgba(58,45,16,.18)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
              <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" />
            </svg>
          </span>
          {t("badge")}
        </div>

        <h3
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 22 : 26,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 700,
            textWrap: "balance",
          }}
        >
          {t("titleA")}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "oklch(0.85 0.10 80)" }}>
            {t("titleB")}
          </span>
        </h3>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 13,
            lineHeight: 1.55,
            color: "rgba(255,255,255,.7)",
            maxWidth: 320,
          }}
        >
          {t("desc")}
        </p>

        {!submitted ? (
          <form
            onSubmit={submit}
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 8,
            }}
          >
            <input
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                height: 44,
                padding: "0 16px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.18)",
                background: "rgba(255,255,255,.06)",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                all: "unset",
                cursor: "pointer",
                height: 44,
                padding: "0 20px",
                borderRadius: 12,
                background: "#fff",
                color: "#0A0A0B",
                fontFamily: "inherit",
                fontSize: 13.5,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 6px 14px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.5)",
                transition: "transform .15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {t("submit")}
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7 H11 M7 3 L11 7 L7 11" />
              </svg>
            </button>
          </form>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(60,200,120,.15)",
              border: "1px solid rgba(60,200,120,.3)",
              color: "oklch(0.88 0.12 145)",
              fontSize: 13.5,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M5 8 L7 10 L11 6" />
            </svg>
            {t("sentTo")} {email}
          </div>
        )}

        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            color: "rgba(255,255,255,.5)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".05em",
          }}
        >
          <span>{t("trust")}</span>
        </div>
      </div>
    </div>
  );
}

function MPIcTrend({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10 L6 6 L8 8 L12 4 M12 4 H9 M12 4 V7" />
    </svg>
  );
}
function MPIcCoin({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5" />
      <path d="M5.5 9 H7.5 a1.2 1.2 0 0 0 0 -2.4 H6 a1.2 1.2 0 0 1 0 -2.4 H8.5 M7 4 V10" />
    </svg>
  );
}
function MPIcCrane({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12 V4 L11 4 M11 4 V8 H8 V12 M3 4 L8 4" />
    </svg>
  );
}
function MPIcClock({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5" />
      <path d="M7 4 V7 L9 8.5" />
    </svg>
  );
}

function BottomStat({ label, value, delta, icon }) {
  return (
    <div style={{ borderRadius: 18, padding: "16px 18px", boxShadow: NEU_FLAT }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "var(--bg-2)",
            display: "grid",
            placeItems: "center",
            color: "var(--sand-deep)",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase",
            letterSpacing: ".14em",
            color: "var(--muted)",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 11.5,
          color: "oklch(0.5 0.13 145)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {delta}
      </div>
    </div>
  );
}

export default function MarketPulse() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.marketPulse");
  const KPIS = t.raw("miniKpis");
  const BOTTOM_STATS = t.raw("bottomStats");
  const [activeDistrict, setActiveDistrict] = useState(MP_DISTRICTS[0].id);
  const [tab, setTab] = useState("roi");
  const district = MP_DISTRICTS.find((d) => d.id === activeDistrict);

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 22 : 32,
            marginBottom: isMobile ? 26 : 40,
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
              <span aria-hidden style={{ display: "inline-block", width: isMobile ? 22 : 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 99, background: "#1c8a4a" }} />
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
                margin: isMobile ? "12px 0 0" : "16px 0 0",
                maxWidth: 560,
                fontSize: isMobile ? 14 : 15.5,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}
            >
              {t("subtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr 1fr" : "auto auto auto",
              gap: isMobile ? 8 : 10,
              width: isMobile ? "100%" : "auto",
            }}
          >
            {KPIS.map((k) => (
              <MiniKPI key={k.label} label={k.label} value={k.value} trend={k.trend} />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr",
            gap: isMobile ? 14 : 18,
          }}
        >
          <div
            style={{
              borderRadius: 28,
              padding: isMobile ? 18 : 26,
              minHeight: isMobile ? 480 : 560,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              boxShadow: NEU_RAISED,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  padding: 4,
                  borderRadius: 999,
                  gap: 2,
                  boxShadow: NEU_INSET,
                }}
              >
                {[
                  { v: "roi", l: t("tabs.roi") },
                  { v: "price", l: t("tabs.price") },
                  { v: "demand", l: t("tabs.demand") },
                ].map((tt) => {
                  const a = tab === tt.v;
                  return (
                    <button
                      key={tt.v}
                      onClick={() => setTab(tt.v)}
                      style={{
                        border: 0,
                        cursor: "pointer",
                        borderRadius: 999,
                        padding: "7px 14px",
                        fontFamily: "inherit",
                        fontWeight: 500,
                        fontSize: 12.5,
                        color: a ? "var(--bg)" : "var(--muted)",
                        background: a ? "var(--ink)" : "transparent",
                        boxShadow: a ? "0 4px 12px rgba(0,0,0,.18)" : "none",
                        transition: "all .25s",
                      }}
                    >
                      {tt.l}
                    </button>
                  );
                })}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  color: "var(--muted)",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 99, background: "#1c8a4a" }} />
                {t("updatedAgo")}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {t("districtRange", { name: district.name })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? 42 : 56,
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {tab === "roi" && `${district.roi}%`}
                  {tab === "price" &&
                    `$${district.avgPpsm.toLocaleString("ru-RU").replace(/,/g, " ")}`}
                  {tab === "demand" && `${district.demand}/100`}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "oklch(0.94 0.06 145 / .5)",
                    color: "oklch(0.42 0.14 145)",
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9 L6 5 L8 7 L11 4 M11 4 H8 M11 4 V7" />
                  </svg>
                  +{district.change}% YoY
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: isMobile ? 200 : 280 }}>
              <PulseChart data={MP_TREND_24M} isMobile={isMobile} />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 14,
                paddingTop: 14,
                borderTop: "1px solid var(--line)",
              }}
            >
              {MP_DISTRICTS.map((d) => {
                const a = activeDistrict === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDistrict(d.id)}
                    style={{
                      border: 0,
                      cursor: "pointer",
                      borderRadius: 999,
                      padding: "7px 13px",
                      background: a ? "var(--ink)" : "var(--bg-2)",
                      color: a ? "var(--ink-inverse)" : "var(--ink-2)",
                      fontFamily: "inherit",
                      fontSize: 12,
                      fontWeight: 500,
                      boxShadow: a
                        ? "0 4px 10px rgba(10,10,11,.18)"
                        : "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)",
                      transition: "all .2s",
                    }}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 14 : 18,
            }}
          >
            <div
              style={{
                borderRadius: 24,
                padding: isMobile ? 18 : 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: 1,
                boxShadow: NEU_RAISED,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("topByYield")}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{t("topYtd")}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[...MP_DISTRICTS]
                  .sort((a, b) => b.roi - a.roi)
                  .map((d, i) => {
                    const max = Math.max(...MP_DISTRICTS.map((x) => x.roi));
                    const pct = (d.roi / max) * 100;
                    const a = activeDistrict === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setActiveDistrict(d.id)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          display: "block",
                          padding: "10px 12px",
                          borderRadius: 12,
                          background: a ? "var(--bg-2)" : "transparent",
                          transition: "background .2s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              display: "grid",
                              placeItems: "center",
                              background:
                                i === 0
                                  ? "linear-gradient(135deg, oklch(0.86 0.13 88), oklch(0.76 0.14 75))"
                                  : "var(--bg-2)",
                              color: i === 0 ? "#3a2d10" : "var(--muted)",
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10,
                              fontWeight: 700,
                              boxShadow:
                                i === 0 ? "0 3px 8px rgba(180,140,40,.3)" : "none",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            style={{
                              flex: 1,
                              fontSize: 13,
                              fontWeight: 500,
                              color: "var(--ink)",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {d.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 13,
                              fontWeight: 700,
                              color: "oklch(0.45 0.15 145)",
                            }}
                          >
                            {d.roi}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: 4,
                            borderRadius: 99,
                            background: "var(--line)",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              right: "auto",
                              width: `${pct}%`,
                              background:
                                "linear-gradient(90deg, var(--sand) 0%, var(--sand-deep) 100%)",
                              borderRadius: 99,
                              transition: "width .4s",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            <LeadMagnetCard isMobile={isMobile} />
          </div>
        </div>

        <div
          style={{
            marginTop: isMobile ? 14 : 18,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 10 : 14,
          }}
        >
          {[<MPIcTrend />, <MPIcCoin />, <MPIcCrane />, <MPIcClock />].map((icon, i) => (
            <BottomStat
              key={i}
              label={BOTTOM_STATS[i].label}
              value={BOTTOM_STATS[i].value}
              delta={BOTTOM_STATS[i].delta}
              icon={icon}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
