// @ts-check

/**
 * Главное о вас: имя, роль, вводная фраза, ключевые поля (домены, город, формат работы),
 * контакты, образование, языки и мета-теги страницы.
 *
 * @typedef {object} Field
 * @property {string} label   Название поля. По нему страница находит значение — не переименовывайте.
 * @property {string} value   Значение. `{years}` заменяется на стаж, посчитанный от `careerStart`.
 *
 * @typedef {object} Link
 * @property {string} label
 * @property {string} value
 * @property {string} href
 */

export const profile = {
  name: 'Maksat Batyrov',
  role: 'Senior Frontend Engineer',

  // Одна фраза под именем в левой колонке.
  intro: 'I build fast, real-time React interfaces: browser extensions, trading dashboards and AI tools.',

  // Начало карьеры в формате 'YYYY-MM' — из него считается стаж («6+ years») в левой колонке.
  careerStart: '2019-12',

  // Часовой пояс для живых часов рядом с городом («14:32 local time (UTC+6)»).
  timezone: 'Asia/Bishkek',

  /**
   * Ключевые поля. Based in и Works выводятся в левой колонке,
   * Domains — чипами в разделе Overview (через запятую). @type {Field[]}
   */
  fields: [
    { label: 'Role', value: 'Senior Frontend Engineer' },
    { label: 'Experience', value: '{years}+ years with React, Next.js and TypeScript' },
    { label: 'Domains', value: 'HRTech, fintech, crypto and Web3, HealthTech, PropTech' },
    { label: 'Based in', value: 'Bishkek, Kyrgyzstan' },
    { label: 'Works', value: 'Remote' },
  ],

  // Файл лежит в /public. Поставьте null, чтобы убрать кнопку «Download CV (PDF)» и строку CV в контактах.
  cv: '/maksat-batyrov-cv.pdf',

  /**
   * Контакты: все выводятся в разделе Contact, а все, кроме email, — ещё и внизу левой колонки.
   * Email нужен для кнопок «Email me» и «Copy email». @type {Link[]}
   */
  links: [
    { label: 'Email', value: 'veyronmclord@gmail.com', href: 'mailto:veyronmclord@gmail.com' },
    { label: 'Telegram', value: '@max_batyrov', href: 'https://t.me/max_batyrov' },
    { label: 'LinkedIn', value: 'in/maxbatyrov', href: 'https://www.linkedin.com/in/maxbatyrov/' },
    { label: 'GitHub', value: 'MaxTheGrandMagus', href: 'https://github.com/MaxTheGrandMagus' },
    { label: 'LeetCode', value: 'MaxTheGrandMagus', href: 'https://leetcode.com/u/MaxTheGrandMagus/' },
    { label: 'Codewars', value: 'MaxTheGrandMagus', href: 'https://www.codewars.com/users/MaxTheGrandMagus' },
    // Телефон на публичном сайте быстро попадает в спам-базы — раскомментируйте, если он нужен.
    // { label: 'Phone', value: '+996 703 060 241', href: 'tel:+996703060241' },
  ],

  /** Образование и языки: раздел «Education and languages» после навыков. @type {Field[]} */
  background: [
    { label: 'Education', value: 'BSc in Computer Science, Kyrgyz State Technical University' },
    { label: 'Languages', value: 'English (C1), Russian (fluent)' },
  ],

  // <title>, description и Open Graph.
  meta: {
    title: 'Maksat Batyrov, Senior Frontend Engineer',
    description:
      'Senior frontend engineer with React, Next.js and TypeScript. Builds browser extensions, real-time trading dashboards and AI-powered products.',
  },
};
