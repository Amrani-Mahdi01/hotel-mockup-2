import { Reveal } from "./reveal";

const SHORTER = [
  {
    quote:
      "Yánnis asked what we didn't eat, then never asked again. Every dinner was different and every one was right.",
    name: "Priya",
    from: "London · June 2026",
  },
  {
    quote:
      "They lent us the boat and a map drawn on the back of a receipt. Best day of the year.",
    name: "Tomás",
    from: "Lisbon · May 2026",
  },
  {
    quote:
      "Nine rooms means they know your name by the second morning. That is the whole point of the place.",
    name: "Marianne",
    from: "Lyon · September 2025",
  },
];

export function GuestWordsSection() {
  return (
    <section className="on-ink bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-sky-200/70" />
            <span className="data-label text-sky-200">Guest words</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mt-10 lg:mt-14">
            <blockquote className="max-w-[24ch] font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.06] tracking-[-0.015em]">
              We came for four nights and changed our flights{" "}
              <em className="text-sky-200 italic">twice</em>.
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="data-label text-white/80">Clara &amp; Jonas</span>
              <span aria-hidden className="h-3 w-px bg-white/25" />
              <span className="data-label text-white/65">
                Copenhagen · July 2026
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-20 grid gap-x-12 gap-y-12 border-t border-white/15 pt-14 sm:grid-cols-3 lg:mt-24">
          {SHORTER.map((entry, i) => (
            <Reveal key={entry.name} delay={0.08 * i}>
              <figure>
                <blockquote className="text-[1.0625rem] leading-[1.75] text-white/80">
                  {entry.quote}
                </blockquote>
                <figcaption className="mt-6">
                  <span className="data-label block text-white/80">
                    {entry.name}
                  </span>
                  <span className="data-label mt-1 block text-white/60">
                    {entry.from}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
