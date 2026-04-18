"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import DEVELOPER_INFO from "@/data/developers.json";
import { devSlug } from "@/utils/devSlug";
import styles from "./DeveloperTag.module.css";

export default function DeveloperTag({ name }) {
  const dev = DEVELOPER_INFO[name];
  const href = `/developers/${devSlug(name)}`;

  return (
    <span className={styles.wrap}>
      <Link href={href} className={styles.tag}>
        {dev?.top && (
          <span className={styles.topBadge}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6.5L5 9.5L10 3"
                stroke="#3b2800"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            топ
          </span>
        )}
        <span className={styles.name}>{name}</span>
        {dev && (
          <span className={styles.infoIcon}>
            <Info size={10} strokeWidth={2.5} />
          </span>
        )}
      </Link>

      {dev && (
        <span className={styles.tooltip}>
          <span className={styles.tooltipHeader}>
            {dev.logo && (
              <img src={dev.logo} alt={name} className={styles.tooltipLogo} />
            )}
            <strong className={styles.tooltipTitle}>{name}</strong>
          </span>
          <span className={styles.tooltipText}>{dev.info}</span>
        </span>
      )}
    </span>
  );
}
