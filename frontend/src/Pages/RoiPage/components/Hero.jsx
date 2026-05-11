"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

// Стиль h1 копируется 1:1 из прототипа ROI — Montserrat 700, -0.035em,
// line-height 0.92. Это "толстый" display-вид, общий для всех инвест-страниц.
const DISPLAY_FONT = {
  fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.035em",
  lineHeight: 0.92,
};
const ITALIC_FONT = {
  fontFamily: "'Instrument Serif', 'Cormorant Garamond', serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.005em",
};

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("RoiPage.hero");

  return (
    <Container>
      <section
        style={{
          position: "relative",
          paddingTop: isMobile ? 36 : 70,
          paddingBottom: isMobile ? 28 : 50,
        }}
      >
        <div style={{ maxWidth: 920 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px 7px 10px",
              borderRadius: 999,
              background: "var(--bg)",
              boxShadow:
                "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--ink-2)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "var(--accent-green-deep)",
              }}
            />
            {t("badge")}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: isMobile
                ? "clamp(38px, 11vw, 54px)"
                : "clamp(56px, 6.4vw, 92px)",
              color: "var(--ink)",
              textWrap: "balance",
              ...DISPLAY_FONT,
            }}
          >
            {t("titleA")}{" "}
            <span
              style={{
                ...ITALIC_FONT,
                color: "var(--accent-green-deep)",
                fontSize: "0.95em",
              }}
            >
              {t("titleB")}
            </span>
            <br />
            {t("titleC")}
          </h1>

          <p
            style={{
              margin: isMobile ? "20px 0 0" : "26px 0 0",
              maxWidth: 680,
              fontSize: isMobile ? 15 : 17.5,
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            {t("subtitle")}
          </p>
        </div>
      </section>
    </Container>
  );
}
