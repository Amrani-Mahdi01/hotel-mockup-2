import { NewsletterForm } from "./newsletter-form";
import { Reveal } from "./reveal";

const COLUMNS = [
  {
    title: "Visit",
    lines: ["Ypapantís", "Oía 847 02", "Santoríni, Greece"],
  },
  {
    title: "Reach",
    lines: ["+30 22860 71 204", "stay@alkyoni.gr"],
  },
  {
    title: "Hours",
    lines: ["Check-in from 15:00", "Check-out by 11:00", "Dinner from 19:30"],
  },
];

const FOLLOW = [
  { label: "Instagram", href: "#journal" },
  { label: "Journal", href: "#journal" },
];

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* Closing invitation */}
        <Reveal className="flex flex-col gap-8 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-[20ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.01em]">
            Rooms from €280, breakfast on the{" "}
            <em className="text-sky-200 italic">terrace</em>.
          </p>
          <a
            href="#reserve"
            className="sweep sweep-light relative isolate shrink-0 self-start overflow-hidden border border-white/40 px-10 py-4 text-[0.8125rem] tracking-[0.12em] uppercase transition-colors duration-300 hover:text-ink focus-visible:text-ink lg:self-auto"
          >
            <span className="relative z-10">Reserve a room</span>
          </a>
        </Reveal>

        <div className="h-px bg-white/15" />

        {/* Details. The outer grid stays single-column until lg: pairing it with
            the inner 3-column grid at the same sm breakpoint squeezed the contact
            columns to ~60px and overprinted the email address. */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <NewsletterForm />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="data-label text-white/65">{col.title}</h3>
                <ul className="mt-4 space-y-2">
                  {col.lines.map((line) => (
                    <li key={line} className="text-[0.9375rem] text-white/80">
                      {line}
                    </li>
                  ))}
                </ul>

                {col.title === "Reach" && (
                  <>
                    <h3 className="data-label mt-8 text-white/65">Follow</h3>
                    <ul className="mt-4 space-y-2">
                    {FOLLOW.map((f) => (
                      <li key={f.label}>
                        <a
                          href={f.href}
                          className="nav-link relative text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                        >
                          {f.label}
                        </a>
                      </li>
                    ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The mark, set as a watermark across the base of the page */}
        {/* Padding in em so it scales with the clamped size — a fixed pt-6
            sheared the acute accent off the Í at large viewports. */}
        <div aria-hidden className="overflow-hidden">
          <p className="pt-[0.22em] font-display text-[clamp(3.5rem,15.5vw,14rem)] leading-[0.85] tracking-[0.08em] whitespace-nowrap text-white/[0.09]">
            ALKYONÍ
          </p>
        </div>

        <div className="h-px bg-white/15" />

        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="data-label text-white/60">
            © 2026 Alkyoní — Oía, Santoríni
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <li key={item}>
                <a
                  href="#top"
                  className="nav-link data-label relative text-white/60 transition-colors hover:text-white/80"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
