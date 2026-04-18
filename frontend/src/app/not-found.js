import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.message}>Запрошенная страница не существует или была перемещена.</p>
      <Link href="/" className={styles.btn}>
        На главную
      </Link>
    </div>
  );
}
