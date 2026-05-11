"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

// Списки банков с инициалами вместо логотипов — нейтрально и расширяемо без
// CDN. Ставка вынесена в правый блок как ключевой признак карточки.
export default function Banks() {
  const isMobile = useIsMobile();
  const t = useTranslations("MortgagePage.banks");
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
        />
        <p
          style={{
            margin: "-22px 0 28px",
            maxWidth: 640,
            fontSize: isMobile ? 14 : 15,
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          {t("subtitle")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((b, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 20,
                padding: isMobile ? 18 : 24,
                boxShadow: NEU_RAISED_SM,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.05 265) 0%, oklch(0.82 0.09 265) 100%)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontFamily:
                    "'Montserrat', system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  fontSize: 18,
                  flexShrink: 0,
                  boxShadow:
                    "0 6px 14px oklch(0.42 0.14 265 / .22), inset 0 1px 0 rgba(255,255,255,.4)",
                }}
              >
                {b.k}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {b.n}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--muted)",
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {b.l}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("rateLabel")}
                </div>
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    fontSize: 22,
                    color: "var(--accent-blue-deep)",
                    marginTop: 2,
                  }}
                >
                  {b.rate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
