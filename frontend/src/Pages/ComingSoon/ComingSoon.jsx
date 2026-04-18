import Link from "next/link";
import Container from "@/components/layout/Container";
import styles from "./ComingSoon.module.css";

export default function ComingSoon({ title, description }) {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.inner}>
          <span className={styles.tag}>Скоро</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>
            {description || "Страница находится в разработке. Скоро здесь появится полная информация."}
          </p>
          <Link href="/" className={styles.btn}>
            На главную
          </Link>
        </div>
      </Container>
    </main>
  );
}
