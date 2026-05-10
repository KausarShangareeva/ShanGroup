"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function Economics() {
  const isMobile = useIsMobile();
  const t = useTranslations("AirbnbPage.economics");
  const lines = t.raw("lines");
  const net = lines.reduce((s, l) => s + l.v, 0);

  const fmt = (n) =>
    `${n < 0 ? "−" : "+"}$${Math.abs(n).toLocaleString("en-US")}`;

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
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
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
                padding: "16px 18px",
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, oklch(0.95 0.06 145), oklch(0.92 0.08 145))",
                border: "1px solid oklch(0.7 0.13 145 / .25)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "oklch(0.42 0.13 145)",
                }}
              >
                {t("totalLabel")}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 36,
                  color: "oklch(0.42 0.13 145)",
                  marginTop: 4,
                  letterSpacing: "-0.02em",
                }}
              >
                ${net.toLocaleString("en-US")}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "oklch(0.42 0.13 145)",
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                {t("totalNote")}
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 18,
              padding: isMobile ? 18 : 22,
              background: "var(--bg)",
              boxShadow: NEU_INSET,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 4px",
                  borderBottom:
                    i < lines.length - 1 ? "1px solid var(--line)" : "none",
                  fontSize: isMobile ? 12.5 : 13.5,
                }}
              >
                <span
                  style={{
                    color: line.pos ? "var(--ink)" : "var(--muted)",
                    fontWeight: line.pos ? 600 : 400,
                  }}
                >
                  {line.l}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: line.pos
                      ? "oklch(0.55 0.13 145)"
                      : "var(--ink-2)",
                  }}
                >
                  {fmt(line.v)}
                </span>
              </div>
            ))}
            <div
              style={{
                marginTop: 14,
                padding: "12px 14px",
                borderRadius: 12,
                background: "#0A0A0B",
                color: "#fafaf7",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {t("netRowLabel")}
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "oklch(0.86 0.13 88)",
                  letterSpacing: "-0.02em",
                }}
              >
                ${net.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
