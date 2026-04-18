import Link from "next/link";
import Flag from "react-world-flags";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import BLOG from "@/data/blog.json";
import AUTHORS from "@/data/authors.json";
import AudioPlayer from "@/Pages/ArticlesPage/ArticleDetailPage/AudioPlayer";
import EndCta from "@/Pages/ArticlesPage/ArticleDetailPage/EndCta";
import GoldVerifiedIcon from "@/Pages/ArticlesPage/ArticleDetailPage/GoldVerifiedIcon";
import TopArticlesSidebar from "@/Pages/ArticlesPage/ArticleDetailPage/TopArticlesSidebar";
import styles from "@/Pages/ArticlesPage/ArticleDetailPage/ArticleDetailPage.module.css";
import { Clock, ArrowRight, Star } from "lucide-react";

const TAG_COLORS = {
  "Новости ОАЭ": { bg: "#FEE2E2", color: "#B91C1C" },
  "Пульс рынка (DLD)": { bg: "#DBEAFE", color: "#1D4ED8" },
  "Новые запуски": { bg: "#DCFCE7", color: "#15803D" },
  "Новости застройщиков": { bg: "#FFEDD5", color: "#C2410C" },
  "Мнение эксперта": { bg: "#EDE9FE", color: "#6D28D9" },
  "События ShanGroup": { bg: "#1E293B", color: "#F8FAFC" },
};

const RU_MONTHS = {
  янв: 0, фев: 1, мар: 2, апр: 3, май: 4, июн: 5,
  июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
};

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

function parseRuDate(s) {
  if (!s) return new Date(0);
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 3) return new Date(0);
  const [d, m, y] = parts;
  const month = RU_MONTHS[m.toLowerCase()];
  if (month == null) return new Date(0);
  return new Date(Number(y), month, Number(d));
}

export default function BlogDetailPage({ slug }) {
  const post = BLOG.items.find((a) => a.slug === slug) ?? BLOG.items[0];
  const topPosts = BLOG.items
    .filter((a) => a.slug !== slug)
    .slice()
    .sort((a, b) => parseRuDate(b.date) - parseRuDate(a.date));
  const author =
    AUTHORS.find((a) => a.name === post.author) ?? {
      name: post.author,
      slug: "",
      role: post.role,
      avatar: post.avatar,
      bio: "",
      email: "",
      phone: "",
      language: "Русский",
      responseRate: "—",
      responseTime: "—",
      rating: "—",
      reviews: 0,
    };
  const tagStyle = post.tag
    ? (TAG_COLORS[post.tag] ?? { bg: "#F1F5F9", color: "#475569" })
    : null;

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <img src={post.img} alt={post.title} className={styles.image} />
            {post.tag && (
              <span
                className={styles.tag}
                style={{ background: tagStyle.bg, color: tagStyle.color }}
              >
                {post.tag}
              </span>
            )}
          </div>

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
              {author.slug && (
                <Link
                  href={`/authors/${author.slug}`}
                  className={styles.profileLink}
                >
                  Посмотреть профиль
                </Link>
              )}
              {author.rating !== "—" && (
                <div className={styles.rating}>
                  <Star size={14} fill="#FBBF24" color="#FBBF24" />
                  <span>{author.rating}</span>
                  <span className={styles.reviews}>({author.reviews})</span>
                </div>
              )}
            </div>

            {author.bio && <p className={styles.authorBio}>{author.bio}</p>}

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

            {(author.email || author.phone) && (
              <div className={styles.contacts}>
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className={styles.contactBtn}
                  >
                    <Icon name="mail" color="white" size="sm" />
                    Email
                  </a>
                )}
                {author.phone && (
                  <a
                    href={`tel:${author.phone}`}
                    className={`${styles.contactBtn} ${styles.contactBtnOutline}`}
                  >
                    <Icon name="phone" color="black" size="sm" />
                    Позвонить
                  </a>
                )}
              </div>
            )}
          </div>

          <div className={styles.leftCol} data-match-height>
            <div className={styles.content}>
              <div className={styles.meta}>
                <span className={styles.date}>{post.date}</span>
                {post.readTime && (
                  <span className={styles.readTime}>
                    <Clock size={13} />
                    {post.readTime}
                  </span>
                )}
              </div>

              <AudioPlayer duration={post.readTime ?? "5:00"} />

              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.lead}>{post.excerpt}</p>

              <div className={styles.body}>
                {post.body?.slice(0, 2).map((para, i) => (
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

                {post.body?.slice(2).map((para, i) => (
                  <p key={i + 2}>{para}</p>
                ))}
              </div>
            </div>

            <EndCta author={author} />
          </div>

          <TopArticlesSidebar
            articles={topPosts}
            targetSelector="[data-match-height]"
            basePath="/blog"
          />
        </div>
      </Container>
    </div>
  );
}
