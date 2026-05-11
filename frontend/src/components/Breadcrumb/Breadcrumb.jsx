"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import styles from "./Breadcrumb.module.css";

// Виртуальные родители для роутов, физически плоских (например /airbnb), но
// логически принадлежащих категории Investments. Ключ — slug последнего сегмента;
// значение — массив слугов, которые надо вставить перед ним. "investments"
// рендерится как текст, а не ссылка, потому что страницы /investments не существует.
const VIRTUAL_PARENTS = {
  "off-plan": ["investments"],
  "ready-rentals": ["investments"],
  airbnb: ["investments"],
  flip: ["investments"],
  "golden-visa": ["investments"],
  "investor-visa": ["investments"],
  installment: ["investments"],
  mortgage: ["investments"],
  "roi-calculator": ["investments"],
};

const NON_CLICKABLE = new Set(["investments"]);

function titleCase(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const t = useTranslations("Common.breadcrumb");
  const slugLabels = t.raw("slugs");

  if (pathname === "/") return null;

  const rawSegments = pathname.split("/").filter(Boolean);
  const parents = VIRTUAL_PARENTS[rawSegments[0]] || [];
  // Виртуальные родители подмешиваются только при одноуровневом роуте.
  const segments =
    rawSegments.length === 1 && parents.length
      ? [
          ...parents.map((p) => ({ slug: p, virtual: true })),
          { slug: rawSegments[0], virtual: false },
        ]
      : rawSegments.map((s) => ({ slug: s, virtual: false }));

  const labelFor = (slug) => slugLabels?.[slug] || titleCase(slug);

  return (
    <nav className={styles.bar} aria-label="breadcrumb">
      <Container className={styles.inner}>
        <Link href="/" className={styles.home} aria-label={t("home")}>
          <Icon name="home" size={14} />
        </Link>

        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          // Только не-виртуальные слуги собирают href из real-сегментов.
          const realSlice = segments
            .slice(0, i + 1)
            .filter((s) => !s.virtual)
            .map((s) => s.slug);
          const href = "/" + realSlice.join("/");
          const nonClickable = seg.virtual || NON_CLICKABLE.has(seg.slug);
          const label = labelFor(seg.slug);

          return (
            <span key={`${seg.slug}-${i}`} className={styles.segment}>
              <span aria-hidden className={styles.sep}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 3 L10 7 L5 11" />
                </svg>
              </span>
              {isLast || nonClickable ? (
                <span
                  className={isLast ? styles.current : styles.virtual}
                  aria-current={isLast ? "page" : undefined}
                  title={label}
                >
                  {label}
                </span>
              ) : (
                <Link href={href} className={styles.link} title={label}>
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </Container>
    </nav>
  );
}
