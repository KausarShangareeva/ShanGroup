"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DISTRICTS } from "./districts";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

// Множители для стратегий аренды:
// — long-term: базовая ставка, низкий opex (8%);
// — mixed: +20% к доходности, opex 12%, занятость почти 100%;
// — airbnb: +55% к ставке, но 85% занятости и opex 20%.
const STRAT_MUL = {
  longterm: { rent: 1.0, occ: 1.0, fee: 0.08 },
  mixed: { rent: 1.2, occ: 0.92, fee: 0.12 },
  airbnb: { rent: 1.55, occ: 0.85, fee: 0.2 },
};

function fmtUSD(n) {
  if (Math.abs(n) >= 1e6)
    return "$" + (n / 1e6).toFixed(n >= 10e6 ? 1 : 2) + "M";
  if (Math.abs(n) >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + Math.round(n).toLocaleString("en-US");
}
function fmtPct(n) {
  return (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
}

export default function Calc() {
  const isMobile = useIsMobile();
  const t = useTranslations("RoiPage.calc");
  const controls = t.raw("controls");
  const summary = t.raw("summary");
  const horizons = t.raw("horizons");
  const strategies = t.raw("strategies");

  const [district, setDistrict] = useState("mar");
  const [price, setPrice] = useState(620);
  const [rentYield, setRentYield] = useState(7.0);
  const [growth, setGrowth] = useState(7.5);
  const [occupancy, setOccupancy] = useState(91);
  const [strategy, setStrategy] = useState("longterm");

  // При смене района подтягиваем его пресет в ползунки.
  useEffect(() => {
    const d = DISTRICTS.find((x) => x.id === district);
    if (d) {
      setPrice(d.price);
      setRentYield(d.rent);
      setGrowth(d.growth);
      setOccupancy(d.occ);
    }
  }, [district]);

  const stratMul = STRAT_MUL[strategy] || STRAT_MUL.longterm;

  const results = useMemo(() => {
    const buyPrice = price * 1000;
    const dldFee = buyPrice * 0.04;
    const agentFee = buyPrice * 0.02;
    const initialCost = buyPrice + dldFee + agentFee;
    const effectiveRent =
      (rentYield / 100) * stratMul.rent * (occupancy / 100) * stratMul.occ;
    const grossRentY1 = buyPrice * effectiveRent;
    const opex = grossRentY1 * stratMul.fee;
    const netRentY1 = grossRentY1 - opex;
    const serviceCharge = buyPrice * 0.008;
    const netCashflowY1 = netRentY1 - serviceCharge;
    // 3% индексация аренды каждый год — стандартная UAE-rent escalation.
    const data = [3, 5, 10].map((years) => {
      let cumRent = 0;
      let curRent = netCashflowY1;
      for (let i = 0; i < years; i++) {
        cumRent += curRent;
        curRent *= 1.03;
      }
      const finalValue = buyPrice * Math.pow(1 + growth / 100, years);
      const capGain = finalValue - buyPrice;
      const exitCosts = finalValue * 0.06;
      const totalReturn = cumRent + capGain - exitCosts;
      const roiPct = (totalReturn / initialCost) * 100;
      const cagr =
        Math.pow((totalReturn + initialCost) / initialCost, 1 / years) - 1;
      return {
        years,
        cumRent,
        capGain,
        exitCosts,
        totalReturn,
        finalValue,
        roiPct,
        cagr: cagr * 100,
      };
    });
    return { initialCost, netCashflowY1, data };
  }, [price, rentYield, growth, occupancy, stratMul]);

  return (
    <Container>
      <section
        id="calc"
        style={{
          paddingTop: isMobile ? 16 : 24,
          paddingBottom: isMobile ? 40 : 60,
          scrollMarginTop: 80,
        }}
      >
        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 24 : 32,
            padding: isMobile ? 22 : 40,
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(0, 1fr) minmax(0, 1.15fr)",
            gap: isMobile ? 28 : 44,
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
                color: "var(--accent-green-deep)",
                marginBottom: 12,
              }}
            >
              {t("kicker")}
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile ? 26 : 36,
                lineHeight: 1.05,
                color: "var(--ink)",
                letterSpacing: "-0.012em",
              }}
            >
              {t("titleA")}{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--accent-green-deep)",
                }}
              >
                {t("titleB")}
              </span>
            </h2>

            <div style={{ marginTop: 24 }}>
              <BlockLabel>{t("districtLabel")}</BlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {DISTRICTS.map((d) => {
                  const a = district === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDistrict(d.id)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: a ? "#0A0A0B" : "var(--bg)",
                        color: a ? "#fafaf7" : "var(--ink)",
                        boxShadow: a
                          ? "inset 2px 2px 6px rgba(0,0,0,.4)"
                          : "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                        fontSize: 12.5,
                        fontWeight: 600,
                        textAlign: "center",
                        transition: "all .2s",
                      }}
                    >
                      {d.l}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <BlockLabel>{t("strategyLabel")}</BlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {strategies.map((s) => {
                  const a = strategy === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStrategy(s.id)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        padding: "10px 8px",
                        borderRadius: 12,
                        background: a ? "var(--accent-green-deep)" : "var(--bg)",
                        color: a ? "#fff" : "var(--ink)",
                        boxShadow: a
                          ? "0 4px 12px oklch(0.45 0.16 155 / .3)"
                          : "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                        fontSize: 12,
                        fontWeight: 600,
                        textAlign: "center",
                        transition: "all .2s",
                      }}
                    >
                      <div>{s.l}</div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          opacity: 0.75,
                          marginTop: 2,
                        }}
                      >
                        {s.n}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <Slider
                label={controls.price}
                value={`$${price}K`}
                min={150}
                max={3000}
                step={10}
                v={price}
                onChange={setPrice}
              />
              <Slider
                label={controls.yield}
                value={`${rentYield.toFixed(1)}%`}
                min={3}
                max={12}
                step={0.1}
                v={rentYield}
                onChange={setRentYield}
              />
              <Slider
                label={controls.growth}
                value={`${growth.toFixed(1)}%`}
                min={2}
                max={15}
                step={0.1}
                v={growth}
                onChange={setGrowth}
              />
              <Slider
                label={controls.occupancy}
                value={`${occupancy}%`}
                min={50}
                max={98}
                step={1}
                v={occupancy}
                onChange={setOccupancy}
              />
            </div>
          </div>

          <div>
            <div
              style={{
                background: "var(--bg)",
                boxShadow: NEU_INSET,
                borderRadius: 18,
                padding: "16px 20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
              }}
            >
              <SummaryCell
                label={summary.initialCost}
                value={fmtUSD(results.initialCost)}
              />
              <SummaryCell
                label={summary.netIncome}
                value={fmtUSD(results.netCashflowY1)}
                accent
              />
              <SummaryCell
                label={summary.netYield}
                value={`${((results.netCashflowY1 / results.initialCost) * 100).toFixed(2)}%`}
              />
            </div>

            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                gap: isMobile ? 10 : 14,
              }}
            >
              {results.data.map((d, i) => {
                const accent = i === 2;
                return (
                  <div
                    key={d.years}
                    style={{
                      borderRadius: 20,
                      padding: isMobile ? 18 : 22,
                      background: accent
                        ? "linear-gradient(155deg, oklch(0.45 0.16 155), oklch(0.32 0.14 155))"
                        : "var(--bg)",
                      color: accent ? "#fff" : "var(--ink)",
                      boxShadow: accent ? NEU_RAISED_SM : NEU_FLAT,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: accent ? "rgba(255,255,255,.7)" : "var(--muted)",
                      }}
                    >
                      {horizons.label.replace("{years}", String(d.years))}
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "'Montserrat', system-ui, -apple-system, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "-0.035em",
                        lineHeight: 0.92,
                        fontSize: isMobile ? 36 : 44,
                        marginTop: 6,
                        color: accent ? "#fff" : "var(--accent-green-deep)",
                      }}
                    >
                      {fmtPct(d.roiPct)}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: accent ? "rgba(255,255,255,.7)" : "var(--muted)",
                        marginTop: 2,
                      }}
                    >
                      {horizons.totalRoi} · {horizons.cagr} {d.cagr.toFixed(1)}%
                    </div>
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 12,
                        borderTop: accent
                          ? "1px solid rgba(255,255,255,.18)"
                          : "1px solid var(--line)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <Row
                        accent={accent}
                        l={horizons.cumRent}
                        v={fmtUSD(d.cumRent)}
                      />
                      <Row
                        accent={accent}
                        l={horizons.capGain}
                        v={fmtUSD(d.capGain)}
                      />
                      <Row
                        accent={accent}
                        l={horizons.exitCost}
                        v={"−" + fmtUSD(d.exitCosts)}
                      />
                      <Row
                        accent={accent}
                        l={horizons.finalValue}
                        v={fmtUSD(d.finalValue)}
                        strong
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 14,
                        padding: "10px 14px",
                        borderRadius: 12,
                        background: accent
                          ? "rgba(255,255,255,.12)"
                          : "var(--bg-2)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          color: accent
                            ? "rgba(255,255,255,.7)"
                            : "var(--muted)",
                        }}
                      >
                        {horizons.inPocket}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "'Montserrat', system-ui, -apple-system, sans-serif",
                          fontWeight: 700,
                          letterSpacing: "-0.035em",
                          fontSize: 18,
                          color: accent ? "#fff" : "oklch(0.55 0.13 145)",
                        }}
                      >
                        {fmtUSD(d.totalReturn)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                fontSize: 11.5,
                lineHeight: 1.55,
                color: "var(--muted)",
                padding: "0 4px",
              }}
            >
              {t("footnote").replace(
                "{fee}",
                String(Math.round(stratMul.fee * 100)),
              )}
            </div>

            <a
              href="#lead"
              style={{
                all: "unset",
                cursor: "pointer",
                boxSizing: "border-box",
                marginTop: 18,
                padding: "16px 24px",
                borderRadius: 999,
                background: "#0A0A0B",
                color: "#fafaf7",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 8px 18px rgba(10,10,11,.22)",
              }}
            >
              {t("cta")}
              <Icon name="arrow-right" size={14} />
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}

function BlockLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function SummaryCell({ label, value, accent }) {
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
          fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 0.92,
          fontSize: 22,
          color: accent ? "var(--accent-green-deep)" : "var(--ink)",
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ l, v, accent, strong }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 12,
          color: accent ? "rgba(255,255,255,.75)" : "var(--muted)",
        }}
      >
        {l}
      </span>
      <span
        style={{
          fontSize: strong ? 13 : 12.5,
          fontWeight: strong ? 700 : 600,
          fontFamily: "'JetBrains Mono', monospace",
          color: accent ? "#fff" : "var(--ink)",
        }}
      >
        {v}
      </span>
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
            fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            fontSize: 20,
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
              "linear-gradient(90deg, var(--accent-green-deep), var(--accent-green))",
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
