"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Benefits() {
  const isMobile = useIsMobile();
  const t = useTranslations("InstallmentPage.benefits");
  const items = t.raw("items");

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
          {items.map((b, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 18,
                padding: isMobile ? 22 : 26,
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  fontSize: 36,
                  color: "var(--accent-deep)",
                  opacity: 0.35,
                  marginBottom: 8,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 22,
                  lineHeight: 1.15,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {b.t}
              </h3>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
