import Image from "next/image";
import { Reveal } from "./reveal";

const ROOMS = [
  {
    number: "02",
    name: "Anemos",
    spec: "Caldera view · 26 m² · Queen bed",
    rate: "280",
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80",
    alt: "A white bed dressed in linen with deep blue cushions",
  },
  {
    number: "05",
    name: "Thalassa",
    spec: "Sea view · 32 m² · King bed",
    rate: "340",
    src: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1600&q=80",
    alt: "A pale room with white linen on a low wooden bed",
  },
  {
    number: "07",
    name: "Kyma",
    spec: "Sitting room · 44 m² · King bed",
    rate: "460",
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
    alt: "A quiet sitting room in pale blue-grey with a linen sofa",
  },
  {
    number: "09",
    name: "Ouranós",
    spec: "Private terrace & pool · 58 m²",
    rate: "620",
    src: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1600&q=80",
    alt: "A white house above a still blue pool",
  },
];

export function RoomsSection() {
  return (
    <section id="rooms" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">The rooms</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              Nine rooms,
              <br />
              no two <em className="text-marine italic">alike</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              Whitewashed walls, linen from Náxos, and shutters closed against
              the afternoon. Four of the nine are shown here; the rest are best
              seen in person.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:gap-x-14">
          {ROOMS.map((room, i) => (
            <Reveal
              key={room.number}
              delay={i % 2 === 1 ? 0.12 : 0}
              className={i % 2 === 1 ? "sm:mt-20 lg:mt-28" : ""}
            >
              <a href="#reserve" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={room.src}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 45vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:scale-[1.06]"
                  />
                </div>

                <div className="mt-6 flex items-end justify-between gap-6 border-b border-rule pb-4">
                  <div>
                    <span className="data-label text-marine">
                      Room {room.number}
                    </span>
                    <h3 className="mt-2 font-display text-[1.75rem] leading-none text-ink">
                      {room.name}
                    </h3>
                  </div>
                  <span className="data-label whitespace-nowrap text-muted">
                    from €{room.rate}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <p className="data-label text-muted">{room.spec}</p>
                  <span className="inline-flex items-center gap-2 text-[0.9375rem] text-ink">
                    See the room
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border-t border-rule pt-8">
          <a
            href="#reserve"
            className="nav-link relative inline-flex items-center gap-3 font-display text-xl text-ink"
          >
            All nine rooms
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
