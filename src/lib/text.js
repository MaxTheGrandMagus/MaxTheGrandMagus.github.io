// @ts-check

/**
 * Splits text so that hyphenated words ("form-filling", "real-time") land at the odd indexes,
 * which the page renders unbroken. See components/ui/KeepHyphens.astro.
 */
export const splitHyphenated = (/** @type {string} */ text) => text.split(/(\S+-\S+)/);

export const capitalize = (/** @type {string} */ text) => text.charAt(0).toUpperCase() + text.slice(1);

/** "Maksat Batyrov" → "MB": the first letters of the first and the last word. */
export function initialsOf(/** @type {string} */ name) {
  const words = name.trim().split(/\s+/);
  return [words[0], words.length > 1 ? words[words.length - 1] : '']
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

/** ["Education", "Languages"] → "Education and languages". */
export function titleFromLabels(/** @type {string[]} */ labels) {
  return labels
    .map((label, i) => (i ? label.toLowerCase() : label))
    .join(', ')
    .replace(/, ([^,]*)$/, ' and $1');
}
