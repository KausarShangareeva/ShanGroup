"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

// Стиль h1 скопирован 1:1 из прототипа: Montserrat 700, -0.035em tracking,
// line-height 0.92 — даёт фирменный "толстый" display-вид.
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

// Цвета строк payment-plan карточки — отображают фазы оплаты от тёмного к
// светлому через accent-deep / sand-deep.
const ROW_COLORS = [
  "var(--ink)",
  "var(--accent-deep)",
  "var(--sand-deep)",
  "var(--accent)",
];

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("InstallmentPage.hero");
  const trust = t.raw("trust");
  const card = t.raw("card");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 36 : 70,
          paddingBottom: isMobile ? 40 : 70,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
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
                  background: "var(--accent-deep)",
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
                  color: "var(--accent-deep)",
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
              <PrimaryButton size="lg" trailingArrow href="#calc">
                {t("ctaPrimary")}
              </PrimaryButton>
              <a
                href="#how"
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
                      fontSize: 24,
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
            <div
              style={{
                background: "var(--bg)",
                borderRadius: 32,
                padding: 32,
                boxShadow: NEU_RAISED,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    {card.kicker}
                  </div>
                  <div
                    style={{
                      ...DISPLAY_FONT,
                      fontSize: 26,
                      color: "var(--ink)",
                      marginTop: 4,
                    }}
                  >
                    {card.price}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {card.subtitle}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.badge}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                {card.rows.map((r, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>
                        {r.l}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "var(--muted)",
                        }}
                      >
                        {r.pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        position: "relative",
                        overflow: "hidden",
                        background: "var(--bg)",
                        boxShadow: NEU_INSET,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          // Bar scales 1pct → 2% width so 40% bar covers 80% —
                          // визуально передаёт долю в плане без точного 1:1
                          // соответствия (так нагляднее на 4 рядах).
                          width: `${Math.min(100, r.pct * 2)}%`,
                          background: ROW_COLORS[i] || "var(--accent)",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        marginTop: 6,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {r.v}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 22,
                  padding: "14px 18px",
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, oklch(0.94 0.05 165) 0%, oklch(0.92 0.04 165) 100%)",
                  color: "oklch(0.32 0.12 165)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      opacity: 0.8,
                    }}
                  >
                    {card.overpayLabel}
                  </div>
                  <div style={{ ...DISPLAY_FONT, fontSize: 24, marginTop: 2 }}>
                    {card.overpayValue}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      opacity: 0.8,
                    }}
                  >
                    {card.vsLabel}
                  </div>
                  <div style={{ ...DISPLAY_FONT, fontSize: 24, marginTop: 2 }}>
                    {card.vsValue}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
