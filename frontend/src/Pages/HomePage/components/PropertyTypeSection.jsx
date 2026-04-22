"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Button from "@/components/Button/Button";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { useLikes } from "@/components/LikeButton/useLikes";
import styles from "./PropertyTypeSection.module.css";

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
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const indexRef = useRef(0);
  const maxIndexRef = useRef(0);
  const { liked, toggle } = useLikes();

  const hasCarousel = properties.length > visibleCount;
  const maxIndex = Math.max(0, properties.length - visibleCount);
  maxIndexRef.current = maxIndex;

  useEffect(() => {
    setVisibleCount(getVisible());
    const onResize = () => setVisibleCount(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync dots with native scroll
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let timer = null;
    const update = () => {
      const card = el.firstElementChild;
      if (!card) return;
      const step = card.offsetWidth + 24;
      const i = Math.min(Math.round(el.scrollLeft / step), maxIndexRef.current);
      indexRef.current = i;
      setIndex(i);
    };
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 80);
    };
    const onTouchEnd = () => {
      clearTimeout(timer);
      setTimeout(update, 300);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchend", onTouchEnd);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (i) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    if (!card) return;
    el.scrollLeft = i * (card.offsetWidth + 24);
    indexRef.current = i;
    setIndex(i);
  };

  const prev = () => {
    const cur = indexRef.current;
    scrollTo(cur <= 0 ? maxIndexRef.current : cur - 1);
  };

  const next = () => {
    const cur = indexRef.current;
    scrollTo(cur >= maxIndexRef.current ? 0 : cur + 1);
  };

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
      isLiked={liked.has(p.id)}
      onLike={() => toggle(p.id)}
    />
  );

  return (
    <section className={`${styles.section} ${dark ? styles.dark : ""}`}>
      <div className={styles.noise} />
      <div className={styles.inner}>
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
          <>
            <div className={styles.viewport} ref={viewportRef}>
              {properties.map((p) => (
                <div key={p.id} className={styles.cardWrap}>
                  {renderCard(p)}
                </div>
              ))}
            </div>
            <div className={styles.dots}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Слайд ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.grid}>
            {properties.map((p) => (
              <div key={p.id}>{renderCard(p)}</div>
            ))}
          </div>
        )}
      </Container>
      </div>
    </section>
  );
}
