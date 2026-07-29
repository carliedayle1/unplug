<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Wanda Kanten Hartfield — author site

**Read `DRAFT_CONTENT.md` first.** It records what on this site is verified,
what we drafted, and what's still missing. Don't add content without updating it.

## Shape of the thing

One book, one page for it. There was a `/books/[slug]` route once; it was
deleted because it showed the same title, cover and Boredom Button as the
homepage. **The homepage IS the book's page** — don't recreate a separate one
without a second title to justify it.

```
/               the book: hero, what's in it, the interactive extras (#extras),
                excerpt/what's-needed, who wrote it, the checklist
/about          bio + what the book stands for
/checklist      the free lead magnet ("Ten to start with")
/contact        email + socials
/privacy /terms stubs
/styleguide     the design system, rendered from the real components
```

`content/books.ts` still models `Book`/`BOOKS` properly (a second title would
get its own entry), and `BOOK_URL` still exists as a named export — it just
equals `"/"` now instead of a route. `BUY_URL`/`BUY_LABEL`/`BUY_IS_EXTERNAL`
point at the retailer; use those for anything whose job is a sale, and
`BOOK_URL` only for "go see the book" (which, today, is a same-page no-op from
most homepage sections — check where a link actually sits before choosing).

Removed, deliberately: `/praise`, `/events`, `/news`, and the multi-book catalog
index. There was nothing true to put in the first three, and there is one title.
Add them back only when that changes.

**Content lives in `src/content/`, never in components.** `author.ts`,
`books.ts`, `media.ts`, `nav.ts`, plus `unplug.ts` for the book-extras copy.

## Truth rules — the ones that matter

The design mockups were full of invented "facts". Several got as far as the
running site before being caught. Assume mockup copy is filler until sourced.

- **Never invent anything attributed to a third party.** No review quotes, no
  awards, no bestseller status, no press mentions, no event dates. These are
  verifiable and they put words in real people's mouths. This is why `/praise`
  and `/events` don't exist rather than shipping empty.
- **Never invent biography.** The mockups had her as a British ex-primary
  teacher with three kids and "Bored Jar" workshops. All fiction, and it
  contradicts the only published description of this author (a former television
  producer who taught on *Romper Room*). The bio in `author.ts` is a draft
  written about the *book* rather than her life, precisely so there's nothing
  false in it.
- **Never invent product facts.** The mockups claimed 128 pages, £12.99/£6.99/
  £17.99 and "free UK delivery over £15". It's 154 pages, published by Books
  Academy LLC on 30 Nov 2025, sold on amazon.com. Prices are deliberately absent
  — the retailer shows the current one.
- **`realPhotoOnly` slots never get a Midjourney prompt.** Author photos and
  book covers. Generating those fabricates a likeness or misrepresents a product.
- **The 12 activities in `lib/activities.ts` are demo data**, not the book's.
  A visible notice on the extras page says so; delete it when the real list
  lands, not before.

## Placeholders

Genuine gaps render as a `Slot` (`src/content/placeholders.ts` +
`src/components/content/Slot.tsx`): what's needed and who supplies it, in
language addressed to the author. ~14 of them now that most sections carry
drafted copy. The old "§n" intake references are gone — they were internal
notes and had no business on a page a client sees.

## Icons

`app/icon.svg` is the favicon (pinwheel from the prop kit — font-free so it
survives 16px). `app/apple-icon.png` must be a **raster**: Next silently ignores
an SVG at that filename and the touch icon 404s. Regenerate with
`node scripts/generate-icons.js`.

# Design invariants

The design system lives in `src/app/globals.css` as one `@theme` block. It is
sampled from the book cover (`public/cover.jpg`). **Never hardcode a hex in a
component** — consume the tokens.

Source of truth is the Claude Design project *Book UI mockups review*
(`390e3f6d-1ff9-43b9-a763-e9828266764d`): `Style Tile.dc.html`,
`Components.dc.html`, `Screens - Mobile.dc.html`, `Screens - Desktop.dc.html`.
`/styleguide` renders both deliverables from the real components — check changes
there before the site.

## Rules that are easy to break

- **Yellow is the page**, not an accent. Cards sit on top of it.
- **One pop per element.** Never gradient two pops, never two in one shape.
- **Cream on yellow is banned** (1.3:1). Cream is card surfaces and type
  outlines only — never white.
- **Pops carry fills, not small text.** Type on a solid pop only at 20px+/900:
  cream on red/blue/magenta, ink-navy on teal/orange. Below that, use the pale
  tint — that's what every badge does. Use the `.pop-*` utilities, which bind
  fill, pressed shade, tint and on-fill text colour together so the pairing
  can't be got wrong.
- **Never `opacity` on text.** `--ink-muted` is the only de-emphasis.
- **Pill radius means pressable.** If it isn't pressable it gets 16/24/28.
- **Body text floor is 18px**; 16px is annotation only. Caveat never below 28px,
  and never for body, nav or button labels.
- **Outlined numerals are graphics, not type.** Any pop is allowed because the
  cream outline does the separating — but they must carry the outline, never sit
  below 40px, and never be the only place a value appears (see `activityLabel`).
- **The outline stroke must never equal the fill.** This is the one that bit:
  cream fill + cream stroke made "Stuck? Press it." a colourless blob. The design
  uses the stroke two ways, both fine — *field-matched* (yellow/deep/navy: the
  letterforms thicken, no halo) and *cream halo* (cream cards, teal: a ring
  separates type from a saturated field). Both are encoded in `FIELD_OUTLINE` /
  `FIELD_HEADING_FILL` in `components/sections/Section.tsx`; pass `on={field}`
  to `SectionHeading` and it can't go wrong.
- **The dot grid is the yellow field.** Every yellow surface carries
  `.dot-grid`; cream, navy and teal stay flat. `Section` does this from `field`.
- **Measured contrast:** ink-navy on yellow is **6.09:1 (AA)** and on cream
  **7.92:1 (AAA)**. The v0.1 tile said 8.1 and 9.2 and labelled both AAA; that
  was wrong. Put long-form reading on cream.

## Motion

`prefers-reduced-motion` is a first-class state, not a fallback: cards
cross-fade instead of flipping, confetti is one static
burst, and the scroll cord and draggable props don't mount at all. Everything
routes through `useReducedMotion()`, whose server snapshot is `true` so the
first paint is the calm one.

Use `?motion=reduce` / `?motion=full` to review either state without changing OS
settings.

Confetti is reserved for exactly two moments: sticker-chart completion and the
Boredom Button. 1.2s, then gone.

## Voice

Second person, present tense, short sentences. The site never diagnoses a
problem — it hands over something to do. No screen-time statistics, no "are you
doing enough?", never the words "digital detox", no baby talk aimed at parents.
Book-extras strings live in `src/content/unplug.ts`; author/site strings in
`src/content/author.ts` and `src/content/nav.ts`. (`src/lib/copy.ts` no longer
exists — content moved to `src/content/` early on; ignore any stale reference
to it.)

Two things are load-bearing for trust and must not be "optimised" away: the
**no-email download** on the printable section, and the **absence of any verdict
on the parent** in the Screen-Time Swap.

# Gotchas found the hard way

- **`ButtonLink` + `hidden` don't mix.** The button base classes include
  `inline-flex`, which sits in the same layer at the same specificity as
  `hidden` — so `hidden` loses on stylesheet order and the element stays visible.
  Swap the *label* with spans instead of hiding whole buttons (see `NavBar`).
- **`aspect-ratio` in an auto-width grid column resolves width from content
  height.** A tall `Slot` grew to 509px inside a 350px column and broke the page
  at 390. `Slot` now sets `w-full max-w-full`; keep an explicit `grid-cols-1` at
  the base breakpoint on responsive grids.
- **Never `Get-Content`/`Set-Content` these files in PowerShell 5.1.** It reads
  UTF-8 as CP1252 and silently mangles every em-dash and box-drawing character in
  the comments. Use the Edit tool, or `[IO.File]::ReadAllText($p, $utf8)`.
- **Don't nest a second `<main>` in a page.** The root layout owns
  `<main id="main">`; a page adding its own gives two landmarks and a duplicate
  id (`/styleguide` did).
- **A component's text colour must not depend on inheriting from its parent
  section.** `ActivityCard`'s name is always cream-card content, but it sits
  inside `Section field="navy"`, which sets `text-cream` at the section level.
  Without an explicit `text-ink-navy` on the `<h3>`, the name inherited cream
  and vanished — cream text on its own cream card. Any component reused across
  fields needs its own text colour, never an inherited one.
- **`Wordmark`'s outline colour must match the FIELD it sits on, not default to
  one value everywhere.** Three of its seven letters (green, gold, cyan) aren't
  in the five-pop token set — they're the cover's own logotype colours, sampled
  directly from `public/cover.jpg`, and are the one sanctioned exception to
  "consume the tokens" (this is a logotype, same category as outlined display
  numerals). On yellow/sun-deep fields the outline is cream (matches the
  cover). On a **cream** field (the nav bar) a cream outline is invisible and
  the gold letter drops to ~1.5:1 — that combination needs `outline="navy"`.
  Check the field before adding a new `<Wordmark>` call site.
