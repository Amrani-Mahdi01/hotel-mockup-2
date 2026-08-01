"use client";

import { useSyncExternalStore } from "react";

/** Front-desk board: what the water is doing today. */
const READINGS = [
  { label: "Sea", value: "24°" },
  { label: "Air", value: "27°" },
  { label: "Meltemi", value: "9 kn" },
];

const athensClock = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Athens",
  hour12: false,
});

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};

// Stable within the minute, so React's Object.is check settles immediately.
const getSnapshot = () => athensClock.format(new Date());

// The server has no business guessing the clock — it renders the placeholder.
const getServerSnapshot = () => null;

function useAthensTime() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type Tone = "light" | "dark";

export function SeaConditionsStrip({ tone = "dark" }: { tone?: Tone }) {
  const time = useAthensTime();
  const light = tone === "light";

  return (
    <div
      className="reveal-fade"
      style={{ "--d": "1.05s" } as React.CSSProperties}
    >
      <span
        className={`data-label mb-3 block ${light ? "text-white/55" : "text-muted"}`}
      >
        Today at the house
      </span>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {READINGS.map((r) => (
          <span
            key={r.label}
            className={`data-label whitespace-nowrap ${light ? "text-white/90" : "text-ink"}`}
          >
            {r.label}{" "}
            <span className={light ? "text-sky-200" : "text-marine"}>
              {r.value}
            </span>
          </span>
        ))}
        <span
          aria-hidden
          className={`h-5 w-px shrink-0 ${light ? "bg-white/30" : "bg-rule"}`}
        />
        <span
          className={`data-label whitespace-nowrap ${light ? "text-white/55" : "text-muted"}`}
        >
          {time ? `${time} EEST` : "—— EEST"}
        </span>
      </div>
    </div>
  );
}
