"use client";

import { useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { Button } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { printOnly } from "@/lib/printOnly";
import { PLANNER } from "@/content/unplug";

/* Dream it, then scale it — the book's own worksheet (pp. 22–24).
   ─────────────────────────────────────────────────────────────
   The book's exercise for finding something to do instead: list every
   fun thing you've ever wanted to try, tick which are realistic against
   six questions, circle the three with the most ticks. It's reproduced
   here as a tool rather than a page, so it's saved on the device and
   printable, and the circling is done for you.

   Up to eight ideas. Ties go to whichever was added first. An idea with
   no ticks is never circled — "top three" of nothing is nothing.

   From tablet width up it's the book's own table: ideas down the side,
   the six questions across the top. On a phone six columns don't fit, so
   each idea becomes a card of pill toggles instead. */

type Idea = { id: string; name: string; checks: boolean[] };

const MAX_IDEAS = 8;
const EMPTY: Idea[] = [];
const blank = () => Array<boolean>(PLANNER.columns.length).fill(false);

const score = (i: Idea) => i.checks.filter(Boolean).length;

/** Ids of the three best ideas, best first; ties keep their order. */
function topThree(ideas: Idea[]): string[] {
  return ideas
    .map((idea, order) => ({ idea, order, s: score(idea) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.order - b.order)
    .slice(0, 3)
    .map((x) => x.idea.id);
}

/** A hand-drawn red ring, stretched to whatever it's marking.

    It's a wobbly rounded rectangle, not an ellipse, on purpose: an
    ellipse stretched over a rectangular card cuts straight through its
    corners — across the title and the remove button. This hugs the edge
    instead, a few pixels outside it, and never crosses content. */
function PenCircle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-2 size-[calc(100%+16px)] text-pop-red"
    >
      <path
        d="M22 7 C95 2 208 11 279 5 C293 6 298 15 296 30 C299 60 293 90 297 104 C293 115 278 113 262 114 C190 119 98 111 24 115 C9 113 4 105 5 92 C2 61 8 37 3 19 C5 10 12 8 22 7 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function DreamPlanner() {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>("unplug:planner", EMPTY);
  const [draft, setDraft] = useState("");

  const top = topThree(ideas);
  const full = ideas.length >= MAX_IDEAS;

  function add(e: React.FormEvent) {
    e.preventDefault();
    const name = draft.trim();
    if (!name || full) return;
    setIdeas((prev) => [
      ...prev,
      { id: `${Date.now().toString(36)}${prev.length}`, name, checks: blank() },
    ]);
    setDraft("");
  }

  const toggle = (id: string, col: number) =>
    setIdeas((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, checks: i.checks.map((c, k) => (k === col ? !c : c)) } : i,
      ),
    );

  const remove = (id: string) => setIdeas((prev) => prev.filter((i) => i.id !== id));

  const topNames = top
    .map((id) => ideas.find((i) => i.id === id)?.name)
    .filter((n): n is string => !!n);

  return (
    <Section id="dream-planner" field="cream" labelledBy="planner-heading">
      <div data-printable="planner">
        <Reveal>
          <SectionHeading id="planner-heading" on="cream">
            {PLANNER.heading}
          </SectionHeading>
          <p className="mt-3 max-w-[66ch] text-[18px] font-bold md:text-[21px]">
            {PLANNER.intro}
          </p>
          <p className="mt-2 max-w-[66ch] text-[18px] font-bold text-ink-muted">
            {PLANNER.hint}
          </p>
        </Reveal>

        <Reveal>
          <form
            onSubmit={add}
            className="mt-6 flex max-w-[640px] flex-wrap items-end gap-3 print:hidden"
          >
            <div className="min-w-[240px] flex-1">
              <label htmlFor="planner-idea" className="block text-[18px] font-black">
                {PLANNER.addLabel}
              </label>
              <input
                id="planner-idea"
                type="text"
                maxLength={60}
                value={draft}
                disabled={full}
                placeholder={PLANNER.placeholder}
                autoComplete="off"
                onChange={(e) => setDraft(e.target.value)}
                className="mt-1.5 h-14 w-full rounded-md border-3 border-ink-navy bg-cream px-4 text-[20px] font-bold text-ink-navy placeholder:text-ink-muted"
              />
            </div>
            <Button type="submit" size="block" disabled={full || draft.trim() === ""}>
              {PLANNER.add}
            </Button>
            {full && (
              <p className="m-0 w-full text-[17px] font-bold text-ink-muted">{PLANNER.full}</p>
            )}
          </form>
        </Reveal>

        {/* Announced when the top three change. */}
        <p
          role="status"
          aria-live="polite"
          className="m-0 mt-6 rounded-md bg-sun-deep p-4 text-[19px] font-black"
        >
          {topNames.length > 0 ? (
            <>
              {PLANNER.top}: {topNames.map((n, i) => `${i + 1}. ${n}`).join("  ")}
            </>
          ) : ideas.length === 0 ? (
            PLANNER.empty
          ) : (
            PLANNER.topNone
          )}
        </p>

        {ideas.length > 0 && (
          <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-6 p-0 md:hidden">
            {ideas.map((idea) => {
              const rank = top.indexOf(idea.id);
              return (
                <li key={idea.id} className="relative">
                  <div className="dot-grid relative rounded-lg bg-sun-yellow p-4 md:p-5">
                    {rank >= 0 && <PenCircle />}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="m-0 text-[22px] leading-[1.2] font-black text-ink-navy">
                        {rank >= 0 && (
                          <span className="mr-2 inline-block rounded-sm bg-cream px-2 py-0.5 text-[16px]">
                            #{rank + 1}
                          </span>
                        )}
                        {idea.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => remove(idea.id)}
                        aria-label={PLANNER.remove(idea.name)}
                        className="relative z-10 inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-3 border-ink-navy bg-cream text-[18px] font-black text-ink-navy hover:bg-sun-deep print:hidden"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {PLANNER.shortColumns.map((label, col) => (
                        <Pill
                          key={label}
                          label={label}
                          pop="teal"
                          pressed={!!idea.checks[col]}
                          onToggle={() => toggle(idea.id, col)}
                        />
                      ))}
                    </div>
                    {/* The full question each short label stands for. */}
                    <p className="sr-only">{PLANNER.columns.join(" ")}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* From tablet width up (and on paper), the book's own shape: a
            table with the ideas down the left and the six questions across
            the top. Phones get the cards above — six columns don't fit. */}
        {ideas.length > 0 && (
          <table className="mt-8 hidden w-full border-separate border-spacing-y-3 md:table">
            <thead>
              <tr>
                <th scope="col" className="text-label pb-1 text-left text-ink-muted uppercase">
                  Idea
                </th>
                {PLANNER.shortColumns.map((label, col) => (
                  <th
                    key={label}
                    scope="col"
                    className="text-label w-[92px] px-1 pb-1 text-center text-ink-muted uppercase"
                  >
                    <span aria-hidden>{label}</span>
                    <span className="sr-only">{PLANNER.columns[col]}</span>
                  </th>
                ))}
                <th scope="col" className="w-14">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => {
                const rank = top.indexOf(idea.id);
                return (
                  <tr key={idea.id}>
                    <th scope="row" className="rounded-l-lg bg-sun-yellow py-3 pr-3 pl-5 text-left">
                      <span className="relative inline-block px-2 py-1">
                        {rank >= 0 && <PenCircle />}
                        <span className="text-[21px] leading-[1.2] font-black text-ink-navy">
                          {rank >= 0 && (
                            <span className="mr-2 inline-block rounded-sm bg-cream px-2 py-0.5 text-[16px]">
                              #{rank + 1}
                            </span>
                          )}
                          {idea.name}
                        </span>
                      </span>
                    </th>
                    {PLANNER.columns.map((question, col) => {
                      const on = !!idea.checks[col];
                      return (
                        <td key={question} className="bg-sun-yellow px-1 py-3 text-center">
                          <button
                            type="button"
                            aria-pressed={on}
                            aria-label={`${question} ${idea.name}`}
                            onClick={() => toggle(idea.id, col)}
                            className={`pop-teal inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-3 border-ink-navy text-[20px] font-black ${on ? "bg-(--pop) text-(--on-pop)" : "bg-cream text-ink-navy hover:bg-sun-deep"}`}
                          >
                            <span aria-hidden>{on ? "✓" : ""}</span>
                          </button>
                        </td>
                      );
                    })}
                    <td className="rounded-r-lg bg-sun-yellow py-3 pr-4 text-right">
                      <button
                        type="button"
                        onClick={() => remove(idea.id)}
                        aria-label={PLANNER.remove(idea.name)}
                        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-3 border-ink-navy bg-cream text-[18px] font-black text-ink-navy hover:bg-sun-deep print:hidden"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {ideas.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <Button size="block" onClick={() => printOnly("planner")}>
              {PLANNER.print}
            </Button>
            <Button variant="secondary" size="block" onClick={() => setIdeas(EMPTY)}>
              {PLANNER.clear}
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
