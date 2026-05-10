"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Risks() {
  const isMobile = useIsMobile();
  const t = useTranslations("AirbnbPage.risks");
  const items = t.raw("items");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
        }}
      >
        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 24 : 32,
            padding: isMobile ? 28 : 48,
            boxShadow: NEU_RAISED,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 28 : 48,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "var(--sand-deep)",
                  marginBottom: 14,
                }}
              >
                {t("kicker")}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: isMobile ? 30 : 40,
                  lineHeight: 1.05,
                  color: "var(--ink)",
                  letterSpacing: "-0.012em",
                  textWrap: "balance",
                }}
              >
                {t("titleA")}{" "}
                <span style={{ fontStyle: "italic", color: "var(--sand-deep)" }}>
                  {t("titleB")}
                </span>
              </h2>
              <p
                style={{
                  margin: "20px 0 0",
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  maxWidth: 460,
                }}
              >
                {t("intro")}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((it, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    borderRadius: 16,
                    padding: "16px 20px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 14,
                    alignItems: "start",
                    boxShadow: NEU_FLAT,
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "oklch(0.92 0.05 25)",
                      color: "oklch(0.55 0.18 25)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    !
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.3,
                      }}
                    >
                      {it.r}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        marginTop: 5,
                        lineHeight: 1.5,
                      }}
                    >
                      {it.m}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
