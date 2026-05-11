"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Per-tax cards. Rate pill on the top right; 0% rates pull the accent for
// emphasis, non-zero rates fall back to neutral ink so the "0% pattern" is
// visually obvious at a glance.
export default function TaxBreakdown() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.breakdown");
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
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((it) => {
            const isZero = it.rate.startsWith("0");
            return (
              <article
                key={it.title}
                style={{
                  background: "var(--bg)",
                  borderRadius: 22,
                  padding: isMobile ? 22 : 28,
                  boxShadow: NEU_RAISED,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: isZero
                        ? "var(--tx-accent-soft)"
                        : "var(--bg-2)",
                      display: "grid",
                      placeItems: "center",
                      color: isZero
                        ? "var(--tx-accent-deep)"
                        : "var(--ink-2)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={it.icon} size={20} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "'Montserrat', system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.035em",
                      lineHeight: 0.9,
                      fontSize: 30,
                      color: isZero
                        ? "var(--tx-accent-deep)"
                        : "var(--ink)",
                    }}
                  >
                    {it.rate}
                  </div>
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.25,
                  }}
                >
                  {it.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    lineHeight: 1.65,
                    color: "var(--muted)",
                  }}
                >
                  {it.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
