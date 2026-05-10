"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import BlogCard from "./components/BlogCard";
import DATA from "@/data/i18n/ru/content/blog.json";
import styles from "./BlogPage.module.css";
import { getIconComponent } from "@/components/Icon/Icon";

const CATEGORY_ICONS = {
  "Все":                   getIconComponent("layout-grid"),
  "Новости ОАЭ":           getIconComponent("newspaper"),
  "Пульс рынка (DLD)":     getIconComponent("bar-chart"),
  "Новые запуски":          getIconComponent("rocket"),
  "Новости застройщиков":  getIconComponent("building-2"),
  "Мнение эксперта":       getIconComponent("message-square"),
  "События ShanGroup":     getIconComponent("star"),
};

export default function BlogPage() {
  const [active, setActive] = useState("Все");

  const filtered = active === "Все"
    ? DATA.items
    : DATA.items.filter((p) => p.tag === active);

  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Всё о рынке{" "}
            <span className={styles.heroTitleUnderline}>недвижимости</span>
            <br />
            ОАЭ от экспертов
          </h1>

          <div className={styles.divider} />
          <div className={styles.descInner}>
            <span className={styles.descQuote}>&ldquo;</span>
            <p className={styles.descText}>
              Актуальные новости, аналитика и экспертные обзоры рынка недвижимости ОАЭ. Следите за пульсом Дубая, знаковыми запусками и трендами, которые формируют будущее премиального жилья.
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
            {filtered.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
