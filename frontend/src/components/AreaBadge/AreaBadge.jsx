import styles from './AreaBadge.module.css';

import Icon from "@/components/Icon/Icon";
export default function AreaBadge({ children, image }) {
  return (
    <div className={styles.badge}>
      <div className={styles.img} style={{ backgroundImage: `url('${image}')` }} />
      <span className={styles.label}>{children}</span>
      <Icon name="arrow-up-right" size={24} className={styles.arrow}  />
    </div>
  );
}
