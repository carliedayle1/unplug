"use client";

import { useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { Slider } from "@/components/primitives/Slider";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { SWAP } from "@/content/unplug";

/* 04 · Screen-Time Swap — live slider.
   ─────────────────────────────────────────────────────────────
   The section where it would be easiest to betray the brief, so the
   copy is exactly as drawn.

   No statistics. No "recommended limit". No red numbers. The output is
   always a list of things to do, never a verdict on the parent — the
   number that grows is *adventures*, not hours wasted. */

export function ScreenTimeSwap() {
  const [hours, setHours] = useState(2);

  const swaps = Math.max(1, Math.round(hours * 3));
  const chips = SWAP.chips.slice(0, Math.min(SWAP.chips.length, swaps));
  const overflow = swaps > SWAP.chips.length ? swaps - SWAP.chips.length : 0;
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
            {chips.map((c) => (
              <li
                key={c}
                className="rounded-full bg-cream px-3.5 py-2 text-[17px] font-extrabold whitespace-nowrap"
              >
                {c}
              </li>
            ))}
            {overflow > 0 && (
              <li className="rounded-full bg-cream px-3.5 py-2 text-[17px] font-extrabold whitespace-nowrap">
                +{overflow} more
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
