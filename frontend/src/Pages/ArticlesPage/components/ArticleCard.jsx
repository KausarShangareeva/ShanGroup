import Link from "next/link";
import styles from "./ArticleCard.module.css";

const TAG_COLORS = {
  "Гайды":                      { bg: "#DBEAFE", color: "#1D4ED8" },
  "Золотая Виза":               { bg: "#FEF9C3", color: "#A16207" },
  "Налоги и Законы":            { bg: "#EDE9FE", color: "#6D28D9" },
  "Обзоры районов":             { bg: "#DCFCE7", color: "#15803D" },
  "Инвестиционные стратегии":   { bg: "#FFEDD5", color: "#C2410C" },
  "Для жизни":                  { bg: "#CCFBF1", color: "#0F766E" },
};

export default function ArticleCard({ slug, title, author, avatar, date, img, tag, readTime }) {
  const tagStyle = tag ? TAG_COLORS[tag] ?? { bg: "#F1F5F9", color: "#475569" } : null;

  return (
    <Link href={`/articles/${slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={img} alt={title} className={styles.img} />
        {tag && (
          <span
            className={styles.tag}
            style={{ background: tagStyle.bg, color: tagStyle.color }}
          >
            {tag}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.meta}>
          <div className={styles.author}>
            <img src={avatar} alt={author} className={styles.avatar} />
            <span className={styles.authorName}>{author}</span>
          </div>
          {readTime && (
            <div className={styles.player}>
              <span className={styles.playBtn}>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                  <path d="M0 0L8 5L0 10V0Z" />
                </svg>
              </span>
              <span className={styles.readTime}>
                <span className={styles.readLabel}>время чтения</span>
                <span className={styles.readValue}>{readTime}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
