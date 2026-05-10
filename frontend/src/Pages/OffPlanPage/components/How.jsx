"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

export default function How() {
  const isMobile = useIsMobile();
  const t = useTranslations("OffPlanPage.how");
  const steps = t.raw("steps");

  return (
    <Container>
      <section
        id="how"
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
          maxWidth={720}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
            gap: isMobile ? 12 : 14,
            position: "relative",
          }}
        >
          {!isMobile && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 36,
                left: "10%",
                right: "10%",
                height: 2,
                background: "var(--line)",
                zIndex: 0,
              }}
            />
          )}
          {steps.map((s, i) => {
            const isFirst = i === 0;
            return (
              <div
                key={s.n}
                style={{ position: "relative", zIndex: 1 }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 999,
                    // Активный (первый) шаг — всегда тёмный, в обеих темах.
                    background: isFirst ? "#0A0A0B" : "var(--bg)",
                    color: isFirst ? "#fafaf7" : "var(--ink)",
                    boxShadow: isFirst
                      ? "0 10px 24px rgba(10,10,11,.25)"
                      : "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                    margin: isMobile ? "0 0 14px 0" : "0 auto 18px",
                  }}
                >
                  {s.n}
                </div>
                <div style={{ textAlign: isMobile ? "left" : "center" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: 20,
                      color: "var(--ink)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--muted)",
                    }}
                  >
                    {s.d}
                  </p>
                  <div
                    style={{
                      marginTop: 12,
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "var(--bg-2)",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: ".1em",
                      color: "var(--sand-deep)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.k}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
