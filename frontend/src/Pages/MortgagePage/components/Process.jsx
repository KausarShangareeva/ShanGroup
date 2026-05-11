"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

// 6 шагов сделки. Большая цифровая нумерация сверху + meta-таймер сбоку.
export default function Process() {
  const isMobile = useIsMobile();
  const t = useTranslations("MortgagePage.process");
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
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: isMobile ? 14 : 20,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                boxShadow: NEU_RAISED_SM,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    fontSize: 44,
                    lineHeight: 0.9,
                    color: "var(--accent-blue-deep)",
                    opacity: 0.85,
                  }}
                >
                  {s.n}
                </div>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: "var(--bg-2)",
                    fontSize: 10.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.k}
                </span>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.012em",
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
