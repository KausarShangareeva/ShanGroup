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

// Простая модель flip-ROIC:
// - cashIn = price × dp (первый взнос)
// - fullPaidByExit = price × 0.5 (типично к handover-триггеру)
// - exitPrice = price × (1 + appreciation)
// - fees = 4% DLD at purchase + 2% agent + 2% DLD at sale
// - netProfit = grossProfit − fees
// - ROIC = netProfit / fullPaidByExit
const DLD_BUY_RATE = 0.04;
const AGENT_SELL_RATE = 0.02;
const DLD_SELL_RATE = 0.02;
const PAID_AT_EXIT_RATE = 0.5;

export default function Calc() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.calc");
  const controls = t.raw("controls");
  const result = t.raw("result");

  const [price, setPrice] = useState(520);
  const [dp, setDp] = useState(20);
  const [appreciation, setAppreciation] = useState(42);
  const [months, setMonths] = useState(24);

  const priceUSD = price * 1000;
  const cashIn = priceUSD * (dp / 100);
  const fullPaidByExit = priceUSD * PAID_AT_EXIT_RATE;
  const exitPrice = priceUSD * (1 + appreciation / 100);
  const grossProfit = exitPrice - priceUSD;
  const fees =
    priceUSD * DLD_BUY_RATE +
    exitPrice * AGENT_SELL_RATE +
    exitPrice * DLD_SELL_RATE;
  const netProfit = grossProfit - fees;
  const roic = (netProfit / fullPaidByExit) * 100;
  const annualized = (Math.pow(1 + roic / 100, 12 / months) - 1) * 100;

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
                min={250}
                max={3000}
                step={10}
                v={price}
                onChange={setPrice}
              />
              <Slider
                label={controls.dp}
                value={`${dp}%`}
                min={5}
                max={50}
                step={1}
                v={dp}
                onChange={setDp}
              />
              <Slider
                label={controls.appreciation}
                value={`+${appreciation}%`}
                min={15}
                max={80}
                step={1}
                v={appreciation}
                onChange={setAppreciation}
              />
              <Slider
                label={controls.months}
                value={`${months} ${controls.monthsUnit}`}
                min={12}
                max={48}
                step={3}
                v={months}
                onChange={setMonths}
              />
            </div>
          </div>

          <div
            style={{
              borderRadius: 24,
              padding: isMobile ? 22 : 32,
              display: "flex",
              flexDirection: "column",
              gap: 16,
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
                {result.netProfitLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 40 : 56,
                  color: "oklch(0.55 0.13 145)",
                  marginTop: 6,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                }}
              >
                ${Math.round(netProfit / 1000)}K
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
                label={result.roicLabel}
                value={`+${roic.toFixed(0)}%`}
              />
              <ResultCell
                label={result.annualizedLabel}
                value={`${annualized.toFixed(0)}% ${result.annualizedUnit}`}
              />
              <ResultCell
                label={result.cashInLabel}
                value={`$${Math.round(cashIn / 1000)}K`}
                small
              />
              <ResultCell
                label={result.exitLabel}
                value={`$${Math.round(exitPrice / 1000)}K`}
                small
              />
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

function ResultCell({ label, value, small }) {
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
          fontSize: small ? 22 : 26,
          color: "var(--ink)",
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
