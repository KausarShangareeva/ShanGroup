"use client";

import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      className={styles.btn}
      aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      <span
        className={styles.iconWrap}
        style={{ transform: isDark ? "rotate(-30deg)" : "rotate(0)" }}
      >
        {isDark ? (
          <Sun size={16} strokeWidth={1.6} />
        ) : (
          <Moon size={16} strokeWidth={1.6} />
        )}
      </span>
    </button>
  );
}
