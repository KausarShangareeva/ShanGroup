"use client";

import { useState } from "react";
import { useLikes } from "@/components/LikeButton/useLikes";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  FUNNEL_PROPERTIES,
  FUNNEL_TABS,
} from "@/data/properties/funnelProperties";
import FunnelCard from "./FunnelCard";

const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function PropertyTabs() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("apt");
  const { liked, toggle } = useLikes();
  const data = FUNNEL_TABS[tab];
  const items = data.ids.map((id) => ({ id, ...FUNNEL_PROPERTIES[id] }));
  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 60 : 100, paddingBottom: isMobile ? 40 : 70 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: 24,
            alignItems: "end",
            marginBottom: isMobile ? 24 : 36,
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
              Каталог · {data.count} объектов
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
              Выберите формат{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
                под ваш сценарий
              </span>
            </h2>
            <p style={{ margin: "12px 0 0", fontSize: 13.5, color: "var(--muted)", maxWidth: 480 }}>
              Полный каталог с характеристиками. Наведите на карточку — увидите контакты вашего консультанта.
            </p>
          </div>
          <div
            style={{
              padding: 4,
              borderRadius: 999,
              display: "inline-flex",
              gap: 2,
              alignSelf: isMobile ? "flex-start" : "end",
              boxShadow: NEU_INSET,
            }}
          >
            {Object.entries(FUNNEL_TABS).map(([k, v]) => {
              const a = tab === k;
              return (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: "10px 18px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 500,
                    color: a ? "var(--bg)" : "var(--muted)",
                    background: a ? "var(--ink)" : "transparent",
                    boxShadow: a ? "0 4px 12px rgba(10,10,11,.25)" : "none",
                    transition: "all .2s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {v.label}
                  <span style={{ fontSize: 10.5, opacity: 0.65, fontFamily: "'JetBrains Mono', monospace" }}>{v.count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((it) => (
            <FunnelCard
              key={it.id}
              it={it}
              liked={liked.has(it.id)}
              onLike={() => toggle(it.id)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
