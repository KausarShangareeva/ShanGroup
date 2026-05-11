"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function WhoFor() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.whoFor");
  const items = t.raw("items");

  return (
    <Container>
      <section
        id="path"
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
          scrollMarginTop: 80,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
          titleC={t("titleC")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((p) => (
            <div
              key={p.n}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 32,
                boxShadow: NEU_FLAT,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: 38,
                    color: "var(--silver-deep)",
                    opacity: 0.55,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {p.n}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: 24,
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.t}
                </h3>
              </div>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {p.d}
              </p>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "var(--bg-2)",
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--ink-2)",
                      letterSpacing: ".04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
