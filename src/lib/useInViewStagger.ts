"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/* Reveals a section's children with the design's 70ms stagger and
   420ms overshoot spring. Fires once, then disconnects — a section
   that has arrived never animates again on scroll-back.

   Under reduced motion no observer is created and `shown` is derived
   as true, so the content is simply present at full opacity. Deriving
   it rather than setting state in an effect keeps the render pure. */
export function useInViewStagger<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = options;
  const reduced = useReducedMotion();
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Callback-driven, so this is a real subscription rather than
        // state mirrored from props.
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin]);

  return { ref, shown: reduced || inView, reduced } as const;
}

/** Motion variants matching the design's stagger + overshoot tokens. */
export const staggerParent = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
} as const;

export const staggerChild = {
  hidden: { opacity: 0, y: 18 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.34, 1.56, 0.64, 1] as const },
  },
} as const;
