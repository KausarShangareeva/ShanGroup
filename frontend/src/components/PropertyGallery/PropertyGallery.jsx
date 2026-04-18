'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './PropertyGallery.module.css';

export default function PropertyGallery({ images = [], alt = 'Property' }) {
  return (
    <div className={styles.gallery}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={images.length > 1}
        className={styles.swiper}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className={styles.slide}>
              <Image src={src} alt={`${alt} ${i + 1}`} fill className={styles.image} sizes="100vw" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
