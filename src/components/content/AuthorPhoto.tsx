import Image from "next/image";

/* The real author photo (public/author_pic.jpg).
   ─────────────────────────────────────────────────────────────
   Circular rather than the book cover's rounded-rectangle treatment —
   deliberately different, so a photo of a person never reads as another
   product shot. Navy ring + the hard sun-deep offset shadow every card
   in this design uses (never a blur-only glow).

   Sizing is left to the caller via `className` (e.g. `w-[220px]`);
   `fill` + a sized relative wrapper is the correct Next/Image pattern
   for a fixed-aspect crop that still serves a responsive srcset. */

export function AuthorPhoto({
  className = "",
  /** Set true where this renders above the fold (e.g. /about's first
      section) — otherwise Next lazy-loads it, which is right for the
      homepage's "Who wrote it" copy much further down the page. */
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full border-4 border-ink-navy shadow-[0_8px_0_var(--color-sun-deep)] ${className}`}
    >
      <Image
        src="/author_pic.jpg"
        alt="Wanda Kanten Hartfield"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 300px, 240px"
        className="object-cover"
      />
    </div>
  );
}
