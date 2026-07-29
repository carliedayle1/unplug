"use client";

import { useCallback, useSyncExternalStore } from "react";

/* Subscribe to a media query.
   ─────────────────────────────────────────────────────────────
   A media query is an external system, so this is a store
   subscription rather than state synced in an effect. Returns a
   boolean, which is a stable primitive.

   `serverValue` decides the first paint: pass the conservative answer
   for whatever is being gated. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue);
}
