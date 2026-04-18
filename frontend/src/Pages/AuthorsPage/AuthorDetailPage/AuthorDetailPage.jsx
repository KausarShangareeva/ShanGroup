import Link from "next/link";
import Flag from "react-world-flags";
import {
  ArrowLeft,
  Mail,
  Phone,
  Star,
  Briefcase,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
} from "lucide-react";
import Container from "@/components/layout/Container";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import AgentPreviewCard from "@/components/AgentPreviewCard/AgentPreviewCard";
import Icon from "@/components/Icon/Icon";
import GoldVerifiedIcon from "@/Pages/ArticlesPage/ArticleDetailPage/GoldVerifiedIcon";
import AUTHORS from "@/data/authors.json";
import OBJECTS from "@/data/properties/objects.json";
import APARTMENTS from "@/data/properties/apartments.json";
import VILLAS from "@/data/properties/villas.json";
import TOWNHOUSES from "@/data/properties/townhouses.json";
import styles from "./AuthorDetailPage.module.css";

// Все объекты из четырёх property-файлов в одном массиве — отсюда
// фильтруем по ownerSlug для каждого конкретного агента.
// objects — проекты от застройщиков (ЖК целиком), apartments —
// конкретные квартиры вторичного/первичного рынка.
const ALL_PROPERTIES = [...OBJECTS, ...APARTMENTS, ...VILLAS, ...TOWNHOUSES];

// Дублируем маппинг языков из ArticleDetailPage — в идеале вынести в общий
// модуль, но для одной дополнительной точки использования достаточно здесь.
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

export default function AuthorDetailPage({ slug }) {
  const author = AUTHORS.find((a) => a.slug === slug) ?? AUTHORS[0];
  const others = AUTHORS.filter((a) => a.slug !== author.slug);
  // Объекты агента вычисляем на лету: всё, что помечено его ownerSlug.
  const listings = ALL_PROPERTIES.filter((p) => p.ownerSlug === author.slug);

  return (
    <div className={styles.page}>
      <Container>
        {/* Back */}
        <Link href="/authors" className={styles.back}>
          <ArrowLeft size={16} />
          К списку агентов
        </Link>

        {/* ── Hero-карточка автора ── */}
        <section className={styles.hero}>
          <div className={styles.heroPhotoWrap}>
            <img
              src={author.avatar}
              alt={author.name}
              className={styles.heroPhoto}
            />
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.heroTopRow}>
              <div>
                <h1 className={styles.heroName}>{author.name}</h1>
                <p className={styles.heroRole}>
                  <GoldVerifiedIcon size={14} />
                  {author.role}
                </p>
              </div>

              <div className={styles.heroSocials}>
                <a
                  href={`tel:${author.phone}`}
                  className={styles.socialBtn}
                  aria-label="Позвонить"
                >
                  <Phone size={16} />
                </a>
                <a
                  href={`mailto:${author.email}`}
                  className={styles.socialBtn}
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
                {author.socials?.telegram && (
                  <a
                    href={author.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="Telegram"
                  >
                    <Send size={16} />
                  </a>
                )}
                {author.socials?.whatsapp && (
                  <a
                    href={author.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>
                )}
                {author.socials?.instagram && (
                  <a
                    href={author.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className={styles.heroRating}>
              <Star size={16} fill="#FBBF24" color="#FBBF24" />
              <span className={styles.heroRatingValue}>{author.rating}</span>
              <span className={styles.heroRatingReviews}>
                ({author.reviews} отзывов)
              </span>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Обо мне</h3>
              <p className={styles.bio}>{author.bio}</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Личная информация</h3>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <Icon name="building-2" color="gray" size="sm" />
                  <span className={styles.infoLabel}>Активные объекты:</span>
                  <span className={styles.infoValue}>{listings.length}</span>
                </li>
                {author.experienceSince && (
                  <li className={styles.infoItem}>
                    <Briefcase size={14} className={styles.infoIcon} />
                    <span className={styles.infoLabel}>Опыт с:</span>
                    <span className={styles.infoValue}>
                      {author.experienceSince} г.
                    </span>
                  </li>
                )}
                {author.areas?.length > 0 && (
                  <li className={styles.infoItem}>
                    <MapPin size={14} className={styles.infoIcon} />
                    <span className={styles.infoLabel}>Районы:</span>
                    <span className={styles.infoValue}>
                      {author.areas.join(", ")}
                    </span>
                  </li>
                )}
                <li className={styles.infoItem}>
                  <Icon name="globe" color="gray" size="sm" />
                  <span className={styles.infoLabel}>Языки:</span>
                  <span className={styles.infoValue}>
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
                </li>
                <li className={styles.infoItem}>
                  <Clock size={14} className={styles.infoIcon} />
                  <span className={styles.infoLabel}>Ответы:</span>
                  <span className={styles.infoValue}>
                    {author.responseRate} · {author.responseTime}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Объекты агента ── */}
        {listings.length > 0 && (
          <section className={styles.listingsSection}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Объекты агента</h2>
              <span className={styles.sectionCount}>
                {listings.length}{" "}
                {listings.length === 1
                  ? "объект"
                  : listings.length < 5
                    ? "объекта"
                    : "объектов"}
              </span>
            </div>
            <div className={styles.listingsGrid}>
              {listings.map((p) => {
                const isOffPlan =
                  p.offPlan ?? (p.delivery && p.delivery !== "Готово");
                return (
                  <PropertyCard
                    key={p.id}
                    name={p.name}
                    price={p.priceUsd}
                    district={p.district}
                    img={p.image}
                    href={`/${p.id}`}
                    featured={p.featured ?? p.visa}
                    offPlan={isOffPlan}
                    delivery={isOffPlan ? p.delivery : undefined}
                    developer={p.developer}
                    beds={p.beds}
                    baths={p.baths}
                    area={p.area}
                    agent={author}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* ── Другие агенты ── */}
        {others.length > 0 && (
          <section className={styles.othersSection}>
            <h2 className={styles.sectionTitle}>Наши агенты</h2>
            <div className={styles.othersGrid}>
              {others.map((a) => (
                <AgentPreviewCard key={a.slug} agent={a} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
