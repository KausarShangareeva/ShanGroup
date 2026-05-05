"use client";

import { Heart } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import NewPropertyCard from "@/Pages/HomePage/components/NewPropertyCard";
import FunnelCard from "@/Pages/HomePage/components/FunnelCard";
import OBJECTS from "@/data/properties/objects.json";
import VILLAS from "@/data/properties/villas.json";
import APARTMENTS from "@/data/properties/apartments.json";
import TOWNHOUSES from "@/data/properties/townhouses.json";
import AGENT from "@/data/agent.json";
import { useLikes } from "@/components/LikeButton/useLikes";
import { FUNNEL_PROPERTIES } from "@/data/properties/funnelProperties";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "./FavoritesPage.module.css";

const ALL_PROPERTIES = [...OBJECTS, ...VILLAS, ...APARTMENTS, ...TOWNHOUSES];

export default function FavoritesPage() {
  const isMobile = useIsMobile();
  const { liked, toggle } = useLikes();
  const catalog = ALL_PROPERTIES.filter((p) => liked.has(p.id));
  const funnel = [...liked]
    .filter((id) => FUNNEL_PROPERTIES[id])
    .map((id) => ({ id, ...FUNNEL_PROPERTIES[id] }));
  const total = catalog.length + funnel.length;

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          tag="Избранное"
          title="Сохранённые объекты"
          align="center"
        />

        {total === 0 ? (
          <div className={styles.empty}>
            <Heart size={44} strokeWidth={1.2} className={styles.emptyIcon} />
            <p className={styles.emptyText}>Ничего не сохранено</p>
          </div>
        ) : (
          <>
            {funnel.length > 0 && (
              <div
                className={styles.grid}
                style={{ marginBottom: catalog.length > 0 ? 32 : 0 }}
              >
                {funnel.map((it) => (
                  <FunnelCard
                    key={it.id}
                    it={it}
                    liked
                    onLike={() => toggle(it.id)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            )}
            {catalog.length > 0 && (
              <div className={styles.grid}>
                {catalog.map((p) => (
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
          </>
        )}
      </Container>
    </section>
  );
}
