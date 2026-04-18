"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import ArticleCard from "./components/ArticleCard";
import DATA from "@/data/articles.json";
import AUTHORS from "@/data/authors.json";
import styles from "./ArticlesPage.module.css";
import {
  LayoutGrid,
  BookOpen,
  CreditCard,
  Scale,
  MapPin,
  TrendingUp,
  Heart,
} from "lucide-react";

const CATEGORY_ICONS = {
  "Все":                        LayoutGrid,
  "Гайды":                      BookOpen,
  "Золотая Виза":               CreditCard,
  "Налоги и Законы":            Scale,
  "Обзоры районов":             MapPin,
  "Инвестиционные стратегии":   TrendingUp,
  "Для жизни":                  Heart,
};

export default function ArticlesPage() {
  const [active, setActive] = useState("Все");

  const filtered = active === "Все"
    ? DATA.items
    : DATA.items.filter((a) => a.tag === active);

  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Полезные{" "}
            <span className={styles.heroTitleUnderline}>материалы</span>
            <br />
            о рынке ОАЭ
          </h1>

          <div className={styles.divider} />
          <div className={styles.descInner}>
            <span className={styles.descQuote}>&ldquo;</span>
            <p className={styles.descText}>
              Гайды, правовые обзоры и инвестиционные стратегии для тех, кто хочет разобраться в рынке недвижимости ОАЭ. Всё необходимое для осознанного выбора — от Золотой Визы до налоговых аспектов.
            </p>
            <span className={styles.descQuote}>&rdquo;</span>
          </div>

          <div className={styles.heroCatsWrap}>
            <div className={styles.heroCats}>
              {DATA.categories.map((label) => {
                const Icon = CATEGORY_ICONS[label] ?? LayoutGrid;
                return (
                  <button
                    key={label}
                    className={`${styles.heroCatChip} ${active === label ? styles.heroCatChipActive : ""}`}
                    onClick={() => setActive(label)}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className={styles.grid}>
            {filtered.map((article) => {
              const author = AUTHORS.find((a) => a.name === article.author);
              return (
                <ArticleCard
                  key={article.id}
                  {...article}
                  avatar={author?.avatar}
                  role={author?.role}
                />
              );
            })}
          </div>
        </section>
      </Container>
    </main>
  );
}
