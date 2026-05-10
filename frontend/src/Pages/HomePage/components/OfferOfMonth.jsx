"use client";

// "Предложение месяца" — carousel of 3 properties with prev/next arrows over
// the photo, mobile pagination dots, and a 3-column desktop layout
// (description / image / pricing). Mirrors the artifact's MonthlyOffer.

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  IcPin,
  IcDollar,
  IcCalendar,
  IcChevron,
  IcCheck,
  IcPhone,
} from "@/components/HeroIcons/HeroIcons";
import Icon from "@/components/Icon/Icon";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Button from "@/components/Button/Button";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PROPERTIES from "@/data/i18n/ru/properties/objects.json";
import styles from "./OfferOfMonth.module.css";

// Pick 3 daily-rotated offers from PROPERTIES so the home page rotates
// every day but stays stable within a session.
function getRotatingOffers() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const N = PROPERTIES.length;
  return [
    PROPERTIES[dayOfYear % N],
    PROPERTIES[(dayOfYear + 1) % N],
    PROPERTIES[(dayOfYear + 2) % N],
  ];
}

export default function OfferOfMonth() {
  const t = useTranslations("HomePage.offerOfMonth");
  const FEATURES = t.raw("featureList");
  const PAYMENT_PLAN = t.raw("paymentPlan");
  const offers = getRotatingOffers();
  const [idx, setIdx] = useState(0);
  const total = offers.length;
  const offer = offers[idx];
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  const lifestyle = [offer.district, offer.emirate.replace(/-/g, " ")];
  const thumbs = [offer.image, offer.image, offer.image, offer.image];

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag={t("tag")}
          title={t("titleA")}
          titleAccent={t("titleB")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className={styles.layout}>
          {/* Левая колонка — описание */}
          <div className={styles.left}>
            <p className={styles.descLabel}>{t("descLabel")}</p>
            <h2 className={styles.title}>
              {offer.name}
              <span className={styles.titleAccent}>{t("by")} {offer.developer}</span>
            </h2>

            <PrimaryButton size="md" icon={<IcPhone />}>
              {t("ctaContact")}
            </PrimaryButton>

            <p className={styles.leftDesc}>
              {t("description", {
                name: offer.name,
                district: offer.district,
                developer: offer.developer,
              })}
            </p>
          </div>

          {/* Центр — фото с каруселью */}
          <div className={styles.center}>
            <div className={styles.mainImgWrap}>
              <img src={offer.image} alt={offer.name} className={styles.mainImg} />
              <div className={styles.statusPill}>
                <span className={styles.statusDot} />
                {t("live", { district: offer.district })}
              </div>

              {/* Carousel arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущий"
                className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
              >
                <span className={styles.carouselChevronLeft}>
                  <IcChevron size={14} />
                </span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующий"
                className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
              >
                <span className={styles.carouselChevronRight}>
                  <IcChevron size={14} />
                </span>
              </button>

              {/* Mobile pagination dots */}
              <div className={styles.dots} aria-hidden>
                {offers.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
                  />
                ))}
              </div>

              <button type="button" className={styles.mapBtn}>
                <IcPin size={13} />
                {t("viewMap")}
              </button>
            </div>
          </div>

          {/* Правая колонка — цена и детали */}
          <div className={styles.right}>
            <div className={styles.priceCard}>
              <p className={styles.priceLabel}>
                <IcDollar size={13} />
                {t("minPrice")}
              </p>
              <p className={styles.price}>
                <span className={styles.priceFromTag}>{t("from")}</span>
                {offer.priceUsd}
              </p>
              <div className={styles.specRow}>
                <Icon name="trees" size={13} className={styles.specIcon}  />
                <span className={styles.spec}>{offer.type}</span>
                <span className={styles.specDot} />
                <Icon name="maximize-2" size={13} className={styles.specIcon}  />
                <span className={styles.spec}>{offer.area}</span>
                <span className={styles.specDot} />
                <IcCalendar size={13} />
                <span className={styles.spec}>{offer.delivery || t("ready")}</span>
              </div>
              <p className={styles.installment}>
                {t("installmentFrom")} <strong>{t("installmentYears")}</strong>
              </p>
            </div>

            <div className={styles.planList}>
              {PAYMENT_PLAN.map(({ label, percent }) => (
                <div key={label} className={styles.planRow}>
                  <span className={styles.planLabel}>{label}</span>
                  <span className={styles.planPercent}>{percent}</span>
                </div>
              ))}
            </div>

            <div>
              <p className={styles.tagGroupLabel}>{t("features")}</p>
              <div className={styles.tagGroup}>
                {FEATURES.map((label) => (
                  <span key={label} className={styles.featureTag}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className={styles.tagGroupLabel}>{t("lifestyle")}</p>
              <div className={styles.tagGroup}>
                {lifestyle.map((l) => (
                  <span key={l} className={styles.lifestyleTag}>
                    <Icon name="leaf" size={12}  />
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.thumbs}>
              {thumbs.map((src, i) => (
                <img key={i} src={src} alt="" className={styles.thumb} />
              ))}
            </div>

            {/* "Подробнее" — visible on mobile only (CSS) */}
            <div className={styles.mobileDetailsCta}>
              <Button label={t("more")} href={`/${offer.id}`} icon="plus" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
