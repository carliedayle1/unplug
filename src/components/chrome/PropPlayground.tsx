"use client";

import { Kite, Pinwheel, Plane, Ball } from "@/components/art/props";
import { FloatingProps } from "./FloatingProps";

/* The homepage's draggable, throwable props.
   ─────────────────────────────────────────────────────────────
   Four props in the page gutters, draggable — the fullest version of
   the floating-prop layer. See `FloatingProps` for the shared gating
   (reduced motion, ≥1280px) and drag mechanics; `About` uses the same
   component with a different, non-draggable selection. */

const SCATTER = [
  { Component: Kite, top: "14%", left: "16px", size: 76, spin: -8 },
  { Component: Pinwheel, top: "38%", right: "16px", size: 66, spin: 12 },
  { Component: Plane, top: "62%", left: "16px", size: 70, spin: -6 },
  { Component: Ball, top: "84%", right: "16px", size: 58, spin: 10 },
] as const;

export function PropPlayground() {
  return <FloatingProps items={SCATTER} draggable />;
}
