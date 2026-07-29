"use client";

import { useState } from "react";
import { Button, ButtonLink, IconButton } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { Badge, TimeBadge, WhereBadge, MessBadge } from "@/components/primitives/Badge";
import { ActivityCard, EmptyCardSlot } from "@/components/primitives/ActivityCard";
import { Accordion } from "@/components/primitives/Accordion";
import { Modal } from "@/components/primitives/Modal";
import { Slider } from "@/components/primitives/Slider";
import { EmailForm } from "@/components/primitives/EmailForm";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { Icon } from "@/components/art/Icon";
import {
  ACTIVITIES,
  FILTER_GROUPS,
  activeFilterCount,
  filterActivities,
  filterKeyFor,
  type FilterState,
} from "@/lib/activities";
import { FAQ, THE_101 } from "@/content/unplug";

/* Deliverable B — the component library, every variant × state.
   Live where the mockups were live: filters, slider, accordion,
   email form, modal. */

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-cream p-7 shadow-[0_8px_0_var(--color-sun-deep)]">
      <div className="font-display text-[28px] font-bold">{title}</div>
      {note && <p className="mt-1 mb-4.5 text-[17px] font-semibold text-ink-muted">{note}</p>}
      <div className={note ? "" : "mt-4"}>{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b-2 border-dotted border-ink-navy/20 py-4 last:border-0">
      <div className="text-label w-32 shrink-0 text-ink-muted uppercase">{label}</div>
      <div className="flex flex-wrap items-center gap-3.5">{children}</div>
    </div>
  );
}

export function ComponentLibrary() {
  const [filters, setFilters] = useState<FilterState>({ "where:Indoor": true });
  const [hours, setHours] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);

  const shown = filterActivities(ACTIVITIES, filters);
  const count = activeFilterCount(filters);

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-4">
        <h2
          className="outlined outlined-on-yellow text-[44px] font-bold text-ink-navy"
          style={{ ["--outline-w" as string]: "8px" }}
        >
          Components
        </h2>
        <p className="m-0 text-[18px] font-bold text-ink-muted">
          Every state. Live where the mockups were live.
        </p>
      </div>

      {/* ── BUTTONS ───────────────────────────────────────── */}
      <Section
        title="Buttons"
        note="Pill radius always. Primary carries a pop fill with a hard shadow in the pressed shade; secondary is cream with a 3px navy border. Hover lifts, press squashes to 1px."
      >
        <Row label="Primary">
          <Button size="hero">Get the Book</Button>
          <Button size="block">Send the checklist</Button>
          <Button size="inline">Deal another</Button>
          <Button size="compact">Buy</Button>
        </Row>
        <Row label="Primary pops">
          {(["red", "blue", "teal", "magenta", "orange"] as const).map((pop) => (
            <Button key={pop} pop={pop} size="inline">
              {pop}
            </Button>
          ))}
        </Row>
        <Row label="Secondary">
          <Button variant="secondary" size="hero">
            Peek Inside
          </Button>
          <Button variant="secondary" size="block">
            Print the paper version
          </Button>
          <Button variant="secondary" size="inline">
            Share
          </Button>
        </Row>
        <Row label="Ghost & icon">
          <Button variant="ghost" size="inline">
            clear
          </Button>
          <IconButton label="Previous spread">‹</IconButton>
          <IconButton label="Next spread">›</IconButton>
          <IconButton label="Close menu">✕</IconButton>
          <IconButton label="Menu">
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[3px] w-5 rounded-[2px] bg-ink-navy" />
              <span className="block h-[3px] w-5 rounded-[2px] bg-ink-navy" />
              <span className="block h-[3px] w-5 rounded-[2px] bg-ink-navy" />
            </span>
          </IconButton>
        </Row>
        <Row label="Disabled">
          <Button disabled size="block">
            Sending…
          </Button>
          <Button variant="secondary" disabled size="block">
            Unavailable
          </Button>
        </Row>
        <Row label="As link">
          <ButtonLink href="#buy" size="block">
            Buy the paperback
          </ButtonLink>
        </Row>
      </Section>

      {/* ── THE BOREDOM BUTTON ────────────────────────────── */}
      <Section
        title="The Boredom Button"
        note="230px on mobile, 340px on desktop. 8–10px cream border, 12–16px hard red-deep shadow. The one object allowed to be the brightest thing on the page."
      >
        <div className="flex flex-wrap items-end gap-8">
          {([230, 160] as const).map((size) => (
            <div key={size} className="text-center">
              <button
                type="button"
                className="pop-red cursor-pointer rounded-full border-cream bg-(--pop) shadow-[0_12px_0_var(--pop-deep),0_20px_30px_rgb(62_81_99_/_0.25)] transition-transform duration-(--duration-lift) ease-(--ease-bounce) active:translate-y-[9px] active:shadow-[0_3px_0_var(--pop-deep)] motion-reduce:transition-none motion-reduce:active:translate-y-0"
                style={{ width: size, height: size, borderWidth: size > 200 ? 8 : 6 }}
              >
                <span className="font-display block text-cream leading-none font-extrabold" style={{ fontSize: size * 0.217 }}>
                  I&apos;m
                </span>
                <span className="font-display block text-cream leading-none font-extrabold" style={{ fontSize: size * 0.217 }}>
                  bored!
                </span>
                <span className="mt-1.5 block text-cream font-black tracking-[0.1em] uppercase" style={{ fontSize: size * 0.087 }}>
                  press me
                </span>
              </button>
              <div className="mt-2 text-[16px] font-extrabold text-ink-muted">{size}px</div>
            </div>
          ))}
          <div>
            <div className="text-label mb-2 text-ink-muted uppercase">Dealing</div>
            <div className="flex h-[210px] w-[280px] items-center justify-center rounded-lg bg-cream shadow-[0_8px_0_var(--color-sun-deep)]">
              <span className="inline-block size-9.5 animate-[spin_0.8s_linear_infinite] rounded-full border-6 border-ink-navy/25 border-t-pop-red" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── FILTER BAR — LIVE ─────────────────────────────── */}
      <Section
        title="Live filter bar"
        note="Six groups, each coded to one pop. Selected takes the fill, a hard shadow in the pressed shade, a ✓ prefix and aria-pressed — state is never colour-only. Click to toggle."
      >
        <div className="flex flex-col gap-4.5">
          {FILTER_GROUPS.map((g) => (
            <div key={g.key}>
              <div className="text-label mb-2 text-ink-muted uppercase">{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.options.map((o) => {
                  const k = filterKeyFor(g.key, o);
                  return (
                    <Pill
                      key={k}
                      label={o}
                      pop={g.pop}
                      pressed={!!filters[k]}
                      onToggle={() =>
                        setFilters((s) => ({ ...s, [k]: !s[k] }))
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div className="text-[22px] font-black">
            {count === 0
              ? THE_101.allShown
              : `Showing ${shown.length} of ${ACTIVITIES.length} · ${count} filter${count > 1 ? "s" : ""} on`}{" "}
            {count > 0 && (
              <button
                type="button"
                onClick={() => setFilters({})}
                className="cursor-pointer border-0 bg-transparent p-0 text-[22px] font-black text-ink-navy underline decoration-3 underline-offset-4 hover:text-link-hover"
              >
                clear
              </button>
            )}
          </div>
        </div>
      </Section>

      {/* ── BADGES ────────────────────────────────────────── */}
      <Section
        title="Badge set"
        note="16px sits below the 20px floor for type on a solid pop, so every badge uses the pop's pale tint with ink navy on top. Radius 8 — a badge isn't pressable."
      >
        <Row label="Semantic">
          <TimeBadge time="30 min" />
          <WhereBadge where="Indoor" />
          <WhereBadge where="Outdoor" />
          <MessBadge mess={2} />
        </Row>
        <Row label="All tints">
          {(["red", "blue", "teal", "magenta", "orange"] as const).map((pop) => (
            <Badge key={pop} pop={pop}>
              {pop} tint
            </Badge>
          ))}
        </Row>
        <Row label="Numerals">
          {(
            [
              ["07", "blue"],
              ["58", "magenta"],
              ["91", "orange"],
            ] as const
          ).map(([n, pop]) => (
            <OutlineNumeral key={n} value={n} size={48} pop={pop} on="cream" />
          ))}
        </Row>
        <Row label="Icons">
          {(["indoor", "outdoor", "time", "messy", "group", "free"] as const).map((n) => (
            <Icon key={n} name={n} size={30} />
          ))}
        </Row>
      </Section>

      {/* ── CARDS ─────────────────────────────────────────── */}
      <Section
        title="Card states"
        note="Cream surface, radius 24, hard sun-deep offset. Hover lifts 4px with a 1.5° tilt; the outlined numeral is decorative, so the card carries one accessible label with the number spelled out."
      >
        <div className="flex flex-wrap items-start gap-5">
          <ActivityCard activity={ACTIVITIES[0]} layout="stack" className="w-[280px]" />
          <ActivityCard activity={ACTIVITIES[3]} layout="row" className="w-[340px]" />
          <EmptyCardSlot className="h-[210px] w-[280px]">
            Dealt card lands here
          </EmptyCardSlot>
        </div>
        <div className="mt-6 rounded-lg bg-sun-deep p-6 text-center">
          <div className="font-display text-[28px] font-bold">{THE_101.emptyHeading}</div>
          <p className="mt-1.5 text-[17px] font-bold">{THE_101.emptyBody}</p>
          <Button variant="secondary" size="inline" className="mt-3">
            Clear filters
          </Button>
        </div>
      </Section>

      {/* ── SLIDER — LIVE ─────────────────────────────────── */}
      <Section title="Screen-time slider" note="Live — drag it. A real range input: 44px tall, accent-color pop blue, 0–6 in half-hour steps.">
        <div className="max-w-[520px]">
          <div
            className="outlined text-[44px] font-extrabold text-pop-blue"
            style={{ ["--outline-w" as string]: "8px" }}
          >
            {hours % 1 ? hours.toFixed(1) : hours} hr
          </div>
          <Slider
            value={hours}
            onChange={setHours}
            label="Screen hours today"
            minLabel="0"
            maxLabel="6+"
            valueText={`${hours} hours`}
          />
        </div>
      </Section>

      {/* ── EMAIL — LIVE ──────────────────────────────────── */}
      <Section title="Email capture" note="Live — try an empty field, a malformed address, then a real one. The status line is aria-live.">
        <div className="max-w-[420px]">
          <EmailForm />
        </div>
      </Section>

      {/* ── ACCORDION — LIVE ──────────────────────────────── */}
      <Section title="Accordion" note="56px rows, navy chevron rotates, open panel gets a yellow fill so the boundary is obvious without a hairline border. Live — click a row.">
        <Accordion rows={FAQ.rows} />
      </Section>

      {/* ── MODAL — LIVE ──────────────────────────────────── */}
      <Section title="Modal" note="Focus trap, Esc to close, scroll lock, focus returned to the trigger. Live — open it and try Tab and Esc.">
        <Button size="block" onClick={() => setModalOpen(true)}>
          Open the modal
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Activity 07">
          <div className="flex items-start gap-4">
            <OutlineNumeral value="07" size={54} pop="blue" on="cream" />
            <div>
              <h2 className="font-display text-[34px] leading-[1.05] font-bold">
                Activity 07
              </h2>
              <p className="mt-1 text-[19px] font-black">
                Blanket fort, engineering rules
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <TimeBadge time="30 min" />
            <WhereBadge where="Indoor" />
            <MessBadge mess={2} />
          </div>
          <p className="mt-4 text-body">
            One rule: it has to stand up on its own for a count of ten. That&apos;s the
            whole game, and it&apos;s the reason it lasts past the first five minutes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="block" onClick={() => setModalOpen(false)}>
              Got it
            </Button>
            <Button variant="secondary" size="block" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      </Section>
    </>
  );
}
