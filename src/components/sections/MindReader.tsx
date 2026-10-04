"use client";

import { useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { useSnapshot } from "./ActivitySnapshot";
import { Button, ButtonLink } from "@/components/primitives/Button";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { MIND_READER } from "@/content/unplug";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";

/* Mind Reading — the trick on page 82, done by the site.
   ─────────────────────────────────────────────────────────────
   Think of a number, follow four steps, type your total, and the site
   says what you started with. It's the book's own trick (#44), so it's
   the cleanest possible "try before you buy": the reader gets the thrill
   of it working, and the book is where they find out why.

   The copy only ever says what to DO. Nothing here explains how it
   works — that's page 82's job, and the reveal points straight at it.

   No confetti: that's reserved for the sticker chart and the Boredom
   Button. */

type Stage = "start" | "steps" | "reveal";

/** The four steps are 3n+1, times 3, plus n — which is always 10n+3.
    Anything else isn't a total this trick could have produced. */
function numberFromTotal(raw: string): number | null {
  const total = Number(raw.trim());
  if (!Number.isInteger(total) || total < 13 || total > 93 || total % 10 !== 3) {
    return null;
  }
  return (total - 3) / 10;
}

export function MindReader() {
  const open = useSnapshot();
  const [stage, setStage] = useState<Stage>("start");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = numberFromTotal(value);
    if (n === null) {
      setError(true);
      return;
    }
    setError(false);
    setAnswer(n);
    setStage("reveal");
  }

  function reset() {
    setStage("start");
    setValue("");
    setError(false);
    setAnswer(null);
  }

  return (
    <Section id="mind-reader" labelledBy="mind-reader-heading">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <Reveal>
          <SectionHeading id="mind-reader-heading">{MIND_READER.heading}</SectionHeading>
          <p className="mt-3 max-w-[56ch] text-[18px] font-bold md:text-[21px]">
            {MIND_READER.intro}
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-lg bg-cream p-5 md:p-8">
            {stage === "start" && (
              <div>
                <p className="m-0 text-[21px] leading-[1.35] font-black">
                  {MIND_READER.pick}
                </p>
                <Button size="block" className="mt-5" onClick={() => setStage("steps")}>
                  Got one
                </Button>
              </div>
            )}

            {stage === "steps" && (
              <form onSubmit={submit} noValidate>
                <p className="m-0 text-[19px] font-bold">{MIND_READER.stepsIntro}</p>
                <ol className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
                  {MIND_READER.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3.5">
                      <OutlineNumeral
                        value={String(i + 1)}
                        size={44}
                        pop={(["red", "blue", "magenta", "orange"] as const)[i]}
                        on="cream"
                        className="shrink-0"
                      />
                      <span className="text-[20px] leading-[1.3] font-extrabold">{step}</span>
                    </li>
                  ))}
                </ol>

                <label htmlFor="mind-total" className="mt-6 block text-[20px] font-black">
                  {MIND_READER.totalLabel}
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  <input
                    id="mind-total"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={3}
                    value={value}
                    aria-invalid={error}
                    aria-describedby={error ? "mind-error" : undefined}
                    onChange={(e) => {
                      setValue(e.target.value.replace(/\D/g, ""));
                      setError(false);
                    }}
                    className="h-14 w-32 rounded-md border-3 border-ink-navy bg-cream px-4 text-[24px] font-black text-ink-navy"
                  />
                  <Button type="submit" size="block">
                    {MIND_READER.submit}
                  </Button>
                </div>
                <p
                  id="mind-error"
                  role="alert"
                  className="mt-3 min-h-[1.5em] text-[18px] font-extrabold text-ink-navy"
                >
                  {error ? MIND_READER.wrong : ""}
                </p>
              </form>
            )}

            {stage === "reveal" && answer !== null && (
              <div className="text-center">
                <OutlineNumeral
                  value={String(answer)}
                  size={140}
                  pop="red"
                  on="cream"
                  className="mx-auto"
                />
                {/* The numeral is a graphic, so the answer is spelled out. */}
                <p role="status" className="m-0 mt-3 text-[26px] font-black">
                  {MIND_READER.reveal(answer)}
                </p>
                <p className="m-0 mt-2 text-[19px] font-bold">{MIND_READER.how}</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                  <Button
                    size="inline"
                    disabled={!open}
                    onClick={() => open?.("44")}
                  >
                    {MIND_READER.peek}
                  </Button>
                  <ButtonLink
                    href={BUY_URL}
                    variant="secondary"
                    size="inline"
                    {...(BUY_IS_EXTERNAL
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {BUY_LABEL}
                  </ButtonLink>
                  <Button variant="secondary" size="inline" onClick={reset}>
                    {MIND_READER.again}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
