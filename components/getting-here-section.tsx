import { Reveal } from "./reveal";

const STOPS = [
  {
    place: "Athens",
    leg: "45 minutes by air",
    note: "Six or seven flights a day in summer, two in winter.",
  },
  {
    place: "Santoríni airport (JTR)",
    leg: "25 minutes by car",
    note: "We meet every flight. There is no need to book anything yourself.",
  },
  {
    place: "Oía",
    leg: "the last 60 metres on foot",
    note: "Cars stop at the top of the lane. Everything past that is steps.",
  },
  {
    place: "Alkyoní",
    leg: null,
    note: "Blue door, third on the left, below the bell tower.",
  },
];

const NOTES = [
  {
    title: "Transfers",
    body: "Send your arrival time when you book and a car will be waiting with your name on it. There is no charge for this.",
  },
  {
    title: "The large case",
    body: "The lane is stepped and narrow. Leave anything heavy at the top and Stélios will bring it down before you have found your room.",
  },
  {
    title: "By sea",
    body: "The port at Athiniós is thirty-five minutes away by road. High-speed boats from Piraeus take about five hours.",
  },
  {
    title: "Parking",
    body: "Two spaces at the top of the lane, kept for guests. Ask for one when you book — in August they go quickly.",
  },
];

export function GettingHereSection() {
  return (
    <section id="getting-here" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">Getting here</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              Further than it looks,
              <br />
              closer than you <em className="text-marine italic">fear</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              Most guests are at the house within the hour of landing on the
              island. The last stretch is the only part you do on foot.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* The route, as a diagram */}
          <Reveal className="lg:col-span-5">
            <ol>
              {STOPS.map((stop, i) => {
                const last = i === STOPS.length - 1;
                return (
                  <li key={stop.place} className="relative pl-10 pb-10 last:pb-0">
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute top-4 bottom-0 left-[5px] w-px bg-rule"
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute top-[7px] left-0 h-[11px] w-[11px] rounded-full border border-marine ${
                        last ? "bg-marine" : "bg-mist"
                      }`}
                    />
                    <h3 className="font-display text-[1.5rem] leading-none text-ink">
                      {stop.place}
                    </h3>
                    <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-muted">
                      {stop.note}
                    </p>
                    {stop.leg && (
                      <p className="data-label mt-4 text-marine">↓ {stop.leg}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Practical notes */}
          <div className="lg:col-span-6 lg:col-start-7">
            {NOTES.map((note, i) => (
              <Reveal key={note.title} delay={0.06 * i}>
                <div
                  className={`py-7 ${i === 0 ? "pt-0" : "border-t border-rule"}`}
                >
                  <h3 className="data-label text-marine">{note.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[1.0625rem] leading-[1.75] text-muted">
                    {note.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
