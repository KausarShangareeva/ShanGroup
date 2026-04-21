import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./WhyDubai.module.css";

const CIRCLES = [
  {
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775054908/airport_ysry7t.png",
    value: "ТОП-5",
    label: "самых посещаемых городов мира",
    list: ["БАНГКОК", "ПАРИЖ", "ЛОНДОН", "ДУБАЙ", "СИНГАПУР"],
    highlightIndex: 3,
  },
  {
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/v1775052573/police_at4gkb.png",
    value: "ТОП-3",
    label: "самых безопасных городов мира",
  },
  {
    img: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    value: "350",
    label: "солнечных дней \n в году",
  },
  {
    img: "https://images.unsplash.com/photo-1752228898347-dac1377e67b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    value: "1 МЕСТО",
    label: "в мире по объёму потраченных туристами денег",
    gold: "$ 31 000 000 000",
  },
];

export default function WhyDubai() {
  return (
    <section className={styles.section}>
      <img src="/shadow_1.png" alt="" className={styles.shadow} />
      <div className={styles.noise} />
      <div className={styles.overlay}>
        <Container>
          <SectionTitle
            title="МЫ ЗНАЕМ ДУБАЙ ИЗНУТРИ"
            subtitle="ShanGroup — это команда экспертов, которая помогает найти, купить и выгодно инвестировать в недвижимость Дубая. Апартаменты у моря, пентхаусы в Downtown, виллы с видом на Бурдж-Халифа — мы подберём объект под вашу цель и бюджет, и сопроводим на каждом этапе сделки."
            align="center"
            dark
          />
          <p className={styles.cursive}>ваш актив в надёжных руках.</p>

          <div className={styles.circles}>
            {CIRCLES.map(
              ({ img, value, label, list, highlightIndex, gold }, i) => (
                <div key={i} className={styles.circleItem}>
                  <div className={styles.circleRing}>
                    <div className={styles.circleWrap}>
                      <img src={img} alt={label} className={styles.circleImg} />
                    </div>
                  </div>
                  <div className={styles.circleText}>
                    <div className={styles.circleValue}>{value}</div>
                    <div className={styles.circleLabel}>{label}</div>
                    {list && (
                      <ul className={styles.circleList}>
                        {list.map((el, j) => (
                          <li
                            key={j}
                            className={`${styles.circleListItem} ${j === highlightIndex ? styles.circleListGold : ""}`}
                          >
                            <span className={styles.circleListNum}>
                              {j + 1}
                            </span>
                            {el}
                          </li>
                        ))}
                      </ul>
                    )}
                    {gold && <div className={styles.circleGold}>{gold}</div>}
                  </div>
                </div>
              ),
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
