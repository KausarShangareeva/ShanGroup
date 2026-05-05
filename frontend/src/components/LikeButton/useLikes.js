"use client";

import { useSyncExternalStore } from "react";

const KEY = "shan_liked_properties";

// Single source of truth: one Set, one set of subscribers.
// Every useLikes() call subscribes to the same store, so a toggle in one
// component re-renders every other component reading likes.
let store = new Set();
let initialized = false;
const listeners = new Set();

function load() {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...store]));
  } catch {
    /* localStorage unavailable */
  }
}

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  store = load();
  initialized = true;
}

function emit() {
  // Replace the Set reference so React's Object.is check picks up the change.
  store = new Set(store);
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  ensureInitialized();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureInitialized();
  return store;
}

function getServerSnapshot() {
  // SSR has no localStorage — render with empty set, hydrate fills in.
  return EMPTY;
}
const EMPTY = new Set();

export function toggleLike(id) {
  ensureInitialized();
  if (store.has(id)) store.delete(id);
  else store.add(id);
  persist();
  emit();
}

export function useLikes() {
  const liked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { liked, toggle: toggleLike };
}
