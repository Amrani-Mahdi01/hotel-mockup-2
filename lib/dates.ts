export const DAY_MS = 86_400_000;

export const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const startOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), 1);

export const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isBefore = (a: Date, b: Date) =>
  startOfDay(a).getTime() < startOfDay(b).getTime();

export const nightsBetween = (a: Date, b: Date) =>
  Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY_MS);

/**
 * Six weeks of cells for one month, Monday first, padded with nulls so every
 * month renders at the same height and the popover never jumps.
 */
export function monthGrid(month: Date): (Date | null)[] {
  const year = month.getFullYear();
  const m = month.getMonth();
  const offset = (new Date(year, m, 1).getDay() + 6) % 7; // Monday-first
  const days = new Date(year, m + 1, 0).getDate();

  const cells: (Date | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, m, d));
  while (cells.length < 42) cells.push(null);
  return cells;
}

export const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const monthYearFmt = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

const triggerFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const fullFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const rangeFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

export const formatMonthYear = (d: Date) => monthYearFmt.format(d);
export const formatTrigger = (d: Date) => triggerFmt.format(d);
export const formatFull = (d: Date) => fullFmt.format(d);
export const formatRange = (d: Date) => rangeFmt.format(d);
