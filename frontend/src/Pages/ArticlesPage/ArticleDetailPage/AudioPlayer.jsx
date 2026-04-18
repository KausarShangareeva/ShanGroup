"use client";

import { useState, useRef } from "react";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer({ duration = "8:24" }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  function toggle() {
    if (playing) {
      clearInterval(intervalRef.current);
      setPlaying(false);
    } else {
      setPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            setPlaying(false);
            return 0;
          }
          return p + 0.2;
        });
      }, 100);
    }
  }

  const elapsed = Math.floor((progress / 100) * 504); // seconds for 8:24
  const min = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const sec = String(elapsed % 60).padStart(2, "0");

  return (
    <div className={styles.player}>
      <button className={styles.playBtn} onClick={toggle} aria-label={playing ? "Пауза" : "Воспроизвести"}>
        {playing ? (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <rect x="0" y="0" width="4" height="14" rx="1" />
            <rect x="8" y="0" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M0 0L12 7L0 14V0Z" />
          </svg>
        )}
      </button>

      <div className={styles.info}>
        <div className={styles.label}>
          {playing ? "Слушать статью" : "Слушать статью"}
        </div>
        <div className={styles.trackWrap}>
          <div className={styles.track} onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(Math.max(0, Math.min(100, pct)));
          }}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
            <div className={styles.thumb} style={{ left: `${progress}%` }} />
          </div>
          <span className={styles.time}>{min}:{sec} / {duration}</span>
        </div>
      </div>
    </div>
  );
}
