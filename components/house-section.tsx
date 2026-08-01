import Image from "next/image";
import { Reveal } from "./reveal";

// Verified: cascading whitewashed Oía terraces above a flat, very deep navy sea.
const TERRACES =
  "https://images.unsplash.com/photo-1618500031461-a5fc01e96763?auto=format&fit=crop&w=1400&q=80";

// Verified: a whitewashed courtyard corner, pale-blue urns, large empty wall.
const COURTYARD =
  "https://images.unsplash.com/photo-1607621623218-ac6c8fce5597?auto=format&fit=crop&w=2400&q=80";

const HISTORY = [
  {
    year: "1968",
    note: "Eléni’s grandmother lets the first two rooms to a couple whose boat never came.",
  },
  {
    year: "1984",
    note: "The terrace is cut into the rock. It takes two summers and most of the family’s savings.",
  },
  {
    year: "2007",
    note: "Yánnis arrives to cook for one season and does not leave.",
  },
  {
    year: "2019",
    note: "The last three rooms are rebuilt. The house stops at nine, deliberately.",
  },
];

export function HouseSection() {
  return (
    <section id="house" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">The house</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              One family,
              <br />
              since <em className="text-marine italic">1968</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              Alkyoní was a fisherman&rsquo;s house before it was anything else.
              It has been added to, whitewashed and argued over by three
              generations, and it has never had more than nine rooms.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-paper">
              <Image
                src={TERRACES}
                alt="Whitewashed terraces stepping down toward a deep navy sea"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <Reveal>
              <p className="max-w-[46ch] text-[1.0625rem] leading-[1.8] text-muted">
                Nothing about the place is designed. The rooms are the shapes
                the rock allowed, the terrace is where the goats used to stand,
                and the blue on the doors is mixed by hand each spring because
                that is how it has always been done.
              </p>
            </Reveal>

            <ol className="mt-12 border-t border-rule">
              {HISTORY.map((entry, i) => (
                // Reveal renders the <li> itself — an <ol> may only contain <li>.
                <Reveal
                  as="li"
                  key={entry.year}
                  delay={0.06 * i}
                  className="flex items-baseline gap-8 border-b border-rule py-6"
                >
                  <span className="font-display text-[1.5rem] leading-none text-marine tabular-nums">
                    {entry.year}
                  </span>
                  <span className="max-w-[44ch] text-[0.9375rem] leading-[1.7] text-muted">
                    {entry.note}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* The courtyard, with the only thing the family will say about business */}
      <Reveal className="mt-20 lg:mt-28">
        <figure className="relative aspect-[4/3] w-full overflow-hidden bg-paper sm:aspect-[21/9]">
          <Image
            src={COURTYARD}
            alt="A whitewashed courtyard with a low bench and two pale blue urns"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,36,62,0.72)_0%,rgba(7,36,62,0.45)_45%,rgba(7,36,62,0.08)_80%)]"
          />
          <figcaption className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
              <blockquote className="max-w-[22ch] font-display text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.15] text-white">
                We have never advertised. People are sent by other people, and
                that is the whole business.
              </blockquote>
              <p className="data-label mt-6 text-white/70">
                Eléni Marínou · third generation
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
