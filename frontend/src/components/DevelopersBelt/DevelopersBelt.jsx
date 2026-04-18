import developersData from "@/data/developers.json";
import Container from "@/components/layout/Container";
import Button from "@/components/Button/Button";
import styles from "./DevelopersBelt.module.css";

const ALL_DEVS = Object.entries(developersData)
  .filter(([, d]) => d.logo)
  .map(([name, d]) => ({ name, file: d.logo.split("/").pop() }));

const chunk = Math.ceil(ALL_DEVS.length / 3);
const ROW1 = ALL_DEVS.slice(0, chunk);
const ROW2 = ALL_DEVS.slice(chunk, chunk * 2);
const ROW3 = ALL_DEVS.slice(chunk * 2);

function MarqueeRow({ items, direction = "left" }) {
  const doubled = [...items, ...items];
  return (
    <div className={styles.rowOuter}>
      <div className={`${styles.rowTrack} ${direction === "right" ? styles.trackRight : styles.trackLeft}`}>
        {doubled.map(({ name, file }, i) => (
          <div key={i} className={styles.tag}>
            <img
              src={`/developer_logo/${file}`}
              alt={name}
              className={styles.tagLogo}
            />
            <span className={styles.tagName}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DevelopersBelt() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            Мы выстроили тёплые отношения
            <br />
            <span className={styles.titleAccent}>с лучшими застройщиками ОАЭ</span>
          </h2>
          <p className={styles.sub}>
            Это позволяет получать объекты и условия, доступные не всем
          </p>
        </div>
      </Container>

      <div className={styles.rows}>
        <MarqueeRow items={ROW1} direction="left" />
        <MarqueeRow items={ROW2} direction="right" />
        <MarqueeRow items={ROW3} direction="left" />
      </div>

      <Container>
        <div className={styles.footer}>
          <Button label="Ещё + 100 застройщиков" href="/developers" invert />
        </div>
      </Container>
    </section>
  );
}
