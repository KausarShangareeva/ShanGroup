"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function Service() {
  const isMobile = useIsMobile();
  const t = useTranslations("AirbnbPage.service");
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
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 12 : 14,
          }}
        >
          {items.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 18,
                padding: isMobile ? 18 : 22,
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 14,
                  background: "var(--bg)",
                  color: "var(--sand-deep)",
                  boxShadow: NEU_INSET,
                }}
              >
                <Icon name={s.icon} size={22} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: isMobile ? 17 : 19,
                  color: "var(--ink)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.005em",
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
