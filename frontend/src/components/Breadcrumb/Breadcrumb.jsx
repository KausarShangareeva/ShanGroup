"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import styles from "./Breadcrumb.module.css";

const LABELS = {
  catalog: "Каталог",
  communities: "Районы",
  developers: "Застройщики",
  blog: "Блог",
  about: "О нас",
  services: "Услуги",
  visa: "Получение визы",
  company: "Регистрация компаний",
  banking: "Банковские счета",
  villas: "Виллы",
  apartments: "Апартаменты",
  townhouses: "Таунхаусы",
  penthouses: "Пентхаусы",
  waterfront: "Набережная",
  reviews: "Отзывы",
  "new-builds": "Новостройки",
  emirates: "Эмираты",
  articles: "Статьи",
  faq: "Вопросы и ответы",
  team: "Команда",
  "investment-trends-2026": "Инвестиции в 2026",
  "golden-visa-strategy": "Золотая виза ОАЭ",
  investments: "Инвестиции",
  "off-plan": "Off-plan стратегия",
  "ready-rentals": "Готовая аренда",
  airbnb: "Краткосрочная аренда",
  flip: "Flip-стратегия",
  "golden-visa": "Golden Visa",
};

// Виртуальные родители для роутов, которые физически плоские (например /airbnb),
// но логически принадлежат категории Investments. Ключ — slug последнего сегмента;
// значение — массив виртуальных слугов, которые надо вставить перед ним. Слуг
// "investments" мы рендерим как текст, а не как ссылку, потому что страницы
// /investments не существует.
const VIRTUAL_PARENTS = {
  "off-plan": ["investments"],
  "ready-rentals": ["investments"],
  airbnb: ["investments"],
  flip: ["investments"],
  "golden-visa": ["investments"],
};

const NON_CLICKABLE = new Set(["investments"]);

function toLabel(segment) {
  return (
    LABELS[segment] ||
    segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const rawSegments = pathname.split("/").filter(Boolean);
  const parents = VIRTUAL_PARENTS[rawSegments[0]] || [];
  // Виртуальные родители идут только когда роут одноуровневый — иначе путь и так
  // несёт реальную иерархию и подмешивать ничего не нужно.
  const segments =
    rawSegments.length === 1 && parents.length
      ? [...parents.map((p) => ({ slug: p, virtual: true })), { slug: rawSegments[0], virtual: false }]
      : rawSegments.map((s) => ({ slug: s, virtual: false }));

  return (
    <nav className={styles.bar} aria-label="breadcrumb">
      <Container className={styles.inner}>
        <Link href="/" className={styles.home} aria-label="Главная">
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
          return (
            <span key={`${seg.slug}-${i}`} className={styles.segment}>
              <ChevronRight size={13} className={styles.sep} strokeWidth={1.6} />
              {isLast || nonClickable ? (
                <span className={styles.current}>{toLabel(seg.slug)}</span>
              ) : (
                <Link href={href} className={styles.link}>
                  {toLabel(seg.slug)}
                </Link>
              )}
            </span>
          );
        })}
      </Container>
    </nav>
  );
}
