"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

// Premium dark lead form (#0A0A0B always) с gold accent.
export default function LeadForm() {
  const isMobile = useIsMobile();
  const t = useTranslations("GoldenVisaPage.leadForm");
  const perks = t.raw("perks");
  const formCfg = t.raw("form");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    goal: "family",
    budget: "700",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.consent && form.name && form.phone;
  const onSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container>
        <section
          id="lead"
          style={{
            paddingTop: isMobile ? 60 : 100,
            paddingBottom: isMobile ? 60 : 100,
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{
              background: "var(--bg)",
              borderRadius: 32,
              padding: isMobile ? 36 : 60,
              textAlign: "center",
              maxWidth: 640,
              margin: "0 auto",
              boxShadow:
                "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                margin: "0 auto 20px",
                borderRadius: 999,
                background: "oklch(0.55 0.13 145)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                boxShadow: "0 14px 30px oklch(0.55 0.13 145 / .3)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12 L10 17 L19 7" />
              </svg>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile ? 28 : 38,
                color: "var(--ink)",
                letterSpacing: "-0.012em",
              }}
            >
              {t("success.title", {
                name: form.name || t("success.fallbackName"),
              })}
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 15,
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {t("success.line1")}
              <br />
              {t("success.line2", { phone: form.phone })}
            </p>
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section
        id="lead"
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 100,
          scrollMarginTop: 80,
        }}
      >
        <div
          style={{
            borderRadius: isMobile ? 28 : 36,
            padding: isMobile ? 28 : 56,
            background: "#0A0A0B",
            color: "#fafaf7",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 18px 40px rgba(10,10,11,.32), inset 0 1px 0 rgba(255,255,255,.06)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: 999,
              background:
                "radial-gradient(circle, oklch(0.78 0.12 80 / .25), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 32 : 56,
              position: "relative",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px 6px 8px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.08)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "oklch(0.86 0.13 88)",
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "oklch(0.86 0.13 88)",
                  }}
                />
                {t("badge")}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: isMobile ? 32 : 48,
                  lineHeight: 1.02,
                  color: "#fafaf7",
                  letterSpacing: "-0.012em",
                  textWrap: "balance",
                }}
              >
                {t("titleA")}{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "oklch(0.86 0.13 88)",
                    fontWeight: 400,
                  }}
                >
                  {t("titleB")}
                </span>{" "}
                {t("titleC")}
              </h2>
              <p
                style={{
                  margin: "20px 0 0",
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,.8)",
                  maxWidth: 460,
                }}
              >
                {t("subtitle")}
              </p>
              <div
                style={{
                  marginTop: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {perks.map((p) => (
                  <div
                    key={p}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: "rgba(255,255,255,.92)",
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: "oklch(0.55 0.13 145)",
                        color: "#fff",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="check" size={11} strokeWidth={2.5} />
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <FormBlockLabel>{formCfg.goalLabel}</FormBlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {formCfg.goals.map((g) => (
                  <ToggleChip
                    key={g.id}
                    active={form.goal === g.id}
                    onClick={() => setForm({ ...form, goal: g.id })}
                  >
                    {g.l}
                  </ToggleChip>
                ))}
              </div>

              <FormBlockLabel>{formCfg.budgetLabel}</FormBlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr 1fr"
                    : "1fr 1fr 1fr 1fr",
                  gap: 6,
                }}
              >
                {formCfg.budgets.map((b) => (
                  <ToggleChip
                    key={b.id}
                    active={form.budget === b.id}
                    size="sm"
                    onClick={() => setForm({ ...form, budget: b.id })}
                  >
                    {b.l}
                  </ToggleChip>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 10,
                  marginTop: 4,
                }}
              >
                <FormInput
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder={formCfg.namePlaceholder}
                />
                <FormInput
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder={formCfg.phonePlaceholder}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 12,
                  color: "rgba(255,255,255,.65)",
                  lineHeight: 1.5,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) =>
                    setForm({ ...form, consent: e.target.checked })
                  }
                  style={{
                    margin: 0,
                    marginTop: 3,
                    accentColor: "oklch(0.86 0.13 88)",
                    width: 16,
                    height: 16,
                    flexShrink: 0,
                  }}
                />
                <span>{formCfg.consent}</span>
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  all: "unset",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  boxSizing: "border-box",
                  textAlign: "center",
                  padding: "16px 24px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, oklch(0.86 0.13 88) 0%, oklch(0.74 0.14 78) 100%)",
                  color: "#3a2d10",
                  fontSize: 14.5,
                  fontWeight: 700,
                  boxShadow:
                    "0 10px 24px oklch(0.74 0.14 78 / .35), inset 0 1px 0 rgba(255,255,255,.5)",
                  marginTop: 8,
                  opacity: canSubmit ? 1 : 0.5,
                  transition: "opacity .2s",
                }}
              >
                {formCfg.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}

function FormBlockLabel({ children }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,.55)",
      }}
    >
      {children}
    </label>
  );
}

function ToggleChip({ active, onClick, children, size = "md" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: size === "sm" ? "10px 6px" : "12px 14px",
        borderRadius: size === "sm" ? 10 : 12,
        background: active ? "oklch(0.86 0.13 88)" : "rgba(255,255,255,.06)",
        color: active ? "#3a2d10" : "rgba(255,255,255,.85)",
        fontSize: size === "sm" ? 12 : 12.5,
        fontWeight: 600,
        textAlign: "center",
        border: active
          ? "1px solid oklch(0.86 0.13 88)"
          : "1px solid rgba(255,255,255,.1)",
        transition: "all .2s",
      }}
    >
      {children}
    </button>
  );
}

function FormInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      required
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        all: "unset",
        padding: "14px 16px",
        borderRadius: 12,
        background: "rgba(255,255,255,.07)",
        border: "1px solid rgba(255,255,255,.12)",
        color: "#fff",
        fontSize: 14,
        fontFamily: "inherit",
        boxSizing: "border-box",
      }}
    />
  );
}
