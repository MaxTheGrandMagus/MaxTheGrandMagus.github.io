// @ts-check

/**
 * Блок «Key results»: самые сильные результаты в формате «стало / было».
 * `after` выводится крупно, `before` — зачёркнутым под ним. Если `before` нет — только `after`.
 * Первый результат ещё и попадает в абзац «Profile».
 *
 * @typedef {object} Result
 * @property {string} [before]
 * @property {string} after
 * @property {string} what     Что изменилось — продолжает фразу после цифры.
 * @property {string} company  Выводится под описанием.
 * @property {string} [project] Используется в абзаце «Profile» для первого результата.
 */

/** @type {Result[]} */
export const results = [
  {
    before: '25 min',
    after: '2 min',
    what: 'to fill in a job application, with 90%+ of form-filling automated',
    company: 'HirePilot',
    project: 'Autofill engine',
  },
  {
    before: 'days',
    after: 'minutes',
    what: 'to produce creative assets for an ad campaign',
    company: 'DTeam',
    project: 'AI content platform',
  },
  {
    before: '10 min',
    after: '90 s',
    what: 'for a patient to book a clinic consultation',
    company: 'Neobis',
    project: 'HealthTech booking',
  },
  {
    before: 'Vue 2',
    after: 'Vue 3',
    what: 'for 100+ components in live production, with zero downtime and 35% faster runtime',
    company: 'Discovery Studio',
    project: 'DeFi dApp',
  },
  {
    after: '8×',
    what: 'upload throughput for venue music libraries',
    company: 'Raina',
    project: 'Music operations SaaS',
  },
  {
    after: '99.9%',
    what: 'transaction reliability for a global DeFi user base',
    company: 'Discovery Studio',
    project: 'Wallet integration',
  },
];
