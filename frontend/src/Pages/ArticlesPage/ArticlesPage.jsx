"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import ArticleCard from "./components/ArticleCard";
import DATA from "@/data/i18n/ru/content/articles.json";
import AUTHORS from "@/data/i18n/ru/people/authors.json";
import styles from "./ArticlesPage.module.css";
import { getIconComponent } from "@/components/Icon/Icon";

const CATEGORY_ICONS = {
  "Все":                        getIconComponent("layout-grid"),
  "Гайды":                      getIconComponent("book-open"),
  "Золотая Виза":               getIconComponent("credit-card"),
  "Налоги и Законы":            getIconComponent("scale"),
  "Обзоры районов":             getIconComponent("map-pin"),
  "Инвестиционные стратегии":   getIconComponent("trending-up"),
  "Для жизни":                  getIconComponent("heart"),
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
                const IconCmp = CATEGORY_ICONS[label] ?? CATEGORY_ICONS["Все"];
                return (
                  <button
                    key={label}
                    className={`${styles.heroCatChip} ${active === label ? styles.heroCatChipActive : ""}`}
                    onClick={() => setActive(label)}
                  >
                    <IconCmp size={16} strokeWidth={1.6} />
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
