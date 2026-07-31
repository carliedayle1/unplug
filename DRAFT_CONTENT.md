# What on this site is real, and what we wrote

Read this before showing the site to Wanda. It exists so nobody is
surprised in the meeting.

Three categories: **verified** (from a published source, or supplied by
Wanda directly), **draft** (we wrote it, needs her sign-off), and
**missing** (renders as a dashed card on the page asking for it).

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

### The biography — now author-supplied, no longer draft

Wanda confirmed the detail this project could only half-verify from an
old edition's back-cover copy: she was **"Miss Wanda," the host/teacher
of *Romper Room***, working the show's "Magic Mirror" segment. She grew
up in Sylvan Lake, Alberta, Canada, with two sisters, and later tested
the book's activities as the mother of two sons — her stated belief is
that a child taught to self-entertain needs electronics less.

That replaces the placeholder bio that stood in previously (which was
deliberately written about the book's position rather than her life,
precisely so nothing in it could be wrong). The short and long bios in
`src/content/author.ts` are her words now, not ours — see the file's
header comment. Nothing about her biography remains draft.

### The author photo — also real now

`public/author_pic.jpg`, rendered via `components/content/AuthorPhoto.tsx`
on the homepage and `/about`. It replaced the last outstanding slot on
those pages — the "Over to you" section on `/about` that used to ask for
it is gone, since there's nothing left to ask for.

---

## Draft — we wrote this, it still needs her sign-off

All of it lives in `src/content/author.ts` and `src/content/unplug.ts`.

| What | Where it shows | Note |
|---|---|---|
| Tagline | Footer | "One hundred and one things to do instead." |
| The four principles | Homepage + `/about` | Our reading of what the book is for — thematic, not biographical |
| Back-cover blurb | Homepage | Our draft; the real one should replace it |
| Checklist name and pitch | `/checklist`, homepage | "Ten to start with" |
| FAQ — 3 questions and answers | Homepage | Includes specific counts (38 scale both ways, 61 need nothing) that we invented — **these need checking or cutting** |
| Site voice and microcopy | Everywhere | Buttons, empty states, validation messages |

---

## Demo content — clearly labelled as such on the page

**The twelve activities are not from the book.** Five came from the
design mockups, seven we wrote to fill out the grid. Their numbers (07,
23, 58, 91…) are not the book's numbering.

They drive five interactive features on the homepage (`/#extras`): the
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
| Public contact email | `/contact` |
| Social links | `/contact`, footer |
| Real back-cover blurb | Homepage |
| Sample pages / excerpt | Homepage |
| Photos of real spreads | Homepage, Peek Inside |
| The checklist PDF + which ten activities | `/checklist` |
| Whether there's an ebook or audiobook | Homepage |
| Other retailers beyond Amazon | Homepage |

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
