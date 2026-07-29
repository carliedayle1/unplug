"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/* Persists sticker progress and filter state.
   ─────────────────────────────────────────────────────────────
   Modelled as an external store rather than state-synced-in-an-effect:
   localStorage *is* an external system, so useSyncExternalStore is the
   right primitive. It also gets hydration right for free — the server
   snapshot is `null`, React reuses it for the hydration render, then
   swaps in the real value, so markup never mismatches.

   `getSnapshot` returns the raw string (a stable primitive). Parsing
   happens in a useMemo keyed on it — returning a fresh object from
   getSnapshot would loop forever on identity comparison. */

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Cross-tab updates: a second tab writing the same key.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/* Fallback for private mode / blocked storage. Without this, a failed
   write would leave read() returning the stale value and the sticker
   chart would appear frozen — so the session still works, it just
   doesn't survive a reload. */
const memory = new Map<string, string>();

function read(key: string): string | null {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) return stored;
  } catch {
    // fall through to memory
  }
  return memory.get(key) ?? null;
}

function write(key: string, value: string): void {
  memory.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Persisted for this session only.
  }
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    useCallback(() => read(key), [key]),
    () => null,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return initial;
    try {
      return JSON.parse(raw) as T;
    } catch {
      // Hand-edited or corrupted — fall back rather than throw.
      return initial;
    }
  }, [raw, initial]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = (() => {
        const current = read(key);
        if (current === null) return initial;
        try {
          return JSON.parse(current) as T;
        } catch {
          return initial;
        }
      })();

      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;

      write(key, JSON.stringify(resolved));
      emit();
    },
    [key, initial],
  );

  return [value, update];
}
