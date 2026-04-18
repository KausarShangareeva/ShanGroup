import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import DEVELOPERS from "@/data/developers.json";
import { devSlug } from "@/utils/devSlug";
import styles from "./CommunitiesListPage.module.css";

function buildCommunityGroups() {
  const groups = [];
  for (const [key, dev] of Object.entries(DEVELOPERS)) {
    if (!dev.communities?.length) continue;
    groups.push({
      developerKey: key,
      logo: dev.logo,
      info: dev.info,
      communities: dev.communities,
    });
  }
  groups.sort((a, b) => {
    const at = DEVELOPERS[a.developerKey].top ? 0 : 1;
    const bt = DEVELOPERS[b.developerKey].top ? 0 : 1;
    return at - bt;
  });
  return groups;
}

export default function CommunitiesListPage() {
  const groups = buildCommunityGroups();
  const total = groups.reduce((acc, g) => acc + g.communities.length, 0);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <h1 className={styles.heroTitle}>
            {total}{" "}
            <span className={styles.heroTitleUnderline}>сообществ</span>
            <br />
            от ведущих застройщиков
          </h1>
        </Container>
      </section>

      <section>
        <Container>
          <div className={styles.groups}>
            {groups.map((group) => (
              <section key={group.developerKey} className={styles.group}>
                <div className={styles.groupHeader}>
                  {group.logo && (
                    <img
                      src={group.logo}
                      alt={group.developerKey}
                      className={styles.groupLogo}
                    />
                  )}
                  <div className={styles.groupHeaderText}>
                    <p className={styles.groupKicker}>Застройщик</p>
                    <h2 className={styles.groupTitle}>
                      <Link
                        href={`/developers/${devSlug(group.developerKey)}`}
                      >
                        {group.developerKey}
                      </Link>
                    </h2>
                    {group.info && <p className={styles.groupInfo}>{group.info}</p>}
                  </div>
                  <span className={styles.groupCount}>
                    {group.communities.length}
                  </span>
                </div>

                <div className={styles.grid}>
                  {group.communities.map((community) => (
                    <Link
                      key={community.href}
                      href={community.href}
                      className={styles.card}
                    >
                      <div className={styles.cardIcon}>
                        <MapPin size={18} />
                      </div>
                      <div className={styles.cardBody}>
                        <p className={styles.cardName}>{community.label}</p>
                        <p className={styles.cardDev}>{group.developerKey}</p>
                      </div>
                      <ArrowUpRight size={18} className={styles.cardArrow} />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
