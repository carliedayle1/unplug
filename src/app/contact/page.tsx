import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section, SectionHeading, Reveal } from "@/components/sections/Section";
import { Slot } from "@/components/content/Slot";
import { AUTHOR } from "@/content/author";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${AUTHOR.name}.`,
};

/* /contact
   ─────────────────────────────────────────────────────────────
   One address, not three. The earlier version split readers / press /
   booking, which only makes sense once there's press to field and
   events to book — there isn't yet.

   A mailto: with no address behind it is worse than an honest gap, so
   the email renders as a slot until there's one to use. */

export default function ContactPage() {
  const socials = AUTHOR.socials.filter((s) => s.url !== null);

  return (
    <>
      <div className="bg-sun-yellow dot-grid">
        <PageHeader
          title="Get in touch"
          lead="An activity that worked, one that didn't, or a question about the book — all welcome."
        />
      </div>

      <Section field="yellow" labelledBy="contact-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <Reveal>
            <h2 id="contact-heading" className="font-display m-0 text-[30px] font-bold">
              Email
            </h2>
            <div className="mt-4 max-w-[52ch]">
              {AUTHOR.contact.email ? (
                <p className="text-[21px] font-black">
                  <a href={`mailto:${AUTHOR.contact.email}`}>
                    {AUTHOR.contact.email}
                  </a>
                </p>
              ) : (
                <Slot slot={AUTHOR.contact.emailSlot} />
              )}
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading id="elsewhere-heading" className="text-[30px]!">
              Elsewhere
            </SectionHeading>
            <div className="mt-4 max-w-[52ch]">
              {socials.length > 0 ? (
                <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.url as string}
                        className="box-border flex min-h-12 items-center rounded-full border-3 border-ink-navy bg-cream px-5 text-[18px] font-black no-underline hover:bg-sun-deep"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Slot slot={AUTHOR.socialsSlot} />
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
