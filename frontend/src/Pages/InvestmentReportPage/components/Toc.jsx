"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Table of contents — looks deliberately like a printed report TOC. Page-range
// column reads as JetBrains Mono so it nails the "research document" cue.
export default function Toc() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.toc");
  const items = t.raw("items");

  return (
    <Container>
      <section
        id="toc"
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
          scrollMarginTop: 80,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
        />

        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 20 : 26,
            padding: isMobile ? "10px 18px" : "16px 36px",
            boxShadow: NEU_RAISED,
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.n}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "auto 1fr auto" : "60px 1fr auto",
                gap: isMobile ? 12 : 22,
                padding: isMobile ? "16px 0" : "20px 0",
                alignItems: "center",
                borderBottom:
                  i < items.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--ir-accent-deep)",
                  letterSpacing: ".04em",
                }}
              >
                {it.n}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? 17 : 19,
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                  lineHeight: 1.3,
                }}
              >
                {it.t}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  color: "var(--muted)",
                  letterSpacing: ".06em",
                  whiteSpace: "nowrap",
                }}
              >
                {it.p}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
