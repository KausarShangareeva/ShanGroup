"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Flag from "@/components/Flag/Flag";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import RichMegaMenu from "@/components/RichMegaMenu/RichMegaMenu";
import CategoryMegaMenu from "@/components/CategoryMegaMenu/CategoryMegaMenu";
import DistrictsMegaMenu from "@/components/DistrictsMegaMenu/DistrictsMegaMenu";
import PropertiesMegaMenu from "@/components/PropertiesMegaMenu/PropertiesMegaMenu";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
// Lucide kept for hamburger (Menu) and burger toggle X — purely utility,
// not part of the editorial icon language. ChevronDown/Right also stay
// lucide for now (used in many places with consistent visual weight).
// Sun/Moon used in the BurgerDrawer theme SegPicker (HeroIcons doesn't ship them).
import { ChevronDown, ChevronRight, Menu, X, Sun, Moon } from "lucide-react";
import {
  IcSearch,
  IcClose,
  IcPhone,
} from "@/components/HeroIcons/HeroIcons";
import LikeButton from "@/components/LikeButton/LikeButton";
import Icon from "@/components/Icon/Icon";
import Container from "./Container";
import PopupForm from "../PopupForm/PopupForm";
import ContactButton from "@/components/ContactButton/ContactButton";
import DropdownNavButton from "@/components/DropdownNavButton/DropdownNavButton";
import PROPERTIES from "@/data/properties/objects.json";
import DEVELOPERS from "@/data/developers.json";
import { buildEmirateCounts } from "@/utils/properties";
import styles from "./Navigation.module.css";

const FEATURED = PROPERTIES[0];

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    iconName: "instagram",
    desc: "@shangroup.ae",
  },
  {
    label: "YouTube",
    href: "#",
    iconName: "youtube",
    desc: "Видео о недвижимости",
  },
  { label: "Telegram", href: "#", iconName: "send", desc: "Новости и объекты" },
  { label: "WhatsApp", href: "#", iconName: "message", desc: "Написать нам" },
];

const navItems = [
  {
    label: "Новостройки ОАЭ",
    type: "properties",
    dropdown: [
      {
        label: "Квартиры в Дубае",
        desc: "Апартаменты и студии",
        href: "/apartments",
        iconName: "building-2",
      },
      {
        label: "Дома и виллы",
        desc: "Частные дома и виллы",
        href: "/villas",
        iconName: "home",
      },
      {
        label: "По локации",
        desc: "Поиск по районам",
        href: "/communities",
        iconName: "map-pin",
      },
      {
        label: "По застройщикам",
        desc: "Ведущие застройщики ОАЭ",
        href: "/developers",
        iconName: "briefcase",
      },
      {
        label: "Абу-Даби",
        desc: "Недвижимость в столице",
        href: "/abu-dhabi",
        iconName: "building",
      },
      {
        label: "Шарджа",
        desc: "Недвижимость в Шардже",
        href: "/sharjah",
        iconName: "landmark",
      },
    ],
  },
  { label: "Районы", type: "communities", href: "/communities" },
  { label: "Застройщики", type: "developers", href: "/developers" },
  {
    label: "Инвестиции",
    type: "invest",
    services: [
      {
        label: "Golden Visa $545K+",
        desc: "10-летняя резидентская виза",
        href: "/services/golden-visa",
        iconName: "shield",
      },
      {
        label: "Investor Visa $204K+",
        desc: "2-летняя инвесторская виза",
        href: "/services/investor-visa",
        iconName: "file-text",
      },
      {
        label: "Рассрочка 1% / месяц",
        desc: "От застройщика, без банка",
        href: "/services/installment",
        iconName: "credit-card",
      },
      {
        label: "Ипотека для нерезидентов",
        desc: "От 25% первый взнос",
        href: "/services/mortgage",
        iconName: "briefcase",
      },
    ],
    dropdown: [
      {
        label: "Off-plan стратегия",
        desc: "Покупка до запуска · ROI 25–40%",
        href: "/invest/offplan",
        iconName: "trending-up",
      },
      {
        label: "Готовая аренда",
        desc: "Стабильный доход 6–9% годовых",
        href: "/invest/rental",
        iconName: "home",
      },
      {
        label: "Краткосрочная аренда",
        desc: "Airbnb-формат, доход до 12%",
        href: "/invest/short-term",
        iconName: "calendar",
      },
      {
        label: "Flip-стратегия",
        desc: "Перепродажа на handover",
        href: "/invest/flip",
        iconName: "info",
      },
      {
        label: "ROI калькулятор",
        desc: "Доходность за 3/5/10 лет",
        href: "/invest/calculator",
        iconName: "file-text",
      },
      {
        label: "Налоговый гид ОАЭ",
        desc: "0% налог на доход физлиц",
        href: "/invest/tax",
        iconName: "info",
      },
    ],
  },
  {
    label: "О нас",
    type: "about",
    services: [
      {
        label: "Получение визы",
        desc: "Резидентские и инвесторские визы",
        href: "/services/visa",
        iconName: "file-text",
      },
      {
        label: "Регистрация компаний",
        desc: "Фрихолд и фризона",
        href: "/services/company",
        iconName: "briefcase",
      },
      {
        label: "Банковские счета",
        desc: "Личные и корпоративные счета",
        href: "/services/banking",
        iconName: "credit-card",
      },
      {
        label: "Доверенности",
        desc: "Оформление и нотариальное заверение",
        href: "/services/poa",
        iconName: "pen-line",
      },
    ],
    dropdown: [
      {
        label: "О компании",
        desc: "Наша история и миссия",
        href: "/about",
        iconName: "info",
      },
      {
        label: "Отзывы",
        desc: "Опыт наших клиентов",
        href: "/reviews",
        iconName: "star",
      },
      {
        label: "Статьи",
        desc: "Полезные материалы",
        href: "/articles",
        iconName: "file-text",
      },
      {
        label: "Блог",
        desc: "Новости рынка",
        href: "/blog",
        iconName: "book-open",
      },
      {
        label: "Вопросы и ответы",
        desc: "Частые вопросы",
        href: "/faq",
        iconName: "help-circle",
      },
    ],
  },
];

// Эмираты подтягиваем из единого реестра — счётчики и URL обновляются
// автоматически при добавлении новых записей в JSON-файлы недвижимости.
const EMIRATES = buildEmirateCounts().map((e) => ({
  label: e.name,
  count: e.count,
  href: e.href,
  img: e.image,
}));

const PROPERTY_TYPES = [
  // Ряд 1: типы объектов
  {
    label: "Виллы",
    href: "/villas",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1774280298/ChatGPT_Image_Mar_23_2026_04_28_29_PM_trpvu5.png",
  },
  {
    label: "Апартаменты",
    href: "/apartments",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1774542871/Lumea_Residences_at_Dubai_Islands_aijk8j.webp",
  },
  {
    label: "Таунхаусы",
    href: "/townhouses",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775318360/townhouse_hxob4w.png",
  },
  {
    label: "Пентхаусы",
    href: "/penthouses",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542913/Celesto_2_by_Tarrad_omfujw.webp",
  },
  {
    label: "DAMAC Islands",
    href: "/communities/damac-islands-2",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775318463/damac_qa98eh.png",
  },
  // Ряд 2: популярные локации
  {
    label: "Набережная",
    href: "/waterfront",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775318663/waterfront_quk1ah.png",
  },
  {
    label: "Palm Jebel Ali",
    href: "/communities/palm-jebel-ali",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1771921144/palm_jumeirah_oksqfu.png",
  },
  {
    label: "Sheikh Zayed Road",
    href: "/communities/szr",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775318914/road_nkvrkz.png",
  },
  {
    label: "Dubai Expo City",
    href: "/communities/expo-city",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775318360/expo_mns7ub.png",
  },
  {
    label: "Рас-эль-Хайма",
    href: "/communities/al-marjan",
    image:
      "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775319180/ras_rylydn.png",
  },
];

const DEV_DISPLAY_NAMES = {
  Emaar: "Emaar Properties",
  DAMAC: "DAMAC Properties",
  Sobha: "Sobha Realty",
  Meraas: "Meraas Properties",
  Nakheel: "Nakheel Properties",
  Aldar: "Aldar Properties",
  Arada: "Arada Developers",
  Ellington: "Ellington",
  "Eagle Hills": "Eagle Hills",
  NSHAMA: "NSHAMA",
  Samana: "Samana Developers",
  Binghatti: "Binghatti Properties",
  Danube: "Danube Properties",
  Deyaar: "Deyaar Properties",
  Omniyat: "Omniyat",
  "Object 1": "Object 1",
  Ohana: "Ohana Development",
  "Iman Developers": "Iman Developers",
  Imtiaz: "Imtiaz Developments",
  IMKAN: "IMKAN Properties",
  BEYOND: "Beyond Developments",
  "Reportage Properties": "Reportage Properties",
  "H&H Development": "H&H Development",
  "RAK Properties": "RAK Properties",
  Wasl: "Wasl Properties",
  "Majid Al Futtaim": "Majid Al Futtaim",
  Tarrad: "Tarrad Development",
  "Select Group": "Select Group",
  "Azizi Developments": "Azizi Developments",
  "Dubai Properties": "Dubai Properties",
  "Tiger Properties": "Tiger Properties",
  "London Gate": "London Gate",
  "MAG Property": "MAG Property",
  Taraf: "Taraf",
  "LIV Developers": "LIV Developers",
  "Prestige One": "Prestige One",
  "DEVMARK GROUP": "DEVMARK Group",
  "SAAS Properties": "SAAS Properties",
  "TownX Development": "TownX Development",
  "SRG Properties": "SRG Properties",
  "Alef Group": "Alef Group",
  "B.N.H Developers": "B.N.H Developers",
  "Gulf Land Developer": "Gulf Land Developer",
  "Hijazi Real Estate": "Hijazi Real Estate",
  "Orra Development": "Orra Development",
  "Condor Developers": "Condor Developers",
  "Deca Properties": "Deca Properties",
  "Expo Dubai Group": "Expo Dubai Group",
};

const TOP_DEVS = [
  { label: "Emaar Properties", href: "/developers/emaar" },
  { label: "DAMAC Properties", href: "/developers/damac" },
  { label: "Sobha Realty", href: "/developers/sobha" },
  { label: "Nakheel Properties", href: "/developers/nakheel" },
  { label: "Meraas", href: "/developers/meraas" },
  { label: "Binghatti", href: "/developers/binghatti" },
];

// ── RichMegaMenu data (О нас + Инвестиции) ─────────────────────
// 3 columns each, hand-drawn SVG icons via MMIcon kind names.
const ABOUT_COLUMNS = [
  {
    title: "Мы в соцсетях",
    items: [
      { label: "Instagram", sub: "@shangroup.ae", icon: "ig", href: "#" },
      { label: "YouTube", sub: "Видео о недвижимости", icon: "yt", href: "#" },
      { label: "Telegram", sub: "Новости и объекты", icon: "tg", href: "#" },
      { label: "WhatsApp", sub: "Написать нам", icon: "wa", href: "#" },
    ],
  },
  {
    title: "О нас",
    items: [
      { label: "О компании", sub: "Наша история и миссия", icon: "info", href: "/about" },
      { label: "Отзывы", sub: "Опыт наших клиентов", icon: "star", href: "/reviews" },
      { label: "Статьи", sub: "Полезные материалы", icon: "doc", href: "/articles" },
      { label: "Блог", sub: "Новости рынка", icon: "book", href: "/blog" },
      { label: "Вопросы и ответы", sub: "Частые вопросы", icon: "help", href: "/faq" },
    ],
  },
  {
    title: "Услуги",
    items: [
      { label: "Получение визы", sub: "Резидентские и инвесторские визы", icon: "passport", href: "/services/visa" },
      { label: "Регистрация компаний", sub: "Фрихолд и фризона", icon: "biz", href: "/services/company" },
      { label: "Банковские счета", sub: "Личные и корпоративные счета", icon: "bank", href: "/services/banking" },
      { label: "Доверенности", sub: "Оформление и нотариальное заверение", icon: "pen", href: "/services/poa" },
    ],
  },
];

const INVEST_COLUMNS = [
  {
    title: "Стратегии",
    items: [
      { label: "Off-plan стратегия", sub: "Покупка до запуска · ROI 25–40%", icon: "trend", href: "/invest/offplan" },
      { label: "Готовая аренда", sub: "Стабильный доход 6–9% годовых", icon: "key", href: "/invest/rental" },
      { label: "Краткосрочная аренда", sub: "Airbnb-формат, доход до 12%", icon: "calendar", href: "/invest/short-term" },
      { label: "Flip-стратегия", sub: "Перепродажа на handover", icon: "swap", href: "/invest/flip" },
    ],
  },
  {
    title: "Программы",
    items: [
      { label: "Golden Visa $545K+", sub: "10-летняя резидентская виза", icon: "shield", href: "/services/golden-visa" },
      { label: "Investor Visa $204K+", sub: "2-летняя инвесторская виза", icon: "passport", href: "/services/investor-visa" },
      { label: "Рассрочка 1% / месяц", sub: "От застройщика, без банка", icon: "percent", href: "/services/installment" },
      { label: "Ипотека для нерезидентов", sub: "От 25% первый взнос", icon: "bank", href: "/services/mortgage" },
    ],
  },
  {
    title: "Инструменты",
    items: [
      { label: "ROI калькулятор", sub: "Доходность за 3/5/10 лет", icon: "calc", href: "/invest/calculator" },
      { label: "Сравнение районов", sub: "Цены, аренда, рост капитала", icon: "compare", href: "/invest/compare" },
      { label: "Налоговый гид ОАЭ", sub: "0% налог на доход физлиц", icon: "doc", href: "/invest/tax" },
      { label: "Инвестиционный отчёт 2026", sub: "Прогнозы и тренды рынка", icon: "chart", href: "/invest/report" },
    ],
  },
];

function PropertiesMegaDropdown({ timeoutRef, onClose }) {
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  return (
    <div
      className={styles.mega}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <div className={styles.propertiesMegaInner}>
          {/* ── Левая колонка: типы + застройщики ── */}
          <div className={styles.propLeft}>
            <p className={styles.megaColLabel}>Объекты офф-план</p>
            <ul className={styles.propLinkList}>
              {[
                { label: "Виллы на продажу", href: "/villas" },
                { label: "Квартиры на продажу", href: "/apartments" },
                { label: "Таунхаусы на продажу", href: "/townhouses" },
                { label: "Пентхаусы на продажу", href: "/penthouses" },
                { label: "Набережная", href: "/waterfront" },
                { label: "Все новостройки", href: "/new-builds", all: true },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`${styles.megaLink} ${l.all ? styles.dropdownAccent : ""}`}
                    onClick={onClose}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className={styles.megaColLabel} style={{ marginTop: "2rem" }}>
              Топ застройщики
            </p>
            <ul className={styles.propLinkList}>
              {TOP_DEVS.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className={styles.megaLink}
                    onClick={onClose}
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/developers"
                  className={`${styles.megaLink} ${styles.dropdownAccent}`}
                  onClick={onClose}
                >
                  Все застройщики
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Центр: сетка фото + эмираты ── */}
          <div className={styles.propCenter}>
            <div className={styles.propGrid}>
              {PROPERTY_TYPES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.propGridItem}
                  onClick={onClose}
                >
                  <div className={styles.propGridImgWrap}>
                    <img
                      src={item.image}
                      alt={item.label}
                      className={styles.propGridImg}
                    />
                  </div>
                  <span className={styles.propGridLabel}>{item.label}</span>
                </Link>
              ))}
            </div>

            <p
              className={styles.megaColLabel}
              style={{ padding: "1.6rem 2.4rem 0.8rem" }}
            >
              Эмираты
            </p>
            <div className={styles.emiratesGrid}>
              {EMIRATES.map((em) => (
                <Link
                  key={em.href}
                  href={em.href}
                  className={styles.emirateCard}
                  onClick={onClose}
                >
                  <div className={styles.emirateImgWrap}>
                    <img
                      src={em.img}
                      alt={em.label}
                      className={styles.emirateImg}
                    />
                  </div>
                  <div className={styles.emirateInfo}>
                    <span className={styles.emirateName}>{em.label}</span>
                    <span className={styles.emirateCount}>
                      {em.count} объектов
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                href="/emirates"
                className={styles.emirateCard}
                onClick={onClose}
                style={{ justifyContent: "center" }}
              >
                <span className={styles.emirateName}>Все эмираты →</span>
              </Link>
            </div>
          </div>

          {/* ── Правая колонка: предложение дня ── */}
          <div className={styles.megaCol}>
            <p className={styles.megaColLabel}>Предложение дня</p>
            <Link
              href={`/${FEATURED.id}`}
              className={styles.featuredCard}
              onClick={onClose}
            >
              <div className={styles.featuredImgWrap}>
                <img
                  src={FEATURED.image}
                  alt={FEATURED.name}
                  className={styles.featuredImg}
                />
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.featuredDev}>{FEATURED.developer}</span>
                <span className={styles.featuredName}>{FEATURED.name}</span>
                <div className={styles.featuredMeta}>
                  <span>
                    {FEATURED.type} · {FEATURED.area}
                  </span>
                  <span>{FEATURED.delivery}</span>
                </div>
                <span className={styles.featuredPrice}>
                  {FEATURED.priceUsd}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Колонки сообществ: devKey ссылается на developers.json, items подтягиваются оттуда
const COMMUNITIES_COLS = [
  {
    groups: [
      { devKey: "DAMAC", label: "От DAMAC" },
      { devKey: "Emaar", label: "От EMAAR" },
    ],
  },
  {
    groups: [
      { devKey: "Sobha", label: "От SOBHA" },
      { devKey: "Nakheel", label: "От NAKHEEL" },
      { devKey: "Meraas", label: "От MERAAS" },
    ],
  },
  {
    groups: [
      { devKey: "Majid Al Futtaim", label: "Majid Al Futtaim" },
      { devKey: "Arada", label: "Arada" },
      {
        label: "Популярные районы",
        highlight: true,
        items: [
          { label: "Expo City Dubai", href: "/communities/expo-city" },
          { label: "Al Marjan Island", href: "/communities/al-marjan" },
          { label: "Dubai South", href: "/communities/dubai-south" },
          { label: "Dubai Maritime City", href: "/communities/dubai-maritime" },
          { label: "MBR City", href: "/communities/mbr-city" },
          { label: "Dubailand", href: "/communities/dubailand" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        label: null,
        items: [
          { label: "Business Bay", href: "/communities/business-bay" },
          { label: "Jumeirah Village Circle", href: "/communities/jvc" },
          { label: "Madinat Jumeirah", href: "/communities/madinat-jumeirah" },
          { label: "Al Jaddaf", href: "/communities/al-jaddaf" },
          { label: "Sheikh Zayed Road", href: "/communities/szr" },
          { label: "DIFC", href: "/communities/difc" },
          { label: "Motor City", href: "/communities/motor-city" },
          { label: "The Meadows", href: "/communities/the-meadows" },
          { label: "Dubai Investment Park", href: "/communities/dip" },
          { label: "Emirates Living", href: "/communities/emirates-living" },
        ],
      },
    ],
    showGuides: true,
  },
];

const DEV_CATEGORIES = [
  {
    key: "giant",
    iconName: "shield",
    label: "Государственные гиганты",
    desc: "Крупнейшие девелоперы ОАЭ, определяющие облик страны. Гарантия надежности, государственная поддержка и проекты мирового масштаба",
    devKeys: [
      "Emaar",
      "Nakheel",
      "Meraas",
      "Dubai Properties",
      "Aldar",
      "Wasl",
      "Majid Al Futtaim",
    ],
  },
  {
    key: "premium",
    iconName: "gem",
    label: "Премиум и люкс",
    desc: "Эксклюзивные резиденции с авторским дизайном и безупречным качеством отделки. Выбор тех, кто ценит стиль, эстетику и высокий уровень сервиса",
    devKeys: [
      "Sobha",
      "Select Group",
      "Omniyat",
      "Ellington",
      "DAMAC",
      "London Gate",
      "Taraf",
      "LIV Developers",
    ],
  },
  {
    key: "growth",
    iconName: "flame",
    label: "Инвестиционные",
    desc: "Застройщики с самыми гибкими планами платежей (от 1% в месяц) и высокой скоростью строительства. Идеально для максимизации арендной доходности",
    devKeys: [
      "Binghatti",
      "Danube",
      "Samana",
      "Azizi Developments",
      "Tiger Properties",
      "Reportage Properties",
      "MAG Property",
      "Imtiaz",
    ],
  },
  {
    key: "boutique",
    iconName: "sparkles",
    label: "Бутик и новые звёзды",
    desc: "Молодые и амбициозные компании с фокусом на технологии умного дома, современную архитектуру и перспективные локации для роста цены",
    devKeys: [
      "Object 1",
      "Iman Developers",
      "Arada",
      "RAK Properties",
      "BEYOND",
      "TownX Development",
      "Prestige One",
      "Alef Group",
    ],
  },
];

function devHref(key) {
  return `/developers/${key.toLowerCase().replace(/[\s.&]+/g, "-")}`;
}

// Map our existing iconName values onto the CategoryMegaMenu icon kinds
// (shield/diamond/trend/spark — the artifact's CatIcon set).
const DEV_ICON_MAP = {
  shield: "shield",
  gem: "diamond",
  flame: "trend",
  sparkles: "spark",
};

// Adapter: turn DEV_CATEGORIES into CategoryMegaMenu's `categories` shape.
const DEVELOPERS_MEGA_CATEGORIES = DEV_CATEGORIES.map((c) => ({
  key: c.key,
  icon: DEV_ICON_MAP[c.iconName] || "shield",
  title: c.label,
  desc: c.desc,
  items: c.devKeys.map((k) => ({
    label: DEV_DISPLAY_NAMES[k] || k,
    href: devHref(k),
  })),
}));

// ── DistrictsMegaMenu data ─────────────────────────────────
const slugDistrict = (s) =>
  `/communities/${s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[\s.]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;

const DISTRICTS_GROUPS = [
  {
    dev: "DAMAC",
    icon: "D",
    items: [
      "DAMAC Islands 2",
      "DAMAC Riverside",
      "DAMAC Hills 2",
      "DAMAC Lagoons",
      "DAMAC Hills",
      "Sun City",
    ],
  },
  {
    dev: "EMAAR",
    icon: "E",
    items: [
      "Emaar South",
      "The Oasis",
      "The Valley",
      "Dubai Hills Estate",
      "Rashid Yachts & Marina",
      "Emaar Beachfront",
      "Dubai Creek Harbour",
      "Arabian Ranches III",
      "Downtown Dubai",
      "The Heights",
      "Grand Polo Club & Resort",
    ],
  },
  {
    dev: "SOBHA",
    icon: "S",
    items: [
      "Sobha Siniya Island",
      "Sobha Elwood",
      "Sobha Reserve",
      "Sobha Hartland II",
      "Sobha Hartland",
    ],
  },
  {
    dev: "NAKHEEL",
    icon: "N",
    items: [
      "Dubai Islands",
      "Palm Jebel Ali",
      "Deira Islands",
      "Palm Jumeirah",
      "Jumeirah Village Circle",
    ],
  },
  {
    dev: "MERAAS",
    icon: "M",
    items: [
      "The Acres",
      "Bluewaters Island",
      "Port de la Mer",
      "City Walk",
      "Cherrywoods",
    ],
  },
  {
    dev: "MAJID AL FUTTAIM",
    icon: "F",
    items: ["Tilal Al Ghaf", "Ghaf Woods", "Al Zahia"],
  },
  {
    dev: "ARADA",
    icon: "A",
    items: ["Masaar", "Aljada", "Jouri Hills"],
  },
].map((g) => ({
  ...g,
  items: g.items.map((label) => ({ label, href: slugDistrict(label) })),
}));

// ── PropertiesMegaMenu data ────────────────────────────────
// Uses existing FEATURED + TOP_DEVS + EMIRATES + PROPERTY_TYPES, plus
// a small static list for "Объекты офф-план" with item counts.
const PROPERTIES_OFFPLAN = [
  { label: "Виллы на продажу", href: "/villas", count: "248" },
  { label: "Апартаменты на продажу", href: "/apartments", count: "1,840" },
  { label: "Таунхаусы на продажу", href: "/townhouses", count: "412" },
  { label: "Пентхаусы на продажу", href: "/penthouses", count: "96" },
  { label: "Набережная (Waterfront)", href: "/waterfront", count: "284" },
  { label: "Все новостройки", href: "/new-builds", all: true },
];

const DISTRICTS_POPULAR = [
  "Expo City Dubai",
  "Al Marjan Island",
  "Dubai South",
  "Dubai Maritime City",
  "MBR City",
  "Dubailand",
  "Business Bay",
  "Jumeirah Village Circle",
  "Madinat Jumeirah",
  "Al Jaddaf",
  "Sheikh Zayed Road",
  "DIFC",
  "Motor City",
  "The Meadows",
  "Dubai Investment Park",
  "Emirates Living",
].map((label) => ({ label, href: slugDistrict(label) }));

function DevelopersMegaDropdown({ timeoutRef, onClose }) {
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  return (
    <div
      className={styles.mega}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <div className={styles.communitiesGrid}>
          {DEV_CATEGORIES.map((cat, ci) => (
            <div key={cat.key} className={styles.communityCol}>
              <div className={styles.communityGroup}>
                <p className={styles.communityGroupLabel}>
                  {cat.iconName && (
                    <Icon name={cat.iconName} color="gray" size="md" />
                  )}
                  {cat.label}
                </p>
                <p className={styles.communityGroupDesc}>{cat.desc}</p>
                <ul className={styles.communityList}>
                  {cat.devKeys.map((key) => (
                    <li key={key}>
                      <Link
                        href={devHref(key)}
                        className={styles.megaLink}
                        onClick={onClose}
                      >
                        {DEV_DISPLAY_NAMES[key] || key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {ci === DEV_CATEGORIES.length - 1 && (
                <div className={styles.communityGuidesBtnWrap}>
                  <DropdownNavButton
                    href="/developers"
                    label="Все застройщики"
                    onClick={onClose}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function CommunitiesMegaDropdown({ timeoutRef, onClose }) {
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  return (
    <div
      className={styles.mega}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <div className={styles.communitiesGrid}>
          {COMMUNITIES_COLS.map((col, ci) => (
            <div key={ci} className={styles.communityCol}>
              {col.groups.map((group, gi) => {
                const dev = group.devKey ? DEVELOPERS[group.devKey] : null;
                const items = dev ? dev.communities : group.items;
                return (
                  <div key={gi} className={styles.communityGroup}>
                    {group.label && (
                      <p
                        className={`${styles.communityGroupLabel} ${group.highlight ? styles.dropdownAccent : ""}`}
                      >
                        {dev?.logo && (
                          <img
                            src={dev.logo}
                            alt={group.devKey}
                            className={styles.communityGroupLogo}
                            style={{
                              width: "2.4rem",
                              height: "2.4rem",
                              minWidth: "2.4rem",
                              maxWidth: "2.4rem",
                              borderRadius: "0.5rem",
                              objectFit: "cover",
                              flexShrink: 0,
                              border: "1px solid var(--line)",
                            }}
                          />
                        )}
                        {group.label}
                      </p>
                    )}
                    <ul className={styles.communityList}>
                      {items?.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={styles.megaLink}
                            onClick={onClose}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              {col.showGuides && (
                <div className={styles.communityGuidesBtnWrap}>
                  <DropdownNavButton
                    href="/communities"
                    label="Гиды по районам"
                    onClick={onClose}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function useHoverDropdown(timeoutRef, onOpen, onClose) {
  return {
    handleMouseEnter: () => {
      clearTimeout(timeoutRef.current);
      onOpen();
    },
    handleMouseLeave: () => {
      timeoutRef.current = setTimeout(onClose, 150);
    },
  };
}

function NavItem({ item, open, onOpen, onClose, timeoutRef }) {
  const { handleMouseEnter, handleMouseLeave } = useHoverDropdown(
    timeoutRef,
    onOpen,
    onClose,
  );

  if (!item.dropdown && !item.type) {
    return (
      <li onMouseEnter={onClose}>
        <Link href={item.href} className={styles.link}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={styles.dropdownWrap}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={`${styles.link} ${open ? styles.linkActive : ""}`}>
        {item.label}
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
    </li>
  );
}

function MegaDropdown({ item, timeoutRef, onClose }) {
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  if (!item?.dropdown) return null;

  return (
    <div
      className={styles.mega}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <div className={styles.megaInner}>
          {/* ── Левая колонка: соцсети ── */}
          <div className={styles.megaCol}>
            <p className={styles.megaColLabel}>Мы в соцсетях</p>
            <ul className={styles.megaList}>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className={styles.dropdownLink}
                    onClick={onClose}
                  >
                    <Icon name={s.iconName} color="gray" size="md" />
                    <span className={styles.dropdownText}>
                      <span className={styles.dropdownTitle}>{s.label}</span>
                      <span className={styles.dropdownDesc}>{s.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Центральная колонка: навигация ── */}
          <div className={`${styles.megaCol} ${styles.megaColMiddle}`}>
            <p className={styles.megaColLabel}>{item.label}</p>
            <ul className={styles.megaList}>
              {item.dropdown.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className={styles.dropdownLink}
                    onClick={onClose}
                  >
                    <Icon name={d.iconName} color="gray" size="md" />
                    <span className={styles.dropdownText}>
                      <span className={styles.dropdownTitle}>{d.label}</span>
                      {d.desc && (
                        <span className={styles.dropdownDesc}>{d.desc}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Правая колонка: услуги или предложение дня ── */}
          <div className={styles.megaCol}>
            {item.services ? (
              <>
                <p className={styles.megaColLabel}>Услуги</p>
                <ul className={styles.megaList}>
                  {item.services.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className={styles.dropdownLink}
                        onClick={onClose}
                      >
                        <Icon name={s.iconName} color="gray" size="md" />
                        <span className={styles.dropdownText}>
                          <span className={styles.dropdownTitle}>
                            {s.label}
                          </span>
                          {s.desc && (
                            <span className={styles.dropdownDesc}>
                              {s.desc}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className={styles.megaColLabel}>Предложение дня</p>
                <Link
                  href={`/${FEATURED.id}`}
                  className={styles.featuredCard}
                  onClick={onClose}
                >
                  <div className={styles.featuredImgWrap}>
                    <img
                      src={FEATURED.image}
                      alt={FEATURED.name}
                      className={styles.featuredImg}
                    />
                  </div>
                  <div className={styles.featuredBody}>
                    <span className={styles.featuredDev}>
                      {FEATURED.developer}
                    </span>
                    <span className={styles.featuredName}>{FEATURED.name}</span>
                    <div className={styles.featuredMeta}>
                      <span>
                        {FEATURED.type} · {FEATURED.area}
                      </span>
                      <span>{FEATURED.delivery}</span>
                    </div>
                    <span className={styles.featuredPrice}>
                      {FEATURED.priceUsd}
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ── PillDropdown (язык / валюта) ──
   primary  → big line in dropdown (Montserrat 500)
   secondary → small mono kicker beneath (12px JetBrains Mono) */
const languages = [
  { code: "RU", label: "Русский", countryCode: "RU", primary: "Русский", secondary: "RU" },
  { code: "EN", label: "English", countryCode: "GB", primary: "English", secondary: "EN" },
  { code: "AR", label: "العربية", countryCode: "AE", primary: "العربية", secondary: "AR" },
];
const currencies = [
  { code: "USD", label: "Доллар США", countryCode: "US", primary: "USD", secondary: "Доллар США" },
  { code: "EUR", label: "Евро", countryCode: "EU", primary: "EUR", secondary: "Евро" },
  { code: "RUB", label: "Российский рубль", countryCode: "RU", primary: "RUB", secondary: "Российский рубль" },
  { code: "AED", label: "Дирхам ОАЭ", countryCode: "AE", primary: "AED", secondary: "Дирхам ОАЭ" },
];

function PillDropdown({
  items,
  current,
  onSelect,
  renderTrigger,
  timeoutRef,
  open,
  onOpen,
  onClose,
}) {
  const { handleMouseEnter, handleMouseLeave } = useHoverDropdown(
    timeoutRef,
    onOpen,
    onClose,
  );
  return (
    <div
      className={styles.pillWrap}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.pillBtn}>
        {renderTrigger(current)}
        <ChevronDown
          size={13}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
      {open && (
        <div className={styles.pillDropdownPanel}>
          <ul className={styles.megaList}>
            {items.map((item) => {
              const active = current.code === item.code;
              return (
                <li key={item.code}>
                  <button
                    className={`${styles.pillItem} ${active ? styles.pillItemActive : ""}`}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                  >
                    <Flag code={item.countryCode} size={20} />
                    <span className={styles.pillItemText}>
                      <span className={styles.pillItemPrimary}>
                        {item.primary || item.code}
                      </span>
                      {item.secondary && (
                        <span className={styles.pillItemSecondary}>
                          {item.secondary}
                        </span>
                      )}
                    </span>
                    {active && (
                      <span className={styles.pillItemCheck} aria-hidden>
                        ✓
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function LangSelector({ timeoutRef, open, onOpen, onClose, value, onChange }) {
  const current = languages.find((l) => l.code === value) || languages[0];
  return (
    <PillDropdown
      items={languages}
      current={current}
      onSelect={(l) => onChange(l.code)}
      timeoutRef={timeoutRef}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      renderTrigger={(c) => (
        <>
          <Flag code={c.countryCode} size={18} />
          <span>{c.code}</span>
        </>
      )}
    />
  );
}

function CurrencySelector({
  timeoutRef,
  open,
  onOpen,
  onClose,
  value,
  onChange,
}) {
  const current =
    currencies.find((c) => c.code === value) || currencies[0];
  return (
    <PillDropdown
      items={currencies}
      current={current}
      onSelect={(c) => onChange(c.code)}
      timeoutRef={timeoutRef}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      renderTrigger={(c) => <span>{c.code}</span>}
    />
  );
}

/* ── Burger drawer (mobile) ────────────────────────────────
   Overlay + right-anchored drawer, with search-filtered nav
   (numbered icons), expandable sections, settings (Lang /
   Currency / Theme as segmented controls), and footer CTA.
   Mirrors the artifact's BurgerMenu structure. */

const BURGER_NAV = [
  {
    label: "Новостройки ОАЭ",
    icon: "01",
    items: [
      { label: "Все объекты", href: "/new-builds", arrow: true },
      { label: "Готовые", href: "/ready" },
      { label: "Off-plan", href: "/off-plan" },
      { label: "Апартаменты", href: "/apartments" },
      { label: "Виллы", href: "/villas" },
      { label: "Пентхаусы", href: "/penthouses" },
      { label: "Таунхаусы", href: "/townhouses" },
    ],
  },
  {
    label: "Районы",
    icon: "02",
    items: [
      { label: "Dubai Marina", href: "/communities/dubai-marina" },
      { label: "Palm Jumeirah", href: "/communities/palm-jumeirah" },
      { label: "Downtown Dubai", href: "/communities/downtown" },
      { label: "Business Bay", href: "/communities/business-bay" },
      { label: "JVC", href: "/communities/jvc" },
      { label: "Все районы", href: "/communities", arrow: true },
    ],
  },
  {
    label: "Застройщики",
    icon: "03",
    items: [
      { label: "EMAAR", href: "/developers/emaar" },
      { label: "DAMAC", href: "/developers/damac" },
      { label: "SOBHA", href: "/developers/sobha" },
      { label: "NAKHEEL", href: "/developers/nakheel" },
      { label: "MERAAS", href: "/developers/meraas" },
      { label: "Все застройщики", href: "/developers", arrow: true },
    ],
  },
  {
    label: "Инвестиции",
    icon: "04",
    items: [
      { label: "ROI калькулятор", href: "/invest/calculator" },
      { label: "Golden Visa", href: "/services/golden-visa" },
      { label: "Ипотека", href: "/services/mortgage" },
      { label: "Налоги", href: "/invest/tax" },
      { label: "Управление", href: "/services/management" },
    ],
  },
  {
    label: "О нас",
    icon: "05",
    items: [
      { label: "О компании", href: "/about" },
      { label: "Команда", href: "/team" },
      { label: "Услуги", href: "/services" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
];

function SegPicker({ options, value, onChange }) {
  return (
    <div className={styles.segPicker}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`${styles.segItem} ${active ? styles.segItemActive : ""}`}
          >
            {o.icon}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function BurgerDrawer({
  open,
  onClose,
  onContact,
  language,
  setLanguage,
  currency,
  setCurrency,
  theme,
  setTheme,
}) {
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      setQuery("");
      return;
    }
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const q = query.trim().toLowerCase();
  const filteredNav = q
    ? BURGER_NAV.map((s) => ({
        ...s,
        items: s.items.filter((it) => it.label.toLowerCase().includes(q)),
      })).filter(
        (s) => s.items.length > 0 || s.label.toLowerCase().includes(q),
      )
    : BURGER_NAV;

  return (
    <>
      <div
        onClick={onClose}
        className={`${styles.burgerBackdrop} ${open ? styles.burgerBackdropOpen : ""}`}
      />
      <aside
        className={`${styles.burgerDrawer} ${open ? styles.burgerDrawerOpen : ""}`}
      >
        {/* Header */}
        <div className={styles.burgerHeader}>
          <div>
            <div className={styles.burgerTitle}>Меню</div>
            <div className={styles.burgerSub}>ShanGroup · Dubai</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.burgerClose}
            aria-label="Закрыть"
          >
            <IcClose size={16} />
          </button>
        </div>

        {/* Search */}
        <div className={styles.burgerSearchWrap}>
          <div className={styles.burgerSearch}>
            <span className={styles.burgerSearchIcon}>
              <IcSearch size={15} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по меню, районам, застройщикам…"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={styles.burgerSearchClear}
                aria-label="Очистить"
              >
                <IcClose size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable nav */}
        <div className={styles.burgerScroll}>
          {filteredNav.length === 0 ? (
            <div className={styles.burgerEmpty}>Ничего не найдено</div>
          ) : (
            filteredNav.map((s, idx) => {
              const isOpen = expanded === idx || !!q;
              return (
                <div key={s.label} className={styles.burgerSection}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(isOpen && !q ? null : idx)
                    }
                    className={`${styles.burgerSectionBtn} ${isOpen ? styles.burgerSectionBtnOpen : ""}`}
                  >
                    <span className={styles.burgerSectionIcon}>
                      {s.icon}
                    </span>
                    <span className={styles.burgerSectionLabel}>
                      {s.label}
                    </span>
                    {!q && (
                      <ChevronDown
                        size={13}
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                      />
                    )}
                  </button>
                  {isOpen && (
                    <div className={styles.burgerSubList}>
                      {s.items.map((it) => (
                        <Link
                          key={it.label}
                          href={it.href || "#"}
                          onClick={onClose}
                          className={`${styles.burgerSubItem} ${it.arrow ? styles.burgerSubItemAccent : ""}`}
                        >
                          {it.label}
                          {it.arrow ? " →" : ""}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Settings */}
          <div className={styles.burgerSettings}>
            <div className={styles.burgerSettingsLabel}>Настройки</div>
            <div className={styles.burgerSettingRow}>
              <span className={styles.burgerSettingName}>Язык</span>
              <SegPicker
                value={language}
                onChange={setLanguage}
                options={languages.map((l) => ({
                  value: l.code,
                  icon: <Flag code={l.countryCode} size={14} />,
                  label: l.code,
                }))}
              />
            </div>
            <div className={styles.burgerSettingRow}>
              <span className={styles.burgerSettingName}>Валюта</span>
              <SegPicker
                value={currency}
                onChange={setCurrency}
                options={currencies.map((c) => ({
                  value: c.code,
                  icon: <Flag code={c.countryCode} size={14} />,
                  label: c.code,
                }))}
              />
            </div>
            <div className={styles.burgerSettingRow}>
              <span className={styles.burgerSettingName}>Тема</span>
              <SegPicker
                value={theme}
                onChange={setTheme}
                options={[
                  {
                    value: "light",
                    icon: <Sun size={13} />,
                    label: "Светлая",
                  },
                  {
                    value: "dark",
                    icon: <Moon size={13} />,
                    label: "Тёмная",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className={styles.burgerFooter}>
          <PrimaryButton
            size="md"
            fullWidth
            icon={<IcPhone />}
            onClick={onContact}
          >
            Связаться с агентом
          </PrimaryButton>
          <div className={styles.burgerFooterMeta}>
            <span>+971 4 261 8838</span>
            <span>RERA #2087</span>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ── Root Navigation ── */
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useState("RU");
  const [currency, setCurrency] = useState("USD");
  const navTimeoutRef = useRef(null);
  const closeNav = () => setActiveNav(null);
  const pathname = usePathname();

  // Hydrate language/currency from localStorage on mount; persist on change.
  useEffect(() => {
    try {
      const lang = localStorage.getItem("shan-lang");
      const curr = localStorage.getItem("shan-currency");
      if (lang) setLanguage(lang);
      if (curr) setCurrency(curr);
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("shan-lang", language);
    } catch {
      /* */
    }
  }, [language]);
  useEffect(() => {
    try {
      localStorage.setItem("shan-currency", currency);
    } catch {
      /* */
    }
  }, [currency]);

  const activeItem = typeof activeNav === "number" ? navItems[activeNav] : null;

  return (
    <>
      {activeNav !== null && (
        <div className={styles.overlay} onClick={closeNav} />
      )}
      <header className={styles.header}>
        <Container>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="ShanGroup" className={styles.logoImg} />
            </Link>

            <ul className={styles.links}>
              {navItems.map((item, i) => (
                <NavItem
                  key={item.label}
                  item={item}
                  open={activeNav === i}
                  onOpen={() => setActiveNav(i)}
                  onClose={closeNav}
                  timeoutRef={navTimeoutRef}
                />
              ))}
            </ul>

            <div className={styles.actions}>
              <LangSelector
                timeoutRef={navTimeoutRef}
                open={activeNav === "lang"}
                onOpen={() => setActiveNav("lang")}
                onClose={closeNav}
                value={language}
                onChange={setLanguage}
              />
              <CurrencySelector
                timeoutRef={navTimeoutRef}
                open={activeNav === "currency"}
                onOpen={() => setActiveNav("currency")}
                onClose={closeNav}
                value={currency}
                onChange={setCurrency}
              />
              <ThemeToggle
                theme={theme}
                onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <LikeButton
                href="/favorites"
                variant="nav"
                isLiked={pathname === "/favorites"}
              />
              <ContactButton
                href="tel:+97142618838"
                label="Связаться"
                icon="phone-call"
              />
              <button
                type="button"
                className={styles.burger}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Generic 3-column MegaDropdown — only for items that don't have a
            dedicated mega-menu component (currently nothing on the home nav).
            All five typed items render their own dedicated component below. */}
        {activeItem?.dropdown && !activeItem.type && (
          <MegaDropdown
            item={activeItem}
            timeoutRef={navTimeoutRef}
            onClose={closeNav}
          />
        )}
        {activeItem?.type === "communities" && (
          <DistrictsMegaMenu
            open
            onClose={closeNav}
            groups={DISTRICTS_GROUPS}
            popular={DISTRICTS_POPULAR}
            ctaLabel="Гиды по районам"
            ctaHref="/communities"
            onMouseEnter={() => clearTimeout(navTimeoutRef.current)}
            onMouseLeave={() => {
              navTimeoutRef.current = setTimeout(closeNav, 150);
            }}
          />
        )}
        {activeItem?.type === "developers" && (
          <CategoryMegaMenu
            open
            onClose={closeNav}
            label="Застройщики"
            categories={DEVELOPERS_MEGA_CATEGORIES}
            ctaLabel="Все застройщики"
            ctaHref="/developers"
            onMouseEnter={() => clearTimeout(navTimeoutRef.current)}
            onMouseLeave={() => {
              navTimeoutRef.current = setTimeout(closeNav, 150);
            }}
          />
        )}
        {activeItem?.type === "properties" && (
          <PropertiesMegaMenu
            open
            onClose={closeNav}
            data={{
              offplan: PROPERTIES_OFFPLAN,
              developers: TOP_DEVS,
              ctaAllDevelopers: {
                label: "Все застройщики",
                href: "/developers",
              },
              types: PROPERTY_TYPES.slice(0, 5).map((t) => ({
                label: t.label,
                img: t.image,
                href: t.href,
              })),
              areas: PROPERTY_TYPES.slice(5, 10).map((t) => ({
                label: t.label,
                img: t.image,
                href: t.href,
              })),
              emirates: EMIRATES.map((e) => ({
                label: e.label,
                count: `${e.count} объектов`,
                img: e.img,
                href: e.href,
              })),
              ctaAllEmirates: { label: "Все эмираты", href: "/emirates" },
              featured: {
                brand: FEATURED.developer,
                name: FEATURED.name,
                meta: `${FEATURED.type} · ${FEATURED.area} · ${FEATURED.delivery}`,
                price: FEATURED.priceUsd,
                img: FEATURED.image,
                href: `/${FEATURED.id}`,
              },
            }}
            onMouseEnter={() => clearTimeout(navTimeoutRef.current)}
            onMouseLeave={() => {
              navTimeoutRef.current = setTimeout(closeNav, 150);
            }}
          />
        )}
        {activeItem?.type === "invest" && (
          <RichMegaMenu
            open
            onClose={closeNav}
            label="Инвестиции"
            columns={INVEST_COLUMNS}
            onMouseEnter={() => clearTimeout(navTimeoutRef.current)}
            onMouseLeave={() => {
              navTimeoutRef.current = setTimeout(closeNav, 150);
            }}
          />
        )}
        {activeItem?.type === "about" && (
          <RichMegaMenu
            open
            onClose={closeNav}
            label="О нас"
            columns={ABOUT_COLUMNS}
            onMouseEnter={() => clearTimeout(navTimeoutRef.current)}
            onMouseLeave={() => {
              navTimeoutRef.current = setTimeout(closeNav, 150);
            }}
          />
        )}
      </header>

      {/* Mobile burger drawer — search + numbered nav + settings + footer CTA */}
      <BurgerDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onContact={() => {
          setFormOpen(true);
          setMenuOpen(false);
        }}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        theme={theme}
        setTheme={setTheme}
      />

      <PopupForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
