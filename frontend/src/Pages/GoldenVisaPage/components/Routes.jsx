"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

export default function Routes() {
  const isMobile = useIsMobile();
  const t = useTranslations("GoldenVisaPage.routes");
  const items = t.raw("items");
  const popularLabel = t("popularLabel");
  const fromLabel = t("fromLabel");
  const reqsLabel = t("reqsLabel");

  return (
    <Container>
      <section
        id="eligibility"
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
          {items.map((r) => (
            <div
              key={r.n}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 32,
                position: "relative",
                boxShadow: r.popular ? NEU_RAISED : NEU_FLAT,
              }}
            >
              {r.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    padding: "5px 10px",
                    borderRadius: 999,
                    background:
                      "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                    color: "#3a2d10",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".1em",
                  }}
                >
                  {popularLabel}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: 38,
                    color: "var(--sand-deep)",
                    opacity: 0.55,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {r.n}
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
                  {r.t}
                </h3>
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "var(--bg-2)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink-2)",
                  letterSpacing: ".06em",
                }}
              >
                {fromLabel} {r.min}
              </div>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {r.d}
              </p>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {reqsLabel}
                </div>
                {r.reqs.map((req) => (
                  <div
                    key={req}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12.5,
                      color: "var(--ink-2)",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        background: "oklch(0.55 0.13 145)",
                        color: "#fff",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="check" size={9} strokeWidth={2.5} />
                    </span>
                    {req}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
