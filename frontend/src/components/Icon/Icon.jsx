import styles from "./Icon.module.css";

// ─────────────────────────────────────────────────────────────
// Единый набор иконок проекта.
// Все паттерны рисованы в одном editorial-стиле: 1.6px stroke,
// currentColor, square caps, viewBox 24×24 (если не указано иное).
// HeroIcons.jsx и MMIcon.jsx — тонкие адаптеры, которые шлют сюда
// ради обратной совместимости со старым API (IcSearch / kind="trend").
// ─────────────────────────────────────────────────────────────

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function createSvgIcon(children, vb = 24) {
  // eslint-disable-next-line react/display-name
  return ({ size = 18, strokeWidth = 1.6, ...rest }) => (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      strokeWidth={strokeWidth}
      {...STROKE}
      {...rest}
    >
      {children}
    </svg>
  );
}

// ─── СОЦСЕТИ (filled — оставляем как есть, бренд) ───
function IconInstagram({ size = 18, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...STROKE}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
    </svg>
  );
}
function IconYoutube({ size = 18, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...STROKE}>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M10 9.5v5l4-2.5z" fill="currentColor" />
    </svg>
  );
}
function IconTelegram({ size = 18, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...STROKE}>
      <path d="M3 11l18-7-3 17-6-4-3 4-1-7 11-7-13 6z" />
    </svg>
  );
}
function IconWhatsApp({ size = 18, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...STROKE}>
      <path d="M4 20l1.5-4.5A8 8 0 1 1 8.5 18.5L4 20z" />
    </svg>
  );
}
function IconLinkedin({ size = 18, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...STROKE}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7" />
    </svg>
  );
}
function IconViber({ size = 18, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...STROKE}>
      <ellipse cx="12" cy="11" rx="9" ry="8" />
      <path d="M9 19l-1 3 4-3" />
      <path d="M8 8c0 3 2 5 5 5" />
    </svg>
  );
}

// ─── ИКОНКИ В EDITORIAL-СТИЛЕ ───
const REGISTRY = {
  // Контакты
  phone: createSvgIcon(
    <path d="M5 4h3l2 5-2 1c1 2 3 4 5 5l1-2 5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  "phone-call": createSvgIcon(
    <>
      <path d="M5 4h3l2 5-2 1c1 2 3 4 5 5l1-2 5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />
      <path d="M15 5a4 4 0 0 1 4 4M15 9a1 1 0 0 1 0 0" />
    </>
  ),
  mail: createSvgIcon(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </>
  ),
  message: createSvgIcon(
    <path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4A8 8 0 1 1 21 12z" />
  ),
  send: createSvgIcon(<path d="M3 11l18-7-3 17-6-4-3 4-1-7 11-7-13 6z" />),

  // Гео и время
  globe: createSvgIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  clock: createSvgIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: createSvgIcon(
    <>
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  "map-pin": createSvgIcon(
    <>
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),

  // Недвижимость
  home: createSvgIcon(<path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9z" />),
  building: createSvgIcon(
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </>
  ),
  "building-2": createSvgIcon(
    <>
      <rect x="3" y="6" width="18" height="15" rx="1" />
      <path d="M9 6V3h6v3M7 11h2M11 11h2M15 11h2M7 15h2M11 15h2M15 15h2" />
    </>
  ),
  briefcase: createSvgIcon(
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  landmark: createSvgIcon(
    <>
      <path d="M12 3l9 5H3l9-5z" />
      <path d="M5 11v7M9 11v7M15 11v7M19 11v7M3 21h18" />
    </>
  ),
  bed: createSvgIcon(
    <>
      <path d="M3 18v-7M3 14h18v4M21 18V11a3 3 0 0 0-3-3h-7v6" />
      <circle cx="7" cy="12" r="1.5" />
    </>
  ),
  bath: createSvgIcon(
    <>
      <path d="M3 11h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z" />
      <path d="M6 11V6a2 2 0 0 1 4 0M5 18l-1 2M19 18l1 2" />
    </>
  ),
  area: createSvgIcon(
    <>
      <path d="M5 5h6M5 5v6M19 19h-6M19 19v-6M5 19l14-14" />
    </>
  ),
  maximize: createSvgIcon(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />),

  // Услуги / документы
  "file-text": createSvgIcon(
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" />
      <path d="M14 3v6h6M8 13h8M8 17h6" />
    </>
  ),
  doc: createSvgIcon(
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" />
      <path d="M14 3v6h6M8 13h8M8 17h6" />
    </>
  ),
  "credit-card": createSvgIcon(
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  "pen-line": createSvgIcon(<path d="M14 4l6 6-11 11H3v-6L14 4z" />),
  pen: createSvgIcon(<path d="M14 4l6 6-11 11H3v-6L14 4z" />),
  passport: createSvgIcon(
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M9 17h6" />
    </>
  ),
  biz: createSvgIcon(
    <>
      <rect x="3" y="7" width="18" height="14" rx="1.5" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  bank: createSvgIcon(
    <>
      <path d="M3 9l9-5 9 5" />
      <path d="M5 9v9M9 9v9M15 9v9M19 9v9M3 19h18" />
    </>
  ),

  // Иконки контента / справки
  info: createSvgIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.01" />
    </>
  ),
  star: createSvgIcon(
    <path d="M12 3l2.6 6.3 6.4.5-4.9 4.2 1.5 6.5L12 17l-5.6 3.5 1.5-6.5L3 9.8l6.4-.5L12 3z" />
  ),
  book: createSvgIcon(
    <>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
      <path d="M4 17h14" />
    </>
  ),
  "book-open": createSvgIcon(
    <>
      <path d="M3 5h7a3 3 0 0 1 3 3v12M21 5h-7a3 3 0 0 0-3 3v12" />
      <path d="M3 5v15h7M21 5v15h-7" />
    </>
  ),
  help: createSvgIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 16.5v.01" />
    </>
  ),
  "help-circle": createSvgIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 16.5v.01" />
    </>
  ),

  // Инвестиционные стратегии (из MMIcon)
  trend: createSvgIcon(
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  "trending-up": createSvgIcon(
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  key: createSvgIcon(
    <>
      <circle cx="8" cy="14" r="4" />
      <path d="M11 12l9-9 2 2-2 2 2 2-2 2-2-2-2 2" />
    </>
  ),
  calendar: createSvgIcon(
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  swap: createSvgIcon(
    <path d="M7 4l-4 4 4 4M3 8h14M17 12l4 4-4 4M21 16H7" />
  ),

  // Программы / категории
  shield: createSvgIcon(
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  percent: createSvgIcon(
    <>
      <path d="M5 19L19 5" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </>
  ),
  gem: createSvgIcon(<path d="M12 3l5 5-5 13-5-13 5-5zM2 8h20M7 8l5-5M17 8l-5-5" />),
  flame: createSvgIcon(
    <path d="M12 3c2 4-1 6 1 9 1 1.5 1 3 0 5-2 4-8 3-8-3 0-3 2-5 3-7 1 1 0 4 4-4z" />
  ),
  sparkles: createSvgIcon(
    <>
      <path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5L12 4z" />
      <path d="M19 17l.7 1.8L21.5 19.5l-1.8.7L19 22l-.7-1.8L16.5 19.5l1.8-.7L19 17z" />
    </>
  ),

  // Инструменты
  calc: createSvgIcon(
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </>
  ),
  compare: createSvgIcon(
    <path d="M12 3v18M5 7l-2 2 2 2M19 17l2-2-2-2M3 9h7M14 15h7" />
  ),
  chart: createSvgIcon(
    <path d="M3 21h18M5 17V9M10 17V5M15 17v-7M20 17V7" />
  ),

  // Действия
  search: createSvgIcon(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  close: createSvgIcon(<path d="M6 6l12 12M18 6L6 18" />),
  check: createSvgIcon(<path d="M5 12l5 5L20 7" />),
  plus: createSvgIcon(<path d="M12 5v14M5 12h14" />),
  arrow: createSvgIcon(<path d="M5 12h14M13 6l6 6-6 6" />),
  "arrow-right": createSvgIcon(<path d="M5 12h14M13 6l6 6-6 6" />),
  "arrow-up-right": createSvgIcon(<path d="M7 17L17 7M9 7h8v8" />),
  chevron: createSvgIcon(<path d="M6 9l6 6 6-6" />),
  "chevron-down": createSvgIcon(<path d="M6 9l6 6 6-6" />),
  "chevron-up": createSvgIcon(<path d="M6 15l6-6 6 6" />),
  "chevron-left": createSvgIcon(<path d="M15 18l-6-6 6-6" />),
  "chevron-right": createSvgIcon(<path d="M9 6l6 6-6 6" />),

  // Финансы / прочее
  dollar: createSvgIcon(
    <path d="M12 3v18M16 7c-1-2-3-2-4-2-2 0-4 1-4 3s2 3 4 3 4 1 4 3-2 3-4 3-3 0-4-2" />
  ),
  sliders: createSvgIcon(
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="7" cy="18" r="2" />
    </>
  ),
  heart: createSvgIcon(
    <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
  ),
  verified: createSvgIcon(
    <>
      <path d="M12 2l2.5 2 3-1 1 3 3 1-1 3 1 3-3 1-1 3-3-1L12 22l-2.5-2-3 1-1-3-3-1 1-3-1-3 3-1 1-3 3 1L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),

  // Эко / категории / разное
  trees: createSvgIcon(
    <>
      <path d="M12 21v-9" />
      <path d="M7 12c-2 0-3.5-1.5-3.5-3.5S5 5 7 5c0-2 2-3 4-3s4 1 4 3c2 0 3.5 1.5 3.5 3.5S17 12 15 12" />
      <path d="M5 12l-1 4h6M19 12l1 4h-6" />
    </>
  ),
  leaf: createSvgIcon(
    <path d="M5 21c0-9 7-16 16-16 0 9-7 16-16 16zM5 21l8-8" />
  ),
  crown: createSvgIcon(
    <>
      <path d="M3 8l3 8h12l3-8-5 3-4-6-4 6-5-3z" />
      <path d="M5 19h14" />
    </>
  ),
  "layout-grid": createSvgIcon(
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </>
  ),
  layers: createSvgIcon(
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  "land-plot": createSvgIcon(
    <>
      <path d="M3 18l9-5 9 5-9 4-9-4z" />
      <path d="M12 13V6M9 6h6" />
    </>
  ),
  "file-down": createSvgIcon(
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" />
      <path d="M14 3v6h6M12 12v6M9 15l3 3 3-3" />
    </>
  ),
  bot: createSvgIcon(
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M9 14h.01M15 14h.01M9 18h6" />
      <path d="M2 14h2M20 14h2" />
    </>
  ),
  maximize: createSvgIcon(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />),
  "maximize-2": createSvgIcon(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />),
  fence: createSvgIcon(
    <path d="M4 7l3-3 3 3 3-3 3 3 3-3 3 3M4 7v13M10 7v13M16 7v13M22 7v13M4 12h18M4 17h18" />
  ),
  eye: createSvgIcon(
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  paintbrush: createSvgIcon(
    <>
      <path d="M9 11l8-8 4 4-8 8M3 21l3-3a3 3 0 1 1 3 3l-3 0z" />
      <path d="M11 8l5 5" />
    </>
  ),
  scale: createSvgIcon(
    <>
      <path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z" />
    </>
  ),
  newspaper: createSvgIcon(
    <>
      <path d="M3 5h14v14H3z" />
      <path d="M17 9h4v8a2 2 0 0 1-2 2H5M6 9h7M6 13h7M6 17h4" />
    </>
  ),
  "bar-chart": createSvgIcon(
    <path d="M4 21V11M10 21V3M16 21v-7M22 21H2" />
  ),
  rocket: createSvgIcon(
    <>
      <path d="M12 2c4 4 6 8 6 12-2 0-4-2-6-2s-4 2-6 2c0-4 2-8 6-12z" />
      <path d="M9 14l-4 4 2 2 4-4M15 14l4 4-2 2-4-4" />
      <circle cx="12" cy="9" r="1.5" />
    </>
  ),
  "message-square": createSvgIcon(
    <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-5 4V5z" />
  ),
  "check-circle": createSvgIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  "hard-hat": createSvgIcon(
    <>
      <path d="M3 18h18M5 18v-3a7 7 0 0 1 14 0v3" />
      <path d="M9 11V8M15 11V8" />
    </>
  ),
  waves: createSvgIcon(
    <path d="M3 8c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M3 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M3 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />
  ),

  // Социальные (filled, бренд)
  instagram: IconInstagram,
  youtube: IconYoutube,
  telegram: IconTelegram,
  whatsapp: IconWhatsApp,
  linkedin: IconLinkedin,
  viber: IconViber,
  // Алиасы из MMIcon (kind="ig"/"yt"/"tg"/"wa")
  ig: IconInstagram,
  yt: IconYoutube,
  tg: IconTelegram,
  wa: IconWhatsApp,
};

const SIZE_PX = { xs: 12, sm: 14, md: 18, lg: 22, xl: 28 };
const BOX_PX = { xs: 22, sm: 28, md: 38, lg: 48, xl: 56 };

/**
 * Универсальная иконка проекта.
 *
 * @param {string}   [name]        — имя из реестра ("phone", "trend", ...). Полный
 *                                   список — в REGISTRY ниже.
 * @param {Function} [component]   — альтернатива: готовый React-компонент.
 * @param {string}   [src]         — альтернатива: путь к файлу-картинке (рендерим <img>).
 * @param {string}   [alt]         — alt-текст для src.
 * @param {"gray"|"black"|"white"} [color="gray"] — цветовая схема.
 * @param {"xs"|"sm"|"md"|"lg"|"xl"|number} [size="md"] — размер иконки.
 * @param {boolean}  [boxed=false] — обернуть в квадратный бокс.
 * @param {number}   [strokeWidth=1.6] — толщина обводки.
 */
export default function Icon({
  name,
  component,
  src,
  alt = "",
  color = "gray",
  size = "md",
  boxed = false,
  strokeWidth = 1.6,
  className = "",
  style,
  ...rest
}) {
  const Cmp = component ?? (name ? REGISTRY[name] : null);

  if (!src && !Cmp) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`<Icon /> — иконка "${name}" не найдена в реестре`);
    }
    return null;
  }

  const iconPx =
    typeof size === "number" ? size : (SIZE_PX[size] ?? SIZE_PX.md);

  const boxPx =
    typeof size === "number"
      ? Math.round(size * 2.1)
      : (BOX_PX[size] ?? BOX_PX.md);

  const rootClass = [
    boxed ? styles.boxed : styles.plain,
    styles[`color_${color}`] ?? "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={rootClass}
      data-icon-color={color}
      data-icon-boxed={boxed ? "" : undefined}
      style={boxed ? { width: boxPx, height: boxPx, ...style } : style}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={iconPx}
          height={iconPx}
          style={{ display: "block" }}
        />
      ) : (
        <Cmp size={iconPx} strokeWidth={strokeWidth} />
      )}
    </span>
  );
}

// Низкоуровневый доступ к компоненту-иконке без обёртки <span>.
// Полезен для адаптеров (HeroIcons.jsx, MMIcon.jsx) и кастомных рендеров,
// где не нужны фоны/боксы и важна минимальная разметка.
export function getIconComponent(name) {
  return REGISTRY[name] ?? null;
}
