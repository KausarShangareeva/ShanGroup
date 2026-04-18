import Container from "@/components/layout/Container";
import styles from "./Presentation.module.css";

const PHONE = "+971 50 000 00 00";
const ADDRESS = "Dubai, Business Bay";

function Contacts() {
  return (
    <div className={styles.contacts}>
      <span>☎ {PHONE}</span>
      <span>📍 {ADDRESS}</span>
    </div>
  );
}

export default function Presentation() {
  return (
    <section className={styles.section}>
      <div className={styles.noise} />
      <img src="/shadow_1.png" alt="" className={styles.shadow} />

      <Container>
        <div className={styles.centeroverlay}>
          <div className={styles.overlay}>
            {/* ── Левая колонка ── */}
            <div className={styles.col}>
              <div className={styles.colContent}>
                <h2 className={styles.heading}>
                  Строим мечту.
                  <br />
                  <span className={styles.gold}>Создаём</span>
                  <br />
                  <span className={styles.gold}>надёжность.</span>
                </h2>
                <p className={styles.desc}>
                  Превращаем ваши цели в конкретные объекты — апартаменты, виллы
                  и пентхаусы, которые будут работать на вас годами.
                </p>
              </div>
              <Contacts />
            </div>

            {/* ── Центр — лого ── */}
            <div className={styles.center}>
              <div className={styles.centerLogoOuterWrap}>
                <div className={styles.centerLogoWrap}>
                  <div className={styles.centerLogoIcon}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect
                        x="20"
                        y="4"
                        width="8"
                        height="40"
                        rx="4"
                        fill="currentColor"
                      />
                      <rect
                        x="6"
                        y="14"
                        width="8"
                        height="30"
                        rx="4"
                        fill="currentColor"
                      />
                      <rect
                        x="34"
                        y="10"
                        width="8"
                        height="34"
                        rx="4"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className={styles.centerLogoName}>SHANGROUP</div>
                  <div className={styles.centerLogoSub}>
                    REAL ESTATE · DUBAI
                  </div>
                </div>
              </div>
            </div>

            {/* ── Правая колонка ── */}
            <div className={`${styles.col} ${styles.colRight}`}>
              <div className={styles.colContent}>
                <h2 className={styles.heading}>
                  Ваш актив
                  <br />
                  <span className={styles.gold}>в надёжных</span>
                  <br />
                  <span className={styles.gold}>руках.</span>
                </h2>
                <p className={styles.desc}>
                  Подбираем объекты под вашу цель и бюджет, сопровождаем на
                  каждом этапе сделки — от просмотра до ключей.
                </p>
              </div>
              <Contacts />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
