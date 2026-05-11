"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

export default function Cases() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.cases");
  const items = t.raw("items");
  const objectLabel = t("objectLabel");
  const visaReceivedBadge = t("visaReceivedBadge");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
          maxWidth={720}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((c, i) => (
            <article
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                boxShadow: NEU_RAISED_SM,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.025 240) 0%, oklch(0.55 0.04 240) 100%)",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    boxShadow: "0 4px 10px rgba(80,90,110,.3)",
                    flexShrink: 0,
                  }}
                >
                  {c.name.charAt(0)}
                </div>
                <div
                  style={{
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: "oklch(0.95 0.06 145)",
                    color: "oklch(0.42 0.13 145)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {visaReceivedBadge}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
                  {c.role}
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 16.5,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  letterSpacing: "-0.005em",
                }}
              >
                «{c.story}»
              </p>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "var(--bg-2)",
                  fontSize: 12,
                  color: "var(--ink-2)",
                  lineHeight: 1.5,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {objectLabel}
                </div>
                {c.bought}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  paddingTop: 12,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 26,
                    color: "oklch(0.55 0.13 145)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.stat}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.statL}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
