import {
  BadgeCheck,
  Users,
  MapPin,
  Building2,
  DollarSign,
  BedDouble,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import Container from "@/components/layout/Container";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section}>
      <Container>
        {/* Заголовок */}
        <h1 className={styles.title}>
          Недвижимость для жизни
          <br />и инвестиций{" "}
          <span
            className={styles.titleOval}
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dxp7ppipg/image/upload/v1771921144/palm_jumeirah_oksqfu.png)",
            }}
          />{" "}
          <em className={styles.titleAccent}>в Дубае</em>
        </h1>

        {/* Основной блок */}
        <div className={styles.heroBody}>
          <div className={styles.main}>
            {/* Фото */}
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
            </div>

            {/* Обёртка карточки + бейдж */}
            <div className={styles.cardWrap}>
              {/* Кружок-бейдж */}
              <div
                className={styles.badge}
                style={{ backgroundImage: "url('/circle_text.svg')" }}
              >
                <div className={styles.badgeCenter}>
                  <span className={styles.badgeSG}>SG</span>
                </div>
              </div>

              {/* Карточка агента */}
              <div className={styles.card}>
                <video
                  src="https://res.cloudinary.com/dxp7ppipg/video/upload/q_auto:best,f_auto/v1774365845/gKRaiHxe5Korr4xKVI4u02CkF95q7D00E7Rmlp02JSAlhI_gigx6f.mp4"
                  className={styles.agentVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className={styles.agentOverlay}>
                  <div className={styles.agentBlur}>
                    <div className={styles.agentNameRow}>
                      <span className={styles.agentName}>Джалиль</span>
                      <BadgeCheck size={22} className={styles.agentBadge} />
                    </div>
                    <p className={styles.agentBio}>
                      Агент по недвижимости с опытом работы в Дубае — помогаю
                      найти идеальный объект.
                    </p>
                    <div className={styles.agentStats}>
                      <div className={styles.stat}>
                        <Users size={15} />
                        <span>312 клиентов</span>
                      </div>
                      <div className={styles.stat}>
                        <Building2 size={15} />
                        <span>57 объектов</span>
                      </div>
                    </div>
                    <button className={styles.tourBtn}>
                      <span className={styles.tourMain}>
                        Записаться на просмотр
                      </span>
                      <span className={styles.tourSub}>
                        Мы перезвоним через 15 минут
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Строка поиска — поверх видео, на высоте кнопки */}
          <div className={styles.searchBar}>
            <div className={styles.searchField}>
              <MapPin size={16} className={styles.searchIcon} />
              <div>
                <span className={styles.fieldLabel}>Локация</span>
                <span className={styles.fieldValue}>Дубай, ОАЭ</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.searchField}>
              <Building2 size={16} className={styles.searchIcon} />
              <div>
                <span className={styles.fieldLabel}>Тип недвижимости</span>
                <span className={styles.fieldValue}>Апартаменты</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.searchField}>
              <DollarSign size={16} className={styles.searchIcon} />
              <div>
                <span className={styles.fieldLabel}>Цена</span>
                <span className={styles.fieldValue}>$500K — $5M</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.searchField}>
              <BedDouble size={16} className={styles.searchIcon} />
              <div>
                <span className={styles.fieldLabel}>Спальни</span>
                <span className={styles.fieldValue}>1 — 5</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.searchField}>
              <SlidersHorizontal size={16} className={styles.searchIcon} />
              <span className={styles.fieldValue}>Ещё</span>
            </div>

            <button className={styles.searchBtn}>
              <Search size={18} />
              Найти
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
