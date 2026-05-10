"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

// Подсчёт чистой прибыли по строкам прямо из JSON-данных:
// + значения с pos:true складываются как доход, - всё остальное (включая
// уже отрицательные v) — как расход.
function calcNetProfit(lines) {
  let sale = 0;
  let costs = 0;
  for (const line of lines) {
    if (line.hl && line.pos) sale = line.v;
    else costs += Math.abs(line.v);
  }
  return sale - costs;
}

export default function Economics() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.economics");
  const lines = t.raw("lines");
  const summary = t.raw("summary");
  const net = calcNetProfit(lines);

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
            borderRadius: isMobile ? 22 : 28,
            padding: isMobile ? 22 : 36,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
            gap: isMobile ? 24 : 36,
            boxShadow: NEU_RAISED,
          }}
        >
          <div
            style={{
              borderRadius: 18,
              padding: isMobile ? 18 : 24,
              background: "var(--bg)",
              boxShadow: NEU_INSET,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  alignItems: "center",
                  padding: "11px 4px",
                  borderBottom:
                    i < lines.length - 1 ? "1px solid var(--line)" : "none",
                  fontSize: isMobile ? 12.5 : 13.5,
                }}
              >
                <div>
                  <div
                    style={{
                      color: line.hl
                        ? "oklch(0.55 0.13 145)"
                        : "var(--ink-2)",
                      fontWeight: line.hl ? 700 : 500,
                    }}
                  >
                    {line.l}
                  </div>
                  {line.note && (
                    <div
                      style={{
                        fontSize: 10.5,
                        color: "var(--muted)",
                        marginTop: 2,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {line.note}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: line.hl
                      ? "oklch(0.55 0.13 145)"
                      : line.pos
                        ? "var(--ink)"
                        : "var(--ink-2)",
                    fontSize: line.hl ? (isMobile ? 14 : 15) : "inherit",
                  }}
                >
                  {line.v < 0 ? "−" : ""}${Math.abs(line.v).toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                background: "var(--bg)",
                boxShadow: NEU_FLAT,
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
                {summary.netProfitLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 32 : 40,
                  color: "oklch(0.55 0.13 145)",
                  marginTop: 8,
                  letterSpacing: "-0.03em",
                }}
              >
                ${net.toLocaleString("en-US")}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
              >
                {summary.netProfitNote}
              </div>
            </div>
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                background: "var(--bg)",
                boxShadow: NEU_FLAT,
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
                {summary.roicLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 32 : 40,
                  color: "var(--ink)",
                  marginTop: 8,
                  letterSpacing: "-0.03em",
                }}
              >
                +124%
              </div>
              <div
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
              >
                {summary.roicNote}
              </div>
            </div>
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                background: "#0A0A0B",
                color: "#fafaf7",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.55)",
                }}
              >
                {summary.taxLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 32 : 40,
                  color: "oklch(0.86 0.13 88)",
                  marginTop: 8,
                  letterSpacing: "-0.03em",
                }}
              >
                $0
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.7)",
                  marginTop: 4,
                }}
              >
                {summary.taxNote}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
