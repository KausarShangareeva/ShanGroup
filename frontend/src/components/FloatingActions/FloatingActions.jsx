"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Building2, BookOpen } from "lucide-react";
import styles from "./FloatingActions.module.css";

const ACTIONS = [
  {
    icon: MessageCircle,
    label: "Задать вопрос",
    sub: "WhatsApp",
    href: "https://wa.me/971500000000",
    external: true,
  },
  {
    icon: Building2,
    label: "Подобрать объект",
    sub: "Каталог недвижимости",
    href: "/catalog",
  },
  {
    icon: BookOpen,
    label: "Получить каталог",
    sub: "PDF — актуальные объекты",
    href: "/pdf",
  },
];

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.wrap} ${visible ? styles.wrapVisible : ""}`}>
      {ACTIONS.map(({ icon: Icon, label, sub, href, external }) => (
        <a
          key={href}
          href={href}
          className={styles.pill}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className={styles.iconWrap}>
            <Icon size={18} strokeWidth={1.6} />
          </span>
          <span className={styles.text}>
            <span className={styles.label}>{label}</span>
            <span className={styles.sub}>{sub}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
