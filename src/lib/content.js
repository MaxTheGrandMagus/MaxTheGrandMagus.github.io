// @ts-check
import { yearsSince } from './dates.js';
import { capitalize } from './text.js';

/** @typedef {typeof import('@data/profile.js').profile} Profile */
/** @typedef {Profile['links'][number]} Link */

/** A profile field's value ("Based in", "Domains"…) with `{years}` filled in; '' if the field is missing. */
export function fieldValue(/** @type {Profile} */ profile, /** @type {string} */ label) {
  const years = String(yearsSince(profile.careerStart));
  return profile.fields.find((f) => f.label === label)?.value.replaceAll('{years}', years) ?? '';
}

/** "HRTech, fintech" → ["HRTech", "Fintech"]. Only commas split, so "crypto and Web3" stays one item. */
export function listOf(/** @type {string} */ value) {
  return value
    .split(/\s*,\s*/)
    .filter(Boolean)
    .map(capitalize);
}

/** The email link among the contacts, if there is one. */
export function emailLink(/** @type {Link[]} */ links) {
  return links.find((link) => link.href.startsWith('mailto:'));
}

/** The bare address of a mailto: link: "mailto:me@x.com?subject=Hi" → "me@x.com". */
export function emailAddress(/** @type {Link | undefined} */ link) {
  return link ? link.href.replace(/^mailto:/, '').split('?')[0] : '';
}
