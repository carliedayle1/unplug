"use client";

import { useSyncExternalStore } from "react";

/* prefers-reduced-motion is a first-class state in this design, not a
   fallback: the plug loads already unplugged, cards cross-fade instead
   of flipping, confetti is a single static burst, and the scroll cord
   and draggable props don't mount at all.

   The server snapshot is `true` so the first paint is the calm one — if
   the user turns out to want motion we add it after hydration, which is
   far less jarring than yanking it away from someone who asked for
   none. */

/** QA override: `?motion=reduce` forces the calm path, `?motion=full`
    forces the animated one, so both states can be reviewed without
    touching OS settings. The OS preference wins when absent. */
function override(): boolean | null {
  const v = new URLSearchParams(window.location.search).get("motion");
  if (v === "reduce") return true;
  if (v === "full") return false;
  return null;
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/* Returns a boolean — a stable primitive, so useSyncExternalStore
   won't loop on identity changes. */
function getSnapshot(): boolean {
  return override() ?? window.matchMedia(QUERY).matches;
}

const getServerSnapshot = () => true;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
