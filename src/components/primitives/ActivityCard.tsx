import type { Activity } from "@/lib/activities";
import { activityLabel } from "@/lib/activities";
import { OutlineNumeral } from "./OutlineNumeral";
import { TimeBadge, WhereBadge, MessBadge } from "./Badge";

/* The activity card.
   ─────────────────────────────────────────────────────────────
   Cream surface, radius 24 (lg), hard sun-deep offset. The outlined
   numeral is decorative, so the whole card carries one accessible
   label that repeats the number, name, time, where and mess — the
   badges are aria-hidden inside it to avoid reading everything twice.

   `dealt` switches the entrance from the grid's stagger to the
   Boredom Button's card-flip.

   The name sets text-ink-navy explicitly rather than inheriting. This
   card is dropped onto the navy-field Boredom Button as well as the
   plain yellow grid, and `Section` sets `text-cream` at the section
   level for the navy field — without an explicit colour here, the name
   inherited cream-on-cream and vanished entirely. */

export function ActivityCard({
  activity,
  layout = "stack",
  className = "",
}: {
  activity: Activity;
  /** `row` is the mobile grid (numeral beside text); `stack` is desktop. */
  layout?: "row" | "stack";
  className?: string;
}) {
  const numeralSize = layout === "row" ? 48 : 54;

  return (
    <article
      aria-label={activityLabel(activity)}
      className={[
        "card-lift rounded-lg bg-cream p-5",
        layout === "row" ? "flex items-start gap-3.5" : "flex flex-col gap-3",
        className,
      ].join(" ")}
    >
      <OutlineNumeral
        value={activity.n}
        size={numeralSize}
        pop={activity.pop}
        on="cream"
        className={layout === "row" ? "shrink-0" : ""}
      />
      <div className={layout === "row" ? "flex-1" : ""}>
        <h3 className="text-[21px] leading-[1.25] font-black text-ink-navy" aria-hidden>
          {activity.name}
        </h3>
        <div className="mt-2.5 flex flex-wrap gap-2" aria-hidden>
          <TimeBadge time={activity.time} />
          <WhereBadge where={activity.where} />
          <MessBadge mess={activity.mess} />
        </div>
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
