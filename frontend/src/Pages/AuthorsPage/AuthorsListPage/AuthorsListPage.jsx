import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import AgentPreviewCard from "@/components/AgentPreviewCard/AgentPreviewCard";
import AUTHORS from "@/data/authors.json";
import styles from "./AuthorsListPage.module.css";

export default function AuthorsListPage() {
  return (
    <div className={styles.page}>
      <Container>
        <SectionTitle
          tag="Наша команда"
          title="Агенты ShanGroup"
          subtitle="Эксперты по недвижимости в ОАЭ — помогаем выбрать, купить и оформить объект под любую стратегию."
          align="left"
          mb="3.2rem"
        />

        <div className={styles.grid}>
          {AUTHORS.map((a) => (
            <AgentPreviewCard key={a.slug} agent={a} />
          ))}
        </div>
      </Container>
    </div>
  );
}
