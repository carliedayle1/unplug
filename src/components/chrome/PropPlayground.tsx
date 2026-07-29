"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Kite, Pinwheel, Plane, Ball } from "@/components/art/props";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/* Draggable, throwable props.
   ─────────────────────────────────────────────────────────────
   Four props in the page gutters. Drag and release and they carry a
   little momentum, then spring back to their resting spot.

   Two constraints exist because the first version broke both:
     · ≥1280px only. Below that, `max-w-[1440px]` leaves no real gutter
       and a prop lands on top of the content or gets clipped at the
       viewport edge — which is what produced the stray half-circle on
       the About section.
     · dragConstraints bound to this container, so nothing can be
       thrown out of the document.

   Decorative throughout: aria-hidden, and not mounted at all under
   reduced motion. */

const SCATTER = [
  { Component: Kite, top: "14%", side: "left", size: 76, spin: -8 },
  { Component: Pinwheel, top: "38%", side: "right", size: 66, spin: 12 },
  { Component: Plane, top: "62%", side: "left", size: 70, spin: -6 },
  { Component: Ball, top: "84%", side: "right", size: 58, spin: 10 },
] as const;

export function PropPlayground() {
  const reduced = useReducedMotion();
  // 1280 is where the 1440 max-width container starts leaving gutter.
  const wide = useMediaQuery("(min-width: 1280px)", false);
  const bounds = useRef<HTMLDivElement>(null);

  if (reduced || !wide) return null;

  return (
    <div
      ref={bounds}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {SCATTER.map(({ Component, top, side, size, spin }, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={bounds}
          dragElastic={0.25}
          dragMomentum
          dragTransition={{ bounceStiffness: 260, bounceDamping: 24 }}
          dragSnapToOrigin
          whileDrag={{ scale: 1.12, cursor: "grabbing", zIndex: 30 }}
          className="pointer-events-auto absolute cursor-grab"
          style={{
            top,
            [side]: 16,
            width: size,
            height: size,
            rotate: spin,
          }}
          animate={{ y: [0, -7, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          <Component className="h-full w-full drop-shadow-[0_6px_0_rgb(242_207_67_/_0.7)]" />
        </motion.div>
      ))}
    </div>
  );
}
