"use client";

import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import NewPropertyCard from "@/Pages/HomePage/components/NewPropertyCard";
import FunnelCard from "@/Pages/HomePage/components/FunnelCard";
import OBJECTS from "@/data/i18n/ru/properties/objects.json";
import VILLAS from "@/data/i18n/ru/properties/villas.json";
import APARTMENTS from "@/data/i18n/ru/properties/apartments.json";
import TOWNHOUSES from "@/data/i18n/ru/properties/townhouses.json";
import AGENTS from "@/data/i18n/ru/people/agents.json";

const AGENT = AGENTS["mustafa-amir"];
import { useLikes } from "@/components/LikeButton/useLikes";
import { useFunnel } from "@/utils/funnel";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "./FavoritesPage.module.css";

import Icon from "@/components/Icon/Icon";
const ALL_PROPERTIES = [...OBJECTS, ...VILLAS, ...APARTMENTS, ...TOWNHOUSES];

export default function FavoritesPage() {
  const isMobile = useIsMobile();
  const { liked, toggle } = useLikes();
  const { FUNNEL_PROPERTIES } = useFunnel();
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
            <Icon name="heart" size={44} className={styles.emptyIcon}  />
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
