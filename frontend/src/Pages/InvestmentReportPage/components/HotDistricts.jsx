"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// District cards. Each has the analyst "thesis" sentence + three metric chips
// + a category tag. Strong horizontal scanline pattern so a reader can scan
// 5 districts in seconds.
export default function HotDistricts() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.hotDistricts");
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
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 12 : 14,
          }}
        >
          {items.map((d, i) => (
            <article
              key={d.name}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                boxShadow: NEU_RAISED,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1.6fr 1fr",
                gap: isMobile ? 16 : 24,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "var(--ir-accent-soft)",
                      color: "var(--ir-accent-deep)",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "var(--ir-accent-deep)",
                      padding: "3px 8px",
                      borderRadius: 999,
                      background: "var(--ir-accent-soft)",
                    }}
                  >
                    {d.tag}
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: isMobile ? 24 : 28,
                    color: "var(--ink)",
                    letterSpacing: "-0.012em",
                    lineHeight: 1.1,
                  }}
                >
                  {d.name}
                </h3>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: isMobile ? 13.5 : 14.5,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  fontStyle: "italic",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {d.thesis}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr 1fr 1fr"
                    : "1fr",
                  gap: 8,
                }}
              >
                <Metric label="Growth" value={d.growth} accent />
                <Metric label="Yield"  value={d.yield} />
                <Metric label="Ticket" value={d.ticket} mono />
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}

function Metric({ label, value, accent, mono }) {
  return (
    <div
      style={{
        padding: "8px 10px",
        borderRadius: 10,
        background: "var(--bg-2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: mono ? 13 : 16,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: accent ? "var(--ir-bull)" : "var(--ink)",
          fontFamily: mono
            ? "'JetBrains Mono', monospace"
            : "'Montserrat', system-ui, sans-serif",
        }}
      >
        {value}
      </div>
    </div>
  );
}
