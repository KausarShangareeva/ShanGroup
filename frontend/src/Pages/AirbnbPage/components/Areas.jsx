"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Areas() {
  const isMobile = useIsMobile();
  const t = useTranslations("AirbnbPage.areas");
  const items = t.raw("items");
  const occupancyLabel = t("occupancyLabel");

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
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 10 : 14,
          }}
        >
          {items.map((a) => (
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
                    padding: "4px 9px",
                    borderRadius: 999,
                    background: "#0A0A0B",
                    color: "oklch(0.86 0.13 88)",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".06em",
                    flexShrink: 0,
                  }}
                >
                  {a.adr}
                  <span style={{ opacity: 0.6 }}>/n</span>
                </div>
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12.5,
                  color: "var(--ink-2)",
                  lineHeight: 1.4,
                }}
              >
                {a.why}
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: ".06em",
                }}
              >
                <span>{occupancyLabel}</span>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {a.occ}%
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  height: 4,
                  borderRadius: 999,
                  background: "var(--bg-2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${a.occ}%`,
                    borderRadius: 999,
                    background:
                      "linear-gradient(90deg, var(--sand-deep), var(--gold-warm))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
