import {
  MapPin,
  Leaf,
  ChevronRight,
  ChevronLeft,
  CircleDollarSign,
  Maximize2,
  CalendarCheck,
  Trees,
} from "lucide-react";
import Container from "@/components/layout/Container";
import FeatureTag from "@/components/FeatureTag/FeatureTag";
import ContactButton from "@/components/ContactButton/ContactButton";
import Button from "@/components/Button/Button";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PROPERTIES from "@/data/properties/objects.json";
import styles from "./OfferOfMonth.module.css";

const FEATURES = [
  { label: "Бассейн", emoji: "🏊‍♂️" },
  { label: "Тренажёрный зал", emoji: "🏋️‍♂️" },
  { label: "Консьерж", emoji: "🛎️" },
  { label: "Умный дом", emoji: "🏠" },
  { label: "Парковка", emoji: "🚗" },
  { label: "SPA", emoji: "🧖‍♀️" },
];

const PAYMENT_PLAN = [
  { label: "При бронировании", percent: "20%" },
  { label: "Во время строительства", percent: "50%" },
  { label: "При получении ключей", percent: "30%" },
];

function getDailyProperty() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return PROPERTIES[dayOfYear % PROPERTIES.length];
}

export default function OfferOfMonth() {
  const p = getDailyProperty();
  const THUMBNAILS = [p.image, p.image, p.image, p.image];
  const LIFESTYLE = [p.district, p.emirate.replace(/-/g, " ")];

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag="Предложение месяца"
          title="Лучшие объекты от застройщиков ОАЭ"
          subtitle="Эксклюзивные условия, рассрочка до 5 лет и сопровождение на каждом этапе сделки"
          align="center"
        />

        <div className={styles.layout}>
          {/* Левая колонка */}
          <div className={styles.left}>
            <p className={styles.descLabel}>ОПИСАНИЕ</p>
            <h2 className={styles.title}>
              {p.name}
              <br />
              <span style={{ fontWeight: 400, fontSize: "0.75em" }}>
                by {p.developer}
              </span>
            </h2>

            <ContactButton label="Связаться с агентом" icon="phone" />
          </div>

          {/* Центр — фото */}
          <div className={styles.center}>
            <div className={styles.mainImgWrap}>
              <img
                src={p.image}
                alt={p.name}
                className={styles.mainImg}
              />
              <button className={styles.mapBtn}>
                <MapPin size={14} />
                Посмотреть на карте
              </button>
            </div>
          </div>

          {/* Правая колонка */}
          <div className={styles.right}>
            <p className={styles.priceLabel}>
              <CircleDollarSign size={15} />
              Минимальная цена
            </p>
            <p className={styles.price}>{p.priceUsd}</p>

            <div className={styles.specRow}>
              <Trees size={14} className={styles.specIcon} />
              <span className={styles.spec}>{p.type}</span>
              <span className={styles.specDot} />
              <Maximize2 size={13} className={styles.specIcon} />
              <span className={styles.spec}>{p.area}</span>
              <span className={styles.specDot} />
              <CalendarCheck size={13} className={styles.specIcon} />
              <span className={styles.spec}>{p.delivery || "Готово"}</span>
            </div>

            <p className={styles.installment}>
              Рассрочка от <strong>2 лет</strong>
            </p>

            <div className={styles.planList}>
              {PAYMENT_PLAN.map(({ label, percent }) => (
                <div key={label} className={styles.planRow}>
                  <span className={styles.planLabel}>{label}</span>
                  <span className={styles.planPercent}>{percent}</span>
                </div>
              ))}
            </div>

            <p className={styles.tagGroupLabel}>ОСОБЕННОСТИ</p>
            <div className={styles.tagGroup}>
              {FEATURES.map(({ label, emoji }) => (
                <FeatureTag key={label} emoji={emoji}>
                  {label}
                </FeatureTag>
              ))}
            </div>

            <p className={styles.tagGroupLabel}>СТИЛЬ ЖИЗНИ</p>
            <div className={styles.tagGroup}>
              {LIFESTYLE.map((l) => (
                <span key={l} className={styles.lifestyleTag}>
                  <Leaf size={13} />
                  {l}
                </span>
              ))}
            </div>

            <div className={styles.thumbs}>
              <div className={styles.thumbStack}>
                {THUMBNAILS.map((src, i) => (
                  <img key={i} src={src} alt="" className={styles.thumb} />
                ))}
              </div>
              <div className={styles.thumbNav}>
                <button className={styles.thumbArrow}>
                  <ChevronLeft size={16} />
                </button>
                <button className={styles.thumbArrow}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Описание + галерея */}
        <div className={styles.bottom}>
          <div className={styles.descBlock}>
            <p className={styles.descLabel}>ОПИСАНИЕ</p>
            <h3 className={styles.descTitle}>
              Разработано
              <br />
              {p.developer}
            </h3>
          </div>

          <div className={styles.descText}>
            <p>
              {p.name} — премиальный объект недвижимости в {p.district}.
              Уникальное сочетание современного дизайна, инфраструктуры и
              выгодных условий рассрочки от застройщика {p.developer}.
            </p>
            <Button label="Подробнее" href={`/${p.id}`} icon="plus" />
          </div>

          <div className={styles.devLogo}>
            <div className={styles.devLogoWrap}>
              <img
                src={p.image}
                alt={p.developer}
                className={styles.devLogoImg}
              />
              <span className={styles.devLogoText}>{p.developer.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
