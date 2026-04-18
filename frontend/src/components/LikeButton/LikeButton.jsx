"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import styles from "./LikeButton.module.css";

/**
 * LikeButton — универсальная кнопка-сердечко.
 *
 * Карточка:  <LikeButton isLiked={...} onLike={...} variant="card" />
 * Навигация: <LikeButton href="/favorites" variant="nav" />
 */
export default function LikeButton({
  isLiked,
  onLike,
  href,
  variant = "card",
  className = "",
}) {
  const baseClass =
    `${styles.btn} ${variant === "card" ? styles.card : ""} ${variant === "nav" ? styles.nav : ""} ${isLiked ? styles.active : ""} ${className}`.trim();

  const inner =
    isLiked && variant === "card" ? (
      <span className={styles.heartGradient} />
    ) : (
      <Heart fill="white" size={20} strokeWidth={2} />
    );

  if (href) {
    return (
      <Link href={href} className={baseClass} aria-label="Избранное">
        {inner}
      </Link>
    );
  }

  const handleClick = (e) => {
    e.stopPropagation();
    onLike?.();
  };

  return (
    <button
      className={baseClass}
      onClick={handleClick}
      aria-label={isLiked ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <span className={styles.label}>
        {isLiked ? "В списке объектов" : "Добавить в список"}
      </span>
      {inner}
    </button>
  );
}
