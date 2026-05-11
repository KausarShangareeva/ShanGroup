"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Indexed price chart, three scenarios. SVG so it scales and themes via
// currentColor / CSS vars. Y-axis is unlabelled deliberately — index 100 base
// year is in the caption.
const SCENARIO_COLOURS = {
  bull: "var(--ir-bull)",
  base: "var(--ir-accent-deep)",
  bear: "var(--ir-bear)",
};

const PAD = { l: 36, r: 16, t: 24, b: 36 };
const W = 720;
const H = 320;

export default function ForecastChart() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.forecast");
  const scenarios = t.raw("scenarios");
  const years = t.raw("years");

  const all = scenarios.flatMap((s) => s.values);
  const yMin = Math.min(...all);
  const yMax = Math.max(...all);
  const yRange = yMax - yMin || 1;

  const xStep = (W - PAD.l - PAD.r) / (years.length - 1);
  const innerH = H - PAD.t - PAD.b;

  const xAt = (i) => PAD.l + i * xStep;
  const yAt = (v) => PAD.t + innerH - ((v - yMin) / yRange) * innerH;

  const pathFor = (vals) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i)} ${yAt(v)}`).join(" ");

  // 4 horizontal gridlines
  const gridYs = [0, 1, 2, 3].map(
    (i) => PAD.t + (innerH * i) / 3
  );

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
          subtitle={t("subtitle")}
        />

        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 20 : 26,
            padding: isMobile ? 18 : 32,
            boxShadow: NEU_RAISED,
          }}
        >
          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? 14 : 22,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            {scenarios.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 3,
                    borderRadius: 999,
                    background: SCENARIO_COLOURS[s.id],
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {s.label}{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        color: "var(--muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {s.note}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ width: "100%", overflow: "hidden" }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              width="100%"
              role="img"
              aria-label="Indexed price forecast 2024–2029"
              style={{ display: "block" }}
            >
              {/* Grid */}
              {gridYs.map((y, i) => (
                <line
                  key={i}
                  x1={PAD.l}
                  x2={W - PAD.r}
                  y1={y}
                  y2={y}
                  stroke="var(--line)"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis index labels (100, mid, max-ish) */}
              {[0, 1, 2, 3].map((i) => {
                const v = yMin + (yRange * (3 - i)) / 3;
                return (
                  <text
                    key={i}
                    x={PAD.l - 8}
                    y={gridYs[i] + 4}
                    textAnchor="end"
                    fontSize="10"
                    fontFamily="'JetBrains Mono', monospace"
                    fill="var(--muted)"
                  >
                    {Math.round(v)}
                  </text>
                );
              })}

              {/* X-axis */}
              {years.map((yr, i) => (
                <text
                  key={yr}
                  x={xAt(i)}
                  y={H - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  fill="var(--muted)"
                >
                  {yr}
                </text>
              ))}

              {/* Lines */}
              {scenarios.map((s) => (
                <g key={s.id}>
                  <path
                    d={pathFor(s.values)}
                    stroke={SCENARIO_COLOURS[s.id]}
                    strokeWidth={s.id === "base" ? 3 : 2}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {s.values.map((v, i) => (
                    <circle
                      key={i}
                      cx={xAt(i)}
                      cy={yAt(v)}
                      r={s.id === "base" ? 3.5 : 2.5}
                      fill={SCENARIO_COLOURS[s.id]}
                    />
                  ))}
                  {/* End label */}
                  <text
                    x={xAt(s.values.length - 1) + 6}
                    y={yAt(s.values[s.values.length - 1]) + 4}
                    fontSize="11"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="700"
                    fill={SCENARIO_COLOURS[s.id]}
                  >
                    {s.values[s.values.length - 1]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".04em",
            }}
          >
            {t("footnote")}
          </div>
        </div>
      </section>
    </Container>
  );
}
