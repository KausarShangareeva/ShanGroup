import Link from "next/link";
import {
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Send,
  Linkedin,
} from "lucide-react";
import Container from "./Container";
import AreaBadge from "@/components/AreaBadge/AreaBadge";
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
  { label: "Партнерская программа", href: "/partners" },
  { label: "Подкасты", href: "/podcast" },
  { label: "Карта сайта", href: "/sitemap" },
];

const developers = [
  "Emaar",
  "Meraas",
  "DAMAC",
  "Aldar",
  "Arada",
  "Ellington",
  "Eagle Hills",
  "Nakheel",
  "NSHAMA",
  "Sobha",
  "Samana",
  "Binghatti",
  "Danube",
  "Deyaar",
  "Omniyat",
  "Object 1",
  "Ohana",
  "Iman Developers",
  "Imtiaz",
  "IMKAN",
  "BEYOND",
  "Reportage Properties",
  "H&H Development",
  "RAK Properties",
  "Wasl",
  "Majid Al Futtaim",
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

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Колонка 1 — Недвижимость + Информация */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Недвижимость в ОАЭ</h4>
            <ul className={styles.colLinks}>
              {properties.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <h4 className={styles.colTitle} style={{ marginTop: "2rem" }}>
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

          {/* Колонка 2 — Застройщики */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>
              <Link href="/developers">Застройщики в ОАЭ</Link>
            </h4>
            <ul className={styles.colLinks}>
              {developers.map((item) => (
                <li key={item}>
                  <Link href={`/developers/${devSlug(item)}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3 — Районы */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>
              <Link href="/communities">Районы в ОАЭ</Link>
            </h4>

            <div className={styles.areaGroup}>
              <AreaBadge image="https://res.cloudinary.com/dxp7ppipg/image/upload/v1774374967/downtown_eyw1xz.jpg">
                Топовые
              </AreaBadge>
              <ul className={styles.colLinks}>
                {areas.top.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.areaGroup}>
              <AreaBadge image="https://res.cloudinary.com/dxp7ppipg/image/upload/v1774374965/Town_Square_tjupl2.jpg">
                Жилые
              </AreaBadge>
              <ul className={styles.colLinks}>
                {areas.residential.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.areaGroup}>
              <AreaBadge image="https://res.cloudinary.com/dxp7ppipg/image/upload/v1774374946/Sobha_Hartland_j0p6yt.webp">
                Новые и эксклюзивные
              </AreaBadge>
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

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <span className={styles.logo}>ShanGroup</span>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram">
                <Instagram size={26} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={26} />
              </a>
              <a href="#" aria-label="Telegram">
                <Send size={26} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={26} />
              </a>
            </div>
          </div>

          <div className={styles.bottomCenter}>
            <Link href="/contacts">Наши контакты</Link>
            <Link href="/careers">Карьера в ShanGroup</Link>
            <Link href="/articles">Справочник инвестора</Link>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <p>
              <MapPin size={18} /> Office 1403, Arenco Tower, Media City, Dubai,
              UAE
            </p>
            <p>
              <Phone size={18} /> +971 4 261 8838 (отвечаем на русском языке)
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
