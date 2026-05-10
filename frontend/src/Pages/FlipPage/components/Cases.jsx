"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function Cases() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.cases");
  const items = t.raw("items");
  const objectLabel = t("objectLabel");
  const buyLabel = t("buyLabel");
  const exitLabel = t("exitLabel");
  const monthsLabel = t("monthsLabel");
  const monthsUnit = t("monthsUnit");

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
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((c, i) => (
            <article
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: NEU_RAISED_SM,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    background:
                      "linear-gradient(135deg, oklch(0.86 0.13 88) 0%, oklch(0.64 0.13 60) 100%)",
                    display: "grid",
                    placeItems: "center",
                    color: "#3a2d10",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    boxShadow: "0 4px 10px rgba(180,140,40,.3)",
                    flexShrink: 0,
                  }}
                >
                  {c.name.charAt(0)}
                </div>
                <div
                  style={{
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: "oklch(0.95 0.06 145)",
                    color: "oklch(0.42 0.13 145)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.profit} · {c.roic}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                  {c.name}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}
                >
                  {c.role}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "var(--bg)",
                  boxShadow: NEU_INSET,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {objectLabel}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {c.bought}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: "1px solid var(--line)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
                  }}
                >
                  <CaseCell label={buyLabel} value={c.buyPrice} />
                  <CaseCell label={exitLabel} value={c.exitPrice} />
                  <CaseCell
                    label={monthsLabel}
                    value={`${c.months} ${monthsUnit}`}
                  />
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 16.5,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  letterSpacing: "-0.005em",
                }}
              >
                «{c.quote}»
              </p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}

function CaseCell({ label, value }) {
  return (
    <div>
      <div
        style={{
          fontSize: 9.5,
          color: "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--ink)",
          fontWeight: 600,
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}
