"use client";

// 4-column category mega-menu — used for the Developers nav item.
// Faithful port of the artifact's `DevelopersMenu`.
//
// Each category column has:
//   • neu-flat icon circle (26×26) + JetBrains Mono UPPERCASE title with bottom-border
//   • description paragraph (12.5px muted, max 230px desktop, no max mobile)
//   • flat list of link-rows (just labels, no per-item icons)
// Desktop: 4 columns side-by-side, footer CTA right-aligned ("sm" variant)
// Mobile: fullscreen sheet, columns stacked vertically, full-width CTA

import { useEffect } from "react";
import Link from "next/link";
import { IcClose } from "@/components/HeroIcons/HeroIcons";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import styles from "./CategoryMegaMenu.module.css";

// ── Hand-drawn category icons ───────────────────────────────
const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
};

function CatIcon({ kind, size = 13 }) {
  switch (kind) {
    case "shield":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE}>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE}>
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20M9 3l-2 6 5 12M15 3l2 6-5 12" />
        </svg>
      );
    case "trend":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "spark":
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
        </svg>
      );
  }
}

// ── Component ───────────────────────────────────────────────
export default function CategoryMegaMenu({
  open,
  onClose,
  isMobile,
  label,
  categories,
  ctaLabel,
  ctaHref,
  onMouseEnter,
  onMouseLeave,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = isMobile ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, isMobile, onClose]);

  if (!open) return null;

  if (isMobile) {
    return (
      <>
        <div onClick={onClose} className={styles.mobileBackdrop} />
        <div className={styles.mobileSheet}>
          <div className={styles.mobileHeader}>
            <div className={styles.mobileTitle}>{label}</div>
            <button
              type="button"
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Закрыть"
            >
              <IcClose size={14} />
            </button>
          </div>
          <div className={styles.mobileBody}>
            {categories.map((c) => (
              <Column key={c.key} c={c} mobile onClose={onClose} />
            ))}
            {ctaLabel && (
              <PrimaryButton
                size="md"
                fullWidth
                trailingArrow
                href={ctaHref || "#"}
                onClick={onClose}
              >
                {ctaLabel}
              </PrimaryButton>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={styles.menu}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Container>
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}
        >
          {categories.map((c, i) => (
            <div
              key={c.key}
              className={styles.col}
              style={{
                borderLeft: i === 0 ? "none" : "1px solid var(--line)",
              }}
            >
              <Column c={c} onClose={onClose} />
            </div>
          ))}
        </div>
        {ctaLabel && (
          <div className={styles.ctaRow}>
            <PrimaryButton
              size="sm"
              trailingArrow
              href={ctaHref || "#"}
              onClick={onClose}
            >
              {ctaLabel}
            </PrimaryButton>
          </div>
        )}
      </Container>
    </div>
  );
}

// ── Column ──────────────────────────────────────────────────
function Column({ c, mobile, onClose }) {
  return (
    <div className={styles.colInner}>
      <div className={styles.header}>
        <span className={styles.iconCircle}>
          <CatIcon kind={c.icon} size={13} />
        </span>
        <span className={styles.title}>{c.title}</span>
      </div>
      <p className={`${styles.desc} ${mobile ? styles.descMobile : ""}`}>
        {c.desc}
      </p>
      <div className={styles.list}>
        {c.items.map((it) => (
          <Link
            key={it.label || it}
            href={it.href || "#"}
            onClick={onClose}
            className={styles.linkRow}
          >
            {it.label || it}
          </Link>
        ))}
      </div>
    </div>
  );
}
