"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Pill.module.css";

export default function Dropdown({ placeholder, value, options, onChange, flat = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onOut(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, []);

  function select(val) {
    onChange(val);
    setOpen(false);
  }

  const isSet = value !== "" && value !== null && value !== undefined;
  const displayText = isSet ? (options.find((o) => String(o.val) === String(value))?.label ?? value) : placeholder;

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.pill} ${flat ? styles.pillFlat : ""} ${isSet ? (flat ? styles.pillFlatActive : styles.pillActive) : ""} ${!flat && open ? styles.pillOpen : ""}`}
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
        <div className={`${styles.dropdown} ${flat ? styles.dropdownFlat : ""}`}>
          <div className={styles.list}>
            {options.map(({ val, label }) => (
              <button
                key={val}
                type="button"
                className={`${styles.option} ${String(value) === String(val) ? styles.optionActive : ""}`}
                onClick={() => select(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
