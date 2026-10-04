import { authorText, type Slot } from "./placeholders";
import {
  BOOK_PRINTABLES,
  PEEK_SPREADS,
  type BookPrintable,
  type PeekPage,
} from "./activities";

/* Pages from inside the book.
   ─────────────────────────────────────────────────────────────
   Two things live here: the Peek Inside spreads and the free printables.
   Both are the book itself, so neither can be generated — a made-up page
   would misrepresent what someone is buying.

   WHICH pages is decided in content/activities.ts (PEEK_SPREADS,
   BOOK_PRINTABLES).

   WHETHER they show is decided here, and the default is no. A page of
   the book is the author's and publisher's to put on a public site, so
   nothing renders until it's listed below. Until then each spread is an
   honest placeholder with the real caption, and the printables are a
   Slot asking for the OK.

   To publish:
     1. run scripts/render-spreads.py — it renders every page and builds
        each printable PDF into .pending/ (git-ignored, so nothing
        unapproved can ship)
     2. get the OK from Wanda (and the publisher, if their layout is on it)
     3. copy the approved file into public/spreads/ or public/printables/
     4. add it to APPROVED_PAGES or APPROVED_PRINTABLES */

/* Approved by Wanda (October 2026): all six spreads. */
const APPROVED_PAGES: Record<number, string> = {
  38: "/spreads/page-038.webp",
  39: "/spreads/page-039.webp",
  46: "/spreads/page-046.webp",
  47: "/spreads/page-047.webp",
  68: "/spreads/page-068.webp",
  69: "/spreads/page-069.webp",
  74: "/spreads/page-074.webp",
  75: "/spreads/page-075.webp",
  118: "/spreads/page-118.webp",
  119: "/spreads/page-119.webp",
  120: "/spreads/page-120.webp",
  121: "/spreads/page-121.webp",
};

/* Approved by Wanda (October 2026): both printables. */
const APPROVED_PRINTABLES: Record<string, string> = {
  "thieves-in-the-henhouse": "/printables/thieves-in-the-henhouse.pdf",
  "weather-chart": "/printables/weather-chart.pdf",
};

export type SpreadPage = PeekPage & {
  /** Null until approved. */
  image: string | null;
};
export type Spread = { left: SpreadPage; right: SpreadPage };

const withImage = (p: PeekPage): SpreadPage => ({ ...p, image: APPROVED_PAGES[p.page] ?? null });

export const SPREADS: Spread[] = PEEK_SPREADS.map((s) => ({
  left: withImage(s.left),
  right: withImage(s.right),
}));

const ALL_PAGES = SPREADS.flatMap((s) => [s.left, s.right]);
/** At least one real page is showing. */
export const ANY_PAGE_APPROVED = ALL_PAGES.some((p) => p.image !== null);
/** At least one is still a placeholder. */
export const ANY_PAGE_PENDING = ALL_PAGES.some((p) => p.image === null);

export type Printable = BookPrintable & { href: string | null };

export const PRINTABLES: Printable[] = BOOK_PRINTABLES.map((p) => ({
  ...p,
  href: APPROVED_PRINTABLES[p.id] ?? null,
}));

const spreadList = PEEK_SPREADS.map((s) => `${s.left.page}–${s.right.page}`).join(", ");

export const MEDIA_SLOTS = {
  spreads: authorText("OK to show six real spreads from the book", {
    note: `We've picked six spreads that don't give away a trick or a puzzle (pages ${spreadList}) and rendered them from your manuscript, ready to go. Say the word and they replace these boxes, a spread at a time if you like. If you'd rather show photos of the printed book, send those instead.`,
  }),
  printables: authorText("OK to give away two printables from the book", {
    note: `The book already tells readers to copy these: ${BOOK_PRINTABLES.map((p) => `${p.title} (page${p.pages.length > 1 ? "s" : ""} ${p.pages.join("–")})`).join(" and ")}. We've made them into print-ready PDFs straight from your manuscript. Say yes and they become free downloads here, no email needed.`,
  }),
} satisfies Record<string, Slot>;
