"use client";

import { useState, useEffect } from "react";
import { Phone, X, FileDown, Bot, ChevronRight } from "lucide-react";
import styles from "./FloatingActions.module.css";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.29c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.697l-2.95-.924c-.64-.203-.654-.64.136-.954l11.526-4.443c.537-.194 1.006.131.69.872z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C5.029 11.226 4.47 9.5 4.47 8.706c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.373 0 .508.203.508.643v3.473c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z" />
    </svg>
  );
}

function MaxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5h-2l-2.5-4-2.5 4h-2l3.5-5.5L7.5 7.5h2l2 3.5 2-3.5h2l-3 4.5 3.5 5z" />
    </svg>
  );
}

const MESSENGERS = [
  { name: "WhatsApp", sub: "Чат с агентом",  href: "https://wa.me/971500000000",   Icon: WhatsAppIcon, color: "#25D366", bg: "rgba(37,211,102,0.12)" },
  { name: "Telegram", sub: "Канал и чат",    href: "https://t.me/shangroup",        Icon: TelegramIcon, color: "#0088cc", bg: "rgba(0,136,204,0.12)" },
  { name: "VK",       sub: "Сообщество",     href: "https://vk.com/shangroup",      Icon: VkIcon,       color: "#0077ff", bg: "rgba(0,119,255,0.12)" },
  { name: "MAX",      sub: "Мессенджер",     href: "https://max.ru/shangroup",      Icon: MaxIcon,      color: "#ff6b00", bg: "rgba(255,107,0,0.12)" },
];

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.wrap} ${visible ? styles.wrapVisible : ""}`}>
      <div className={styles.fabWrap}>
        {open && (
          <div className={styles.panel}>
            {/* Header */}
            <div className={styles.panelHeader}>
              <div className={styles.panelLogo}>
                <span className={styles.panelLogoText}>SG</span>
              </div>
              <div className={styles.panelMeta}>
                <span className={styles.panelTitle}>ShanGroup</span>
                <span className={styles.panelSub}>Агентство недвижимости ОАЭ</span>
              </div>
              <button
                className={styles.panelClose}
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.panelBody}>
              <p className={styles.panelQuestion}>Связаться с нами</p>
              <p className={styles.panelHint}>Выберите удобный способ</p>

              <div className={styles.messengersCol}>
                {MESSENGERS.map(({ name, sub, href, Icon, color, bg }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.messengerRow}
                    style={{ borderLeftColor: color }}
                  >
                    <span className={styles.messengerIcon} style={{ background: bg, color }}>
                      <Icon />
                    </span>
                    <span className={styles.messengerMeta}>
                      <span className={styles.messengerName}>{name}</span>
                      <span className={styles.messengerSub}>{sub}</span>
                    </span>
                    <ChevronRight size={15} className={styles.messengerArrow} />
                  </a>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.actions}>
                <a href="/pdf" className={styles.actionBtn}>
                  <FileDown size={15} strokeWidth={1.8} />
                  <span>Скачать каталог PDF</span>
                </a>
                <a
                  href="https://t.me/shangroup_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <Bot size={15} strokeWidth={1.8} />
                  <span>Написать боту</span>
                </a>
              </div>
            </div>
          </div>
        )}

        <div className={styles.fabPulse} />
        <div className={styles.fabShine} />
        <button
          className={styles.fab}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрыть" : "Связаться"}
        >
          <span className={styles.fabGrain} />
          {open ? <X size={22} strokeWidth={2} /> : <Phone size={22} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
