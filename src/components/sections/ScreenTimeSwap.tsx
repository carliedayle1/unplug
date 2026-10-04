"use client";

import { useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { useSnapshot } from "./ActivitySnapshot";
import { Slider } from "@/components/primitives/Slider";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { SWAP } from "@/content/unplug";
import { TEN_TO_START, activitiesFor } from "@/lib/activities";

/* 04 · Screen-Time Swap — live slider.
   ─────────────────────────────────────────────────────────────
   The section where it would be easiest to betray the brief, so the
   copy is exactly as drawn.

   No statistics. No "recommended limit". No red numbers. The output is
   always a list of things to do, never a verdict on the parent — the
   number that grows is *adventures*, not hours wasted.

   The chips are real activities from the book (the same ten as the free
   checklist), and each one opens its snapshot. They're buttons, so they
   keep the pill shape; the old chips were pill-shaped and did nothing,
   which broke the rule that a pill means pressable. */

const CHIPS = activitiesFor(TEN_TO_START);

export function ScreenTimeSwap() {
  const open = useSnapshot();
  const [hours, setHours] = useState(2);

  const swaps = Math.max(1, Math.round(hours * 3));
  const chips = CHIPS.slice(0, Math.min(CHIPS.length, swaps));
  const overflow = swaps > CHIPS.length ? swaps - CHIPS.length : 0;
  const hoursLabel = hours % 1 ? hours.toFixed(1) : String(hours);

  return (
    <Section id="swap" labelledBy="swap-heading">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <Reveal>
          <SectionHeading id="swap-heading">{SWAP.heading}</SectionHeading>
          <p className="mt-3 max-w-[62ch] text-[18px] font-bold md:text-[21px]">
            {SWAP.intro}
          </p>
          <p className="mt-4 text-[17px] font-bold text-ink-muted md:text-[18px]">
            {SWAP.outro}
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-lg bg-cream p-5 md:p-8">
            <OutlineNumeral
              value={`${hoursLabel} hr`}
              size={56}
              pop="blue"
              on="cream"
              className="mb-1"
            />
            <Slider
              value={hours}
              onChange={setHours}
              label={SWAP.sliderLabel}
              minLabel="0"
              maxLabel="6+"
              valueText={`${hoursLabel} hours`}
            />
          </div>

          <div className="mt-3.5 flex items-center gap-4 rounded-lg bg-sun-deep p-5">
            <OutlineNumeral
              value={String(swaps)}
              size={56}
              pop="teal"
              on="deep"
              className="shrink-0"
            />
            {/* The numeral is decorative, so the value is spelled out here. */}
            <p role="status" aria-live="polite" className="m-0 text-[20px] leading-[1.3] font-extrabold">
              {swaps} {swaps === 1 ? SWAP.one : SWAP.many}
            </p>
          </div>

          <ul className="m-0 mt-3.5 flex list-none flex-wrap gap-2.5 p-0">
            {chips.map((a) => (
              <li key={a.n}>
                <button
                  type="button"
                  disabled={!open}
                  onClick={() => open?.(a.n)}
                  aria-label={`Peek inside: ${a.name}`}
                  className="min-h-11 cursor-pointer rounded-full border-0 bg-cream px-4 py-2 text-[18px] font-extrabold whitespace-nowrap text-ink-navy transition-[transform,background-color] duration-(--duration-lift) ease-(--ease-bounce) hover:bg-sun-deep active:translate-y-[3px] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:translate-y-0"
                >
                  {a.name}
                </button>
              </li>
            ))}
            {overflow > 0 && (
              <li className="inline-flex min-h-11 items-center rounded-lg bg-cream px-4 py-2 text-[18px] font-extrabold whitespace-nowrap">
                +{overflow} more in the book
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
