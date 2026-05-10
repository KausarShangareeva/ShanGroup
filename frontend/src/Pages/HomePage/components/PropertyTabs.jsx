"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLikes } from "@/components/LikeButton/useLikes";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useFunnel } from "@/utils/funnel";
import FunnelCard from "./FunnelCard";
import styles from "./PropertyTabs.module.css";

const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

// Маршруты каталога по табу — слаги соответствуют app/(routes)/<slug>.
const TAB_HREFS = {
  apt: "/apartments",
  villa: "/villas",
  town: "/townhouses",
};

export default function PropertyTabs() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.propertyTabs");
  const [tab, setTab] = useState("apt");
  const { liked, toggle } = useLikes();
  const { FUNNEL_PROPERTIES, FUNNEL_TABS } = useFunnel();
  const data = FUNNEL_TABS[tab];
  const items = data.ids.map((id) => ({ id, ...FUNNEL_PROPERTIES[id] }));

  // Счётчик избранного — считаем только из текущего таба, как в NewFeatures.
  const likeCount = items.reduce(
    (acc, it) => acc + (liked.has(it.id) ? 1 : 0),
    0,
  );

  // Карусель: scrollIdx + ResizeObserver на ширину карточки (тот же подход,
  // что в NewFeatures — позволяет точно приземлять scrollTo на любую ширину).
  const trackRef = useRef(null);
  const [scrollIdx, setScrollIdx] = useState(0);
  const gap = isMobile ? 14 : 18;
  const visible = isMobile ? 1 : 3;
  const maxIdx = Math.max(0, items.length - visible);
  const [cardW, setCardW] = useState(isMobile ? 280 : 380);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const card = el.querySelector("[data-pt-card]");
      if (card) setCardW(card.getBoundingClientRect().width);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile, tab]);

  // При смене таба сбрасываем скролл в начало.
  useEffect(() => {
    setScrollIdx(0);
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0;
    }
  }, [tab]);

  const scrollToIdx = (i) => {
    const clamped = Math.max(0, Math.min(maxIdx, i));
    setScrollIdx(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: clamped * (cardW + gap),
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 24 : 32,
            marginBottom: isMobile ? 24 : 36,
          }}
        >
          <div style={{ flex: 1, maxWidth: 720 }}>
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
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "var(--sand-deep)",
                  opacity: 0.55,
                }}
              />
              {t("objectsCounter", { count: data.count })}
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
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--sand-deep)",
                  fontWeight: 400,
                }}
              >
                {t("titleB")}
              </span>
            </h2>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 13.5,
                color: "var(--muted)",
                maxWidth: 480,
              }}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Right column: favorites + arrows + dynamic CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              width: isMobile ? "100%" : "auto",
              justifyContent: isMobile ? "space-between" : "flex-end",
            }}
          >
            {/* Likes counter (как в NewFeatures) */}
            <div
              style={{
                borderRadius: 999,
                padding: "10px 14px 10px 12px",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12.5,
                color: "var(--ink-2)",
                boxShadow: "var(--neu-flat)",
                background: "var(--bg)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background:
                    likeCount > 0 ? "oklch(0.92 0.05 25)" : "var(--bg-2)",
                  color:
                    likeCount > 0 ? "oklch(0.55 0.18 25)" : "var(--muted)",
                  transition: "all .25s",
                }}
              >
                <PTIcHeart filled={likeCount > 0} size={13} />
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                }}
              >
                {likeCount}
              </span>
              <span style={{ color: "var(--muted)" }}>
                {t("favoritesLabel")}
              </span>
            </div>

            {!isMobile && (
              <div style={{ display: "inline-flex", gap: 8 }}>
                <PTArrowBtn
                  dir="prev"
                  onClick={() => scrollToIdx(scrollIdx - 1)}
                  disabled={scrollIdx === 0}
                />
                <PTArrowBtn
                  dir="next"
                  onClick={() => scrollToIdx(scrollIdx + 1)}
                  disabled={scrollIdx >= maxIdx}
                />
              </div>
            )}

            <Link href={TAB_HREFS[tab]} style={{ textDecoration: "none" }}>
              <PrimaryButton size="md" trailingArrow>
                {t(`ctaCatalog.${tab}`)}
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* ── Tab bar (segmented control) ── */}
        <div
          style={{
            padding: 4,
            borderRadius: 999,
            display: "inline-flex",
            gap: 2,
            marginBottom: isMobile ? 20 : 28,
            boxShadow: NEU_INSET,
          }}
        >
          {Object.entries(FUNNEL_TABS).map(([k, v]) => {
            const active = tab === k;
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
                  color: active ? "var(--bg)" : "var(--muted)",
                  background: active ? "var(--ink)" : "transparent",
                  boxShadow: active ? "0 4px 12px rgba(10,10,11,.25)" : "none",
                  transition: "all .2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {t(`tabs.${k}`)}
                <span
                  style={{
                    fontSize: 10.5,
                    opacity: 0.65,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {v.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Card track ── (тот же контракт, что в NewFeatures) */}
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            display: "flex",
            gap,
            paddingTop: 60,
            paddingBottom: 70,
            paddingLeft: isMobile ? 16 : 24,
            paddingRight: isMobile ? 16 : 24,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
          }}
        >
          {items.map((it) => (
            <div
              key={it.id}
              data-pt-card
              style={{
                flex: isMobile
                  ? `0 0 ${cardW}px`
                  : "0 0 calc((100% - 36px) / 3)",
                scrollSnapAlign: "start",
              }}
            >
              <FunnelCard
                it={it}
                liked={liked.has(it.id)}
                onLike={() => toggle(it.id)}
                isMobile={isMobile}
              />
            </div>
          ))}
          <div style={{ flexShrink: 0, width: 1 }} />
        </div>

        {/* Mobile dots */}
        {isMobile && items.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginTop: 14,
            }}
          >
            {items.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === scrollIdx ? 18 : 6,
                  height: 6,
                  borderRadius: 99,
                  background: i === scrollIdx ? "var(--ink)" : "var(--line)",
                  transition: "width .25s, background .25s",
                }}
              />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

// ── Локальные компоненты ─────────────────────────────────────
function PTArrowBtn({ dir, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Предыдущие" : "Следующие"}
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        border: 0,
        cursor: disabled ? "default" : "pointer",
        display: "grid",
        placeItems: "center",
        color: disabled ? "var(--muted-2)" : "var(--ink)",
        opacity: disabled ? 0.5 : 1,
        background: "var(--bg)",
        boxShadow: disabled ? "var(--neu-flat)" : "var(--neu-raised-sm)",
        transition: "all .2s",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}
      >
        <path d="M3 7 H11 M7 3 L11 7 L7 11" />
      </svg>
    </button>
  );
}

function PTIcHeart({ filled = false, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 13.5s-5-3.2-5-7A2.8 2.8 0 0 1 8 4.7 2.8 2.8 0 0 1 13 6.5c0 3.8-5 7-5 7Z" />
    </svg>
  );
}
