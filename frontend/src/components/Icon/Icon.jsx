import {
  Phone,
  PhoneCall,
  Mail,
  Globe,
  Clock,
  MessageCircle,
  Send,
  Linkedin,
  MapPin,
  Building,
  Building2,
  Home,
  Briefcase,
  Landmark,
  FileText,
  CreditCard,
  Info,
  Star,
  BookOpen,
  HelpCircle,
  Shield,
  Gem,
  Flame,
  Sparkles,
  Plus,
  ArrowRight,
  ChevronDown,
  PenLine,
} from "lucide-react";
import styles from "./Icon.module.css";

/* ──────────── Фирменные SVG (собраны здесь, чтобы
   все иконки жили в одном месте) ──────────── */

function IconInstagram({ size = 18, strokeWidth = 1.75 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYoutube({ size = 18, strokeWidth = 1.75 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.57 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon
        points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function IconTelegram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function IconWhatsApp({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconViber({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.398.002C8.865-.028 3.443.504 1.03 2.748-1.065 4.832-.998 7.754-.998 7.754s-.268 8.195 7.91 10.37v3.614s-.054.976.613.976c.808 0 1.302-.796 2.088-1.69.43-.474.998-1.14 1.4-1.61 3.85.323 6.81-.42 7.145-.53.777-.25 5.17-.815 5.883-6.646.736-5.993-.358-9.78-2.643-11.236zm.568 18.168l-.001.02v-.018zm5.25-3.207c-.636.82-1.8 1.48-1.8 1.48s-.21.11-.383-.147c-.173-.258-.668-.817-.668-.817C11.67 17.46 8.42 16.15 6.3 12.6c-.616-1.04-.95-2.017-1.15-2.986-.29-1.44-.192-2.694.183-3.56C5.838 4.7 7.11 3.8 8.43 3.692c.344-.027.615.037.785.272.547.766 2.082 3.228 2.205 3.498.167.362.114.653-.05.853-.458.55-.88.79-1.148 1.198-.205.315-.148.574.014.84.91 1.487 2.03 2.53 3.643 3.32.44.213.773.154 1.036-.128.37-.399.896-1.018 1.282-1.282.31-.21.604-.148.953.054.56.322 2.985 1.423 3.342 1.672.357.25.408.623.117 1.16-.05.093-.13.204-.243.354l-.113.14z" />
    </svg>
  );
}

/* ──────────── Реестр имён → компонент ──────────── */

const REGISTRY = {
  // Контакты
  "phone": Phone,
  "phone-call": PhoneCall,
  "mail": Mail,
  "message": MessageCircle,
  // Мессенджеры и соцсети
  "instagram": IconInstagram,
  "youtube": IconYoutube,
  "telegram": IconTelegram,
  "whatsapp": IconWhatsApp,
  "viber": IconViber,
  "send": Send,
  "linkedin": Linkedin,
  // Гео и время
  "globe": Globe,
  "clock": Clock,
  "map-pin": MapPin,
  // Недвижимость
  "building": Building,
  "building-2": Building2,
  "home": Home,
  "briefcase": Briefcase,
  "landmark": Landmark,
  // Услуги / документы
  "file-text": FileText,
  "pen-line": PenLine,
  "credit-card": CreditCard,
  "info": Info,
  "star": Star,
  "book-open": BookOpen,
  "help-circle": HelpCircle,
  // Категории девелоперов
  "shield": Shield,
  "gem": Gem,
  "flame": Flame,
  "sparkles": Sparkles,
  // Разное
  "plus": Plus,
  "arrow-right": ArrowRight,
  "chevron-down": ChevronDown,
};

const SIZE_PX = { xs: 12, sm: 14, md: 18, lg: 22, xl: 28 };
const BOX_PX = { xs: 22, sm: 28, md: 38, lg: 48, xl: 56 };

/**
 * Универсальная иконка проекта.
 *
 * @param {string}   [name]        — имя иконки из реестра (например, "phone", "telegram").
 * @param {Function} [component]   — альтернативно: сразу React-компонент (lucide или SVG).
 * @param {string}   [src]         — альтернативно: путь к файлу (например, "/social_media/call.svg").
 *                                   Рендерится через <img>, цвет SVG при этом не управляется.
 * @param {string}   [alt]         — alt-текст для src-иконок (для доступности).
 * @param {"gray"|"black"|"white"} [color="gray"] — цветовая схема (не влияет на src-иконки).
 * @param {"xs"|"sm"|"md"|"lg"|"xl"|number} [size="md"] — размер иконки.
 * @param {boolean}  [boxed=false] — обернуть в квадратный бокс с рамкой (как в навигационном дропдауне).
 * @param {number}   [strokeWidth=1.75] — толщина обводки для lucide-иконок.
 * @param {string}   [className]   — дополнительный класс.
 */
export default function Icon({
  name,
  component,
  src,
  alt = "",
  color = "gray",
  size = "md",
  boxed = false,
  strokeWidth = 1.75,
  className = "",
  style,
  ...rest
}) {
  const Cmp = component ?? (name ? REGISTRY[name] : null);

  if (!src && !Cmp) {
    if (process.env.NODE_ENV !== "production") {
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
