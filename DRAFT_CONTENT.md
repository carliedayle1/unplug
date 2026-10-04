# What on this site is real, and what we wrote

Read this before showing the site to Wanda. It exists so nobody is
surprised in the meeting.

Three categories: **verified** (from a published source, from the
manuscript itself, or supplied by Wanda directly), **draft** (we wrote it,
needs her sign-off), and **missing** (renders as a dashed card on the page
asking for it).

The big change since the last version: **the site now runs on the book's
real 101.** The twelve stand-in activities, and the notice that admitted
they were stand-ins, are gone. That also meant checking everything the site
*said* about the book against the manuscript, and a lot of it was wrong —
see "What we had to correct".

---

## Verified

### From the published record (ISBN 9781968807160)

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

### From the manuscript itself (the 3/11/26 PDF)

| Fact | Where it shows |
|---|---|
| The 101 activities: **number, name, page, "What you need"** | The 101 grid, every snapshot, the checklist, the sticker chart |
| The 18 chapters and the page each starts on | Card badges, snapshots, the Kind filter |
| First written January 2003, revised 2025 | Homepage "What's in it" |
| eBook ISBN 978-1-968807-17-7 | Not shown. Held in `books.ts` until we know the ebook is on sale |
| "Ungraded… from 4 to 12 or more" (p. 25) | Hero, FAQ. There is **no age, time, mess or cost data in the book**, so the site has none |
| Hog Latin came from her mother and aunts, who grew up in Saskatchewan (p. 75) | The Hog Latin tab |
| Championship Eggs: "a tradition in our family for two generations" (p. 127) | FAQ |
| The Mind Reading trick and its four steps (p. 82); Pig Latin, Ope and Hog Latin rules (pp. 74–76); the Dream-it worksheet (pp. 22–24) | The three interactive extras built on them |

The PDF's page index equals its printed page number (checked), so
"page 82" on the site is page 82 in the book.

### Wanda's own words (unchanged)

The short and long bios in `src/content/author.ts` and the author photo.
Her biographical paragraphs are untouched. **Two of the drafted
paragraphs *around* them were rewritten — see below.**

---

## What we had to correct (please read)

Reading the manuscript showed that several things we'd written about the
book weren't true of it. Wanda had seen some of these and approved them,
so each change is listed for her to confirm.

| Was | Why it was wrong | Now |
|---|---|---|
| "Twenty minutes, nothing to buy" (hero, principles, FAQ, bio) | The bulbs need thirteen weeks (p. 33); fruit leather takes days; some projects need plaster of Paris, acrylic sheets or a sewing machine | "Lots of them start with what's already in the kitchen drawer or the garage" |
| "The one rule that makes it last" / "what to do when it stops working" / a variation for the child who's too old | The book doesn't do this. Most pages are a materials list and steps | Removed. New principles below |
| "No screen-time statistics" (principles, bio) | The preamble, pp. 5–19, is full of them | Removed |
| "Not a book about screens at all" (bio) | The first 26 pages are about television and phones | Rewritten (below) |
| "Nothing in it requires a trip to a shop" (bio) | See first row | Rewritten |
| A blanket fort as the example activity (principles, FAQ) | Not in the book | Gone |
| "Torch" in the FAQ | A UK word on a US book | Gone |
| Peek Inside's "Six real spreads" and its chapter names ("Rainy-day chapter…") | Invented. "Spread 12–13" is actually preamble statistics | Real pages and captions |
| Back-cover draft: "sorted so you can find one that fits the time you actually have" | It's sorted into chapters, not by time | Rewritten |

### The bio sentences that changed

These were *our drafting*, not hers, but she approved the earlier wording.
Everything above them in the bio (Sylvan Lake, Miss Wanda, the Magic
Mirror, two sons, "firm in the belief…") and the "unfashionably direct"
paragraph are unchanged.

**Short bio, 2nd paragraph**
- Was: *"UNPLUG! is where those ideas landed: 101 things to do instead, with no statistics, no guilt, and no suggestion you've already failed — just the next thing to try."*
- Now: *"UNPLUG! is where those ideas landed: 101 things to do instead, so there's something better waiting when the screen goes off."*

**Long bio, 6th paragraph**
- Was: *"So UNPLUG! is not a book about screens at all. It is a book of things to do: one hundred and one of them, arranged so a tired adult can find one that fits the twenty minutes and the materials actually available. Nothing in it requires a trip to a shop, a cleared afternoon, or a child who is already enthusiastic."*
- Now: *"So UNPLUG! opens with the case for taking charge of the off switch, then gets on with the part that matters most: one hundred and one things to do instead, from magic tricks and paper folding to kitchen projects, games and costumes. Each one is a way of offering something better than the screen."*

**Long bio, 7th paragraph**
- Was: *"The tone throughout is the one she'd use with a friend rather than an audience. No statistics about screen time. No suggestion you have already failed. Just the next thing to try, and what to do when it stops working."*
- Now: *"The tone throughout is the one she'd use with a friend rather than an audience: plain, practical and a little bit funny. Pick one, hand it to a child, and see where it goes."*

(One more thing worth knowing: the preamble does pass judgment on
parents — "indulgent parenting", "abdicate their responsibilities". The
site's rule that *our* copy never delivers a verdict on the parent is a
design decision about the site, not a description of the book. No site
copy claims the book is guilt-free.)

---

## Draft — we wrote this, it still needs her sign-off

| What | Where it shows | Note |
|---|---|---|
| **Teaser** for each of the 101 | Every snapshot | One or two sentences in our words. Never a trick's secret, a puzzle's answer or a game's board. `npm run check:content` fails the build if a teaser leaks one |
| The "★" line on each snapshot | Snapshots | e.g. "The secret is on page 82." Points at the book |
| **Tags**: where (indoor/outdoor), who (solo/two/a crowd), "grown-up helps", "takes days" | Filters, badges | Our reading of each activity. The book gives none of these |
| **The ten to start with** | `/checklist`, sticker chart, Swap chips | Catch the Dollar, Quickie Basketball, Handy Paper Cup, Button Buzzer, Water Chimes, Pig Latin, Mind Reading, How Many Stops?, Shadow Portraits, Cup Catcher. Picked because a kid can run each, with everyday materials, in any season. She can swap any |
| **This month** picks | Homepage, top of "Try it free" | Four per month, ours. October is the pumpkins and costumes; December the Christmas projects |
| The four principles | Homepage + `/about` | "101 in 18 chapters", "Written to the kid", "Made from what's lying around", "Each one leads somewhere". Each checked against the book |
| FAQ, three questions | Homepage | Rewritten against the book. "Seven need nothing at all" is counted from the data |
| Back-cover blurb | Not rendered; in `books.ts` | Ours; the real one should replace it |
| **A page per activity** (`/activities/<name>`, all 101) | Search results, shared links | Each shows exactly what the snapshot shows: the teaser, what you need and the page number, never the steps. So the teasers are now public pages that search engines can find. She should know that before launch |
| Tagline, checklist pitch, microcopy | Everywhere | Buttons, empty states, validation messages |
| The Dream-it planner's six question labels | Homepage | A paraphrase of the book's Afford / Space / Alone / Skill / Time / Place |
| The Hog Latin line "learned from her mother and aunts, who grew up in Saskatchewan" | Languages tab | It's from p. 75, but it's about her family, so she should OK it being on the site |
| The Hog Latin translator | Homepage | **An approximation.** The book says think in syllables and that it's "easier by ear". A program can't split English into syllables perfectly; it handles ordinary words (cat, pencil, lipstick, hotdog) and splits compounds like "baseball" more finely than a person would. Pig Latin follows the book's rule exactly, so every word ends "-ay", including ones that start with a vowel |

---

## Missing — renders as a dashed card asking for it

| What | Where |
|---|---|
| Public contact email | `/contact` |
| Social links | `/contact`, footer |
| Real back-cover blurb | Homepage |
| A sample page / excerpt of real text | Homepage |
| Is the ebook on sale? (The copyright page lists an ISBN) | Homepage |
| Other retailers beyond Amazon | Homepage |
| Which ten for the checklist, and where the emails should go | `/checklist` |

### Real pages — approved

**Wanda approved both in October 2026** (relayed by the site owner): the six
Peek Inside spreads (pp. 38–39, 46–47, 68–69, 74–75, 118–119, 120–121) and
the two printables on `/checklist`, the Thieves in the Henhouse boards
(pp. 42–43) and the weather chart (p. 109). They're live in `public/spreads/`
and `public/printables/`. The Thieves boards *are* a game's board, the one
deliberate exception to "never give a board away".

For the record, these were the notes she saw before approving:

Spreads are two facing pages, as in the printed book: side by side from
tablet width up, stacked on a phone. The 74–75 spread (Pig Latin and Hog
Latin) is the best of the six, since Hog Latin is her family's own story.
But **each of those two pages prints the answer to its own small decoding
exercise, upside-down in the corner**. The other ten pages are not trick
or puzzle pages. Her call, and the publisher's if their layout is on the page.

To add or swap a page or printable later, re-run
`scripts/render-spreads.py`, copy it from `.pending/` into
`public/spreads/` or `public/printables/`, then list it in `APPROVED_PAGES` or
`APPROVED_PRINTABLES` in `src/content/media.ts`. Nothing renders otherwise.
Pages can be approved one at a time.

---

## Spotted in the manuscript — for Wanda

Reading closely, these turned up. None are on the site; they're for her
next edit.

**Title**
- Three versions of the subtitle: the interior title page reads "…from **Television**"; the cover reads "…from **Their Electronics**"; and p. 6 calls the book "…from their **electronic friends**". (The earlier edition, ISBN 9781553958055, was "…Television".) The site follows the cover.

**Contents page vs the pages themselves**
- #14: contents "Handy Paper **Cut**", page "Handy Paper **Cup**"
- #10: contents "Turkey **Buzz**", page "Turkey **Buzzard**"
- #49: contents "It's Always **2 or 3**", page "It's Always **3 or 4**"
- #46, #27, #89: contents and page headings word them differently
- p. 86: "How Many Stops Did **Amtrack** Make?" (Amtrak)
- Chapter 16's divider reads "ARSTY THINGS"

**Cross-references that point nowhere or to the wrong page**
- p. 90 (Feed the Tiger): "See how on **Page xxx**" — the bean-bag instructions are on p. 142
- p. 144 (Shoulder Bag): "Twist as shown on **page --**" — the rope twist is on p. 129
- p. 41 (Thieves): "Make one copy of **page 32**" — the boards are on pp. 42–43
- p. 128: "see Spatter Painting on **Page 101**" — it's on p. 126
- p. 129: "enlarged… by the method shown on **Page 134**" — Zoom In is p. 138
- p. 136: "See **pages 111 and 113** for projects using colored sand" — they're on pp. 137 and 139

**Materials lists that don't match their steps**
- p. 31 Coin Trick: the list says "quarter, **penny**"; the steps use a quarter and a **dime**
- p. 107 Sundial: the list says a **10"** board; the steps say **12"**
- p. 59 Crunchy Cheese Bread: the picture says **3** tbsp Parmesan; the step says **4**
- p. 98 Feed the Birds: the list has "1 egg", which the steps never use, and "Butter", where the steps say peanut butter
- p. 35 Egghead: "**alpha** sprout seeds" (alfalfa)
- p. 75 Hog Latin: the row for "WHY" prints "mOU -Yookoo", which looks garbled

**Things that date it**
- The 2025 revision keeps 1990s material (the V-chip, the "TimeSlot" gadget, the 1997 Statistical Abstract) beside 2023–24 data. It reads as two different eras.

**Safety — said gently**
- p. 126 (Blown Eggs): "put your mouth over the small end of the egg and blow" — raw egg in the mouth; many guides now use a blow-out tool or a straw.
- p. 95 (Puddle Wipe) ends with pulling a person by the ankles through a puddle on a hard floor. It's left out of the Boredom Button for that reason.
- Several workshop projects (pp. 98–104, 112) use drills, hammers and knives. The site marks them "Grown-up helps · tools".

**Not used on the site, on purpose**
- The dedication's family names, the named children in the Tennis Golf story (p. 112), and the publisher's street address and phone number.

---

## Nothing here is attributed to anyone else

No review quotes, no awards, no bestseller claim, no press mentions, no
event dates — anywhere in the project. Those are the claims that cause
real damage if invented, because they're verifiable and they put words
in named people's mouths.

(The *book's* preamble quotes researchers and organisations — Pew, a
Columbia study, the Academy of Pediatrics. None of that is repeated on
the site.)

The `/praise` and `/events` pages were removed rather than filled, for
exactly this reason. Add them back when there is something true to put
in them.

---

## Removed sections

`/praise`, `/events` and `/news`, plus the multi-book catalog index and a
placeholder second title. One book, four pages: **The Book · About · Free
Checklist · Contact**.
