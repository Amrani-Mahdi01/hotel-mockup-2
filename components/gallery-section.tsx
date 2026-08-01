"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./reveal";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  tall: boolean;
};

const url = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Every frame below was downloaded and looked at before it was chosen.
const SHOTS: Shot[] = [
  {
    src: url("photo-1556456699-4c8b0db5c6fd", 1600),
    alt: "A wide Aegean bay, cobalt water shading into turquoise shallows",
    caption: "The bay below the house",
    tall: false,
  },
  {
    src: url("photo-1626889492521-9d77a1af4784", 1200),
    alt: "A whitewashed stepped path curving down past two blue domes to the sea",
    caption: "The path down, early",
    tall: true,
  },
  {
    src: url("photo-1623681833694-73a51797b75b", 1600),
    alt: "A blue church dome beside a whitewashed triple bell tower above the caldera",
    caption: "Ágios Nikólaos, from the roof",
    tall: false,
  },
  {
    src: url("photo-1631382980784-fe37bf9993dd", 1200),
    alt: "A limewashed wall with white steps and a deep cobalt stable door",
    caption: "The blue is mixed by hand",
    tall: true,
  },
  {
    src: url("photo-1604601600542-c751186db4a3", 1600),
    alt: "Looking down onto white terraces and a small turquoise pool",
    caption: "Terraces, from above",
    tall: false,
  },
  {
    src: url("photo-1535700029537-e6d61ca92751", 1200),
    alt: "A narrow whitewashed lane with a pale blue staircase and blue doors",
    caption: "The lane at the top of the steps",
    tall: true,
  },
  {
    src: url("photo-1595154239208-cebe6e4f6272", 1600),
    alt: "A limewashed chapel corner with a deep-set window and white steps",
    caption: "The chapel wall, four o'clock",
    tall: false,
  },
  {
    src: url("photo-1627625935093-de4c9b41d276", 1200),
    alt: "Sculpted white Cycladic walls and steps above a pale turquoise plunge pool",
    caption: "Room 9, before anyone is up",
    tall: true,
  },
  {
    src: url("photo-1598974701470-f41360d752da", 1600),
    alt: "The surface of the sea, wind-rippled, filling the frame",
    caption: "Meltemi, nine knots",
    tall: false,
  },
];

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = SHOTS[index];

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);

      // aria-modal is a promise to assistive tech, not a behaviour — without
      // this, Tab walks straight out onto the page behind the overlay.
      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    // Hold the page still while the overlay is up.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, onStep]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.caption} — image ${index + 1} of ${SHOTS.length}`}
      className="on-ink fixed inset-0 z-[100] flex flex-col bg-ink/97 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="data-label text-white/65">
          {String(index + 1).padStart(2, "0")} / {SHOTS.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
        >
          <span className="sr-only">Close gallery</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path d="M1 1l13 13M14 1L1 14" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      <div className="relative flex-1 px-6 pb-4 sm:px-10">
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <div className="flex items-center justify-between gap-6 px-6 py-6 sm:px-10">
        <p className="font-display text-lg text-white/90 italic sm:text-xl">
          {shot.caption}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous image"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next image"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpen((i) => {
      if (i !== null) triggers.current[i]?.focus();
      return null;
    });
  }, []);

  const step = useCallback((delta: number) => {
    setOpen((i) => (i === null ? i : (i + delta + SHOTS.length) % SHOTS.length));
  }, []);

  return (
    <section id="gallery" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">Gallery</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              White, and then
              <br />
              a great deal of <em className="text-marine italic">blue</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              Photographs taken around the house across one season. Nothing has
              been styled and nothing has been borrowed from anywhere else.
            </p>
          </Reveal>
        </div>

        {/* CSS columns give a true mosaic without fighting mixed aspect ratios */}
        <div className="mt-16 gap-5 [column-count:1] sm:[column-count:2] lg:mt-24 lg:gap-6 lg:[column-count:3]">
          {SHOTS.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={0.05 * (i % 3)}
              className="mb-5 break-inside-avoid lg:mb-6"
            >
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden bg-mist text-left"
              >
                <div className={`relative ${shot.tall ? "aspect-[3/4]" : "aspect-[3/2]"}`}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12 font-display text-base text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {shot.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox index={open} onClose={close} onStep={step} />
      )}
    </section>
  );
}
