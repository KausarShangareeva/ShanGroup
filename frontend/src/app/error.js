'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Что-то пошло не так</h2>
      <p className={styles.message}>Произошла непредвиденная ошибка. Попробуйте снова.</p>
      <button className={styles.btn} onClick={() => reset()}>
        Попробовать снова
      </button>
    </div>
  );
}
