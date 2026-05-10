"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

// Heatmap по yield: интенсивность = y / MAX. Карточка получает мягкий
// sand-deep градиент пропорциональный yield, плюс прогресс-бар внизу.
const YIELD_MAX = 9;

export default function Areas() {
  const isMobile = useIsMobile();
  const t = useTranslations("RentalsPage.areas");
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
          titleC={t("titleC")}
          maxWidth={720}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 10 : 14,
          }}
        >
          {items.map((a) => {
            const intensity = a.y / YIELD_MAX;
            return (
              <div
                key={a.n}
                style={{
                  background: "var(--bg)",
                  borderRadius: 18,
                  padding: isMobile ? 16 : 22,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: NEU_FLAT,
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, oklch(0.55 0.08 50 / ${intensity * 0.15}), transparent 60%)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        fontSize: isMobile ? 18 : 22,
                        color: "var(--ink)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {a.n}
                    </div>
                    <div
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        background:
                          "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                        color: "#3a2d10",
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".08em",
                        flexShrink: 0,
                      }}
                    >
                      {a.y}%
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: ".06em",
                    }}
                  >
                    {a.p}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12.5,
                      color: "var(--ink-2)",
                      lineHeight: 1.4,
                    }}
                  >
                    {a.t}
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      height: 4,
                      borderRadius: 999,
                      background: "var(--bg-2)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${intensity * 100}%`,
                        borderRadius: 999,
                        background:
                          "linear-gradient(90deg, var(--sand-deep), var(--gold-warm))",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
