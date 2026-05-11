"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

// Kicker line + italic-accent h2 — same editorial register every other landing
// uses. Reads page-local --tx-accent-deep so the bronze hue stays consistent.
export default function SectionHeader({
  kicker,
  titleA,
  titleB,
  titleC,
  subtitle,
  maxWidth = 760,
  align = "left",
}) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        marginBottom: isMobile ? 28 : 44,
        maxWidth,
        marginLeft: align === "center" ? "auto" : undefined,
        marginRight: align === "center" ? "auto" : undefined,
        textAlign: align,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--tx-accent-deep)",
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
            background: "var(--tx-accent-deep)",
            opacity: 0.55,
          }}
        />
        {kicker}
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: isMobile
            ? "clamp(28px, 7.6vw, 40px)"
            : "clamp(38px, 4vw, 56px)",
          lineHeight: 1.04,
          letterSpacing: "-0.012em",
          color: "var(--ink)",
          textWrap: "balance",
        }}
      >
        {titleA}{" "}
        <span
          style={{
            fontStyle: "italic",
            color: "var(--tx-accent-deep)",
            fontWeight: 400,
          }}
        >
          {titleB}
        </span>
        {titleC ? ` ${titleC}` : ""}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: "18px 0 0",
            fontSize: isMobile ? 14.5 : 16,
            lineHeight: 1.65,
            color: "var(--muted)",
            maxWidth: 680,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
