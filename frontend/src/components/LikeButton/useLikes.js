"use client";

import { useState, useEffect } from "react";

const KEY = "shan_liked_properties";

export function useLikes() {
  const [liked, setLiked] = useState(new Set());

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "[]");
      setLiked(new Set(stored));
    } catch {
      setLiked(new Set());
    }
  }, []);

  const toggle = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  };

  return { liked, toggle };
}
