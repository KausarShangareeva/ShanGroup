"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

export default function Fees() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.fees");
  const items = t.raw("items");

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
            background: "var(--bg)",
            borderRadius: 22,
            padding: isMobile ? "8px 4px" : "8px",
            boxShadow: NEU_RAISED,
          }}
        >
          {items.map((f, i) => {
            const isFree = i === items.length - 1;
            return (
              <div
                key={f.l}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr auto"
                    : "1.5fr auto auto",
                  gap: isMobile ? 8 : 24,
                  alignItems: "center",
                  padding: isMobile ? "14px 16px" : "18px 22px",
                  borderBottom:
                    i < items.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: isMobile ? 13.5 : 14.5,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {f.l}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--muted)",
                      marginTop: 3,
                      lineHeight: 1.4,
                    }}
                  >
                    {f.d}
                  </div>
                </div>
                {!isMobile && (
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      color: "var(--muted)",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.aed}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 17 : 20,
                    color: isFree ? "oklch(0.55 0.13 145)" : "var(--ink)",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.usd}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
