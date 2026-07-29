import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section, SectionHeading, Reveal } from "@/components/sections/Section";
import { Slot } from "@/components/content/Slot";
import { EmailForm } from "@/components/primitives/EmailForm";
import { ButtonLink } from "@/components/primitives/Button";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { AUTHOR } from "@/content/author";
import { ACTIVITIES } from "@/lib/activities";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import type { Pop } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Free checklist",
  description: AUTHOR.newsletter.blurb,
};

/* /checklist — the lead magnet.
   ─────────────────────────────────────────────────────────────
   The no-email download is deliberate and must stay: it costs a few
   addresses and buys the reader's trust, which is the whole point.
   Don't gate it.

   The ten shown are DEMO activities (see lib/activities.ts) standing in
   until the real ten are chosen from the book. */

const POPS: Pop[] = ["red", "blue", "teal", "magenta", "orange"];

export default function ChecklistPage() {
  const ten = ACTIVITIES.slice(0, 10);

  return (
    <>
      <div className="bg-sun-yellow dot-grid">
        <PageHeader
          title={AUTHOR.newsletter.heading}
          lead={AUTHOR.newsletter.blurb}
        />
      </div>

      <Section field="yellow" labelledBy="ten-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div>
            <Reveal>
              <SectionHeading id="ten-heading">The ten</SectionHeading>
            </Reveal>
            <ol className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
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
                      <div>
                        <p className="m-0 text-[20px] leading-[1.25] font-black">
                          {a.name}
                        </p>
                        <p className="m-0 mt-1 text-[17px] font-bold text-ink-muted">
                          {a.time} · {a.where} · mess {a.mess} of 3
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal>
              <div className="mt-6 flex flex-wrap gap-3">
                {/* TODO(assets): the real PDF, once the ten are chosen. */}
                <ButtonLink href="/ten-to-start-with.pdf" download size="hero">
                  Download the checklist
                </ButtonLink>
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
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="rounded-xl bg-cream p-5 shadow-[0_6px_0_var(--color-sun-deep)] md:p-6">
                <h2 className="font-display m-0 text-[26px] font-bold">
                  Rather have it emailed?
                </h2>
                <p className="mt-2 text-[18px] font-semibold">
                  One email with the checklist attached. Nothing else, ever.
                </p>
                <EmailForm />
              </div>
            </Reveal>
            <Reveal>
              <Image
                src="/newsletter.png"
                alt="A checklist pinned to a fridge, next to crayons and a paper plane"
                width={1024}
                height={1024}
                className="mt-5 h-auto w-full rounded-lg"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section field="cream">
        <div className="max-w-[62ch]">
          <Slot slot={AUTHOR.newsletter.giveawaySlot} />
        </div>
      </Section>
    </>
  );
}
