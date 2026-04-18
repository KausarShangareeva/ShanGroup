"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ArticleDetailPage.module.css";

const TAG_COLORS = {
  // Articles tags
  Гайды: { bg: "#DBEAFE", color: "#1D4ED8" },
  "Золотая Виза": { bg: "#FEF9C3", color: "#A16207" },
  "Налоги и Законы": { bg: "#EDE9FE", color: "#6D28D9" },
  "Обзоры районов": { bg: "#DCFCE7", color: "#15803D" },
  "Инвестиционные стратегии": { bg: "#FFEDD5", color: "#C2410C" },
  "Для жизни": { bg: "#CCFBF1", color: "#0F766E" },
  // Blog tags
  "Новости ОАЭ": { bg: "#FEE2E2", color: "#B91C1C" },
  "Пульс рынка (DLD)": { bg: "#DBEAFE", color: "#1D4ED8" },
  "Новые запуски": { bg: "#DCFCE7", color: "#15803D" },
  "Новости застройщиков": { bg: "#FFEDD5", color: "#C2410C" },
  "Мнение эксперта": { bg: "#EDE9FE", color: "#6D28D9" },
  "События ShanGroup": { bg: "#1E293B", color: "#F8FAFC" },
};

/**
 * Сайдбар «Читайте также» с динамической подрезкой списка статей под высоту
 * соседней колонки.
 *
 * @param {Array}  articles       — все статьи-кандидаты (будем показывать префикс).
 * @param {string} targetSelector — CSS-селектор элемента, высоту которого нужно
 *                                  повторить (обычно левая колонка с body + CTA).
 */
export default function TopArticlesSidebar({ articles, targetSelector, basePath = "/articles" }) {
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const titleRef = useRef(null);

  // Стартуем с максимума — после первого layout подрежем до реального fit.
  const [visibleCount, setVisibleCount] = useState(articles.length);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const target = document.querySelector(targetSelector);
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    const title = titleRef.current;
    if (!target || !wrapper || !list) return;

    const compute = () => {
      const targetH = target.offsetHeight;

      // Отнимаем от высоты цели вертикальные паддинги обёртки и высоту заголовка,
      // чтобы получить чистое пространство под карточки.
      const wrapStyles = window.getComputedStyle(wrapper);
      const padTop = parseFloat(wrapStyles.paddingTop) || 0;
      const padBottom = parseFloat(wrapStyles.paddingBottom) || 0;

      const titleH = title ? title.offsetHeight : 0;
      const titleMargin = title
        ? parseFloat(window.getComputedStyle(title).marginBottom) || 0
        : 0;

      const available = targetH - padTop - padBottom - titleH - titleMargin;

      const cards = list.querySelectorAll("[data-article-card]");
      if (!cards.length) return;

      // Берём реальную высоту первой отрисованной карточки + gap из flex-списка.
      const cardH = cards[0].offsetHeight;
      const listStyles = window.getComputedStyle(list);
      const listGap =
        parseFloat(listStyles.rowGap) ||
        parseFloat(listStyles.gap) ||
        0;

      // N карточек занимают: N * cardH + (N-1) * gap <= available
      //  => N <= (available + gap) / (cardH + gap)
      const fit = Math.max(
        1,
        Math.floor((available + listGap) / (cardH + listGap)),
      );
      setVisibleCount(Math.min(fit, articles.length));
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(target);
    ro.observe(wrapper);
    window.addEventListener("resize", compute);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [articles.length, targetSelector]);

  const visible = articles.slice(0, visibleCount);

  return (
    <div className={styles.topArticles} ref={wrapperRef}>
      <h3 className={styles.topTitle} ref={titleRef}>
        Читайте также
      </h3>
      <div className={styles.topList} ref={listRef}>
        {visible.map((a) => {
          const ts = a.tag
            ? (TAG_COLORS[a.tag] ?? { bg: "#F1F5F9", color: "#475569" })
            : null;
          return (
            <Link
              key={a.id}
              href={`${basePath}/${a.slug}`}
              className={styles.topCard}
              data-article-card
            >
              <div className={styles.topImgWrap}>
                <img src={a.img} alt={a.title} className={styles.topImg} />
              </div>
              <div className={styles.topBody}>
                {a.tag && (
                  <span
                    className={styles.topTag}
                    style={{ background: ts.bg, color: ts.color }}
                  >
                    {a.tag}
                  </span>
                )}
                <p className={styles.topCardTitle}>{a.title}</p>
                <span className={styles.topDate}>{a.date}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
