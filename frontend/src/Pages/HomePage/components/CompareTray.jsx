"use client";

import { useState, useEffect } from "react";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useLikes } from "@/components/LikeButton/useLikes";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  useFunnel,
  formatPrice,
  visaTier,
} from "@/utils/funnel";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

function pluralObjects(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "объектов";
  if (mod10 === 1) return "объект";
  if (mod10 >= 2 && mod10 <= 4) return "объекта";
  return "объектов";
}

function CTField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          fontSize: 11,
          color: "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          height: 48,
          borderRadius: 12,
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          boxShadow: NEU_INSET,
        }}
      >
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            height: "100%",
            border: 0,
            outline: 0,
            background: "transparent",
            fontFamily: "inherit",
            fontSize: 15,
            color: "var(--ink)",
          }}
        />
      </div>
    </label>
  );
}

function CompareModal({ ids, onClose, onRemove, isMobile }) {
  const [step, setStep] = useState("compare");
  const [contact, setContact] = useState({ name: "", phone: "" });
  const { FUNNEL_PROPERTIES } = useFunnel();
  const items = ids.map((id) => ({ id, ...FUNNEL_PROPERTIES[id] })).filter((it) => it.name);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const best = items.length
    ? {
        price: Math.min(...items.map((i) => i.price)),
        roi: Math.max(...items.map((i) => i.roi)),
        occupancy: Math.max(...items.map((i) => i.occupancy)),
        sqm: Math.max(...items.map((i) => i.sqm)),
      }
    : {};

  const rows = [
    { label: "Цена от",       key: "price",       fmt: formatPrice,        best: best.price,     bestKind: "min" },
    { label: "Метраж от",     key: "sqm",         fmt: (v) => v + " м²",   best: best.sqm,       bestKind: "max" },
    { label: "Конфигурация",  key: "beds",        fmt: (v) => v + " BR" },
    { label: "Сдача",         key: "handover",    fmt: (v) => v },
    { label: "ROI прогноз",   key: "roi",         fmt: (v) => v + "%",     best: best.roi,       bestKind: "max", green: true },
    { label: "Заполняемость", key: "occupancy",   fmt: (v) => v + "%",     best: best.occupancy, bestKind: "max" },
    { label: "Рассрочка",     key: "paymentPlan", fmt: (v) => v },
    {
      label: "Golden Visa",
      key: "price",
      fmt: (v) => {
        const tier = visaTier(v);
        return tier === "10y" ? "10 лет" : tier === "2y" ? "2 года" : "—";
      },
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(10,10,11,.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid",
        placeItems: isMobile ? "stretch" : "center",
        padding: isMobile ? 0 : 30,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "var(--bg)",
          borderRadius: isMobile ? 0 : 26,
          width: "100%",
          maxWidth: 1180,
          maxHeight: isMobile ? "100%" : "92vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: NEU_RAISED,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            background: "var(--bg)",
            padding: isMobile ? "16px 16px 12px" : "22px 28px 18px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--sand-deep)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Сравнение объектов
            </div>
            <div
              style={{
                fontSize: isMobile ? 22 : 28,
                fontWeight: 700,
                letterSpacing: "-0.022em",
                color: "var(--ink)",
                marginTop: 2,
                lineHeight: 1.1,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {items.length} {pluralObjects(items.length)} side&#8209;by&#8209;side
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              color: "var(--ink)",
              flexShrink: 0,
              background: "var(--bg)",
              boxShadow: NEU_RAISED_SM,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3.5 3.5 L10.5 10.5 M10.5 3.5 L3.5 10.5" />
            </svg>
          </button>
        </div>

        {step === "compare" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${items.length}, minmax(${isMobile ? "240px" : "260px"}, 1fr))`,
                gap: isMobile ? 10 : 14,
                padding: isMobile ? "16px" : "22px 28px 8px",
                overflowX: "auto",
              }}
            >
              {items.map((it) => (
                <div
                  key={it.id}
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: NEU_FLAT,
                  }}
                >
                  <div
                    style={{
                      height: 130,
                      position: "relative",
                      backgroundImage: `url(${it.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <button
                      onClick={() => onRemove(it.id)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: "rgba(0,0,0,.7)",
                        color: "#fff",
                        display: "grid",
                        placeItems: "center",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M3.5 3.5 L10.5 10.5 M10.5 3.5 L3.5 10.5" />
                      </svg>
                    </button>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div
                      style={{
                        fontSize: 9.5,
                        color: "var(--muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {it.dev}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginTop: 3,
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                        textWrap: "balance",
                      }}
                    >
                      {it.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
                      {it.district}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: isMobile ? "0 12px 16px" : "8px 28px 22px" }}>
              {rows.map((row, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `${isMobile ? "120px" : "180px"} repeat(${items.length}, minmax(${isMobile ? "120px" : "1fr"}, 1fr))`,
                    gap: isMobile ? 10 : 14,
                    padding: "12px 6px",
                    borderBottom: "1px solid var(--line)",
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {row.label}
                  </div>
                  {items.map((it) => {
                    const v = it[row.key];
                    const isWinner =
                      row.best != null && v === row.best && items.length > 1;
                    return (
                      <div
                        key={it.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: isMobile ? 16 : 18,
                          fontWeight: 600,
                          letterSpacing: "-0.015em",
                          color: isWinner
                            ? row.green
                              ? "oklch(0.5 0.13 145)"
                              : "var(--ink)"
                            : "var(--ink-2)",
                        }}
                      >
                        {row.fmt(v)}
                        {isWinner && (
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 999,
                              background: row.green
                                ? "oklch(0.55 0.13 145)"
                                : "oklch(0.78 0.14 80)",
                              color: "#fff",
                              display: "grid",
                              placeItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 7 L6 10 L11 4" />
                            </svg>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              style={{
                position: "sticky",
                bottom: 0,
                background: "var(--bg)",
                borderTop: "1px solid var(--line)",
                padding: isMobile ? "14px 16px" : "18px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: 12.5, color: "var(--muted)", maxWidth: 380, lineHeight: 1.5 }}>
                Получите детальный сравнительный анализ от старшего консультанта — финансовая модель, налоги, риски.
              </div>
              <PrimaryButton size="md" trailingArrow onClick={() => setStep("lead")}>
                Запросить расчёт по выбранным
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "lead" && (
          <div style={{ padding: isMobile ? "20px 18px" : "28px 32px", maxWidth: 520 }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.022em",
                lineHeight: 1.15,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Подготовим персональный анализ за&nbsp;15&nbsp;минут
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
              Получите детальный side-by-side с расчётом 5-летней доходности по {items.length} объектам.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              <CTField
                label="Имя"
                value={contact.name}
                onChange={(v) => setContact((c) => ({ ...c, name: v }))}
              />
              <CTField
                label="Телефон / WhatsApp"
                value={contact.phone}
                type="tel"
                placeholder="+7 999 123-45-67"
                onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
              />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "flex-end" }}>
              <button
                onClick={() => setStep("compare")}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "12px 18px",
                  borderRadius: 999,
                  fontSize: 13,
                  color: "var(--muted)",
                }}
              >
                Назад
              </button>
              <PrimaryButton
                size="md"
                trailingArrow
                onClick={() =>
                  contact.name && contact.phone.length > 5 && setStep("sent")
                }
                style={{ opacity: contact.name && contact.phone.length > 5 ? 1 : 0.45 }}
              >
                Отправить
              </PrimaryButton>
            </div>
          </div>
        )}

        {step === "sent" && (
          <div
            style={{
              padding: isMobile ? "30px 24px 40px" : "50px 32px 60px",
              textAlign: "center",
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            <span
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, oklch(0.65 0.16 145) 0%, oklch(0.5 0.16 145) 100%)",
                color: "#fff",
                display: "inline-grid",
                placeItems: "center",
                boxShadow: "0 12px 26px oklch(0.55 0.16 145 / .35)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 11 L9 15 L17 7" />
              </svg>
            </span>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.022em",
                marginTop: 18,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Заявка принята
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 8, lineHeight: 1.55 }}>
              Старший консультант свяжется с&nbsp;
              <strong style={{ color: "var(--ink-2)" }}>{contact.name}</strong>
              &nbsp;в&nbsp;течение 15&nbsp;минут с&nbsp;готовым сравнительным анализом.
            </div>
            <button
              onClick={onClose}
              style={{
                all: "unset",
                cursor: "pointer",
                marginTop: 24,
                padding: "12px 24px",
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--ink-inverse)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompareTray() {
  const isMobile = useIsMobile();
  const { liked, toggle } = useLikes();
  const { FUNNEL_PROPERTIES } = useFunnel();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const ids = Array.from(liked).filter((id) => FUNNEL_PROPERTIES[id]);
  if (ids.length === 0) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          padding: isMobile ? "10px 12px 14px" : "14px 24px 18px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            pointerEvents: "auto",
            background: "var(--ink)",
            color: "var(--ink-inverse)",
            borderRadius: collapsed ? 999 : 22,
            padding: collapsed
              ? "10px 14px 10px 18px"
              : isMobile
              ? "12px 12px 12px 16px"
              : "14px 14px 14px 22px",
            boxShadow:
              "0 18px 40px rgba(10,10,11,.42), 0 4px 12px rgba(10,10,11,.22), inset 0 1px 0 rgba(255,255,255,.06)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            transition: "all .35s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, oklch(0.66 0.21 25) 0%, oklch(0.58 0.22 25) 100%)",
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 4px 12px rgba(220,60,60,.4), inset 0 1px 0 rgba(255,255,255,.25)",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="#fff" stroke="#fff" strokeWidth="1.2">
                <path d="M8 13.5s-5-3.2-5-7A2.8 2.8 0 0 1 8 4.7 2.8 2.8 0 0 1 13 6.5c0 3.8-5 7-5 7Z" />
              </svg>
            </span>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 10.5,
                  opacity: 0.55,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                В избранном
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 1 }}>
                {ids.length} {pluralObjects(ids.length)}
              </div>
            </div>
          </div>

          {!collapsed && (
            <>
              {!isMobile && (
                <div style={{ display: "flex", gap: 6, flex: 1, minWidth: 0, overflow: "hidden" }}>
                  {ids.slice(0, 4).map((id) => {
                    const o = FUNNEL_PROPERTIES[id];
                    return (
                      <div
                        key={id}
                        style={{
                          position: "relative",
                          width: 50,
                          height: 50,
                          borderRadius: 11,
                          backgroundImage: `url(${o.img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          flexShrink: 0,
                          boxShadow:
                            "0 2px 6px rgba(0,0,0,.3), inset 0 0 0 1px rgba(255,255,255,.08)",
                        }}
                      >
                        <button
                          onClick={() => toggle(id)}
                          aria-label="Убрать"
                          style={{
                            all: "unset",
                            cursor: "pointer",
                            position: "absolute",
                            top: -5,
                            right: -5,
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            background: "var(--bg)",
                            color: "var(--ink)",
                            display: "grid",
                            placeItems: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,.3)",
                            opacity: 0,
                            transition: "opacity .2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          <svg width="9" height="9" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M3.5 3.5 L10.5 10.5 M10.5 3.5 L3.5 10.5" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                  {ids.length > 4 && (
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 11,
                        background: "rgba(255,255,255,.08)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      +{ids.length - 4}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setOpen(true)}
                disabled={ids.length < 2}
                style={{
                  all: "unset",
                  cursor: ids.length < 2 ? "default" : "pointer",
                  height: 42,
                  padding: "0 18px 0 16px",
                  borderRadius: 999,
                  background:
                    ids.length >= 2
                      ? "linear-gradient(180deg, oklch(0.86 0.13 88) 0%, oklch(0.74 0.14 78) 100%)"
                      : "rgba(255,255,255,.08)",
                  color: ids.length >= 2 ? "#3a2d10" : "rgba(255,255,255,.4)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "-0.005em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow:
                    ids.length >= 2
                      ? "0 8px 18px oklch(0.74 0.14 78 / .35), inset 0 1px 0 rgba(255,255,255,.5)"
                      : "none",
                  transition: "all .2s",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="5" height="10" rx="1" />
                  <rect x="9" y="3" width="5" height="10" rx="1" />
                </svg>
                Сравнить {ids.length >= 2 ? `(${ids.length})` : ""}
              </button>

              <button
                onClick={() => setCollapsed(true)}
                aria-label="Свернуть"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  width: 32,
                  height: 32,
                  borderRadius: 99,
                  background: "rgba(255,255,255,.06)",
                  color: "rgba(255,255,255,.7)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3.5 3.5 L10.5 10.5 M10.5 3.5 L3.5 10.5" />
                </svg>
              </button>
            </>
          )}

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                color: "oklch(0.85 0.13 80)",
              }}
            >
              Развернуть ↑
            </button>
          )}
        </div>
      </div>

      {open && (
        <CompareModal
          ids={ids}
          onClose={() => setOpen(false)}
          onRemove={toggle}
          isMobile={isMobile}
        />
      )}
    </>
  );
}
