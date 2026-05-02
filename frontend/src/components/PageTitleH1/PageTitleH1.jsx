// Editorial 3-register page title — Cormorant Garamond throughout.
//
// Structure:
//   primary  — main noun (largest, regular Cormorant)
//   accent   — middle line in italic-sand (Cormorant italic, sand-deep)
//   place    — anchor line preceded by a short decorative dash
//
// Drop the `accent` or `place` props to render shorter variants.

import styles from "./PageTitleH1.module.css";

export default function PageTitleH1({ primary, accent, place, className = "" }) {
  return (
    <h1 className={`${styles.title} ${className}`}>
      {primary && <span className={styles.primary}>{primary}</span>}
      {accent && <span className={styles.accent}>{accent}</span>}
      {place && (
        <span className={styles.place}>
          <span className={styles.placeDash} aria-hidden />
          <span>{place}</span>
        </span>
      )}
    </h1>
  );
}
