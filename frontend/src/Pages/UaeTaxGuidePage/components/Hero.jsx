"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "../UaeTaxGuidePage.module.css";

// Heavy Montserrat display preset — the bold register the user asked for, used
// across every investment landing. Italic accent uses Instrument Serif so the
// "0%" reads visually distinct.
const DISPLAY_FONT = {
  fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.04em",
  lineHeight: 0.93,
};
const ITALIC_FONT = {
  fontFamily: "'Instrument Serif', 'Cormorant Garamond', serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.005em",
};

// Stays dark in light + dark themes — premium "TRC document" aesthetic.
const CARD_BG =
  "linear-gradient(135deg, #1a1a1c 0%, #2a2520 50%, #1a1a1c 100%)";
const CARD_SHADOW =
  "0 30px 60px rgba(10,10,11,.45), 0 8px 20px rgba(180,140,40,.18)";

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.hero");
  const trust = t.raw("trust");
  const card = t.raw("card");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 36 : 80,
          paddingBottom: isMobile ? 40 : 80,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
            gap: isMobile ? 32 : 56,
            alignItems: "center",
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
                className={styles.pulseDot}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: "var(--tx-accent-deep)",
                }}
              />
              {t("badge")}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: isMobile
                  ? "clamp(40px, 11vw, 58px)"
                  : "clamp(56px, 6.2vw, 96px)",
                color: "var(--ink)",
                textWrap: "balance",
                ...DISPLAY_FONT,
              }}
            >
              <span
                style={{
                  ...ITALIC_FONT,
                  color: "var(--tx-accent-deep)",
                  fontSize: "1.05em",
                }}
              >
                {t("titleA")}
              </span>
              <br />
              {t("titleB")}
              <br />
              <span style={{ color: "var(--muted)", fontSize: "0.62em" }}>
                {t("titleC")}
              </span>
            </h1>

            <p
              style={{
                margin: isMobile ? "20px 0 0" : "28px 0 0",
                maxWidth: 600,
                fontSize: isMobile ? 15 : 17.5,
                lineHeight: 1.6,
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
                href="#calc"
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
                <Icon name="calc" size={16} />
                {t("ctaSecondary")}
              </a>
            </div>

            <div
              style={{
                marginTop: isMobile ? 32 : 44,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                gap: isMobile ? 20 : 28,
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
              }}
            >
              {trust.map((it) => (
                <div key={it.l}>
                  <div
                    style={{
                      ...DISPLAY_FONT,
                      fontSize: isMobile ? 26 : 30,
                      color: "var(--ink)",
                      letterSpacing: "-0.035em",
                    }}
                  >
                    {it.v}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      marginTop: 6,
                      lineHeight: 1.3,
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
                <span className={styles.shimmer} aria-hidden />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 220,
                    height: 220,
                    background:
                      "radial-gradient(circle, oklch(0.78 0.13 80 / .38), transparent 65%)",
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
                          fontSize: 30,
                          marginTop: 4,
                          color: "oklch(0.86 0.13 88)",
                          lineHeight: 1,
                          letterSpacing: "-0.012em",
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "rgba(255,255,255,.7)",
                          marginTop: 4,
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
                        stroke="oklch(0.86 0.13 88)"
                        strokeOpacity=".55"
                        strokeWidth="1"
                      />
                      <path
                        d="M14 24h20M24 14v20"
                        stroke="oklch(0.86 0.13 88)"
                        strokeOpacity=".85"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="7"
                        stroke="oklch(0.86 0.13 88)"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10.5,
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
                        marginTop: 20,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 14,
                      }}
                    >
                      <CardCell label={card.rateLabel} value={card.rateValue} gold />
                      <CardCell label={card.validLabel} value={card.validValue} />
                      <CardCell label={card.trcLabel} value={card.trcValue} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: -14,
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
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--tx-savings)",
                  }}
                />
                {card.chipTrc}
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
                <Icon name="globe" size={14} />
                {card.chipDta}
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}

function CardCell({ label, value, gold }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 8.5,
          letterSpacing: ".18em",
          color: "rgba(255,255,255,.45)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: gold ? 18 : 11,
          color: gold ? "oklch(0.86 0.13 88)" : "#fff",
          marginTop: 2,
          fontWeight: gold ? 700 : 400,
          fontFamily: gold ? "inherit" : "'JetBrains Mono', monospace",
          letterSpacing: gold ? "-0.02em" : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}
