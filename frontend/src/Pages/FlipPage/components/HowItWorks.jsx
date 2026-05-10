"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function HowItWorks() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.howItWorks");
  const stages = t.raw("stages");

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

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 14 }}>
          {stages.map((s) => (
            <div
              key={s.n}
              style={{
                background: "var(--bg)",
                borderRadius: 18,
                padding: isMobile ? 18 : 24,
                display: "grid",
                gridTemplateColumns: isMobile ? "auto 1fr" : "auto 1fr auto",
                gap: isMobile ? 16 : 28,
                alignItems: "center",
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: isMobile ? 56 : 68,
                  height: isMobile ? 56 : 68,
                  borderRadius: 16,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  background: "var(--bg)",
                  boxShadow: NEU_INSET,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? 22 : 26,
                    fontWeight: 700,
                    color: "var(--sand-deep)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.n}
                </div>
              </div>
              <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: isMobile ? 19 : 22,
                      color: "var(--ink)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {s.t}
                  </h3>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--sand-deep)",
                      fontWeight: 600,
                    }}
                  >
                    {s.m}
                  </span>
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                    maxWidth: 640,
                  }}
                >
                  {s.d}
                </p>
              </div>
              {!isMobile && (
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "var(--bg-2)",
                    color: "var(--sand-deep)",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={s.icon} size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
