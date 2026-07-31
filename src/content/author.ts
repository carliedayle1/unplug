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
    "UNPLUG! is where those ideas landed: 101 things to do instead, with no statistics, no guilt, and no suggestion you've already failed — just the next thing to try.",
  ],

  /* In her own words, supplied directly — not drafted here. */
  longBio: [
    "Wanda Kanten Hartfield was raised in an incredibly happy home in Sylvan Lake, Alberta, Canada. There, she, her two sisters and her mother spent long winter days creating their own entertainment.",
    "Loving children, she became “Miss Wanda,” the host/teacher of Romper Room — a TV show that allowed millions of children to delight in being found in the “Magic Mirror.”",
    "Becoming a mother of two sons, Wanda was able to test her projects and ideas in the real world of her children. She was firm in the belief that if you teach your child to self-entertain, dependence on all electronics is diminished.",
    "Wanda writes for the parent standing in the kitchen at five o'clock, aware that the tablet has been on for a while, and out of ideas.",
    "Her position is an unfashionably direct one. The argument over children's screen time tends to circle: the networks blame the parents, the parents blame the networks, and everyone agrees something ought to be done. She doesn't find that useful. Television and phones are businesses, and businesses are not going to raise anyone's children. The rules are the parent's to set — and rules are easier to keep when there is something waiting on the other side.",
    "So UNPLUG! is not a book about screens at all. It is a book of things to do: one hundred and one of them, arranged so a tired adult can find one that fits the twenty minutes and the materials actually available. Nothing in it requires a trip to a shop, a cleared afternoon, or a child who is already enthusiastic.",
    "The tone throughout is the one she'd use with a friend rather than an audience. No statistics about screen time. No suggestion you have already failed. Just the next thing to try, and what to do when it stops working.",
  ],

  /* DRAFT — thematic, not biographical. Presented as what the book
     stands for rather than as career milestones we can't verify. */
  principles: [
    {
      title: "Twenty minutes, nothing to buy",
      body: "Most of the 101 fit in the time between getting home and getting dinner on, using what's already in the house.",
    },
    {
      title: "The rule that makes it last",
      body: "Anyone can suggest a blanket fort. The useful part is the one rule that keeps it going past the first five minutes.",
    },
    {
      title: "What to do when it stops working",
      body: "Every activity has a variation for the second time, and for the child who has decided they're too old for it.",
    },
    {
      title: "Never a verdict on the parent",
      body: "No screen-time statistics, no diagnosis, no guilt. You came for something to do; that's what the book hands you.",
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

  /* ── Newsletter ─────────────────────────────────────────── */
  newsletter: {
    heading: "Ten to start with",
    blurb:
      "A one-page checklist of ten activities from the book — the easiest ones to say yes to. Print it, stick it on the fridge, work down it.",
    giveawaySlot: {
      need: "The checklist itself, and where the emails should go",
      source: "either" as const,
      note: "We can lay the checklist out from ten of the book's activities — just say which ten. For the emails, tell us the service you use (Mailchimp, Substack, anything) or we'll suggest one.",
    },
  },
} as const;

/* The newsletter slot's Midjourney prompt did its job — the generated
   image is at public/newsletter.png and is used directly in
   app/page.tsx. No more decorative-art slots outstanding. */
