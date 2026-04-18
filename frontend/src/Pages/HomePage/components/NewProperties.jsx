"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Button from "@/components/Button/Button";
import NewPropertyCard from "./NewPropertyCard";
import PROPERTIES from "@/data/properties/objects.json";
import AGENT from "@/data/agent.json";
import { useLikes } from "@/components/LikeButton/useLikes";
import styles from "./NewProperties.module.css";

const GAP = 20; // px — matches 2rem at 10px base

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
  const stripRef = useRef(null);
  const timerRef = useRef(null);

  const maxIndex = Math.max(0, PROPERTIES.length - visibleCount);

  const applyTransform = useCallback((i) => {
    if (!viewportRef.current || !stripRef.current) return;
    const firstCard = stripRef.current.children[0];
    if (!firstCard) return;
    const step = firstCard.offsetWidth + GAP;
    stripRef.current.style.transform = `translateX(-${i * step}px)`;
  }, []);

  const goTo = useCallback(
    (i) => {
      const next = Math.max(0, Math.min(i, maxIndex));
      setIndex(next);
      applyTransform(next);
    },
    [maxIndex, applyTransform],
  );

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

  // Auto-advance
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  // Update visible count and recalculate on resize
  useEffect(() => {
    const onResize = () => {
      const v = getVisible();
      setVisibleCount(v);
      applyTransform(index);
    };
    setVisibleCount(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, applyTransform]);

  const handleArrow = (fn) => {
    fn();
    startTimer();
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionTitle
            tag="Новинки"
            title="Новая недвижимость в Дубае и ОАЭ"
            subtitle="Актуальные предложения от ведущих застройщиков — эксклюзивные условия и рассрочка"
            align="left"
            mb="0rem"
          />
          <div className={styles.headerRight}>
            <div className={styles.arrows}>
              <button
                className={styles.arrowBtn}
                onClick={() => handleArrow(prev)}
                aria-label="Назад"
              >
                <ChevronLeft size={22} strokeWidth={1.8} />
              </button>
              <button
                className={styles.arrowBtn}
                onClick={() => handleArrow(next)}
                aria-label="Вперёд"
              >
                <ChevronRight size={22} strokeWidth={1.8} />
              </button>
            </div>
            <Button label="В каталог" href="/new-builds" />
          </div>
        </div>

        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.strip} ref={stripRef}>
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
        </div>

        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => {
                goTo(i);
                startTimer();
              }}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
