import Image from "next/image";
import { PHOTOS } from "@/content/photos";

/* The author's photo gallery.
   ─────────────────────────────────────────────────────────────
   Square tiles, because the source photos are a mix of landscape and
   portrait (one is 1952×3264) and a uniform grid of consistent shapes
   reads far better than a ragged one. `object-cover` plus an optional
   per-photo `position` handles the frames a centre crop would spoil.

   Styling follows the cards elsewhere in the design: navy border, hard
   sun-deep offset shadow, never a blur. The small alternating tilt is
   the testimonial treatment from the original mockups — static CSS, not
   motion, so it reads as part of the drawing rather than an entrance. */

export function PhotoGallery() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 xl:grid-cols-4">
      {PHOTOS.map((photo, i) => (
        <li key={photo.src}>
          <figure
            className="m-0"
            style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg border-4 border-ink-navy bg-cream shadow-[0_8px_0_var(--color-sun-deep)]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            </div>
            <figcaption className="mt-3.5 text-[17px] leading-[1.45] font-bold text-ink-muted">
              {photo.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
