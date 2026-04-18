import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import { EMIRATES } from "@/utils/properties";
import styles from "./EmiratesPage.module.css";

export default function EmiratesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <h1 className={styles.heroTitle}>
            Недвижимость в{" "}
            <span className={styles.heroTitleUnderline}>7 эмиратах</span>
            <br />
            ОАЭ
          </h1>
        </Container>
      </section>

      <section>
        <Container>
          <div className={styles.grid}>
            {EMIRATES.map((emirate, i) => (
              <Link
                key={emirate.slug}
                href={emirate.href}
                className={styles.card}
              >
                <div className={styles.cardImgWrap}>
                  {emirate.image ? (
                    <img
                      src={emirate.image}
                      alt={emirate.name}
                      className={styles.cardImg}
                    />
                  ) : (
                    <div className={styles.cardImgFallback}>
                      <MapPin size={32} />
                    </div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardInfo}>
                      <h2 className={styles.cardName}>{emirate.name}</h2>
                    </div>
                    <span className={styles.cardNumber}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className={styles.cardDesc}>{emirate.description}</p>
                  <span className={styles.cardLink}>
                    Смотреть объекты <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
