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

export default function Benefits() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.benefits");
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
          titleC={t("titleC")}
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
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--silver-deep)",
                  background: "var(--bg)",
                  boxShadow: NEU_INSET,
                }}
              >
                <Icon name={b.icon} size={22} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 21,
                  lineHeight: 1.15,
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                {b.t}
              </h3>
              <p
                style={{
                  margin: 0,
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
