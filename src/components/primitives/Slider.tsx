"use client";

import { useId } from "react";

/* The screen-time slider.
   ─────────────────────────────────────────────────────────────
   A real <input type="range">, because nothing hand-rolled matches it
   for keyboard, touch and screen-reader support. 44px tall so the
   touch target clears the floor; accent-color carries pop blue.

   The value is echoed in a big outlined numeral beside it, so the
   slider itself doesn't have to render the number. */

export function Slider({
  value,
  onChange,
  min = 0,
  max = 6,
  step = 0.5,
  label,
  minLabel,
  maxLabel,
  valueText,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  minLabel: string;
  maxLabel: string;
  /** Spoken instead of the raw number, e.g. "2 hours". */
  valueText: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[19px] font-black">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-3.5 h-11 w-full cursor-pointer accent-pop-blue"
      />
      <div className="flex justify-between text-[16px] font-extrabold text-ink-muted">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
