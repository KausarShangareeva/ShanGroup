"use client";

import { Heart } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import NewPropertyCard from "@/Pages/HomePage/components/NewPropertyCard";
import PROPERTIES from "@/data/properties/objects.json";
import AGENT from "@/data/agent.json";
import { useLikes } from "@/components/LikeButton/useLikes";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { liked, toggle } = useLikes();
  const favorites = PROPERTIES.filter((p) => liked.has(p.id));

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag="Избранное"
          title="Сохранённые объекты"
          subtitle="Недвижимость, которую вы отметили сердечком"
          align="center"
        />

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <Heart size={48} strokeWidth={1.2} className={styles.emptyIcon} />
            <p className={styles.emptyText}>Вы ещё ничего не сохранили</p>
            <p className={styles.emptyHint}>
              Нажмите на сердечко на карточке объекта, чтобы добавить его сюда
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {favorites.map((p) => (
              <NewPropertyCard
                key={p.id}
                p={p}
                agent={AGENT}
                isLiked={liked.has(p.id)}
                onLike={() => toggle(p.id)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
