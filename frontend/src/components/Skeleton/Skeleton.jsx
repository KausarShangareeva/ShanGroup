import styles from './Skeleton.module.css';

export default function Skeleton({ width = '100%', height = '1rem', rounded = false, circle = false }) {
  return (
    <span
      className={styles.skeleton}
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : rounded ? '100px' : '6px',
      }}
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton height="220px" />
      <div className={styles.body}>
        <Skeleton width="40%" height="1.25rem" />
        <Skeleton width="80%" height="1rem" />
        <Skeleton width="60%" height="0.8rem" />
      </div>
    </div>
  );
}
