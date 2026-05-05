"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

const BULLETS = [
  "3–5 эксклюзивных объектов в неделю",
  "Аналитика рынка и Q-отчёты от ShanGroup Research",
  "Прямой чат с консультантом · ответ 15 мин",
  "Нет спама — только реальные сделки",
];

const PREVIEW_MSGS = [
  { tag: "🔥 NEW", title: "Bvlgari Lighthouse", price: "$6.4M", roi: "+ ROI 6.8%" },
  { tag: "Q4 2027", title: "Marina Vista by EMAAR", price: "$412K", roi: "60/40 plan" },
  { tag: "📊 ANALYTICS", title: "Q3 Market Report", price: "+18.4%", roi: "PDF · 24 стр" },
];

export default function TelegramChannel() {
  const isMobile = useIsMobile();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 60 : 100, paddingBottom: isMobile ? 40 : 70 }}>
        <div
          style={{
            borderRadius: 30,
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg, oklch(0.20 0.04 240) 0%, oklch(0.12 0.03 240) 100%)",
            color: "#fff",
            padding: isMobile ? "32px 22px" : "48px 56px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: isMobile ? 28 : 40,
            alignItems: "center",
            boxShadow: NEU_RAISED,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 380,
              height: 380,
              borderRadius: 999,
              background:
                "radial-gradient(circle, oklch(0.65 0.18 240 / .35) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px 6px 8px",
                borderRadius: 999,
                background: "oklch(0.65 0.18 240 / .15)",
                border: "1px solid oklch(0.65 0.18 240 / .3)",
                fontSize: 11.5,
                fontWeight: 500,
                color: "oklch(0.85 0.10 240)",
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 99,
                  background: "oklch(0.7 0.18 240)",
                }}
              />
              Закрытый канал · 1 248 инвесторов
            </div>

            <h2
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile
                  ? "clamp(28px, 7.5vw, 38px)"
                  : "clamp(38px, 4vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.012em",
                textWrap: "balance",
              }}
            >
              Off-plan{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.78 0.14 240)" }}>
                до публичного запуска
              </span>
            </h2>
            <p
              style={{
                margin: "14px 0 0",
                maxWidth: 460,
                fontSize: isMobile ? 14 : 15,
                lineHeight: 1.55,
                color: "rgba(255,255,255,.7)",
              }}
            >
              Эксклюзивные предложения от Tier-1 застройщиков за 2–4 недели до релиза. Цены от прайса, лучшие планировки, гибкие условия рассрочки.
            </p>

            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {BULLETS.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      background: "oklch(0.65 0.18 240)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7 L6 10 L11 4" />
                    </svg>
                  </span>
                  <span style={{ color: "rgba(255,255,255,.85)" }}>{b}</span>
                </div>
              ))}
            </div>

            <a
              href="https://t.me/shangroup_invest"
              target="_blank"
              rel="noopener"
              onClick={() => setSubscribed(true)}
              style={{
                marginTop: 26,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "0 26px 0 8px",
                height: 56,
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, oklch(0.72 0.18 240) 0%, oklch(0.58 0.20 240) 100%)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                boxShadow:
                  "0 14px 30px oklch(0.55 0.20 240 / .5), inset 0 1px 0 rgba(255,255,255,.2)",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.15)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="#fff">
                  <path d="M14.6 2.2 1.7 7.1c-.9.3-.9.8-.2 1l3.3 1 1.3 4c.2.4.3.6.6.6.4 0 .5-.2.7-.4l1.6-1.5 3.3 2.4c.6.3 1 .2 1.2-.6L15.3 3c.2-1-.2-1.4-.7-.8Zm-3 3.4-6.2 5.6-.2 2.6L4 9.4l7.6-4.7c.3-.2.6 0 .4.2Z" />
                </svg>
              </span>
              {subscribed ? "Открываем Telegram…" : "Подписаться на канал"}
              <span aria-hidden style={{ display: "inline-grid", placeItems: "center", marginLeft: -2 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10 L10 4 M5 4 H10 V9" />
                </svg>
              </span>
            </a>

            <div
              style={{
                marginTop: 14,
                fontSize: 11.5,
                color: "rgba(255,255,255,.45)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".06em",
              }}
            >
              @shangroup_invest · бесплатно · отписаться в 1 клик
            </div>
          </div>

          <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
            <div
              style={{
                width: isMobile ? 240 : 280,
                aspectRatio: "9 / 18",
                borderRadius: 36,
                padding: 8,
                background:
                  "linear-gradient(135deg, oklch(0.30 0.02 240) 0%, oklch(0.18 0.02 240) 100%)",
                boxShadow:
                  "0 30px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.15), inset 0 -1px 0 rgba(0,0,0,.5)",
                transform: "rotate(-3deg)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 28,
                  background: "oklch(0.16 0.02 240)",
                  overflow: "hidden",
                  position: "relative",
                  padding: "28px 14px 14px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 60,
                    height: 4,
                    borderRadius: 99,
                    background: "rgba(0,0,0,.6)",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 4px 10px",
                    borderBottom: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 99,
                      background:
                        "linear-gradient(180deg, oklch(0.86 0.13 88) 0%, oklch(0.64 0.13 60) 100%)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#3a2d10",
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    S
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: "#fff",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      ShanGroup · Off-plan
                    </div>
                    <div style={{ fontSize: 9, color: "oklch(0.7 0.05 240)" }}>
                      1 248 подписчиков
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                  {PREVIEW_MSGS.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,.06)",
                        borderRadius: 10,
                        padding: "8px 10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 8.5,
                          color: "oklch(0.78 0.14 240)",
                          fontWeight: 600,
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {m.tag}
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: "#fff",
                          marginTop: 2,
                          lineHeight: 1.2,
                        }}
                      >
                        {m.title}
                      </div>
                      <div
                        style={{
                          fontSize: 9.5,
                          color: "rgba(255,255,255,.6)",
                          marginTop: 3,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {m.price} · {m.roi}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: -10,
                right: isMobile ? 0 : -20,
                background: "#fff",
                color: "#0A0A0B",
                borderRadius: 14,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: "rotate(2deg)",
                boxShadow: NEU_FLAT + ", 0 10px 24px rgba(0,0,0,.3)",
              }}
            >
              <div style={{ display: "flex" }}>
                {["#e8b4a0", "#a0c4e8", "#b4a0e8", "#a0e8b4"].map((c, i) => (
                  <span
                    key={i}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 99,
                      background: c,
                      marginLeft: i ? -7 : 0,
                      border: "2px solid #fff",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#0A0A0B", lineHeight: 1 }}>
                  +47 за неделю
                </div>
                <div style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 2 }}>
                  новых подписчиков
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
