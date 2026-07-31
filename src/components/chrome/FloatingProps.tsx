"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/* Floating decorative props — shared by every page that scatters the
   prop kit through its gutters.
   ─────────────────────────────────────────────────────────────
   Extracted from what was a homepage-only `PropPlayground` so a second
   page (About) could get its own selection of objects without
   duplicating the gating logic: reduced-motion off, and only mounted
   past `minWidth` — below that, `max-w-[1440px]` leaves no real gutter
   and a prop lands on top of the content or clips at the viewport edge.

   `draggable` is optional per caller. Every prop bobs regardless
   (`animate={{ y: [0,-7,0] }}`); drag is an extra layered on top for
   pages that want the fuller interaction (the homepage does — About
   stays a notch calmer, floating without inviting a grab). */

export type FloatingProp = {
  Component: React.ComponentType<{ className?: string }>;
  top: string;
  /** Exactly one of these. A literal CSS value ("16px", "8%") rather
      than a fixed inset, so the same component works anchored to a
      full page edge (homepage) or to a small local container (About's
      scoped version) without hardcoding which. */
  left?: string;
  right?: string;
  size: number;
  spin: number;
};

export function FloatingProps({
  items,
  draggable = true,
  minWidth = 1280,
}: {
  items: readonly FloatingProp[];
  draggable?: boolean;
  minWidth?: number;
}) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery(`(min-width: ${minWidth}px)`, false);
  const bounds = useRef<HTMLDivElement>(null);

  if (reduced || !wide) return null;

  const dragProps = draggable
    ? {
        drag: true as const,
        dragConstraints: bounds,
        dragElastic: 0.25,
        dragMomentum: true,
        dragTransition: { bounceStiffness: 260, bounceDamping: 24 },
        dragSnapToOrigin: true,
        whileDrag: { scale: 1.12, cursor: "grabbing", zIndex: 30 },
      }
    : {};

  return (
    <div
      ref={bounds}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {items.map(({ Component, top, left, right, size, spin }, i) => (
        <motion.div
          key={i}
          {...dragProps}
          className={`absolute ${draggable ? "pointer-events-auto cursor-grab" : ""}`}
          style={{ top, left, right, width: size, height: size, rotate: spin }}
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
