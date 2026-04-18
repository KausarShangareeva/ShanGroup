import Link from "next/link";
import { MapPin, Mail, Phone, BedDouble, Bath, Maximize2 } from "lucide-react";
import DeveloperTag from "@/components/DeveloperTag/DeveloperTag";
import AGENT from "@/data/agent.json";
import styles from "./PropertyCard.module.css";

function WaIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Карточка объекта недвижимости.
 *
 * @param {object} props
 * @param {string}   props.name      — название объекта.
 * @param {string}   props.price     — форматированная цена (например "от 382 100 $").
 * @param {string}   props.district  — район.
 * @param {string}   props.href      — ссылка на детальную страницу.
 * @param {string}   props.img       — URL обложки.
 * @param {boolean}  [props.featured] — флаг «Топ предложение».
 * @param {boolean}  [props.offPlan]  — флаг «Off Plan».
 * @param {string}   [props.delivery] — срок сдачи (например "Q4 2026").
 *                                      Показывается в off-plan бейдже как
 *                                      "Off-plan | Q4 2026".
 * @param {string}   [props.developer]— название застройщика (например
 *                                      "Emaar", "DAMAC"). Отрисовывается
 *                                      отдельным бейджем в том же ряду.
 * @param {number}   [props.beds]     — количество спален.
 * @param {number}   [props.baths]    — количество санузлов.
 * @param {string}   [props.area]     — площадь (строкой, например "от 47 м²").
 * @param {object}   [props.agent]    — агент-владелец карточки ({name, avatar, phone}).
 *                                      По умолчанию берётся из /data/agent.json.
 */
export default function PropertyCard({
  name,
  price,
  district,
  href,
  img,
  featured,
  offPlan,
  delivery,
  developer,
  beds,
  baths,
  area,
  agent = AGENT,
}) {
  const waHref = `https://wa.me/${(agent.phone ?? "").replace(/\D/g, "")}`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.imgWrap}>
        <img src={img} alt={name} className={styles.img} />
      </Link>
      {/* Бейджи — прямые потомки .card, а не .imgWrap, чтобы не попадать
          под overflow: hidden у imgWrap и иметь возможность вылезать
          за левый край карточки (эффект ленточки-обёртки). */}
      <div className={styles.badges}>
        {featured && (
          <span className={styles.badgeFeatured}>
            <span className={styles.badgeSparkles} aria-hidden="true">
              ✨
            </span>
            Топ предложение
          </span>
        )}
        {offPlan && (
          <span className={styles.badgeOffPlan}>
            {delivery && <>{delivery}</>}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.priceRow}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.price}>{price}</span>
        </div>

        {developer && <DeveloperTag name={developer} />}

        <div className={styles.location}>
          <MapPin size={13} />
          <span>{district}</span>
        </div>

        {/* ── Характеристики ── */}
        {(beds != null || baths != null || area) && (
          <div className={styles.stats}>
            {beds != null && (
              <span className={styles.stat}>
                <span className={styles.statIcon}>
                  <BedDouble size={14} strokeWidth={1.8} />
                </span>
                <span>
                  {beds}
                  <span className={styles.statUnit}>
                    {" "}
                    {beds === 1 ? "спальня" : "спал."}
                  </span>
                </span>
              </span>
            )}
            {baths != null && (
              <span className={styles.stat}>
                <span className={styles.statIcon}>
                  <Bath size={14} strokeWidth={1.8} />
                </span>
                <span>
                  {baths}
                  <span className={styles.statUnit}>
                    {" "}
                    {baths === 1 ? "санузел" : "сан."}
                  </span>
                </span>
              </span>
            )}
            {area && (
              <span className={styles.stat}>
                <span className={styles.statIcon}>
                  <Maximize2 size={14} strokeWidth={1.8} />
                </span>
                <span className={styles.statUnit}>{area}</span>
              </span>
            )}
          </div>
        )}

        <div className={styles.divider} />

        {/* ── Агент ── */}
        <div className={styles.agentRow}>
          <img
            src={agent.avatar}
            alt={agent.name}
            className={styles.agentAvatar}
          />
          <div className={styles.agentMeta}>
            <span className={styles.agentName}>{agent.name}</span>
          </div>
        </div>

        {/* ── Контакты (появляются при hover) ── */}
        <div className={styles.reveal}>
          <div className={styles.contacts}>
            <a href="mailto:info@shangroup.ae" className={styles.contactBtn}>
              <Mail size={13} />
              <span>Почта</span>
            </a>
            <a href={`tel:${agent.phone}`} className={styles.contactBtn}>
              <Phone size={13} />
              <span>Звонок</span>
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactBtn} ${styles.contactBtnWa}`}
            >
              <WaIcon />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
