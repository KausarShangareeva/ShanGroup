"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// 5-step vertical roadmap. Numbered chip on the left + body on the right; the
// chip is the visual rhythm, prose carries the substance.
export default function Process() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.process");
  const steps = t.raw("steps");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
          subtitle={t("subtitle")}
        />

        <div
          style={{
            background: "var(--bg)",
            borderRadius: 24,
            padding: isMobile ? "10px 16px" : "12px 28px",
            boxShadow: NEU_RAISED,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "auto 1fr" : "120px 1fr",
                gap: isMobile ? 16 : 28,
                padding: isMobile ? "20px 0" : "26px 0",
                borderBottom:
                  i < steps.length - 1 ? "1px solid var(--line)" : "none",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: isMobile ? 44 : 56,
                    height: isMobile ? 44 : 56,
                    borderRadius: 14,
                    background: "var(--tx-accent-soft)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--tx-accent-deep)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: isMobile ? 15 : 17,
                    letterSpacing: ".04em",
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                {!isMobile && (
                  <div
                    style={{
                      height: 1,
                      width: 30,
                      background: "var(--tx-accent-deep)",
                      opacity: 0.4,
                    }}
                  />
                )}
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: isMobile ? 22 : 28,
                    color: "var(--ink)",
                    letterSpacing: "-0.012em",
                    lineHeight: 1.15,
                  }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: isMobile ? 14 : 15,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
