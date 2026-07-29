import type { Pop } from "@/lib/activities";

/* The icon set.
   ─────────────────────────────────────────────────────────────
   3px navy strokes, round caps and joins, drawn on a 24px grid,
   sitting inside a 56px pop disc. Geometric and friendly — the brief
   is explicit that this must not look like a line-icon library.

   Paths are lifted from the style tile verbatim. */

export const ICON_PATHS = {
  indoor: ["M3 20h18", "M6 20V9l6-5 6 5v11", "M10 20v-5h4v5"],
  outdoor: [
    "M12 3v2",
    "M12 19v2",
    "M4.2 4.2l1.4 1.4",
    "M18.4 18.4l1.4 1.4",
    "M3 12h2",
    "M19 12h2",
    "M4.2 19.8l1.4-1.4",
    "M18.4 5.6l1.4-1.4",
    "M12 8a4 4 0 100 8 4 4 0 000-8",
  ],
  time: ["M12 3a9 9 0 100 18 9 9 0 000-18", "M12 7v5l3 2"],
  messy: ["M4 19c2-6 5-9 8-9s5 2 6 5", "M8 19h10", "M15 6a2 2 0 104 0 2 2 0 00-4 0"],
  group: [
    "M9 8a3 3 0 106 0 3 3 0 00-6 0",
    "M4 20c0-3 2.5-5 5-5",
    "M15 15c2.5 0 5 2 5 5",
    "M17 7a2 2 0 104 0 2 2 0 00-4 0",
  ],
  free: ["M12 3v18", "M17 7H9.5a2.5 2.5 0 000 5H14a2.5 2.5 0 010 5H6"],
  prep: ["M4 6h16v12H4z", "M4 10h16", "M9 6v12"],
  favourite: ["M12 4l2.3 4.9 5.2.7-3.8 3.7.9 5.3-4.6-2.6-4.6 2.6.9-5.3L4.5 9.6l5.2-.7z"],
  check: ["M5 13l4 4L19 7"],
  chevron: ["M6 9l6 6 6-6"],
} as const;

export type IconName = keyof typeof ICON_PATHS;

/** The style tile's disc colour for each icon. */
export const ICON_DISC: Partial<Record<IconName, Pop | "yellow">> = {
  indoor: "orange",
  outdoor: "teal",
  time: "yellow",
  messy: "magenta",
  group: "blue",
  free: "teal",
  prep: "orange",
  favourite: "red",
};

const DISC_BG: Record<Pop | "yellow", string> = {
  red: "bg-pop-red",
  blue: "bg-pop-blue",
  teal: "bg-pop-teal",
  magenta: "bg-pop-magenta",
  orange: "bg-pop-orange",
  yellow: "bg-sun-yellow",
};

/** Bare glyph — navy strokes, no disc. */
export function Icon({
  name,
  size = 24,
  stroke = "#3E5163",
  strokeWidth = 2.6,
  className = "",
}: {
  name: IconName;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {ICON_PATHS[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Glyph on its 56px pop disc — the canonical presentation. */
export function IconDisc({
  name,
  disc,
  size = 56,
  className = "",
}: {
  name: IconName;
  disc?: Pop | "yellow";
  size?: number;
  className?: string;
}) {
  const bg = DISC_BG[disc ?? ICON_DISC[name] ?? "orange"];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${bg} ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.535)} />
    </span>
  );
}
