"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "The house", href: "#house" },
  { label: "Rooms", href: "#rooms" },
  { label: "The table", href: "#table" },
  { label: "The island", href: "#island" },
  { label: "Gallery", href: "#gallery" },
  { label: "Journal", href: "#journal" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid once the guest scrolls, or whenever the mobile panel is open.
  const solid = scrolled || open;

  return (
    <header
      data-solid={solid}
      // Over the hero photograph the marine focus ring is invisible, so switch
      // the whole bar to white rings until it goes solid.
      className={`fixed inset-x-0 top-0 z-50 border-b border-transparent text-white transition-[background-color,border-color,color,backdrop-filter] duration-500 data-[solid=true]:border-rule data-[solid=true]:bg-paper data-[solid=true]:text-ink data-[solid=true]:backdrop-blur-md ${
        solid ? "" : "on-ink"
      }`}
    >
      <div
        data-solid={solid}
        className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-6 transition-[padding] duration-500 data-[solid=true]:py-4 sm:px-10"
      >
        <a
          href="#top"
          className="reveal-fade flex items-baseline gap-3"
          style={{ "--d": "0.1s" } as React.CSSProperties}
        >
          <span className="font-display text-2xl leading-none tracking-[0.14em]">
            ALKYONÍ
          </span>
          <span className="data-label hidden opacity-60 sm:block">
            Santoríni
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link reveal-fade relative text-[0.9375rem] opacity-85 transition-opacity hover:opacity-100"
              style={{ "--d": `${0.2 + i * 0.07}s` } as React.CSSProperties}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#reserve"
            data-solid={solid}
            // Keep this one marine: the CTA sits over bright sky, where a white
            // ring measures worse than the marine one.
            className="sweep sweep-light reveal-fade relative isolate hidden overflow-hidden border border-white/60 px-6 py-2.5 text-[0.8125rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:text-ink focus-visible:text-ink focus-visible:outline-[#0f4c81] data-[solid=true]:border-ink data-[solid=true]:hover:text-paper data-[solid=true]:focus-visible:text-paper sm:block"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            <span className="relative z-10">Reserve</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="reveal-fade -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              data-open={open}
              className="h-[2px] w-6 bg-current transition-transform duration-300 data-[open=true]:translate-y-[4.5px] data-[open=true]:rotate-45"
            />
            <span
              data-open={open}
              className="h-[2px] w-6 bg-current transition-transform duration-300 data-[open=true]:-translate-y-[4.5px] data-[open=true]:-rotate-45"
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        data-open={open}
        // Collapsing to 0fr only clips the panel — without `inert` its seven
        // links stay focusable and the focus ring vanishes for seven tabs.
        inert={!open}
        className="grid grid-rows-[0fr] overflow-hidden border-rule bg-paper text-ink transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,0.72,0.16,1)] data-[open=true]:grid-rows-[1fr] data-[open=true]:border-t lg:hidden"
      >
        <nav className="min-h-0">
          <ul className="flex flex-col px-6 py-2 sm:px-10">
            {NAV.map((item) => (
              <li
                key={item.href}
                className="border-b border-rule/70 last:border-0"
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-5 pb-6 sm:hidden">
              <a
                href="#reserve"
                onClick={() => setOpen(false)}
                className="block border border-ink px-6 py-3 text-center text-[0.8125rem] tracking-[0.1em] uppercase"
              >
                Reserve
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
