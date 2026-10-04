import { IconDisc, ICON_DISC, type IconName } from "@/components/art/Icon";
import { PROP_KIT } from "@/components/art/props";
import { SplatMeter, type MessLevel } from "@/components/primitives/Badge";
import { OutlineNumeral, OneOhOne } from "@/components/primitives/OutlineNumeral";
import type { Pop } from "@/lib/activities";

/* Deliverable A — the style tile, rendered from real tokens. */

function Section({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline gap-4">
        <h2
          className="outlined outlined-on-yellow text-[44px] font-bold text-ink-navy"
          style={{ ["--outline-w" as string]: "8px" }}
        >
          {n} · {title}
        </h2>
        <p className="m-0 text-[18px] font-bold text-ink-muted">{note}</p>
      </div>
      {children}
    </section>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-cream p-7 shadow-[0_8px_0_var(--color-sun-deep)] ${className}`}
    >
      {children}
    </div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display mb-3.5 text-[28px] font-bold">{children}</div>
  );
}

const FIELD = [
  ["Sun Yellow", "#F9DE55", "--sun-yellow", "Default page field. The site is yellow; cards sit on top of it."],
  ["Sun Deep", "#F2CF43", "--sun-deep", "Ground shadows under cards, section bands, dot grid."],
  ["Ink Navy", "#3E5163", "--ink-navy", "All type, all icons, all outlines, focus rings. The anchor."],
  ["Cream", "#FFFBEF", "--cream", "The only neutral. Card surfaces + type outline. Never white."],
] as const;

const POPS: Array<[Pop, string, string, string, string]> = [
  ["red", "01", "Pop Red", "#E8342A", "Boredom Button, primary CTA"],
  ["blue", "02", "Pop Blue", "#2B7FD4", "Indoor activities, filter fills"],
  ["teal", "03", "Pop Teal", "#3FB68B", "Outdoor, success, checked stickers"],
  ["magenta", "04", "Pop Magenta", "#E5218A", "Messy-level, creative crafts"],
  ["orange", "05", "Pop Orange", "#F6A11F", "Time badges, quick wins"],
];

const TYPE_SCALE = [
  ["display-xl", "Baloo 2 800 · 104/96"],
  ["display-lg", "Baloo 2 700 · 56/56"],
  ["heading", "Nunito 900 · 32/38"],
  ["subhead", "Nunito 800 · 22/30"],
  ["body", "Nunito 600 · 18/28"],
  ["label", "Nunito 900 · 16 · .1em caps"],
  ["script", "Caveat 600 · 30+"],
] as const;

export function StyleTile() {
  return (
    <>
      {/* ── 01 COLOUR ─────────────────────────────────────── */}
      <Section
        n="01"
        title="Color"
        note="Yellow is the page, not an accent. One pop per element. Never blended."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FIELD.map(([name, hex, token, use]) => (
            <div
              key={hex}
              className="rounded-lg bg-cream p-4.5 shadow-[0_6px_0_var(--color-sun-deep)]"
            >
              <div
                className="h-24 rounded-md border-3 border-ink-navy"
                style={{ background: hex }}
              />
              <div className="font-display mt-3.5 text-[24px] font-bold">{name}</div>
              <div className="text-[16px] font-extrabold tracking-[0.06em] text-ink-muted">
                {hex} · {token}
              </div>
              <p className="mt-2.5 text-[16px] leading-[1.45] font-semibold">{use}</p>
            </div>
          ))}
        </div>

        <Panel>
          <PanelTitle>The five pops</PanelTitle>
          <p className="mt-0 mb-4.5 text-[17px] font-semibold text-ink-muted">
            Used one at a time to code a category, a card, a badge. Rotate them for
            rhythm — never gradient, never two in one shape.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {POPS.map(([pop, num, name, hex, use]) => (
              <div key={pop} className={`pop-${pop} flex flex-col gap-2.5`}>
                <div
                  className="flex h-30 items-end rounded-[20px] p-3.5"
                  style={{ background: "var(--pop)" }}
                >
                  <span
                    className="font-display text-[34px] leading-none font-extrabold"
                    style={{ color: "var(--on-pop)" }}
                  >
                    {num}
                  </span>
                </div>
                <div>
                  <div className="text-[18px] font-black">{name}</div>
                  <div className="text-[16px] font-extrabold text-ink-muted">{hex}</div>
                  <div className="mt-1 text-[16px] font-semibold">{use}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Contrast rules */}
        <div className="rounded-xl bg-ink-navy p-7 text-cream">
          <div className="font-display mb-4 text-[28px] font-bold text-sun-yellow">
            Contrast rules — non-negotiable
          </div>
          <div className="grid gap-4.5 lg:grid-cols-3">
            <div className="rounded-[18px] bg-sun-yellow p-4.5 text-ink-navy">
              <div className="text-[20px] font-black">Ink navy on sun yellow</div>
              <p className="mt-1.5 mb-2.5 text-[17px] font-semibold">
                The workhorse pair. Body, headings, nav, everything.
              </p>
              <span className="inline-block rounded-full bg-ink-navy px-3.5 py-1.5 text-[20px] font-black text-sun-yellow">
                6.09:1 · AA
              </span>
            </div>
            <div className="rounded-[18px] bg-cream p-4.5 text-ink-navy">
              <div className="text-[20px] font-black">Ink navy on cream</div>
              <p className="mt-1.5 mb-2.5 text-[17px] font-semibold">
                Card interiors and long-form reading (About, testimonials).
              </p>
              <span className="inline-block rounded-full bg-ink-navy px-3.5 py-1.5 text-[20px] font-black text-cream">
                7.92:1 · AAA
              </span>
            </div>
            <div className="rounded-[18px] bg-sun-yellow p-4.5 text-ink-navy">
              <div className="text-[20px] font-black text-cream">
                Cream on yellow — banned
              </div>
              <p className="mt-1.5 mb-2.5 text-[17px] font-semibold">
                1.2:1. Also banned: pop-orange or pop-yellow text on the field, and
                any pop color under 18px on yellow.
              </p>
              <span className="inline-block rounded-full bg-pop-red px-3.5 py-1.5 text-[20px] font-black text-cream">
                ✕ Fails
              </span>
            </div>
          </div>
          <div className="mt-4.5 flex flex-wrap items-center gap-4.5 rounded-[18px] bg-cream p-4.5 text-ink-navy">
            <div className="size-16 shrink-0 rounded-md bg-ink-muted" />
            <div className="min-w-[300px] flex-1">
              <div className="text-[20px] font-black">
                Muted Navy · #4A5C6E · --ink-muted
              </div>
              <p className="mt-1.5 text-[17px] font-semibold text-ink-muted">
                Links are ink navy with a 3px underline — pop blue is only 3.1:1 on
                yellow and 3.3:1 on cream, so it never carries link text. Hover goes
                to magenta-deep #AD1868.
              </p>
              <p className="mt-1.5 text-[17px] font-semibold text-ink-muted">
                The only way to de-emphasise type. Never use opacity on text — it
                silently drops contrast. This hex clears 4.5:1 on both cream (6.5:1)
                and sun-yellow (4.9:1).
              </p>
            </div>
          </div>
          <p className="mt-4.5 rounded-[18px] bg-sun-yellow p-4.5 text-[17px] font-semibold text-ink-navy">
            <strong>Measured, not quoted.</strong> The v0.1 tile annotated these pairs
            as 8.1:1 and 9.2:1, both AAA. Recomputed against WCAG 2.x relative
            luminance they are <strong>6.09:1</strong> and <strong>7.92:1</strong> — so
            navy on cream clears AAA, but navy on{" "}
            <strong>yellow is AA, not AAA</strong>, for body-size text. Both pass AA
            comfortably and nothing needs redesigning; the numbers on the tile were
            simply optimistic. Treat AA as the guarantee on the yellow field, and put
            long-form reading (About, testimonials) on cream — which the design
            already does.
          </p>
          <p className="mt-4.5 text-[17px] font-semibold text-cream">
            Pop colors carry <em>fills</em>, not small text. Type on a solid pop is
            allowed only at large sizes (20px+ / 900, where the bar is 3:1): cream on
            red, blue or magenta; ink navy on teal or orange. Below 20px, type moves
            to a pale tint of the pop —{" "}
            {["#D6E8F9", "#D5F0E5", "#FBD4E7", "#FDE8C7"].map((t) => (
              <span
                key={t}
                className="mr-1 inline-block rounded-md px-2 py-0.5 font-extrabold text-ink-navy"
                style={{ background: t }}
              >
                {t}
              </span>
            ))}
            — which is what every badge uses.
          </p>
        </div>
      </Section>

      {/* ── 02 TYPE ───────────────────────────────────────── */}
      <Section
        n="02"
        title="Type"
        note="Three families, strict jobs. Product body never below 18px."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel>
            <div className="text-label text-ink-muted uppercase">
              Display — Baloo 2 · 700/800
            </div>
            <div
              className="outlined mt-3 text-[72px] leading-none font-extrabold text-pop-magenta"
              style={{ ["--outline-w" as string]: "10px" }}
            >
              Go outside!
            </div>
            <p className="mt-4 text-[17px] font-semibold">
              h1 / h2 and giant numerals only. Always with the cream outline + soft
              navy offset shadow, tracking tightened to −0.02em. Optional ±2° tilt on
              hero words; never on body headings.
            </p>
          </Panel>
          <Panel>
            <div className="text-label text-ink-muted uppercase">
              UI / Body — Nunito · 600–900
            </div>
            <div className="mt-3 text-[34px] leading-[1.2] font-black">
              Pick one. Hand it over. Go.
            </div>
            <p className="mt-3 text-body">
              Nunito carries every word a parent actually reads. Generous x-height,
              bold by default, 18px floor — legible one-handed, in the dark, with a
              kid on your lap.
            </p>
            <p className="mt-4 text-[17px] font-semibold text-ink-muted">
              All nav, buttons, labels, badges and body copy. 18px floor, 1.55
              line-height, max 68ch measure.
            </p>
          </Panel>
        </div>

        <Panel className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-[520px]">
            <div className="text-label text-ink-muted uppercase">Accent — Caveat · 600</div>
            <div className="font-script mt-2 text-[56px] leading-[1.05] font-bold">
              Wanda Kanten Hartfield
            </div>
            <p className="mt-3 text-[17px] font-semibold">
              Author&apos;s name, pull quotes, hand-drawn labels and arrows. Never body
              copy, never navigation, never a button label. Minimum 28px — it gets
              illegible small.
            </p>
          </div>
          <div className="font-script -rotate-4 rounded-[20px] border-3 border-ink-navy bg-sun-yellow px-5.5 py-3.5 text-[30px] font-semibold">
            “my two actually asked for it again” ↘
          </div>
        </Panel>

        <Panel>
          <PanelTitle>Type scale</PanelTitle>
          <div className="flex flex-col">
            {TYPE_SCALE.map(([token, spec]) => (
              <div
                key={token}
                className="grid items-baseline gap-5 border-b-2 border-dotted border-ink-navy/20 py-3.5 md:grid-cols-[140px_200px_1fr]"
              >
                <div className="text-label text-ink-muted uppercase">{token}</div>
                <div className="text-[16px] font-bold text-ink-muted">{spec}</div>
                <div>
                  {token === "display-xl" && (
                    <span
                      className="outlined text-[52px] leading-none font-extrabold text-pop-red"
                      style={{ ["--outline-w" as string]: "9px" }}
                    >
                      Unplug!
                    </span>
                  )}
                  {token === "display-lg" && (
                    <span
                      className="outlined text-[38px] leading-[1.05] font-bold text-ink-navy"
                      style={{ ["--outline-w" as string]: "7px" }}
                    >
                      The 101
                    </span>
                  )}
                  {token === "heading" && (
                    <span className="text-[30px] leading-[1.2] font-black">
                      Pick a mess level
                    </span>
                  )}
                  {token === "subhead" && (
                    <span className="text-subhead">Indoor · 20 min · 2 splats</span>
                  )}
                  {token === "body" && (
                    <span className="text-body">
                      Every activity fits in a normal Tuesday. Most need nothing you
                      don’t already own.
                    </span>
                  )}
                  {token === "label" && (
                    <span className="text-label uppercase">Age 4–6</span>
                  )}
                  {token === "script" && (
                    <span className="font-script text-[30px] font-semibold">
                      hand-drawn note
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Numerals */}
        <div className="flex flex-wrap items-center justify-between gap-10 rounded-xl bg-sun-deep p-8">
          <OneOhOne size={180} on="deep" />
          <div className="max-w-[600px]">
            <div className="font-display text-[32px] font-bold">
              Numerals are a hero element
            </div>
            <p className="mt-2.5 text-body">
              “101” and every activity number are set in Baloo 2 800 with the cream
              outline. Multicolored only for the marquee “101” — activity numbers take
              a single pop, rotating by category so the grid reads as a rainbow at a
              glance.
            </p>
            <p className="mt-3 rounded-md bg-cream p-3.5 text-[18px] leading-[1.5] font-bold">
              Carve-out: outlined display numerals are <em>graphics</em>, not text. Any
              pop is allowed — including teal and orange — because the 10–16px cream
              outline, not the fill, does the separating. They must always carry the
              outline, never sit below 40px, and never be the only place a value
              appears.
            </p>
            <div className="mt-4.5 flex flex-wrap gap-3.5">
              {(
                [
                  ["07", "red"],
                  ["23", "blue"],
                  ["58", "teal"],
                  ["91", "magenta"],
                  ["101", "orange"],
                ] as Array<[string, Pop]>
              ).map(([n, pop]) => (
                <OutlineNumeral key={n} value={n} size={44} pop={pop} on="deep" />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 03 SPACE / RADIUS / DEPTH ─────────────────────── */}
      <Section
        n="03"
        title="Space, radius, depth"
        note="4px base. One radius scale. Depth is a hard offset, never a blur-only glow."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Panel>
            <PanelTitle>Spacing · 4px base</PanelTitle>
            <div className="flex flex-col gap-3">
              {[2, 4, 8, 12, 16, 24, 32, 48, 64].map((px, i) => (
                <div key={px} className="grid grid-cols-[70px_70px_1fr] items-center gap-3.5">
                  <div className="text-[16px] font-black">sp-{px}</div>
                  <div className="text-[16px] font-bold text-ink-muted">{px}px</div>
                  <div
                    className="h-4 rounded-[4px]"
                    style={{ width: px, background: i % 2 ? "#2B7FD4" : "#E5218A" }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4.5 text-[17px] font-semibold text-ink-muted">
              Card padding 24px mobile / 32px desktop. Section rhythm 72px mobile /
              120px desktop. Grid gutter 20px.
            </p>
          </Panel>

          <div className="flex flex-col gap-5">
            <Panel>
              <PanelTitle>Radius</PanelTitle>
              <div className="flex flex-wrap items-end gap-4">
                {(
                  [
                    ["8 · sm", "badges", 8, "#2B7FD4", 74],
                    ["16 · md", "inputs, tiles", 16, "#3FB68B", 74],
                    ["24 · lg", "cards", 24, "#E5218A", 74],
                    ["28 · xl", "panels, modal", 28, "#F6A11F", 74],
                    ["full · pill", "buttons, filters", 999, "#E8342A", 110],
                  ] as const
                ).map(([label, use, r, bg, w]) => (
                  <div key={label} className="text-center">
                    <div
                      className="h-[74px]"
                      style={{ width: w, background: bg, borderRadius: r }}
                    />
                    <div className="mt-2 text-[16px] font-extrabold">
                      {label}
                      <br />
                      <span className="font-semibold text-ink-muted">{use}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[17px] font-semibold text-ink-muted">
                Pill is reserved for things you press. If it isn’t pressable it gets
                16/24/28 — that’s the whole rule.
              </p>
            </Panel>

            <Panel>
              <PanelTitle>Depth</PanelTitle>
              <div className="flex flex-wrap gap-4.5">
                <div className="rounded-[20px] bg-sun-yellow px-5 py-4.5 text-[17px] font-extrabold shadow-[0_4px_0_var(--color-sun-deep)]">
                  rest
                  <br />
                  <span className="text-[16px] font-semibold text-ink-muted">
                    0 4px 0 sun-deep
                  </span>
                </div>
                <div className="-translate-y-1 -rotate-[1.5deg] rounded-[20px] bg-sun-yellow px-5 py-4.5 text-[17px] font-extrabold shadow-[0_10px_0_var(--color-sun-deep),0_16px_26px_rgb(62_81_99_/_0.22)]">
                  hover
                  <br />
                  <span className="text-[16px] font-semibold text-ink-muted">
                    lift 4px + tilt 1.5°
                  </span>
                </div>
                <div className="translate-y-[3px] scale-[0.98] rounded-[20px] bg-sun-yellow px-5 py-4.5 text-[17px] font-extrabold shadow-[0_1px_0_var(--color-sun-deep)]">
                  pressed
                  <br />
                  <span className="text-[16px] font-semibold text-ink-muted">
                    squash to 0 1px
                  </span>
                </div>
                <div className="rounded-[20px] bg-sun-yellow px-5 py-4.5 text-[17px] font-extrabold shadow-[0_4px_0_var(--color-sun-deep)] outline-3 outline-offset-3 outline-ink-navy">
                  focus-visible
                  <br />
                  <span className="text-[16px] font-semibold text-ink-muted">
                    navy 3px, 3px offset
                  </span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      {/* ── 04 ICONS ──────────────────────────────────────── */}
      <Section
        n="04"
        title="Icons & illustration"
        note="Flat, rounded, no outlines on figures. Icons are navy strokes on a pop disc."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel>
            <PanelTitle>Icon set</PanelTitle>
            <p className="mt-0 mb-4.5 text-[17px] font-semibold text-ink-muted">
              3px navy strokes, round caps and joins, 24px grid, drawn inside a 56px
              pop disc. Geometric and friendly — no line-icon library look.
            </p>
            <div className="flex flex-wrap gap-4">
              {(Object.keys(ICON_DISC) as IconName[]).map((name) => (
                <div key={name} className="flex w-19 flex-col items-center gap-1.5">
                  <IconDisc name={name} />
                  <div className="text-[16px] leading-[1.15] font-extrabold capitalize">
                    {name}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5.5 flex flex-wrap items-center gap-3">
              <span className="text-label text-ink-muted uppercase">Mess level</span>
              {([1, 2, 3] as MessLevel[]).map((l) => (
                <SplatMeter key={l} level={l} />
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle>Illustration</PanelTitle>
            <p className="mt-0 mb-4 text-[17px] font-semibold text-ink-muted">
              Figures come from the cover artist — same cast, same treatment: flat
              vector fills, no outlines, rounded limbs, dot eyes, simple smile, one
              soft ellipse shadow each, visibly diverse skin tones and hair types.
              Props and objects are ours. No photography, no 3D, no gradient blobs.
            </p>
            <div className="grid grid-cols-2 gap-3.5">
              {PROP_KIT.slice(0, 2).map(({ key, label, Component }) => (
                <div
                  key={key}
                  className="flex h-48 items-center justify-center rounded-[20px] bg-sun-yellow p-3.5"
                >
                  <Component className="h-full w-auto" title={`${label} prop`} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="text-label text-ink-muted uppercase">Skin tones</span>
              <div className="flex gap-2">
                {["#F7D2B0", "#E9B285", "#C98A5B", "#94603A", "#5E3A22"].map((c) => (
                  <div
                    key={c}
                    className="size-8.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-[16px] font-semibold text-ink-muted">
                Sampled from the cover cast; ground shadow is #F2CF43 at 70%.
              </span>
            </div>
          </Panel>
        </div>
      </Section>

      {/* ── 05 OBJECT LIBRARY ─────────────────────────────── */}
      <Section
        n="05"
        title="Object library"
        note="Props only. Kid figures are commissioned from the cover illustrator."
      >
        <Panel>
          <PanelTitle>Objects — the prop kit</PanelTitle>
          <p className="mt-0 mb-5 text-[17px] font-semibold text-ink-muted">
            Drawn on a 100×100 box, one pop color per object plus at most one
            supporting pop. These sit on activity cards, in the sticker chart, and
            scatter as confetti-scale decoration.
          </p>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {PROP_KIT.map(({ key, label, Component }) => (
              <figure
                key={key}
                className="m-0 rounded-[20px] bg-sun-yellow px-2.5 pt-3.5 pb-2.5"
              >
                <Component className="h-auto w-full" />
                <figcaption className="mt-1.5 text-center text-[16px] font-extrabold">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Panel>
      </Section>

      {/* ── 06 MOTION & VOICE ─────────────────────────────── */}
      <Section
        n="06"
        title="Motion & voice"
        note="Everything is pokeable. Nothing is preachy."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl bg-ink-navy p-7 text-cream">
            <div className="font-display mb-3.5 text-[28px] font-bold text-sun-yellow">
              Motion tokens
            </div>
            <div className="flex flex-col gap-3 text-[17px] font-semibold">
              <div>
                <strong className="text-[18px]">Press</strong> — 90ms,
                translateY(3px) scale(.97), shadow collapses to 1px.
              </div>
              <div>
                <strong className="text-[18px]">Hover lift</strong> — 180ms
                cubic-bezier(.34,1.56,.64,1), −4px + 1.5° tilt.
              </div>
              <div>
                <strong className="text-[18px]">Overshoot</strong> — entrances 420ms
                spring, settle with one small bounce.
              </div>
              <div>
                <strong className="text-[18px]">Stagger</strong> — 70ms between
                siblings (hero kids, card grid).
              </div>
              <div>
                <strong className="text-[18px]">Confetti</strong> — sticker-chart
                completion and Boredom Button only. 1.2s, then gone.
              </div>
              <div className="mt-1 rounded-md bg-sun-yellow p-3.5 font-bold text-ink-navy">
                prefers-reduced-motion: all transforms become instant state swaps; the
                plug is already unplugged, cards cross-fade, confetti is a single
                static burst graphic.
              </div>
            </div>
          </div>

          <Panel>
            <PanelTitle>Voice</PanelTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-4 shrink-0 rounded-full bg-pop-teal" />
                  <span className="text-[17px] font-black tracking-[0.08em] uppercase">
                    Say
                  </span>
                </div>
                <ul className="mt-2 list-disc pl-5 text-[17px] leading-[1.5] font-semibold">
                  <li>“Pick one. Hand it over.”</li>
                  <li>“Lots start with what’s in the kitchen drawer.”</li>
                  <li>“Bored? Hit the button.”</li>
                  <li>“Peek inside — six real pages.”</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-4 shrink-0 rounded-full bg-pop-red" />
                  <span className="text-[17px] font-black tracking-[0.08em] uppercase">
                    Never
                  </span>
                </div>
                <ul className="mt-2 list-disc pl-5 text-[17px] leading-[1.5] font-semibold">
                  <li>Screen-time statistics</li>
                  <li>“Are you doing enough?”</li>
                  <li>Anything with the word “digital detox”</li>
                  <li>Baby talk aimed at parents</li>
                </ul>
              </div>
            </div>
            <p className="mt-4.5 text-[17px] font-semibold text-ink-muted">
              Second person, present tense, short sentences. The site never diagnoses
              a problem — it hands over something to do.
            </p>
          </Panel>
        </div>
      </Section>
    </>
  );
}
