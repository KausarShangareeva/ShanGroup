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

// Эвристики yield: long-term ~7% gross, short-term ~10.5% gross при ADR/12.
// PM fee 8% long / 18% short. OPEX 10% (service charge, downtime, ремонт).
const LONG_GROSS_YIELD = 0.07;
const SHORT_GROSS_RATE = 0.105;
const PM_FEE_LONG = 0.08;
const PM_FEE_SHORT = 0.18;
const OPEX_PCT = 0.1;

export default function Calc() {
  const isMobile = useIsMobile();
  const t = useTranslations("RentalsPage.calc");
  const controls = t.raw("controls");
  const strategies = t.raw("strategies");
  const result = t.raw("result");

  const [price, setPrice] = useState(280); // тыс. $
  const [strategy, setStrategy] = useState("short");
  const [occupancy, setOccupancy] = useState(85);

  const priceUSD = price * 1000;
  const grossAnnual =
    strategy === "short"
      ? priceUSD * SHORT_GROSS_RATE * (occupancy / 100)
      : priceUSD * LONG_GROSS_YIELD;
  const pmFee = strategy === "short" ? PM_FEE_SHORT : PM_FEE_LONG;
  const netAnnual = grossAnnual * (1 - pmFee - OPEX_PCT);
  const monthly = Math.round(netAnnual / 12);
  const yieldPct = ((netAnnual / priceUSD) * 100).toFixed(2);
  const payback = (priceUSD / netAnnual).toFixed(1);

  return (
    <Container>
      <section
        id="calc"
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
          scrollMarginTop: 80,
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
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)" }}>
                {t("titleB")}
              </span>
            </h2>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              <Slider
                label={controls.price}
                value={`$${price}K`}
                min={150}
                max={2000}
                step={10}
                v={price}
                onChange={setPrice}
              />

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12.5,
                    color: "var(--muted)",
                    fontWeight: 500,
                    marginBottom: 10,
                  }}
                >
                  {controls.strategy}
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {strategies.map((opt) => {
                    const active = strategy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setStrategy(opt.id)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          boxSizing: "border-box",
                          padding: "14px 16px",
                          borderRadius: 14,
                          // Активный таб — всегда тёмный, не инвертируется в dark.
                          background: active ? "#0A0A0B" : "var(--bg)",
                          color: active ? "#fafaf7" : "var(--ink)",
                          boxShadow: active
                            ? "0 6px 14px rgba(10,10,11,.25)"
                            : "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                          transition: "all .25s",
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 700 }}>
                          {opt.l}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            opacity: 0.7,
                            marginTop: 3,
                          }}
                        >
                          {opt.d}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {strategy === "short" && (
                <Slider
                  label={controls.occupancy}
                  value={`${occupancy}%`}
                  min={60}
                  max={95}
                  step={1}
                  v={occupancy}
                  onChange={setOccupancy}
                />
              )}
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
                {result.monthlyLabel}
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
                ${monthly.toLocaleString()}
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
                label={result.yieldLabel}
                value={`${yieldPct}%`}
                accent
              />
              <ResultCell
                label={result.paybackLabel}
                value={`${payback} ${result.paybackUnit}`}
              />
              <ResultCell
                label={result.yearNetLabel}
                value={`$${Math.round(netAnnual / 1000)}K`}
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
          style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 500 }}
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
