import Image from "next/image";
import { Reveal } from "./reveal";

// Verified: a Greek meze spread on white linen, on porcelain with a cobalt
// Greek-key border — the closest thing to the site palette in the whole set.
const MEZE =
  "https://images.unsplash.com/photo-1783455442171-16dbde079c53?auto=format&fit=crop&w=1400&q=80";

// Verified: crystal and silver on pale blue-white linen, dappled daylight.
const SETTING =
  "https://images.unsplash.com/photo-1586718520704-f7f9db04b8c0?auto=format&fit=crop&w=2000&q=80";

const SERVICES = [
  {
    name: "Breakfast",
    hours: "08:00 — 10:30",
    note: "Yoghurt, thyme honey, figs, and eggs if you ask for them.",
  },
  {
    name: "Lunch",
    hours: "13:00 — 15:30",
    note: "Cold, light, and mostly out of the garden behind the house.",
  },
  {
    name: "Dinner",
    hours: "From 19:30",
    note: "Four courses, one menu, written that morning.",
  },
];

export function TableSection() {
  return (
    <section id="table" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">The table</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              One menu, written
              <br />
              each <em className="text-marine italic">morning</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              Yánnis cooks what the boats bring in and what the garden gives up
              that day. Nothing is printed in advance. Dinner begins at half
              past seven and ends when it ends.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper lg:aspect-[4/5]">
              <Image
                src={MEZE}
                alt="A spread of small dips on white linen, on plates edged with a cobalt Greek-key border"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:self-center">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} delay={0.08 * i}>
                {/* Each div is the only child of its Reveal, so `first:` would
                    match them all — key the top rule off the index instead. */}
                <div
                  className={`py-7 lg:py-8 ${i === 0 ? "pt-0" : "border-t border-rule"}`}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[1.75rem] leading-none text-ink">
                      {service.name}
                    </h3>
                    <span className="data-label whitespace-nowrap text-marine">
                      {service.hours}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-muted">
                    {service.note}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="border-t border-rule pt-8">
                <a
                  href="#reserve"
                  className="group inline-flex items-center gap-3 font-display text-xl text-ink"
                >
                  This week&rsquo;s menu
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* A wide detail band, run to the edges of the page */}
      <Reveal className="mt-20 lg:mt-28">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-paper sm:aspect-[3/1]">
          <Image
            src={SETTING}
            alt="Crystal glasses and silver laid on pale blue-white linen in dappled sunlight"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
