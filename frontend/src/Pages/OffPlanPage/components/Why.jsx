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

export default function Why() {
  const isMobile = useIsMobile();
  const t = useTranslations("OffPlanPage.why");
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
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((r) => (
            <div
              key={r.n}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 22 : 32,
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 18,
                alignItems: "start",
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--sand-deep)",
                  background: "var(--bg)",
                  boxShadow: NEU_INSET,
                }}
              >
                <Icon name={r.icon} size={22} />
              </div>
              <div>
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
                  {r.t}
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {r.d}
                </p>
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: 38,
                  color: "var(--sand-deep)",
                  opacity: 0.35,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {r.n}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
