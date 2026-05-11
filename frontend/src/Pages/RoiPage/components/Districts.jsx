"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";
import { DISTRICTS } from "./districts";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

// Список районов отсортирован по расчётному 5-летнему ROI. Используем ту же
// формулу, что в Calc, но фиксированную (long-term + ~92% эффективная занятость).
// Это бенчмарк-секция, поэтому без интерактивности — только ранжирование.
export default function Districts() {
  const isMobile = useIsMobile();
  const t = useTranslations("RoiPage.districts");

  const rows = useMemo(() => {
    const computed = DISTRICTS.map((d) => {
      const price = d.price * 1000;
      const initial = price * 1.06;
      const netYield = (d.rent / 100) * (d.occ / 100) * 0.92 - 0.008;
      const cumRent = price * netYield * 5 * 1.06;
      const cap = price * (Math.pow(1 + d.growth / 100, 5) - 1);
      const exit = price * Math.pow(1 + d.growth / 100, 5) * 0.06;
      const total = cumRent + cap - exit;
      const roi = (total / initial) * 100;
      return { ...d, roi };
    });
    computed.sort((a, b) => b.roi - a.roi);
    return computed;
  }, []);
  const maxRoi = Math.max(...rows.map((r) => r.roi));

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
            background: "var(--bg)",
            borderRadius: 22,
            padding: isMobile ? 16 : 28,
            boxShadow: NEU_RAISED,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {rows.map((r, i) => {
              const pct = (r.roi / maxRoi) * 100;
              const isTop = i === 0;
              return (
                <div
                  key={r.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "auto 1fr auto"
                      : "40px 1.2fr 2fr auto",
                    gap: isMobile ? 12 : 18,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: isTop ? "var(--accent-green-deep)" : "var(--muted)",
                    }}
                  >
                    #{i + 1}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: isMobile ? 14 : 15,
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {r.l}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        marginTop: 2,
                      }}
                    >
                      ${r.price}K · {t("yieldLabel")} {r.rent}% · {t("growthLabel")} {r.growth}%
                    </div>
                  </div>
                  {!isMobile && (
                    <div
                      style={{
                        height: 12,
                        borderRadius: 999,
                        position: "relative",
                        overflow: "hidden",
                        background: "var(--bg)",
                        boxShadow: NEU_INSET,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          width: `${pct}%`,
                          background: isTop
                            ? "linear-gradient(90deg, oklch(0.45 0.16 155), oklch(0.66 0.16 155))"
                            : "linear-gradient(90deg, var(--ink-2), var(--muted))",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily:
                        "'Montserrat', system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.035em",
                      lineHeight: 0.92,
                      fontSize: isMobile ? 22 : 28,
                      color: isTop
                        ? "var(--accent-green-deep)"
                        : "var(--ink)",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    +{r.roi.toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Container>
  );
}
