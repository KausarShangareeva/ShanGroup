// Editorial dark Footer — final anchor of the page.
// Big Cormorant wordmark + italic-sand tagline → 3 link columns
// → socials/contacts row → mono copyright bar.

import Link from "next/link";
import { Instagram, Youtube, Send, Linkedin } from "lucide-react";
import Container from "./Container";
import { IcPin, IcPhone } from "@/components/HeroIcons/HeroIcons";
import { devSlug } from "@/utils/devSlug";
import styles from "./Footer.module.css";

const properties = [
  { label: "Подобрать недвижимость в ОАЭ", href: "/catalog" },
  { label: "Купить недвижимость в Дубае", href: "/dubai" },
  { label: "Купить недвижимость в Абу-Даби", href: "/abu-dhabi" },
  { label: "Купить недвижимость в Рас-эль-Хайме", href: "/ras-al-khaimah" },
  { label: "Купить недвижимость в Шардже", href: "/sharjah" },
  { label: "Купить недвижимость в Аджмане", href: "/ajman" },
  { label: "Купить апартаменты в Дубае", href: "/apartments" },
  { label: "Купить пентхаус в Дубае", href: "/penthouses" },
  { label: "Купить виллу в Дубае", href: "/villas" },
  { label: "Купить таунхаус в Дубае", href: "/townhouses" },
];

const information = [
  { label: "Новости рынка недвижимости Дубая", href: "/blog" },
  { label: "Статьи о недвижимости Дубая", href: "/articles" },
  { label: "О нашей компании", href: "/about" },
  { label: "Отзывы наших клиентов", href: "/reviews" },
  { label: "Вопрос-ответ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
  { label: "Вакансии", href: "/careers" },
  { label: "Стать партнером", href: "/partners" },
  { label: "Подкасты", href: "/podcast" },
  { label: "Карта сайта", href: "/sitemap" },
];

const developers = [
  "Emaar", "Meraas", "DAMAC", "Aldar", "Arada", "Ellington",
  "Eagle Hills", "Nakheel", "NSHAMA", "Sobha", "Samana", "Binghatti",
  "Danube", "Deyaar", "Omniyat", "Object 1", "Ohana", "Iman Developers",
  "Imtiaz", "IMKAN", "BEYOND", "Reportage Properties", "H&H Development",
  "RAK Properties", "Wasl", "Majid Al Futtaim",
];

const areas = {
  top: [
    { label: "Downtown Dubai", href: "/communities" },
    { label: "Dubai Islands", href: "/communities" },
    { label: "Dubai Marina", href: "/communities" },
    { label: "Dubai Creek Harbour", href: "/communities" },
    { label: "Dubai Maritime City", href: "/communities" },
    { label: "Dubai South", href: "/communities" },
    { label: "Dubailand", href: "/communities" },
    { label: "Expo City Dubai", href: "/communities" },
  ],
  residential: [
    { label: "Town Square Dubai", href: "/communities" },
    { label: "MBR City", href: "/communities" },
    { label: "Business Bay", href: "/communities" },
    { label: "Palm Jumeirah", href: "/communities" },
    { label: "Palm Jebel Ali", href: "/communities" },
    { label: "Jumeirah Village Circle (JVC)", href: "/communities" },
    { label: "Jumeirah Lake Towers (JLT)", href: "/communities" },
    { label: "Jumeirah Village Triangle (JVT)", href: "/communities" },
  ],
  exclusive: [
    { label: "Sobha Hartland (One & 2)", href: "/communities" },
    { label: "Sobha Siniya Island", href: "/communities" },
    { label: "Al Marjan Island", href: "/communities" },
    { label: "Mina Al Arab", href: "/communities" },
    { label: "Yas Island", href: "/communities" },
    { label: "Al Reem Island", href: "/communities" },
    { label: "Al Maryah Island", href: "/communities" },
    { label: "Saadiyat Island", href: "/communities" },
    { label: "Ramhan Island", href: "/communities" },
  ],
};

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "Telegram", href: "#", Icon: Send },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grain} aria-hidden />

      <Container>
        {/* Brand block — large wordmark + italic tagline */}
        <div className={styles.brand}>
          <div className={styles.wordmark}>ShanGroup</div>
          <div className={styles.tagline}>
            <span className={styles.taglineKicker}>
              Real estate · Dubai · Est. 2018
            </span>
            <span className={styles.taglineAccent}>
              ваш актив в надёжных руках
            </span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Link columns */}
        <div className={styles.grid}>
          {/* Column 1 — Properties + Information */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Недвижимость в ОАЭ</h4>
            <ul className={styles.colLinks}>
              {properties.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <h4 className={`${styles.colTitle} ${styles.colTitleSpaced}`}>
              Информация
            </h4>
            <ul className={styles.colLinks}>
              {information.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Developers */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>
              <Link href="/developers">Застройщики ОАЭ</Link>
            </h4>
            <ul className={styles.colLinks}>
              {developers.map((name) => (
                <li key={name}>
                  <Link href={`/developers/${devSlug(name)}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Areas */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>
              <Link href="/communities">Районы ОАЭ</Link>
            </h4>

            <div className={styles.subGroup}>
              <div className={styles.subLabel}>Топовые</div>
              <ul className={styles.colLinks}>
                {areas.top.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.subGroup}>
              <div className={styles.subLabel}>Жилые</div>
              <ul className={styles.colLinks}>
                {areas.residential.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.subGroup}>
              <div className={styles.subLabel}>Новые и эксклюзивные</div>
              <ul className={styles.colLinks}>
                {areas.exclusive.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Bottom: socials + contacts */}
        <div className={styles.bottom}>
          <div className={styles.socials}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={styles.socialBtn}
              >
                <Icon size={18} strokeWidth={1.6} />
              </a>
            ))}
          </div>

          <div className={styles.contacts}>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className={styles.contactRow}
            >
              <IcPin size={14} />
              Office 1403, Arenco Tower, Media City, Dubai, UAE
            </a>
            <a href="tel:+97142618838" className={styles.contactRow}>
              <IcPhone size={14} />
              +971 4 261 8838
              <span className={styles.contactNote}>
                · отвечаем на русском языке
              </span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <span>© 2026 ShanGroup · Dubai · RERA #2087</span>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
