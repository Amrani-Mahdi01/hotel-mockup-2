import { Reveal } from "./reveal";

const ITEMS = [
  {
    q: "When can we arrive, and when must we leave?",
    a: "Rooms are ready from 15:00 and we ask that you leave them by 11:00. If your flight is late in the day, leave your bags with us and use the terrace — most people do.",
  },
  {
    q: "What is included in the rate?",
    a: "Breakfast on the terrace, the transfer from the airport, water, and the wifi. Dinner and the boat are charged separately. There is no resort fee, because there is no resort.",
  },
  {
    q: "Can we bring children?",
    a: "Yes, though you should know the house is built on a cliff and the lanes are stepped. Rooms 7 and 9 take an extra bed. We do not have cots for infants.",
  },
  {
    q: "Are dogs welcome?",
    a: "In Rooms 2 and 9 only, and there is a charge of €25 a night for the extra cleaning. Tell us in advance — we will have a bowl and a bed waiting.",
  },
  {
    q: "How do cancellations work?",
    a: "Cancel more than fourteen days before you arrive and we refund everything. Inside fourteen days we keep the first night. In August the deposit is non-refundable whenever you cancel.",
  },
  {
    q: "Is the house accessible?",
    a: "Honestly, not very. Sixty metres of steps lead down to the door and every room is reached by more of them. Room 2 is the closest to the entrance, with four steps. Please call us before booking and we will tell you plainly whether it will work.",
  },
  {
    q: "How do we pay?",
    a: "Cards and bank transfer. We take a deposit of one night when you book and the rest when you leave.",
  },
];

export function GoodToKnowSection() {
  return (
    <section id="good-to-know" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-marine" />
              <span className="data-label text-marine">Good to know</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              The answers, before
              <br />
              you have to <em className="text-marine italic">ask</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[42ch] text-[1.0625rem] leading-[1.75] text-muted">
              If something here is not covered, telephone the house. Someone who
              actually works here will answer.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-rule lg:mt-24">
          {ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={0.04 * i}>
              {/* Native details/summary — keyboard and screen-reader behaviour
                  comes free, and it works with JavaScript switched off. */}
              <details className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 transition-colors duration-300 hover:text-marine [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-snug text-ink transition-colors group-hover:text-marine">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-marine transition-transform duration-400 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-open:rotate-45"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-8 text-[1.0625rem] leading-[1.8] text-muted">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
