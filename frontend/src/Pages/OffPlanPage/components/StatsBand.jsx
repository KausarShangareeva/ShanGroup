"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

// Премиум-карточка статистики: всегда тёмный фон (#0A0A0B) в обеих темах —
// контрастный акцент против тёплого песочного полотна страницы.
export default function StatsBand() {
  const isMobile = useIsMobile();
  const t = useTranslations("OffPlanPage.stats");
  const items = t.raw("items");
  const sourceLabel = t("sourceLabel");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 40 : 60,
          paddingBottom: isMobile ? 40 : 60,
        }}
      >
        <div
          style={{
            borderRadius: isMobile ? 22 : 32,
            padding: isMobile ? "24px 20px" : "36px 44px",
            background: "#0A0A0B",
            color: "#fafaf7",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 18px 40px rgba(10,10,11,.32), inset 0 1px 0 rgba(255,255,255,.06)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: isMobile ? 24 : 12,
            }}
          >
            {items.map((s, i) => (
              <div
                key={i}
                style={{
                  borderLeft:
                    !isMobile && i > 0
                      ? "1px solid rgba(255,255,255,.12)"
                      : "none",
                  paddingLeft: !isMobile && i > 0 ? 24 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: isMobile ? 36 : 52,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "oklch(0.86 0.13 88)",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: "rgba(255,255,255,.9)",
                    maxWidth: 200,
                  }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 9.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.5)",
                  }}
                >
                  {sourceLabel}: {s.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
