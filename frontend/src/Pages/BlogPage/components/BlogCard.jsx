import Link from "next/link";
import styles from "./BlogCard.module.css";

const TAG_COLORS = {
  // Blog tags
  "Новости ОАЭ":          { bg: "#FEE2E2", color: "#B91C1C" },
  "Пульс рынка (DLD)":    { bg: "#DBEAFE", color: "#1D4ED8" },
  "Новые запуски":         { bg: "#DCFCE7", color: "#15803D" },
  "Новости застройщиков": { bg: "#FFEDD5", color: "#C2410C" },
  "Мнение эксперта":      { bg: "#EDE9FE", color: "#6D28D9" },
  "События ShanGroup":    { bg: "#1E293B", color: "#F8FAFC" },
  // Articles tags
  "Гайды":                        { bg: "#DBEAFE", color: "#1D4ED8" },
  "Золотая Виза":                 { bg: "#FEF9C3", color: "#A16207" },
  "Налоги и Законы":              { bg: "#EDE9FE", color: "#6D28D9" },
  "Обзоры районов":               { bg: "#DCFCE7", color: "#15803D" },
  "Инвестиционные стратегии":     { bg: "#FFEDD5", color: "#C2410C" },
  "Для жизни":                    { bg: "#CCFBF1", color: "#0F766E" },
};

export default function BlogCard({ slug, title, excerpt, author, role, avatar, date, img, tag, featured = false }) {
  const tagStyle = tag ? TAG_COLORS[tag] ?? { bg: "#F1F5F9", color: "#475569" } : null;

  return (
    <Link href={`/blog/${slug}`} className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <div className={styles.imgWrap}>
        <img src={img} alt={title} className={styles.img} />
        {tag && (
          <span
            className={styles.categoryTag}
            style={{ background: tagStyle.bg, color: tagStyle.color }}
          >
            {tag}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.author}>
          <img src={avatar} alt={author} className={styles.avatar} />
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{author}</span>
            {role && <span className={styles.authorRole}>{role}</span>}
          </div>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
    </Link>
  );
}
