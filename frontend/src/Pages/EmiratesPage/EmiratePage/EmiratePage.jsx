"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Home,
  Building2,
  Fence,
  Layers,
  Waves,
} from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

import {
  EMIRATE_BY_SLUG,
  EMIRATES,
  groupEmiratePropertiesByType,
  getPropertiesByEmirate,
  PROPERTY_TYPES,
} from "@/utils/properties";
import styles from "./EmiratePage.module.css";

const TYPE_ICONS = {
  "new-builds": LayoutGrid,
  villas: Home,
  apartments: Building2,
  townhouses: Fence,
  penthouses: Layers,
  waterfront: Waves,
};

function asPropertyCardProps(p) {
  return {
    name: p.name,
    price: p.priceUsd,
    district: p.district,
    img: p.image,
    href: `/${p.id}`,
    featured: p.visa,
    offPlan: p.delivery && p.delivery !== "Готово",
    delivery:
      p.delivery && p.delivery !== "Готово" ? p.delivery : undefined,
    developer: p.developer,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
  };
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export default function EmiratePage({ slug }) {
  const emirate = EMIRATE_BY_SLUG[slug];
  const [activeType, setActiveType] = useState("all");

  if (!emirate) return null;

  const all = getPropertiesByEmirate(slug);
  const groups = groupEmiratePropertiesByType(slug);
  const otherEmirates = EMIRATES.filter((e) => e.slug !== slug);

  const visibleGroups =
    activeType === "all"
      ? groups
      : groups.filter((g) => g.type.slug === activeType);

  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Недвижимость
            <br />
            в{" "}
            <span className={styles.heroTitleUnderline}>{emirate.nameIn}</span>
          </h1>

          <div className={styles.divider} />
          <div className={styles.descInner}>
            <span className={styles.descQuote}>&ldquo;</span>
            <p className={styles.descText}>{emirate.description}</p>
            <span className={styles.descQuote}>&rdquo;</span>
          </div>

          <div className={styles.heroCatsWrap}>
            <div className={styles.heroCats}>
              <button
                className={`${styles.heroCatChip} ${activeType === "all" ? styles.heroCatChipActive : ""}`}
                onClick={() => setActiveType("all")}
              >
                <LayoutGrid size={15} />
                Все ({all.length})
              </button>
              {PROPERTY_TYPES.filter((t) => !t.isAll).map((t) => {
                const count = all.filter(t.matches).length;
                if (count === 0) return null;
                const Icon = TYPE_ICONS[t.slug];
                return (
                  <button
                    key={t.slug}
                    className={`${styles.heroCatChip} ${activeType === t.slug ? styles.heroCatChipActive : ""}`}
                    onClick={() => setActiveType(t.slug)}
                  >
                    {Icon && <Icon size={15} />}
                    {t.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          {all.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                В {emirate.nameIn} пока нет объектов в каталоге
              </p>
              <p className={styles.emptyText}>
                Мы регулярно обновляем подборки. Оставьте заявку, и мы пришлём
                первые актуальные предложения по этому эмирату.
              </p>
              <Link href="/contact" className={styles.emptyBtn}>
                Получить подборку
              </Link>
            </div>
          ) : (
            visibleGroups.map((group) => (
              <div key={group.type.slug} className={styles.group}>
                <div className={styles.groupHeader}>
                  <h2 className={styles.groupTitle}>
                    {group.type.label} в {emirate.nameIn}
                  </h2>
                  <span className={styles.groupBadge}>
                    {group.items.length}{" "}
                    {pluralize(group.items.length, "объект", "объекта", "объектов")}
                  </span>
                </div>
                <div className={styles.grid}>
                  {group.items.map((p) => (
                    <PropertyCard key={p.id} {...asPropertyCardProps(p)} />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </Container>

      <section className={styles.others}>
        <Container>
          <SectionTitle tag="ОАЭ" title="Другие эмираты ОАЭ" align="left" mb="2.4rem" />
          <div className={styles.othersGrid}>
            {otherEmirates.map((e) => {
              const cnt = getPropertiesByEmirate(e.slug).length;
              return (
                <Link key={e.slug} href={e.href} className={styles.otherCard}>
                  <div className={styles.otherImgWrap}>
                    <img src={e.image} alt={e.name} className={styles.otherImg} />
                  </div>
                  <div className={styles.otherInfo}>
                    <span className={styles.otherName}>{e.name}</span>
                    <span className={styles.otherCount}>
                      {cnt} {pluralize(cnt, "объект", "объекта", "объектов")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
