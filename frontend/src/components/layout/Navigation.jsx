"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Flag from "@/components/Flag/Flag";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import RichMegaMenu from "@/components/RichMegaMenu/RichMegaMenu";
import CategoryMegaMenu from "@/components/CategoryMegaMenu/CategoryMegaMenu";
import DistrictsMegaMenu from "@/components/DistrictsMegaMenu/DistrictsMegaMenu";
import PropertiesMegaMenu from "@/components/PropertiesMegaMenu/PropertiesMegaMenu";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { useLocale } from "@/context/I18nProvider";
// Lucide kept for hamburger (Menu) and burger toggle X — purely utility,
// not part of the editorial icon language. ChevronDown/Right also stay
// lucide for now (used in many places with consistent visual weight).
// Sun/Moon used in the BurgerDrawer theme SegPicker (HeroIcons doesn't ship them).
import { ChevronDown, ChevronRight, Menu, X, Sun, Moon } from "lucide-react";
import { IcSearch, IcClose, IcPhone } from "@/components/HeroIcons/HeroIcons";
import LikeButton from "@/components/LikeButton/LikeButton";
import Icon from "@/components/Icon/Icon";
import Container from "./Container";
import PopupForm from "../PopupForm/PopupForm";
import ContactButton from "@/components/ContactButton/ContactButton";
import DropdownNavButton from "@/components/DropdownNavButton/DropdownNavButton";
import PROPERTIES from "@/data/i18n/ru/properties/objects.json";
import DEVELOPERS from "@/data/i18n/ru/people/developers.json";
import { buildEmirateCounts } from "@/utils/properties";
import styles from "./Navigation.module.css";

const FEATURED = PROPERTIES[0];

function buildSocials(tNav) {
  return [
    { label: tNav("socials.instagram.label"), href: "#", iconName: "instagram", desc: tNav("socials.instagram.desc") },
    { label: tNav("socials.youtube.label"),   href: "#", iconName: "youtube",   desc: tNav("socials.youtube.desc") },
    { label: tNav("socials.telegram.label"),  href: "#", iconName: "send",      desc: tNav("socials.telegram.desc") },
    { label: tNav("socials.whatsapp.label"),  href: "#", iconName: "message",   desc: tNav("socials.whatsapp.desc") },
  ];
}

// Helper: builds a {label, desc} from translation keys with given href/icon.
const tld = (tNav, key, href, iconName) => ({
  label: tNav(`${key}.label`),
  desc: tNav(`${key}.desc`),
  href,
  iconName,
});

function buildNavItems(tNav) {
  return [
    {
      label: tNav("menu.newbuilds"),
      type: "properties",
      dropdown: [
        tld(tNav, "newbuilds.apartments", "/apartments", "building-2"),
        tld(tNav, "newbuilds.villas", "/villas", "home"),
        tld(tNav, "newbuilds.byLocation", "/communities", "map-pin"),
        tld(tNav, "newbuilds.byDeveloper", "/developers", "briefcase"),
        tld(tNav, "newbuilds.abuDhabi", "/abu-dhabi", "building"),
        tld(tNav, "newbuilds.sharjah", "/sharjah", "landmark"),
      ],
    },
    { label: tNav("menu.communities"), type: "communities", href: "/communities" },
    { label: tNav("menu.developers"), type: "developers", href: "/developers" },
    {
      label: tNav("menu.invest"),
      type: "invest",
      services: [
        tld(tNav, "invest.goldenVisa", "/golden-visa", "shield"),
        tld(tNav, "invest.investorVisa", "/investor-visa", "file-text"),
        tld(tNav, "invest.installment", "/installment", "credit-card"),
        tld(tNav, "invest.mortgage", "/mortgage", "briefcase"),
      ],
      dropdown: [
        tld(tNav, "invest.offplan", "/off-plan", "trending-up"),
        tld(tNav, "invest.rental", "/ready-rentals", "home"),
        tld(tNav, "invest.shortTerm", "/airbnb", "calendar"),
        tld(tNav, "invest.flip", "/flip", "info"),
        tld(tNav, "invest.calculator", "/roi-calculator", "file-text"),
        tld(tNav, "invest.tax", "/uae-tax-guide", "info"),
      ],
    },
    {
      label: tNav("menu.about"),
      type: "about",
      services: [
        tld(tNav, "services.visa", "/services/visa", "file-text"),
        tld(tNav, "services.company", "/services/company", "briefcase"),
        tld(tNav, "services.banking", "/services/banking", "credit-card"),
        tld(tNav, "services.poa", "/services/poa", "pen-line"),
      ],
      dropdown: [
        tld(tNav, "about.company", "/about", "info"),
        tld(tNav, "about.reviews", "/reviews", "star"),
        tld(tNav, "about.articles", "/articles", "file-text"),
        tld(tNav, "about.blog", "/blog", "book-open"),
        tld(tNav, "about.faq", "/faq", "help-circle"),
      ],
    },
  ];
}

// Эмираты подтягиваем из единого реестра — счётчики и URL обновляются
// автоматически при добавлении новых записей в JSON-файлы недвижимости.
const EMIRATES = buildEmirateCounts().map((e) => ({
  label: e.name,
  count: e.count,
  href: e.href,
  img: e.image,
}));

function buildPropertyTypes(tNav) {
  return [
    {
      label: tNav("propTypes.villas"),
      href: "/villas",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1774280298/ChatGPT_Image_Mar_23_2026_04_28_29_PM_trpvu5.png",
    },
    {
      label: tNav("propTypes.apartments"),
      href: "/apartments",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1774542871/Lumea_Residences_at_Dubai_Islands_aijk8j.webp",
    },
    {
      label: tNav("propTypes.townhouses"),
      href: "/townhouses",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775318360/townhouse_hxob4w.png",
    },
    {
      label: tNav("propTypes.penthouses"),
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
    {
      label: tNav("propTypes.waterfront"),
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
}

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

// Helper: builds a {label, sub, icon, href} from translation keys.
const tls = (tNav, key, icon, href) => ({
  label: tNav(`${key}.label`),
  sub: tNav(`${key}.desc`),
  icon,
  href,
});

function buildAboutColumns(tNav) {
  return [
    {
      title: tNav("mega.ourSocials"),
      items: [
        tls(tNav, "socials.instagram", "ig", "#"),
        tls(tNav, "socials.youtube", "yt", "#"),
        tls(tNav, "socials.telegram", "tg", "#"),
        tls(tNav, "socials.whatsapp", "wa", "#"),
      ],
    },
    {
      title: tNav("mega.ourCompany"),
      items: [
        tls(tNav, "about.company", "info", "/about"),
        tls(tNav, "about.reviews", "star", "/reviews"),
        tls(tNav, "about.articles", "doc", "/articles"),
        tls(tNav, "about.blog", "book", "/blog"),
        tls(tNav, "about.faq", "help", "/faq"),
      ],
    },
    {
      title: tNav("mega.services"),
      items: [
        tls(tNav, "services.visa", "passport", "/services/visa"),
        tls(tNav, "services.company", "biz", "/services/company"),
        tls(tNav, "services.banking", "bank", "/services/banking"),
        tls(tNav, "services.poa", "pen", "/services/poa"),
      ],
    },
  ];
}

function buildInvestColumns(tNav) {
  return [
    {
      title: tNav("mega.investStrategies"),
      items: [
        tls(tNav, "invest.offplan", "trend", "/off-plan"),
        tls(tNav, "invest.rental", "key", "/ready-rentals"),
        tls(tNav, "invest.shortTerm", "calendar", "/airbnb"),
        tls(tNav, "invest.flip", "swap", "/flip"),
      ],
    },
    {
      title: tNav("mega.investPrograms"),
      items: [
        tls(tNav, "invest.goldenVisa", "shield", "/golden-visa"),
        tls(tNav, "invest.investorVisa", "passport", "/investor-visa"),
        tls(tNav, "invest.installment", "percent", "/installment"),
        tls(tNav, "invest.mortgage", "bank", "/mortgage"),
      ],
    },
    {
      title: tNav("mega.investTools"),
      items: [
        tls(tNav, "invest.calculator", "calc", "/roi-calculator"),
        tls(tNav, "invest.compare", "compare", "/districts-compare"),
        tls(tNav, "invest.tax", "doc", "/uae-tax-guide"),
        tls(tNav, "invest.report2026", "chart", "/investment-report-2026"),
      ],
    },
  ];
}

function PropertiesMegaDropdown({ timeoutRef, onClose }) {
  const tNav = useTranslations("Navigation");
  const PROPERTY_TYPES = buildPropertyTypes(tNav);
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

function buildDevCategories(tNav) {
  return [
    {
      key: "giant",
      iconName: "shield",
      label: tNav("devCategories.giant.label"),
      desc: tNav("devCategories.giant.desc"),
      devKeys: ["Emaar", "Nakheel", "Meraas", "Dubai Properties", "Aldar", "Wasl", "Majid Al Futtaim"],
    },
    {
      key: "premium",
      iconName: "gem",
      label: tNav("devCategories.premium.label"),
      desc: tNav("devCategories.premium.desc"),
      devKeys: ["Sobha", "Select Group", "Omniyat", "Ellington", "DAMAC", "London Gate", "Taraf", "LIV Developers"],
    },
    {
      key: "growth",
      iconName: "flame",
      label: tNav("devCategories.growth.label"),
      desc: tNav("devCategories.growth.desc"),
      devKeys: ["Binghatti", "Danube", "Samana", "Azizi Developments", "Tiger Properties", "Reportage Properties", "MAG Property", "Imtiaz"],
    },
    {
      key: "boutique",
      iconName: "sparkles",
      label: tNav("devCategories.boutique.label"),
      desc: tNav("devCategories.boutique.desc"),
      devKeys: ["Object 1", "Iman Developers", "Arada", "RAK Properties", "BEYOND", "TownX Development", "Prestige One", "Alef Group"],
    },
  ];
}

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
function buildDevelopersMegaCategories(tNav) {
  return buildDevCategories(tNav).map((c) => ({
    key: c.key,
    icon: DEV_ICON_MAP[c.iconName] || "shield",
    title: c.label,
    desc: c.desc,
    items: c.devKeys.map((k) => ({
      label: DEV_DISPLAY_NAMES[k] || k,
      href: devHref(k),
    })),
  }));
}

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
function buildPropertiesOffplan(tNav) {
  return [
    { label: tNav("propTypes.villasForSale"), href: "/villas", count: "248" },
    { label: tNav("propTypes.apartmentsForSale"), href: "/apartments", count: "1,840" },
    { label: tNav("propTypes.townhousesForSale"), href: "/townhouses", count: "412" },
    { label: tNav("propTypes.penthousesForSale"), href: "/penthouses", count: "96" },
    { label: tNav("propTypes.waterfrontFull"), href: "/waterfront", count: "284" },
    { label: tNav("propTypes.allNewbuilds"), href: "/new-builds", all: true },
  ];
}

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
  const tNav = useTranslations("Navigation");
  const categories = buildDevCategories(tNav);
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
          {categories.map((cat, ci) => (
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
              {ci === categories.length - 1 && (
                <div className={styles.communityGuidesBtnWrap}>
                  <DropdownNavButton
                    href="/developers"
                    label={tNav("mega.allDevelopers")}
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
          strokeWidth={1.6}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
    </li>
  );
}

function MegaDropdown({ item, timeoutRef, onClose }) {
  const tNav = useTranslations("Navigation");
  const socials = buildSocials(tNav);
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
            <p className={styles.megaColLabel}>{tNav("mega.ourSocials")}</p>
            <ul className={styles.megaList}>
              {socials.map((s) => (
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
                <p className={styles.megaColLabel}>{tNav("mega.services")}</p>
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
                <p className={styles.megaColLabel}>{tNav("mega.offerOfDay")}</p>
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
  {
    code: "RU",
    label: "Русский",
    countryCode: "RU",
    primary: "Русский",
    secondary: "RU",
  },
  {
    code: "EN",
    label: "English",
    countryCode: "GB",
    primary: "English",
    secondary: "EN",
  },
  {
    code: "AR",
    label: "العربية",
    countryCode: "AE",
    primary: "العربية",
    secondary: "AR",
  },
];
const currencies = [
  {
    code: "USD",
    label: "Доллар США",
    countryCode: "US",
    primary: "USD",
    secondary: "Доллар США",
  },
  {
    code: "EUR",
    label: "Евро",
    countryCode: "EU",
    primary: "EUR",
    secondary: "Евро",
  },
  {
    code: "RUB",
    label: "Российский рубль",
    countryCode: "RU",
    primary: "RUB",
    secondary: "Российский рубль",
  },
  {
    code: "AED",
    label: "Дирхам ОАЭ",
    countryCode: "AE",
    primary: "AED",
    secondary: "Дирхам ОАЭ",
  },
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
          strokeWidth={1.6}
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
  const current = currencies.find((c) => c.code === value) || currencies[0];
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

function buildBurgerNav(tNav) {
  return [
    {
      label: tNav("burgerSections.newbuilds"),
      icon: "01",
      items: [
        { label: tNav("burgerSections.allObjects"), href: "/new-builds", arrow: true },
        { label: tNav("burgerSections.ready"), href: "/ready" },
        { label: tNav("burgerSections.offPlan"), href: "/off-plan" },
        { label: tNav("propTypes.apartments"), href: "/apartments" },
        { label: tNav("propTypes.villas"), href: "/villas" },
        { label: tNav("propTypes.penthouses"), href: "/penthouses" },
        { label: tNav("propTypes.townhouses"), href: "/townhouses" },
      ],
    },
    {
      label: tNav("burgerSections.communities"),
      icon: "02",
      items: [
        { label: "Dubai Marina", href: "/communities/dubai-marina" },
        { label: "Palm Jumeirah", href: "/communities/palm-jumeirah" },
        { label: "Downtown Dubai", href: "/communities/downtown" },
        { label: "Business Bay", href: "/communities/business-bay" },
        { label: "JVC", href: "/communities/jvc" },
        { label: tNav("burgerSections.allCommunities"), href: "/communities", arrow: true },
      ],
    },
    {
      label: tNav("burgerSections.developers"),
      icon: "03",
      items: [
        { label: "EMAAR", href: "/developers/emaar" },
        { label: "DAMAC", href: "/developers/damac" },
        { label: "SOBHA", href: "/developers/sobha" },
        { label: "NAKHEEL", href: "/developers/nakheel" },
        { label: "MERAAS", href: "/developers/meraas" },
        { label: tNav("mega.allDevelopers"), href: "/developers", arrow: true },
      ],
    },
    {
      label: tNav("burgerSections.invest"),
      icon: "04",
      items: [
        { label: tNav("burgerSections.roiCalc"), href: "/roi-calculator" },
        { label: tNav("burgerSections.goldenVisa"), href: "/golden-visa" },
        { label: tNav("burgerSections.mortgage"), href: "/mortgage" },
        { label: tNav("burgerSections.taxes"), href: "/invest/tax" },
        { label: tNav("burgerSections.management"), href: "/services/management" },
      ],
    },
    {
      label: tNav("burgerSections.about"),
      icon: "05",
      items: [
        { label: tNav("burgerSections.company"), href: "/about" },
        { label: tNav("burgerSections.team"), href: "/team" },
        { label: tNav("burgerSections.services"), href: "/services" },
        { label: tNav("burgerSections.reviews"), href: "/reviews" },
        { label: tNav("burgerSections.blog"), href: "/blog" },
        { label: tNav("burgerSections.contacts"), href: "/contacts" },
      ],
    },
  ];
}

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
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const BURGER_NAV = buildBurgerNav(tNav);
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
      })).filter((s) => s.items.length > 0 || s.label.toLowerCase().includes(q))
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
            <div className={styles.burgerTitle}>{tNav("burger.title")}</div>
            <div className={styles.burgerSub}>{tNav("burger.subtitle")}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.burgerClose}
            aria-label={tCommon("actions.close")}
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
              placeholder={tNav("burger.searchPlaceholder")}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={styles.burgerSearchClear}
                aria-label={tCommon("actions.reset")}
              >
                <IcClose size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable nav */}
        <div className={styles.burgerScroll}>
          {filteredNav.length === 0 ? (
            <div className={styles.burgerEmpty}>{tCommon("common.nothingFound")}</div>
          ) : (
            filteredNav.map((s, idx) => {
              const isOpen = expanded === idx || !!q;
              return (
                <div key={s.label} className={styles.burgerSection}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen && !q ? null : idx)}
                    className={`${styles.burgerSectionBtn} ${isOpen ? styles.burgerSectionBtnOpen : ""}`}
                  >
                    <span className={styles.burgerSectionIcon}>{s.icon}</span>
                    <span className={styles.burgerSectionLabel}>{s.label}</span>
                    {!q && (
                      <ChevronDown
                        size={13}
                        strokeWidth={1.6}
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
            <div className={styles.burgerSettingsLabel}>{tNav("burger.settings")}</div>
            <div className={styles.burgerSettingRow}>
              <span className={styles.burgerSettingName}>{tNav("burger.language")}</span>
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
              <span className={styles.burgerSettingName}>{tNav("burger.currency")}</span>
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
              <span className={styles.burgerSettingName}>{tNav("burger.theme")}</span>
              <SegPicker
                value={theme}
                onChange={setTheme}
                options={[
                  {
                    value: "light",
                    icon: <Sun size={13} strokeWidth={1.6} />,
                    label: tNav("burger.themeLight"),
                  },
                  {
                    value: "dark",
                    icon: <Moon size={13} strokeWidth={1.6} />,
                    label: tNav("burger.themeDark"),
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
            {tCommon("actions.contactAgent")}
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
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const navItems = buildNavItems(tNav);
  const aboutColumns = buildAboutColumns(tNav);
  const investColumns = buildInvestColumns(tNav);
  const developersMegaCategories = buildDevelopersMegaCategories(tNav);
  const propertiesOffplan = buildPropertiesOffplan(tNav);
  const propertyTypes = buildPropertyTypes(tNav);

  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const [theme, setTheme] = useTheme();
  // Язык — глобальный (next-intl + I18nProvider). Гидрация из localStorage
  // и запись обратно делаются в самом провайдере, тут только мост к UI.
  const { locale, setLocale } = useLocale();
  const language = locale.toUpperCase();
  const setLanguage = setLocale;
  const [currency, setCurrency] = useState("USD");
  const navTimeoutRef = useRef(null);
  const closeNav = () => setActiveNav(null);
  const pathname = usePathname();

  // Currency пока живёт локально — отдельный switcher, не связанный с локалью.
  useEffect(() => {
    try {
      const curr = localStorage.getItem("shan-currency");
      if (curr) setCurrency(curr);
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);
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
              <img
                src="/Logo_01.svg"
                alt="ShanGroup"
                className={styles.logoImg}
              />
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
                label={tNav("actions.contact")}
                icon="phone-call"
              />
              <button
                type="button"
                className={styles.burger}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <X size={22} strokeWidth={1.6} />
                ) : (
                  <Menu size={22} strokeWidth={1.6} />
                )}
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
            ctaLabel={tNav("mega.communitiesGuides")}
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
            label={tNav("menu.developers")}
            categories={developersMegaCategories}
            ctaLabel={tNav("mega.allDevelopers")}
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
              offplan: propertiesOffplan,
              developers: TOP_DEVS,
              ctaAllDevelopers: {
                label: tNav("mega.allDevelopers"),
                href: "/developers",
              },
              types: propertyTypes.slice(0, 5).map((t) => ({
                label: t.label,
                img: t.image,
                href: t.href,
              })),
              areas: propertyTypes.slice(5, 10).map((t) => ({
                label: t.label,
                img: t.image,
                href: t.href,
              })),
              emirates: EMIRATES.map((e) => ({
                label: e.label,
                count: tNav("propTypes.objectsCount", { count: e.count }),
                img: e.img,
                href: e.href,
              })),
              ctaAllEmirates: {
                label: tNav("mega.allEmirates").replace(/ →$/, ""),
                href: "/emirates",
              },
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
            label={tNav("menu.invest")}
            columns={investColumns}
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
            label={tNav("menu.about")}
            columns={aboutColumns}
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
