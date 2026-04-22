"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Flag from "react-world-flags";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
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
    label: "О нас",
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
                              border: "1px solid #e8e3da",
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

/* ── PillDropdown (язык / валюта) ── */
const languages = [
  { code: "RU", label: "Русский", countryCode: "RU" },
  { code: "EN", label: "English", countryCode: "GB" },
  { code: "AR", label: "العربية", countryCode: "AE" },
];
const currencies = [
  { code: "USD", label: "Доллар США", countryCode: "US" },
  { code: "EUR", label: "Евро", countryCode: "EU" },
  { code: "RUB", label: "Российский рубль", countryCode: "RU" },
  { code: "AED", label: "Дирхам ОАЭ", countryCode: "AE" },
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
            {items.map((item) => (
              <li key={item.code}>
                <button
                  className={`${styles.pillItem} ${current.code === item.code ? styles.pillItemActive : ""}`}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Flag
                    code={item.countryCode}
                    style={{
                      width: 22,
                      height: 15,
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  />
                  <span className={styles.dropdownText}>
                    <span className={styles.pillItemCode}>{item.code}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function LangSelector({ timeoutRef, open, onOpen, onClose }) {
  const [current, setCurrent] = useState(languages[0]);
  return (
    <PillDropdown
      items={languages}
      current={current}
      onSelect={setCurrent}
      timeoutRef={timeoutRef}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      renderTrigger={(c) => (
        <>
          <Flag
            code={c.countryCode}
            style={{ width: 20, height: 14, borderRadius: 2 }}
          />
          <span>{c.code}</span>
        </>
      )}
    />
  );
}

function CurrencySelector({ timeoutRef, open, onOpen, onClose }) {
  const [current, setCurrent] = useState(currencies[0]);
  return (
    <PillDropdown
      items={currencies}
      current={current}
      onSelect={setCurrent}
      timeoutRef={timeoutRef}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      renderTrigger={(c) => <span>{c.code}</span>}
    />
  );
}

/* ── Root Navigation ── */
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const navTimeoutRef = useRef(null);
  const closeNav = () => setActiveNav(null);
  const pathname = usePathname();

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
              />
              <CurrencySelector
                timeoutRef={navTimeoutRef}
                open={activeNav === "currency"}
                onOpen={() => setActiveNav("currency")}
                onClose={closeNav}
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

        {/* Мега-дропдаун — на всю ширину, дочерний к header */}
        {activeItem?.dropdown && (
          <MegaDropdown
            item={activeItem}
            timeoutRef={navTimeoutRef}
            onClose={closeNav}
          />
        )}
        {activeItem?.type === "communities" && (
          <CommunitiesMegaDropdown
            timeoutRef={navTimeoutRef}
            onClose={closeNav}
          />
        )}
        {activeItem?.type === "developers" && (
          <DevelopersMegaDropdown
            timeoutRef={navTimeoutRef}
            onClose={closeNav}
          />
        )}
        {activeItem?.type === "properties" && (
          <PropertiesMegaDropdown
            timeoutRef={navTimeoutRef}
            onClose={closeNav}
          />
        )}

        {/* Мобильное меню */}
        {menuOpen && (
          <div className={styles.mobile}>
            {/* ── Недвижимость ── */}
            <p className={styles.mobileSectionLabel}>Недвижимость</p>
            <div className={styles.mobileCard}>
              <button
                type="button"
                className={styles.mobileRow}
                onClick={() =>
                  setMobileSection(
                    mobileSection === "properties" ? null : "properties",
                  )
                }
              >
                <span>Новостройки ОАЭ</span>
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${mobileSection === "properties" ? styles.chevronOpen : ""}`}
                />
              </button>
              {mobileSection === "properties" && (
                <div className={styles.mobileSubList}>
                  {navItems[0].dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      className={styles.mobileSub}
                      onClick={() => setMenuOpen(false)}
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className={styles.mobileCardDivider} />
              <Link
                href="/communities"
                className={styles.mobileRow}
                onClick={() => setMenuOpen(false)}
              >
                <span>Районы</span>
                <ChevronRight size={16} className={styles.mobileChevron} />
              </Link>
              <div className={styles.mobileCardDivider} />
              <Link
                href="/developers"
                className={styles.mobileRow}
                onClick={() => setMenuOpen(false)}
              >
                <span>Застройщики</span>
                <ChevronRight size={16} className={styles.mobileChevron} />
              </Link>
            </div>

            {/* ── О нас ── */}
            <p className={styles.mobileSectionLabel}>О нас</p>
            <div className={styles.mobileCard}>
              {navItems[3].dropdown.map((d, i) => (
                <div key={d.href}>
                  {i > 0 && <div className={styles.mobileCardDivider} />}
                  <Link
                    href={d.href}
                    className={styles.mobileRow}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{d.label}</span>
                    <ChevronRight size={16} className={styles.mobileChevron} />
                  </Link>
                </div>
              ))}
            </div>

            {/* ── Услуги ── */}
            <p className={styles.mobileSectionLabel}>Услуги</p>
            <div className={styles.mobileCard}>
              {navItems[3].services.map((s, i) => (
                <div key={s.href}>
                  {i > 0 && <div className={styles.mobileCardDivider} />}
                  <Link
                    href={s.href}
                    className={styles.mobileRow}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{s.label}</span>
                    <ChevronRight size={16} className={styles.mobileChevron} />
                  </Link>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.mobileCtaBtn}
              onClick={() => {
                setFormOpen(true);
                setMenuOpen(false);
              }}
            >
              Оставить заявку
            </button>
          </div>
        )}
      </header>

      <PopupForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
