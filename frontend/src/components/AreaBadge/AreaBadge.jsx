import { ArrowUpRight } from 'lucide-react';
import styles from './AreaBadge.module.css';

export default function AreaBadge({ children, image }) {
  return (
    <div className={styles.badge}>
      <div className={styles.img} style={{ backgroundImage: `url('${image}')` }} />
      <span className={styles.label}>{children}</span>
      <ArrowUpRight size={24} className={styles.arrow} />
    </div>
  );
}
