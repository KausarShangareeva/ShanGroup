"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Income → annual tax saved vs UAE. Marginal rates baked in to keep the math
// transparent — every conversion would otherwise need an FX layer the user
// hasn't asked for.
function formatUsd(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

const INCOME_STEPS = [100, 250, 500, 1000, 2000, 5000];

export default function SavingsCalc() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.calculator");
  const countriesAll = useTranslations("UaeTaxGuidePage.comparison").raw(
    "countries"
  );
  // Exclude the UAE row itself — calculator compares against the others.
  const countries = countriesAll.filter((c) => c.id !== "uae");

  const [income, setIncome] = useState(500); // $K
  const [fromId, setFromId] = useState(
    countries.find((c) => c.id === "ru") ? "ru" : countries[0]?.id
  );

  const from = countries.find((c) => c.id === fromId) || countries[0];

  const annualSavings = (income * 1000 * from.burden) / 100;

  return (
    <Container>
      <section
        id="calc"
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
          scrollMarginTop: 80,
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
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
            gap: isMobile ? 18 : 24,
          }}
        >
          {/* Inputs */}
          <div
            style={{
              background: "var(--bg)",
              borderRadius: 24,
              padding: isMobile ? 24 : 32,
              boxShadow: NEU_RAISED,
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 12,
                }}
              >
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("incomeLabel")}
                </label>
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    fontSize: 26,
                    color: "var(--ink)",
                  }}
                >
                  {formatUsd(income * 1000)}
                </div>
              </div>
              <input
                type="range"
                min={100}
                max={5000}
                step={50}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                aria-label={t("incomeLabel")}
                style={{
                  width: "100%",
                  accentColor: "var(--tx-accent-deep)",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10.5,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--muted)",
                }}
              >
                {INCOME_STEPS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setIncome(s)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      color:
                        income === s
                          ? "var(--tx-accent-deep)"
                          : "var(--muted)",
                      fontWeight: income === s ? 700 : 400,
                    }}
                  >
                    {formatUsd(s * 1000)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                {t("fromLabel")}
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr 1fr"
                    : "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {countries.map((c) => {
                  const active = fromId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFromId(c.id)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        padding: "12px 10px",
                        borderRadius: 12,
                        textAlign: "center",
                        background: active ? "var(--ink)" : "var(--bg)",
                        color: active ? "var(--ink-inverse)" : "var(--ink)",
                        boxShadow: active
                          ? "inset 2px 2px 6px rgba(0,0,0,.4)"
                          : "-2px -2px 5px var(--shadow-light), 2px 2px 5px var(--shadow-dark)",
                        fontSize: 12.5,
                        fontWeight: 600,
                        transition: "all .2s",
                      }}
                    >
                      <div>{c.country}</div>
                      <div
                        style={{
                          fontSize: 10,
                          fontFamily: "'JetBrains Mono', monospace",
                          opacity: 0.7,
                          marginTop: 4,
                        }}
                      >
                        {c.burden}%
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                fontSize: 11.5,
                color: "var(--muted)",
                lineHeight: 1.55,
                padding: "12px 14px",
                borderRadius: 12,
                background: "var(--bg-2)",
              }}
            >
              {t("notice")}
            </div>
          </div>

          {/* Output */}
          <div
            style={{
              background: "#0A0A0B",
              color: "#fff",
              borderRadius: 24,
              padding: isMobile ? 24 : 32,
              boxShadow:
                "0 18px 40px rgba(10,10,11,.32), inset 0 1px 0 rgba(255,255,255,.06)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 320,
                height: 320,
                borderRadius: 999,
                background:
                  "radial-gradient(circle, var(--tx-accent-glow), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.55)",
                  marginBottom: 8,
                }}
              >
                {t("savingsLabel")}
              </div>
              <div
                style={{
                  fontFamily:
                    "'Montserrat', system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  fontSize: isMobile ? 56 : 80,
                  color: "oklch(0.86 0.13 88)",
                }}
              >
                {formatUsd(annualSavings)}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.65)",
                  marginTop: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".04em",
                }}
              >
                {from.country} {from.burden}% → UAE 0%
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                paddingTop: 18,
                borderTop: "1px solid rgba(255,255,255,.12)",
                position: "relative",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.5)",
                  }}
                >
                  {t("fiveYearLabel")}
                </div>
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    fontSize: 28,
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {formatUsd(annualSavings * 5)}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.5)",
                  }}
                >
                  {t("ratesLabel")}
                </div>
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    fontSize: 28,
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {from.burden}%
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "rgba(255,255,255,.5)",
                      marginLeft: 6,
                    }}
                  >
                    {t("vsUaeLabel")}
                  </span>
                </div>
              </div>
            </div>

            <a
              href="#lead"
              style={{
                all: "unset",
                cursor: "pointer",
                boxSizing: "border-box",
                textAlign: "center",
                padding: "15px 22px",
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, oklch(0.7 0.13 80), oklch(0.5 0.13 70))",
                color: "#0A0A0B",
                fontSize: 14,
                fontWeight: 700,
                marginTop: "auto",
                boxShadow: "0 10px 26px var(--tx-accent-glow)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {t("ctaText")}
              <Icon name="arrow" size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}
