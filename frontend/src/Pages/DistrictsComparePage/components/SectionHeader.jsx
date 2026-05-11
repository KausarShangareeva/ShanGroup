"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

// Kicker + h2 with italic accent — mirrors the SectionHeader pattern from
// RoiPage but reads the page-local --dc-accent-deep so this landing keeps
// its indigo/slate hue without touching shared tokens.
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
          color: "var(--dc-accent-deep)",
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
            background: "var(--dc-accent-deep)",
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
            color: "var(--dc-accent-deep)",
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
