import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Button from "@/components/Button/Button";
import BlogCard from "@/Pages/BlogPage/components/BlogCard";
import BLOG from "@/data/blog.json";
import styles from "./ExpertAnalytics.module.css";

export default function ExpertAnalytics() {
  // Берём три самые свежие записи блога — те же карточки, что в /blog.
  const posts = BLOG.items.slice(0, 3);

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag="Аналитика"
          title="Аналитика от экспертов Inside"
          subtitle="Актуальные обзоры рынка, инвестиционные стратегии и разбор тенденций от команды ShanGroup"
          align="center"
        />

        <div className={styles.list}>
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

        <div className={styles.more}>
          <Button label="Читать еще статьи" href="/blog" />
        </div>
      </Container>
    </section>
  );
}
