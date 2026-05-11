"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

// Horizontal "what you keep" bars — UAE row pinned visually green/wealth so the
// comparison reads at a glance even without text.
export default function TaxComparison() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.comparison");
  const countries = t.raw("countries");

  const maxBurden = Math.max(...countries.map((c) => c.burden), 50);

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
            padding: isMobile ? "20px 16px" : "32px 36px",
            boxShadow: NEU_RAISED,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 18 : 22,
          }}
        >
          {countries.map((c) => {
            const isUae = c.id === "uae";
            const burdenPct = (c.burden / maxBurden) * 100;
            const keepPct = ((c.kept) / 100) * 100;
            return (
              <div
                key={c.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "200px 1fr 110px",
                  gap: isMobile ? 8 : 20,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: isMobile ? 15 : 16,
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {c.country}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--muted)",
                      marginTop: 3,
                      lineHeight: 1.4,
                    }}
                  >
                    {c.note}
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      height: isMobile ? 18 : 22,
                      borderRadius: 999,
                      background: "var(--bg)",
                      boxShadow: NEU_INSET,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* What you keep (UAE: 100%) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: `${keepPct}%`,
                        background: isUae
                          ? "linear-gradient(90deg, var(--tx-savings-deep), var(--tx-savings))"
                          : "linear-gradient(90deg, var(--ink-2), var(--muted))",
                        borderRadius: 999,
                        transition: "width .8s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                    {/* Burden marker line */}
                    {!isUae && (
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          bottom: 2,
                          left: `${keepPct}%`,
                          width: 2,
                          background: "var(--tx-warn)",
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".06em",
                      color: "var(--muted)",
                    }}
                  >
                    <span>
                      keep {c.kept}%
                    </span>
                    <span style={{ color: isUae ? "var(--tx-savings-deep)" : "var(--tx-warn)" }}>
                      tax {c.burden}%
                    </span>
                  </div>
                </div>

                {!isMobile && (
                  <div
                    style={{
                      fontFamily:
                        "'Montserrat', system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.035em",
                      lineHeight: 0.92,
                      fontSize: 30,
                      textAlign: "right",
                      color: isUae
                        ? "var(--tx-savings-deep)"
                        : "var(--ink)",
                    }}
                  >
                    {c.kept}%
                  </div>
                )}
              </div>
            );
          })}
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
