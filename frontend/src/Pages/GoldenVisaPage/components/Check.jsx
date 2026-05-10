"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

const MIN_REQUIRED = 545; // тыс. $
const BASE_VISA_FEE = 6700; // AED для главного аппликанта
const FAMILY_FEE = 4200; // AED за каждого члена сверх главного
const AED_PER_USD = 3.6725;

export default function Check() {
  const isMobile = useIsMobile();
  const t = useTranslations("GoldenVisaPage.check");
  const controls = t.raw("controls");
  const planOptions = t.raw("planOptions");
  const labels = t.raw("labels");

  const [budget, setBudget] = useState(700);
  const [planType, setPlanType] = useState("ready");
  const [familySize, setFamilySize] = useState(3);

  const eligible = budget >= MIN_REQUIRED;
  const surplus = budget - MIN_REQUIRED;
  const totalForFamilyAED =
    BASE_VISA_FEE + Math.max(0, familySize - 1) * FAMILY_FEE;
  const totalUSD = totalForFamilyAED / AED_PER_USD;
  const duration = planType === "ready" ? "30–45" : "45–60";

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
                label={controls.budget}
                value={`$${budget}K`}
                min={200}
                max={3000}
                step={10}
                v={budget}
                onChange={setBudget}
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
                  {controls.planType}
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {planOptions.map((opt) => {
                    const active = planType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPlanType(opt.id)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          boxSizing: "border-box",
                          padding: "14px 16px",
                          borderRadius: 14,
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
                          style={{ fontSize: 11, opacity: 0.7, marginTop: 3 }}
                        >
                          {opt.d}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Slider
                label={controls.family}
                value={`${familySize} ${t("familyUnit")}`}
                min={1}
                max={8}
                step={1}
                v={familySize}
                onChange={setFamilySize}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 14,
                background: eligible
                  ? "oklch(0.95 0.06 145)"
                  : "oklch(0.93 0.05 25)",
                color: eligible
                  ? "oklch(0.42 0.13 145)"
                  : "oklch(0.45 0.13 25)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: eligible
                    ? "oklch(0.55 0.13 145)"
                    : "oklch(0.6 0.18 25)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {eligible ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7 L6 10 L11 4" />
                  </svg>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: 14 }}>!</span>
                )}
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  {eligible
                    ? t("eligible")
                    : t("notEligible", { amount: MIN_REQUIRED - budget })}
                </div>
                <div style={{ fontSize: 11.5, marginTop: 2, opacity: 0.85 }}>
                  {eligible
                    ? t("surplus", { amount: surplus })
                    : t("minHint")}
                </div>
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
                label={labels.duration}
                value={
                  <>
                    {duration}
                    <span
                      style={{
                        fontSize: 14,
                        marginLeft: 4,
                        color: "var(--muted)",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      {labels.durationUnit}
                    </span>
                  </>
                }
              />
              <ResultCell
                label={labels.visaTerm}
                value={labels.visaTermValue}
                accent
              />
              <ResultCell
                label={labels.fee}
                value={`$${(totalUSD / 1000).toFixed(1)}K`}
              />
              <ResultCell label={labels.familyMembers} value={familySize} />
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
              {eligible ? t("ctaEligible") : t("ctaNotEligible")}
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
