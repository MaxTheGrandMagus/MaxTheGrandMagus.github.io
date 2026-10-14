// @ts-check
import { canAnimate } from './motion.js';

/**
 * Blocks below the fold rise in as they scroll into view (styles in styles/motion.css).
 * Blocks already on screen at load are left alone, so nothing above the fold flashes.
 * @param {Iterable<Element>} blocks
 */
export function initReveal(blocks) {
  if (!canAnimate() || !('IntersectionObserver' in window)) return;

  const below = [...blocks].filter((el) => el.getBoundingClientRect().top > innerHeight * 0.95);
  below.forEach((el) => el.classList.add('is-hidden'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          const el = /** @type {HTMLElement} */ (entry.target);
          el.style.transitionDelay = `${i * 60}ms`;
          el.classList.add('is-shown');
          observer.unobserve(el);
        });
    },
    // No negative bottom margin: blocks at the very end of the page must reveal even when it can't scroll further.
    { threshold: 0.08 },
  );
  below.forEach((el) => observer.observe(el));
}
