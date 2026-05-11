"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Maps the icon key in the JSON to a name from the project Icon registry —
// keeps insights data-driven while reusing the unified editorial icon set.
const ICON_MAP = {
  yield: "trend",
  rocket: "rocket",
  balance: "scale",
};

export default function AnalystInsights() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage");
  const items = t.raw("insights.items");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("insights.kicker")}
          titleA={t("insights.titleA")}
          titleB={t("insights.titleB")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((ins) => (
            <div
              key={ins.title}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 28,
                boxShadow: NEU_RAISED,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  marginBottom: 16,
                  background:
                    "color-mix(in oklab, var(--dc-accent-deep) 12%, transparent)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--dc-accent-deep)",
                }}
              >
                <Icon name={ICON_MAP[ins.icon] || "trend"} size={22} strokeWidth={1.8} />
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                }}
              >
                {ins.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                }}
              >
                {ins.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
