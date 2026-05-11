"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";
import { buildDistricts } from "./data";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

// Bar fills + value colours are pulled from --dc-accent-* + analogous tokens so
// switching the page palette in DistrictsComparePage.module.css recolours the
// whole ranking.
const METRIC_COLOURS = {
  netYield: "var(--dc-accent-deep)",
  growth: "var(--dc-green-deep)",
  roi5y: "var(--ink)",
  score: "var(--dc-gold)",
};

const METRIC_FMT = {
  netYield: (v) => `${v.toFixed(1)}%`,
  growth: (v) => `+${v}%`,
  roi5y: (v) => `+${v.toFixed(0)}%`,
  score: (v) => `${v}/100`,
};

export default function VisualRanking() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage");
  const metrics = t.raw("ranking.metrics");
  const districtsCopy = t.raw("districts");

  const rows = useMemo(() => buildDistricts(districtsCopy), [districtsCopy]);

  const [metric, setMetric] = useState("netYield");
  const meta = metrics.find((m) => m.id === metric) || metrics[0];
  const colour = METRIC_COLOURS[metric] || "var(--ink)";
  const fmt = METRIC_FMT[metric] || ((v) => String(v));

  const sorted = [...rows].sort((a, b) => b[metric] - a[metric]);
  const maxVal = Math.max(...sorted.map((d) => d[metric]));

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: isMobile ? 22 : 36,
          }}
        >
          <SectionHeader
            kicker={t("ranking.kicker")}
            titleA={t("ranking.titleA")}
            titleB={t("ranking.titleB")}
            maxWidth={560}
          />
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: isMobile ? 0 : 6,
            }}
          >
            {metrics.map((x) => {
              const active = metric === x.id;
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setMetric(x.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    padding: "8px 14px",
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    background: active ? "var(--ink)" : "var(--bg)",
                    color: active ? "var(--ink-inverse)" : "var(--ink-2)",
                    boxShadow: active
                      ? "inset 2px 2px 6px rgba(0,0,0,.35)"
                      : "-2px -2px 5px var(--shadow-light), 2px 2px 5px var(--shadow-dark)",
                    transition: "all .2s",
                  }}
                >
                  {x.l}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 20 : 26,
            padding: isMobile ? "16px 14px" : "24px 28px",
            boxShadow: NEU_RAISED,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {sorted.map((d, i) => {
            const pct = (d[metric] / maxVal) * 100;
            const isTop = i === 0;
            return (
              <div
                key={d.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "100px 1fr 60px"
                    : "190px 1fr 80px",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 7,
                      flexShrink: 0,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "grid",
                      placeItems: "center",
                      background: isTop ? colour : "var(--bg-2)",
                      color: isTop ? "#fff" : "var(--muted)",
                      boxShadow: isTop ? "0 4px 10px var(--dc-accent-glow)" : "none",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: isMobile ? 12 : 13.5,
                      fontWeight: isTop ? 700 : 500,
                      color: "var(--ink)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.name}
                  </span>
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      height: isMobile ? 10 : 14,
                      borderRadius: 999,
                      background: "var(--bg)",
                      boxShadow: NEU_INSET,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      borderRadius: 999,
                      width: `${pct}%`,
                      transition: "width .7s cubic-bezier(.4,0,.2,1)",
                      background: `linear-gradient(90deg, ${colour}, color-mix(in oklab, ${colour} 60%, var(--bg-2)))`,
                    }}
                  />
                </div>

                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    lineHeight: 0.92,
                    fontSize: isMobile ? 14 : 17,
                    textAlign: "right",
                    color: isTop ? colour : "var(--ink)",
                  }}
                >
                  {fmt(d[metric])}
                </div>
              </div>
            );
          })}
        </div>

        {/* Render meta.l only for screen readers — keeps the metric name in the
            DOM even when the title swap is the only visible cue. */}
        <span aria-live="polite" style={{ position: "absolute", left: -9999 }}>
          {meta.l}
        </span>
      </section>
    </Container>
  );
}
