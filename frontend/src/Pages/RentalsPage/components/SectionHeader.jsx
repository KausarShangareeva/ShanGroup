"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

// Заголовок секции страницы Ready Rentals — kicker + h2 с italic-акцентом
// посередине. titleC опционален.
export default function SectionHeader({
  kicker,
  titleA,
  titleB,
  titleC,
  maxWidth = 760,
}) {
  const isMobile = useIsMobile();
  return (
    <div style={{ marginBottom: isMobile ? 28 : 44, maxWidth }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--sand-deep)",
          marginBottom: 18,
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
        {kicker}
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
        {titleA}{" "}
        <span
          style={{
            fontStyle: "italic",
            color: "var(--sand-deep)",
            fontWeight: 400,
          }}
        >
          {titleB}
        </span>
        {titleC ? ` ${titleC}` : ""}
      </h2>
    </div>
  );
}
