"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

// Карточки с требованиями к заёмщику. Иконки из общего реестра — без эмодзи,
// чтобы держать единый editorial-stroke стиль остальной страницы.
export default function Eligibility() {
  const isMobile = useIsMobile();
  const t = useTranslations("MortgagePage.eligibility");
  const items = t.raw("items");

  return (
    <Container>
      <section
        id="eligibility"
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
          titleC={t("titleC")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 20,
                padding: isMobile ? 20 : 26,
                boxShadow: NEU_RAISED_SM,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.05 265) 0%, oklch(0.85 0.07 265) 100%)",
                  color: "var(--accent-blue-deep)",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "var(--neu-flat)",
                }}
              >
                <Icon name={it.icon} size={20} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.012em",
                }}
              >
                {it.t}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {it.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
