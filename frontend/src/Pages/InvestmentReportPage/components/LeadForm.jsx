"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";

// Dark conversion surface — petrol accent stays at full strength regardless of
// theme. Form collects: profile, interest, work email, name, phone, Q&A toggle.
const ACCENT_BG =
  "linear-gradient(180deg, oklch(0.6 0.13 200) 0%, oklch(0.4 0.12 205) 100%)";

export default function LeadForm() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.leadForm");
  const perks = t.raw("perks");
  const stats = t.raw("stats");
  const formCfg = t.raw("form");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "investor",
    interest: "forecast",
    qa: false,
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.consent && form.name && form.email;
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
                margin: "0 auto 22px",
                borderRadius: 999,
                background: "var(--ir-accent-deep)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                boxShadow: "0 14px 30px var(--ir-accent-glow)",
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
            {form.qa && form.phone && (
              <div
                style={{
                  marginTop: 22,
                  padding: "14px 18px",
                  borderRadius: 14,
                  background: "var(--bg-2)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: "var(--ir-bull)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>
                  {t("success.callNote", { phone: form.phone })}
                </span>
              </div>
            )}
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
            background: "#0c1418",
            color: "#fafaf7",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 18px 40px rgba(8,16,22,.36), inset 0 1px 0 rgba(255,255,255,.06)",
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
                "radial-gradient(circle, oklch(0.55 0.13 205 / .4), transparent 70%)",
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
                "radial-gradient(circle, oklch(0.45 0.16 145 / .2), transparent 70%)",
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
            {/* Left column */}
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
                  color: "oklch(0.78 0.11 200)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "oklch(0.78 0.11 200)",
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
                  fontSize: isMobile ? 34 : 50,
                  color: "#fff",
                  textWrap: "balance",
                }}
              >
                {t("titleA")}{" "}
                <span
                  style={{
                    fontFamily:
                      "'Instrument Serif', 'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "oklch(0.78 0.11 200)",
                  }}
                >
                  {t("titleB")}
                </span>{" "}
                {t("titleC")}
              </h2>

              <p
                style={{
                  margin: "20px 0 0",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,.78)",
                  maxWidth: 460,
                }}
              >
                {t("subtitle")}
              </p>

              <div
                style={{
                  marginTop: 28,
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
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      color: "rgba(255,255,255,.9)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: "var(--ir-accent-deep)",
                        color: "#fff",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        marginTop: 1,
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
                  marginTop: 34,
                  paddingTop: 22,
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
                        marginTop: 4,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: form */}
            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <FormBlockLabel>{formCfg.profileLabel}</FormBlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 6,
                }}
              >
                {formCfg.profiles.map((p) => (
                  <ToggleChip
                    key={p.id}
                    active={form.profile === p.id}
                    onClick={() => setForm({ ...form, profile: p.id })}
                  >
                    {p.l}
                  </ToggleChip>
                ))}
              </div>

              <FormBlockLabel>{formCfg.interestLabel}</FormBlockLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 6,
                }}
              >
                {formCfg.interests.map((i) => (
                  <ToggleChip
                    key={i.id}
                    active={form.interest === i.id}
                    onClick={() => setForm({ ...form, interest: i.id })}
                  >
                    {i.l}
                  </ToggleChip>
                ))}
              </div>

              <FormInput
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder={formCfg.emailPlaceholder}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 10,
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
                  required={false}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "rgba(255,255,255,.9)",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.qa}
                  onChange={(e) => setForm({ ...form, qa: e.target.checked })}
                  style={{
                    margin: 0,
                    accentColor: "oklch(0.55 0.13 200)",
                    width: 16,
                    height: 16,
                  }}
                />
                <span>{formCfg.qaToggleLabel}</span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 12,
                  color: "rgba(255,255,255,.55)",
                  lineHeight: 1.55,
                  cursor: "pointer",
                  marginTop: 2,
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
                    accentColor: "oklch(0.55 0.13 200)",
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
                    "0 10px 28px var(--ir-accent-glow), inset 0 1px 0 rgba(255,255,255,.2)",
                  opacity: canSubmit ? 1 : 0.55,
                  transition: "opacity .2s",
                }}
              >
                {formCfg.submit}
              </button>

              <div
                style={{
                  fontSize: 11.5,
                  color: "rgba(255,255,255,.4)",
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
        background: active ? "oklch(0.4 0.12 205)" : "rgba(255,255,255,.06)",
        color: active ? "#fff" : "rgba(255,255,255,.85)",
        fontSize: 12,
        fontWeight: 600,
        textAlign: "center",
        border: active
          ? "1px solid oklch(0.4 0.12 205)"
          : "1px solid rgba(255,255,255,.1)",
        transition: "all .2s",
      }}
    >
      {children}
    </button>
  );
}

function FormInput({ value, onChange, placeholder, type = "text", required = true }) {
  return (
    <input
      required={required}
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
        width: "100%",
      }}
    />
  );
}
