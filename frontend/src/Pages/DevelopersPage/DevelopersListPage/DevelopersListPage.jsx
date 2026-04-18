import Container from "@/components/layout/Container";
import CategoryTabs from "./CategoryTabs";
import styles from "./DevelopersListPage.module.css";

export default function DevelopersListPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <h1 className={styles.heroTitle}>
            Полный каталог{" "}
            <span className={styles.heroTitleUnderline}>застройщиков</span>
            <br />
            недвижимости в ОАЭ
          </h1>
        </Container>
      </section>

      <section>
        <Container>
          <CategoryTabs />
        </Container>
      </section>
    </main>
  );
}
