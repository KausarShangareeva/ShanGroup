// "Почему Дубай" — 4 stat cards in the editorial-neumorphic system.
// Each card: photo on top + mono eyebrow + big display value + label, plus
// optional ranked list (Top-5 cities) or italic-sand gold figure.

import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./WhyDubai.module.css";

const STATS = [
  {
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775054908/airport_ysry7t.png",
    eyebrow: "Туризм",
    value: "ТОП-5",
    label: "самых посещаемых городов мира",
    list: ["Бангкок", "Париж", "Лондон", "Дубай", "Сингапур"],
    highlightIndex: 3,
  },
  {
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/v1775052573/police_at4gkb.png",
    eyebrow: "Безопасность",
    value: "ТОП-3",
    label: "самых безопасных городов мира",
  },
  {
    img: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop",
    eyebrow: "Климат",
    value: "350",
    label: "солнечных дней в году",
  },
  {
    img: "https://images.unsplash.com/photo-1752228898347-dac1377e67b0?q=80&w=2070&auto=format&fit=crop",
    eyebrow: "Расходы туристов",
    value: "1 место",
    label: "в мире по объёму потраченных туристами денег",
    gold: "$ 31 000 000 000",
  },
];

export default function WhyDubai() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag="Почему Дубай"
          title="Мы знаем Дубай"
          titleAccent="изнутри"
          subtitle="ShanGroup — команда экспертов, которая помогает найти, купить и выгодно инвестировать в недвижимость Дубая. Апартаменты у моря, пентхаусы в Downtown, виллы с видом на Бурдж-Халифа — мы подберём объект под вашу цель и бюджет, и сопроводим на каждом этапе сделки."
          align="center"
        />

        <p className={styles.cursive}>ваш актив в надёжных руках.</p>

        <div className={styles.cards}>
          {STATS.map((s, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={s.img} alt={s.label} className={styles.img} />
              </div>

              <div className={styles.body}>
                <div className={styles.eyebrow}>{s.eyebrow}</div>
                <div className={styles.value}>{s.value}</div>
                <div className={styles.label}>{s.label}</div>

                {s.list && (
                  <ol className={styles.list}>
                    {s.list.map((city, j) => {
                      const active = j === s.highlightIndex;
                      return (
                        <li
                          key={city}
                          className={`${styles.row} ${active ? styles.rowHighlight : ""}`}
                        >
                          <span className={styles.rowNum}>{j + 1}</span>
                          <span className={styles.rowName}>{city}</span>
                        </li>
                      );
                    })}
                  </ol>
                )}

                {s.gold && <div className={styles.gold}>{s.gold}</div>}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
