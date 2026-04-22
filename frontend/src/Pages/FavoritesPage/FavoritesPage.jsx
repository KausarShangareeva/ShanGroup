"use client";

import { Heart } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import NewPropertyCard from "@/Pages/HomePage/components/NewPropertyCard";
import OBJECTS from "@/data/properties/objects.json";
import VILLAS from "@/data/properties/villas.json";
import APARTMENTS from "@/data/properties/apartments.json";
import TOWNHOUSES from "@/data/properties/townhouses.json";
import AGENT from "@/data/agent.json";
import { useLikes } from "@/components/LikeButton/useLikes";
import styles from "./FavoritesPage.module.css";

const ALL_PROPERTIES = [...OBJECTS, ...VILLAS, ...APARTMENTS, ...TOWNHOUSES];

export default function FavoritesPage() {
  const { liked, toggle } = useLikes();
  const favorites = ALL_PROPERTIES.filter((p) => liked.has(p.id));

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag="Избранное"
          title="Сохранённые объекты"
          align="center"
        />

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <Heart size={44} strokeWidth={1.2} className={styles.emptyIcon} />
            <p className={styles.emptyText}>Ничего не сохранено</p>
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
