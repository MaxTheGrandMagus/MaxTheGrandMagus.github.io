// @ts-check

const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** @param {string} ym 'YYYY-MM' */
function toIndex(ym) {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

function nowIndex() {
  const d = new Date();
  return d.getUTCFullYear() * 12 + d.getUTCMonth();
}

/** @param {string | null} ym */
export function formatMonth(ym) {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return monthFormat.format(new Date(Date.UTC(y, m - 1, 1)));
}

/** Months between two 'YYYY-MM' dates, both months included. */
export function monthsBetween(/** @type {string} */ start, /** @type {string | null} */ end) {
  return (end ? toIndex(end) : nowIndex()) - toIndex(start) + 1;
}

/** 14 → "1 yr 2 mo" */
export function formatDuration(/** @type {number} */ months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(' ');
}

/** Full years since 'YYYY-MM'. */
export function yearsSince(/** @type {string} */ start) {
  return Math.floor((nowIndex() - toIndex(start)) / 12);
}

/** A time zone's current UTC offset: 'Asia/Bishkek' → "UTC+6"; '' for an unknown zone. */
export function utcOffset(/** @type {string} */ timeZone) {
  try {
    const name = new Intl.DateTimeFormat('en', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(new Date())
      .find((p) => p.type === 'timeZoneName')?.value;
    return name ? name.replace('GMT', 'UTC') : '';
  } catch {
    return '';
  }
}
