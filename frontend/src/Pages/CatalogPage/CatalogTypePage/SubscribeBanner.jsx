import styles from "./SubscribeBanner.module.css";

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.29c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.697l-2.95-.924c-.64-.203-.654-.64.136-.954l11.526-4.443c.537-.194 1.006.131.69.872z" />
    </svg>
  );
}

const FAN_IMAGES = [
  "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542871/Sobha_Tranquil_Beach_Residences_j7sqzf.avif",
  "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542870/Rosewood_Residences_Dubai_z5qdxt.webp",
  "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542871/Karl_Lagerfeld_Beach_Residences_Al_Marjan_Island_jwoyqn.webp",
  "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542870/Binghatti_Vision_Iconic_wtwzm7.webp",
  "https://res.cloudinary.com/dxp7ppipg/image/upload/v1774542913/Celesto_2_by_Tarrad_omfujw.webp",
];

const FAN_DATA = [
  { x: -11, y: 3.5, rot: -20, z: 1 },
  { x: -5.5, y: 1.5, rot: -10, z: 2 },
  { x: 0, y: 0, rot: 0, z: 5 },
  { x: 5.5, y: 1.5, rot: 10, z: 2 },
  { x: 11, y: 3.5, rot: 20, z: 1 },
];

export default function SubscribeBanner() {
  return (
    <div className={styles.wrap}>
      <div className={styles.noise} />
      <div className={styles.inner}>
          <div className={styles.left}>
            <p className={styles.text}>
              Не пропускайте старты продаж жилых комплексов
              <br />
              <span className={styles.highlight}>
                по лучшей цене и с эксклюзивными условиями
              </span>
            </p>

            <div className={styles.btns}>
              <a
                href="https://wa.me/971500000000"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnWa}`}
              >
                <span className={styles.btnIconWrap}>
                  <WhatsAppIcon />
                </span>
                <span className={styles.btnText}>
                  <span className={styles.btnLabel}>WhatsApp</span>
                  <span className={styles.btnSub}>Подписаться на группу</span>
                </span>
              </a>

              <a
                href="https://t.me/shangroup"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnTg}`}
              >
                <span className={styles.btnIconWrap}>
                  <TelegramIcon />
                </span>
                <span className={styles.btnText}>
                  <span className={styles.btnLabel}>Telegram</span>
                  <span className={styles.btnSub}>Подписаться на канал</span>
                </span>
              </a>
            </div>
          </div>

          <div className={styles.fanWrap}>
            {FAN_IMAGES.map((src, i) => (
              <div
                key={i}
                className={styles.fanCard}
                style={{
                  transform: `translate(calc(-50% + ${FAN_DATA[i].x}rem), calc(-50% + ${FAN_DATA[i].y}rem)) rotate(${FAN_DATA[i].rot}deg)`,
                  zIndex: FAN_DATA[i].z,
                }}
              >
                <img src={src} alt="" className={styles.fanImg} />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
