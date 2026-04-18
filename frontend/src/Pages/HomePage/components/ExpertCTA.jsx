"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import Container from "@/components/layout/Container";
import styles from "./ExpertCTA.module.css";

export default function ExpertCTA() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Привет! Меня зовут ${name}, мой телефон: ${phone}. Хочу проконсультироваться.`,
    );
    window.open(`https://wa.me/971500000000?text=${msg}`, "_blank");
  }

  return (
    <section className={styles.section}>
      {/* Фото на всю левую половину — вне Container */}
      <div className={styles.visualAbsolute}>
        <img
          src="https://res.cloudinary.com/dxp7ppipg/image/upload/v1771921729/lagoon_unvmqv.png"
          alt="Дубай"
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
        <span className={styles.watermark}>SHAN</span>
      </div>

      <Container>
        <div className={styles.inner}>
          {/* Левый спейсер — занимает место под фото */}
          <div className={styles.spacer} />

          {/* Правая колонка — форма */}
          <div className={styles.right}>
            <div className={styles.brand}>
              <span className={styles.brandName}>ShanGroup</span>
              <span className={styles.brandSub}>Недвижимость в ОАЭ</span>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>
                Получите бесплатную консультацию эксперта по рынку ОАЭ
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label className={styles.label}>Ваше имя</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Телефон</label>
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="+971 __ ___ ____"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Получить консультацию
                  <ArrowRight size={17} />
                </button>
              </form>
            </div>

            <div className={styles.ctaBtns}>
              <a
                href="tel:+971500000000"
                className={styles.ctaBtn}
              >
                <Phone size={16} />
                Позвонить
              </a>
              <a
                href="https://wa.me/971500000000"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <MessageCircle size={16} />
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
