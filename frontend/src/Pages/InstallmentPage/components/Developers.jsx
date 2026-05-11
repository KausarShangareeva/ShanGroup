"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

export default function Developers() {
  const isMobile = useIsMobile();
  const t = useTranslations("InstallmentPage.developers");
  const items = t.raw("items");
  const projectsLabel = t("projectsLabel");

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
          {items.map((d) => (
            <div
              key={d.n}
              style={{
                background: "var(--bg)",
                borderRadius: 18,
                padding: isMobile ? 18 : 22,
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    // Hardcoded — выступает как «бренд-плашка» застройщика
                    // (логотип-первая-буква), всегда тёмная независимо от темы.
                    background: "#0A0A0B",
                    color: "#fafaf7",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {d.n.charAt(0)}
                </div>
                <span
                  style={{
                    padding: "3px 9px",
                    borderRadius: 999,
                    background: "var(--bg-2)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.projects} {projectsLabel}
                </span>
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {d.n}
              </div>
              <div
                style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}
              >
                {d.l}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--accent-deep)",
                  lineHeight: 1.5,
                }}
              >
                {d.plans}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
