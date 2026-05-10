"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

const TC_ITEMS = [
  { id: "palm-jumeirah",   name: "Palm Jumeirah",           dev: "NAKHEEL",          img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=85&auto=format&fit=crop", size: "wide", roi: "+12.1%", avgPrice: "$3.2M", units: 24 },
  { id: "emaar-south",     name: "Emaar South",             dev: "EMAAR",            img: "https://images.unsplash.com/photo-1542316453-dd5b40b78fe1?w=900&q=85&auto=format&fit=crop", size: "sm",   roi: "+9.3%",  avgPrice: "$680K", units: 18 },
  { id: "jvc",             name: "Jumeirah Village Circle", dev: "NAKHEEL",          img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+8.7%",  avgPrice: "$420K", units: 41 },
  { id: "maritime-city",   name: "Maritime City",           dev: "DUBAI PROPERTIES", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+11.4%", avgPrice: "$910K", units: 16 },
  { id: "grand-polo",      name: "Grand Polo Club & Resort", dev: "EMAAR",           img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+10.2%", avgPrice: "$1.4M", units: 9 },

  { id: "creek-harbour",   name: "Dubai Creek Harbour",     dev: "EMAAR",            img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+14.2%", avgPrice: "$890K", units: 32 },
  { id: "damac-lagoons",   name: "DAMAC Lagoons",           dev: "DAMAC",            img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=85&auto=format&fit=crop", size: "sm",   roi: "+13.8%", avgPrice: "$720K", units: 27 },
  { id: "palm-jebel-ali",  name: "Palm Jebel Ali",          dev: "NAKHEEL",          img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85&auto=format&fit=crop", size: "wide", roi: "+16.5%", avgPrice: "$2.1M", units: 14 },
  { id: "the-oasis",       name: "The Oasis",               dev: "EMAAR",            img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+11.9%", avgPrice: "$1.8M", units: 11 },
  { id: "emaar-beachfront",name: "Emaar Beachfront",        dev: "EMAAR",            img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+15.1%", avgPrice: "$1.3M", units: 38 },

  { id: "damac-islands-2", name: "DAMAC Islands 2",         dev: "DAMAC",            img: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+10.8%", avgPrice: "$640K", units: 22 },
  { id: "the-heights",     name: "The Heights",             dev: "EMAAR",            img: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=900&q=85&auto=format&fit=crop", size: "sm",   roi: "+9.6%",  avgPrice: "$580K", units: 13 },
  { id: "the-valley-tc",   name: "The Valley",              dev: "EMAAR",            img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+8.4%",  avgPrice: "$510K", units: 19 },
  { id: "damac-hills-2",   name: "DAMAC Hills 2",           dev: "DAMAC",            img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85&auto=format&fit=crop", size: "md",   roi: "+9.1%",  avgPrice: "$490K", units: 25 },
];

// FILTERS теперь строятся внутри компонента — лейблы локализованы.
const FILTER_KEYS = ["all", "EMAAR", "DAMAC", "NAKHEEL"];

function TCStat({ label, value }) {
  return (
    <div>
      <div
        style={{
          fontSize: 8.5,
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: ".14em",
          color: "rgba(255,255,255,.6)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".02em",
          marginTop: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TCCard({ item, span, isMobile, isActive, onEnter, onLeave }) {
  return (
    <a
      href={`#${item.id}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        gridColumn: span.col,
        gridRow: span.row,
        position: "relative",
        borderRadius: isMobile ? 18 : 22,
        overflow: "hidden",
        textDecoration: "none",
        color: "#fff",
        background: "var(--bg-2)",
        boxShadow: isActive
          ? "-6px -6px 18px var(--shadow-light), 10px 14px 36px var(--shadow-dark), 0 24px 50px rgba(0,0,0,.18)"
          : "-4px -4px 12px var(--shadow-light), 6px 6px 18px var(--shadow-dark)",
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s",
        display: "block",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${item.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isActive ? "scale(1.08)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.78) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          background: "rgba(255,255,255,.94)",
          backdropFilter: "blur(10px)",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          color: "oklch(0.5 0.13 145)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".04em",
        }}
      >
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9 L6 5 L8 7 L11 4 M11 4 H8 M11 4 V7" />
        </svg>
        {item.roi}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: isMobile ? "12px 14px" : "14px 18px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.7)",
            marginBottom: 4,
          }}
        >
          {item.dev}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            fontWeight: 600,
            textWrap: "balance",
          }}
        >
          {item.name}
        </div>

        <div
          style={{
            marginTop: isActive ? 10 : 0,
            maxHeight: isActive ? 80 : 0,
            opacity: isActive ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height .4s cubic-bezier(.2,.7,.2,1), opacity .3s, margin-top .35s",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <TCStat label="ср. цена" value={item.avgPrice} />
          <span style={{ width: 1, height: 22, background: "rgba(255,255,255,.2)" }} />
          <TCStat label="объектов" value={item.units} />
          <span style={{ flex: 1 }} />
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 99,
              background: "rgba(255,255,255,.94)",
              display: "grid",
              placeItems: "center",
              color: "#0A0A0B",
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10 L10 4 M5 4 H10 V9" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function TrendingCommunities() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.trendingCommunities");
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");
  const FILTERS = FILTER_KEYS.map((k) => ({ v: k, l: t(`filters.${k}`) }));

  const items =
    filter === "all" ? TC_ITEMS : TC_ITEMS.filter((i) => i.dev === filter);

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 22 : 32,
            marginBottom: isMobile ? 26 : 40,
          }}
        >
          <div style={{ flex: 1, maxWidth: 720 }}>
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
              <span aria-hidden style={{ display: "inline-block", width: isMobile ? 22 : 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
              {t("kicker")}
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
              {t("titleA")}{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
                {t("titleB")}
              </span>
            </h2>
            <p
              style={{
                margin: isMobile ? "12px 0 0" : "16px 0 0",
                maxWidth: 540,
                fontSize: isMobile ? 14 : 15.5,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}
            >
              {t("subtitle")}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              alignItems: "center",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: 4,
                borderRadius: 999,
                gap: 2,
                overflowX: "auto",
                maxWidth: "100%",
                boxShadow: NEU_INSET,
              }}
            >
              {FILTERS.map((f) => {
                const isActive = filter === f.v;
                return (
                  <button
                    key={f.v}
                    onClick={() => setFilter(f.v)}
                    style={{
                      border: 0,
                      cursor: "pointer",
                      borderRadius: 999,
                      padding: "8px 16px",
                      fontFamily: "inherit",
                      fontWeight: 500,
                      fontSize: 12.5,
                      whiteSpace: "nowrap",
                      color: isActive ? "var(--bg)" : "var(--muted)",
                      background: isActive ? "var(--ink)" : "transparent",
                      boxShadow: isActive ? "0 4px 12px rgba(10,10,11,.25)" : "none",
                      transition: "all .25s",
                    }}
                  >
                    {f.l}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(12, 1fr)",
            gridAutoRows: isMobile ? "180px" : "220px",
            gap: isMobile ? 10 : 14,
          }}
        >
          {items.map((it) => {
            const span = isMobile
              ? { col: it.size === "wide" ? "1 / -1" : "auto", row: "auto" }
              : it.size === "wide"
              ? { col: "span 5", row: "span 1" }
              : it.size === "md"
              ? { col: "span 3", row: "span 1" }
              : it.size === "sm"
              ? { col: "span 2", row: "span 1" }
              : { col: "span 3", row: "span 1" };

            return (
              <TCCard
                key={it.id}
                item={it}
                span={span}
                isMobile={isMobile}
                isActive={active === it.id}
                onEnter={() => setActive(it.id)}
                onLeave={() => setActive(null)}
              />
            );
          })}

          <a
            href="#"
            style={{
              textDecoration: "none",
              gridColumn: isMobile ? "1 / -1" : "span 4",
              gridRow: "span 1",
              borderRadius: isMobile ? 18 : 22,
              background: "var(--ink)",
              color: "var(--ink-inverse)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: isMobile ? 20 : 26,
              minHeight: isMobile ? 140 : "auto",
              boxShadow:
                "0 14px 32px rgba(10,10,11,.32), 0 4px 10px rgba(10,10,11,.18), inset 0 1px 0 rgba(255,255,255,.08)",
              position: "relative",
              overflow: "hidden",
              transition: "transform .35s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              style={{ position: "absolute", top: -20, right: -20, opacity: 0.12 }}
            >
              <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" />
              <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="1" />
              <path d="M60 8 L60 112 M8 60 L112 60" stroke="currentColor" strokeWidth="1" />
              <path d="M60 20 L65 60 L60 100 L55 60 Z" fill="currentColor" />
            </svg>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}
              >
                {t("fullCatalog.kicker")}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? 28 : 36,
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  marginTop: 8,
                  fontWeight: 600,
                }}
              >
                {t("fullCatalog.title")}
              </div>
              <div style={{ fontSize: 13, opacity: 0.65, marginTop: 8, maxWidth: 220 }}>
                {t("fullCatalog.desc")}
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 16,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 99,
                  background: "rgba(255,255,255,.1)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10 L10 4 M5 4 H10 V9" />
                </svg>
              </span>
              {t("fullCatalog.cta")}
            </div>
          </a>
        </div>
      </section>
    </Container>
  );
}
