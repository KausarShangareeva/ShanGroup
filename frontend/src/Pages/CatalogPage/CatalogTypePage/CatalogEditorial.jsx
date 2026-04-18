import styles from "./CatalogEditorial.module.css";

export default function CatalogEditorial({ title, highlight, paragraphs }) {
  const renderTitle = () => {
    if (!highlight) return title;
    const idx = title.indexOf(highlight);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span className={styles.titleHighlight}>{highlight}</span>
        {title.slice(idx + highlight.length)}
      </>
    );
  };
  const mid = Math.ceil(paragraphs.length / 2);
  const left = paragraphs.slice(0, mid);
  const right = paragraphs.slice(mid);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{renderTitle()}</h2>
        <div className={styles.cols}>
          <div className={styles.col}>
            {left.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className={styles.col}>
            {right.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
