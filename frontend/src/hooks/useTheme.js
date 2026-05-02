"use client";

import { useState, useEffect } from "react";

// Reads / writes data-theme on <html>, persists in localStorage AND cookie.
//
// The cookie ("shan-theme") is read server-side in the root layout so the
// page renders with the correct theme on first paint — no FOUC, no inline
// boot-script needed (Next.js 16 warns about <script> inside React).
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function writeCookie(value) {
  try {
    document.cookie = `shan-theme=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    /* cookies disabled — non-fatal */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState("light");

  // Sync from DOM after mount — the server set data-theme based on the cookie.
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("shan-theme", theme);
    } catch {
      /* storage unavailable — non-fatal */
    }
    writeCookie(theme);
  }, [theme]);

  return [theme, setTheme];
}
