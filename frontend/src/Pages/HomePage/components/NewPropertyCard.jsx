"use client";

import { useRef } from "react";
import {
  MapPin,
  Maximize2,
  CalendarCheck,
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";
import GoldenTag from "@/components/GoldenTag/GoldenTag";
import LikeButton from "@/components/LikeButton/LikeButton";
import DeveloperTag from "@/components/DeveloperTag/DeveloperTag";
import styles from "./NewProperties.module.css";

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function NewPropertyCard({ p, agent, isLiked, onLike }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrap}>
        <img src={p.image} alt={p.name} className={styles.image} />

        <video
          ref={videoRef}
          src={p.video}
          loop
          muted
          playsInline
          preload="none"
          className={styles.video}
        />

        {p.visa && (
          <div className={styles.visaWrap}>
            <GoldenTag />
          </div>
        )}

        <LikeButton isLiked={isLiked} onLike={onLike} variant="card" />
      </div>

      <div className={styles.overlay}>
        <div className={styles.topRow}>
          <div className={styles.nameWrap}>
            <h3 className={styles.name}>{p.name}</h3>
            <span className={styles.priceBadge}>{p.priceUsd}</span>
            {p.developer && <DeveloperTag name={p.developer} />}
          </div>
          <button className={styles.cardArrowBtn} aria-label="Подробнее">
            <ArrowUpRight size={18} strokeWidth={2} />
          </button>
        </div>

        <div className={styles.details}>
          <div className={styles.detailsInner}>
            <div className={styles.contentRow}>
              <div className={styles.leftCol}>
                <div className={styles.location}>
                  <MapPin size={13} />
                  <span>{p.district}</span>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Maximize2 size={13} />
                    {p.type} {p.area}
                  </span>
                  <span className={styles.metaItem}>
                    <CalendarCheck size={13} />
                    {p.delivery}
                  </span>
                </div>
              </div>

              <div className={styles.mapWrap}>
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+1a73e8(${p.mapCoords[0]},${p.mapCoords[1]})/${p.mapCoords[0]},${p.mapCoords[1]},15.5,20,60/280x200@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
                  alt={p.district}
                  className={styles.mapFrame}
                />
              </div>
            </div>

            <div className={styles.agent}>
              <div className={styles.agentTop}>
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className={styles.agentAvatar}
                />
                <div className={styles.agentMeta}>
                  <span className={styles.agentName}>{agent.name}</span>
                </div>
              </div>
              <div className={styles.contactBtns}>
                <a
                  href={`mailto:${agent.email}`}
                  className={styles.contactBtn}
                  title="Email"
                >
                  <Mail size={15} />
                  <span>Почта</span>
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className={styles.contactBtn}
                  title="Call"
                >
                  <Phone size={15} />
                  <span>Звонок</span>
                </a>
                <a
                  href={`https://wa.me/${agent.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactBtn} ${styles.contactBtnWa}`}
                  title="WhatsApp"
                >
                  <WaIcon />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
