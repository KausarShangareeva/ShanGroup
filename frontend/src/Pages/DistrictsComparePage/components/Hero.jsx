"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import { buildDistricts, fmtK } from "./data";
import styles from "../DistrictsComparePage.module.css";

// "Display" preset — Montserrat 700 with tight tracking. This is the bold/heavy
// h1 register shared by every investment landing in the project.
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

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage");
  const districtsCopy = t.raw("districts");

  const rows = useMemo(() => buildDistricts(districtsCopy), [districtsCopy]);

  const topYield = rows.reduce((a, b) => (b.netYield > a.netYield ? b : a));
  const topGrowth = rows.reduce((a, b) => (b.growth > a.growth ? b : a));
  const avgRoi = rows.reduce((s, d) => s + d.roi5y, 0) / rows.length;

  const stats = [
    {
      k: t("hero.stats.topYield"),
      v: `${topYield.netYield}%`,
      sub: topYield.full,
      c: "var(--dc-accent-deep)",
    },
    {
      k: t("hero.stats.topGrowth"),
      v: `+${topGrowth.growth}%`,
      sub: topGrowth.full,
      c: "var(--dc-green-deep)",
    },
    {
      k: t("hero.stats.avgRoi"),
      v: `+${avgRoi.toFixed(0)}%`,
      sub: t("hero.stats.avgRoiSub"),
      c: "var(--ink)",
    },
  ];

  return (
    <Container>
      <section
        style={{
          position: "relative",
          paddingTop: isMobile ? 36 : 72,
          paddingBottom: isMobile ? 28 : 56,
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
              className={styles.pulseDot}
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "var(--dc-accent-deep)",
              }}
            />
            {t("hero.badge")}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: isMobile
                ? "clamp(38px, 11vw, 56px)"
                : "clamp(52px, 6vw, 90px)",
              color: "var(--ink)",
              textWrap: "balance",
              ...DISPLAY_FONT,
            }}
          >
            {t("hero.titleA")}{" "}
            <span
              style={{
                ...ITALIC_FONT,
                color: "var(--dc-accent-deep)",
                fontSize: "0.9em",
              }}
            >
              {t("hero.titleB")}
            </span>
            <br />
            {t("hero.titleC")}
          </h1>

          <p
            style={{
              margin: isMobile ? "20px 0 0" : "26px 0 0",
              maxWidth: 640,
              fontSize: isMobile ? 15 : 17.5,
              lineHeight: 1.6,
              color: "var(--muted)",
            }}
          >
            {t("hero.subtitle")}
          </p>
        </div>

        <div
          style={{
            marginTop: isMobile ? 28 : 44,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.k}
              style={{
                background: "var(--bg)",
                borderRadius: 18,
                padding: "18px 20px",
                boxShadow:
                  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)",
                gridColumn: i === 2 && isMobile ? "1 / -1" : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 6,
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontSize: isMobile ? 32 : 42,
                  color: s.c,
                  ...DISPLAY_FONT,
                  letterSpacing: "-0.035em",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-2)",
                  marginTop: 5,
                  fontStyle: "italic",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
