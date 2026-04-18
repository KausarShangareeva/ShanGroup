'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import AppButton from '../AppButton/AppButton';
import styles from './PopupForm.module.css';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z.string().min(7, 'Введите телефон'),
});

export default function PopupForm({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    // TODO: отправить на /api/contact
    console.log(data);
    setSubmitted(true);
    reset();
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {submitted && <Confetti recycle={false} numberOfPieces={300} />}

          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.close} onClick={handleClose}>
              <X size={20} />
            </button>

            {submitted ? (
              <div className={styles.success}>
                <h2>Спасибо! 🎉</h2>
                <p>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <h2 className={styles.title}>Оставить заявку</h2>
                <p className={styles.subtitle}>Наш агент перезвонит вам в течение часа</p>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <div className={styles.field}>
                    <input {...register('name')} placeholder="Ваше имя" className={styles.input} />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                  </div>

                  <div className={styles.field}>
                    <input {...register('phone')} placeholder="+7 (___) ___-__-__" className={styles.input} />
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                  </div>

                  <AppButton type="submit" full>Отправить заявку</AppButton>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
