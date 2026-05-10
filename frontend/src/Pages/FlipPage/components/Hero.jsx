"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Контрольные точки price-ramp от launch к handover — соответствуют
// сценарию в i18n (Sobha Hartland $520K → $762K за 24 мес.).
const RAMP_POINTS = [
  { x: 0,   y: 200 },
  { x: 66,  y: 188 },
  { x: 133, y: 168 },
  { x: 200, y: 142 },
  { x: 266, y: 110 },
  { x: 333, y: 76 },
  { x: 400, y: 40 },
];
// Подсветка трёх ключевых вех (launch / 50% built / handover).
const RAMP_MARKERS = [
  { x: 8,   y: 200 },
  { x: 200, y: 142 },
  { x: 392, y: 40 },
];

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.hero");
  const trust = t.raw("trust");
  const labels = t.raw("chart.labels");
  const values = t.raw("chart.values");
  const subtitle = t("subtitle");
  const boldFragment = t("subtitleBoldFragment");
  const parts = subtitle.split(boldFragment);

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 36 : 80,
          paddingBottom: isMobile ? 40 : 80,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.15fr 1fr",
            gap: isMobile ? 32 : 56,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px 7px 10px",
                borderRadius: 999,
                background: "var(--bg)",
                boxShadow: "var(--neu-flat)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: "oklch(0.78 0.13 80)",
                }}
              />
              {t("badge")}
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile
                  ? "clamp(38px, 11vw, 54px)"
                  : "clamp(56px, 6.4vw, 88px)",
                lineHeight: 1.02,
                letterSpacing: "-0.012em",
                color: "var(--ink)",
                textWrap: "balance",
              }}
            >
              {t("titleA")}{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--sand-deep)",
                  fontWeight: 400,
                  fontSize: "0.95em",
                }}
              >
                {t("titleB")}
              </span>{" "}
              {t("titleC")}
            </h1>

            <p
              style={{
                margin: isMobile ? "20px 0 0" : "26px 0 0",
                maxWidth: 560,
                fontSize: isMobile ? 15 : 17,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}
            >
              {parts[0]}
              {parts.length > 1 && (
                <strong style={{ color: "var(--ink)" }}>{boldFragment}</strong>
              )}
              {parts[1] || ""}
            </p>

            <div
              style={{
                marginTop: isMobile ? 28 : 36,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <PrimaryButton size="lg" trailingArrow href="#lead">
                {t("ctaPrimary")}
              </PrimaryButton>
              <a
                href="#calc"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "16px 24px",
                  borderRadius: 999,
                  background: "var(--bg)",
                  boxShadow:
                    "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon name="trending-up" size={16} />
                {t("ctaSecondary")}
              </a>
            </div>

            <div
              style={{
                marginTop: isMobile ? 32 : 44,
                display: "flex",
                gap: isMobile ? 20 : 32,
                flexWrap: "wrap",
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
              }}
            >
              {trust.map((it, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {it.v}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {it.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div
              style={{
                borderRadius: 32,
                padding: 32,
                position: "relative",
                background: "var(--bg)",
                boxShadow: NEU_RAISED,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 24,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    {t("chart.kicker")}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      fontSize: 28,
                      marginTop: 6,
                      color: "var(--ink)",
                      letterSpacing: "-0.012em",
                    }}
                  >
                    {t("chart.subject")}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background:
                      "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                    color: "#3a2d10",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".12em",
                  }}
                >
                  {t("chart.badge")}
                </div>
              </div>

              <div style={{ position: "relative", height: 240, marginTop: 8 }}>
                <svg
                  viewBox="0 0 400 240"
                  style={{ width: "100%", height: "100%" }}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="fl-ramp" x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="oklch(0.78 0.13 80)"
                        stopOpacity=".55"
                      />
                      <stop
                        offset="100%"
                        stopColor="oklch(0.78 0.13 80)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  {[0, 60, 120, 180, 240].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="400"
                      y1={y}
                      y2={y}
                      stroke="var(--line)"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                    />
                  ))}
                  <path
                    d={`M${RAMP_POINTS.map((p) => `${p.x} ${p.y}`).join(" L")}`}
                    fill="none"
                    stroke="var(--sand-deep)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${RAMP_POINTS.map((p) => `${p.x} ${p.y}`).join(" L")} L400 240 L0 240 Z`}
                    fill="url(#fl-ramp)"
                  />
                  {RAMP_MARKERS.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r="6"
                      fill="var(--bg)"
                      stroke="var(--sand-deep)"
                      strokeWidth="2.5"
                    />
                  ))}
                </svg>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                  marginTop: 18,
                  paddingTop: 18,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <ChartCell label={labels.launch} value={values.launch} />
                <ChartCell label={labels.handover} value={values.handover} />
                <ChartCell
                  label={labels.profit}
                  value={values.profit}
                  accent
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}

function ChartCell({ label, value, accent }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: "-0.02em",
          marginTop: 4,
          color: accent ? "oklch(0.55 0.13 145)" : "var(--ink)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
