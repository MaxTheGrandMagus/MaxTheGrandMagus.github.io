// @ts-check
import { canAnimate } from './motion.js';

// The same key is read by the inline script in layouts/BaseLayout.astro before the first paint.
const STORAGE_KEY = 'scheme';

/**
 * Light/dark switch: follows the system until the visitor picks a side; the choice is remembered.
 * The chosen side goes to html[data-scheme], which styles/tokens.css reads.
 * @param {HTMLButtonElement} button
 */
export function initThemeToggle(button) {
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColors = [...document.querySelectorAll('meta[name="theme-color"]')];
  const current = () => root.dataset.scheme ?? (systemDark.matches ? 'dark' : 'light');

  const sync = () => {
    const dark = current() === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    // After a manual pick, the browser bar takes the page's background too.
    if (root.dataset.scheme) {
      const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
      themeColors.forEach((meta) => meta.setAttribute('content', bg));
    }
  };

  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      root.dataset.scheme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode: the switch still works for this visit.
      }
      sync();
    };

    // The new theme spreads from the button as a growing circle (View Transitions); elsewhere it just switches.
    if (!canAnimate() || !document.startViewTransition || document.visibilityState !== 'visible') return apply();
    const box = button.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document
      .startViewTransition(apply)
      .ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 560, easing: 'cubic-bezier(0.2, 0, 0, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      // An aborted transition (e.g. the tab got hidden) still switches the theme, just without the circle.
      .catch(() => {});
  });

  systemDark.addEventListener('change', sync);
  button.hidden = false;
  sync();
}
