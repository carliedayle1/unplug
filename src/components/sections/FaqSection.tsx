"use client";

import { Section, SectionHeading, Reveal } from "./Section";
import { Accordion } from "@/components/primitives/Accordion";
import { ButtonLink } from "@/components/primitives/Button";
import { FAQ } from "@/content/unplug";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";

/* Answering the sceptic.
   ─────────────────────────────────────────────────────────────
   Was `Printable.tsx`, which paired the FAQ with an email capture. The
   capture now has its own page at /checklist, so this is the FAQ alone —
   no point asking for the same address twice on one scroll.

   The CTA points at the retailer, not at the book's own page — this
   section now lives ON that page (the homepage), so a link back to it
   would be a same-page no-op. */

export function FaqSection() {
  return (
    <Section field="cream" labelledBy="faq-heading">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <Reveal>
          <SectionHeading id="faq-heading" on="cream">
            {FAQ.heading}
          </SectionHeading>
          <p className="mt-3 max-w-[46ch] text-[19px] font-bold md:text-[21px]">
            The three questions that come up most.
          </p>
          <ButtonLink
            href={BUY_URL}
            size="hero"
            className="mt-6"
            {...(BUY_IS_EXTERNAL
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {BUY_LABEL}
          </ButtonLink>
        </Reveal>

        <Reveal>
          <Accordion rows={FAQ.rows} />
        </Reveal>
      </div>
    </Section>
  );
}
