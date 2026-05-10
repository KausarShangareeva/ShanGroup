"use client";

import { useState } from "react";
import Link from "next/link";
import { IcHeart } from "@/components/HeroIcons/HeroIcons";
import styles from "./LikeButton.module.css";

import Icon from "@/components/Icon/Icon";
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

  // Nav variant uses the editorial 1.5px hand-drawn IcHeart;
  // card variant keeps the chunkier lucide Heart for the photo overlay.
  const inner =
    liked && variant === "card" ? (
      <span className={styles.heartGradient} />
    ) : variant === "nav" ? (
      <IcHeart size={15} />
    ) : (
      <Icon name="heart" fill="none" size={20}  />
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
