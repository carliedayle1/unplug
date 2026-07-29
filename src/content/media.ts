import { authorText, type Slot } from "./placeholders";

/* Photos from inside the book.
   ─────────────────────────────────────────────────────────────
   Trimmed right down: the press, events and news pages are gone, and
   with them the illustration slots that only existed to head them.

   What's left is the Peek Inside carousel. Spreads are photographs of a
   real product, so they can't be generated — a made-up "spread" would
   misrepresent what someone is buying. */

export const SPREADS = [
  { pages: "Spread 12–13", chapter: "Rainy-day chapter", image: null },
  { pages: "Spread 20–21", chapter: "Twenty-minute wins", image: null },
  { pages: "Spread 34–35", chapter: "The one that buys an hour", image: null },
  { pages: "Spread 48–49", chapter: "Outdoor, any weather", image: null },
  { pages: "Spread 66–67", chapter: "Messy on purpose", image: null },
  { pages: "Spread 88–89", chapter: "When it stops working", image: null },
] as Array<{ pages: string; chapter: string; image: string | null }>;

export const MEDIA_SLOTS = {
  spreads: authorText("Photos or scans of a few real pages", {
    note: "Even a phone photo of an open spread works. These are the book itself, so they're the one thing here we can't mock up — and they sell it better than any description.",
  }),
} satisfies Record<string, Slot>;
