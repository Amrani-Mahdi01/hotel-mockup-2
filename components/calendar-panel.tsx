"use client";

import { useState } from "react";
import {
  WEEKDAYS,
  addMonths,
  formatFull,
  formatMonthYear,
  formatRange,
  isBefore,
  isSameDay,
  monthGrid,
  nightsBetween,
  startOfDay,
  startOfMonth,
} from "@/lib/dates";

type Props = {
  arrive: Date | null;
  depart: Date | null;
  onPick: (day: Date) => void;
  onClear: () => void;
};

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export function CalendarPanel({ arrive, depart, onPick, onClear }: Props) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => startOfMonth(arrive ?? today));
  const [hovered, setHovered] = useState<Date | null>(null);

  // While picking the second date, preview the range under the cursor.
  const previewEnd = depart ?? (arrive && hovered && !isBefore(hovered, arrive) ? hovered : null);

  const inRange = (day: Date) => {
    if (!arrive || !previewEnd) return false;
    const t = day.getTime();
    return t > startOfDay(arrive).getTime() && t < startOfDay(previewEnd).getTime();
  };

  const months = [view, addMonths(view, 1)];
  const nights = arrive && depart ? nightsBetween(arrive, depart) : 0;

  return (
    <div className="pop absolute bottom-full left-0 z-40 mb-4 w-[min(92vw,21rem)] border border-rule bg-paper p-5 shadow-[0_28px_60px_-28px_rgba(7,36,62,0.5)] sm:w-[38rem] sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <NavButton
          label="Previous month"
          onClick={() => setView(addMonths(view, -1))}
          disabled={!isBefore(startOfMonth(today), view)}
        >
          <span aria-hidden>←</span>
        </NavButton>

        <div className="flex flex-1 justify-around px-3">
          {months.map((m, i) => (
            <p
              key={m.toISOString()}
              aria-live="polite"
              className={`font-display text-lg text-ink ${i === 1 ? "hidden sm:block" : ""}`}
            >
              {formatMonthYear(m)}
            </p>
          ))}
        </div>

        <NavButton label="Next month" onClick={() => setView(addMonths(view, 1))}>
          <span aria-hidden>→</span>
        </NavButton>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {months.map((month, mi) => (
          <div key={month.toISOString()} className={mi === 1 ? "hidden sm:block" : ""}>
            <div className="mb-2 grid grid-cols-7">
              {WEEKDAYS.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  aria-hidden
                  className="data-label py-1 text-center text-muted"
                >
                  {w}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {monthGrid(month).map((day, i) => {
                if (!day) return <span key={i} />;

                const past = isBefore(day, today);
                const isArrive = arrive ? isSameDay(day, arrive) : false;
                const isEnd = previewEnd ? isSameDay(day, previewEnd) : false;
                const edge = isArrive || isEnd;
                const between = inRange(day);

                // Half-bands under the endpoints so the stay reads as one run.
                const band = between
                  ? "inset-x-0"
                  : isArrive && previewEnd
                    ? "left-1/2 right-0"
                    : isEnd && arrive
                      ? "left-0 right-1/2"
                      : null;

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={past}
                    onClick={() => onPick(day)}
                    onMouseEnter={() => setHovered(day)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={formatFull(day)}
                    aria-pressed={edge}
                    className="group relative flex h-10 items-center justify-center text-[0.9375rem] text-ink disabled:pointer-events-none disabled:text-muted/30"
                  >
                    {band && (
                      <span
                        aria-hidden
                        className={`absolute inset-y-0.5 bg-mist ${band}`}
                      />
                    )}
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
                        edge
                          ? "bg-ink text-paper"
                          : "group-hover:bg-marine/10 group-hover:text-marine"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
        <p className="data-label text-muted">
          {arrive && depart ? (
            <>
              <span className="text-marine">
                {nights} {nights === 1 ? "night" : "nights"}
              </span>{" "}
              · {formatRange(arrive)} — {formatRange(depart)}
            </>
          ) : arrive ? (
            "Now choose your departure"
          ) : (
            "Choose your arrival"
          )}
        </p>

        <button
          type="button"
          onClick={onClear}
          className="nav-link relative text-[0.875rem] text-ink disabled:opacity-40"
          disabled={!arrive && !depart}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
