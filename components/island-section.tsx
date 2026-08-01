import Image from "next/image";
import { Reveal } from "./reveal";

// Verified: caldera panorama from a whitewashed Oia terrace, one white yacht on
// deep navy water beneath a cloudless sky.
const PANORAMA =
  "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?auto=format&fit=crop&w=2400&q=80";

const OUTINGS = [
  {
    title: "A boat, in the afternoon",
    meta: "Half a day · by caïque",
    note: "Around the caldera and into the hot springs. We pack lunch and a cold bottle.",
    src: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1400&q=80",
    alt: "A white sloop under full sail on deep blue open sea",
    position: "50% 50%",
  },
  {
    title: "Down to Ammoúdi",
    meta: "Two hours · 300 steps",
    note: "The old path to the fishing quay, and the long climb back up before dinner.",
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80",
    // Biased left to keep the warm plaster wall on the right out of frame.
    alt: "Whitewashed steps in a narrow lane running down toward deep blue water",
    position: "32% 50%",
  },
  {
    title: "Where to swim",
    meta: "Four bays · empty until June",
    note: "Reached by car in twenty minutes, and worth every one of them in May.",
    src: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1400&q=80",
    alt: "Sunlight falling through clear blue water onto pale rippled sand",
    position: "50% 50%",
  },
];

export function IslandSection() {
  return (
    <section id="island" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">The island</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              Everything else is
              <br />
              a short <em className="text-marine italic">walk</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              We keep a boat, a car, and the phone numbers of people worth
              knowing. Ask at the desk the night before and it will be arranged
              by morning.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed lead: the view the house is named for */}
      <Reveal className="mt-16 lg:mt-24">
        <figure className="relative aspect-[4/3] w-full overflow-hidden bg-mist sm:aspect-[21/9]">
          <Image
            src={PANORAMA}
            alt="The Santoríni caldera seen from a whitewashed terrace, a single yacht on the water"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/70 to-transparent"
          />
          {/* Padding belongs on the inner container so the caption lands on the
              same grid as every other element on the page. */}
          <figcaption className="absolute inset-x-0 bottom-0 pb-6 sm:pb-10">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
              <p className="font-display text-xl text-white/95 italic sm:text-2xl">
                The caldera, from the terrace at Room 9
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-3 lg:mt-20 lg:gap-x-14">
          {OUTINGS.map((outing, i) => (
            <Reveal key={outing.title} delay={0.08 * i}>
              <a href="#reserve" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                  <Image
                    src={outing.src}
                    alt={outing.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    style={{ objectPosition: outing.position }}
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:scale-[1.06]"
                  />
                </div>

                <p className="data-label mt-6 text-marine">{outing.meta}</p>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight text-ink">
                  {outing.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-muted">
                  {outing.note}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-ink">
                  Arrange it
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
