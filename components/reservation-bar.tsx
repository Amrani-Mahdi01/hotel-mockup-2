"use client";

import { useCallback, useState } from "react";
import { CalendarPanel } from "./calendar-panel";
import { GuestsPanel, describeParty, type Party } from "./guests-panel";
import { useDismiss } from "@/lib/use-dismiss";
import { formatTrigger, isBefore } from "@/lib/dates";

type Field = "arrive" | "depart" | "guests";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function Trigger({
  label,
  value,
  placeholder,
  open,
  onClick,
  delay,
}: {
  label: string;
  value: string | null;
  placeholder: string;
  open: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  delay: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      data-open={open}
      style={{ "--d": delay } as React.CSSProperties}
      className="reveal group flex w-full items-end justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-mist/60 data-[open=true]:bg-mist/60 sm:px-8"
    >
      <span className="min-w-0">
        <span className="data-label mb-2 block text-muted">{label}</span>
        <span
          className={`block truncate text-[1.0625rem] ${value ? "text-ink" : "text-muted"}`}
        >
          {value ?? placeholder}
        </span>
      </span>
      <span className="pb-1.5 text-muted transition-colors group-hover:text-ink">
        <Chevron open={open} />
      </span>
    </button>
  );
}

export function ReservationBar() {
  const [arrive, setArrive] = useState<Date | null>(null);
  const [depart, setDepart] = useState<Date | null>(null);
  const [party, setParty] = useState<Party>({ adults: 2, children: 0 });
  const [field, setField] = useState<Field | null>(null);
  const [placement, setPlacement] = useState<"up" | "down">("up");

  const close = useCallback(() => setField(null), []);

  const datesRef = useDismiss(field === "arrive" || field === "depart", close);
  const guestsRef = useDismiss(field === "guests", close);

  // The rail sits at the foot of the hero, so it is usually near the top of the
  // viewport once you follow a Reserve link — opening upward would put the
  // calendar off-screen. Measure on click; doing it in an effect would mean a
  // setState during render.
  const toggle = (next: Field, e: React.MouseEvent<HTMLButtonElement>) => {
    const { top } = e.currentTarget.getBoundingClientRect();
    setPlacement(top > 500 ? "up" : "down");
    setField((f) => (f === next ? null : next));
  };

  // One calendar drives both ends: first click sets arrival, second departure.
  // The panel stays anchored where it opened so it never jumps mid-selection.
  // `!isBefore(arrive, day)` also catches day === arrive, which previously fell
  // through and booked a zero-night stay.
  const pickDay = (day: Date) => {
    if (!arrive || depart || !isBefore(arrive, day)) {
      setArrive(day);
      setDepart(null);
      return;
    }
    setDepart(day);
    window.setTimeout(close, 260);
  };

  const clearDates = () => {
    setArrive(null);
    setDepart(null);
  };

  const calendar = (
    <CalendarPanel
      arrive={arrive}
      depart={depart}
      onPick={pickDay}
      onClear={clearDates}
      placement={placement}
    />
  );

  return (
    <form
      id="reserve"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Check room availability"
      // Without this the fixed header covers the whole rail when you follow a
      // Reserve link, exactly as it would any other section.
      className="scroll-mt-28"
    >
      <div
        className="rule-draw h-px w-full bg-rule"
        style={{ "--d": "0.95s" } as React.CSSProperties}
      />

      <div className="grid grid-cols-1 divide-y divide-rule lg:grid-cols-[1fr_1fr_1fr_auto] lg:divide-x lg:divide-y-0">
        <div ref={datesRef} className="contents">
          <div className="relative">
            <Trigger
              label="Arrive"
              value={arrive ? formatTrigger(arrive) : null}
              placeholder="Select date"
              open={field === "arrive"}
              onClick={(e) => toggle("arrive", e)}
              delay="1s"
            />
            {field === "arrive" && calendar}
          </div>

          <div className="relative">
            <Trigger
              label="Depart"
              value={depart ? formatTrigger(depart) : null}
              placeholder="Select date"
              open={field === "depart"}
              onClick={(e) => toggle("depart", e)}
              delay="1.07s"
            />
            {field === "depart" && calendar}
          </div>
        </div>

        <div ref={guestsRef} className="relative">
          <Trigger
            label="Guests"
            value={describeParty(party)}
            placeholder="Add guests"
            open={field === "guests"}
            onClick={(e) => toggle("guests", e)}
            delay="1.14s"
          />
          {field === "guests" && (
            <GuestsPanel
              party={party}
              onChange={setParty}
              onDone={close}
              placement={placement}
            />
          )}
        </div>

        <div
          className="reveal flex"
          style={{ "--d": "1.21s" } as React.CSSProperties}
        >
          <button
            type="submit"
            disabled={!arrive || !depart}
            className="group flex w-full items-center justify-center gap-3 bg-ink px-10 py-6 text-[0.8125rem] tracking-[0.12em] text-paper uppercase transition-colors duration-300 hover:bg-marine disabled:cursor-not-allowed disabled:bg-ink/45 lg:py-0"
          >
            Check availability
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:translate-x-1.5 group-disabled:translate-x-0"
            >
              →
            </span>
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {arrive && depart
          ? `Arriving ${formatTrigger(arrive)}, departing ${formatTrigger(depart)}, ${describeParty(party)}.`
          : "Choose your dates to check availability."}
      </p>
    </form>
  );
}
