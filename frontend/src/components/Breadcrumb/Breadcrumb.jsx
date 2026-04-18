"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import styles from "./Breadcrumb.module.css";

const LABELS = {
  catalog: "Каталог",
  communities: "Сообщества",
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
};

function toLabel(segment) {
  return (
    LABELS[segment] ||
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className={styles.bar} aria-label="breadcrumb">
      <Container className={styles.inner}>
        <Link href="/" className={styles.home} aria-label="Главная">
          <Home size={14} />
        </Link>
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <span key={href} className={styles.segment}>
              <ChevronRight size={13} className={styles.sep} />
              {isLast ? (
                <span className={styles.current}>{toLabel(seg)}</span>
              ) : (
                <Link href={href} className={styles.link}>
                  {toLabel(seg)}
                </Link>
              )}
            </span>
          );
        })}
      </Container>
    </nav>
  );
}
