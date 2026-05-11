"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// 2-column grid of method items. Cards stay restrained — this is a credibility
// section, not a hero. Visual hierarchy keeps prose dense and readable.
export default function Methodology() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.methodology");
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
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 12 : 16,
          }}
        >
          {items.map((it) => (
            <div
              key={it.t}
              style={{
                background: "var(--bg)",
                borderRadius: 18,
                padding: isMobile ? 20 : 26,
                boxShadow: NEU_RAISED,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--ir-accent-deep)",
                  marginBottom: 8,
                }}
              >
                {it.t}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                }}
              >
                {it.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
