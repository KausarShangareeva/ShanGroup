"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("OffPlanPage.hero");
  const trust = t.raw("trust");
  const points = t.raw("chart.points");
  const labels = t.raw("chart.labels");
  const values = t.raw("chart.values");

  // SVG-точки кривой роста: 6 контрольных точек от брони к перепродаже.
  const chartCoords = [
    { x: 10, y: 150 },
    { x: 90, y: 138 },
    { x: 160, y: 118 },
    { x: 230, y: 88 },
    { x: 310, y: 50 },
    { x: 370, y: 30 },
  ];

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
                  background: "oklch(0.66 0.16 145)",
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
              {t("titleA")}
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--sand-deep)",
                  fontWeight: 400,
                  fontSize: "0.95em",
                }}
              >
                {t("titleB")}
              </span>
              <br />
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
              {t("subtitle")}
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
                href="#how"
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
            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: 32,
                  padding: 32,
                  position: "relative",
                  overflow: "hidden",
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

                <svg
                  viewBox="0 0 380 180"
                  width="100%"
                  height="220"
                  style={{ display: "block" }}
                >
                  <defs>
                    <linearGradient id="op-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--sand-deep)" stopOpacity=".4" />
                      <stop offset="100%" stopColor="var(--sand-deep)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      x2="380"
                      y1={30 + i * 40}
                      y2={30 + i * 40}
                      stroke="var(--line)"
                      strokeDasharray="2 4"
                      strokeWidth=".5"
                    />
                  ))}
                  <path
                    d="M10 150 Q60 145 90 138 T160 118 T230 88 T310 50 L370 30"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 150 Q60 145 90 138 T160 118 T230 88 T310 50 L370 30 L370 175 L10 175 Z"
                    fill="url(#op-grad)"
                  />
                  {chartCoords.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="4" fill="var(--ink)" />
                      <circle cx={p.x} cy={p.y} r="2" fill="var(--bg)" />
                      <text
                        x={p.x}
                        y={p.y - 10}
                        fontSize="9"
                        fill="var(--muted)"
                        fontFamily="'JetBrains Mono', monospace"
                        textAnchor="middle"
                      >
                        {points[i]?.l}
                      </text>
                    </g>
                  ))}
                </svg>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 16,
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <ChartCell label={labels.buy} value={values.buy} />
                  <ChartCell label={labels.handover} value={values.handover} />
                  <ChartCell
                    label={labels.profit}
                    value={values.profit}
                    accent
                  />
                </div>
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
          fontSize: 11,
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
          fontSize: 19,
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
