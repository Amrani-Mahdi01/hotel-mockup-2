"use client";

export type Party = { adults: number; children: number };

const LIMITS = {
  adults: { min: 1, max: 4 },
  children: { min: 0, max: 3 },
} as const;

export function describeParty({ adults, children }: Party) {
  const a = `${adults} ${adults === 1 ? "adult" : "adults"}`;
  if (!children) return a;
  return `${a} · ${children} ${children === 1 ? "child" : "children"}`;
}

function Stepper({
  label,
  note,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  note: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="text-[1.0625rem] text-ink">{label}</p>
        <p className="data-label mt-1 whitespace-nowrap text-muted">{note}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`One fewer ${label.toLowerCase()}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
        >
          <span aria-hidden>−</span>
        </button>

        <span
          aria-live="polite"
          className="w-6 text-center font-data text-[1.0625rem] text-ink tabular-nums"
        >
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`One more ${label.toLowerCase()}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
        >
          <span aria-hidden>+</span>
        </button>
      </div>
    </div>
  );
}

export function GuestsPanel({
  party,
  onChange,
  onDone,
}: {
  party: Party;
  onChange: (p: Party) => void;
  onDone: () => void;
}) {
  return (
    <div className="pop absolute right-0 bottom-full z-40 mb-4 w-[min(92vw,22rem)] border border-rule bg-paper p-5 shadow-[0_28px_60px_-28px_rgba(7,36,62,0.5)] sm:p-6 lg:right-auto lg:left-0">
      <Stepper
        label="Adults"
        note="Aged 13 and over"
        value={party.adults}
        min={LIMITS.adults.min}
        max={LIMITS.adults.max}
        onChange={(adults) => onChange({ ...party, adults })}
      />

      <div className="h-px bg-rule" />

      <Stepper
        label="Children"
        note="Aged 12 and under"
        value={party.children}
        min={LIMITS.children.min}
        max={LIMITS.children.max}
        onChange={(children) => onChange({ ...party, children })}
      />

      <div className="mt-2 flex items-center justify-between border-t border-rule pt-4">
        <p className="data-label text-muted">Four guests to a room</p>
        <button
          type="button"
          onClick={onDone}
          className="nav-link relative text-[0.875rem] text-ink"
        >
          Done
        </button>
      </div>
    </div>
  );
}
