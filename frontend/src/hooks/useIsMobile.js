"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const upd = () => setIsMobile(window.innerWidth < breakpoint);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, [breakpoint]);
  return isMobile;
}
