/* The UNPLUG! wordmark.
   ─────────────────────────────────────────────────────────────
   Reproduces the cover's logotype: every letter a different colour,
   each with a thick cream outline and a soft drop shadow.

   The colours are sampled from the cover artwork (public/cover.jpg),
   not taken from the five-pop token set — because three of them aren't
   in it. The cover's P is a true green, its G a golden yellow and its
   "!" a cyan, none of which the style tile captured when it distilled
   the palette down to five pops.

   That's deliberate and it's the one sanctioned exception: this is a
   LOGOTYPE, a piece of artwork reproducing a printed cover, in the same
   category as the outlined display numerals. UI colour still comes from
   the tokens — don't reach for WORDMARK_LETTERS anywhere else.

     U  red      #E8342A   (= pop-red)
     N  blue     #2B7FD4   (= pop-blue)
     P  green    #4CA344   ← cover only
     L  magenta  #E5218A   (= pop-magenta)
     U  blue     #2B7FD4   (= pop-blue)
     G  golden   #F6C238   ← cover only
     !  cyan     #29ACDE   ← cover only

   Letters render as adjacent spans with no whitespace between them, so
   the accessible name stays exactly "UNPLUG!". */

export const WORDMARK_LETTERS: ReadonlyArray<readonly [string, string]> = [
  ["U", "#E8342A"],
  ["N", "#2B7FD4"],
  ["P", "#4CA344"],
  ["L", "#E5218A"],
  ["U", "#2B7FD4"],
  ["G", "#F6C238"],
  ["!", "#29ACDE"],
];

const OUTLINE_COLOUR = {
  cream: "var(--color-cream)",
  yellow: "var(--color-sun-yellow)",
  navy: "var(--color-ink-navy)",
} as const;

export function Wordmark({
  className = "",
  /* Outline colour, which must be chosen for the FIELD behind it.
     `cream` is the cover's own treatment and is right on any yellow
     surface. On a CREAM surface it can't be — a cream outline is
     invisible against cream, and the golden G is only ~1.5:1 there, so
     the letter all but disappears. Light bars get `navy`, which outlines
     every letter regardless of its fill. */
  outline = "cream",
  /** Outline thickness in px — scale it with the type size. */
  stroke = 6,
  /** Drop-shadow offset in px. Scale with the type size. */
  drop = 3,
}: {
  className?: string;
  outline?: keyof typeof OUTLINE_COLOUR;
  stroke?: number;
  drop?: number;
}) {
  return (
    <span
      className={`wordmark block leading-none ${className}`}
      style={{
        ["--outline-w" as string]: `${stroke}px`,
        ["--outline-c" as string]: OUTLINE_COLOUR[outline],
        ["--wm-drop" as string]: `${drop}px`,
      }}
    >
      {WORDMARK_LETTERS.map(([char, color], i) => (
        <span key={i} style={{ color }}>
          {char}
        </span>
      ))}
    </span>
  );
}
