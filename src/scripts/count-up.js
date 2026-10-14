// @ts-check
import { canAnimate } from './motion.js';

const SECONDS = /** @type {Record<string, number>} */ ({ s: 1, min: 60, h: 3600 });
const DURATION = 1100;

/** "25 min" → { n: 25, gap: ' ', unit: 'min', decimals: 0 }; null for words like "Vue 3". */
function parse(/** @type {string} */ text) {
  const m = text.trim().match(/^(\d+(?:\.\d+)?)(\s*)(%|×|s|min|h)?$/);
  return m ? { n: Number(m[1]), gap: m[2], unit: m[3] ?? '', decimals: (m[1].split('.')[1] ?? '').length } : null;
}

const easeOut = (/** @type {number} */ t) => 1 - (1 - t) ** 3;

/**
 * Results that animate as they scroll into view: the old value gets struck through (CSS, on .is-in) and the new one
 * counts from the old: 25 → 2 min, 600 → 90 s, 1 → 8×, 0 → 99.9%. Words ("Vue 3") fade in instead.
 *
 * Each item needs [data-after] (the new value) and may have [data-before] (the old one).
 * @param {Iterable<Element>} items
 */
export function initCountUp(items) {
  if (!canAnimate() || !('IntersectionObserver' in window)) return;

  /** @type {WeakMap<Element, () => void>} */
  const counters = new WeakMap();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        entry.target.classList.add('is-in');
        const count = counters.get(entry.target);
        if (count) window.setTimeout(count, 220);
      }
    },
    { threshold: 0.5 },
  );

  for (const item of items) {
    const after = item.querySelector('[data-after]');
    const node = after && [...after.childNodes].reverse().find((n) => n.nodeType === 3 && n.textContent?.trim());
    if (!after || !node) continue;
    item.classList.add('is-animated');

    const final = node.textContent?.trim() ?? '';
    const to = parse(final);
    const before = parse(item.querySelector('[data-before]')?.textContent ?? '');

    // Where the count starts: the old value in the new unit, 0 for percentages, 1 for multipliers.
    let from = null;
    if (to && before && to.unit in SECONDS && before.unit in SECONDS) {
      from = (before.n * SECONDS[before.unit]) / SECONDS[to.unit];
    } else if (to?.unit === '%') from = 0;
    else if (to?.unit === '×') from = 1;

    if (to && from !== null) {
      // Screen readers and print keep the final value; the counting copy is decorative.
      const finalCopy = document.createElement('span');
      finalCopy.className = 'sr-only count-final';
      finalCopy.textContent = final;
      const shown = document.createElement('span');
      shown.className = 'count';
      shown.setAttribute('aria-hidden', 'true');
      const start = from;
      const format = (/** @type {number} */ v) => `${v.toFixed(to.decimals)}${to.gap}${to.unit}`;
      shown.textContent = format(start);
      node.replaceWith(finalCopy, shown);

      counters.set(item, () => {
        const began = performance.now();
        const step = (/** @type {number} */ now) => {
          const t = Math.min(1, (now - began) / DURATION);
          shown.textContent = t < 1 ? format(start + (to.n - start) * easeOut(t)) : final;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    } else {
      after.classList.add('is-waiting');
    }
    observer.observe(item);
  }
}
