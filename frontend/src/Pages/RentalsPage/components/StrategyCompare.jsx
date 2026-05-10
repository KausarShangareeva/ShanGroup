"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

export default function StrategyCompare() {
  const isMobile = useIsMobile();
  const t = useTranslations("RentalsPage.strategyCompare");
  const headers = t.raw("headers");
  const rows = t.raw("rows");

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
          titleC={t("titleC")}
          maxWidth={720}
        />

        <div
          style={{
            background: "var(--bg)",
            borderRadius: 22,
            padding: isMobile ? "8px 4px" : "12px 8px",
            boxShadow: NEU_RAISED,
            overflowX: "auto",
          }}
        >
          <div
            style={{
              minWidth: isMobile ? 540 : "auto",
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              padding: isMobile ? "12px 14px" : "14px 22px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {headers.param}
            </div>
            <div>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {headers.short}
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  color: "var(--sand-deep)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {headers.shortNote}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {headers.long}
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                {headers.longNote}
              </div>
            </div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.l}
              style={{
                minWidth: isMobile ? 540 : "auto",
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr",
                padding: isMobile ? "12px 14px" : "14px 22px",
                borderBottom:
                  i < rows.length - 1 ? "1px solid var(--line)" : "none",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? 12.5 : 13.5,
                  fontWeight: 500,
                  color: "var(--ink-2)",
                }}
              >
                {r.l}
              </div>
              <CompareCell value={r.s} winner={r.sw} />
              <CompareCell value={r.lng} winner={r.lw} />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

function CompareCell({ value, winner }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: winner ? "oklch(0.55 0.13 145)" : "var(--ink-2)",
        }}
      >
        {value}
      </span>
      {winner && (
        <span
          aria-hidden
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "oklch(0.55 0.13 145)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7 L6 10 L11 4" />
          </svg>
        </span>
      )}
    </div>
  );
}
