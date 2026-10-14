// @ts-check
import { canAnimate } from './motion.js';

// The current section is the last one whose top has passed this line (a share of the viewport height).
const LINE = 0.31;

/**
 * Scrollspy for the section list: marks the link of the section being read and moves the marker to it
 * (a bar on its left in the profile column, an underline in the mobile tab bar).
 *
 * Expects inside `nav`: links to `#section-id`, [data-section-nav-track] and [data-section-nav-bar];
 * on the page: an element with [data-section-nav-end] (the footer), which selects the last section.
 * @param {HTMLElement} nav
 */
export function initSectionNav(nav) {
  const track = /** @type {HTMLElement | null} */ (nav.querySelector('[data-section-nav-track]'));
  const bar = /** @type {HTMLElement | null} */ (nav.querySelector('[data-section-nav-bar]'));
  if (!track || !bar || !('IntersectionObserver' in window)) return;

  const links = /** @type {HTMLAnchorElement[]} */ ([...nav.querySelectorAll('a[href^="#"]')]);
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))));
  let current = -1;
  let atEnd = false;
  let locked = false;
  let unlock = 0;

  /** Moves the marker to the current link. */
  const place = () => {
    const a = links[current];
    if (!a) return;
    nav.style.setProperty('--nav-x', `${a.offsetLeft}px`);
    nav.style.setProperty('--nav-y', `${a.offsetTop}px`);
    nav.style.setProperty('--nav-w', `${a.offsetWidth}px`);
    nav.style.setProperty('--nav-h', `${a.offsetHeight}px`);
    bar.hidden = false;
  };

  /** In the horizontal tab bar, scrolls the active tab into view. A no-op when the list does not scroll. */
  const reveal = (/** @type {boolean} */ smooth) => {
    const a = links[current];
    if (!a) return;
    const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
    const start = a.offsetLeft - pad;
    const end = a.offsetLeft + a.offsetWidth + pad - track.clientWidth;
    const left = Math.min(Math.max(track.scrollLeft, end), start);
    if (Math.abs(left - track.scrollLeft) > 1) {
      track.scrollTo({ left, behavior: smooth && canAnimate() ? 'smooth' : 'auto' });
    }
  };

  /** Re-places the marker without the slide, for resizes and font swaps. */
  const settle = () => {
    nav.dataset.still = '';
    place();
    reveal(false);
    void bar.offsetWidth;
    delete nav.dataset.still;
  };

  const activate = (/** @type {number} */ i) => {
    if (i === current || !links[i]) return;
    links[current]?.removeAttribute('aria-current');
    current = i;
    links[i].setAttribute('aria-current', 'true');
    place();
    // Instant until the page has settled, so nothing moves on load.
    reveal('ready' in nav.dataset);
  };

  const update = () => {
    if (locked) return;
    if (atEnd) return activate(links.length - 1);
    const line = window.innerHeight * LINE;
    let index = 0;
    targets.forEach((t, i) => {
      if (t && t.getBoundingClientRect().top <= line) index = i;
    });
    activate(index);
  };

  // A band from 30% to 31% of the viewport: every section edge that crosses it re-checks the current section.
  const bandObserver = new IntersectionObserver(update, { rootMargin: '-30% 0px -69% 0px' });
  targets.forEach((t) => t && bandObserver.observe(t));

  // At the end of the page the last section may never reach the line, so the footer coming into view selects it.
  const end = document.querySelector('[data-section-nav-end]');
  if (end) {
    new IntersectionObserver(([entry]) => {
      atEnd = entry.isIntersecting;
      update();
    }).observe(end);
  }

  // A click selects its section at once and holds it while the page scrolls there.
  const hold = (/** @type {number} */ ms) => {
    window.clearTimeout(unlock);
    unlock = window.setTimeout(() => (locked = false), ms);
  };
  nav.addEventListener('click', (event) => {
    // A modified click opens a new tab and leaves this page where it is.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = /** @type {HTMLElement} */ (event.target).closest('a');
    const i = links.indexOf(/** @type {HTMLAnchorElement} */ (link));
    if (i < 0) return;
    locked = false;
    activate(i);
    locked = true;
    hold(400);
  });
  window.addEventListener('scroll', () => locked && hold(150), { passive: true });

  update();
  settle();

  const resize = new ResizeObserver(settle);
  resize.observe(track);
  links.forEach((a) => resize.observe(a));
  document.fonts?.ready.then(settle);

  // Placed without motion first; only later moves slide.
  requestAnimationFrame(() => requestAnimationFrame(() => (nav.dataset.ready = '')));
}
