import type { Pop } from "@/lib/activities";

/* Outlined display numerals.
   ─────────────────────────────────────────────────────────────
   The style tile's carve-out: these are GRAPHICS, not set type. Any
   pop is allowed — including teal and orange, which would fail as
   text — because the 8–16px cream outline, not the fill, does the
   separating.

   The three rules that come with that licence, enforced here:
     1. They always carry the outline.
     2. They never sit below 40px.
     3. They are always aria-hidden, because the value must appear
        somewhere real too (see activityLabel()). A numeral is never
        the only place a number lives. */

const POP_CLASS: Record<Pop, string> = {
  red: "text-pop-red",
  blue: "text-pop-blue",
  teal: "text-pop-teal",
  magenta: "text-pop-magenta",
  orange: "text-pop-orange",
};

/** Outline width scales with type size — roughly size/5.5, clamped. */
function outlineFor(size: number): number {
  return Math.round(Math.min(16, Math.max(7, size / 5.5)));
}

export function OutlineNumeral({
  value,
  size,
  pop,
  /** Which surface it sits on — the outline must match the field. */
  on = "cream",
  className = "",
}: {
  value: string;
  /** Pixels. Never below 40. */
  size: number;
  pop: Pop;
  on?: "cream" | "yellow" | "deep";
  className?: string;
}) {
  const outlineClass =
    on === "yellow" ? "outlined-on-yellow" : on === "deep" ? "outlined-on-deep" : "";

  return (
    <span
      aria-hidden
      className={`outlined ${outlineClass} ${POP_CLASS[pop]} block leading-[0.9] font-extrabold ${className}`}
      style={{
        fontSize: `${Math.max(40, size)}px`,
        ["--outline-w" as string]: `${outlineFor(size)}px`,
        ["--outline-drop" as string]: `${Math.round(size / 13)}px`,
      }}
    >
      {value}
    </span>
  );
}

/* The marquee "101" — the one numeral allowed to be multicoloured.
   Every other number takes a single pop, rotating by category so the
   grid reads as a rainbow at a glance. */
export function OneOhOne({
  size = 180,
  on = "deep",
}: {
  size?: number;
  on?: "cream" | "yellow" | "deep";
}) {
  const digits: Array<[string, Pop]> = [
    ["1", "blue"],
    ["0", "teal"],
    ["1", "orange"],
  ];
  return (
    <span className="flex items-baseline" aria-hidden>
      {digits.map(([d, pop], i) => (
        <OutlineNumeral key={i} value={d} size={size} pop={pop} on={on} />
      ))}
    </span>
  );
}
