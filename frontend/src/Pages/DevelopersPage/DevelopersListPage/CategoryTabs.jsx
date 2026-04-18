"use client";

import { useState } from "react";
import Link from "next/link";
import { Landmark, Crown, TrendingUp, Gem, LayoutGrid } from "lucide-react";
import Container from "@/components/layout/Container";
import DEVELOPERS from "@/data/developers.json";
import { devSlug } from "@/utils/devSlug";
import styles from "./DevelopersListPage.module.css";

const GROUP_LABELS = {
  giant: "Государственные гиганты",
  premium: "Премиум и люкс",
  growth: "Инвестиционные",
  boutique: "Бутик и новые звёзды",
  other: "Другие застройщики",
};

const GROUP_ORDER = ["giant", "premium", "growth", "boutique", "other"];

const TAB_LIST = [
  { key: "all", label: "Все", icon: LayoutGrid },
  { key: "giant", label: "Государственные гиганты", icon: Landmark },
  { key: "premium", label: "Премиум и люкс", icon: Crown },
  { key: "growth", label: "Инвестиционные", icon: TrendingUp },
  { key: "boutique", label: "Бутик и новые звёзды", icon: Gem },
];

// Pre-group developers
const grouped = {};
for (const key of GROUP_ORDER) grouped[key] = [];
for (const [key, dev] of Object.entries(DEVELOPERS)) {
  const cat = dev.category && grouped[dev.category] ? dev.category : "other";
  grouped[cat].push({ key, ...dev });
}

function DevCard({ dev, i }) {
  return (
    <Link
      href={`/developers/${devSlug(dev.key)}`}
      className={styles.card}
    >
      <div className={styles.cardTop}>
        <div className={styles.logoWrap}>
          {dev.logo ? (
            <img src={dev.logo} alt={dev.key} className={styles.logo} />
          ) : (
            <div className={styles.logoFallback}>{dev.key.charAt(0)}</div>
          )}
        </div>
        <div className={styles.cardTopRight}>
          <div className={styles.cardInfo}>
            <h3 className={styles.cardName}>{dev.key}</h3>
            {dev.communities?.length > 0 && (
              <span className={styles.cardDistricts}>
                {dev.communities.length} районов
              </span>
            )}
          </div>
          <span className={styles.cardNumber}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      {dev.info && <p className={styles.cardDesc}>{dev.info}</p>}
    </Link>
  );
}

export default function CategoryTabs() {
  const [active, setActive] = useState("all");

  return (
    <>
      <div className={styles.heroCatsWrap}>
        <div className={styles.heroCats}>
          {TAB_LIST.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`${styles.heroCatChip} ${active === key ? styles.heroCatChipActive : ""}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {active === "all" ? (
        // Все группы с заголовками
        GROUP_ORDER.map((catKey) => {
          const items = grouped[catKey];
          if (!items.length) return null;
          return (
            <section key={catKey} className={styles.group}>
              <div className={styles.groupHeader}>
                <h2 className={styles.groupTitle}>{GROUP_LABELS[catKey]}</h2>
                <span className={styles.groupCount}>{items.length}</span>
              </div>
              <div className={styles.grid}>
                {items.map((dev, i) => (
                  <DevCard key={dev.key} dev={dev} i={i} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        // Одна категория
        <section className={styles.group}>
          <div className={styles.groupHeader}>
            <h2 className={styles.groupTitle}>{GROUP_LABELS[active]}</h2>
            <span className={styles.groupCount}>
              {grouped[active]?.length || 0}
            </span>
          </div>
          <div className={styles.grid}>
            {(grouped[active] || []).map((dev, i) => (
              <DevCard key={dev.key} dev={dev} i={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
