"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/Button/Button";
import CountryCodeSelect from "@/components/CountryCodeSelect/CountryCodeSelect";
import COUNTRIES from "@/data/countries.json";
import GoldVerifiedIcon from "./GoldVerifiedIcon";
import styles from "./EndCta.module.css";

const DEFAULT_COUNTRY =
  COUNTRIES.find((c) => c.iso2 === "AE") ?? COUNTRIES[0];

const CONTACT_METHODS = [
  {
    id: "call",
    label: "Звонок",
    iconSrc: "/social_media/call.svg",
    brand: "#1DA1F2",
  },
  {
    id: "telegram",
    label: "Telegram",
    iconSrc: "/social_media/telegram.svg",
    brand: "#26A5E4",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    iconSrc: "/social_media/whatsapp.svg",
    brand: "#25D366",
  },
  {
    id: "viber",
    label: "Viber",
    iconSrc: "/social_media/viber.svg",
    brand: "#7360F2",
  },
];

export default function EndCta({ author }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [methods, setMethods] = useState(["telegram"]);
  const [sent, setSent] = useState(false);

  function toggle(id) {
    setMethods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function submit(e) {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
  }

  return (
    <div className={styles.wrap}>
      {/* Автор */}
      <div className={styles.authorSide}>
        <div className={styles.avatarRing}>
          <img
            src={author.avatar}
            alt={author.name}
            className={styles.avatar}
          />
        </div>
        <p className={styles.authorName}>{author.name}</p>

        <p className={styles.authorDesc}>
          {author.role} перезвонит вам в течение пяти минут
        </p>
      </div>

      {/* Форма */}
      <div className={styles.formSide}>
        <h3 className={styles.formTitle}>Помощь во всех вопросах</h3>

        {sent ? (
          <div className={styles.thanks}>
            <span className={styles.thanksIcon}>✓</span>
            <p>Спасибо! Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className={styles.phoneRow}>
              <CountryCodeSelect value={country} onChange={setCountry} />
              <input
                className={styles.phoneInput}
                type="tel"
                placeholder="50 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className={styles.methodsBlock}>
              <p className={styles.methodsLabel}>Желаемый способ связи:</p>
              <div className={styles.methods}>
                {CONTACT_METHODS.map(({ id, label, iconSrc, brand }) => {
                  const isActive = methods.includes(id);
                  return (
                    <label
                      key={id}
                      className={`${styles.method} ${isActive ? styles.methodActive : ""}`}
                      style={{ "--brand": brand }}
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggle(id)}
                        className={styles.methodCheckbox}
                      />
                      <span className={styles.methodIconCircle}>
                        <span
                          className={styles.methodIconImg}
                          style={{ "--icon-url": `url(${iconSrc})` }}
                          role="img"
                          aria-label={label}
                        />
                      </span>
                      <span className={styles.methodLabel}>{label}</span>
                      {isActive && (
                        <span className={styles.methodBadge}>
                          <Check size={12} strokeWidth={3} />
                          Выбрано
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className={styles.submitWrap}>
              <Button label="Отправить" onClick={submit} icon={null} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
