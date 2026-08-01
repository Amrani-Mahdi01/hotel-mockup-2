import Image from "next/image";
import { Reveal } from "./reveal";

// Verified: a plain white iron canopy alone on an empty terrace facing the
// caldera — no warm elements anywhere in frame.
const ARCH =
  "https://images.unsplash.com/photo-1572386398171-d85ba0bec55a?auto=format&fit=crop&w=1400&q=80";

// Verified: rows of white tables and chairs on a waterfront terrace, turquoise
// sea, a whitewashed town across the bay.
const TABLES =
  "https://images.unsplash.com/photo-1783970864508-e8fc2e479bec?auto=format&fit=crop&w=2400&q=80";

const TERMS = [
  { label: "The whole house", value: "Nine rooms, sleeps twenty" },
  { label: "On the terrace", value: "Up to sixty at one table" },
  { label: "Minimum stay", value: "Three nights" },
  { label: "How often", value: "One party a week, at most" },
];

export function WeddingsSection() {
  return (
    <section id="weddings" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">
                Weddings &amp; private hire
              </span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              Take the whole
              <br />
              <em className="text-marine italic">house</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              For three nights or more we let Alkyoní to one party only. Twenty
              people sleep here; sixty can eat on the terrace.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-paper">
              <Image
                src={ARCH}
                alt="A plain white iron canopy standing alone on a terrace above the caldera"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <dl className="border-t border-rule">
              {TERMS.map((term, i) => (
                <Reveal key={term.label} delay={0.06 * i}>
                  {/* Stack on mobile so short pairs don't share a line while
                      longer ones wrap — the row only reads as a list if it is
                      consistent. */}
                  <div className="flex flex-col gap-1 border-b border-rule py-6 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8">
                    <dt className="data-label text-muted">{term.label}</dt>
                    <dd className="font-display text-[1.375rem] leading-none text-ink">
                      {term.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.24}>
              <p className="mt-10 max-w-[48ch] text-[1.0625rem] leading-[1.8] text-muted">
                Eléni handles every booking herself. There is no events company
                and no package — tell her what you have in mind and she will say
                honestly whether the house can do it.
              </p>

              <a
                href="#reserve"
                className="sweep relative isolate mt-8 inline-block overflow-hidden border border-ink px-8 py-3.5 text-[0.8125rem] tracking-[0.12em] uppercase transition-colors duration-300 hover:text-paper focus-visible:text-paper"
              >
                <span className="relative z-10">Ask about dates</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal className="mt-20 lg:mt-28">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper sm:aspect-[3/1]">
          <Image
            src={TABLES}
            alt="Rows of white tables and chairs set out on a waterfront terrace above turquoise sea"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
