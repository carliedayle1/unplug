"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Section, SectionHeading, Reveal } from "./Section";
import { Pill } from "@/components/primitives/Pill";
import { ActivityCard } from "@/components/primitives/ActivityCard";
import { Button, ButtonLink } from "@/components/primitives/Button";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { THE_101 } from "@/content/unplug";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import {
  ACTIVITIES,
  FILTER_GROUPS,
  activeFilterCount,
  estimatedTotal,
  filterActivities,
  filterKeyFor,
  type FilterState,
} from "@/lib/activities";

/* 02 · The 101 — live filters.
   ─────────────────────────────────────────────────────────────
   Six colour-coded filter groups; options within a group OR together,
   groups AND together. Selections persist so a parent who filters,
   leaves and comes back doesn't start over.

   The result line stays honest: it scales the twelve shown up to the
   101 in the book rather than pretending the site holds all of them. */

/* Module-level so the identity is stable across renders — the hook
   memoises on it. */
const DEFAULT_FILTERS: FilterState = { "where:Indoor": true };

export function TheOneOhOne() {
  const [filters, setFilters] = useLocalStorage<FilterState>(
    "unplug:filters",
    DEFAULT_FILTERS,
  );

  const shown = useMemo(() => filterActivities(ACTIVITIES, filters), [filters]);
  const count = activeFilterCount(filters);
  const estimate = estimatedTotal(shown.length, ACTIVITIES.length);

  const toggle = (key: string) =>
    setFilters((s) => {
      const next = { ...s, [key]: !s[key] };
      if (!next[key]) delete next[key];
      return next;
    });

  return (
    <Section id="the-101" labelledBy="the-101-heading">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionHeading id="the-101-heading">{THE_101.heading}</SectionHeading>
            <p className="mt-2.5 max-w-[68ch] text-[18px] font-bold md:text-[21px]">
              {THE_101.intro}
            </p>
          </div>
          {/* aria-live so filtering announces its own result. */}
          <p
            role="status"
            aria-live="polite"
            className="m-0 text-[18px] font-black md:text-[22px]"
          >
            {count === 0
              ? THE_101.allShown
              : `Showing ${shown.length} of ${estimate} · ${count} filter${count > 1 ? "s" : ""} on`}
            {count > 0 && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={() => setFilters({})}
                  /* Inline in a sentence, so WCAG 2.5.8's in-sentence
                     exception applies to the 44px target floor —
                     matching the mockup, which used a text link. */
                  className="cursor-pointer border-0 bg-transparent p-0 font-black text-ink-navy underline decoration-3 underline-offset-4 hover:text-link-hover"
                >
                  {THE_101.clear}
                </button>
              </>
            )}
          </p>
        </div>
      </Reveal>

      <div className="mt-7 grid gap-7 lg:grid-cols-[280px_1fr] lg:items-start">
        {/* ── Filters ─────────────────────────────────────── */}
        <Reveal>
          <div className="rounded-xl bg-cream p-5.5 shadow-[0_6px_0_var(--color-sun-deep)] lg:sticky lg:top-24">
            <div className="font-display text-[26px] font-bold">
              {THE_101.filtersHeading}
            </div>
            <div className="mt-4 flex flex-col gap-4.5">
              {FILTER_GROUPS.map((g) => (
                <fieldset key={g.key} className="m-0 border-0 p-0">
                  <legend className="text-label mb-2 p-0 text-ink-muted uppercase">
                    {g.label}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {g.options.map((o) => {
                      const k = filterKeyFor(g.key, o);
                      return (
                        <Pill
                          key={k}
                          label={o}
                          pop={g.pop}
                          pressed={!!filters[k]}
                          onToggle={() => toggle(k)}
                        />
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Grid ────────────────────────────────────────── */}
        <div>
          {shown.length > 0 ? (
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((a, i) => (
                <motion.li
                  key={a.n}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    delay: Math.min(i * 0.07, 0.42),
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <ActivityCard activity={a} layout="stack" className="h-full" />
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl bg-cream p-8 text-center shadow-[0_6px_0_var(--color-sun-deep)]">
              <div className="font-display text-[28px] font-bold">
                {THE_101.emptyHeading}
              </div>
              <p className="mt-2 text-[18px] font-bold">{THE_101.emptyBody}</p>
              <Button
                variant="secondary"
                size="block"
                className="mt-4"
                onClick={() => setFilters({})}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* The band: the site shows a taste, the book has all 101. */}
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-7 rounded-xl bg-sun-deep p-6 md:px-8">
              <div className="min-w-[300px] flex-1">
                <div className="font-display text-[26px] leading-[1.1] font-bold md:text-[34px]">
                  {THE_101.bandHeading}
                </div>
                <p className="mt-1.5 text-[18px] font-bold md:text-[19px]">
                  {THE_101.bandBody}
                </p>
              </div>
              <ButtonLink
                href={BUY_URL}
                size="hero"
                {...(BUY_IS_EXTERNAL
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {BUY_LABEL}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
