/* Content check for src/content/activities.ts.
   ─────────────────────────────────────────────────────────────
   Run with `npm run check:content`. Plain Node: it loads the .ts data
   file directly under Node's type stripping (which is why that file has
   no "@/" imports and uses only erasable TypeScript).

   It guards the things that are easy to get wrong while typing 101
   entries by hand, and the things that must never ship: a trick's
   secret or a puzzle's answer leaking into a teaser. */

import {
  ACTIVITIES,
  CHAPTERS,
  TEN_TO_START,
  DECK_EXCLUDE,
  MONTHLY,
  PEEK_PAGES,
  PEEK_SPREADS,
  BOOK_PRINTABLES,
  slugOf,
} from "../src/content/activities.ts";

const problems = [];
const bad = (msg) => problems.push(msg);

/* ── 1. The list itself ───────────────────────────────────── */
if (ACTIVITIES.length !== 101) bad(`expected 101 activities, found ${ACTIVITIES.length}`);

ACTIVITIES.forEach((a, i) => {
  const want = String(i + 1).padStart(2, "0");
  if (a.n !== want) bad(`entry ${i + 1} is numbered "${a.n}", expected "${want}"`);
});

const ids = new Set(ACTIVITIES.map((a) => a.n));
if (ids.size !== ACTIVITIES.length) bad("duplicate activity numbers");

/* ── 2. Pages sit inside their chapter, and only ever go forward ── */
const byId = new Map(CHAPTERS.map((c) => [c.id, c]));
if (CHAPTERS.length !== 18) bad(`expected 18 chapters, found ${CHAPTERS.length}`);

let lastEnd = 0;
for (const a of ACTIVITIES) {
  const c = byId.get(a.chapter);
  if (!c) {
    bad(`${a.n} ${a.name}: unknown chapter ${a.chapter}`);
    continue;
  }
  const next = byId.get(a.chapter + 1);
  const ceiling = next ? next.firstPage : 152; // 152 is SOLUTIONS
  const end = a.endPage ?? a.page;
  if (a.page <= c.firstPage) bad(`${a.n} ${a.name}: page ${a.page} is on or before its chapter divider (${c.firstPage})`);
  if (end >= ceiling) bad(`${a.n} ${a.name}: page ${end} runs into the next chapter / the solutions`);
  if (a.endPage !== undefined && a.endPage <= a.page) bad(`${a.n} ${a.name}: endPage must be after page`);
  if (a.page <= lastEnd) bad(`${a.n} ${a.name}: page ${a.page} doesn't come after the previous activity (ended ${lastEnd})`);
  lastEnd = end;
}

/* ── 3. Everything that points at an activity points at a real one ── */
const need = (n, where) => {
  if (!ids.has(n)) bad(`${where} refers to "${n}", which isn't an activity`);
};
if (TEN_TO_START.length !== 10) bad(`TEN_TO_START has ${TEN_TO_START.length}, expected 10`);
TEN_TO_START.forEach((n) => need(n, "TEN_TO_START"));
DECK_EXCLUDE.forEach((n) => need(n, "DECK_EXCLUDE"));
for (const [m, { picks }] of Object.entries(MONTHLY)) {
  if (picks.length < 3 || picks.length > 4) bad(`MONTHLY[${m}] should have 3–4 picks`);
  picks.forEach((n) => need(n, `MONTHLY[${m}]`));
}
if (Object.keys(MONTHLY).length !== 12) bad("MONTHLY must cover all 12 months");

/* ── 4. Peek pages: real, and spoiler-free ───────────────── */
const spoilerHook = /^(The secret|Try it first)/;
for (const p of PEEK_PAGES) {
  const a = ACTIVITIES.find((x) => x.n === p.activity);
  if (!a) {
    bad(`PEEK_PAGES page ${p.page}: unknown activity "${p.activity}"`);
    continue;
  }
  const end = a.endPage ?? a.page;
  if (p.page < a.page || p.page > end) bad(`PEEK_PAGES page ${p.page} isn't one of ${a.name}'s pages (${a.page}–${end})`);
  if (a.hook && spoilerHook.test(a.hook)) bad(`PEEK_PAGES page ${p.page}: ${a.name} prints a secret or an answer — pick another page`);
}
if (PEEK_SPREADS.length !== 6) bad(`expected 6 peek spreads, found ${PEEK_SPREADS.length}`);
for (const { left, right } of PEEK_SPREADS) {
  if (left.page % 2 !== 0) bad(`spread ${left.page}–${right.page}: the left page of a printed spread is even`);
  if (right.page !== left.page + 1) bad(`spread ${left.page}–${right.page}: pages must face each other`);
}
for (const p of BOOK_PRINTABLES) {
  need(p.activity, `BOOK_PRINTABLES ${p.id}`);
  const a = ACTIVITIES.find((x) => x.n === p.activity);
  if (a) for (const pg of p.pages) if (pg < a.page || pg > (a.endPage ?? a.page)) bad(`BOOK_PRINTABLES ${p.id}: page ${pg} isn't one of ${a.name}'s pages`);
}

/* ── 4b. Every activity page needs its own URL ─────────── */
const slugs = new Map();
for (const a of ACTIVITIES) {
  const slug = slugOf(a);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) bad(`${a.n} ${a.name}: bad slug "${slug}"`);
  if (slugs.has(slug)) bad(`${a.n} and ${slugs.get(slug)} share the slug "${slug}"`);
  slugs.set(slug, a.n);
}

/* ── 5. Words ────────────────────────────────────────────── */
const MAX_TEASER = 220;
/* Phrases that must never appear in anything we write. The first group
   is the voice rules; the second is the actual secrets and answers. */
const BANNED = [
  /digital detox/i,
  /\bscreen[- ]time (stat|data)/i,
  /\btorch\b/i,
  /\bmaths\b/i,
  /\+ ?21\b/,
  /×\s?11\b|x\s?11\b/,
  /ending in 3|ends in 3/i,
  /clench|bite down|bites down/i,
  /salt (makes|gives)/i,
  /put (him|her|it|the dime|the quarter)? ?.{0,20}bend/i,
];
for (const a of ACTIVITIES) {
  const where = `${a.n} ${a.name}`;
  if (!a.teaser || a.teaser.length < 40) bad(`${where}: teaser missing or too short`);
  if (a.teaser.length > MAX_TEASER) bad(`${where}: teaser is ${a.teaser.length} chars (max ${MAX_TEASER})`);
  if (a.needs.length === 0) bad(`${where}: needs is empty`);
  if (a.where.length === 0 || a.who.length === 0) bad(`${where}: where/who is empty`);
  for (const text of [a.teaser, a.hook ?? "", ...a.needs]) {
    for (const re of BANNED) if (re.test(text)) bad(`${where}: "${text.slice(0, 50)}…" matches banned ${re}`);
  }
}
for (const [m, { line }] of Object.entries(MONTHLY)) {
  for (const re of BANNED) if (re.test(line)) bad(`MONTHLY[${m}] line matches banned ${re}`);
}

/* ── Report ──────────────────────────────────────────────── */
if (problems.length > 0) {
  console.error(`✗ ${problems.length} problem${problems.length === 1 ? "" : "s"}:\n`);
  for (const p of problems) console.error(`  · ${p}`);
  process.exit(1);
}
const kinds = new Map();
for (const a of ACTIVITIES) {
  const k = byId.get(a.chapter).kind;
  kinds.set(k, (kinds.get(k) ?? 0) + 1);
}
console.log(`✓ ${ACTIVITIES.length} activities in ${CHAPTERS.length} chapters`);
console.log("  " + [...kinds].map(([k, n]) => `${k} ${n}`).join(" · "));
