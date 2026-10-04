import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section, SectionHeading, Reveal } from "@/components/sections/Section";
import { Slot } from "@/components/content/Slot";
import { ButtonLink } from "@/components/primitives/Button";
import { PrintButton } from "@/components/primitives/PrintButton";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { AUTHOR } from "@/content/author";
import { TEN_TO_START, activitiesFor, chapterOf, pageLabel } from "@/lib/activities";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import { PRINTABLES, MEDIA_SLOTS } from "@/content/media";
import type { Pop } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Free checklist",
  description: AUTHOR.checklist.blurb,
};

/* /checklist — the lead magnet.
   ─────────────────────────────────────────────────────────────
   No email is asked for, anywhere. That's deliberate: it buys the
   reader's trust, which is the whole point of a free checklist. Don't add
   an email gate.

   The ten are real activities from the book (TEN_TO_START in
   content/activities.ts) — our DRAFT picks: ones a kid can run, with
   everyday materials, in any season. Wanda can swap any of them.

   "Print or save as PDF" prints this list alone (see lib/printOnly.ts);
   the browser's print window does the PDF. It replaces a "Download" link
   that pointed at a PDF that didn't exist, and an "email it to me" form
   that had no mail service behind it. Printing from the browser is also the better download: it's the
   page you're looking at, there's no file to host, and it can't go out of
   step with the data. */

const POPS: Pop[] = ["red", "blue", "teal", "magenta", "orange"];

export default function ChecklistPage() {
  const ten = activitiesFor(TEN_TO_START);
  const approved = PRINTABLES.filter((p) => p.href);
  const pending = PRINTABLES.some((p) => !p.href);

  return (
    <>
      <div className="bg-sun-yellow dot-grid">
        <PageHeader
          title={AUTHOR.checklist.heading}
          lead={AUTHOR.checklist.blurb}
        />
      </div>

      <Section field="yellow" labelledBy="ten-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div>
            <Reveal>
              <SectionHeading id="ten-heading">The ten</SectionHeading>
            </Reveal>
            <div data-printable="checklist">
              <p className="mt-4 mb-0 hidden text-[20px] font-black print:block">
                UNPLUG! — Ten to start with ({AUTHOR.name})
              </p>
              <ol className="m-0 mt-6 flex list-none flex-col gap-3 p-0 print:mt-3">
                {ten.map((a, i) => (
                  <li key={a.n}>
                    <Reveal>
                      <div className="flex items-center gap-4 rounded-lg bg-cream p-4 md:p-5">
                        <OutlineNumeral
                          value={String(i + 1)}
                          size={44}
                          pop={POPS[i % POPS.length]}
                          on="cream"
                          className="shrink-0"
                        />
                        <div className="flex-1">
                          <p className="m-0 text-[20px] leading-[1.25] font-black">
                            {a.name}
                          </p>
                          <p className="m-0 mt-1 text-[17px] font-bold text-ink-muted">
                            {chapterOf(a).name} · {pageLabel(a)}
                          </p>
                          <p className="m-0 mt-1 text-[17px] font-semibold">
                            {/* Semicolons, not commas: several materials carry their own commas
                              ("a dollar bill, not too wrinkled"). */}
                            You need: {a.needs.join("; ")}
                          </p>
                        </div>
                        {/* A box to tick off on paper. Not pressable, so
                            it isn't a pill. */}
                        <span
                          aria-hidden
                          className="size-8 shrink-0 rounded-sm border-3 border-ink-navy"
                        />
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrintButton what="checklist">Print or save as PDF</PrintButton>
                {/* Points at the retailer, not the book's own page — the
                    reader who wants all 101 wants to buy it, not read a
                    second description of it. */}
                <ButtonLink
                  href={BUY_URL}
                  variant="secondary"
                  size="hero"
                  {...(BUY_IS_EXTERNAL
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  All 101 are in the book — {BUY_LABEL}
                </ButtonLink>
              </div>
              {/* Every browser's print window has a "Save as PDF" option, so
                  this one button covers paper and download alike. */}
              <p className="mt-3 mb-0 text-[17px] font-semibold text-ink-muted print:hidden">
                Want a PDF? In the print window, choose &ldquo;Save as PDF&rdquo; as the printer.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <Image
                src="/newsletter.png"
                alt="A checklist pinned to a fridge, next to crayons and a paper plane"
                width={1024}
                height={1024}
                className="h-auto w-full rounded-lg"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Also free: pages the book itself says to copy. Each shows as a
          download only once Wanda has approved it (content/media.ts); until
          then the ask stands in for them. No email, same as the checklist. */}
      <Section field="cream" labelledBy="also-free-heading">
        {approved.length > 0 && (
          <div className="mb-8">
            <SectionHeading id="also-free-heading" on="cream">
              Also free, from the book
            </SectionHeading>
            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {approved.map((p) => (
                <li key={p.id}>
                  <ButtonLink href={p.href ?? undefined} download variant="secondary" size="block">
                    {p.title} (PDF)
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid max-w-[1000px] gap-4 md:grid-cols-2">
          {approved.length === 0 && (
            <h2 id="also-free-heading" className="sr-only">
              Still to come
            </h2>
          )}
          {pending && <Slot slot={MEDIA_SLOTS.printables} />}
          <Slot slot={AUTHOR.checklist.picksSlot} />
        </div>
      </Section>
    </>
  );
}
