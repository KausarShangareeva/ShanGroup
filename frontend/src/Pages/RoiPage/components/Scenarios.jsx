"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

// Цвет градиентов привязан к id сценария, а не к индексу — позволяет менять
// порядок в JSON без поломки палитры. Все 3 — премиум-dark surfaces, поэтому
// текст на них хардкодится белым (не инвертируется в тёмной теме).
const SCENARIO_BG = {
  pessimistic:
    "linear-gradient(155deg, oklch(0.55 0.18 25), oklch(0.42 0.16 25))",
  base: "linear-gradient(155deg, oklch(0.45 0.16 155), oklch(0.32 0.14 155))",
  optimistic:
    "linear-gradient(155deg, oklch(0.65 0.14 80), oklch(0.5 0.12 80))",
};

export default function Scenarios() {
  const isMobile = useIsMobile();
  const t = useTranslations("RoiPage.scenarios");
  const items = t.raw("items");
  const horizonLabels = t.raw("horizonLabels");

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
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((s) => {
            const horizons = [s.r3, s.r5, s.r10];
            return (
              <div
                key={s.id}
                style={{
                  borderRadius: 24,
                  padding: isMobile ? 24 : 30,
                  background: SCENARIO_BG[s.id] || SCENARIO_BG.base,
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 16px 32px rgba(10,10,11,.18)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      opacity: 0.75,
                    }}
                  >
                    {t("kicker")}
                  </div>
                  <h3
                    style={{
                      margin: "4px 0 0",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: 28,
                    }}
                  >
                    {s.l}
                  </h3>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      opacity: 0.85,
                      lineHeight: 1.5,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    padding: "14px 0",
                    borderTop: "1px solid rgba(255,255,255,.18)",
                    borderBottom: "1px solid rgba(255,255,255,.18)",
                  }}
                >
                  {horizonLabels.map((k, i) => (
                    <div key={k}>
                      <div
                        style={{
                          fontSize: 10,
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          opacity: 0.7,
                        }}
                      >
                        {k}
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "'Montserrat', system-ui, -apple-system, sans-serif",
                          fontWeight: 700,
                          letterSpacing: "-0.035em",
                          lineHeight: 0.92,
                          fontSize: 22,
                          marginTop: 4,
                        }}
                      >
                        {horizons[i]}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    opacity: 0.85,
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  {s.note}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
