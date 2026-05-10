"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Зимний пик и летняя просадка для туристического Дубая (12 мес.).
const MONTH_INTENSITIES = [
  0.95, 0.94, 0.92, 0.84, 0.78, 0.7, 0.62, 0.65, 0.78, 0.86, 0.96, 0.98,
];

// Цвет ячейки heatmap'а: чем выше v, тем темнее sand-deep оттенок.
// Деталь: формулу подбирали на прототипе, не трогаем — она читается
// в обеих темах за счёт opacity.
function heatmapColor(v) {
  return `oklch(${0.95 - v * 0.5} ${v * 0.13} 50)`;
}
function heatmapOpacity(v) {
  return 0.4 + v * 0.6;
}

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("AirbnbPage.hero");
  const trust = t.raw("trust");
  const monthsAbbr = t.raw("chart.monthsAbbr");
  const daysAbbr = t.raw("chart.daysAbbr");
  const labels = t.raw("chart.labels");
  const values = t.raw("chart.values");

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
                  background: "oklch(0.66 0.18 25)",
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

              {/* Heatmap 12×7 */}
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto repeat(7, 1fr)",
                    gap: 4,
                    fontSize: 10,
                  }}
                >
                  <div />
                  {daysAbbr.map((d) => (
                    <div
                      key={d}
                      style={{
                        textAlign: "center",
                        color: "var(--muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                  {MONTH_INTENSITIES.map((base, mi) => (
                    <div
                      key={mi}
                      style={{
                        display: "contents",
                      }}
                    >
                      <div
                        style={{
                          paddingRight: 6,
                          color: "var(--muted)",
                          fontFamily: "'JetBrains Mono', monospace",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {monthsAbbr[mi]}
                      </div>
                      {[0, 1, 2, 3, 4, 5, 6].map((d) => {
                        const isWeekend = d >= 5;
                        const v = Math.min(
                          1,
                          base * (isWeekend ? 1.04 : 0.96) +
                            Math.sin(mi * 7 + d) * 0.05,
                        );
                        return (
                          <div
                            key={d}
                            style={{
                              aspectRatio: "1",
                              borderRadius: 4,
                              background: heatmapColor(v),
                              opacity: heatmapOpacity(v),
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 12,
                    fontSize: 10,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span>{t("chart.legendLow")}</span>
                  {[0.4, 0.55, 0.7, 0.85, 1].map((v, i) => (
                    <div
                      key={i}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 3,
                        background: heatmapColor(v),
                        opacity: heatmapOpacity(v),
                      }}
                    />
                  ))}
                  <span>{t("chart.legendHigh")}</span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16,
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <ChartCell label={labels.adr} value={values.adr} />
                <ChartCell label={labels.occupancy} value={values.occupancy} />
                <ChartCell
                  label={labels.yearNet}
                  value={values.yearNet}
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
