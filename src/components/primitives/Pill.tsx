"use client";

import type { Pop } from "@/lib/activities";

/* Filter pills.
   ─────────────────────────────────────────────────────────────
   Selected takes the group's pop as a fill, a hard shadow in the
   pressed shade, and a ✓ prefix. The tick matters: state must not
   be carried by colour alone, and `aria-pressed` alone doesn't help
   a sighted colour-blind user scanning the row.

   48px minimum height, pill radius, 3px navy border in both states
   so the row doesn't reflow when something is selected. */

export function Pill({
  label,
  pressed,
  pop,
  onToggle,
}: {
  label: string;
  pressed: boolean;
  pop: Pop;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={[
        `pop-${pop}`,
        "inline-flex min-h-12 cursor-pointer items-center rounded-full",
        "border-3 border-ink-navy px-5 py-[11px]",
        "text-[20px] font-black whitespace-nowrap select-none",
        "transition-[transform,box-shadow,background-color]",
        "duration-(--duration-lift) ease-(--ease-bounce)",
        "active:translate-y-[3px] active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:active:translate-y-0",
        pressed
          ? "bg-(--pop) text-(--on-pop) shadow-[0_4px_0_var(--pop-deep)]"
          : "bg-cream text-ink-navy shadow-none hover:bg-sun-deep",
      ].join(" ")}
    >
      {/* aria-hidden so the tick isn't read out — aria-pressed already
          conveys the state to assistive tech. */}
      {pressed && <span aria-hidden>✓&nbsp;</span>}
      {label}
    </button>
  );
}
