"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Visa-path cards. The duration / investment / best-for triplet keeps each
// card scannable; body fills it in for visitors who care about specifics.
export default function Residency() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.residency");
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
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((it, i) => {
            const isFirst = i === 0;
            return (
              <article
                key={it.id}
                style={{
                  background: isFirst ? "#0A0A0B" : "var(--bg)",
                  color: isFirst ? "#fff" : "var(--ink)",
                  borderRadius: 22,
                  padding: isMobile ? 24 : 30,
                  boxShadow: isFirst
                    ? "0 14px 36px rgba(10,10,11,.28), inset 0 1px 0 rgba(255,255,255,.06)"
                    : NEU_RAISED,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {isFirst && (
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 200,
                      height: 200,
                      borderRadius: 999,
                      background:
                        "radial-gradient(circle, var(--tx-accent-glow), transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: isFirst
                        ? "oklch(0.86 0.13 88)"
                        : "var(--tx-accent-deep)",
                      marginBottom: 8,
                    }}
                  >
                    {it.duration}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      fontSize: isMobile ? 26 : 30,
                      lineHeight: 1.05,
                      letterSpacing: "-0.012em",
                      color: isFirst ? "#fff" : "var(--ink)",
                    }}
                  >
                    {it.name}
                  </h3>
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontFamily:
                        "'Montserrat', system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.035em",
                      lineHeight: 0.92,
                      fontSize: isMobile ? 26 : 32,
                      color: isFirst
                        ? "oklch(0.86 0.13 88)"
                        : "var(--tx-accent-deep)",
                    }}
                  >
                    {it.investment}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: isFirst ? "rgba(255,255,255,.6)" : "var(--muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".06em",
                      marginTop: 4,
                    }}
                  >
                    {it.best}
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background: isFirst
                      ? "rgba(255,255,255,.12)"
                      : "var(--line)",
                    position: "relative",
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: isFirst ? "rgba(255,255,255,.78)" : "var(--muted)",
                    position: "relative",
                  }}
                >
                  {it.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
