"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function Calc() {
  const isMobile = useIsMobile();
  const t = useTranslations("OffPlanPage.calc");
  const controls = t.raw("controls");
  const result = t.raw("result");

  const [budget, setBudget] = useState(550); // в тыс. $
  const [period, setPeriod] = useState(30); // мес.
  const [growth, setGrowth] = useState(28); // %

  const futureValue = Math.round(budget * (1 + growth / 100));
  const profit = futureValue - budget;
  const roi = ((profit / budget) * 100).toFixed(1);
  const annualized = ((Math.pow(1 + growth / 100, 12 / period) - 1) * 100).toFixed(1);

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
        }}
      >
        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 24 : 32,
            padding: isMobile ? 24 : 44,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 28 : 48,
            boxShadow: NEU_RAISED,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--sand-deep)",
                marginBottom: 14,
              }}
            >
              {t("kicker")}
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile ? 30 : 40,
                lineHeight: 1.05,
                color: "var(--ink)",
                letterSpacing: "-0.012em",
              }}
            >
              {t("titleA")}{" "}
              <span
                style={{ fontStyle: "italic", color: "var(--sand-deep)" }}
              >
                {t("titleB")}
              </span>
            </h2>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <Slider
                label={controls.budget}
                value={`$${budget}K`}
                min={200}
                max={3000}
                step={10}
                v={budget}
                onChange={setBudget}
              />
              <Slider
                label={controls.period}
                value={`${period} ${controls.periodUnit}`}
                min={18}
                max={60}
                step={3}
                v={period}
                onChange={setPeriod}
              />
              <Slider
                label={controls.growth}
                value={`${growth}${controls.growthUnit}`}
                min={15}
                max={50}
                step={1}
                v={growth}
                onChange={setGrowth}
              />
            </div>
          </div>

          <div
            style={{
              borderRadius: 24,
              padding: isMobile ? 22 : 32,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              justifyContent: "center",
              background: "var(--bg)",
              boxShadow: NEU_INSET,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {result.futureValueLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 40 : 56,
                  color: "var(--ink)",
                  marginTop: 6,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                }}
              >
                ${futureValue}K
              </div>
            </div>

            <div style={{ height: 1, background: "var(--line)" }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <ResultCell
                label={result.profitLabel}
                value={`+$${profit}K`}
                accent
              />
              <ResultCell label={result.roiLabel} value={`${roi}%`} />
              <ResultCell
                label={result.annualizedLabel}
                value={`${annualized}%`}
              />
              <ResultCell label={result.taxLabel} value="$0" />
            </div>

            <a
              href="#lead"
              style={{
                all: "unset",
                cursor: "pointer",
                marginTop: 8,
                padding: "14px 22px",
                borderRadius: 999,
                background: "#0A0A0B",
                color: "#fafaf7",
                fontSize: 13,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow:
                  "0 8px 18px rgba(10,10,11,.22), inset 0 1px 0 rgba(255,255,255,.08)",
                textAlign: "center",
              }}
            >
              {result.cta}
              <Icon name="arrow-right" size={14} />
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}

function ResultCell({ label, value, accent }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10.5,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontSize: 26,
          color: accent ? "oklch(0.55 0.13 145)" : "var(--ink)",
          marginTop: 4,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, v, onChange }) {
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 12.5,
            color: "var(--muted)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 22,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: 28,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 8,
            borderRadius: 999,
            background: "var(--bg)",
            boxShadow: NEU_INSET,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            height: 8,
            width: `${pct}%`,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, var(--sand-deep), var(--sand))",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "relative",
            width: "100%",
            height: 28,
            opacity: 0,
            cursor: "pointer",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: `calc(${pct}% - 12px)`,
            width: 24,
            height: 24,
            borderRadius: 999,
            background: "var(--ink)",
            boxShadow: "0 4px 10px rgba(10,10,11,.3)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
