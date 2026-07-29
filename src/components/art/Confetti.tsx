"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/* Confetti.
   ─────────────────────────────────────────────────────────────
   Reserved for exactly two moments: sticker-chart completion and the
   Boredom Button. 1.2s, then GONE — the style tile is explicit that
   it clears rather than lingering.

   Under reduced motion this renders the single static burst the
   design specifies, held for the same duration, then removed. */

const POPS = ["#E8342A", "#2B7FD4", "#3FB68B", "#E5218A", "#F6A11F", "#F9DE55"];

/* Deterministic scatter — seeded from the index so a re-render never
   reshuffles mid-flight, and so there's no Math.random() in render. */
function piece(i: number) {
  const golden = 0.6180339887;
  const rx = ((i * golden) % 1) * 100;
  const ry = ((i * golden * 3.7) % 1) * 60;
  const rot = ((i * golden * 11) % 1) * 360;
  const drift = (((i * golden * 7) % 1) - 0.5) * 60;
  const delay = ((i * golden * 5) % 1) * 0.18;
  const round = i % 3 === 0;
  const size = 10 + ((i * 13) % 9);
  return {
    left: `${rx}%`,
    top: `${ry}%`,
    rot,
    drift,
    delay,
    round,
    size,
    color: POPS[i % POPS.length],
  };
}

export function Confetti({
  /** Bump this to fire a burst. */
  fireKey,
  count = 26,
}: {
  fireKey: number;
  count?: number;
}) {
  const reduced = useReducedMotion();
  /* Track which burst has finished rather than a live flag, so `live`
     is derived and the only setState happens in the timer callback.
     1.2s, then gone — the style tile is explicit that it clears. */
  const [expired, setExpired] = useState(0);
  const live = fireKey !== 0 && expired !== fireKey;

  useEffect(() => {
    if (fireKey === 0) return;
    const t = setTimeout(() => setExpired(fireKey), 1200);
    return () => clearTimeout(t);
  }, [fireKey]);

  if (!live) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const p = piece(i);
        return (
          <span
            key={i}
            className={`absolute ${p.round ? "rounded-full" : "rounded-[3px]"} ${reduced ? "" : "animate-[confetti-fall_1.2s_ease-out_forwards]"}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              transform: `rotate(${p.rot}deg)`,
              animationDelay: reduced ? undefined : `${p.delay}s`,
              ["--drift" as string]: `${p.drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
