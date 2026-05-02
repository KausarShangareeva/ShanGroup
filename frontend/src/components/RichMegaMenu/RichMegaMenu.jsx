"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IcClose } from "@/components/HeroIcons/HeroIcons";
import Container from "@/components/layout/Container";
import MMIcon from "./MMIcon";
import styles from "./RichMegaMenu.module.css";

// Reusable rich menu — N columns of icon-backed rows.
// Mirrors the artifact's `buildRichMenu` factory.
//
// Props:
//   open      — boolean, whether the menu is visible
//   onClose   — () => void
//   isMobile  — boolean, switches to fullscreen drawer
//   label     — title shown only in mobile drawer header
//   columns   — [{ title, items: [{ label, sub, icon, href }] }]

export default function RichMegaMenu({
  open,
  onClose,
  isMobile,
  label,
  columns,
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
            {columns.map((c) => (
              <ColumnBlock key={c.title} title={c.title} items={c.items} onClose={onClose} />
            ))}
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
          style={{
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          }}
        >
          {columns.map((c, i) => (
            <div
              key={c.title}
              className={styles.col}
              style={{
                borderLeft: i === 0 ? "none" : "1px solid var(--line)",
              }}
            >
              <ColumnBlock title={c.title} items={c.items} onClose={onClose} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function ColumnBlock({ title, items, onClose }) {
  return (
    <div className={styles.colInner}>
      <div className={styles.colTitle}>{title}</div>
      <div className={styles.colList}>
        {items.map((it) => (
          <MMRow key={it.label} item={it} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

function MMRow({ item, onClose }) {
  const Tag = item.href ? Link : "button";
  const tagProps = item.href
    ? { href: item.href, onClick: onClose }
    : { type: "button", onClick: onClose };
  return (
    <Tag {...tagProps} className={styles.row}>
      <span className={styles.rowIcon}>
        <MMIcon kind={item.icon} size={15} />
      </span>
      <span className={styles.rowText}>
        <span className={styles.rowLabel}>{item.label}</span>
        {item.sub && <span className={styles.rowSub}>{item.sub}</span>}
      </span>
    </Tag>
  );
}
