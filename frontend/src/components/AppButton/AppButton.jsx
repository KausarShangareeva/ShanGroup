'use client';

import { motion } from 'framer-motion';
import styles from './AppButton.module.css';

export default function AppButton({ children, onClick, href, size = 'md', full = false }) {
  const cls = `${styles.appBtn} ${styles[size]} ${full ? styles.full : ''}`;

  if (href) {
    return (
      <motion.a href={href} className={cls} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={cls} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
