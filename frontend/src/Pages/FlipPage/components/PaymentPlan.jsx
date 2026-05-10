"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function PaymentPlan() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.paymentPlan");
  const milestones = t.raw("milestones");
  const exitNote = t.raw("exitNote");
  const summary = t.raw("summary");
  const cumPrefix = t("cumPrefix");

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
            padding: isMobile ? 26 : 44,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: isMobile ? 28 : 48,
            boxShadow: NEU_RAISED,
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
              }}
            >
              {t("titleA")}{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)" }}>
                {t("titleB")}
              </span>
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 14.5,
                lineHeight: 1.55,
                color: "var(--muted)",
                maxWidth: 460,
              }}
            >
              {t("intro")}
            </p>
            <div
              style={{
                marginTop: 24,
                padding: "16px 20px",
                borderRadius: 14,
                background: "var(--bg)",
                boxShadow: NEU_INSET,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {summary.label}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginTop: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 32,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {summary.primary}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  {summary.subline}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-2)",
                  marginTop: 6,
                  opacity: 0.8,
                }}
              >
                {summary.breakdown}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {milestones.map((m, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: isMobile ? 13 : 14,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {m.m}
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          color: "var(--muted)",
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          marginTop: 2,
                        }}
                      >
                        {m.t}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 700,
                          fontSize: 22,
                          color: "var(--ink)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {m.pct}%
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--muted)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        ({cumPrefix} {m.cum}%)
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: "var(--bg-2)",
                      overflow: "hidden",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${m.cum}%`,
                        borderRadius: 999,
                        background:
                          "linear-gradient(90deg, var(--sand-deep), var(--gold-warm))",
                        transition: "width 1s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                padding: "12px 16px",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, oklch(0.95 0.06 145), oklch(0.92 0.08 145))",
                border: "1px solid oklch(0.7 0.13 145 / .25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "oklch(0.42 0.13 145)",
                }}
              >
                {exitNote.label}
              </span>
              <span style={{ fontSize: 12, color: "oklch(0.42 0.13 145)" }}>
                {exitNote.detail}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
