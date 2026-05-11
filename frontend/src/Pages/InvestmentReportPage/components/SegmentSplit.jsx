"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

// Asset-class breakdown. Each row shows market share as a bar + growth & yield
// metrics + a one-line outlook. Side-table layout keeps the comparison
// vertical-friendly on mobile.
export default function SegmentSplit() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.segments");
  const items = t.raw("items");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
          subtitle={t("subtitle")}
        />

        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 20 : 26,
            padding: isMobile ? "18px 16px" : "30px 32px",
            boxShadow: NEU_RAISED,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 20 : 26,
          }}
        >
          {items.map((s) => (
            <article
              key={s.id}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.2fr 2fr",
                gap: isMobile ? 12 : 28,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "'Montserrat', system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.9,
                      fontSize: isMobile ? 28 : 34,
                      color: "var(--ir-accent-deep)",
                    }}
                  >
                    {s.share}%
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: ".06em",
                    }}
                  >
                    of $94B
                  </div>
                </div>
              </div>

              <div>
                {/* Bar */}
                <div
                  style={{
                    height: isMobile ? 12 : 16,
                    borderRadius: 999,
                    background: "var(--bg)",
                    boxShadow: NEU_INSET,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: `${s.share}%`,
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, var(--ir-accent-deep), var(--ir-accent))",
                      transition: "width .8s cubic-bezier(.4,0,.2,1)",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 14,
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr 1fr" : "auto auto 1fr",
                    gap: isMobile ? 10 : 18,
                    alignItems: "baseline",
                  }}
                >
                  <Metric label="2026 growth" value={s.growth} accent />
                  <Metric label="Net yield"  value={s.yield} />
                  <div
                    style={{
                      gridColumn: isMobile ? "1 / -1" : undefined,
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {s.outlook}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 11,
            color: "var(--muted)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".04em",
          }}
        >
          {t("footnote")}
        </div>
      </section>
    </Container>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily:
            "'Montserrat', system-ui, -apple-system, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          fontSize: 20,
          color: accent ? "var(--ir-bull)" : "var(--ink)",
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}
