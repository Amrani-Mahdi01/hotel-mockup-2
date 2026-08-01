import { Reveal } from "./reveal";

const ENTRIES = [
  {
    date: "14 July 2026",
    strand: "The house",
    title: "What the meltemi does to the awnings",
    excerpt:
      "Three summers of trial and error, and the answer turned out to be rope rather than steel.",
    read: "4 min",
  },
  {
    date: "2 June 2026",
    strand: "The table",
    title: "Yánnis on cooking without a menu",
    excerpt:
      "Our cook of nineteen years explains why he has never once written the same dinner twice.",
    read: "7 min",
  },
  {
    date: "19 April 2026",
    strand: "The island",
    title: "Where to swim before the season starts",
    excerpt:
      "Four bays that stay empty until the middle of June, and how long each takes to reach.",
    read: "5 min",
  },
  {
    date: "3 March 2026",
    strand: "The house",
    title: "Repainting, as we do every spring",
    excerpt:
      "Two weeks of whitewash, and the reason the blue on the doors is mixed by hand.",
    read: "3 min",
  },
];

export function JournalSection() {
  return (
    <section id="journal" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">Journal</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              Notes from the
              <br />
              <em className="text-marine italic">house</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              We write when there is something worth saying — a repair, a
              recipe, a bay that is still empty. Four of the most recent are
              below.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-rule lg:mt-24">
          {ENTRIES.map((entry, i) => (
            <li key={entry.title}>
              <Reveal delay={0.06 * i}>
                <a
                  href="#journal"
                  className="group grid items-baseline gap-x-8 gap-y-3 border-b border-rule py-8 transition-colors duration-300 hover:bg-mist/70 lg:grid-cols-12 lg:py-10"
                >
                  <div className="flex items-center gap-4 lg:col-span-3 lg:pl-4">
                    <span className="data-label text-muted">{entry.date}</span>
                    <span aria-hidden className="h-3 w-px bg-rule" />
                    <span className="data-label text-marine">
                      {entry.strand}
                    </span>
                  </div>

                  <div className="lg:col-span-6">
                    <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,0.72,0.16,1)] lg:group-hover:translate-x-2">
                      {entry.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-muted">
                      {entry.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 lg:col-span-3 lg:justify-end lg:pr-4">
                    <span className="data-label text-muted">{entry.read}</span>
                    <span
                      aria-hidden
                      className="text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12">
          <a
            href="#journal"
            className="nav-link relative inline-flex items-center gap-3 font-display text-xl text-ink"
          >
            Every entry
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
