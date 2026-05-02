"use client";

// Districts mega-menu — 4-column "by developer + popular" layout.
// Faithful port of the artifact's `DistrictsMenu`.
//
// Desktop:
//   col 1 — first 2 dev groups (e.g. DAMAC + EMAAR)
//   col 2 — next 3 dev groups (SOBHA + NAKHEEL + MERAAS)
//   col 3 — last 2 dev groups (FUTTAIM + ARADA) + first 6 popular districts
//   col 4 — empty 32px header + remaining popular districts + CTA "Гиды по районам"
//
// Mobile: fullscreen sheet, all groups stacked, 2-col popular grid, full CTA.

import { useEffect } from "react";
import Link from "next/link";
import { IcClose } from "@/components/HeroIcons/HeroIcons";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import styles from "./DistrictsMegaMenu.module.css";

export default function DistrictsMegaMenu({
  open,
  onClose,
  isMobile,
  groups,
  popular,
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
            <div className={styles.mobileTitle}>Районы</div>
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
            {groups.map((g) => (
              <Group key={g.dev} g={g} onClose={onClose} />
            ))}
            <div className={styles.popularBlock}>
              <div className={styles.sectionLabel}>Популярные районы</div>
              <div className={styles.popularGrid}>
                {popular.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    onClick={onClose}
                    className={styles.linkRow}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
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

  // Desktop: split groups exactly like the artifact (2 / 3 / 2)
  const col1Groups = groups.slice(0, 2);
  const col2Groups = groups.slice(2, 5);
  const col3Groups = groups.slice(5, 7);
  const popularFirst = popular.slice(0, 6);
  const popularRest = popular.slice(6);

  return (
    <div
      className={styles.menu}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Container>
        <div className={styles.grid}>
          <div className={styles.col} style={{ paddingLeft: 0 }}>
            {col1Groups.map((g) => (
              <Group key={g.dev} g={g} onClose={onClose} />
            ))}
          </div>
          <div
            className={styles.col}
            style={{ borderLeft: "1px solid var(--line)" }}
          >
            {col2Groups.map((g) => (
              <Group key={g.dev} g={g} onClose={onClose} />
            ))}
          </div>
          <div
            className={styles.col}
            style={{ borderLeft: "1px solid var(--line)" }}
          >
            {col3Groups.map((g) => (
              <Group key={g.dev} g={g} onClose={onClose} />
            ))}
            <div className={styles.popularBlock}>
              <div className={styles.sectionLabel}>Популярные районы</div>
              <div className={styles.colList}>
                {popularFirst.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    onClick={onClose}
                    className={styles.linkRow}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className={styles.col}
            style={{
              paddingRight: 0,
              borderLeft: "1px solid var(--line)",
            }}
          >
            {/* Empty 32px header to align baselines with other columns */}
            <div className={styles.spacerHeader} />
            <div className={styles.colList}>
              {popularRest.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  onClick={onClose}
                  className={styles.linkRow}
                >
                  {p.label}
                </Link>
              ))}
            </div>
            {ctaLabel && (
              <div className={styles.ctaWrap}>
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
          </div>
        </div>
      </Container>
    </div>
  );
}

// ── Group ─────────────────────────────────────────────────
function Group({ g, onClose }) {
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <span className={styles.groupIcon}>{g.icon}</span>
        <span className={styles.groupLabel}>ОТ {g.dev}</span>
      </div>
      <div className={styles.colList}>
        {g.items.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            onClick={onClose}
            className={styles.linkRow}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
