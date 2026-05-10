"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Process() {
  const isMobile = useIsMobile();
  const t = useTranslations("GoldenVisaPage.process");
  const steps = t.raw("steps");

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
            padding: isMobile ? 20 : 32,
            position: "relative",
            boxShadow: NEU_FLAT,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 14 : 4,
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: isMobile ? 14 : 22,
                  alignItems: "center",
                  padding: isMobile ? "10px 0" : "16px 0",
                  borderBottom:
                    i < steps.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <div
                  style={{
                    width: isMobile ? 44 : 56,
                    height: isMobile ? 44 : 56,
                    borderRadius: 999,
                    background: "var(--bg)",
                    boxShadow:
                      "-3px -3px 8px var(--shadow-light), 3px 3px 8px var(--shadow-dark)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 22 : 26,
                    color: "var(--sand-deep)",
                    letterSpacing: "-0.02em",
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: isMobile ? 18 : 22,
                      color: "var(--ink)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: isMobile ? 12.5 : 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.d}
                  </p>
                </div>
                <div
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "var(--bg-2)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: ".1em",
                    color: "var(--sand-deep)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
