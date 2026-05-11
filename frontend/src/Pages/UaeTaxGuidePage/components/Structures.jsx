"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Three-tab structure comparison. Each tab swaps the right-hand panel — keeps
// vertical real-estate tight on mobile while letting the visitor compare
// pros/cons inline.
export default function Structures() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.structures");
  const items = t.raw("items");

  const [active, setActive] = useState(items[0]?.id);
  const current = items.find((x) => x.id === active) || items[0];

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
          subtitle={t("subtitle")}
        />

        {/* Tab bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 10,
            marginBottom: isMobile ? 18 : 22,
          }}
        >
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setActive(it.id)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  padding: isMobile ? "14px 18px" : "18px 22px",
                  borderRadius: 16,
                  background: isActive ? "var(--ink)" : "var(--bg)",
                  color: isActive ? "var(--ink-inverse)" : "var(--ink)",
                  boxShadow: isActive
                    ? "0 10px 22px rgba(10,10,11,.18)"
                    : "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  transition: "all .25s",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? 15 : 17,
                    fontWeight: 700,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {it.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: isActive
                      ? "rgba(255,255,255,.65)"
                      : "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".04em",
                  }}
                >
                  {it.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          style={{
            background: "var(--bg)",
            borderRadius: 24,
            padding: isMobile ? 24 : 32,
            boxShadow: NEU_RAISED,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: isMobile ? 22 : 36,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["corp",      current.corp],
              ["ownership", current.ownership],
              ["audit",     current.audit],
              ["physical",  current.physical],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "var(--bg-2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginTop: 4,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              best for
            </div>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? 15 : 16,
                color: "var(--ink)",
                lineHeight: 1.55,
                fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {current.best}
            </p>

            <div
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              <ProConList items={current.pros} positive />
              <ProConList items={current.cons} />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

function ProConList({ items, positive }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 10,
        }}
      >
        {positive ? "advantages" : "trade-offs"}
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items.map((p) => (
          <li
            key={p}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 9,
              fontSize: 13.5,
              lineHeight: 1.5,
              color: "var(--ink-2)",
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: positive
                  ? "var(--tx-savings)"
                  : "var(--tx-warn)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <Icon
                name={positive ? "check" : "close"}
                size={10}
                strokeWidth={2.5}
              />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
