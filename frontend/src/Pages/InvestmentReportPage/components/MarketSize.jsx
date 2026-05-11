"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

// Macro context — four headline numbers in a horizontal strip. Bigger type
// register than Highlights to signal these are the city-scale data points.
export default function MarketSize() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.marketSize");
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
            padding: isMobile ? "22px 18px" : "36px 40px",
            boxShadow:
              "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 22 : 24,
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.l}
              style={{
                position: "relative",
                paddingLeft: !isMobile && i > 0 ? 24 : 0,
                borderLeft:
                  !isMobile && i > 0 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "'Montserrat', system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  fontSize: isMobile ? 38 : 52,
                  color: "var(--ink)",
                }}
              >
                {it.v}
              </div>
              <div
                style={{
                  fontSize: isMobile ? 12.5 : 13.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: 10,
                  letterSpacing: "-0.005em",
                }}
              >
                {it.l}
              </div>
              <div
                style={{
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginTop: 4,
                }}
              >
                {it.n}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
