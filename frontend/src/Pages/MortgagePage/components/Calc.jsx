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

// Для прикидки cashflow используем брутто-доходность в 6.5% годовых от стоимости
// объекта — стандартный UAE-апартамент NET после service charge / vacancy.
const RENT_YIELD = 0.065;

export default function Calc() {
  const isMobile = useIsMobile();
  const t = useTranslations("MortgagePage.calc");
  const controls = t.raw("controls");
  const yearLabels = t.raw("yearLabels");
  const result = t.raw("result");

  // price хранится в тыс. USD; rate в процентах (×100).
  const [price, setPrice] = useState(680);
  const [down, setDown] = useState(25);
  const [rate, setRate] = useState(4.79);
  const [years, setYears] = useState(25);

  const priceUSD = price * 1000;
  const downAmount = priceUSD * (down / 100);
  const loanAmount = priceUSD - downAmount;
  const months = years * 12;
  const mRate = rate / 100 / 12;

  // Annuity formula: P*(r*(1+r)^n)/((1+r)^n-1). Безопасно для rate=0.
  const monthly =
    mRate === 0
      ? loanAmount / months
      : (loanAmount * (mRate * Math.pow(1 + mRate, months))) /
        (Math.pow(1 + mRate, months) - 1);

  const totalPayout = monthly * months + downAmount;
  const interestOverpay = monthly * months - loanAmount;
  const rentMonthly = (priceUSD * RENT_YIELD) / 12;
  const cashflow = rentMonthly - monthly;

  const yearWord =
    years === 1
      ? yearLabels.one
      : years >= 2 && years <= 4
        ? yearLabels.few
        : yearLabels.many;

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
                color: "var(--accent-blue-deep)",
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
                style={{
                  fontStyle: "italic",
                  color: "var(--accent-blue-deep)",
                }}
              >
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
                min={400}
                max={5000}
                step={10}
                v={price}
                onChange={setPrice}
              />
              <Slider
                label={controls.down}
                value={`${down}%`}
                min={20}
                max={50}
                step={5}
                v={down}
                onChange={setDown}
              />
              <Slider
                label={controls.rate}
                value={`${rate.toFixed(2)}%`}
                min={4.49}
                max={7.5}
                step={0.1}
                v={rate}
                onChange={setRate}
              />
              <Slider
                label={controls.years}
                value={`${years} ${yearWord}`}
                min={5}
                max={25}
                step={1}
                v={years}
                onChange={setYears}
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
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 10.5,
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
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 0.95,
                  fontSize: isMobile ? 48 : 64,
                  color: "var(--accent-blue-deep)",
                  marginTop: 6,
                }}
              >
                ${Math.round(monthly).toLocaleString("en-US")}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--muted)",
                  marginTop: 4,
                }}
              >
                {result.monthsHint
                  .replace("{months}", String(months))
                  .replace("{rate}", rate.toFixed(2))}
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
                label={result.loanLabel}
                value={`$${Math.round(loanAmount / 1000)}K`}
              />
              <ResultCell
                label={result.downLabel}
                value={`$${Math.round(downAmount / 1000)}K`}
              />
              <ResultCell
                label={result.totalLabel}
                value={`$${Math.round(totalPayout / 1000)}K`}
              />
              <ResultCell
                label={result.overpayLabel}
                value={`$${Math.round(interestOverpay / 1000)}K`}
                accent
              />
              <ResultCell
                label={result.rentLabel}
                value={`$${Math.round(rentMonthly).toLocaleString("en-US")}`}
              />
              <ResultCell
                label={result.cashflowLabel}
                value={`${cashflow >= 0 ? "+" : "−"}$${Math.abs(Math.round(cashflow)).toLocaleString("en-US")}`}
                green={cashflow >= 0}
                red={cashflow < 0}
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
                textAlign: "center",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow:
                  "0 8px 18px rgba(10,10,11,.22), inset 0 1px 0 rgba(255,255,255,.08)",
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

function ResultCell({ label, value, accent, green, red }) {
  const color = accent
    ? "var(--accent-blue-deep)"
    : green
      ? "oklch(0.55 0.13 145)"
      : red
        ? "oklch(0.55 0.18 25)"
        : "var(--ink)";
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
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          fontSize: 22,
          color,
          marginTop: 4,
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
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            fontSize: 22,
            color: "var(--ink)",
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
              "linear-gradient(90deg, var(--accent-blue-deep), var(--accent-blue))",
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
