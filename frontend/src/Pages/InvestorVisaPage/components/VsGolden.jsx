"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function VsGolden() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.vsGolden");
  const headers = t.raw("headers");
  const rows = t.raw("rows");
  const bridge = t.raw("bridge");

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
        <p
          style={{
            margin: "16px 0 24px",
            fontSize: 15,
            color: "var(--muted)",
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          {t("intro")}
        </p>

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
                title={headers.investor}
                note={headers.investorNote}
                silver
              />
              <ColumnHeader
                title={headers.golden}
                note={headers.goldenNote}
                gold
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
                    color: "var(--silver-deep)",
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
                  {r.g}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge CTA — упоминаем апгрейд-путь и ведём на /golden-visa. */}
        <div
          style={{
            background: "var(--bg)",
            marginTop: 22,
            borderRadius: 18,
            padding: isMobile ? "18px 20px" : "20px 28px",
            display: isMobile ? "flex" : "grid",
            flexDirection: "column",
            gridTemplateColumns: "1fr auto",
            gap: 14,
            alignItems: "center",
            boxShadow: NEU_FLAT,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background:
                  "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                color: "#3a2d10",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12 H17 M13 6 L19 12 L13 18" />
              </svg>
            </div>
            <div>
              <div
                style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)" }}
              >
                {bridge.title}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--muted)",
                  marginTop: 3,
                  lineHeight: 1.5,
                }}
              >
                {bridge.desc}
              </div>
            </div>
          </div>
          <Link
            href="/golden-visa"
            style={{
              textDecoration: "none",
              textAlign: "center",
              padding: "10px 18px",
              borderRadius: 999,
              background: "var(--bg-2)",
              color: "var(--ink)",
              fontSize: 12.5,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {bridge.cta}
          </Link>
        </div>
      </section>
    </Container>
  );
}

function ColumnHeader({ title, note, silver, gold }) {
  return (
    <div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 9.5,
          color: silver
            ? "var(--silver-deep)"
            : gold
              ? "oklch(0.78 0.13 80)"
              : "var(--muted)",
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
