"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

const IM_STEPS = [
  {
    id: "goal",
    label: "Цель инвестиции",
    sub: "Что для вас важнее всего сейчас?",
    type: "cards",
    options: [
      { v: "live", title: "Жить самому",     sub: "Дом для жизни в Дубае",       emoji: "home" },
      { v: "rent", title: "Сдавать в аренду", sub: "Стабильный кэш-флоу 7–9%",    emoji: "key" },
      { v: "flip", title: "Перепродать",      sub: "Off-plan → готовое +30%",     emoji: "flip" },
      { v: "visa", title: "Golden Visa",      sub: "ВНЖ для семьи на 10 лет",     emoji: "visa" },
    ],
  },
  {
    id: "budget",
    label: "Бюджет",
    sub: "В долларах США (USD)",
    type: "slider",
    min: 150_000,
    max: 5_000_000,
    step: 50_000,
    default: 800_000,
  },
  {
    id: "type",
    label: "Тип недвижимости",
    sub: "Можно выбрать несколько",
    type: "chips-multi",
    options: ["Апартаменты", "Виллы", "Пентхаусы", "Таунхаусы", "Студии"],
  },
  {
    id: "horizon",
    label: "Горизонт инвестиции",
    sub: "Как долго планируете держать актив?",
    type: "cards",
    options: [
      { v: "1-2",  title: "1–2 года",  sub: "Перепродажа off-plan", emoji: "flash" },
      { v: "3-5",  title: "3–5 лет",   sub: "Рост капитала",         emoji: "grow" },
      { v: "5-10", title: "5–10 лет",  sub: "Кэш-флоу + рост",       emoji: "calendar" },
      { v: "10+",  title: "10+ лет",   sub: "Семейный актив",        emoji: "anchor" },
    ],
  },
  {
    id: "country",
    label: "Гражданство",
    sub: "Поможем учесть налоговые соглашения",
    type: "chips-single",
    options: ["Россия", "Казахстан", "Беларусь", "Узбекистан", "Украина", "ОАЭ", "Другое"],
  },
  {
    id: "contact",
    label: "Куда отправить подборку?",
    sub: "Только email и телефон. Никакого спама.",
    type: "contact",
  },
];

function fmtUsd(n) {
  return "$" + n.toLocaleString("ru-RU").replace(/,/g, " ");
}

function IMEmoji({ kind }) {
  const s = {
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (kind === "home")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <path d="M3 8 L9 3 L15 8 V14 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" />
        <path d="M7 15 V11 H11 V15" />
      </svg>
    );
  if (kind === "key")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <circle cx="6" cy="9" r="3.2" />
        <path d="M9 9 H16 M14 9 V12 M16 9 V11" />
      </svg>
    );
  if (kind === "flip")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <path d="M3 6 H13 L11 4 M15 12 H5 L7 14" />
      </svg>
    );
  if (kind === "visa")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <path d="M9 2 L11 7 L16 7 L12 10 L13.5 15 L9 12 L4.5 15 L6 10 L2 7 L7 7 Z" />
      </svg>
    );
  if (kind === "flash")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <path d="M10 2 L4 10 H8 L7 16 L14 8 H10 Z" />
      </svg>
    );
  if (kind === "grow")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <path d="M3 14 L7 9 L10 11 L15 5 M15 5 H11 M15 5 V9" />
      </svg>
    );
  if (kind === "calendar")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <rect x="3" y="4" width="12" height="11" rx="1.5" />
        <path d="M3 8 H15 M6 2 V5 M12 2 V5" />
      </svg>
    );
  if (kind === "anchor")
    return (
      <svg {...s} viewBox="0 0 18 18">
        <circle cx="9" cy="5" r="1.5" />
        <path d="M9 6.5 V15 M5 11 a4 4 0 0 0 8 0 M9 8 H7 M9 8 H11" />
      </svg>
    );
  return null;
}

function CardOptions({ options, value, onChange, isMobile }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        gap: isMobile ? 10 : 12,
      }}
    >
      {options.map((o) => {
        const a = value === o.v;
        return (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            style={{
              all: "unset",
              cursor: "pointer",
              borderRadius: 18,
              padding: isMobile ? "16px 14px" : "18px 16px",
              background: a ? "var(--ink)" : "var(--bg)",
              color: a ? "var(--ink-inverse)" : "var(--ink)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "flex-start",
              textAlign: "left",
              minHeight: isMobile ? 110 : 130,
              boxShadow: a
                ? "0 12px 26px rgba(10,10,11,.32), inset 0 1px 0 rgba(255,255,255,.08)"
                : "-3px -3px 8px var(--shadow-light), 4px 4px 12px var(--shadow-dark)",
              transition: "all .25s cubic-bezier(.2,.7,.2,1)",
              transform: a ? "translateY(-2px)" : "translateY(0)",
            }}
            onMouseEnter={(e) =>
              !a && (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              !a && (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: a ? "rgba(255,255,255,.1)" : "var(--bg-2)",
                display: "grid",
                placeItems: "center",
                color: a ? "oklch(0.85 0.10 80)" : "var(--sand-deep)",
              }}
            >
              <IMEmoji kind={o.emoji} />
            </div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.005em" }}>
                {o.title}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  opacity: a ? 0.65 : 0.6,
                  marginTop: 2,
                  lineHeight: 1.35,
                }}
              >
                {o.sub}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function BudgetSlider({ min, max, step, value, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  const ranges = [
    { from: 150_000, to: 500_000,    l: "Студии · 1BR JVC, Dubailand" },
    { from: 500_000, to: 1_500_000,  l: "1–2BR Marina, Creek Harbour" },
    { from: 1_500_000, to: 3_000_000, l: "3BR · виллы Tilal, Oasis" },
    { from: 3_000_000, to: 5_000_000, l: "Пентхаусы · Palm, Downtown" },
  ];
  const matched = ranges.find((r) => value >= r.from && value <= r.to) || ranges[0];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 6vw, 48px)",
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {fmtUsd(value)}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
          USD
        </div>
      </div>

      <div style={{ position: "relative", padding: "16px 0 8px" }}>
        <div
          style={{
            height: 6,
            borderRadius: 99,
            background: "var(--bg-2)",
            boxShadow:
              "inset 1px 1px 3px var(--shadow-dark), inset -1px -1px 3px var(--shadow-light)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              right: "auto",
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, var(--sand) 0%, var(--sand-deep) 100%)",
              borderRadius: 99,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
            padding: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 13px)`,
            top: 9,
            width: 26,
            height: 26,
            borderRadius: 99,
            background: "var(--ink)",
            boxShadow:
              "0 6px 14px rgba(10,10,11,.3), inset 0 1px 0 rgba(255,255,255,.12)",
            pointerEvents: "none",
            display: "grid",
            placeItems: "center",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--sand)" }} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
          marginTop: 10,
        }}
      >
        <span>{fmtUsd(min)}</span>
        <span>{fmtUsd(max)}+</span>
      </div>

      <div
        style={{
          marginTop: 18,
          padding: "14px 16px",
          borderRadius: 14,
          background: "var(--bg-2)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "var(--bg)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            color: "var(--sand-deep)",
            boxShadow: "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="5.5" />
            <path d="M7 4 V7 L9 8.5" />
          </svg>
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 10.5,
              color: "var(--muted)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            В этом диапазоне
          </div>
          <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, marginTop: 2 }}>
            {matched.l}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChipMulti({ options, value, onChange }) {
  const toggle = (o) => {
    if (value.includes(o)) onChange(value.filter((x) => x !== o));
    else onChange([...value, o]);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {options.map((o) => {
        const a = value.includes(o);
        return (
          <button
            key={o}
            onClick={() => toggle(o)}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "12px 20px",
              borderRadius: 999,
              background: a ? "var(--ink)" : "var(--bg)",
              color: a ? "var(--ink-inverse)" : "var(--ink-2)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: a
                ? "0 8px 18px rgba(10,10,11,.28)"
                : "-2px -2px 6px var(--shadow-light), 3px 3px 8px var(--shadow-dark)",
              transition: "all .2s",
            }}
          >
            {a && (
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7 L6 10 L11 4" />
              </svg>
            )}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ChipSingle({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {options.map((o) => {
        const a = value === o;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "12px 20px",
              borderRadius: 999,
              background: a ? "var(--ink)" : "var(--bg)",
              color: a ? "var(--ink-inverse)" : "var(--ink-2)",
              fontSize: 14,
              fontWeight: 500,
              boxShadow: a
                ? "0 8px 18px rgba(10,10,11,.28)"
                : "-2px -2px 6px var(--shadow-light), 3px 3px 8px var(--shadow-dark)",
              transition: "all .2s",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function IMField({ label, icon, ...rest }) {
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
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          borderRadius: 14,
          height: 52,
          boxShadow: NEU_INSET,
        }}
      >
        <span style={{ color: "var(--muted)", flexShrink: 0 }}>{icon}</span>
        <input
          {...rest}
          style={{
            flex: 1,
            minWidth: 0,
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

function ContactStep({ email, phone, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <IMField
        label="Email"
        type="email"
        placeholder="ivan@gmail.com"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        icon={
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3.5" width="12" height="9" rx="1.4" />
            <path d="M2.5 4.5l5.5 4 5.5-4" />
          </svg>
        }
      />
      <IMField
        label="Телефон / WhatsApp"
        type="tel"
        placeholder="+7 999 123-45-67"
        value={phone}
        onChange={(e) => onChange("phone", e.target.value)}
        icon={
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4.2C3 3.54 3.54 3 4.2 3h1.55c.5 0 .94.32 1.1.8l.62 1.86c.13.4.04.85-.25 1.16l-.93 1c.66 1.37 1.78 2.5 3.16 3.16l1-.93c.31-.29.76-.38 1.16-.25l1.86.62c.48.16.8.6.8 1.1V12.8c0 .66-.54 1.2-1.2 1.2C7.62 14 2 8.38 2 4.2 2 3.54 2.54 3 3.2 3" />
          </svg>
        }
      />
      <div
        style={{
          marginTop: 6,
          fontSize: 11.5,
          color: "var(--muted)",
          lineHeight: 1.5,
        }}
      >
        Нажимая «Получить подборку», вы&nbsp;соглашаетесь с&nbsp;политикой конфиденциальности. Мы&nbsp;не&nbsp;передаём данные третьим лицам и&nbsp;не&nbsp;шлём спам.
      </div>
    </div>
  );
}

const SUCCESS_MATCHES = [
  {
    name: "Tranquil Beach Residences",
    dev: "SOBHA",
    price: "$382,100",
    roi: "11.4%",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
  },
  {
    name: "Marina Vista",
    dev: "EMAAR",
    price: "$412,000",
    roi: "12.8%",
    img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80",
  },
  {
    name: "Karl Lagerfeld Beach",
    dev: "RAK",
    price: "$762,400",
    roi: "15.1%",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  },
];

function SuccessScreen({ answers, onReset, isMobile }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 16,
        }}
      >
        <span
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background:
              "linear-gradient(180deg, oklch(0.65 0.16 145) 0%, oklch(0.5 0.16 145) 100%)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            boxShadow: "0 10px 22px oklch(0.55 0.16 145 / .35)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 11 L9 15 L17 7" />
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 24 : 30,
              letterSpacing: "-0.022em",
              color: "var(--ink)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Подборка готова!
          </div>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>
            Отправили на{" "}
            <strong style={{ color: "var(--ink-2)" }}>{answers.email}</strong> · старший консультант свяжется в&nbsp;ближайшие 15&nbsp;мин
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            color: "var(--muted)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Топ-3 объекта под ваш профиль
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          {SUCCESS_MATCHES.map((m, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                padding: 12,
                display: "flex",
                gap: 12,
                alignItems: "center",
                boxShadow: NEU_FLAT,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  flexShrink: 0,
                  backgroundImage: `url(${m.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: 9.5,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                  }}
                >
                  {m.dev}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginTop: 2,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 4,
                    fontSize: 11.5,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                    {m.price}
                  </span>
                  <span style={{ color: "oklch(0.5 0.13 145)", fontWeight: 600 }}>
                    ROI {m.roi}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 10,
          marginTop: 4,
        }}
      >
        <PrimaryButton
          size="md"
          trailingArrow
          style={{ flex: 1, justifyContent: "center" }}
        >
          Открыть полную подборку
        </PrimaryButton>
        <button
          onClick={onReset}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "12px 20px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--muted)",
            textAlign: "center",
            border: "1px solid var(--line)",
          }}
        >
          Пройти заново
        </button>
      </div>
    </div>
  );
}

function InvestorMatchInner({ isMobile }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = IM_STEPS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const cur = IM_STEPS[step];

  const setA = (k, v) => setAnswers((p) => ({ ...p, [k]: v }));

  const canNext = () => {
    const a = answers[cur.id];
    if (cur.type === "contact")
      return (
        answers.email?.match(/.+@.+\..+/) && answers.phone?.length > 5
      );
    if (cur.type === "chips-multi") return Array.isArray(a) && a.length > 0;
    if (cur.type === "slider") return true;
    return !!a;
  };

  const next = () => {
    if (!canNext()) return;
    if (isLast) {
      setSubmitted(true);
      return;
    }
    setStep((s) => s + 1);
  };
  const prev = () => {
    if (!isFirst) setStep((s) => s - 1);
  };
  const reset = () => {
    setStep(0);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section
      style={{
        paddingTop: isMobile ? 60 : 100,
        paddingBottom: isMobile ? 40 : 70,
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 760,
          margin: "0 auto",
          marginBottom: isMobile ? 28 : 44,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? 10.5 : 11.5,
            fontWeight: 500,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--sand-deep)",
            marginBottom: isMobile ? 14 : 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
          Investor Match · 60 секунд
          <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: isMobile
              ? "clamp(30px, 8vw, 40px)"
              : "clamp(42px, 4.4vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.012em",
            color: "var(--ink)",
            textWrap: "balance",
          }}
        >
          Найдём идеальный объект{" "}
          <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
            под ваши цели
          </span>
        </h2>
        <p
          style={{
            margin: isMobile ? "12px auto 0" : "16px auto 0",
            maxWidth: 540,
            fontSize: isMobile ? 14 : 15.5,
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          6 быстрых вопросов — и&nbsp;вы&nbsp;получите 3 персональные подборки от&nbsp;старшего консультанта с&nbsp;расчётом ROI, налогов и&nbsp;Golden&nbsp;Visa.
        </p>
      </div>

      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          borderRadius: 28,
          padding: isMobile ? "22px 20px 26px" : "32px 36px 36px",
          position: "relative",
          minHeight: isMobile ? 480 : 520,
          display: "flex",
          flexDirection: "column",
          boxShadow: NEU_RAISED,
        }}
      >
        {!submitted ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: isMobile ? 18 : 26,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 99,
                  background: "var(--bg-2)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow:
                    "inset 1px 1px 3px var(--shadow-dark), inset -1px -1px 3px var(--shadow-light)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    right: "auto",
                    width: `${((step + 1) / total) * 100}%`,
                    background:
                      "linear-gradient(90deg, var(--sand) 0%, var(--sand-deep) 100%)",
                    borderRadius: 99,
                    transition: "width .5s cubic-bezier(.2,.7,.2,1)",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  whiteSpace: "nowrap",
                }}
              >
                ~{Math.max(10, 60 - step * 10)} сек
              </div>
            </div>

            <div style={{ marginBottom: isMobile ? 18 : 24 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? "clamp(22px, 6vw, 28px)" : 32,
                  lineHeight: 1.1,
                  letterSpacing: "-0.022em",
                  color: "var(--ink)",
                  fontWeight: 700,
                }}
              >
                {cur.label}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>
                {cur.sub}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              {cur.type === "cards" && (
                <CardOptions
                  options={cur.options}
                  value={answers[cur.id]}
                  onChange={(v) => setA(cur.id, v)}
                  isMobile={isMobile}
                />
              )}
              {cur.type === "slider" && (
                <BudgetSlider
                  min={cur.min}
                  max={cur.max}
                  step={cur.step}
                  value={answers[cur.id] ?? cur.default}
                  onChange={(v) => setA(cur.id, v)}
                />
              )}
              {cur.type === "chips-multi" && (
                <ChipMulti
                  options={cur.options}
                  value={answers[cur.id] || []}
                  onChange={(v) => setA(cur.id, v)}
                />
              )}
              {cur.type === "chips-single" && (
                <ChipSingle
                  options={cur.options}
                  value={answers[cur.id]}
                  onChange={(v) => setA(cur.id, v)}
                />
              )}
              {cur.type === "contact" && (
                <ContactStep
                  email={answers.email || ""}
                  phone={answers.phone || ""}
                  onChange={(k, v) => setA(k, v)}
                />
              )}
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={prev}
                disabled={isFirst}
                style={{
                  all: "unset",
                  cursor: isFirst ? "default" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isFirst ? "var(--muted-2)" : "var(--ink-2)",
                  opacity: isFirst ? 0.5 : 1,
                  transition: "color .2s",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 7 H3 M7 3 L3 7 L7 11" />
                </svg>
                Назад
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".06em",
                    display: isMobile ? "none" : "inline",
                  }}
                >
                  Enter ↵ для продолжения
                </span>
                <PrimaryButton
                  size="md"
                  onClick={next}
                  trailingArrow
                  style={{
                    opacity: canNext() ? 1 : 0.45,
                    pointerEvents: canNext() ? "auto" : "none",
                  }}
                >
                  {isLast ? "Получить подборку" : "Далее"}
                </PrimaryButton>
              </div>
            </div>
          </>
        ) : (
          <SuccessScreen answers={answers} onReset={reset} isMobile={isMobile} />
        )}
      </div>

      <div
        style={{
          maxWidth: 920,
          margin: "20px auto 0",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 8 : 12,
        }}
      >
        {[
          { v: "2,140+", l: "клиентов" },
          { v: "$2.4B", l: "сделок" },
          { v: "RERA #2087", l: "лицензия" },
          { v: "60 сек", l: "среднее время" },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              borderRadius: 14,
              padding: "12px 14px",
              textAlign: "center",
              boxShadow: NEU_FLAT,
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontWeight: 700,
              }}
            >
              {s.v}
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--muted)",
                marginTop: 3,
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function InvestorMatch() {
  const isMobile = useIsMobile();
  return (
    <Container>
      <InvestorMatchInner isMobile={isMobile} />
    </Container>
  );
}
