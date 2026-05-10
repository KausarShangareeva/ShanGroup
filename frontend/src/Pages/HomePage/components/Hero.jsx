"use client";

import { useTranslations } from "next-intl";
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

// Числовые метрики тикера — данные, не текст. Локализуются только
// "ключи" (название района / показателя) через переводы по необходимости.
const TICKER_BASE = [
  { k: "Burj Khalifa District", v: "+18.4%", trend: "up" },
  { k: "Palm Jumeirah", v: "+12.1%", trend: "up" },
  { k: "Dubai Marina", v: "+9.7%", trend: "up" },
  { k: "Business Bay", v: "+14.2%", trend: "up" },
];

// Цифры trust-блока статичны, подписи — из JSON.
const TRUST_NUMBERS = ["$2.4B", "2,140+", "320+", "RERA #2087"];

export default function Hero() {
  const t = useTranslations("HomePage.hero");
  const trust = t.raw("trust");

  const ticker = [
    ...TICKER_BASE,
    {
      k: t("ticker.avgRoiKey"),
      v: "8.3%",
      trend: "neutral",
    },
    {
      k: t("ticker.goldenVisaKey"),
      v: t("ticker.goldenVisaValue"),
      trend: "neutral",
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        {/* Headline (3-register) + meta strip */}
        <div className={styles.topRow}>
          <PageTitleH1
            primary={t("title.primary")}
            accent={t("title.accent")}
            place={t("title.place")}
          />

          <div className={styles.metaStrip}>
            <div className={styles.metaCard}>
              <div className={styles.metaKicker}>
                <span className={styles.liveDot} />
                {t("meta.liveKicker")}
              </div>
              <div className={styles.metaText}>{t("meta.text")}</div>
            </div>
            <div className={styles.statRow}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>{t("meta.roiLabel")}</div>
                <div className={styles.statValue}>
                  8.3<small>%</small>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>
                  {t("meta.goldenVisaLabel")}
                </div>
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
                {t("locChip")}
              </div>
            </div>

            {/* Agent card */}
            <div className={styles.cardWrap}>
              <div
                className={styles.badge}
                // style={{ backgroundImage: "url('/circle_text.svg')" }}
              >
                <div className={styles.badgeCenter}>
                  <img
                    src="/logoSH_01_mobile.svg"
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
                  {t("agent.online")}
                </div>

                <div className={styles.agentOverlay}>
                  <div className={styles.agentBlur}>
                    <div className={styles.agentNameRow}>
                      <span className={styles.agentName}>
                        {t("agent.name")}
                      </span>
                      <span className={styles.agentBadge}>
                        <IcVerified size={20} />
                      </span>
                    </div>
                    <p className={styles.agentBio}>{t("agent.bio")}</p>
                    <div className={styles.agentStats}>
                      <div className={styles.stat}>
                        <span className={styles.statN}>312</span>
                        <span className={styles.statL}>
                          {t("agent.stats.clients")}
                        </span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statN}>$248M</span>
                        <span className={styles.statL}>
                          {t("agent.stats.gmv")}
                        </span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statN}>4.96</span>
                        <span className={styles.statL}>
                          {t("agent.stats.reviews")}
                        </span>
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
                          {t("agent.cta.main")}
                        </span>
                        <span className={styles.tourSub}>
                          {t("agent.cta.sub")}
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
            {[...ticker, ...ticker].map((it, i) => (
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
          {trust.map((s, i) => (
            <div key={s.n} className={styles.trustStat}>
              <div
                className={`${styles.trustN} ${
                  TRUST_NUMBERS[i] === "RERA #2087" ? styles.trustNMono : ""
                }`}
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
