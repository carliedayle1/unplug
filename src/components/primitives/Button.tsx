import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

/* Buttons.
   ─────────────────────────────────────────────────────────────
   Radius is always `full` — the pill is reserved for things you
   press, and a button is the definition of pressable.

   Depth is a hard offset in the pop's pressed shade, and the press
   squashes it to 1px over 90ms. Hover lifts 2–3px. Nothing blurs.

   Size floors come from the mockups: 60/64px hero, 56/58px block,
   52px inline, 48px compact. Never below 44px. */

type Variant = "primary" | "secondary" | "ghost";
type Size = "hero" | "block" | "inline" | "compact";

const SIZE: Record<Size, string> = {
  hero: "h-16 px-8 text-[22px]",
  block: "h-14 px-6 text-[20px]",
  inline: "h-13 px-5 text-[19px]",
  compact: "h-12 px-4 text-[18px]",
};

/* Primary is pop-red by default: the CTA and the Boredom Button are
   the only things allowed to be the brightest object on the page. */
const VARIANT: Record<Variant, string> = {
  primary: [
    "bg-(--pop) text-(--on-pop) border-0",
    "shadow-[0_5px_0_var(--pop-deep)]",
    "hover:-translate-y-[3px] hover:shadow-[0_8px_0_var(--pop-deep)]",
    "active:translate-y-1 active:shadow-[0_1px_0_var(--pop-deep)]",
  ].join(" "),
  secondary: [
    "bg-cream text-ink-navy border-3 border-ink-navy",
    "hover:bg-sun-deep",
    "active:translate-y-[3px] active:scale-[0.98]",
  ].join(" "),
  ghost: [
    "bg-transparent text-ink-navy border-0",
    "hover:bg-cream",
    "active:translate-y-[3px] active:scale-[0.98]",
  ].join(" "),
};

const BASE = [
  "inline-flex items-center justify-center gap-2",
  "rounded-full font-black whitespace-nowrap",
  "cursor-pointer select-none box-border",
  "transition-[transform,box-shadow,background-color]",
  "duration-(--duration-lift) ease-(--ease-bounce)",
  "active:duration-(--duration-press)",
  "disabled:cursor-not-allowed disabled:opacity-100",
  // Disabled reads as flat + muted, never a faded pop — opacity on
  // text silently drops contrast, which the style tile forbids.
  "disabled:bg-cream disabled:text-ink-muted disabled:shadow-none",
  "disabled:border-3 disabled:border-dash-empty disabled:translate-y-0",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0",
].join(" ");

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Which pop carries the fill. Only meaningful for `primary`. */
  pop?: "red" | "blue" | "teal" | "magenta" | "orange";
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({
  variant = "primary",
  size = "block",
  pop = "red",
  fullWidth,
  className = "",
}: CommonProps) {
  return [
    BASE,
    SIZE[size],
    VARIANT[variant],
    variant === "primary" ? `pop-${pop}` : "",
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant,
  size,
  pop,
  fullWidth,
  children,
  className,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={classes({ variant, size, pop, fullWidth, children, className })}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Same skin, anchor semantics — for Buy links and jump targets. */
export function ButtonLink({
  variant,
  size,
  pop,
  fullWidth,
  children,
  className,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`no-underline hover:text-(--on-pop) ${classes({ variant, size, pop, fullWidth, children, className })}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/* A round icon button — 48px, cream, 3px navy border. Used for the
   hamburger, the carousel arrows and the drawer close. */
export function IconButton({
  label,
  children,
  className = "",
  ...rest
}: { label: string; children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={[
        "inline-flex size-12 shrink-0 items-center justify-center",
        "rounded-full border-3 border-ink-navy bg-cream",
        "cursor-pointer text-[20px] font-black text-ink-navy",
        "transition-transform duration-(--duration-lift) ease-(--ease-bounce)",
        "hover:bg-sun-deep active:translate-y-[3px] active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:active:translate-y-0",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
