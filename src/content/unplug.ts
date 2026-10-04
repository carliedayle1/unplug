import { countNeedingNothing } from "@/lib/activities";

/* Copy for the UNPLUG! book extras.
   ─────────────────────────────────────────────────────────────
   These strings belong to the BOOK, not the author, which is why they
   live here rather than in author.ts — they render on the homepage
   (the book's only page) and nowhere else.

   Voice: second person, present tense, short sentences. The site never
   diagnoses a problem — it hands over something to do. No "are you doing
   enough?", never the words "digital detox", no baby talk at parents.

   TRUTH CHECK. Everything here that describes the book was checked
   against the manuscript (3/11/26). An earlier version said every
   activity takes twenty minutes and nothing you don't own, that each has
   "the one rule that keeps it going" and a variation for the child who's
   too old, and that the book has "no screen-time statistics". None of
   that is in the book: the bulbs need thirteen weeks, the fruit leather
   a few days, some projects want plaster of Paris or a sewing machine,
   and pages 5–19 are full of statistics. Describe what the book DOES. */

export const HERO = {
  // `hint` and `keyboardAction` lived here for the removed drag-the-plug
  // interaction. Deleted with it.
  headline: "101 things to do instead",
  body: "Real activities for ages 4 to 12 and up: magic tricks, paper folding, kitchen projects, secret languages, games for a crowd. Lots of them start with what's already in the kitchen drawer or the garage.",
  aside: "no screens were harmed in the making of this list",
} as const;

export const EXTRAS = {
  heading: "Try it free",
  lead: "A taste of the book, playable here. No email, no account. If you never buy it, you still get these.",
} as const;

export const THE_101 = {
  heading: "The 101",
  intro:
    "All 101, in the book's own numbering. Filter for what fits tonight, then peek at any one: what you'll need, and what it's like. The steps stay in the book.",
  filtersHeading: "Filters",
  clear: "clear",
  allShown: "Showing all 101. Pick a filter to narrow it down.",
  more: "Show 12 more",
  emptyHeading: "Nothing matches — yet",
  emptyBody:
    "That combination is a bit narrow. Drop a filter and something will turn up.",
  bandHeading: "The steps are in the book.",
  bandBody:
    "The full instructions and the diagrams, and for the tricks and puzzles, the secrets and the solutions.",
} as const;

/* The snapshot dialog — a teaser and the materials, nothing more. */
export const SNAPSHOT = {
  fallbackTitle: "A look inside the book",
  chapterLine: (chapter: number, name: string, page: string) =>
    `Chapter ${chapter} · ${name} · ${page}`,
  needsLabel: "What you need",
  another: "Another one",
  copyLink: "Copy link",
  copied: "Link copied.",
  ownPage: "Open its own page",
} as const;

export const THIS_MONTH = {
  heading: "This month",
  intro: "Picked from the book for this time of year. Tap one to peek inside.",
} as const;

export const BOREDOM = {
  heading: "Stuck? Press it.",
  intro: "One random activity. No signup, no thinking.",
  buttonLine1: "I'm",
  buttonLine2: "bored!",
  buttonHint: "press me",
  empty: "Your activity lands here",
  dealAnother: "Deal another",
  share: "Share",
  shareCopied: "Copied — paste it wherever.",
} as const;

/* The trick from page 82. The copy says what to DO and never why it
   works — that's the book's. */
export const MIND_READER = {
  heading: "Read a mind",
  intro:
    "The trick from page 82. Think of a number, follow four steps, and the site will tell you what you started with.",
  pick: "Think of a number from 1 to 9, and keep it to yourself.",
  stepsIntro: "Now do the math. Pencil and paper are fine.",
  steps: [
    "Multiply it by 3.",
    "Add 1.",
    "Multiply by 3 again.",
    "Add the number you first thought of.",
  ],
  totalLabel: "What's your total?",
  submit: "Read my mind",
  wrong: "Check the math and try again.",
  reveal: (n: number) => `You were thinking of ${n}.`,
  how: "How did it know? It's on page 82.",
  again: "Try another",
  peek: "Peek at page 82",
} as const;

/* Three of the book's secret languages (pp. 74–76). The Hog Latin story
   is the book's own (p. 75); it's the one thing here that only this
   author can say. */
export const LANGUAGES = {
  heading: "Say it in secret",
  intro:
    "Type a sentence and see how it comes out in three of the book's secret languages.",
  inputLabel: "Your sentence",
  placeholder: "Let's go for pizza",
  empty: "Type something above.",
  copy: "Copy",
  copied: "Copied",
  note: "Stays on your device. Nothing you type is sent anywhere.",
  tabs: [
    { id: "pig", label: "Pig Latin", activity: "37" },
    { id: "ope", label: "Ope", activity: "39" },
    { id: "hog", label: "Hog Latin", activity: "38" },
  ],
  about: {
    pig: "The easy one everybody half-knows.",
    ope: "Even sillier than Hog Latin. One rule, about vowels.",
    hog: "Wanda's family language, learned from her mother and aunts, who grew up in Saskatchewan. Her family can hold a whole conversation in it. It's easier to say than to read, and page 75 shows how.",
  },
  peek: (label: string) => `Peek at ${label}`,
} as const;

export const SWAP = {
  heading: "Swap an hour, see what fits",
  intro:
    "Not a lecture — just arithmetic. Move the slider to however long a normal day runs.",
  sliderLabel: "Screen hours today",
  outro: "Swap one, swap none — the book works either way.",
  one: "adventure unlocked",
  many: "adventures unlocked",
} as const;

export const STICKERS = {
  headingEmpty: "Sticker chart",
  introEmpty:
    "Ten activities from the book, ten stickers. Do them in any order, and tap a name to peek inside.",
  emptyNote: "Nothing yet — that's the fun part.",
  pickFirst: "Pick the first one",
  printPaper: "Print the paper version",
  headingPartial: "Nice work",
  tapHint: "Tap a circle to stick one on.",
  badgeHint: "Badges unlock at 3, 6 and 10.",
  headingFull: "Chart full!",
  fullBody: "Ten activities done. That's a whole shelf of afternoons.",
  printCertificate: "Print the certificate",
  startNew: "Start a new chart",
  badgeLine: (done: number) =>
    done >= 10
      ? "All three badges — chart full!"
      : done >= 6
        ? "Two badges earned"
        : done >= 3
          ? "First badge earned"
          : "First badge at 3",
} as const;

/* The book's own worksheet (pp. 22–24): list the things you'd love to
   do, tick what's realistic, circle the three with the most ticks. The
   six columns paraphrase the book's Afford / Space / Alone / Skill /
   Time / Place. */
export const PLANNER = {
  heading: "Dream it, then scale it",
  intro:
    "The book's own worksheet, from pages 22–24. List everything you'd love to try, tick what's realistic, and see which three you could actually start.",
  hint: "Too big? Scale it down. In the book, a family safari becomes a diorama.",
  addLabel: "Something we'd love to try",
  placeholder: "A safari in Africa",
  add: "Add",
  full: "That's eight. Remove one to add another.",
  empty: "Nothing yet. Start with the biggest dream you've got.",
  columns: [
    "Can we afford it?",
    "Do we have space?",
    "Can we do it on our own?",
    "Do we have the skills?",
    "Do we have the time?",
    "Can we do it at or near home?",
  ],
  shortColumns: ["Afford", "Space", "On our own", "Skills", "Time", "Near home"],
  top: "Your top three",
  topNone: "Tick a few boxes and your top three get circled.",
  remove: (name: string) => `Remove ${name}`,
  print: "Print it",
  clear: "Start over",
} as const;

export const PEEK = {
  heading: "Peek inside",
  /* Spreads are photographs of a real product, so they only render once
     they've been approved (see content/media.ts). Until then the boxes
     are honest about being placeholders. */
  intro: "Six real spreads from the book. Swipe through, no email needed.",
  introPending: "Six spreads from the book. Tap a page to see what's on it.",
} as const;

export const PRINTABLE = {
  heading: "Ten to start with",
  body: "A one-page checklist of ten activities from the book — easy ones to say yes to. Print it, stick it on the fridge.",
  emailLabel: "Email",
  placeholder: "you@example.com",
  submit: "Send the checklist",
  /* The escape hatch is deliberate: it costs a few addresses and buys
     the parent's trust, which is the whole point of the section. Do not
     gate the download to improve conversion. */
  escapeHatchPrefix: "Or just ",
  escapeHatchLink: "download it without an email",
  escapeHatchSuffix: " — genuinely fine.",
  idle: "One checklist, one email. Nothing else, ever.",
  empty: "Pop an address in and it's yours.",
  invalid: "That address looks unfinished — mind checking?",
  sent: (email: string) => `✓ On its way to ${email} — one email, no series.`,
  failed: "That didn't send — mind trying once more?",
} as const;

/* FAQ.
   ─────────────────────────────────────────────────────────────
   DRAFT copy, but every claim in it is now checked against the book.
   The "nothing at all" count is computed from the data so it can't
   drift. */
const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const nothingAtAll = countNeedingNothing();

export const FAQ = {
  heading: "Before you ask",
  lead: "Three questions worth answering.",
  rows: [
    [
      "Is this just a list I could google?",
      "A list can name 101 things to do. This is one family's own repertoire, tried out on two sons: a secret language from her mother and aunts, a two-generation Easter egg tradition, game boards you can copy and play, and the answers to the puzzles at the back. That's the part you can't search for.",
    ],
    [
      "My kids are four and eleven. Is it useless?",
      "No. The book is deliberately ungraded; it says 4 to 12 or more. Pick a trick and the eleven-year-old learns it, then performs it for the four-year-old. Plenty of the games are meant for the whole family at once.",
    ],
    [
      "Do I need to buy anything?",
      `Mostly no. Every activity lists exactly what you need, and most of it is paper, string, coins and kitchen things. ${NUMBER_WORDS[nothingAtAll] ?? nothingAtAll} need nothing at all. A few want a one-off supply (bulbs, plaster of Paris, pumpkins), and a handful call for a sewing machine or a workshop.`,
    ],
  ],
} as const;
