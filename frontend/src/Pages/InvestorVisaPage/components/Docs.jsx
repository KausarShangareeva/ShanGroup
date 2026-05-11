"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Docs() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.docs");
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
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 12 : 14,
          }}
        >
          {items.map((d, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 16,
                padding: isMobile ? 18 : 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background:
                    "linear-gradient(180deg, oklch(0.86 0.025 240), oklch(0.7 0.04 240))",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                {d.t}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {d.d}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
