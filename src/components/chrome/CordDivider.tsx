"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/* Cord dividers.
   ─────────────────────────────────────────────────────────────
   Replaces the old full-page ScrollCord, which used
   viewBox="0 0 100 1000" with preserveAspectRatio="none" over a
   ~10,000px page. That squashed the wave into a near-vertical hairline
   crossing the content — the stray line reported on the About section.

   This keeps the same cord metaphor but in a form that can't degenerate:
   a short, fixed-height wave between sections, same geometry family as
   the footer wave (which was always fine). It draws its pathLength as
   it scrolls into view, once. */

export function CordDivider({
  field = "yellow",
}: {
  /** The field it sits on, so the backing colour matches. */
  field?: "yellow" | "cream";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div
      className={field === "cream" ? "bg-cream" : "bg-sun-yellow dot-grid"}
      aria-hidden
    >
      <svg
        ref={ref}
        viewBox="0 0 390 26"
        preserveAspectRatio="none"
        className="mx-auto block h-6.5 w-full max-w-[1440px]"
      >
        <motion.path
          d="M0 16c26-14 52 14 78 0s52-14 78 0 52 14 78 0 52-14 78 0 52 14 78 0"
          stroke="#3E5163"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: reduced || inView ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
