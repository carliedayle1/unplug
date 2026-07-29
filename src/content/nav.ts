import { BOOK_URL, BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "./books";

/* Site navigation.
   ─────────────────────────────────────────────────────────────
   Four places, because there are four things a visitor wants: to try or
   buy the book, who wrote it, the free checklist, and how to get in
   touch. The book itself doesn't get a separate nav entry — it IS the
   homepage, and the logo already goes there. "Try it Free" is the more
   useful link: it jumps straight to the interactive stuff.

   Removed: Praise & press and Events (nothing real to put in either,
   and inventing reviews or signing dates isn't an option), and News —
   the intake marked a blog optional and an empty blog is worse than
   none. Add any of them back if there's genuinely something to say. */

export const NAV_LINKS = [
  { href: `${BOOK_URL}#extras`, label: "Try it Free" },
  { href: "/about", label: "About" },
  { href: "/checklist", label: "Free Checklist" },
  { href: "/contact", label: "Contact" },
] as const;

/* The nav CTA's job is getting someone to a checkout, so it points at
   the retailer directly rather than at the homepage they're probably
   already looking at. `external` tells NavBar/MobileDrawer to add
   target="_blank" — anything else would open the retailer inside our
   own tab and strand the visitor there. */
export const NAV_CTA = {
  href: BUY_URL,
  label: BUY_LABEL,
  external: BUY_IS_EXTERNAL,
} as const;

export const FOOTER_GROUPS = [
  {
    heading: "The book",
    links: [
      { href: BOOK_URL, label: "UNPLUG!" },
      { href: `${BOOK_URL}#extras`, label: "Try it free" },
    ],
  },
  {
    heading: "More",
    links: [
      { href: "/about", label: "About Wanda" },
      { href: "/checklist", label: "Free checklist" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const SIGNOFF = "Go on then — off you go.";
export const CREDIT = "Made without a single statistic.";
