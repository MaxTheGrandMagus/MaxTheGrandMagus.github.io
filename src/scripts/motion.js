// @ts-check

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Animations run only when the visitor hasn't asked the system to reduce motion. */
export const canAnimate = () => !reducedMotion.matches;
