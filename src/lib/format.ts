const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/**
 * Format a date for display.
 * - null / undefined / invalid string → ''
 * - bare date 'YYYY-MM-DD' → 'D MONTHNAME YYYY'  (e.g. 1 October 2026)
 * - ISO timestamptz '2026-09-09T04:20:09.123+00:00' → parsed in Asia/Riyadh → 'D MONTHNAME YYYY'
 *   Using Asia/Riyadh because the business operates in Saudi Arabia; a timestamp after 21:00 UTC
 *   would roll to the next calendar day in UTC but should stay on the same business day here.
 */
export function fmtDate(value: string | Date | null | undefined): string {
  if (value == null) return '';

  if (value instanceof Date) {
    if (isNaN(value.getTime())) return '';
    return `${value.getDate()} ${MONTHS[value.getMonth()]} ${value.getFullYear()}`;
  }

  if (typeof value !== 'string') return '';

  // Timestamptz: contains T → parse as full ISO with timezone
  if (value.includes('T')) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Riyadh',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  }

  // Bare date: YYYY-MM-DD — extract parts directly
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  const [, year, month, day] = match;
  const idx = parseInt(month, 10) - 1;
  if (idx < 0 || idx > 11) return '';
  return `${parseInt(day, 10)} ${MONTHS[idx]} ${year}`;
}
