"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Docs() {
  const isMobile = useIsMobile();
  const t = useTranslations("GoldenVisaPage.docs");
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
            gap: isMobile ? 12 : 14,
          }}
        >
          {items.map((d, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 16,
                padding: isMobile ? 18 : 22,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 14,
                alignItems: "start",
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background:
                    "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                  color: "#3a2d10",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {d.t}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--muted)",
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {d.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
