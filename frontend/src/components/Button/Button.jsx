"use client";

import { ArrowUpRight, Plus, Phone } from "lucide-react";
import styles from "./Button.module.css";

const icons = {
  arrow: ArrowUpRight,
  plus: Plus,
  phone: Phone,
};

export default function Button({
  label,
  onClick,
  href,
  icon = "arrow",
  type = "button",
  invert = false,
  disabled = false,
  border,
}) {
  const Tag = href ? "a" : "button";
  const Icon = icons[icon];

  const borderStyle =
    border === false
      ? { border: "none" }
      : border
        ? { border: `1px solid ${border}` }
        : {};

  return (
    <Tag
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      disabled={href ? undefined : disabled}
      className={`${styles.btn} ${invert ? styles.light : styles.dark}`}
      style={borderStyle}
    >
      <span className={styles.label}>{label}</span>
      {Icon && (
        <span className={styles.dot}>
          <Icon size={20} strokeWidth={1.8} />
        </span>
      )}
    </Tag>
  );
}
