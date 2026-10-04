"use client";

import { Button } from "./Button";
import { printOnly, type Printable } from "@/lib/printOnly";

/* A Button that prints one named area of the page — see lib/printOnly.ts.
   A client component so server pages (like /checklist) can use it. */

export function PrintButton({
  what,
  size = "hero",
  variant,
  children,
}: {
  what: Printable;
  size?: "hero" | "block" | "inline" | "compact";
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}) {
  return (
    <Button size={size} variant={variant} onClick={() => printOnly(what)}>
      {children}
    </Button>
  );
}
