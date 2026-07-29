import type { ReactNode } from "react";
import type { MessLevel, Pop } from "@/lib/activities";
import { MESS_LABEL } from "@/lib/activities";

/* Badges & the mess meter.
   ─────────────────────────────────────────────────────────────
   Badges sit at 16px, which is below the 20px floor for type on a
   solid pop — so every badge uses the pop's PALE TINT with ink navy
   on top. That's not a stylistic choice; no pop clears 4.5:1 against
   either ink at badge sizes. The tint is the whole reason badges are
   readable. Radius 8 (sm), because a badge isn't pressable. */

export function Badge({
  pop,
  children,
}: {
  pop: Pop;
  children: ReactNode;
}) {
  return (
    <span
      className={`pop-${pop} inline-flex shrink-0 items-center rounded-sm bg-(--pop-tint) px-3 py-1.5 text-[16px] font-extrabold whitespace-nowrap text-ink-navy`}
    >
      {children}
    </span>
  );
}

/** Time badge — always orange tint, always with the clock. */
export function TimeBadge({ time }: { time: string }) {
  return (
    <Badge pop="orange">
      <span aria-hidden>⏱&nbsp;</span>
      {time}
    </Badge>
  );
}

/** Where badge — blue for indoor, teal for outdoor, per the tokens. */
export function WhereBadge({ where }: { where: "Indoor" | "Outdoor" }) {
  return <Badge pop={where === "Indoor" ? "blue" : "teal"}>{where}</Badge>;
}

/** Mess badge — always magenta tint. */
export function MessBadge({ mess }: { mess: MessLevel }) {
  return <Badge pop="magenta">Mess {mess}</Badge>;
}

/* The splat meter: three blobs in a bordered pill, filled to the mess
   level. Blob shape is an irregular border-radius so it reads as a
   splat rather than a dot. Colour rotates teal → orange → magenta
   with the level, and the label spells it out so the meter is never
   colour-only. */

const SPLAT_POP: Record<MessLevel, Pop> = {
  1: "teal",
  2: "orange",
  3: "magenta",
};

export function SplatMeter({ level }: { level: MessLevel }) {
  const pop = SPLAT_POP[level];
  return (
    <span
      className={`pop-${pop} inline-flex items-center gap-1.5 rounded-full border-3 border-ink-navy bg-sun-yellow px-3.5 py-1.5 text-[16px] font-black`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="size-3.5 rounded-[60%_40%_55%_45%]"
          style={
            i < level
              ? { background: "var(--pop)" }
              : { border: "2px solid rgb(62 81 99 / 0.35)" }
          }
        />
      ))}
      <span>{MESS_LABEL[level]}</span>
    </span>
  );
}
