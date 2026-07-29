/* Copy for the UNPLUG! book extras.
   ─────────────────────────────────────────────────────────────
   These strings belong to the BOOK, not the author, which is why they
   live here rather than in author.ts — they render on the homepage
   (the book's only page) and nowhere else.

   Verbatim from the design mockups. Voice: second person, present
   tense, short sentences. The site never diagnoses a problem — it hands
   over something to do. No screen-time statistics, no "are you doing
   enough?", never the words "digital detox", no baby talk at parents. */

export const HERO = {
  // `hint` and `keyboardAction` lived here for the removed drag-the-plug
  // interaction. Deleted with it.
  headline: "101 things to do instead",
  body: "Real activities for 4–12s. Most take twenty minutes and nothing you don't already own — and none of them need you to feel bad first.",
  aside: "no screens were harmed in the making of this list",
} as const;

export const THE_101 = {
  heading: "The 101",
  intro:
    "Filter down to what actually fits tonight. The site shows a taste — the book has all of them, with instructions and variations.",
  filtersHeading: "Filters",
  clear: "clear",
  allShown: "Showing all 101 — pick a filter to narrow it down.",
  emptyHeading: "Nothing matches — yet",
  emptyBody:
    "That combination is a bit narrow. Drop a filter and something will turn up.",
  /* Deliberately doesn't say "and eighty-nine more" — these twelve are
     demo activities, not the book's, so counting up from them would
     imply they're the real thing. */
  bandHeading: "All 101 are in the book.",
  bandBody:
    "Each one with the setup, the rule that makes it last, and what to do when it stops working.",
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

export const SWAP = {
  heading: "Swap an hour, see what fits",
  intro:
    "Not a lecture — just arithmetic. Move the slider to however long a normal day runs.",
  sliderLabel: "Screen hours today",
  outro: "Swap one, swap none — the book works either way.",
  one: "adventure unlocked",
  many: "adventures unlocked",
  chips: [
    "Blanket fort",
    "Shadow-tracing",
    "Sock-ball",
    "Bug hotel",
    "Paper planes",
    "Chalk trail",
  ],
} as const;

export const STICKERS = {
  headingEmpty: "Sticker chart",
  introEmpty: "Ten activities, ten stickers. Do them in any order.",
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

export const PEEK = {
  heading: "Peek inside",
  intro: "Six real spreads. Swipe through, no email needed.",
} as const;

export const PRINTABLE = {
  heading: "Ten to start with",
  body: "A one-page checklist of the ten easiest activities. Print it, stick it on the fridge.",
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
   DRAFT copy. An earlier version quoted specific counts — "38 of them
   scale both ways", "sixty-one need nothing but what's in your house".
   Those numbers were invented, and they're claims about the contents of
   a real book, so they're gone. What's left is answerable without
   counting anything.

   If the author gives us real figures they're worth putting back —
   concrete numbers are far more persuasive than "most". */
export const FAQ = {
  heading: "Before you ask",
  rows: [
    [
      "Is this just a list I could google?",
      "A list tells you to build a blanket fort. This tells you the one rule that keeps it going past the first five minutes, and what to do when it stops working. That second part is the book.",
    ],
    [
      "My kids are four and eleven. Is it useless?",
      "The activities are written for roughly four to twelve, and many stretch further in either direction depending on how much you hand over to them. The older one running it for the younger one is usually the answer.",
    ],
    [
      "Do I need to buy anything?",
      "Mostly no. The great majority use what's already in a normal house — paper, socks, chalk, a torch, the recycling. Nothing needs a special trip.",
    ],
  ],
} as const;
