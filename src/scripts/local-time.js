// @ts-check
import { canAnimate } from './motion.js';

/**
 * Live local time in front of the server-rendered UTC offset: "14:32 local time (UTC+6)".
 * With motion allowed, the colon blinks and the minutes roll in when they change.
 * @param {HTMLElement} el an element with data-tz (an IANA time zone) whose text is the UTC offset
 */
export function initLocalTime(el) {
  const timeZone = el.dataset.tz;
  if (!timeZone) return;

  let format;
  try {
    format = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  } catch {
    return; // An unknown time zone keeps the UTC offset.
  }

  const offset = el.textContent?.trim() ?? '';
  const suffix = ` local time${offset ? ` (${offset})` : ''}`;
  let last = '';

  const tick = () => {
    const time = format.format(new Date());
    if (time === last) return;
    if (!canAnimate()) {
      el.textContent = time + suffix;
    } else {
      const [hours, minutes] = time.split(':');
      const rolled = last !== '' && last.slice(3) !== minutes;
      el.innerHTML =
        `<span class="clock-time" aria-hidden="true">${hours}<span class="clock-colon">:</span>` +
        `<span class="clock-min${rolled ? ' is-rolling' : ''}">${minutes}</span></span>` +
        `<span class="sr-only">${time}</span>${suffix}`;
    }
    last = time;
  };

  tick();
  window.setInterval(tick, 1000);
}
