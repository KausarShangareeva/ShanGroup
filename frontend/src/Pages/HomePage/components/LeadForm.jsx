"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const LINE_STRONG = "oklch(0.78 0.005 75)";

const INTERESTS = [
  { id: "buy", label: "Купить недвижимость", desc: "Под жильё или сдачу" },
  { id: "invest", label: "Инвестировать в off-plan", desc: "Рассрочка от застройщика" },
  { id: "visa", label: "Получить Golden Visa", desc: "ВНЖ на 10 лет" },
  { id: "consult", label: "Получить консультацию", desc: "Без обязательств" },
];

export default function LeadForm() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(["buy"]);
  const [budget, setBudget] = useState(1_000_000);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  const fmt = (n) =>
    n >= 1_000_000
      ? "$" + (n / 1_000_000).toFixed(2) + "M"
      : "$" + Math.round(n / 1000) + "K";
  const canSubmit = name && phone && selected.length;

  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 60 : 100, paddingBottom: isMobile ? 60 : 100 }}>
        <div
          style={{
            borderRadius: 30,
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg, oklch(0.96 0.018 80) 0%, oklch(0.92 0.025 78) 100%)",
            padding: isMobile ? "36px 24px" : "60px 64px",
            boxShadow: NEU_RAISED,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -120,
              right: -120,
              width: 420,
              height: 420,
              borderRadius: 999,
              background:
                "radial-gradient(circle, oklch(0.86 0.13 88 / .25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {submitted ? (
            <div style={{ textAlign: "center", padding: isMobile ? "30px 0" : "60px 0", position: "relative" }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 999,
                  background: "oklch(0.55 0.16 145)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 22px",
                }}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12 L10 17 L19 7" />
                </svg>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: isMobile ? 28 : 36,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                Заявка принята
              </h3>
              <p style={{ margin: "12px auto 0", maxWidth: 420, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
                {name || "Спасибо"}, мы свяжемся с вами в течение 15 минут на номер {phone || "указанный вами"}.
              </p>
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
                gap: isMobile ? 32 : 56,
                alignItems: "start",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    fontWeight: 500,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "var(--sand-deep)",
                    marginBottom: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
                  Бесплатная консультация
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: isMobile
                      ? "clamp(30px, 8vw, 40px)"
                      : "clamp(40px, 4.2vw, 56px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.012em",
                    color: "var(--ink)",
                    textWrap: "balance",
                  }}
                >
                  Подберём 3 объекта{" "}
                  <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
                    под ваш запрос
                  </span>
                </h2>
                <p style={{ margin: "20px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 440 }}>
                  Расскажите, что вас интересует — и наш консультант перезвонит в течение 15 минут с подборкой под ваш бюджет и цели.
                </p>

                <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { v: "15 мин", l: "среднее время ответа" },
                    { v: "0₽", l: "консультация без обязательств" },
                    { v: "RU/EN/AR", l: "русскоязычный менеджер" },
                  ].map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          background: "oklch(0.55 0.16 145 / .15)",
                          color: "oklch(0.5 0.16 145)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 7 L6 10 L11 4" />
                        </svg>
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--ink)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {b.v}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>· {b.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg)",
                  borderRadius: 22,
                  padding: isMobile ? 22 : 30,
                  boxShadow: NEU_FLAT,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    color: "var(--muted)",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Что вас интересует?
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 8,
                    marginBottom: 22,
                  }}
                >
                  {INTERESTS.map((it) => {
                    const a = selected.includes(it.id);
                    return (
                      <button
                        key={it.id}
                        onClick={() => toggle(it.id)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          padding: "12px 14px",
                          borderRadius: 14,
                          border: a ? "1.5px solid var(--ink)" : "1.5px solid var(--line)",
                          background: a ? "rgba(10,10,11,.04)" : "transparent",
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          gap: 10,
                          alignItems: "center",
                          transition: "all .18s",
                        }}
                      >
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 5,
                            border: a ? "none" : `1.5px solid ${LINE_STRONG}`,
                            background: a ? "var(--ink)" : "transparent",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            transition: "all .18s",
                          }}
                        >
                          {a && (
                            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 7 L6 10 L11 4" />
                            </svg>
                          )}
                        </span>
                        <span>
                          <span
                            style={{
                              display: "block",
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: "var(--ink)",
                              letterSpacing: "-0.005em",
                            }}
                          >
                            {it.label}
                          </span>
                          <span style={{ display: "block", fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
                            {it.desc}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    color: "var(--muted)",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Бюджет</span>
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>до {fmt(budget)}</span>
                </div>
                <input
                  type="range"
                  min={150_000}
                  max={10_000_000}
                  step={50_000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0A0A0B", marginBottom: 22 }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    style={{
                      all: "unset",
                      padding: "14px 16px",
                      border: "1.5px solid var(--line)",
                      borderRadius: 12,
                      fontSize: 14,
                      background: "var(--bg-2)",
                      color: "var(--ink)",
                      fontFamily: "inherit",
                    }}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 / +971"
                    style={{
                      all: "unset",
                      padding: "14px 16px",
                      border: "1.5px solid var(--line)",
                      borderRadius: 12,
                      fontSize: 14,
                      background: "var(--bg-2)",
                      color: "var(--ink)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  />
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!canSubmit}
                  style={{
                    all: "unset",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    width: "100%",
                    boxSizing: "border-box",
                    textAlign: "center",
                    padding: "0 24px",
                    height: 56,
                    borderRadius: 999,
                    background: canSubmit ? "var(--ink)" : "var(--bg-2)",
                    color: canSubmit ? "var(--bg)" : "var(--muted)",
                    fontSize: 15,
                    fontWeight: 600,
                    transition: "all .18s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  Получить подборку за 15 минут
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7 H11 M7 3 L11 7 L7 11" />
                  </svg>
                </button>

                <div style={{ marginTop: 12, fontSize: 11, color: "var(--muted)", textAlign: "center", lineHeight: 1.5 }}>
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="#" style={{ color: "var(--ink-2)", textDecoration: "underline" }}>
                    политикой обработки данных
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
