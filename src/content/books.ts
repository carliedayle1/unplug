import { authorText, type Slot } from "./placeholders";

/* The catalog.
   ─────────────────────────────────────────────────────────────
   FACTS vs DRAFT — read this before editing.

   Verified from the published record (Google Books / Amazon listing,
   ISBN 9781968807160):
     · title, subtitle (subtitle per the cover artwork)
     · publisher      Books Academy LLC
     · published      30 November 2025
     · pages          154
     · ISBN-10 / 13
     · categories
     · the Amazon listing URL

   REMOVED as designer fiction — the mockups asserted all of this and
   none of it holds up:
     · "£12.99 / £6.99 / £17.99"  — the listing is amazon.com, in USD,
       and we have no confirmed prices. Prices now live on the retailer.
     · "Landscape, 128 pages, lies flat" — it's 154 pages.
     · "Free UK delivery over £15 · ships in 2 days" — not our shipping
       to promise, and the wrong currency and market.
     · A placeholder second title — there is one book. */

export type BuyLink = { retailer: string; url: string | null };

export type Format = {
  name: string;
  detail: string;
  /** Null where we have no confirmed price — the retailer shows it. */
  price: string | null;
  featured?: boolean;
};

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  /* How the full title breaks across lines when set as display type in
     a hero. Explicit rather than parsed out of `subtitle`, because where
     a title wants to break is a typographic decision per book, not a
     string operation. */
  displayTitle?: { mark: string; big: string; rest: string };
  series: string | null;
  seriesNumber: number | null;
  cover: string | null;
  coverAlt: string;
  tags: string[];
  published: string | null;
  publisher: string | null;
  pages: number | null;
  isbn13: string | null;
  formats: Format[];
  buyLinks: BuyLink[];
  /** Back-cover style blurb. */
  blurb: string | null;
  blurbSlot?: Slot;
  excerptSlot?: Slot;
  /** Which interactive extras this title carries. */
  extras?: "unplug";
  slots: Slot[];
};

export const BOOKS: Book[] = [
  {
    slug: "unplug",
    title: "UNPLUG!",
    // Per the cover artwork. The Google Books record drops "Their".
    subtitle: "101 Ways to Pull Your Kids Away from Their Electronics",
    displayTitle: {
      mark: "UNPLUG!",
      big: "101 Ways",
      rest: "to Pull Your Kids Away from Their Electronics",
    },
    series: null,
    seriesNumber: null,
    cover: "/cover.jpg",
    coverAlt:
      "UNPLUG! 101 Ways to Pull Your Kids Away from Their Electronics, by Wanda Kanten Hartfield",
    tags: ["Parenting", "Activities", "Learning styles"],
    published: "30 November 2025",
    publisher: "Books Academy LLC",
    pages: 154,
    isbn13: "978-1-968807-16-0",
    formats: [
      {
        name: "Paperback",
        detail: "154 pages",
        price: null,
        featured: true,
      },
    ],
    buyLinks: [
      {
        retailer: "Amazon",
        url: "https://www.amazon.com/Unplug-Ways-Pull-Your-Electronics/dp/1968807160/",
      },
    ],
    /* DRAFT — written from the book's own subject matter and the
       author's stated position ("Turn off the Phone… Demand and expect
       more of your kids"). Needs the author's sign-off, or replacing
       with the real back-cover text. */
    blurb:
      "One hundred and one things to do instead. Not a lecture about screens, and not a list you could have googled — a book of real activities you can start this afternoon, with what's already in the house. Sorted so you can find one that fits the time you actually have.",
    excerptSlot: authorText("A sample spread or two of real text", {
      note: "Readers who get this far are close to buying. Even one page of the real thing does more than any description.",
      lines: 8,
    }),
    extras: "unplug",
    slots: [
      authorText("The real back-cover blurb", {
        note: "The description on this page is our draft — replace it with your own words.",
        lines: 5,
      }),
      authorText("Ebook or audiobook editions?", {
        note: "Only the paperback is listed. If there's a Kindle or audio edition we'll add it with its own buy link.",
      }),
      authorText("Other retailers", {
        note: "Amazon is linked. Add Barnes & Noble, Bookshop.org, or a direct link if you have them.",
      }),
    ],
  },
];

export const getBook = (slug: string) => BOOKS.find((b) => b.slug === slug);

/** The one title, and the site's main call to action. */
export const featuredBook = () => BOOKS[0];

/* One book, one page: its own "details" page and the homepage were
   showing the same title, cover and Boredom Button, so they're merged.
   BOOK_URL now just means "where the book lives on this site" — the
   homepage — kept as a named export so call sites read as intent
   ("go see the book") rather than a bare "/". */
export const BOOK_URL = "/";

/* The primary place to actually buy it. Used by every CTA whose job is
   getting someone to a checkout, so there's one definition to change
   when another retailer becomes the default. Falls back to BOOK_URL if
   no retailer has a URL yet — send them to the book rather than nowhere. */
const primary = BOOKS[0].buyLinks.find((b) => b.url);
export const BUY_URL = primary?.url ?? BOOK_URL;
export const BUY_LABEL = primary ? `Buy on ${primary.retailer}` : "Get the Book";
export const BUY_IS_EXTERNAL = Boolean(primary?.url);
