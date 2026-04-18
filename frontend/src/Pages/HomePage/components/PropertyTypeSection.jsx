"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Button from "@/components/Button/Button";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import styles from "./PropertyTypeSection.module.css";

const GAP = 24; // px, matches 2.4rem gap at 10px base

function getVisible() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 560) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

export default function PropertyTypeSection({
  tag,
  title,
  properties,
  catalogHref,
  dark = false,
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const hasCarousel = properties.length > visibleCount;
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const stripRef = useRef(null);

  const maxIndex = Math.max(0, properties.length - visibleCount);

  const applyTransform = useCallback((i) => {
    if (!viewportRef.current || !stripRef.current) return;
    const firstCard = stripRef.current.children[0];
    if (!firstCard) return;
    const step = firstCard.offsetWidth + GAP;
    stripRef.current.style.transform = `translateX(-${i * step}px)`;
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => {
      const n = prev >= maxIndex ? 0 : prev + 1;
      applyTransform(n);
      return n;
    });
  }, [maxIndex, applyTransform]);

  const prev = useCallback(() => {
    setIndex((prev) => {
      const n = prev <= 0 ? maxIndex : prev - 1;
      applyTransform(n);
      return n;
    });
  }, [maxIndex, applyTransform]);

  // Пересчёт при ресайзе, чтобы слайдер оставался выровненным.
  useEffect(() => {
    const onResize = () => {
      setVisibleCount(getVisible());
      applyTransform(index);
    };
    setVisibleCount(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, applyTransform]);

  const renderCard = (p) => (
    <PropertyCard
      name={p.name}
      price={p.priceUsd}
      district={p.district}
      img={p.image}
      href={`/${p.id}`}
      featured={p.visa}
      offPlan={p.delivery && p.delivery !== "Готово"}
      delivery={p.delivery && p.delivery !== "Готово" ? p.delivery : undefined}
      developer={p.developer}
      beds={p.beds}
      baths={p.baths}
      area={p.area}
    />
  );

  return (
    <section className={`${styles.section} ${dark ? styles.dark : ""}`}>
      <Container>
        <div className={styles.header}>
          <SectionTitle
            tag={tag}
            title={title}
            align="left"
            dark={dark}
            mb="0"
          />
          <div className={styles.headerRight}>
            {hasCarousel && (
              <div className={styles.arrows}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={prev}
                  aria-label="Назад"
                >
                  <ChevronLeft size={22} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={next}
                  aria-label="Вперёд"
                >
                  <ChevronRight size={22} strokeWidth={1.8} />
                </button>
              </div>
            )}
            <Button label="Смотреть все" href={catalogHref} invert={dark} />
          </div>
        </div>

        {hasCarousel ? (
          <div className={styles.viewport} ref={viewportRef}>
            <div className={styles.strip} ref={stripRef}>
              {properties.map((p) => (
                <div key={p.id} className={styles.cardWrap}>
                  {renderCard(p)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {properties.map((p) => (
              <div key={p.id}>{renderCard(p)}</div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
