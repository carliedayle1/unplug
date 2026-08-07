/* The author's own photographs (public/images/).
   ─────────────────────────────────────────────────────────────
   Supplied by Wanda. Real photographs of real people, so the rules
   from placeholders.ts apply doubly: nothing here is generated, and
   nothing gets a caption asserting something we can't see.

   CAPTIONS ARE OURS AND NEED HER CONFIRMATION. They're written from
   what's visibly happening in each frame, deliberately avoiding names,
   dates, places and relationships we'd only be guessing at — the one
   exception is the two-sons photo, which matches her own bio ("mother
   of two sons"). She should correct any of them; the alt text is
   written to stand on its own either way.

   TWO PHOTOS ARE DELIBERATELY NOT USED, both for context rather than
   quality:
     · P1000015.jpeg — a lovely, characterful shot, but taken in a
       bathroom with toiletries lined up behind her. Wrong setting for
       the front of a professional site.
     · IMG_1272.jpeg — holding a newborn in what is clearly a hospital
       room, with a visitor badge and date legible on her jacket. That's
       a private medical setting and an identifiable infant.
   Both are still in the repo. Say the word and either goes in. */

export type Photo = {
  src: string;
  /** Describes what's in the frame, for anyone who can't see it. */
  alt: string;
  /** Shown under the photo. Ours — see the note above. */
  caption: string;
  /** object-position, for frames a centre crop would spoil. */
  position?: string;
};

export const PHOTOS: Photo[] = [
  {
    src: "/images/P1000421.jpeg",
    alt: "Wanda sitting on a sofa reading a picture book with a small girl leaning against her",
    caption: "The whole idea of the book, in one photograph.",
  },
  {
    src: "/images/IMG_0450.jpeg",
    alt: "Wanda standing on a lawn between her two grown sons",
    caption: "With her two sons — the original test subjects.",
  },
  {
    src: "/images/P1000318.jpeg",
    alt: "Wanda in a flower crown playing a wooden pump organ outdoors while someone photographs her",
    caption: "Still performing, decades after Romper Room.",
  },
  {
    src: "/images/SAM_0252.jpeg",
    alt: "Wanda on a sofa mid-sentence with a young girl beside her, an open book on her lap",
    caption: "Mid-story, and losing the audience's attention to a hair clip.",
  },
  {
    src: "/images/IMAG0091.jpeg",
    alt: "Wanda standing beside a three-storey dolls' house filled with furniture and figures",
    caption: "Assessing a dolls' house with a professional eye.",
    position: "center 30%",
  },
  {
    src: "/images/P1000022.jpeg",
    alt: "Wanda holding a baby in a red outfit, both looking towards the camera",
    caption: "A new one to win over.",
  },
  {
    src: "/images/P1000553.jpeg",
    alt: "Wanda and a man standing together outdoors, a lake and desert hills behind them",
    caption: "Away from the desk.",
  },
  {
    src: "/images/P1000511.jpeg",
    alt: "Wanda in sunglasses smiling over her shoulder at a park, children playing behind her",
    caption: "At the park, keeping an eye on things.",
  },
];
