import { SectionHeading, type Field } from "@/components/sections/Section";

/* Standard page header.
   ─────────────────────────────────────────────────────────────
   Eyebrow label, the heading in the outline treatment, and a lead
   paragraph.

   `as` defaults to h1 because most routes open with this. Pass "h2"
   when the page already has an h1 above it — the book page does, and
   two h1s on one document is a real structural fault. */

export function PageHeader({
  eyebrow,
  title,
  lead,
  field = "yellow",
  as = "h1",
  id,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  field?: Field;
  as?: "h1" | "h2";
  id?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-14 pb-6 md:px-12 md:pt-20">
      {eyebrow && (
        <span className="text-label inline-block rounded-full bg-ink-navy px-4 py-2 text-cream uppercase">
          {eyebrow}
        </span>
      )}
      <SectionHeading
        as={as}
        id={id}
        on={field}
        className={eyebrow ? "mt-4" : ""}
      >
        {title}
      </SectionHeading>
      {lead && (
        <p className="mt-4 max-w-[62ch] text-[19px] font-bold md:text-[22px]">{lead}</p>
      )}
      {children}
    </div>
  );
}
