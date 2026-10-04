import type { Activity } from "@/lib/activities";
import { activityLabel, chapterOf, shortPage } from "@/lib/activities";
import { OutlineNumeral } from "./OutlineNumeral";
import { ActivityBadges } from "./Badge";

/* The activity card.
   ─────────────────────────────────────────────────────────────
   Cream surface, radius 24 (lg), hard sun-deep offset. The outlined
   numeral is decorative, so the whole card carries one accessible
   label that repeats the number, name, chapter, page and where — the
   badges are aria-hidden inside it to avoid reading everything twice.

   Give it `onOpen` and the card becomes pressable: a "Peek · p. 82"
   pill whose hit area is stretched over the whole card (the ::after),
   so the pill is the one focusable thing but the card is the target.
   The focus ring is drawn on the card, not the little pill. Without
   `onOpen` it's a plain, inert card — the styleguide shows both.

   The name sets text-ink-navy explicitly rather than inheriting. This
   card is dropped onto the navy-field Boredom Button as well as the
   plain yellow grid, and `Section` sets `text-cream` at the section
   level for the navy field — without an explicit colour here, the name
   inherited cream-on-cream and vanished entirely. */

export function ActivityCard({
  activity,
  layout = "stack",
  className = "",
  onOpen,
}: {
  activity: Activity;
  /** `row` is the mobile grid (numeral beside text); `stack` is desktop. */
  layout?: "row" | "stack";
  className?: string;
  /** Opens the snapshot. Omit for an inert card. */
  onOpen?: () => void;
}) {
  const numeralSize = layout === "row" ? 48 : 54;
  const chapter = chapterOf(activity);

  return (
    <article
      aria-label={activityLabel(activity)}
      className={[
        "card-lift relative rounded-lg bg-cream p-5",
        layout === "row" ? "flex items-start gap-3.5" : "flex flex-col gap-3",
        onOpen
          ? "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ink-navy"
          : "",
        className,
      ].join(" ")}
    >
      <OutlineNumeral
        value={activity.n}
        size={numeralSize}
        pop={chapter.pop}
        on="cream"
        className={layout === "row" ? "shrink-0" : ""}
      />
      <div className="flex flex-1 flex-col">
        <h3 className="text-[21px] leading-[1.25] font-black text-ink-navy" aria-hidden>
          {activity.name}
        </h3>
        <div className="mt-2.5 flex flex-wrap gap-2" aria-hidden>
          <ActivityBadges activity={activity} chapter={chapter} />
        </div>
        {onOpen && (
          <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={onOpen}
              aria-label={`Peek inside: ${activity.name}, ${shortPage(activity)}`}
              className={[
                "inline-flex min-h-11 cursor-pointer items-center rounded-full",
                "border-3 border-ink-navy bg-cream px-4 text-[18px] font-black text-ink-navy",
                "hover:bg-sun-deep focus-visible:outline-none",
                // The stretched hit area: the whole card presses this button.
                "after:absolute after:inset-0 after:rounded-lg after:content-['']",
              ].join(" ")}
            >
              Peek · {shortPage(activity)}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

/** The dashed placeholder the Boredom Button shows before first press. */
export function EmptyCardSlot({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex items-center justify-center rounded-lg border-3 border-dashed border-ink-navy",
        "box-border p-5 text-center text-[18px] font-extrabold text-ink-muted",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
