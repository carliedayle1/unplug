import type { ReactNode } from "react";
import type { Activity, Chapter, Pop } from "@/lib/activities";

/* Badges & the mess meter.
   ─────────────────────────────────────────────────────────────
   Badges sit at 16px, which is below the 20px floor for type on a
   solid pop — so every badge uses the pop's PALE TINT with ink navy
   on top. That's not a stylistic choice; no pop clears 4.5:1 against
   either ink at badge sizes. The tint is the whole reason badges are
   readable. Radius 8 (sm), because a badge isn't pressable.

   The badges an activity card carries are the book's own facts: the
   chapter it's in, where it happens, whether a grown-up needs to be on
   hand and whether it takes days. (The old time / mess badges described
   demo data that was never the book's, and are gone.) */

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

/** The chapter, in the chapter's own pop. */
export function ChapterBadge({ chapter }: { chapter: Chapter }) {
  return <Badge pop={chapter.pop}>{chapter.name}</Badge>;
}

/** Where badge — blue for indoor, teal for outdoor, per the tokens. */
export function WhereBadge({ where }: { where: "Indoor" | "Outdoor" }) {
  return <Badge pop={where === "Indoor" ? "blue" : "teal"}>{where}</Badge>;
}

/** Only rendered when a grown-up genuinely needs to be on hand. */
export function HelpBadge({ help }: { help: NonNullable<Activity["help"]> }) {
  return <Badge pop="magenta">Grown-up helps · {help}</Badge>;
}

/** Only rendered when something has to grow, dry or wait. */
export function DaysBadge() {
  return (
    <Badge pop="orange">
      <span aria-hidden>⏱&nbsp;</span>
      Takes days
    </Badge>
  );
}

/** Every badge an activity has, in one place, so the card and the dialog
    can't disagree about what's true of it. */
export function ActivityBadges({
  activity,
  chapter,
  withChapter = true,
}: {
  activity: Activity;
  chapter: Chapter;
  withChapter?: boolean;
}) {
  return (
    <>
      {withChapter && <ChapterBadge chapter={chapter} />}
      {activity.where.map((w) => (
        <WhereBadge key={w} where={w} />
      ))}
      {activity.help && <HelpBadge help={activity.help} />}
      {activity.takesDays && <DaysBadge />}
    </>
  );
}

/* The splat meter: three blobs in a bordered pill, filled to the mess
   level. It's part of the style tile's component set, so it stays here
   even though no activity carries a mess level any more. Blob shape is
   an irregular border-radius so it reads as a splat rather than a dot.
   Colour rotates teal → orange → magenta with the level, and the label
   spells it out so the meter is never colour-only. */

export type MessLevel = 1 | 2 | 3;

export const MESS_LABEL: Record<MessLevel, string> = {
  1: "Tidy",
  2: "Some mess",
  3: "All in",
};

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
