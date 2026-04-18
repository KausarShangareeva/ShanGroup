"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Pill.module.css";

export default function MultiSelect({ options, selected, onChange, placeholder = "Все" }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function onOut(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, []);

  const filtered = options.filter((o) =>
    String(o).toLowerCase().includes(search.toLowerCase())
  );

  function toggle(val) {
    const str = String(val);
    onChange(selected.includes(str) ? selected.filter((v) => v !== str) : [...selected, str]);
  }

  const isSet = selected.length > 0;
  const displayText = !isSet
    ? placeholder
    : selected.length === 1
      ? selected[0]
      : `${selected.length} выбрано`;

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.pill} ${isSet ? styles.pillActive : ""} ${open ? styles.pillOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{displayText}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.search}
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.list}>
            {filtered.length === 0 ? (
              <p className={styles.empty}>Не найдено</p>
            ) : (
              filtered.map((opt) => {
                const str = String(opt);
                const checked = selected.includes(str);
                return (
                  <label key={str} className={styles.item} onClick={() => toggle(opt)}>
                    <span className={`${styles.checkbox} ${checked ? styles.checkboxOn : ""}`} />
                    <span className={styles.itemLabel}>{opt}</span>
                  </label>
                );
              })
            )}
          </div>

          {isSet && (
            <div className={styles.footer}>
              <button type="button" className={styles.clearBtn} onClick={() => onChange([])}>
                Сбросить выбор
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
