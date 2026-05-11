"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// 6-card grid of macro drivers. Icon from the project registry so the visual
// language matches every other landing.
export default function MacroDrivers() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.macroDrivers");
  const items = t.raw("items");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((d) => (
            <article
              key={d.title}
              style={{
                background: "var(--bg)",
                borderRadius: 20,
                padding: isMobile ? 22 : 26,
                boxShadow: NEU_RAISED,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "var(--ir-accent-soft)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--ir-accent-deep)",
                }}
              >
                <Icon name={d.icon} size={22} strokeWidth={1.8} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.005em",
                }}
              >
                {d.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                {d.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
