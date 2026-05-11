"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "../InvestmentReportPage.module.css";

// Bold Montserrat display preset — the same heavy register the user asked for.
// Italic accent stays in Instrument Serif so "2026 outlook" reads as the hero
// pull-quote of the page.
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

// Research-report cover stays dark on both themes — credibility cue, no need
// to invert.
const COVER_BG =
  "linear-gradient(160deg, #0c1418 0%, #11202a 45%, #0c1418 100%)";
const COVER_SHADOW =
  "0 30px 60px rgba(8,16,22,.45), 0 8px 20px rgba(30,90,120,.18)";

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.hero");
  const trust = t.raw("trust");
  const report = t.raw("report");

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
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
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
                  background: "var(--ir-accent-deep)",
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
              {t("titleA")}
              <br />
              <span
                style={{
                  ...ITALIC_FONT,
                  color: "var(--ir-accent-deep)",
                  fontSize: "1.0em",
                }}
              >
                {t("titleB")}
              </span>
              <br />
              <span style={{ color: "var(--muted)", fontSize: "0.6em" }}>
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
                href="#toc"
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
                <Icon name="book" size={16} />
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

          {!isMobile && <ReportCover report={report} />}
        </div>
      </section>
    </Container>
  );
}

function ReportCover({ report }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
          borderRadius: 14,
          padding: "44px 36px 36px",
          background: COVER_BG,
          boxShadow: COVER_SHADOW,
          color: "#fff",
          aspectRatio: "0.78 / 1",
          overflow: "hidden",
        }}
      >
        {/* Edition stamp */}
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            padding: "5px 10px",
            border: "1px solid rgba(255,255,255,.18)",
            borderRadius: 4,
            fontSize: 9,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.65)",
          }}
        >
          {report.stamp}
        </div>

        {/* Embossed-line decoration */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.11 200 / .55), transparent)",
          }}
        />

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "oklch(0.78 0.11 200)",
            marginTop: 6,
          }}
        >
          {report.label}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".16em",
            color: "rgba(255,255,255,.55)",
          }}
        >
          {report.year}
        </div>

        <h3
          style={{
            margin: "36px 0 8px",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 44,
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            color: "#fff",
            textWrap: "balance",
          }}
        >
          {report.title}
        </h3>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "rgba(255,255,255,.72)",
          }}
        >
          {report.subtitle}
        </div>

        {/* Chart sparkline preview */}
        <div
          style={{
            position: "absolute",
            left: 36,
            right: 36,
            bottom: 110,
          }}
        >
          <svg viewBox="0 0 240 56" width="100%" height="56" fill="none">
            <defs>
              <linearGradient id="ir-cover-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="oklch(0.78 0.11 200)" stopOpacity=".45" />
                <stop offset="1" stopColor="oklch(0.78 0.11 200)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 48 L20 42 L42 38 L62 32 L84 28 L108 22 L132 18 L156 22 L182 14 L212 8 L240 4 L240 56 L0 56 Z"
              fill="url(#ir-cover-fill)"
            />
            <path
              d="M0 48 L20 42 L42 38 L62 32 L84 28 L108 22 L132 18 L156 22 L182 14 L212 8 L240 4"
              stroke="oklch(0.78 0.11 200)"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Footer rule */}
        <div
          style={{
            position: "absolute",
            left: 36,
            right: 36,
            bottom: 70,
            height: 1,
            background: "rgba(255,255,255,.12)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 36,
            right: 36,
            bottom: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 9,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".2em",
                color: "rgba(255,255,255,.45)",
                textTransform: "uppercase",
              }}
            >
              {report.publishLabel}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,.85)",
                marginTop: 4,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {report.publishValue}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 9,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".2em",
                color: "rgba(255,255,255,.45)",
                textTransform: "uppercase",
              }}
            >
              {report.isbnLabel}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,.85)",
                marginTop: 4,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {report.isbnValue}
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips — same pattern other landings use */}
      <div
        style={{
          position: "absolute",
          top: -14,
          right: -12,
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
        <Icon name="file-down" size={14} />
        PDF · 112 pp
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
            background: "var(--ir-bull)",
          }}
        />
        Peer-reviewed
      </div>
    </div>
  );
}
