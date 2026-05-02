"use client";

// Unified Primary Button — faithful port of the artifact's `PrimaryButton`.
//
// • 3 sizes (sm / md / lg) with locked dimensions
// • 2 variants (dark / light) — deep ink with white text, or paper with ink text
// • Optional leading icon in a tinted circle
// • Optional trailing ↗ corner arrow
// • `fullWidth` for w:100% with center justify
// • Renders <Link> if `href` provided, otherwise <button>

import { isValidElement, cloneElement } from "react";
import Link from "next/link";
import styles from "./PrimaryButton.module.css";

// Locked size table — matches the artifact's lookup exactly
const SIZE_TABLE = {
  sm: { iconSize: 12, iconCircle: 28 },
  md: { iconSize: 14, iconCircle: 36 },
  lg: { iconSize: 16, iconCircle: 42 },
};

export default function PrimaryButton({
  children,
  icon, // leading icon node (small)
  trailingArrow = false,
  size = "md", // 'sm' | 'md' | 'lg'
  variant = "dark", // 'dark' | 'light'
  fullWidth = false,
  href,
  onClick,
  type = "button",
  className = "",
  style,
  ...rest
}) {
  const s = SIZE_TABLE[size] || SIZE_TABLE.md;
  const Tag = href ? Link : "button";
  const tagProps = href
    ? { href, onClick }
    : { type, onClick };

  const classes = [
    styles.btn,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    fullWidth && styles.full,
    !icon && styles.noIcon,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag {...tagProps} className={classes} style={style} {...rest}>
      {icon && (
        <span
          aria-hidden="true"
          className={styles.iconCircle}
          style={{ width: s.iconCircle, height: s.iconCircle }}
        >
          {isValidElement(icon)
            ? cloneElement(icon, { size: icon.props.size || s.iconSize })
            : icon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {trailingArrow && (
        <span aria-hidden="true" className={styles.trailingArrow}>
          {/* corner arrow ↗ */}
          <svg
            width={s.iconSize}
            height={s.iconSize}
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10 L10 4 M5 4 H10 V9" />
          </svg>
        </span>
      )}
    </Tag>
  );
}
