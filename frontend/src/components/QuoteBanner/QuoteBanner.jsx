"use client";

import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./QuoteBanner.module.css";

const QUOTES = [
  {
    label: "Buy-to-Exit",
    text: "Инвестиции в off-plan сегодня — это не покупка квадратных метров, а покупка права на прибыль в условиях дефицита готового жилья в 2026 году.",
    author: "ShanGroup",
  },
  {
    label: "Стабильность",
    text: "Дубай перестал быть рынком спекуляций и стал тихой гаванью для мирового капитала: когда в мире нестабильность, инвесторы выбирают бетон, защищенный золотым стандартом ОАЭ.",
    author: "ShanGroup",
  },
  {
    label: "ROI",
    text: "Переход Дубая на статус основного места жительства для экспатов превращает аренду из сезонного бизнеса в стабильный рентный доход с доходностью 8–10% годовых.",
    author: "ShanGroup",
  },
  {
    label: "Дефицит локаций",
    text: "Земля в центральных районах Дубая конечна, а спрос на люксовый сегмент — безграничен. Лучшее время для входа в прайм-локации было вчера, второе лучшее время — сейчас.",
    author: "ShanGroup",
  },
  {
    label: "Налоги и выгода",
    text: "В мире, где налоги съедают до половины прибыли, 0% на доход от недвижимости в Дубае — это самый эффективный рычаг для сложного процента вашего капитала.",
    author: "ShanGroup",
  },
];

export default function QuoteBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % QUOTES.length);
        setVisible(true);
      }, 600);
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const { label, text, author } = QUOTES[index];

  return (
    <section className={styles.wrapper}>
      <div className={styles.noise} />
      <Container>
        <div
          className={`${styles.content} ${visible ? styles.visible : styles.hidden}`}
        >
          <span className={styles.quoteMarkLeft}>&ldquo;</span>
          <blockquote className={styles.blockquote}>
            {label && <SectionTitle tag={label} align="center" dark mb="0" />}
            <p className={styles.text}>{text}</p>
            <cite className={styles.author}>— {author}</cite>
          </blockquote>
          <span className={styles.quoteMarkRight}>&rdquo;</span>
        </div>
      </Container>
    </section>
  );
}
