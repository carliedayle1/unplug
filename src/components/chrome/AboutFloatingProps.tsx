"use client";

import { Book, Chalk, Hat, Explore, Pinwheel, Blocks } from "@/components/art/props";
import { PropRow } from "./PropRow";

/* About page decoration.
   ─────────────────────────────────────────────────────────────
   Two clusters from the prop kit, both using `PropRow` (inline, in
   layout flow) rather than `FloatingProps` (absolute, in the page
   gutters).

   That choice is the whole point: the gutter approach needs a very wide
   window to have anywhere to put things, so it rendered nothing at all
   on a phone or an ordinary desktop window — which is what made this
   page look bare. Inline rows show up at every width.

   Sizes are modest so they read as decoration beside the bio rather
   than competing with the author photo above them. */

const BIO_PROPS = [
  { Component: Book, size: 52, spin: -10 },
  { Component: Explore, size: 46, spin: 8 },
  { Component: Chalk, size: 50, spin: -6 },
] as const;

const STANDS_PROPS = [
  { Component: Pinwheel, size: 54, spin: 10 },
  { Component: Blocks, size: 48, spin: -8 },
  { Component: Hat, size: 46, spin: 12 },
] as const;

/** Sits under the author's name in the bio column. */
export function AboutBioProps({ className = "" }: { className?: string }) {
  return <PropRow items={BIO_PROPS} className={className} />;
}

/** Sits beside the "What it stands for" heading. */
export function AboutStandsProps({ className = "" }: { className?: string }) {
  return <PropRow items={STANDS_PROPS} className={className} />;
}
