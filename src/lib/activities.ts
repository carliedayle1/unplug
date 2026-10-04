/* The activity logic: filters, the deck, and the helpers every card
   and dialog share.
   ─────────────────────────────────────────────────────────────
   The DATA is in src/content/activities.ts — the book's real 101.
   This file only knows how to slice it.

   Filters are the book's own shape, not an invented one. The book is
   ungraded ("4 to 12 or more") and gives no times, so there's no age,
   minutes, mess or cost axis here — those were the demo data's, and
   every value on them was made up. What the book does tell us is what
   an activity IS (its chapter), where it happens, who it takes, whether
   a grown-up needs to be on hand, and whether it has to wait on
   something to grow or dry. */

import {
  ACTIVITIES,
  CHAPTERS,
  DECK_EXCLUDE,
  MONTHLY,
  TEN_TO_START,
  slugOf,
  type Activity,
  type Chapter,
  type Month,
  type Pop,
  type Where,
  type Who,
} from "@/content/activities";

export { ACTIVITIES, CHAPTERS, TEN_TO_START, MONTHLY, slugOf };
export type { Activity, Chapter, Month, Pop, Where, Who };

/* ── Lookups ───────────────────────────────────────────────── */

const BY_NUMBER = new Map(ACTIVITIES.map((a) => [Number(a.n), a]));
const BY_CHAPTER = new Map(CHAPTERS.map((c) => [c.id, c]));

const BY_SLUG = new Map(ACTIVITIES.map((a) => [slugOf(a), a]));

export function bySlug(slug: string): Activity | undefined {
  return BY_SLUG.get(slug);
}

/** The activity's own page. */
export const pathFor = (a: Activity) => `/activities/${slugOf(a)}`;

/** "44", "044" and 44 all find activity 44. */
export function byNumber(n: string | number): Activity | undefined {
  return BY_NUMBER.get(Number(n));
}

export function chapterOf(a: Activity): Chapter {
  // Every activity's chapter id is checked by scripts/check-activities.mjs.
  return BY_CHAPTER.get(a.chapter) as Chapter;
}

/** "page 82" or "pages 41–43". */
export function pageLabel(a: Activity): string {
  return a.endPage ? `pages ${a.page}–${a.endPage}` : `page ${a.page}`;
}

/** The short form for a button: "p. 82" or "pp. 41–43". */
export function shortPage(a: Activity): string {
  return a.endPage ? `pp. ${a.page}–${a.endPage}` : `p. ${a.page}`;
}

/** What the card falls back to when an activity has no hook of its own. */
export function hookFor(a: Activity): string {
  return a.hook ?? `The steps are on ${pageLabel(a)}.`;
}

export function activitiesFor(ids: string[]): Activity[] {
  return ids.map(byNumber).filter((a): a is Activity => a !== undefined);
}

export function picksForMonth(m: number): Activity[] {
  const month = (m >= 1 && m <= 12 ? m : 1) as Month;
  return activitiesFor(MONTHLY[month].picks);
}

/** Activities that need nothing at all but you and a friend. Computed so
    the FAQ's number can't drift from the data. */
export function countNeedingNothing(): number {
  return ACTIVITIES.filter(
    (a) => a.needs.length === 1 && /^(nothing|your fingers)$/i.test(a.needs[0]),
  ).length;
}

/** What the Boredom Button deals from: things a kid can start now,
    without a grown-up on hand and without waiting days for the result.
    Never a prank. */
export const DECK: Activity[] = ACTIVITIES.filter(
  (a) => !a.help && !a.takesDays && !DECK_EXCLUDE.includes(a.n),
);

/* ── Filters ───────────────────────────────────────────────── */

export type FilterKey = "kind" | "where" | "who" | "help" | "time";

export type FilterGroup = {
  key: FilterKey;
  label: string;
  pop: Pop;
  options: string[];
};

export const FILTER_GROUPS: FilterGroup[] = [
  {
    key: "kind",
    label: "Kind",
    pop: "orange",
    options: [
      "Tricks & puzzles",
      "Make it",
      "Grow & explore",
      "Kitchen",
      "Games & parties",
      "Dress-up & holidays",
    ],
  },
  { key: "where", label: "Where", pop: "blue", options: ["Indoor", "Outdoor"] },
  { key: "who", label: "Who", pop: "magenta", options: ["Solo", "Two", "A crowd"] },
  { key: "help", label: "Help", pop: "teal", options: ["Kids can run it", "Grown-up helps"] },
  { key: "time", label: "Time", pop: "red", options: ["Same day", "Takes days"] },
];

/** A filter selection: "where:Indoor" → true. */
export type FilterState = Record<string, boolean>;

export const filterKeyFor = (group: FilterKey, option: string) => `${group}:${option}`;

/** Options selected within one group, OR'd; groups AND'd together. */
function selectedIn(state: FilterState, group: FilterKey): string[] {
  return Object.entries(state)
    .filter(([k, on]) => on && k.startsWith(`${group}:`))
    .map(([k]) => k.slice(group.length + 1));
}

function matchesGroup(a: Activity, group: FilterKey, chosen: string[]): boolean {
  if (chosen.length === 0) return true;
  switch (group) {
    case "kind":
      return chosen.includes(chapterOf(a).kind);
    case "where":
      return chosen.some((c) => a.where.includes(c as Where));
    case "who":
      return chosen.some((c) => a.who.includes(c as Who));
    case "help":
      return chosen.some((c) => (c === "Grown-up helps" ? a.help !== undefined : a.help === undefined));
    case "time":
      return chosen.some((c) => (c === "Takes days" ? a.takesDays : !a.takesDays));
  }
}

export function filterActivities(
  activities: Activity[],
  state: FilterState,
): Activity[] {
  const groups = FILTER_GROUPS.map((g) => [g.key, selectedIn(state, g.key)] as const);
  return activities.filter((a) =>
    groups.every(([key, chosen]) => matchesGroup(a, key, chosen)),
  );
}

export const activeFilterCount = (state: FilterState) =>
  Object.values(state).filter(Boolean).length;

/* ── Accessibility ─────────────────────────────────────────── */

/** Screen-reader label for a card. The outlined numeral is a graphic,
    so the number has to be spoken here — it must never be the only
    place a value appears. */
export function activityLabel(a: Activity): string {
  const where = a.where.map((w) => w.toLowerCase()).join(" or ");
  return `Activity ${Number(a.n)}, ${a.name}, ${chapterOf(a).name}, ${pageLabel(a)}, ${where}`;
}
