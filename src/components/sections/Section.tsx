"use client";

import { motion } from "motion/react";
import { useInViewStagger, staggerParent, staggerChild } from "@/lib/useInViewStagger";

/* Shared section shell.
   ─────────────────────────────────────────────────────────────
   Section rhythm is 72px mobile / 120px desktop; card padding 24/32.
   Children reveal on the 70ms stagger with the 420ms overshoot — or
   are simply present, under reduced motion.

   The yellow field carries the dot grid. That grid IS the page in this
   design; cream, navy and teal fields stay flat. */

export type Field = "yellow" | "cream" | "navy" | "teal";

const FIELD_BG: Record<Field, string> = {
  yellow: "bg-sun-yellow dot-grid",
  cream: "bg-cream",
  navy: "bg-ink-navy text-cream",
  teal: "bg-pop-teal",
};

/* The outline treatment per field.
   ─────────────────────────────────────────────────────────────
   The design uses the stroke two different ways, and both are correct:

     · FIELD-MATCHED (yellow, deep, navy) — the stroke is the field
       colour, so the letterforms thicken with no visible halo.
       e.g. "The 101" on yellow: stroke #F9DE55.
     · CREAM HALO (cream cards, teal) — a cream ring separates the type
       from a saturated field. e.g. "Chart full!" on teal: navy fill,
       stroke #FFFBEF.

   The one invariant, and the thing that broke "Stuck? Press it.":
   THE STROKE MUST NEVER EQUAL THE FILL. Cream on cream is a blob. */
export const FIELD_OUTLINE: Record<Field, string> = {
  yellow: "outlined-on-yellow",
  cream: "",
  navy: "outlined-on-navy",
  teal: "", // cream halo, per the mockup
};

export const FIELD_HEADING_FILL: Record<Field, string> = {
  yellow: "text-ink-navy",
  cream: "text-ink-navy",
  navy: "text-sun-yellow",
  teal: "text-ink-navy",
};

export function Section({
  id,
  field = "yellow",
  className = "",
  children,
  labelledBy,
}: {
  id?: string;
  field?: Field;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  const { ref, shown, reduced } = useInViewStagger<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={`${FIELD_BG[field]} scroll-mt-22 py-18 md:py-30 ${className}`}
      initial={reduced ? undefined : "hidden"}
      animate={shown ? "shown" : "hidden"}
      variants={staggerParent}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">{children}</div>
    </motion.section>
  );
}

/** A staggered child inside a Section. */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

/* Section heading — Baloo with the outline treatment. `on` names the
   FIELD it sits on, and both the stroke colour and the fill derive from
   it, so the two can't drift apart. */
export function SectionHeading({
  id,
  children,
  className = "",
  on = "yellow",
  as: Tag = "h2",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  on?: Field;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      id={id}
      className={`outlined ${FIELD_OUTLINE[on]} ${FIELD_HEADING_FILL[on]} text-[clamp(40px,7vw,72px)] leading-none font-extrabold tracking-[-0.02em] ${className}`}
      style={{ ["--outline-w" as string]: "10px" }}
    >
      {children}
    </Tag>
  );
}

/** Page-level title — same treatment, h1, one per route. */
export function PageTitle({
  children,
  on = "yellow",
  className = "",
}: {
  children: React.ReactNode;
  on?: Field;
  className?: string;
}) {
  return (
    <SectionHeading as="h1" on={on} className={className}>
      {children}
    </SectionHeading>
  );
}
