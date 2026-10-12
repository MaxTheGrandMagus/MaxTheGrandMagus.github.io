// @ts-check

/**
 * Навыки по группам. Порядок групп и пунктов сохраняется на странице.
 *
 * @typedef {object} SkillGroup
 * @property {string} group
 * @property {string[]} items
 */

/** @type {SkillGroup[]} */
export const skills = [
  { group: 'Core', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vue'] },
  {
    group: 'State and data',
    items: ['TanStack Query', 'Redux Toolkit', 'Zustand', 'Redux Saga', 'MobX', 'React Hook Form', 'Zod'],
  },
  {
    group: 'Styling',
    items: ['Tailwind', 'CSS Modules', 'Sass', 'MUI', 'shadcn/ui', 'Styled Components', 'Emotion', 'Storybook'],
  },
  { group: 'Real-time and APIs', items: ['REST', 'GraphQL', 'WebSockets', 'Server-Sent Events'] },
  { group: 'Testing', items: ['Jest', 'Vitest', 'React Testing Library', 'Playwright'] },
  { group: 'Architecture', items: ['Feature-Sliced Design', 'Micro-frontends', 'BFF'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MySQL', 'MongoDB'] },
  { group: 'Web3', items: ['ethers.js', 'web3.js', 'Wagmi', 'Solana Web3', 'EVM'] },
  { group: 'Delivery', items: ['Docker', 'GitHub Actions', 'GitLab CI', 'AWS', 'GCP', 'Vite', 'Webpack'] },
  { group: 'AI tools', items: ['Claude Code', 'Cursor', 'Codex', 'GitHub Copilot', 'OpenAI API', 'Gemini'] },
];
