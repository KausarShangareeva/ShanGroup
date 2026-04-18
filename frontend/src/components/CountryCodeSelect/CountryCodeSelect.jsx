"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Flag from "react-world-flags";
import { Search, ChevronDown } from "lucide-react";
import COUNTRIES from "@/data/countries.json";
import styles from "./CountryCodeSelect.module.css";

const DEFAULT_COUNTRY =
  COUNTRIES.find((c) => c.iso2 === "AE") ?? COUNTRIES[0];

/**
 * Селектор кода страны с поиском.
 *
 * @param {{iso2:string,name:string,dialCode:string}} [value]  — выбранная страна.
 * @param {(country) => void} [onChange] — колбэк при выборе.
 */
export default function CountryCodeSelect({ value, onChange }) {
  const selected = value ?? DEFAULT_COUNTRY;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const searchRef = useRef(null);

  // Закрываем попап И сбрасываем поисковый запрос вместе.
  // Выделено в функцию, чтобы очистка не тянулась через useEffect.
  const closePopup = () => {
    setOpen(false);
    setQuery("");
  };

  // Закрытие по клику вне компонента / по Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        closePopup();
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Автофокус на поле поиска при открытии.
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso2.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.flagWrap}>
          <Flag code={selected.iso2} fallback={<span>🏳</span>} />
        </span>
        <span className={styles.code}>{selected.dialCode}</span>
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div className={styles.popup} role="listbox">
          <div className={styles.searchRow}>
            <Search size={16} className={styles.searchIcon} />
            <input
              ref={searchRef}
              type="text"
              className={styles.searchInput}
              placeholder="Поиск страны..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <ul className={styles.list}>
            {filtered.length === 0 ? (
              <li className={styles.empty}>Ничего не найдено</li>
            ) : (
              filtered.map((c) => {
                const isActive = c.iso2 === selected.iso2;
                return (
                  <li key={c.iso2}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                      onClick={() => {
                        onChange?.(c);
                        closePopup();
                      }}
                    >
                      <span className={styles.flagWrap}>
                        <Flag code={c.iso2} fallback={<span>🏳</span>} />
                      </span>
                      <span className={styles.itemName}>{c.name}</span>
                      <span className={styles.itemCode}>{c.dialCode}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
