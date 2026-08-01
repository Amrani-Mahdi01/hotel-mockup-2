"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { ReservationBar } from "./reservation-bar";
import { SeaConditionsStrip } from "./sea-conditions";

const DWELL_MS = 6000;

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?auto=format&fit=crop&w=2000&q=80",
    alt: "The whitewashed houses of Oía stepping down to the Aegean",
    caption: "The house, from the caldera path",
  },
  {
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=80",
    alt: "A white villa lit at dusk beside a still blue pool",
    caption: "The pool, an hour before dinner",
  },
  {
    src: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=2000&q=80",
    alt: "White tables set along a stone quay beside turquoise water",
    caption: "The table, at the water's edge",
  },
  {
    src: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=2000&q=80",
    alt: "Blue-domed churches above the caldera in Oía",
    caption: "Blue domes, seen from Room 4",
  },
];

const REDUCED = "(prefers-reduced-motion: reduce)";

const subscribeMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Guests who ask for less motion get no autoplay and no drift.
  const still = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );

  const go = useCallback((next: number) => {
    setActive((next + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay, held while the guest is reading or tabbing through.
  useEffect(() => {
    if (paused || still) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % SLIDES.length),
      DWELL_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, paused, still]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section id="top">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="The house at Alkyoní"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        // min-h rather than h: at 320x568 the copy stack is taller than the
        // viewport and a fixed height clipped it off the top.
        // on-ink: every control in here sits on the dark scrim, where the
        // default marine focus ring is invisible.
        className="on-ink relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-6rem)]"
      >
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            data-active={i === active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}: ${slide.caption}`}
            aria-hidden={i !== active}
            className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,0.72,0.16,1)] data-[active=true]:opacity-100"
          >
            <div className="kenburns h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* Scrim — deep marine, so white type stays legible on bright water */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,36,62,0.88)_0%,rgba(7,36,62,0.74)_30%,rgba(7,36,62,0.42)_58%,rgba(7,36,62,0.16)_78%,rgba(7,36,62,0.30)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent"
        />

        {/* Copy, set inside the slider */}
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 sm:px-10 lg:pb-14">
          <div className="max-w-[46rem]">
            <div className="flex items-center gap-4">
              <span
                className="rule-draw h-px w-12 bg-white/60"
                style={{ "--d": "0.2s" } as React.CSSProperties}
              />
              <span
                className="reveal-fade data-label text-white/85"
                style={{ "--d": "0.35s" } as React.CSSProperties}
              >
                Oía, Santoríni — est. 1968
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.9rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-white">
              <span
                className="line-mask"
                style={{ "--d": "0.45s" } as React.CSSProperties}
              >
                <span>Nine rooms.</span>
              </span>
              <span
                className="line-mask"
                style={{ "--d": "0.57s" } as React.CSSProperties}
              >
                <span>
                  One <em className="text-sky-200 italic">horizon</em>.
                </span>
              </span>
            </h1>

            <p
              className="reveal mt-7 max-w-[40ch] text-[1.0625rem] leading-[1.7] text-white/80"
              style={{ "--d": "0.8s" } as React.CSSProperties}
            >
              A whitewashed house on the caldera&rsquo;s edge, kept by the same
              family since 1968. Every room faces west; not one of them has a
              television.
            </p>

            <div className="mt-9">
              <SeaConditionsStrip tone="light" />
            </div>
          </div>

          {/* Slide caption + controls */}
          <div className="mt-10 flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p
              key={active}
              className="reveal font-display text-lg text-white/90 italic"
              style={{ "--d": "0s" } as React.CSSProperties}
            >
              {SLIDES[active].caption}
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${slide.caption}`}
                    aria-current={i === active}
                    className="group py-2"
                  >
                    <span
                      data-active={i === active}
                      className="block h-px w-10 origin-left bg-white/45 transition-colors group-hover:bg-white/75 data-[active=true]:bg-white/45"
                    >
                      <span
                        data-active={i === active}
                        data-still={still || paused}
                        className="block h-px w-0 bg-white data-[active=true]:w-full data-[active=true]:[transition:width_6s_linear] data-[active=true]:data-[still=true]:[transition:none]"
                      />
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
                >
                  <span aria-hidden>←</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
                >
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReservationBar />
    </section>
  );
}
