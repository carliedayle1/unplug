/* The prop kit — twelve objects, drawn on a 100×100 box.
   ─────────────────────────────────────────────────────────────
   Flat vector fills, no outlines on figures, one pop per object plus
   at most one supporting pop. Paths are lifted from the style tile's
   object library verbatim.

   These sit on activity cards, in the sticker chart, and scatter as
   the draggable decoration layer. Kid figures are NOT here — those
   are commissioned from the cover illustrator; only props are ours. */

type PropProps = { className?: string; title?: string };

const box = (className = "") => ({
  viewBox: "0 0 100 100",
  className: `block ${className}`,
  xmlns: "http://www.w3.org/2000/svg",
});

/* Every prop is decorative by default. Pass `title` only when a prop
   is doing real communicative work (the style tile's own specimens). */
function A11y({ title }: { title?: string }) {
  return title ? <title>{title}</title> : null;
}
const hidden = (title?: string) => (title ? {} : { "aria-hidden": true as const });

export function Bucket({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path
        d="M28 34h44a4 4 0 0 1 4 4.4l-4.6 42A6 6 0 0 1 65.4 86H34.6a6 6 0 0 1-6-5.6L24 38.4A4 4 0 0 1 28 34z"
        fill="#3FB68B"
      />
      <path d="M30 24a20 20 0 0 1 40 0" stroke="#F6A11F" strokeWidth="6" strokeLinecap="round" fill="none" />
      <rect x="26" y="46" width="48" height="8" rx="4" fill="#2B7FD4" />
    </svg>
  );
}

export function Ball({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <circle cx="50" cy="52" r="32" fill="#E8342A" />
      <path d="M18 52h64" stroke="#FFFBEF" strokeWidth="6" />
      <path d="M50 20c12 12 12 52 0 64" stroke="#FFFBEF" strokeWidth="6" fill="none" />
    </svg>
  );
}

export function Kite({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M50 10 80 46 50 90 20 46z" fill="#E5218A" />
      <path d="M50 10 80 46 50 46z" fill="#F6A11F" />
      <path d="M20 46h60" stroke="#FFFBEF" strokeWidth="3" />
      <path d="M50 90c9 5 0 10 8 16" stroke="#3E5163" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Chalk({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <rect x="18" y="30" width="16" height="52" rx="8" fill="#2B7FD4" transform="rotate(-12 26 56)" />
      <rect x="42" y="24" width="16" height="58" rx="8" fill="#E5218A" />
      <rect x="66" y="30" width="16" height="52" rx="8" fill="#3FB68B" transform="rotate(12 74 56)" />
    </svg>
  );
}

export function Rope({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M26 30c-16 20-4 46 24 46s40-26 24-46" stroke="#E5218A" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="16" y="14" width="14" height="26" rx="7" fill="#F6A11F" />
      <rect x="70" y="14" width="14" height="26" rx="7" fill="#F6A11F" />
    </svg>
  );
}

export function Blocks({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <rect x="16" y="52" width="30" height="30" rx="6" fill="#2B7FD4" />
      <rect x="52" y="52" width="30" height="30" rx="6" fill="#F6A11F" />
      <rect x="34" y="18" width="30" height="30" rx="6" fill="#E8342A" />
    </svg>
  );
}

export function Book({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M50 26c-8-7-20-9-32-8v54c12-1 24 1 32 8z" fill="#3FB68B" />
      <path d="M50 26c8-7 20-9 32-8v54c-12-1-24 1-32 8z" fill="#2B7FD4" />
      <rect x="46" y="24" width="8" height="58" rx="4" fill="#3E5163" />
    </svg>
  );
}

export function Plane({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M88 14 12 46l30 10z" fill="#2B7FD4" />
      <path d="M88 14 42 56l4 30z" fill="#3E5163" />
      <path d="M46 86 60 68l-18-12z" fill="#F6A11F" />
    </svg>
  );
}

export function Hat({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M50 12 74 82H26z" fill="#F6A11F" />
      <circle cx="50" cy="10" r="8" fill="#E5218A" />
      <circle cx="44" cy="46" r="5" fill="#FFFBEF" />
      <circle cx="58" cy="62" r="5" fill="#FFFBEF" />
      <rect x="22" y="80" width="56" height="8" rx="4" fill="#E8342A" />
    </svg>
  );
}

export function Explore({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <rect x="54" y="58" width="14" height="34" rx="7" fill="#F6A11F" transform="rotate(-45 61 75)" />
      <circle cx="44" cy="42" r="26" fill="#2B7FD4" />
      <circle cx="44" cy="42" r="17" fill="#FFFBEF" />
    </svg>
  );
}

export function Pinwheel({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M50 50 50 14a18 18 0 0 1 18 18z" fill="#E8342A" />
      <path d="M50 50 86 50a18 18 0 0 1-18 18z" fill="#F6A11F" />
      <path d="M50 50 50 86a18 18 0 0 1-18-18z" fill="#3FB68B" />
      <path d="M50 50 14 50a18 18 0 0 1 18-18z" fill="#E5218A" />
      <circle cx="50" cy="50" r="7" fill="#3E5163" />
    </svg>
  );
}

/** The brand mark of the whole site: a cord pulled out of its socket. */
export function Unplug({ className, title }: PropProps) {
  return (
    <svg {...box(className)} role="img" {...hidden(title)}>
      <A11y title={title} />
      <path d="M84 30v20a26 26 0 0 1-26 26H36" stroke="#3E5163" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="10" y="60" width="26" height="32" rx="9" fill="#E8342A" />
      <rect x="16" y="46" width="6" height="18" rx="3" fill="#3E5163" />
      <rect x="26" y="46" width="6" height="18" rx="3" fill="#3E5163" />
      <rect x="72" y="10" width="24" height="24" rx="8" fill="#FFFBEF" />
      <circle cx="80" cy="22" r="3" fill="#3E5163" />
      <circle cx="88" cy="22" r="3" fill="#3E5163" />
    </svg>
  );
}

export const PROP_KIT = [
  { key: "bucket", label: "Bucket", Component: Bucket },
  { key: "ball", label: "Ball", Component: Ball },
  { key: "kite", label: "Kite", Component: Kite },
  { key: "chalk", label: "Chalk", Component: Chalk },
  { key: "rope", label: "Rope", Component: Rope },
  { key: "blocks", label: "Blocks", Component: Blocks },
  { key: "book", label: "Book", Component: Book },
  { key: "plane", label: "Plane", Component: Plane },
  { key: "hat", label: "Hat", Component: Hat },
  { key: "explore", label: "Explore", Component: Explore },
  { key: "pinwheel", label: "Pinwheel", Component: Pinwheel },
  { key: "unplug", label: "Unplug", Component: Unplug },
] as const;

export type PropKey = (typeof PROP_KIT)[number]["key"];
