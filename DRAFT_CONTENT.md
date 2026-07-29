# What on this site is real, and what we wrote

Read this before showing the site to Wanda. It exists so nobody is
surprised in the meeting.

Three categories: **verified** (from a published source), **draft** (we
wrote it, needs her sign-off), and **missing** (renders as a dashed card
on the page asking for it).

---

## Verified

Taken from the published record for ISBN 9781968807160 (Google Books
record and the Amazon listing).

| Fact | Value |
|---|---|
| Title | UNPLUG! |
| Subtitle | 101 Ways to Pull Your Kids Away from Their Electronics |
| Author | Wanda Kanten Hartfield |
| Publisher | Books Academy LLC |
| Published | 30 November 2025 |
| Pages | 154 |
| ISBN-13 | 978-1-968807-16-0 |
| Categories | Parenting · Learning styles · Activities |
| Buy link | `amazon.com/dp/1968807160` |

The cover image is the real cover.

> The subtitle differs slightly by source: the cover artwork reads "…from
> **Their** Electronics", the Google Books record drops "Their". The site
> follows the cover. Worth confirming which she considers correct.

> Her name is spelled **Heartfield** in the Google Books record and
> **Hartfield** on the cover and in the Amazon URL. The site uses
> Hartfield. Please confirm.

---

## Draft — we wrote this, she needs to approve or replace it

All of it lives in `src/content/author.ts` and `src/content/unplug.ts`.

| What | Where it shows | Note |
|---|---|---|
| Short bio (2 paragraphs) | Homepage, "Who wrote it" | About the book's purpose, not her life |
| Long bio (4 paragraphs) | `/about` | Built around the book's own stated position |
| Tagline | Footer | "One hundred and one things to do instead." |
| The four principles | Homepage + `/about` | Our reading of what the book is for |
| Back-cover blurb | `/books/unplug` | Our draft; the real one should replace it |
| Checklist name and pitch | `/checklist`, homepage | "Ten to start with" |
| FAQ — 3 questions and answers | `/books/unplug` | Includes specific counts (38 scale both ways, 61 need nothing) that we invented — **these need checking or cutting** |
| Site voice and microcopy | Everywhere | Buttons, empty states, validation messages |

### The bio was deliberately written "thin"

The design mockups came with a detailed biography — twenty-two years
teaching Reception through Year 6, three children of her own, "Bored Jar"
workshops for 400+ families, based in the UK, prices in pounds. **None of
that was sourced. It was the designer's filler.** It also conflicts with
the only published description we could find of this author: the earlier
edition of the book (*Unplug! 101 Ways to Pull Your Kids Away from
Television*, ISBN 9781553958055) describes her as a former television
producer who taught on *Romper Room*.

We removed the invented version rather than show her a fabricated
account of her own career. What replaced it is deliberately about the
book rather than about her, so there is nothing in it she has to correct
— only things she may wish to add.

**If she confirms the television-producer background, that's a much
stronger bio and we should rewrite around it.**

---

## Demo content — clearly labelled as such on the page

**The twelve activities are not from the book.** Five came from the
design mockups, seven we wrote to fill out the grid. Their numbers (07,
23, 58, 91…) are not the book's numbering.

They drive five interactive features on `/books/unplug#extras`: the
filterable activity grid, the Boredom Button, the screen-time swap, the
sticker chart, and the ten shown on `/checklist`.

There is a visible notice above those features saying so, because she
will recognise immediately that they aren't hers. Replace
`src/lib/activities.ts` with the real list and delete the notice from
`src/components/sections/UnplugExtras.tsx`.

The six "Peek Inside" spreads are placeholders too — captions only, no
page images.

---

## Missing — renders as a dashed card asking for it

| What | Where |
|---|---|
| An author photo | Homepage, `/about` — the single biggest gap |
| Public contact email | `/contact` |
| Social links | `/contact`, footer |
| Real back-cover blurb | `/books/unplug` |
| Sample pages / excerpt | `/books/unplug` |
| Photos of real spreads | `/books/unplug` Peek Inside |
| The checklist PDF + which ten activities | `/checklist` |
| Whether there's an ebook or audiobook | `/books/unplug` |
| Other retailers beyond Amazon | `/books/unplug` |

Seven image slots carry a ready-to-paste Midjourney prompt. Author
photos and the cover never do — generating those would fabricate a
likeness or misrepresent the product.

---

## Nothing here is attributed to anyone else

No review quotes, no awards, no bestseller claim, no press mentions, no
event dates — anywhere in the project. Those are the claims that cause
real damage if invented, because they're verifiable and they put words
in named people's mouths.

The `/praise` and `/events` pages were removed rather than filled, for
exactly this reason. Add them back when there is something true to put
in them.

---

## Removed sections

`/praise`, `/events` and `/news`, plus the multi-book catalog index and a
placeholder second title. One book, four pages: **The Book · About · Free
Checklist · Contact**.
