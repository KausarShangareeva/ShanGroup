"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Button from "@/components/Button/Button";
import NewPropertyCard from "./NewPropertyCard";
import ALL_PROPERTIES from "@/data/properties/objects.json";

const PROPERTIES = ALL_PROPERTIES.filter((p) => p.video);
import AGENT from "@/data/agent.json";
import { useLikes } from "@/components/LikeButton/useLikes";
import styles from "./NewProperties.module.css";

function getVisible() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 960) return 2;
  return 3;
}

export default function NewProperties() {
  const { liked, toggle } = useLikes();
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const viewportRef = useRef(null);
  const maxIndex = Math.max(0, PROPERTIES.length - visibleCount);
  const indexRef = useRef(0);

  const scrollTo = useCallback((i) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    if (!card) return;
    const step = card.offsetWidth + 20;
    el.scrollLeft = i * step;
    indexRef.current = i;
    setIndex(i);
  }, []);

  const maxIndexRef = useRef(maxIndex);
  maxIndexRef.current = maxIndex;

  const next = useCallback(() => {
    const cur = indexRef.current;
    const max = maxIndexRef.current;
    scrollTo(cur >= max ? 0 : cur + 1);
  }, [scrollTo]);

  const prev = useCallback(() => {
    const cur = indexRef.current;
    const max = maxIndexRef.current;
    scrollTo(cur <= 0 ? max : cur - 1);
  }, [scrollTo]);

  useEffect(() => {
    setVisibleCount(getVisible());
    const onResize = () => setVisibleCount(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync dot indicator with native scroll position
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let timer = null;
    const update = () => {
      const card = el.firstElementChild;
      if (!card) return;
      const step = card.offsetWidth + 20;
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

  return (
    <section className={styles.section}>
      <div className={styles.noise} />
      <div className={styles.inner}>
      <Container>
        <div className={styles.header}>
          <SectionTitle
            tag="Новинки"
            title="Новая недвижимость в Дубае и ОАЭ"
            subtitle="Актуальные предложения от ведущих застройщиков — эксклюзивные условия и рассрочка"
            align="left"
            mb="0rem"
            dark
          />
          <div className={styles.headerRight}>
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
            <Button label="В каталог" href="/new-builds" />
          </div>
        </div>

        <div className={styles.viewport} ref={viewportRef}>
          {PROPERTIES.map((p) => (
            <div key={p.id} className={styles.cardWrap}>
              <NewPropertyCard
                p={p}
                agent={AGENT}
                isLiked={liked.has(p.id)}
                onLike={() => toggle(p.id)}
              />
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
      </Container>
      </div>
    </section>
  );
}
