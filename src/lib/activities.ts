/* The activity deck and the filter taxonomy.
   ─────────────────────────────────────────────────────────────
   ⚠ THESE TWELVE ACTIVITIES ARE DEMO DATA. They are NOT from the book.

   Five (07, 12, 23, 58, 91) came from the design mockups; the other
   seven we wrote to fill out the grid. The numbers are not the book's
   numbering, and the names are not its activities.

   Because of that, the extras page carries a visible notice saying so —
   see components/sections/UnplugExtras.tsx. When the real list arrives:
   replace ACTIVITIES, then delete that notice and this warning.

   Filter axes beyond where/time/mess are ours too. The design defines
   the six groups and their colours but only ever draws Where and Mess
   populated, so every card carries all six to make filtering real. */

export type Pop = "red" | "blue" | "teal" | "magenta" | "orange";
export type Where = "Indoor" | "Outdoor";
export type Age = "4–6" | "7–9" | "10–12";
export type Prep = "None" | "5 min" | "A bit";
export type Kids = "Solo" | "Two" | "A crowd";
export type Cost = "Free" | "Under $5";
/** 1 Tidy · 2 Some mess · 3 All in */
export type MessLevel = 1 | 2 | 3;

export type Activity = {
  /** Zero-padded, as it appears in the book and on the card. */
  n: string;
  name: string;
  pop: Pop;
  /** Human-readable, e.g. "30 min" — shown in the time badge. */
  time: string;
  /** Numeric minutes, for sorting/filtering. */
  minutes: number;
  where: Where;
  mess: MessLevel;
  ages: Age[];
  prep: Prep;
  kids: Kids[];
  cost: Cost;
};

export const MESS_LABEL: Record<MessLevel, string> = {
  1: "Tidy",
  2: "Some mess",
  3: "All in",
};

/** The mess filter's pill labels, which are shorter than MESS_LABEL. */
export const MESS_FILTER_LABEL: Record<MessLevel, string> = {
  1: "Tidy",
  2: "Some",
  3: "All in",
};

export const ACTIVITIES: Activity[] = [
  // ── The five from the design, verbatim ────────────────────
  {
    n: "07",
    name: "Blanket fort, engineering rules",
    pop: "blue",
    time: "30 min",
    minutes: 30,
    where: "Indoor",
    mess: 2,
    ages: ["4–6", "7–9", "10–12"],
    prep: "None",
    kids: ["Two", "A crowd"],
    cost: "Free",
  },
  {
    n: "12",
    name: "Bug hotel out of a jam jar",
    pop: "red",
    time: "40 min",
    minutes: 40,
    where: "Outdoor",
    mess: 2,
    ages: ["4–6", "7–9"],
    prep: "5 min",
    kids: ["Solo", "Two"],
    cost: "Free",
  },
  {
    n: "23",
    name: "Shadow-tracing on the driveway",
    pop: "teal",
    time: "15 min",
    minutes: 15,
    where: "Outdoor",
    mess: 1,
    ages: ["4–6", "7–9"],
    prep: "None",
    kids: ["Two", "A crowd"],
    cost: "Under $5",
  },
  {
    n: "58",
    name: "Kitchen-table volcano",
    pop: "magenta",
    time: "45 min",
    minutes: 45,
    where: "Indoor",
    mess: 3,
    ages: ["7–9", "10–12"],
    prep: "A bit",
    kids: ["Solo", "Two"],
    cost: "Under $5",
  },
  {
    n: "91",
    name: "Sock-ball tournament",
    pop: "orange",
    time: "20 min",
    minutes: 20,
    where: "Indoor",
    mess: 1,
    ages: ["4–6", "7–9", "10–12"],
    prep: "None",
    kids: ["Two", "A crowd"],
    cost: "Free",
  },

  // ── Extending the same voice to fill the grid of twelve ───
  {
    n: "04",
    name: "Paper plane distance league",
    pop: "blue",
    time: "20 min",
    minutes: 20,
    where: "Indoor",
    mess: 1,
    ages: ["4–6", "7–9", "10–12"],
    prep: "None",
    kids: ["Solo", "Two", "A crowd"],
    cost: "Free",
  },
  {
    n: "34",
    name: "Chalk trail across the estate",
    pop: "magenta",
    time: "25 min",
    minutes: 25,
    where: "Outdoor",
    mess: 2,
    ages: ["4–6", "7–9"],
    prep: "None",
    kids: ["Two", "A crowd"],
    cost: "Under $5",
  },
  {
    n: "45",
    name: "Torchlight shadow puppets",
    pop: "orange",
    time: "15 min",
    minutes: 15,
    where: "Indoor",
    mess: 1,
    ages: ["4–6", "7–9"],
    prep: "5 min",
    kids: ["Solo", "Two"],
    cost: "Free",
  },
  {
    n: "66",
    name: "Pebble-painting gallery",
    pop: "teal",
    time: "35 min",
    minutes: 35,
    where: "Outdoor",
    mess: 3,
    ages: ["4–6", "7–9", "10–12"],
    prep: "A bit",
    kids: ["Solo", "Two"],
    cost: "Under $5",
  },
  {
    n: "71",
    name: "The upside-down picnic",
    pop: "red",
    time: "30 min",
    minutes: 30,
    where: "Outdoor",
    mess: 2,
    ages: ["4–6", "7–9"],
    prep: "5 min",
    kids: ["Two", "A crowd"],
    cost: "Free",
  },
  {
    n: "83",
    name: "Sock puppet news bulletin",
    pop: "magenta",
    time: "25 min",
    minutes: 25,
    where: "Indoor",
    mess: 2,
    ages: ["7–9", "10–12"],
    prep: "5 min",
    kids: ["Two", "A crowd"],
    cost: "Free",
  },
  {
    n: "99",
    name: "Two-pan kitchen band",
    pop: "orange",
    time: "20 min",
    minutes: 20,
    where: "Indoor",
    mess: 2,
    ages: ["4–6"],
    prep: "None",
    kids: ["Solo", "Two", "A crowd"],
    cost: "Free",
  },
];

/** The Boredom Button deck — the five the design deals from. */
export const DECK: Activity[] = ACTIVITIES.filter((a) =>
  ["07", "23", "58", "91", "12"].includes(a.n),
);

/* ─────────────────────────────────────────────────────────────
   Filter taxonomy — six groups, each colour-coded to one pop.
   Colours and options are taken from the component library.
   ───────────────────────────────────────────────────────────── */

export type FilterKey = "where" | "age" | "mess" | "prep" | "kids" | "cost";

export type FilterGroup = {
  key: FilterKey;
  label: string;
  pop: Pop;
  options: string[];
};

export const FILTER_GROUPS: FilterGroup[] = [
  { key: "where", label: "Where", pop: "blue", options: ["Indoor", "Outdoor"] },
  { key: "age", label: "Age", pop: "orange", options: ["4–6", "7–9", "10–12"] },
  { key: "mess", label: "Mess", pop: "magenta", options: ["Tidy", "Some", "All in"] },
  { key: "prep", label: "Prep", pop: "teal", options: ["None", "5 min", "A bit"] },
  { key: "kids", label: "Kids", pop: "blue", options: ["Solo", "Two", "A crowd"] },
  { key: "cost", label: "Cost", pop: "teal", options: ["Free", "Under $5"] },
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
    case "where":
      return chosen.includes(a.where);
    case "age":
      return chosen.some((c) => a.ages.includes(c as Age));
    case "mess":
      return chosen.some((c) => MESS_FILTER_LABEL[a.mess] === c);
    case "prep":
      return chosen.includes(a.prep);
    case "kids":
      return chosen.some((c) => a.kids.includes(c as Kids));
    case "cost":
      // "Under $5" is the looser bound — a free activity also satisfies it.
      return chosen.some((c) => (c === "Under $5" ? true : a.cost === c));
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

/** The site shows twelve; the book has all 101. Scale the shown
    count to the same proportion so the result line stays honest. */
export function estimatedTotal(shown: number, allShown: number): number {
  if (allShown === 0) return 0;
  return Math.max(shown, Math.round((shown / allShown) * 101));
}

/** Screen-reader label for a card. The outlined numeral is a graphic,
    so the number has to be spoken here — it must never be the only
    place a value appears. */
export function activityLabel(a: Activity): string {
  return `Activity ${Number(a.n)}, ${a.name}, ${a.time}, ${a.where.toLowerCase()}, mess level ${a.mess} of 3`;
}
