"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, NAV_CTA } from "@/content/nav";
import { ButtonLink, IconButton } from "@/components/primitives/Button";
import { MobileDrawer } from "./MobileDrawer";
import { Wordmark } from "./Wordmark";

/* Navigation.
   ─────────────────────────────────────────────────────────────
   Multi-page now, so the active state comes from the route rather than
   a scroll spy. A section within a page is no longer the unit of
   navigation — a page is.

   Desktop: sticky cream bar, pill links, Buy CTA.
   Mobile: wordmark + compact Buy + 48px hamburger → drawer. */

/** True for the exact route, or any child of it. */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b-3 border-ink-navy bg-cream">
        <nav
          aria-label="Main"
          className="mx-auto flex h-18 max-w-[1440px] items-center gap-3 px-4 md:px-8"
        >
          <Link
            href="/"
            className="flex min-h-12 shrink-0 items-center no-underline"
            aria-label="Wanda Kanten Hartfield — home"
          >
            {/* The nav bar is cream — the cover's cream outline would be
                invisible against it, so this is the one place the
                wordmark needs a navy outline instead. */}
            <Wordmark className="text-[26px] md:text-[30px]" outline="navy" />
          </Link>

          <ul className="ml-2.5 hidden list-none items-center gap-1 p-0 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = isActiveRoute(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`box-border flex min-h-12 items-center rounded-full px-4.5 py-3 text-[19px] font-black whitespace-nowrap no-underline hover:bg-sun-yellow hover:text-ink-navy ${active ? "bg-sun-yellow" : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {/* One CTA with a responsive LABEL, not two buttons with
                `hidden`. The button's base class list includes
                `inline-flex`, which sits in the same layer at the same
                specificity as `hidden` — so `hidden` loses on stylesheet
                order and both CTAs rendered, overflowing 390px. Swapping
                spans avoids the collision entirely. */}
            <ButtonLink
              href={NAV_CTA.href}
              size="compact"
              {...(NAV_CTA.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="lg:hidden">Buy</span>
              <span className="hidden lg:inline">{NAV_CTA.label}</span>
            </ButtonLink>
            <IconButton
              label="Menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[3px] w-5 rounded-[2px] bg-ink-navy" />
                <span className="block h-[3px] w-5 rounded-[2px] bg-ink-navy" />
                <span className="block h-[3px] w-5 rounded-[2px] bg-ink-navy" />
              </span>
            </IconButton>
          </div>
        </nav>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
