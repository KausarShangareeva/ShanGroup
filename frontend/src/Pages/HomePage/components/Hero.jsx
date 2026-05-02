import {
  IcVerified,
  IcCalendar,
  IcTrend,
} from "@/components/HeroIcons/HeroIcons";
import Container from "@/components/layout/Container";
import SearchBar from "@/components/SearchBar/SearchBar";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import PageTitleH1 from "@/components/PageTitleH1/PageTitleH1";
import styles from "./Hero.module.css";

const TICKER = [
  { k: "Burj Khalifa District", v: "+18.4%", trend: "up" },
  { k: "Palm Jumeirah", v: "+12.1%", trend: "up" },
  { k: "Dubai Marina", v: "+9.7%", trend: "up" },
  { k: "Business Bay", v: "+14.2%", trend: "up" },
  { k: "Avg. ROI 2026", v: "8.3%", trend: "neutral" },
  { k: "Golden Visa", v: "from $545K", trend: "neutral" },
];

const TRUST_STATS = [
  { n: "$2.4B", l: "Сделок 2018–2025" },
  { n: "2,140+", l: "Клиентов из 47 стран" },
  { n: "320+", l: "Эксклюзивных объектов" },
  { n: "RERA #2087", l: "Лицензия Дубая", mono: true },
];

export default function Hero() {
  return (
    <section className={styles.section}>
      <Container>
        {/* Headline (3-register) + meta strip */}
        <div className={styles.topRow}>
          <PageTitleH1
            primary="Недвижимость"
            accent="для жизни и инвестиций"
            place="в Дубае"
          />

          <div className={styles.metaStrip}>
            <div className={styles.metaCard}>
              <div className={styles.metaKicker}>
                <span className={styles.liveDot} />
                Live · 28 объектов сегодня
              </div>
              <div className={styles.metaText}>
                Закрытый клуб инвесторов в недвижимость ОАЭ. Доступ к off-plan
                до публичного запуска.
              </div>
            </div>
            <div className={styles.statRow}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>ROI 2025</div>
                <div className={styles.statValue}>
                  8.3<small>%</small>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Golden Visa</div>
                <div className={styles.statValue}>
                  $545K<small>+</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero body: image + agent + search */}
        <div className={styles.heroBody}>
          <div className={styles.main}>
            {/* Hero image — ken-burns + glass live chip */}
            <div className={styles.imageWrap}>
              <video
                src="https://res.cloudinary.com/dxp7ppipg/video/upload/v1774713268/v-1_qagpaf.mp4"
                className={styles.image}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              <div className={styles.imageOverlay} />
              <div className={styles.locChip}>
                <span className={styles.liveDot} />
                Live · Dubai Marina
              </div>
            </div>

            {/* Agent card */}
            <div className={styles.cardWrap}>
              <div
                className={styles.badge}
                style={{ backgroundImage: "url('/circle_text.svg')" }}
              >
                <div className={styles.badgeCenter}>
                  <img
                    src="/logo2.png"
                    alt="ShanGroup"
                    className={styles.badgeLogo}
                  />
                </div>
              </div>

              <div className={styles.card}>
                <video
                  src="https://res.cloudinary.com/dxp7ppipg/video/upload/q_auto:best,f_auto/v1774365845/gKRaiHxe5Korr4xKVI4u02CkF95q7D00E7Rmlp02JSAlhI_gigx6f.mp4"
                  className={styles.agentVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                />

                <div className={styles.onlineTag}>
                  <span className={styles.onlineDot} />
                  Online · Сейчас доступен
                </div>

                <div className={styles.agentOverlay}>
                  <div className={styles.agentBlur}>
                    <div className={styles.agentNameRow}>
                      <span className={styles.agentName}>Джалиль Шан</span>
                      <span className={styles.agentBadge}>
                        <IcVerified size={20} />
                      </span>
                    </div>
                    <p className={styles.agentBio}>
                      Старший консультант · 9 лет в Dubai luxury · RU / EN / AR
                    </p>
                    <div className={styles.agentStats}>
                      <div className={styles.stat}>
                        <span className={styles.statN}>312</span>
                        <span className={styles.statL}>клиентов</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statN}>$248M</span>
                        <span className={styles.statL}>GMV 2025</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statN}>4.96</span>
                        <span className={styles.statL}>★ 89 отзывов</span>
                      </div>
                    </div>
                    <PrimaryButton
                      variant="light"
                      size="md"
                      fullWidth
                      icon={<IcCalendar />}
                      trailingArrow
                    >
                      <span className={styles.tourBtnText}>
                        <span className={styles.tourMain}>
                          Записаться на просмотр
                        </span>
                        <span className={styles.tourSub}>
                          Перезвоним в течение 15 минут
                        </span>
                      </span>
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar — interactive, per-field dropdowns */}
          <div className={styles.searchBarWrap}>
            <SearchBar />
          </div>
        </div>

        {/* Market ticker */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[...TICKER, ...TICKER].map((it, i) => (
              <span key={i} className={styles.tickerItem}>
                <span className={styles.tickerKey}>{it.k}</span>
                <span
                  className={`${styles.tickerVal} ${
                    it.trend === "up" ? styles.tickerValUp : ""
                  }`}
                >
                  {it.v}
                </span>
                {it.trend === "up" && (
                  <span className={styles.tickerTrend}>
                    <IcTrend size={11} />
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Trust row */}
        <div className={styles.trustRow}>
          {TRUST_STATS.map((s, i) => (
            <div key={s.n} className={styles.trustStat}>
              <div
                className={`${styles.trustN} ${s.mono ? styles.trustNMono : ""}`}
              >
                {s.n}
              </div>
              <div className={styles.trustL}>{s.l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
