"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

// Premium dark visa card — silver/blue palette (vs gold-accented Golden Visa).
// Внутри карты — `shimmerOverlay` div, который запускает анимацию shimmer из
// globals.css. Анимация проигрывается перманентно, lights переезжают слева
// направо за 4 секунды, parent клипует overflow.
const CARD_BG =
  "linear-gradient(135deg, #1a1a1c 0%, #1f2126 50%, #1a1a1c 100%)";
const CARD_SHADOW =
  "0 30px 60px rgba(10,10,11,.4), 0 8px 20px rgba(150,160,180,.15)";

// Стиль заголовка скопирован 1:1 из прототипа: Montserrat 700 с очень тугим
// трекингом (-0.035em) и line-height 0.92 даёт "толстый" display-вид. Italic
// акцент — Instrument Serif 400.
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
  const t = useTranslations("InvestorVisaPage.hero");
  const trust = t.raw("trust");
  const card = t.raw("card");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 36 : 80,
          paddingBottom: isMobile ? 40 : 80,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
            gap: isMobile ? 32 : 56,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px 7px 10px",
                borderRadius: 999,
                background: "var(--bg)",
                boxShadow: "var(--neu-flat)",
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
                  background: "var(--silver-deep)",
                }}
              />
              {t("badge")}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: isMobile
                  ? "clamp(38px, 11vw, 54px)"
                  : "clamp(56px, 6.4vw, 88px)",
                color: "var(--ink)",
                textWrap: "balance",
                ...DISPLAY_FONT,
              }}
            >
              {t("titleA")}
              <br />
              <span
                style={{
                  ...ITALIC_FONT,
                  color: "var(--silver-deep)",
                  fontSize: "0.95em",
                }}
              >
                {t("titleB")}
              </span>{" "}
              {t("titleC")}
            </h1>

            <p
              style={{
                margin: isMobile ? "20px 0 0" : "26px 0 0",
                maxWidth: 560,
                fontSize: isMobile ? 15 : 17,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}
            >
              {t("subtitle")}
            </p>

            <div
              style={{
                marginTop: isMobile ? 28 : 36,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <PrimaryButton size="lg" trailingArrow href="#lead">
                {t("ctaPrimary")}
              </PrimaryButton>
              <a
                href="/golden-visa"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "16px 24px",
                  borderRadius: 999,
                  background: "var(--bg)",
                  boxShadow:
                    "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon name="arrow-right" size={16} />
                {t("ctaSecondary")}
              </a>
            </div>

            <div
              style={{
                marginTop: isMobile ? 32 : 44,
                display: "flex",
                gap: isMobile ? 20 : 32,
                flexWrap: "wrap",
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
              }}
            >
              {trust.map((it, i) => (
                <div key={i}>
                  <div
                    style={{
                      ...DISPLAY_FONT,
                      fontSize: 22,
                      color: "var(--ink)",
                    }}
                  >
                    {it.v}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {it.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 28,
                  padding: 36,
                  background: CARD_BG,
                  boxShadow: CARD_SHADOW,
                  color: "#fff",
                  aspectRatio: "1.58 / 1",
                  overflow: "hidden",
                }}
              >
                {/* Shimmer — диагональный hi-light, бежит слева направо.
                    Анимация определена в globals.css, parent клипует overflow. */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(110deg, transparent 30%, rgba(180,200,230,.16) 50%, transparent 70%)",
                    animation: "shimmer 4s ease-in-out infinite",
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 200,
                    height: 200,
                    background:
                      "radial-gradient(circle, oklch(0.78 0.05 240 / .3), transparent 65%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 9.5,
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: ".22em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,.55)",
                        }}
                      >
                        {card.country}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          fontSize: 28,
                          marginTop: 4,
                          color: "rgba(200,215,235,.95)",
                          lineHeight: 1,
                          letterSpacing: "-0.012em",
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,.7)",
                          marginTop: 2,
                          fontStyle: "italic",
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {card.subtitle}
                      </div>
                    </div>
                    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        stroke="rgba(180,200,230,.6)"
                        strokeWidth="1"
                      />
                      <path
                        d="M24 8 L26 18 L34 16 L28 22 L36 26 L26 26 L28 36 L24 28 L20 36 L22 26 L12 26 L20 22 L14 16 L22 18 Z"
                        fill="rgba(200,215,235,.85)"
                      />
                    </svg>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: ".18em",
                        color: "rgba(255,255,255,.45)",
                        marginBottom: 6,
                      }}
                    >
                      {card.holderLabel}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 600,
                        fontSize: 22,
                        color: "#fff",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {card.holderPlaceholder}
                    </div>

                    <div
                      style={{
                        marginTop: 18,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <CardCell
                        label={card.categoryLabel}
                        value={card.categoryValue}
                        silver
                      />
                      <CardCell label={card.validLabel} value={card.validValue} mono />
                      <CardCell label={card.familyLabel} value={card.familyValue} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -10,
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--bg)",
                  color: "var(--ink)",
                  boxShadow:
                    "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)",
                }}
              >
                <Icon name="check" size={14} strokeWidth={2} />
                {card.chipBank}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -14,
                  left: -16,
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--bg)",
                  color: "var(--ink)",
                  boxShadow:
                    "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "oklch(0.55 0.13 145)",
                  }}
                />
                {card.chipSchools}
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}

function CardCell({ label, value, silver, mono }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 8.5,
          letterSpacing: ".18em",
          color: "rgba(255,255,255,.45)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 11,
          color: silver ? "rgba(200,215,235,.95)" : "#fff",
          marginTop: 2,
          fontWeight: silver ? 600 : 400,
          fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit",
        }}
      >
        {value}
      </div>
    </div>
  );
}
