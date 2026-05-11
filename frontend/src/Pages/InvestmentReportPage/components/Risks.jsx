"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Risk register cards. Rating pill on top-right + body + stress test footer.
// The "stress" row is what separates this from generic risk disclosure.
export default function Risks() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.risks");
  const items = t.raw("items");

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
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((r) => (
            <article
              key={r.id}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                boxShadow: NEU_RAISED,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--ir-bear)",
                    padding: "4px 9px",
                    borderRadius: 999,
                    background:
                      "color-mix(in oklab, var(--ir-bear) 12%, transparent)",
                  }}
                >
                  Risk · {r.rating}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3 L22 21 H2 Z"
                    stroke="var(--ir-bear)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 10 V14"
                    stroke="var(--ir-bear)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="17" r="0.9" fill="var(--ir-bear)" />
                </svg>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: isMobile ? 22 : 24,
                  color: "var(--ink)",
                  letterSpacing: "-0.012em",
                  lineHeight: 1.15,
                }}
              >
                {r.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  flex: 1,
                }}
              >
                {r.body}
              </p>

              <div
                style={{
                  marginTop: 6,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "var(--bg-2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 4,
                  }}
                >
                  Stress test
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: "var(--ink-2)",
                  }}
                >
                  {r.stress}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
