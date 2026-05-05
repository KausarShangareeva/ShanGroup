"use client";

import { useState } from "react";
import { formatPrice } from "@/data/properties/funnelProperties";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

function IcBed({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12V5M2 9h12v3M14 12V8c0-.6-.4-1-1-1H8v2" />
      <circle cx="5" cy="8.5" r="1" />
    </svg>
  );
}
function IcBath({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9h12v1.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 10.5V9Z" />
      <path d="M4 9V5a1.5 1.5 0 0 1 3 0" />
      <path d="M3.5 13l-.5 1M12.5 13l.5 1" />
    </svg>
  );
}
function IcArea({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h4M3 3v4M13 13H9M13 13V9M3 13l10-10" />
    </svg>
  );
}
function IcPin({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14s-4.5-4-4.5-7.5a4.5 4.5 0 1 1 9 0C12.5 10 8 14 8 14Z" />
      <circle cx="8" cy="6.5" r="1.6" />
    </svg>
  );
}
function IcHeart({ filled = false, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13.5s-5-3.2-5-7A2.8 2.8 0 0 1 8 4.7 2.8 2.8 0 0 1 13 6.5c0 3.8-5 7-5 7Z" />
    </svg>
  );
}
function IcPhone({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.2C3 3.54 3.54 3 4.2 3h1.55c.5 0 .94.32 1.1.8l.62 1.86c.13.4.04.85-.25 1.16l-.93 1c.66 1.37 1.78 2.5 3.16 3.16l1-.93c.31-.29.76-.38 1.16-.25l1.86.62c.48.16.8.6.8 1.1V12.8c0 .66-.54 1.2-1.2 1.2C7.62 14 2 8.38 2 4.2 2 3.54 2.54 3 3.2 3" />
    </svg>
  );
}
function IcMail({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3.5" width="12" height="9" rx="1.4" />
      <path d="M2.5 4.5l5.5 4 5.5-4" />
    </svg>
  );
}
function IcWA({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 1.14.3 2.21.83 3.13L1.5 14.5l3.45-.81A6.46 6.46 0 0 0 8 14.5c3.59 0 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5Zm3.71 9.16c-.16.43-.92.83-1.27.86-.34.03-.66.16-2.22-.46-1.88-.74-3.05-2.7-3.14-2.83-.09-.13-.74-1-.74-1.9s.47-1.36.64-1.55c.17-.18.37-.23.49-.23h.35c.11 0 .27-.04.41.32.16.39.55 1.34.6 1.43.05.1.08.2.02.32-.06.13-.09.21-.18.32-.09.11-.19.24-.27.32-.09.09-.18.18-.08.36.1.18.46.76.99 1.23.68.61 1.26.8 1.44.89.18.09.28.07.39-.04.11-.11.45-.52.57-.7.12-.18.24-.15.41-.09.17.06 1.07.5 1.25.6.18.09.31.13.36.21.04.07.04.46-.12.89Z" />
    </svg>
  );
}

function ActionBtn({ href, icon, label, tone, target }) {
  const styles =
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
        background: styles.bg,
        color: styles.fg,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: styles.shadow,
        border: styles.border || "none",
        transition: "transform .15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {icon}
      {label}
    </a>
  );
}

export default function FunnelCard({ it, liked, onLike, isMobile }) {
  const [hover, setHover] = useState(false);
  const expanded = hover;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      style={{
        position: "relative",
        minHeight: isMobile ? 440 : 500,
        borderRadius: 26,
        overflow: "hidden",
        background: "var(--bg)",
        boxShadow: expanded
          ? "-10px -10px 28px var(--shadow-light), 14px 18px 44px var(--shadow-dark), 0 30px 60px rgba(0,0,0,.18)"
          : NEU_RAISED,
        transform: expanded ? "translateY(-6px)" : "translateY(0)",
        transition: "transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        outline: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: expanded ? (isMobile ? 220 : 240) : isMobile ? 300 : 340,
          transition: "height .5s cubic-bezier(.2,.7,.2,1)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${it.img})`,
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
            opacity: expanded ? 0.55 : 1,
            transition: "opacity .4s",
          }}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          aria-label={liked ? "Убрать из избранного" : "Добавить в избранное"}
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
          <IcHeart filled={liked} />
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
            {it.dev.charAt(0)}
          </span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {it.dev}
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
            fontWeight: 700,
            color: "oklch(0.5 0.13 145)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".04em",
            opacity: expanded ? 0 : 1,
            transform: expanded ? "translateY(8px)" : "translateY(0)",
            transition: "opacity .25s, transform .25s",
          }}
        >
          ROI {it.roi}%
        </div>
      </div>

      <div
        style={{
          padding: isMobile ? "16px 18px 18px" : "18px 22px 22px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
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
              Цена от
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 22 : 26,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                fontWeight: 700,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {formatPrice(it.price)}
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            {it.name}
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
            <IcPin />
            {it.district}
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            borderRadius: 14,
            padding: "10px 4px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            boxShadow: NEU_INSET,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: "4px 6px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)" }}>
              <span style={{ color: "var(--sand-deep)" }}><IcBed /></span>
              спален
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{it.beds}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: "4px 6px", borderLeft: "1px solid var(--line)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)" }}>
              <span style={{ color: "var(--sand-deep)" }}><IcBath /></span>
              СУ
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{it.baths}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: "4px 6px", borderLeft: "1px solid var(--line)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)" }}>
              <span style={{ color: "var(--sand-deep)" }}><IcArea /></span>
              м²
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{it.sqm}</div>
          </div>
        </div>

        <div
          style={{
            marginTop: expanded ? 14 : 0,
            maxHeight: expanded ? 400 : 0,
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height .5s cubic-bezier(.2,.7,.2,1), opacity .35s ease, margin-top .4s",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 4px" }}>
            <img
              src={it.agent.avatar}
              alt={it.agent.name}
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
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {it.agent.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".04em" }}>
                {it.agent.phone}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <ActionBtn href={`tel:${it.agent.phone.replace(/\s/g, "")}`} icon={<IcPhone />} label="Звонок" tone="dark" />
            <ActionBtn href={`https://wa.me/${it.agent.whatsapp.replace(/\D/g, "")}`} icon={<IcWA />} label="WhatsApp" tone="green" target="_blank" />
            <ActionBtn href={`mailto:${it.agent.email}`} icon={<IcMail />} label="Почта" tone="light" />
          </div>
        </div>
      </div>
    </article>
  );
}
