"use client";

import { getIconComponent } from "@/components/Icon/Icon";
import styles from "./Button.module.css";

const icons = {
  arrow: getIconComponent("arrow-up-right"),
  plus: getIconComponent("plus"),
  phone: getIconComponent("phone"),
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
  const IconCmp = icons[icon];

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
      {IconCmp && (
        <span className={styles.dot}>
          <IconCmp size={20} strokeWidth={1.6} />
        </span>
      )}
    </Tag>
  );
}
