"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import { buildDistricts, fmtK } from "./data";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Quiz answers map to a slice + sort key over the district list. Filter is
// generous (drops down to "all" when no rows survive) so the visitor always
// sees three picks even at extreme combos.
function pickTopThree(rows, ans) {
  let pool = [...rows];
  if (ans.budget === "entry") pool = pool.filter((d) => d.price1br <= 400);
  else if (ans.budget === "mid")
    pool = pool.filter((d) => d.price1br >= 300 && d.price1br <= 800);
  else if (ans.budget === "upper") pool = pool.filter((d) => d.price1br <= 1500);
  if (!pool.length) pool = [...rows];

  if (ans.priority === "cashflow") pool.sort((a, b) => b.netYield - a.netYield);
  else if (ans.priority === "capital") pool.sort((a, b) => b.growth - a.growth);
  else if (ans.priority === "visa") pool.sort((a, b) => b.growth - a.growth);
  else pool.sort((a, b) => b.score - a.score);

  return pool.slice(0, 3);
}

export default function ProfileQuiz() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage");
  const intro = t.raw("quiz.intro");
  const results = t.raw("quiz.results");
  const QS = t.raw("quiz.questions");
  const districtsCopy = t.raw("districts");

  const rows = useMemo(() => buildDistricts(districtsCopy), [districtsCopy]);

  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});

  const onPick = (id, value) => {
    setAns((p) => ({ ...p, [id]: value }));
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAns({});
    setStep(0);
  };

  if (step === 0) {
    return (
      <Container>
        <section
          style={{
            paddingTop: isMobile ? 50 : 90,
            paddingBottom: isMobile ? 30 : 60,
          }}
        >
          <div
            style={{
              borderRadius: isMobile ? 24 : 32,
              overflow: "hidden",
              position: "relative",
              background: "var(--surface-warm)",
              padding: isMobile ? "36px 24px" : "56px 64px",
              boxShadow: NEU_RAISED,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 260,
                height: 260,
                borderRadius: 999,
                background:
                  "radial-gradient(circle, var(--dc-accent-glow) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                fontWeight: 500,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--dc-accent-deep)",
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "var(--dc-accent-deep)",
                  opacity: 0.55,
                }}
              />
              {t("quiz.kicker")}
            </div>
            <h2
              style={{
                margin: 0,
                color: "var(--ink)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile
                  ? "clamp(26px, 7vw, 36px)"
                  : "clamp(34px, 3.6vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.012em",
              }}
            >
              {intro.titleA}{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--dc-accent-deep)",
                  fontWeight: 400,
                }}
              >
                {intro.titleB}
              </span>
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                maxWidth: 520,
                fontSize: isMobile ? 14.5 : 16.5,
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {intro.subtitle}
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                all: "unset",
                cursor: "pointer",
                boxSizing: "border-box",
                marginTop: isMobile ? 22 : 28,
                padding: "14px 28px",
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--ink-inverse)",
                fontSize: 14.5,
                fontWeight: 600,
                boxShadow: "0 8px 18px rgba(10,10,11,.22)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {intro.cta}
              <Icon name="arrow" size={15} strokeWidth={2.5} />
            </button>
          </div>
        </section>
      </Container>
    );
  }

  if (step >= 1 && step <= QS.length) {
    const q = QS[step - 1];
    return (
      <Container>
        <section
          style={{
            paddingTop: isMobile ? 50 : 90,
            paddingBottom: isMobile ? 30 : 60,
          }}
        >
          <div
            style={{
              background: "var(--bg)",
              borderRadius: isMobile ? 24 : 32,
              padding: isMobile ? "28px 20px" : "48px 56px",
              boxShadow: NEU_RAISED,
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 30 }}>
              {QS.map((_, n) => (
                <div
                  key={n}
                  style={{
                    height: 4,
                    borderRadius: 999,
                    flex: 1,
                    background:
                      n < step ? "var(--dc-accent-deep)" : "var(--line)",
                    transition: "background .3s",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--dc-accent-deep)",
                marginBottom: 12,
              }}
            >
              {t("quiz.progress", { step })}
            </div>
            <h3
              style={{
                margin: "0 0 28px",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile ? 26 : 38,
                color: "var(--ink)",
                lineHeight: 1.1,
              }}
            >
              {q.q}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr 1fr"
                  : `repeat(${q.opts.length}, 1fr)`,
                gap: 10,
              }}
            >
              {q.opts.map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => onPick(q.id, o.v)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    padding: isMobile ? "14px 12px" : "18px 16px",
                    borderRadius: 16,
                    textAlign: "center",
                    background: "var(--bg)",
                    border: "1px solid transparent",
                    boxShadow:
                      "-3px -3px 8px var(--shadow-light), 3px 3px 10px var(--shadow-dark)",
                    transition: "all .18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--dc-accent-deep)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? 14 : 15,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 5,
                    }}
                  >
                    {o.l}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {o.s}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </Container>
    );
  }

  const top3 = pickTopThree(rows, ans);
  const labels = results.labels;

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 24 : 32,
            padding: isMobile ? "28px 20px" : "48px 56px",
            boxShadow: NEU_RAISED,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--dc-accent-deep)",
              marginBottom: 10,
            }}
          >
            {results.kicker}
          </div>
          <h3
            style={{
              margin: "0 0 8px",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: isMobile ? 26 : 38,
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            {results.titleA}{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--dc-accent-deep)",
                fontWeight: 400,
              }}
            >
              {results.titleB}
            </span>
          </h3>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: "var(--muted)" }}>
            {results.subtitle}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {top3.map((d, i) => {
              const isHero = i === 0;
              return (
                <div
                  key={d.id}
                  style={{
                    padding: isMobile ? 20 : 24,
                    borderRadius: 18,
                    position: "relative",
                    background: isHero ? "var(--ink)" : "var(--bg-2)",
                    color: isHero ? "var(--ink-inverse)" : "var(--ink)",
                  }}
                >
                  {isHero && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 999,
                        background: "var(--dc-accent-deep)",
                        color: "#fff",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {results.topBadge}
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: isHero ? 22 : 18,
                      marginBottom: 4,
                      lineHeight: 1.2,
                    }}
                  >
                    {d.full}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 14,
                      opacity: isHero ? 0.65 : 1,
                      color: isHero ? undefined : "var(--muted)",
                    }}
                  >
                    {results.score.replace("{value}", String(d.score))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {[
                      [labels.netYield, `${d.netYield}%`],
                      [labels.growth, `+${d.growth}%`],
                      [labels.roi5y, `+${d.roi5y.toFixed(0)}%`],
                      [labels.entry, fmtK(d.price1br)],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 13,
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            opacity: isHero ? 0.7 : 1,
                            color: isHero ? undefined : "var(--muted)",
                          }}
                        >
                          {k}
                        </span>
                        <span
                          style={{
                            fontWeight: 700,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 22,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#lead"
              style={{
                all: "unset",
                cursor: "pointer",
                boxSizing: "border-box",
                padding: "13px 22px",
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--ink-inverse)",
                fontSize: 13.5,
                fontWeight: 600,
                boxShadow: "0 6px 14px rgba(10,10,11,.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {results.ctaPrimary}
              <Icon name="arrow" size={13} strokeWidth={2.5} />
            </a>
            <button
              type="button"
              onClick={reset}
              style={{
                all: "unset",
                cursor: "pointer",
                boxSizing: "border-box",
                padding: "13px 20px",
                borderRadius: 999,
                background: "var(--bg)",
                color: "var(--ink)",
                fontSize: 13.5,
                fontWeight: 500,
                boxShadow:
                  "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
              }}
            >
              {results.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
}
