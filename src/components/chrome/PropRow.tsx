"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/* A row of bobbing props, placed in the normal layout flow.
   ─────────────────────────────────────────────────────────────
   The other approach in this codebase (`FloatingProps`) absolutely
   positions props into the page's side gutters. That only works on a
   genuinely wide window — it's gated at ≥1280px on the homepage for
   exactly that reason — so it renders nothing on a phone, or even on an
   ordinary un-maximised desktop window. Which is precisely how the
   About page ended up looking bare.

   This one takes the opposite approach: no absolute positioning, no
   width gate, no dependence on empty space existing anywhere. It's a
   flex row that occupies real layout space, so it shows up at every
   viewport size — including the 390px case.

   Still decorative (aria-hidden) and still respects reduced motion,
   where it renders the props perfectly still rather than removing them:
   at this size they're part of the page's composition, so vanishing
   would leave a visible gap. */

export type RowProp = {
  Component: React.ComponentType<{ className?: string }>;
  size: number;
  spin: number;
};

export function PropRow({
  items,
  className = "",
}: {
  items: readonly RowProp[];
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <ul
      className={`m-0 flex list-none items-end gap-4 p-0 ${className}`}
      aria-hidden
    >
      {items.map(({ Component, size, spin }, i) => (
        <li key={i} style={{ width: size, height: size }}>
          <motion.div
            className="h-full w-full"
            style={{ rotate: spin }}
            /* Reduced motion: sit still rather than disappear. */
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={
              reduced
                ? undefined
                : {
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }
            }
          >
            <Component className="h-full w-full drop-shadow-[0_5px_0_rgb(242_207_67_/_0.75)]" />
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
