"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

// Dark hero CTA — colours are hardcoded in shades of black/indigo so the
// surface stays consistent across light/dark page modes (mirrors the RoiPage
// LeadForm pattern).
const ACCENT_BG =
  "linear-gradient(180deg, var(--dc-accent) 0%, var(--dc-accent-deep) 100%)";

export default function LeadForm() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage.leadForm");
  const perks = t.raw("perks");
  const stats = t.raw("stats");
  const formCfg = t.raw("form");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    budget: "mid",
    priority: "balanced",
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
            paddingTop: isMobile ? 50 : 90,
            paddingBottom: isMobile ? 50 : 100,
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{
              background: "var(--bg)",
              borderRadius: 32,
              padding: isMobile ? 36 : 64,
              textAlign: "center",
              maxWidth: 620,
              margin: "0 auto",
              boxShadow:
                "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                margin: "0 auto 22px",
                borderRadius: 999,
                background: "var(--dc-accent-deep)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                boxShadow: "0 14px 30px var(--dc-accent-glow)",
              }}
            >
              <Icon name="check" size={32} strokeWidth={2.5} />
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile ? 28 : 40,
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
              {t("success.line2")}
            </p>
            <div
              style={{
                marginTop: 22,
                padding: "14px 18px",
                borderRadius: 14,
                background: "var(--bg-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: "var(--dc-green-deep)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>
                {t("success.callNote", { phone: form.phone })}
              </span>
            </div>
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
          paddingTop: isMobile ? 50 : 90,
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
              top: -80,
              right: -80,
              width: 360,
              height: 360,
              borderRadius: 999,
              background:
                "radial-gradient(circle, var(--dc-accent-glow), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 240,
              height: 240,
              borderRadius: 999,
              background:
                "radial-gradient(circle, oklch(0.62 0.12 75 / .18), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 32 : 60,
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
                  marginBottom: 22,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.85)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--dc-accent)",
                  }}
                />
                {t("badge")}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Montserrat', system-ui, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                  fontSize: isMobile ? 32 : 48,
                  color: "#fff",
                  textWrap: "balance",
                }}
              >
                {t("titleA")}{" "}
                <span
                  style={{
                    fontFamily: "'Instrument Serif', 'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "var(--dc-accent)",
                  }}
                >
                  {t("titleB")}
                </span>{" "}
                {t("titleC")}
              </h2>
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,.75)",
                  maxWidth: 430,
                }}
              >
                {t("subtitle")}
              </p>

              <div
                style={{
                  marginTop: 26,
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
                      color: "rgba(255,255,255,.9)",
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: "var(--dc-accent-deep)",
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

              <div
                style={{
                  marginTop: 32,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(255,255,255,.12)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 14,
                }}
              >
                {stats.map(([n, l]) => (
                  <div key={l}>
                    <div
                      style={{
                        fontFamily:
                          "'Montserrat', system-ui, -apple-system, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        fontSize: 22,
                        color: "#fff",
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,.5)",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginTop: 2,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <FormBlockLabel>{formCfg.budgetLabel}</FormBlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                }}
              >
                {formCfg.budgets.map((b) => (
                  <ToggleChip
                    key={b.id}
                    active={form.budget === b.id}
                    onClick={() => setForm({ ...form, budget: b.id })}
                  >
                    {b.l}
                  </ToggleChip>
                ))}
              </div>

              <FormBlockLabel>{formCfg.priorityLabel}</FormBlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 6,
                }}
              >
                {formCfg.priorities.map((g) => (
                  <ToggleChip
                    key={g.id}
                    active={form.priority === g.id}
                    onClick={() => setForm({ ...form, priority: g.id })}
                  >
                    {g.l}
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
                  color: "rgba(255,255,255,.55)",
                  lineHeight: 1.55,
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
                    marginTop: 2,
                    accentColor: "var(--dc-accent)",
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
                  padding: "17px 24px",
                  borderRadius: 999,
                  marginTop: 6,
                  background: ACCENT_BG,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  boxShadow:
                    "0 10px 28px var(--dc-accent-glow), inset 0 1px 0 rgba(255,255,255,.2)",
                  opacity: canSubmit ? 1 : 0.55,
                  transition: "opacity .2s",
                }}
              >
                {formCfg.submit}
              </button>

              <div
                style={{
                  fontSize: 11.5,
                  color: "rgba(255,255,255,.38)",
                  textAlign: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {formCfg.responseNote}
              </div>
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
        color: "rgba(255,255,255,.45)",
      }}
    >
      {children}
    </label>
  );
}

function ToggleChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: "10px 8px",
        borderRadius: 10,
        background: active ? "var(--dc-accent-deep)" : "rgba(255,255,255,.06)",
        color: active ? "#fff" : "rgba(255,255,255,.85)",
        fontSize: 12,
        fontWeight: 600,
        textAlign: "center",
        border: active
          ? "1px solid var(--dc-accent-deep)"
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
