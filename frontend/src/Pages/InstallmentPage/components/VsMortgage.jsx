"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

export default function VsMortgage() {
  const isMobile = useIsMobile();
  const t = useTranslations("InstallmentPage.vsMortgage");
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
          <div style={{ minWidth: isMobile ? 560 : "auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1.1fr 1.1fr",
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
              <ColumnHeader
                title={headers.installment}
                note={headers.installmentNote}
                accent
              />
              <ColumnHeader
                title={headers.mortgage}
                note={headers.mortgageNote}
              />
            </div>
            {rows.map((r, i) => (
              <div
                key={r.l}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.1fr 1.1fr",
                  padding: isMobile ? "12px 14px" : "14px 22px",
                  borderBottom:
                    i < rows.length - 1 ? "1px solid var(--line)" : "none",
                  alignItems: "center",
                  // Подсветка последней строки (overpayment) — визуально выделяет
                  // ключевой "выигрыш" рассрочки.
                  background:
                    i === rows.length - 1
                      ? "color-mix(in oklab, var(--accent) 6%, transparent)"
                      : "transparent",
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
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? 15 : 17,
                    fontWeight: 600,
                    color: "var(--accent-deep)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {r.i}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? 15 : 17,
                    fontWeight: 600,
                    color: "var(--ink-2)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {r.m}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

function ColumnHeader({ title, note, accent }) {
  return (
    <div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 9.5,
          color: accent ? "var(--accent-deep)" : "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {note}
      </div>
    </div>
  );
}
