"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// 6-card executive summary. Each card leads with a category tag, then the big
// number (Montserrat 700), then label + supporting one-liner. Pattern mirrors
// HeadlineStats on the tax page so the design language stays coherent.
export default function Highlights() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.highlights");
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
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((it) => (
            <article
              key={it.l}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                boxShadow: NEU_RAISED,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--ir-accent-deep)",
                  padding: "4px 9px",
                  borderRadius: 999,
                  background: "var(--ir-accent-soft)",
                }}
              >
                {it.k}
              </div>
              <div
                style={{
                  fontFamily:
                    "'Montserrat', system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  fontSize: isMobile ? 44 : 56,
                  color: "var(--ink)",
                  marginTop: 6,
                }}
              >
                {it.v}
              </div>
              <div
                style={{
                  fontSize: isMobile ? 13.5 : 14.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: 4,
                  letterSpacing: "-0.005em",
                }}
              >
                {it.l}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                }}
              >
                {it.n}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
