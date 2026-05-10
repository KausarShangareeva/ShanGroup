"use client";

// "Новинки" — горизонтальная карусель карточек объектов с hover-раскрытием
// (цена, метраж, комнаты, срок сдачи, агент, контакты).
//
// Данные и лайки общие с PropertyTabs/CompareTray/FavoritesPage:
//   - объекты живут в FUNNEL_PROPERTIES (data/properties/funnelProperties.js)
//   - порядок карточек — NEW_FEATURE_IDS оттуда же
//   - лайки идут через глобальный useLikes (ключ shan_liked_properties)
// Поэтому клик по сердечку сразу появляется в трее сравнения и на /favorites.

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLikes } from "@/components/LikeButton/useLikes";
import { useFunnel } from "@/utils/funnel";
import styles from "./NewFeatures.module.css";

function nfFmtUSD(n) {
  return "$" + n.toLocaleString("ru-RU").replace(/,/g, " ");
}

export default function NewFeatures() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.newFeatures");
  const { liked, toggle } = useLikes();
  const { FUNNEL_PROPERTIES, NEW_FEATURE_IDS } = useFunnel();
  const [scrollIdx, setScrollIdx] = useState(0);
  const trackRef = useRef(null);

  const items = NEW_FEATURE_IDS.map((id) => ({ id, ...FUNNEL_PROPERTIES[id] }));
  const likeCount = items.reduce(
    (acc, it) => acc + (liked.has(it.id) ? 1 : 0),
    0,
  );

  const gap = isMobile ? 14 : 22;
  const visible = isMobile ? 1 : 3;
  const maxIdx = Math.max(0, items.length - visible);

  // Ширина карточки адаптивная: на мобильном фиксированная (280),
  // на десктопе — ровно треть видимой ширины трека минус gap'ы.
  // Реальное значение читается из DOM через ResizeObserver, чтобы
  // scrollTo приземлял на нужную карточку при любой ширине вьюпорта.
  const [cardW, setCardW] = useState(isMobile ? 280 : 380);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const card = el.querySelector("[data-nf-card]");
      if (card) setCardW(card.getBoundingClientRect().width);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const scrollTo = (i) => {
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
    <section
      style={{
        paddingTop: isMobile ? 60 : 100,
        paddingBottom: isMobile ? 40 : 60,
      }}
    >
      <Container>
        {/* Header — асимметричный: заголовок слева, контролы справа */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 24 : 32,
            marginBottom: isMobile ? 28 : 44,
          }}
        >
          <div style={{ flex: 1, maxWidth: 720 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
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
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: isMobile ? 22 : 32,
                  height: 1,
                  background: "var(--sand-deep)",
                  opacity: 0.55,
                }}
              />
              {t("kicker")} · {String(items.length).padStart(2, "0")}
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
                margin: isMobile ? "14px 0 0" : "18px 0 0",
                maxWidth: 540,
                fontSize: isMobile ? 14 : 15.5,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}
            >
              {t("subtitle")}
              <span style={{ color: "var(--ink-2)" }}> {t("hint")}</span> {t("hintTail")}
            </p>
          </div>

          {/* Right — controls */}
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
            {/* Likes counter */}
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
                <NFIcHeart filled={likeCount > 0} size={13} />
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                }}
              >
                {likeCount}
              </span>
              <span style={{ color: "var(--muted)" }}>{t("favoritesLabel")}</span>
            </div>

            {!isMobile && (
              <div style={{ display: "inline-flex", gap: 8 }}>
                <NFArrowBtn
                  dir="prev"
                  onClick={() => scrollTo(scrollIdx - 1)}
                  disabled={scrollIdx === 0}
                />
                <NFArrowBtn
                  dir="next"
                  onClick={() => scrollTo(scrollIdx + 1)}
                  disabled={scrollIdx >= maxIdx}
                />
              </div>
            )}

            <PrimaryButton size="md" trailingArrow>
              {t("ctaCatalog")}
            </PrimaryButton>
          </div>
        </div>

        {/* Card track — внутри Container; padding создаёт пространство для теней
            (overflowX: auto иначе обрезает их со всех сторон). Margin компенсирует
            этот padding, чтобы первая карточка визуально оставалась на левом
            крае Container'а — рядом с заголовком секции. */}
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            display: "flex",
            gap,
            paddingTop: 60,
            paddingBottom: 70,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {items.map((it) => (
            <NFCard
              key={it.id}
              item={it}
              liked={liked.has(it.id)}
              onToggleLike={() => toggle(it.id)}
              isMobile={isMobile}
              cardW={cardW}
            />
          ))}
          <div style={{ flexShrink: 0, width: 1 }} />
        </div>

        {isMobile && (
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
                  background:
                    i === scrollIdx ? "var(--ink)" : "var(--line)",
                  transition: "width .25s, background .25s",
                }}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function NFArrowBtn({ dir, onClick, disabled }) {
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
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}
      >
        <path d="M3 7 H11 M7 3 L11 7 L7 11" />
      </svg>
    </button>
  );
}

// ── CARD ─────────────────────────────────────────────────────────────
// Высота карточки фиксирована (height — НЕ minHeight), не меняется при
// hover. На раскрытии фото сжимается, тело растёт за счёт flex:1.
// Размеры подобраны так, чтобы развёрнутое тело (price + name+loc + spec
// row + agent + actions) полностью помещалось без обрезки.
function NFCard({ item, liked, onToggleLike, isMobile, cardW }) {
  const t = useTranslations("HomePage.newFeatures");
  const [hover, setHover] = useState(false);
  const expanded = hover;

  const developerMark = item.dev.charAt(0);
  // Размеры синхронизированы с FunnelCard (PropertyTabs): высота 520,
  // фото 250 collapsed → 160 expanded. Тело (price + name+loc + spec
  // row + agent + 3 кнопки) помещается в expanded с запасом снизу.
  const cardH = 520;
  const imgH = expanded ? 160 : 250;

  // На мобильном фикс. ширина (1 карточка в кадре с маленьким peek справа),
  // на десктопе — ровно треть видимой ширины трека минус два gap'а: 3 карточки
  // с зазорами идеально умещаются в Container на любом разрешении.
  const flexBasis = isMobile
    ? `0 0 ${cardW}px`
    : "0 0 calc((100% - 44px) / 3)";

  return (
    <article
      data-nf-card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      style={{
        position: "relative",
        flex: flexBasis,
        height: cardH,
        borderRadius: 26,
        overflow: "hidden",
        background: "var(--bg)",
        scrollSnapAlign: "start",
        boxShadow: expanded
          ? "-10px -10px 28px var(--shadow-light), 14px 18px 44px var(--shadow-dark), 0 30px 60px rgba(0,0,0,.18)"
          : "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)",
        transform: expanded ? "translateY(-6px)" : "translateY(0)",
        transition:
          "transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        outline: "none",
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: imgH,
          transition: "height .5s cubic-bezier(.2,.7,.2,1)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: expanded ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.55) 100%)",
            opacity: expanded ? 0.6 : 1,
            transition: "opacity .4s",
          }}
        />

        {item.goldenVisa && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px 6px 8px",
              background:
                "linear-gradient(180deg, oklch(0.86 0.13 88) 0%, oklch(0.78 0.14 80) 100%)",
              borderRadius: 999,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "#3a2d10",
              boxShadow:
                "0 6px 18px rgba(180,140,40,.28), inset 0 1px 0 rgba(255,255,255,.6)",
            }}
          >
            <span
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: 18,
                height: 12,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
              }}
            >
              <svg width="18" height="12" viewBox="0 0 18 12">
                <rect x="0" y="0" width="6" height="12" fill="#ce1126" />
                <rect x="6" y="0" width="12" height="4" fill="#009a3a" />
                <rect x="6" y="4" width="12" height="4" fill="#fff" />
                <rect x="6" y="8" width="12" height="4" fill="#000" />
              </svg>
            </span>
            {t("goldenVisa")}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          aria-label={
            liked ? "Убрать из избранного" : "Добавить в избранное"
          }
          aria-pressed={liked}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 38,
            height: 38,
            borderRadius: 999,
            border: 0,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            background: liked
              ? "linear-gradient(180deg, oklch(0.66 0.21 25) 0%, oklch(0.58 0.22 25) 100%)"
              : "rgba(255,255,255,.92)",
            color: liked ? "#fff" : "#0A0A0B",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: liked
              ? "0 8px 22px rgba(220,60,60,.4), inset 0 1px 0 rgba(255,255,255,.25)"
              : "0 6px 16px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.7)",
            transform: liked ? "scale(1.06)" : "scale(1)",
            transition:
              "transform .25s cubic-bezier(.34,1.56,.64,1), background .25s, box-shadow .25s",
          }}
        >
          <NFIcHeart filled={liked} size={15} />
        </button>

        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 14px 7px 7px",
            borderRadius: 999,
            background: "rgba(10,10,11,.62)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.14)",
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: ".05em",
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase",
            maxWidth: "65%",
            // Синхронизировано с handover-бейджем справа: оба плавно
            // исчезают при hover, освобождая фото от плашек.
            opacity: expanded ? 0 : 1,
            transform: expanded ? "translateY(8px)" : "translateY(0)",
            transition: "opacity .25s, transform .25s",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 99,
              flexShrink: 0,
              background:
                "linear-gradient(135deg, oklch(0.78 0.07 80), oklch(0.65 0.08 60))",
              display: "grid",
              placeItems: "center",
              color: "#0A0A0B",
              fontWeight: 800,
              fontSize: 11,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {developerMark}
          </span>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.dev}
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            padding: "6px 12px",
            background: "rgba(255,255,255,.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            color: "#0A0A0B",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".06em",
            opacity: expanded ? 0 : 1,
            transform: expanded ? "translateY(8px)" : "translateY(0)",
            transition: "opacity .25s, transform .25s",
          }}
        >
          {item.handover}
        </div>
      </div>

      {/* Body — flex:1 заполняет освобождённое сжатием фото место */}
      <div
        style={{
          padding: isMobile ? "16px 18px 18px" : "18px 22px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                fontWeight: 500,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 4,
              }}
            >
              {t("priceFrom")}
            </div>
            <div
              style={{
                fontSize: isMobile ? 22 : 26,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                fontWeight: 700,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {nfFmtUSD(item.price)}
            </div>
          </div>

          <button
            type="button"
            aria-label="Открыть объект"
            style={{
              all: "unset",
              cursor: "pointer",
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--ink)",
              color: "var(--ink-inverse)",
              display: "grid",
              placeItems: "center",
              boxShadow:
                "0 8px 18px rgba(10,10,11,.22), inset 0 1px 0 rgba(255,255,255,.08)",
              transition: "transform .25s",
              transform: expanded ? "rotate(-45deg)" : "rotate(0)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10 L10 4 M5 4 H10 V9" />
            </svg>
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: isMobile ? 22 : 24,
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {item.name}
          </h3>
          <div
            style={{
              marginTop: 4,
              fontSize: 12.5,
              color: "var(--muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <NFIcPin size={11} />
            {item.district}
          </div>
        </div>

        {/* === SPEC ROW (always visible — synced with FunnelCard layout) === */}
        <div
          style={{
            marginTop: 14,
            borderRadius: 14,
            padding: "10px 4px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            boxShadow: "var(--neu-inset)",
            background: "var(--bg)",
          }}
        >
          <NFSpec
            icon={<NFIcArea size={13} />}
            label={t("specFrom")}
            value={`${item.sqm} м²`}
          />
          <NFSpec
            icon={<NFIcBed size={13} />}
            label={t("specRooms")}
            value={`${item.beds} BR`}
            divider
          />
          <NFSpec
            icon={<NFIcCal size={13} />}
            label={t("specHandover")}
            value={item.handover}
            divider
          />
        </div>

        {/* === EXPANDABLE: agent + actions === */}
        <div
          style={{
            marginTop: expanded ? 14 : 0,
            maxHeight: expanded ? 240 : 0,
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height .5s cubic-bezier(.2,.7,.2,1), opacity .35s ease, margin-top .4s",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 4px",
            }}
          >
            <img
              src={item.agent.avatar}
              alt={item.agent.name}
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                objectFit: "cover",
                flexShrink: 0,
                boxShadow:
                  "0 2px 8px rgba(0,0,0,.18), 0 0 0 2px var(--bg), 0 0 0 3px var(--sand)",
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.agent.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".04em",
                }}
              >
                {item.agent.phone}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
            }}
          >
            <NFActionBtn
              href={`tel:${item.agent.phone.replace(/\s/g, "")}`}
              icon={<NFIcPhone size={13} />}
              label={t("actionCall")}
              tone="dark"
            />
            <NFActionBtn
              href={`https://wa.me/${item.agent.whatsapp.replace(/\D/g, "")}`}
              icon={<NFIcWhatsApp size={14} />}
              label="WhatsApp"
              tone="green"
              target="_blank"
            />
            <NFActionBtn
              href={`mailto:${item.agent.email}`}
              icon={<NFIcMail size={13} />}
              label={t("actionMail")}
              tone="light"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function NFSpec({ icon, label, value, divider }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "4px 6px",
        borderLeft: divider ? "1px solid var(--line)" : "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 9.5,
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: ".12em",
          color: "var(--muted)",
        }}
      >
        <span style={{ color: "var(--sand-deep)" }}>{icon}</span>
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ink)",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function NFActionBtn({ href, icon, label, tone, target }) {
  const s =
    tone === "dark"
      ? {
          bg: "var(--ink)",
          fg: "var(--ink-inverse)",
          shadow:
            "0 6px 14px rgba(10,10,11,.22), inset 0 1px 0 rgba(255,255,255,.08)",
        }
      : tone === "green"
        ? {
            bg: "linear-gradient(180deg, #25d366 0%, #1aa84e 100%)",
            fg: "#fff",
            shadow:
              "0 6px 14px rgba(37,211,102,.32), inset 0 1px 0 rgba(255,255,255,.18)",
          }
        : {
            bg: "var(--bg)",
            fg: "var(--ink-2)",
            shadow:
              "-2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark)",
            border: "1px solid var(--line)",
          };
  return (
    <a
      href={href}
      target={target}
      rel={target ? "noopener" : undefined}
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: 38,
        borderRadius: 11,
        textDecoration: "none",
        background: s.bg,
        color: s.fg,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: s.shadow,
        border: s.border || "none",
        transition: "transform .15s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-1px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {icon}
      {label}
    </a>
  );
}

// ===== Icons =====
function NFIcHeart({ filled = false, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 13.5s-5-3.2-5-7A2.8 2.8 0 0 1 8 4.7 2.8 2.8 0 0 1 13 6.5c0 3.8-5 7-5 7Z" />
    </svg>
  );
}
function NFIcPin({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 14s-4.5-4-4.5-7.5a4.5 4.5 0 1 1 9 0C12.5 10 8 14 8 14Z" />
      <circle cx="8" cy="6.5" r="1.6" />
    </svg>
  );
}
function NFIcArea({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h4M3 3v4M13 13H9M13 13V9M3 13l10-10" />
    </svg>
  );
}
function NFIcBed({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12V5M2 9h12v3M14 12V8c0-.6-.4-1-1-1H8v2" />
      <circle cx="5" cy="8.5" r="1" />
    </svg>
  );
}
function NFIcCal({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
      <path d="M2.5 7h11M5.5 2v3M10.5 2v3" />
    </svg>
  );
}
function NFIcPhone({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.2C3 3.54 3.54 3 4.2 3h1.55c.5 0 .94.32 1.1.8l.62 1.86c.13.4.04.85-.25 1.16l-.93 1c.66 1.37 1.78 2.5 3.16 3.16l1-.93c.31-.29.76-.38 1.16-.25l1.86.62c.48.16.8.6.8 1.1V12.8c0 .66-.54 1.2-1.2 1.2C7.62 14 2 8.38 2 4.2 2 3.54 2.54 3 3.2 3" />
    </svg>
  );
}
function NFIcMail({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3.5" width="12" height="9" rx="1.4" />
      <path d="M2.5 4.5l5.5 4 5.5-4" />
    </svg>
  );
}
function NFIcWhatsApp({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 1.14.3 2.21.83 3.13L1.5 14.5l3.45-.81A6.46 6.46 0 0 0 8 14.5c3.59 0 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5Zm3.71 9.16c-.16.43-.92.83-1.27.86-.34.03-.66.16-2.22-.46-1.88-.74-3.05-2.7-3.14-2.83-.09-.13-.74-1-.74-1.9s.47-1.36.64-1.55c.17-.18.37-.23.49-.23h.35c.11 0 .27-.04.41.32.16.39.55 1.34.6 1.43.05.1.08.2.02.32-.06.13-.09.21-.18.32-.09.11-.19.24-.27.32-.09.09-.18.18-.08.36.1.18.46.76.99 1.23.68.61 1.26.8 1.44.89.18.09.28.07.39-.04.11-.11.45-.52.57-.7.12-.18.24-.15.41-.09.17.06 1.07.5 1.25.6.18.09.31.13.36.21.04.07.04.46-.12.89Z" />
    </svg>
  );
}
