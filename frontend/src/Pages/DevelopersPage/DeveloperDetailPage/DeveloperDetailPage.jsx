import Link from "next/link";
import { Check, ArrowRight, Building2, Layers, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import Button from "@/components/Button/Button";
import DEVELOPERS from "@/data/developers.json";
import VILLAS from "@/data/properties/villas.json";
import TOWNHOUSES from "@/data/properties/townhouses.json";
import OBJECTS from "@/data/properties/objects.json";
import { devKeyFromSlug, devSlug } from "@/utils/devSlug";
import styles from "./DeveloperDetailPage.module.css";

// Один общий список свойств всех типов, чтобы фильтровать по застройщику.
const ALL_PROPERTIES = [...OBJECTS, ...VILLAS, ...TOWNHOUSES];

// Универсальные «преимущества» застройщика — показываем как буллеты,
// если в developers.json нет специальных полей.
const DEFAULT_FEATURES = [
  "Высокие стандарты качества — собственный контроль строительства и материалов на каждом этапе",
  "Прозрачные планы платежей и соблюдение сроков сдачи проектов",
  "Эксклюзивные локации с высоким инвестиционным потенциалом и арендной доходностью",
  "Современная архитектура и продуманные планировки от международных бюро",
  "Развитая инфраструктура внутри комьюнити: парки, школы, зоны отдыха и сервисы",
  "Прямой доступ к старту продаж и лучшим лотам через ShanGroup как партнёра",
];

function pickByType(items, predicate) {
  return items.filter(predicate);
}

function asPropertyCardProps(p) {
  return {
    name: p.name,
    price: p.priceUsd,
    district: p.district,
    img: p.image,
    href: `/${p.id}`,
    featured: p.visa,
    offPlan: p.delivery && p.delivery !== "Готово",
    delivery: p.delivery && p.delivery !== "Готово" ? p.delivery : undefined,
    developer: p.developer,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
  };
}

export default function DeveloperDetailPage({ slug }) {
  const key = devKeyFromSlug(slug, DEVELOPERS) ?? Object.keys(DEVELOPERS)[0];
  const dev = DEVELOPERS[key];

  // Выбираем объекты этого застройщика из всех файлов с недвижимостью.
  // Сравнение мягкое: поле property.developer может содержать как ключ, так и
  // вариант с другим регистром.
  const owned = ALL_PROPERTIES.filter(
    (p) => p.developer && p.developer.toLowerCase() === key.toLowerCase(),
  );

  const apartments = pickByType(owned, (p) => /апартамент/i.test(p.type ?? ""));
  const villas = pickByType(owned, (p) => /вилл/i.test(p.type ?? ""));
  const townhouses = pickByType(owned, (p) => /таунхаус/i.test(p.type ?? ""));
  const penthouses = pickByType(owned, (p) => /пентхаус/i.test(p.type ?? ""));

  const heroProperty = owned[0];
  const galleryThumbs = owned.slice(1, 5);

  const sections = [
    { label: "Апартаменты", items: apartments },
    { label: "Виллы", items: villas },
    { label: "Таунхаусы", items: townhouses },
    { label: "Пентхаусы", items: penthouses },
  ].filter((s) => s.items.length > 0);

  // Заглушка для случая, когда у застройщика пока нет привязанных объектов:
  // показываем первые карточки из общего списка как «избранные предложения».
  const fallback = ALL_PROPERTIES.slice(0, 3);

  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <Link href="/developers" className={styles.crumb}>
                ← Все застройщики
              </Link>

              <div className={styles.brandRow}>
                {dev.logo && (
                  <img src={dev.logo} alt={key} className={styles.brandLogo} />
                )}
                <div>
                  <p className={styles.brandKicker}>Застройщик</p>
                  <h1 className={styles.brandTitle}>{key}</h1>
                </div>
              </div>

              <p className={styles.brandDesc}>{dev.info}</p>

              <div className={styles.brandStats}>
                <div className={styles.statBox}>
                  <Building2 size={18} />
                  <div>
                    <span className={styles.statValue}>{owned.length}</span>
                    <span className={styles.statLabel}>проектов</span>
                  </div>
                </div>
                {dev.communities?.length > 0 && (
                  <div className={styles.statBox}>
                    <Layers size={18} />
                    <div>
                      <span className={styles.statValue}>
                        {dev.communities.length}
                      </span>
                      <span className={styles.statLabel}>комьюнити</span>
                    </div>
                  </div>
                )}
                {dev.top && (
                  <div className={styles.statBox}>
                    <MapPin size={18} />
                    <div>
                      <span className={styles.statValue}>TOP</span>
                      <span className={styles.statLabel}>застройщик</span>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.heroBtns}>
                <Button label="Подобрать объект" href="#projects" />
                <Link href="/contact" className={styles.heroLink}>
                  Связаться с экспертом
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.heroRight}>
              {heroProperty ? (
                <Link href={`/${heroProperty.id}`} className={styles.heroCard}>
                  <img
                    src={heroProperty.image}
                    alt={heroProperty.name}
                    className={styles.heroCardImg}
                  />
                  <div className={styles.heroCardBody}>
                    <span className={styles.heroCardKicker}>
                      Флагманский проект
                    </span>
                    <span className={styles.heroCardName}>
                      {heroProperty.name}
                    </span>
                    <span className={styles.heroCardMeta}>
                      {heroProperty.district} · {heroProperty.priceUsd}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className={styles.heroPlaceholder}>
                  Скоро здесь появятся проекты {key}
                </div>
              )}

              {galleryThumbs.length > 0 && (
                <div className={styles.heroThumbs}>
                  {galleryThumbs.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${p.id}`}
                      className={styles.heroThumb}
                    >
                      <img src={p.image} alt={p.name} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Projects sections ── */}
      <section id="projects" className={styles.projects}>
        <Container>
          {sections.length > 0 ? (
            sections.map((section) => (
              <div key={section.label} className={styles.projectGroup}>
                <div className={styles.projectHeader}>
                  <h2 className={styles.projectTitle}>
                    {section.label} от {key}
                  </h2>
                  <span className={styles.projectCount}>
                    {section.items.length}
                  </span>
                </div>
                <div className={styles.projectGrid}>
                  {section.items.map((p) => (
                    <PropertyCard key={p.id} {...asPropertyCardProps(p)} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.projectGroup}>
              <div className={styles.projectHeader}>
                <h2 className={styles.projectTitle}>Рекомендованные проекты</h2>
              </div>
              <div className={styles.projectGrid}>
                {fallback.map((p) => (
                  <PropertyCard key={p.id} {...asPropertyCardProps(p)} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ── Communities ── */}
      {dev.communities?.length > 0 && (
        <section className={styles.communities}>
          <Container>
            <div className={styles.communitiesHeader}>
              <h2 className={styles.projectTitle}>Комьюнити от {key}</h2>
              <p className={styles.communitiesSub}>
                Жилые Районы, которые застройщик строит сейчас и сдаёт в
                ближайшие годы.
              </p>
            </div>
            <div className={styles.communitiesGrid}>
              {dev.communities.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={styles.communityChip}
                >
                  {c.label}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Why this developer ── */}
      <section className={styles.why}>
        <Container>
          <div className={styles.whyGrid}>
            <div>
              <p className={styles.whyKicker}>Почему {key}</p>
              <h2 className={styles.whyTitle}>
                Что делает {key} предпочтительным выбором
              </h2>
              <p className={styles.whyText}>
                {dev.info ||
                  `${key} — один из ведущих застройщиков ОАЭ с многолетним опытом и безупречной репутацией на рынке.`}
              </p>
              <ul className={styles.whyList}>
                {DEFAULT_FEATURES.map((f) => (
                  <li key={f}>
                    <span className={styles.whyCheck}>
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.whyImageWrap}>
              <img
                src={
                  galleryThumbs[0]?.image ??
                  heroProperty?.image ??
                  "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542871/Sobha_Tranquil_Beach_Residences_j7sqzf.avif"
                }
                alt={key}
                className={styles.whyImage}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaInner}>
            <p className={styles.ctaKicker}>Узнайте больше о {key}</p>
            <h2 className={styles.ctaTitle}>
              Получите подборку проектов от {key} напрямую от ShanGroup
            </h2>
            <p className={styles.ctaText}>
              Большинство покупателей в Дубае инвестируют не интуитивно, а
              осознанно. Эксперты ShanGroup помогут подобрать лучший лот,
              проверить договор и сопроводить сделку — от выбора до получения
              ключей.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Оставить заявку
              </Link>
              <Link href="/developers" className={styles.ctaSecondary}>
                Все застройщики
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
