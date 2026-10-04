"use client";

import { useSyncExternalStore } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { useSnapshot } from "./ActivitySnapshot";
import { ActivityCard } from "@/components/primitives/ActivityCard";
import { THIS_MONTH } from "@/content/unplug";
import { MONTHLY, MONTH_NAMES, type Month } from "@/content/activities";
import { picksForMonth } from "@/lib/activities";

/* This month, from the book.
   ─────────────────────────────────────────────────────────────
   Four activities for the time of year: costumes and pumpkins in
   October, Christmas projects in December, snow games in January, eggs
   at Easter. The book is full of seasonal things and a static grid hides
   that; this surfaces it, and gives a reason to come back in a different
   month.

   THE MONTH IS A CLIENT FACT. A server render can't know it (and a
   cached one would be wrong by the next month), so it's read through
   useSyncExternalStore with a server snapshot of `null`. React reuses
   the null for hydration and swaps in the real month afterwards, so
   there's no mismatch — and the section holds a fixed-height skeleton
   meanwhile, so nothing below it jumps when the cards arrive.

   `?month=1…12` overrides it, the same way `?motion=` overrides reduced
   motion — so any month can be reviewed without changing the clock. */

function currentMonth(): Month {
  const q = Number(new URLSearchParams(window.location.search).get("month"));
  const m = Number.isInteger(q) && q >= 1 && q <= 12 ? q : new Date().getMonth() + 1;
  return m as Month;
}

// The month doesn't change while the page is open, so there's nothing to
// subscribe to.
const subscribe = () => () => {};

export function ThisMonth() {
  const open = useSnapshot();
  const month = useSyncExternalStore<Month | null>(subscribe, currentMonth, () => null);
  const picks = month ? picksForMonth(month) : [];

  return (
    <Section id="this-month" labelledBy="this-month-heading">
      <Reveal>
        <p className="text-label m-0 text-ink-muted uppercase">{THIS_MONTH.heading}</p>
        <SectionHeading id="this-month-heading" className="mt-1.5">
          {month ? `${MONTH_NAMES[month]}, from the book` : "From the book"}
        </SectionHeading>
        <p className="mt-2.5 max-w-[62ch] text-[18px] font-bold md:text-[21px]">
          {month ? `${MONTHLY[month].line} ${THIS_MONTH.intro}` : THIS_MONTH.intro}
        </p>
      </Reveal>

      {/* A fixed floor under the grid, so the page doesn't jump when the
          month arrives. */}
      <div className="mt-7 min-h-[260px]">
        {month ? (
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {picks.map((a) => (
              <li key={a.n}>
                <ActivityCard
                  activity={a}
                  layout="stack"
                  className="h-full"
                  onOpen={open ? () => open(a.n) : undefined}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div
            aria-hidden
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[260px] rounded-lg bg-cream/60" />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
