import Link from "next/link";
import Flag from "react-world-flags";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import ARTICLES from "@/data/articles.json";
import AUTHORS from "@/data/authors.json";
import AudioPlayer from "./AudioPlayer";
import EndCta from "./EndCta";
import GoldVerifiedIcon from "./GoldVerifiedIcon";
import TopArticlesSidebar from "./TopArticlesSidebar";
import styles from "./ArticleDetailPage.module.css";
import { Clock, ArrowRight, Star } from "lucide-react";

const TAG_COLORS = {
  Гайды: { bg: "#DBEAFE", color: "#1D4ED8" },
  "Золотая Виза": { bg: "#FEF9C3", color: "#A16207" },
  "Налоги и Законы": { bg: "#EDE9FE", color: "#6D28D9" },
  "Обзоры районов": { bg: "#DCFCE7", color: "#15803D" },
  "Инвестиционные стратегии": { bg: "#FFEDD5", color: "#C2410C" },
  "Для жизни": { bg: "#CCFBF1", color: "#0F766E" },
};

// Карта русских сокращений месяцев для парсинга дат вида "20 мар 2026".
const RU_MONTHS = {
  янв: 0,
  фев: 1,
  мар: 2,
  апр: 3,
  май: 4,
  июн: 5,
  июл: 6,
  авг: 7,
  сен: 8,
  окт: 9,
  ноя: 10,
  дек: 11,
};

// Название языка → ISO-код страны для флага рядом с языком в карточке автора.
const LANG_TO_FLAG = {
  Русский: "RU",
  English: "GB",
  Deutsch: "DE",
  Français: "FR",
  Español: "ES",
  Italiano: "IT",
  Português: "PT",
  Türkçe: "TR",
  Arabic: "AE",
  العربية: "AE",
  中文: "CN",
  Chinese: "CN",
  日本語: "JP",
  한국어: "KR",
  Українська: "UA",
};

/** Парсит строку "D MMM YYYY" с русскими сокращениями → Date. */
function parseRuDate(s) {
  if (!s) return new Date(0);
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 3) return new Date(0);
  const [d, m, y] = parts;
  const month = RU_MONTHS[m.toLowerCase()];
  if (month == null) return new Date(0);
  return new Date(Number(y), month, Number(d));
}

export default function ArticleDetailPage({ slug }) {
  const article =
    ARTICLES.items.find((a) => a.slug === slug) ?? ARTICLES.items[0];
  // Сортируем от самых свежих к более старым (по убыванию даты).
  const topArticles = ARTICLES.items
    .filter((a) => a.slug !== slug)
    .slice()
    .sort((a, b) => parseRuDate(b.date) - parseRuDate(a.date));
  const author = AUTHORS.find((a) => a.name === article.author) ?? AUTHORS[0];
  const tagStyle = article.tag
    ? (TAG_COLORS[article.tag] ?? { bg: "#F1F5F9", color: "#475569" })
    : null;

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.layout}>
          {/* ── Ячейка: Изображение ── */}
          <div className={styles.imageWrap}>
            <img
              src={article.img}
              alt={article.title}
              className={styles.image}
            />
            {article.tag && (
              <span
                className={styles.tag}
                style={{ background: tagStyle.bg, color: tagStyle.color }}
              >
                {article.tag}
              </span>
            )}
          </div>

          {/* ── Ячейка: Карточка автора ── */}
          <div className={styles.authorCard}>
            <div className={styles.authorTop}>
              <img
                src={author.avatar}
                alt={author.name}
                className={styles.authorAvatar}
              />
              <div>
                <p className={styles.authorName}>{author.name}</p>
                <p className={styles.authorJoined}>
                  <GoldVerifiedIcon size={14} />
                  {author.role}
                </p>
              </div>
            </div>

            <div className={styles.authorActions}>
              <Link
                href={`/authors/${author.slug}`}
                className={styles.profileLink}
              >
                Посмотреть профиль
              </Link>
              <div className={styles.rating}>
                <Star size={14} fill="#FBBF24" color="#FBBF24" />
                <span>{author.rating}</span>
                <span className={styles.reviews}>({author.reviews})</span>
              </div>
            </div>

            <p className={styles.authorBio}>{author.bio}</p>

            <div className={styles.authorStats}>
              <div className={styles.statRow}>
                <Icon name="globe" color="gray" size="sm" />
                <span className={styles.statLabel}>Языки:</span>
                <span className={styles.statValue2}>
                  {author.language.split(",").map((raw, i, arr) => {
                    const lang = raw.trim();
                    const code = LANG_TO_FLAG[lang];
                    return (
                      <span key={lang} className={styles.langItem}>
                        {code && (
                          <Flag
                            code={code}
                            fallback={null}
                            className={styles.langFlag}
                          />
                        )}
                        {lang}
                        {i < arr.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </span>
              </div>
              <div className={styles.statRow}>
                <Icon name="message" color="gray" size="sm" />
                <span className={styles.statLabel}>Ответы:</span>
                <span className={styles.statValue}>{author.responseRate}</span>
              </div>
              <div className={styles.statRow}>
                <Icon name="clock" color="gray" size="sm" />
                <span className={styles.statLabel}>Время ответа:</span>
                <span className={styles.statValue}>{author.responseTime}</span>
              </div>
            </div>

            <div className={styles.contacts}>
              <a href={`mailto:${author.email}`} className={styles.contactBtn}>
                <Icon name="mail" color="white" size="sm" />
                Email
              </a>
              <a
                href={`tel:${author.phone}`}
                className={`${styles.contactBtn} ${styles.contactBtnOutline}`}
              >
                <Icon name="phone" color="black" size="sm" />
                Позвонить
              </a>
            </div>
          </div>

          {/* ── Ячейка: Контент статьи + CTA (левая колонка, ряд 2) ── */}
          <div className={styles.leftCol} data-match-height>
            <div className={styles.content}>
              <div className={styles.meta}>
                <span className={styles.date}>{article.date}</span>
                {article.readTime && (
                  <span className={styles.readTime}>
                    <Clock size={13} />
                    {article.readTime}
                  </span>
                )}
              </div>

              <AudioPlayer duration={article.readTime ?? "5:00"} />

              <h1 className={styles.title}>{article.title}</h1>
              <p className={styles.lead}>{article.excerpt}</p>

              <div className={styles.body}>
                {article.body?.slice(0, 2).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                <div className={styles.inlineCta}>
                  <p className={styles.inlineCtaTitle}>
                    Хотите подобрать объект под вашу стратегию?
                  </p>
                  <p className={styles.inlineCtaText}>
                    Наши эксперты анализируют более 200 объектов еженедельно и
                    подберут лучший вариант именно для вас.
                  </p>
                  <div className={styles.inlineCtaBtns}>
                    <Link href="/contact" className={styles.inlineCtaBtn}>
                      Получить подборку
                    </Link>
                    <Link
                      href="/contact"
                      className={`${styles.inlineCtaBtn} ${styles.inlineCtaBtnOutline}`}
                    >
                      Связаться с экспертом
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                {article.body?.slice(2).map((para, i) => (
                  <p key={i + 2}>{para}</p>
                ))}
              </div>
            </div>

            <EndCta author={author} />
          </div>

          {/* ── Ячейка: Читайте также (высота подстраивается под .leftCol) ── */}
          <TopArticlesSidebar
            articles={topArticles}
            targetSelector="[data-match-height]"
          />
        </div>
      </Container>
    </div>
  );
}
