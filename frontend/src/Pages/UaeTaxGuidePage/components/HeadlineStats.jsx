"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// "0% headline grid" — six numbers in a uniform card register so visitors get
// the whole tax landscape without scrolling further. The big number is the
// hook; the supporting line earns trust.
export default function HeadlineStats() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.headlineStats");
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
              ? "1fr 1fr"
              : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 18,
          }}
        >
          {items.map((it, i) => {
            const isZero = it.v.startsWith("0");
            return (
              <div
                key={it.l}
                style={{
                  background: "var(--bg)",
                  borderRadius: 22,
                  padding: isMobile ? 20 : 28,
                  boxShadow: NEU_RAISED,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isZero && (
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: -30,
                      right: -30,
                      width: 120,
                      height: 120,
                      borderRadius: 999,
                      background:
                        "radial-gradient(circle, var(--tx-accent-glow), transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    fontSize: isMobile ? 48 : 64,
                    color: isZero
                      ? "var(--tx-accent-deep)"
                      : "var(--ink)",
                  }}
                >
                  {it.v}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: isMobile ? 13.5 : 15,
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {it.l}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {it.n}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
