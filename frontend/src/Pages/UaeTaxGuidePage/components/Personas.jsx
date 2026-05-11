"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Three "is this for me?" cards. Same Icon registry the rest of the site uses
// so the language stays consistent.
export default function Personas() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.personas");
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
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((p) => (
            <article
              key={p.id}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 24 : 30,
                boxShadow: NEU_RAISED,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "var(--tx-accent-soft)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--tx-accent-deep)",
                }}
              >
                <Icon name={p.icon} size={24} strokeWidth={1.8} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: isMobile ? 22 : 26,
                  color: "var(--ink)",
                  letterSpacing: "-0.012em",
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
