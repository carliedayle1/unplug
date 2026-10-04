import { ActivityBadges } from "@/components/primitives/Badge";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { chapterOf, hookFor, pageLabel, type Activity } from "@/lib/activities";
import { SNAPSHOT } from "@/content/unplug";

/* What the site shows of one activity — and all it shows.
   ─────────────────────────────────────────────────────────────
   The numeral and name, chapter and page, the badges, our teaser, the
   "What you need" list, and the ★ line pointing at the book. Never the
   steps, a trick's secret or a puzzle's answer.

   Shared by the snapshot dialog and the activity's own page
   (/activities/<slug>) so the two can't drift: if one ever showed more of
   the book than the other, it would be by accident. No hooks, so it
   renders on the server for the page and on the client in the dialog.

   `headingAs` is h2 in the dialog (the page already has an h1) and h1 on
   the activity page. */

export function ActivityFacts({
  activity,
  headingAs: Heading = "h2",
  headingId,
  className = "",
}: {
  activity: Activity;
  headingAs?: "h1" | "h2";
  headingId?: string;
  className?: string;
}) {
  const chapter = chapterOf(activity);

  return (
    <div className={className}>
      <div className="flex items-start gap-4">
        <OutlineNumeral
          value={activity.n}
          size={64}
          pop={chapter.pop}
          on="cream"
          className="shrink-0"
        />
        <div>
          <Heading
            id={headingId}
            className="m-0 text-[26px] leading-[1.15] font-black text-ink-navy md:text-[30px]"
          >
            {activity.name}
          </Heading>
          <p className="m-0 mt-1.5 text-[18px] font-bold text-ink-muted">
            {SNAPSHOT.chapterLine(chapter.id, chapter.name, pageLabel(activity))}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <ActivityBadges activity={activity} chapter={chapter} withChapter={false} />
      </div>

      <p className="mt-5 mb-0 text-[19px] leading-[1.5] font-bold text-ink-navy">
        {activity.teaser}
      </p>

      <div className="mt-5">
        <div className="text-label text-ink-muted uppercase">{SNAPSHOT.needsLabel}</div>
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {activity.needs.map((need) => (
            <li
              key={need}
              className="rounded-md bg-sun-deep px-3.5 py-1.5 text-[18px] font-bold text-ink-navy"
            >
              {need}
            </li>
          ))}
        </ul>
      </div>

      {/* The hook is what turns a peek into a purchase — and the one line
          that says plainly the rest is in the book. */}
      <p className="mt-5 mb-0 rounded-md bg-sun-deep p-4 text-[18px] font-black text-ink-navy">
        <span aria-hidden>★ </span>
        {hookFor(activity)}
      </p>
    </div>
  );
}
