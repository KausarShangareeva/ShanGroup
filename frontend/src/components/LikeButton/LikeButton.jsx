"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import styles from "./LikeButton.module.css";

export default function LikeButton({
  isLiked: isLikedProp = false,
  onLike,
  href,
  variant = "card",
  className = "",
}) {
  const [localLiked, setLocalLiked] = useState(isLikedProp);
  const liked = onLike ? isLikedProp : localLiked;

  const baseClass =
    `${styles.btn} ${variant === "card" ? styles.card : ""} ${variant === "nav" ? styles.nav : ""} ${liked ? styles.active : ""} ${className}`.trim();

  const inner =
    liked && variant === "card" ? (
      <span className={styles.heartGradient} />
    ) : (
      <Heart fill="none" size={20} strokeWidth={2} />
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
    if (onLike) {
      onLike();
    } else {
      setLocalLiked((v) => !v);
    }
  };

  return (
    <button
      className={baseClass}
      onClick={handleClick}
      aria-label={liked ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <span className={styles.label}>
        {liked ? "В списке объектов" : "Добавить в список"}
      </span>
      {inner}
    </button>
  );
}
