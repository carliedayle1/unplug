/* Author identity, bio, contact.
   ─────────────────────────────────────────────────────────────
   READ THIS BEFORE EDITING.

   The design mockups shipped a biography that was pure invention:
   "twenty-two years teaching Reception through Year 6", three children,
   "Bored Jar" workshops for 400+ families, a Leeds testimonial, prices
   in pounds. None of it was sourced, and it contradicted the published
   record — the earlier edition of this book (Unplug! 101 Ways to Pull
   Your Kids Away from Television, ISBN 9781553958055) describes the
   author as a former television producer who taught on Romper Room.
   That fiction was removed rather than shown to her.

   `shortBio` and `longBio` below are now AUTHOR-SUPPLIED, not draft —
   she confirmed the Romper Room detail directly ("Miss Wanda", the
   host/teacher on Romper Room's Magic Mirror segment), which is exactly
   what the older edition's record implied. The philosophical paragraphs
   (why the book takes the position it does) were drafted here first and
   she kept them essentially as written; only the biographical opening
   is new. Nothing in either field is invented — treat this content as
   settled, not a placeholder awaiting sign-off.

   REVISED AFTER READING THE MANUSCRIPT. Two sentences we drafted
   described the book in ways it isn't: "no statistics" (the preamble,
   pp. 5–19, is full of them), "fits the twenty minutes" and "nothing in
   it requires a trip to a shop" (the bulbs need thirteen weeks; some
   projects want plaster of Paris or a sewing machine), and "what to do
   when it stops working" (the book doesn't say that). The last
   two paragraphs of longBio and the second paragraph of shortBio are
   rewritten to say only what the book does. They were ours, not hers —
   but she approved the old wording, so DRAFT_CONTENT.md lists the
   changes for her to confirm. Her biographical paragraphs are untouched.

   The real photo landed too (public/author_pic.jpg) — see
   components/content/AuthorPhoto.tsx. There is no longer a photo slot
   here; nothing on the About page is a placeholder any more.

   Nothing attributed to a third party is drafted anywhere in this
   project: no review quotes, no awards, no press, no bestseller claim. */

export const AUTHOR = {
  /** Per the cover artwork. Some records spell it "Heartfield". */
  name: "Wanda Kanten Hartfield",
  role: "Author",

  tagline: "One hundred and one things to do instead.",

  /* Condensed for the homepage teaser (footer/50–100 word slot). Built
     only from sentences that also appear in longBio below — nothing
     added, just shortened for a smaller space. */
  shortBio: [
    "Wanda Kanten Hartfield was raised in Sylvan Lake, Alberta, Canada, where she and her sisters spent long winter days creating their own entertainment. She went on to become “Miss Wanda,” host of Romper Room, delighting millions of children in the Magic Mirror — then tested her ideas for real as the mother of two sons.",
    "UNPLUG! is where those ideas landed: 101 things to do instead, so there's something better waiting when the screen goes off.",
  ],

  /* In her own words, supplied directly — not drafted here. */
  longBio: [
    "Wanda Kanten Hartfield was raised in an incredibly happy home in Sylvan Lake, Alberta, Canada. There, she, her two sisters and her mother spent long winter days creating their own entertainment.",
    "Loving children, she became “Miss Wanda,” the host/teacher of Romper Room — a TV show that allowed millions of children to delight in being found in the “Magic Mirror.”",
    "Becoming a mother of two sons, Wanda was able to test her projects and ideas in the real world of her children. She was firm in the belief that if you teach your child to self-entertain, dependence on all electronics is diminished.",
    "Wanda writes for the parent standing in the kitchen at five o'clock, aware that the tablet has been on for a while, and out of ideas.",
    "Her position is an unfashionably direct one. The argument over children's screen time tends to circle: the networks blame the parents, the parents blame the networks, and everyone agrees something ought to be done. She doesn't find that useful. Television and phones are businesses, and businesses are not going to raise anyone's children. The rules are the parent's to set — and rules are easier to keep when there is something waiting on the other side.",
    "So UNPLUG! opens with the case for taking charge of the off switch, then gets on with the part that matters most: one hundred and one things to do instead, from magic tricks and paper folding to kitchen projects, games and costumes. Each one is a way of offering something better than the screen.",
    "The tone throughout is the one she'd use with a friend rather than an audience: plain, practical and a little bit funny. Pick one, hand it to a child, and see where it goes.",
  ],

  /* DRAFT — thematic, not biographical. What the book stands for, and
     each line checked against the manuscript. The first version of these
     promised twenty minutes and nothing to buy, "the one rule that keeps
     it going" and a variation for every activity. The book does none of
     that, so they're gone. Needs the author's sign-off. */
  principles: [
    {
      title: "101 of them, in 18 chapters",
      body: "Magic tricks, paper folding, kitchen projects, secret languages, games for a crowd, costumes. Pick and choose, in any order. If one doesn't catch, the next one might.",
    },
    {
      title: "Written to the kid",
      body: "The activity pages talk straight to the child, with a note here and there for the grown-up. Hand one over and let them run with it.",
    },
    {
      title: "Made from what's lying around",
      body: "Coffee cans, coat hangers, bottle caps, panty hose, a muffin pan. Where something specific is needed, the book sends you to the library, a garage sale or the craft store.",
    },
    {
      title: "Each one leads somewhere",
      body: "They're starting points, not one-offs. A collection of coins or shells can grow into a lifelong interest.",
    },
  ],

  /* ── Contact ────────────────────────────────────────────── */
  contact: {
    /** Set this and the mailto links appear across the site. */
    email: null as string | null,
    emailSlot: {
      need: "A public contact email",
      source: "author" as const,
      note: "Readers and press both land here. A dedicated address is worth it if you'd rather not use a personal one.",
    },
  },

  /** Social links. Rendered only once a URL exists. */
  socials: [
    { key: "instagram", label: "Instagram", short: "ig", url: null },
    { key: "facebook", label: "Facebook", short: "fb", url: null },
    { key: "goodreads", label: "Goodreads", short: "gr", url: null },
  ] as Array<{ key: string; label: string; short: string; url: string | null }>,
  socialsSlot: {
    need: "Any social accounts you'd like linked",
    source: "author" as const,
    note: "Whichever you actually use. We'll leave the rest off rather than link to an empty profile.",
  },

  copyright: `© ${new Date().getFullYear()} Wanda Kanten Hartfield`,

  /* ── The free checklist ─────────────────────────────────────
     Print-only, deliberately. There used to be an "email it to me" form;
     it never had a mail service behind it, so it said "on its way" and
     sent nothing. It was removed rather than left lying. Printing (or
     "Save as PDF" in the print window) gives the same page, with no
     address asked for and nothing to store. */
  checklist: {
    heading: "Ten to start with",
    blurb:
      "A one-page checklist of ten activities from the book — the easiest ones to say yes to. Print it or save it as a PDF, stick it on the fridge, work down it.",
    picksSlot: {
      need: "Which ten?",
      source: "author" as const,
      note: "The checklist is live on this page, with ten we picked from the book: a kid can run each one, and they need everyday things. Swap any you like.",
    },
  },
} as const;

/* The old newsletter slot's Midjourney prompt did its job — the generated
   image is at public/newsletter.png and is used directly in
   app/page.tsx. No more decorative-art slots outstanding. */
