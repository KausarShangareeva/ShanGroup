"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function How() {
  const isMobile = useIsMobile();
  const t = useTranslations("InstallmentPage.how");
  const phases = t.raw("phases");

  return (
    <Container>
      <section
        id="how"
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
          scrollMarginTop: 80,
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
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 14 : 16,
          }}
        >
          {phases.map((p) => (
            <div
              key={p.n}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 26,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: 32,
                    color: "var(--accent-deep)",
                    opacity: 0.55,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.n}
                </span>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: "var(--bg-2)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--accent-deep)",
                    letterSpacing: ".06em",
                  }}
                >
                  {p.k}
                </span>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 22,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                {p.t}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
