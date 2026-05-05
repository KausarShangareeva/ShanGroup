"use client";

import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

const FAQ_ITEMS = [
  {
    q: "Может ли иностранец купить недвижимость в Дубае?",
    a: "Да. С 2002 года иностранцы могут покупать недвижимость в полную собственность (freehold) в специально определённых зонах — это 90% всего нового строительства Дубая, включая Marina, Downtown, Palm Jumeirah, Creek Harbour, Business Bay.",
  },
  {
    q: "Какой минимальный бюджет для входа на рынок?",
    a: "От $145 000 — студии и компактные апартаменты в районах Dubailand и JVC. Виза резидента инвестора начинается от $205 000 (готовое жильё) + $545 000 в собственности, Golden Visa — от $2 180 000.",
  },
  {
    q: "Какие налоги платит инвестор в ОАЭ?",
    a: "0% налог на доход физических лиц, 0% налог на аренду, 0% налог на прирост капитала. Единоразовый сбор DLD при покупке — 4% от стоимости. Ежегодный service charge зависит от объекта (10–25 AED/sq.ft).",
  },
  {
    q: "Как получить Golden Visa за недвижимость?",
    a: "Golden Visa на 10 лет выдаётся при покупке недвижимости стоимостью от 2 000 000 AED (~$545 000) в собственности. Виза на 2 года — при инвестиции от 750 000 AED. Виза распространяется на супруга, детей и родителей. Не требует обязательного проживания.",
  },
  {
    q: "Что такое off-plan и какие преимущества?",
    a: "Off-plan — покупка на этапе строительства с рассрочкой 40/60 или 60/40 без процентов. Преимущества: цена на 20–35% ниже готового, рост капитала до момента сдачи 25–40%, эксклюзивные планировки. Риск минимизирован: эскроу-счета RERA защищают платежи покупателя.",
  },
  {
    q: "Как работает рассрочка от застройщика?",
    a: "Стандарт 40/60: 40% во время строительства равными траншами (5–10% каждые 6 мес), 60% в момент сдачи. Можно взять ипотеку UAE-банка под 4–6% годовых на финальный платёж. Без проверки кредитной истории за рубежом.",
  },
  {
    q: "Можно ли получить ипотеку нерезиденту?",
    a: "Да. Банки ОАЭ (Mashreq, Emirates NBD, FAB) выдают ипотеку нерезидентам до 50% от стоимости объекта, ставка 4.5–6.5%, срок до 25 лет. Требуется подтверждение дохода (в любой стране) от $5 000/мес.",
  },
  {
    q: "Какой реальный ROI и кэш-флоу?",
    a: "Средний ROI по Дубаю в 2025 — 7.2%. Лидеры: JVC и Dubailand 10–12%, Marina 8.4%, Downtown 7.2%, Palm 6.8%. Заполняемость в среднем 87–94%. К ROI добавляется ежегодный рост капитала 5–7% (рынок 2024 показал +18%).",
  },
  {
    q: "Что если застройщик не достроит?",
    a: "Все платежи покупателя поступают на эскроу-счёт RERA — застройщик не имеет к ним доступа до выполнения этапа строительства. При срыве сроков более 12 месяцев инвестор имеет право на полный возврат + неустойку. ShanGroup работает только с Tier-1 застройщиками (EMAAR, DAMAC, SOBHA, NAKHEEL, MERAAS).",
  },
  {
    q: "Как происходит сделка дистанционно?",
    a: "Документы можно подписать удалённо через нотариальную доверенность. Расчёты — банковский перевод на эскроу. Регистрация в DLD занимает 1 рабочий день. ShanGroup полностью сопровождает: открытие счёта, подбор юриста, налоговая консультация, передача ключей.",
  },
];

export default function InvestorFAQ() {
  const isMobile = useIsMobile();
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    if (document.getElementById("faq-schema")) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "faq-schema";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
    return () => {
      const el = document.getElementById("faq-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 60 : 100, paddingBottom: isMobile ? 40 : 70 }}>
        <div
          style={{
            marginBottom: isMobile ? 28 : 40,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: 24,
            alignItems: "end",
          }}
        >
          <div style={{ maxWidth: 720 }}>
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
              FAQ · 10 ответов для инвестора
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
              Закроем основные{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
                возражения
              </span>
            </h2>
          </div>
          <PrimaryButton size="md" trailingArrow>
            Задать свой вопрос
          </PrimaryButton>
        </div>

        <div style={{ borderRadius: 22, padding: isMobile ? "8px 4px" : "12px 8px", boxShadow: NEU_RAISED }}>
          {FAQ_ITEMS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                style={{
                  borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    width: "100%",
                    padding: isMobile ? "16px 14px" : "20px 22px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 14,
                    alignItems: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: open ? "var(--ink)" : "var(--bg-2)",
                      color: open ? "var(--ink-inverse)" : "var(--muted)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      flexShrink: 0,
                      transition: "all .2s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    itemProp="name"
                    style={{
                      fontSize: isMobile ? 14 : 15.5,
                      fontWeight: 600,
                      color: "var(--ink)",
                      textAlign: "left",
                      lineHeight: 1.35,
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: "var(--bg-2)",
                      color: "var(--ink-2)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      transform: open ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform .25s",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 2 V12 M2 7 H12" />
                    </svg>
                  </span>
                </button>
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  style={{
                    maxHeight: open ? 400 : 0,
                    overflow: "hidden",
                    transition: "max-height .4s cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <div
                    itemProp="text"
                    style={{
                      padding: isMobile ? "0 14px 18px 56px" : "0 70px 22px 64px",
                      fontSize: isMobile ? 13.5 : 14.5,
                      color: "var(--ink-2)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
