// @ts-check

/**
 * Опыт работы, от нового к старому — в этом порядке он и выводится.
 * Даты в формате 'YYYY-MM'; `end: null` значит «по настоящее время».
 * Длительность («1 yr 3 mo») считается автоматически.
 *
 * @typedef {object} Job
 * @property {string} company
 * @property {string} role
 * @property {string} start
 * @property {string | null} end
 * @property {string} [location]   Хранится в данных; в текущем дизайне не выводится.
 * @property {string} [url]          Ссылка на продукт или компанию; в текущем дизайне не выводится.
 * @property {string} summary        Одно-два предложения о продукте: в блоке «Now» для текущей работы
 *                                   и в раскрывающейся строке опыта.
 * @property {string[]} [stack]      Ключевые технологии — чипами в раскрывающейся строке.
 * @property {string[]} highlights   Достижения — все, в раскрывающейся строке.
 */

/** @type {Job[]} */
export const experience = [
  {
    company: 'HirePilot',
    role: 'Senior Frontend Engineer (React)',
    start: '2025-11',
    end: null,
    location: 'Remote',
    summary:
      'AI-powered HRTech platform and browser extension that automates job applications across popular ATS platforms: form autofill, Kanban application tracking and AI-personalized outreach to hiring managers.',
    stack: ['React', 'Browser extensions', 'Chrome and Firefox'],
    highlights: [
      'Built an adaptive autofill engine for 4 major hiring platforms that cut a job application from 25 minutes to under 2 and automated 90%+ of form-filling.',
      'Launched the company’s first paid subscription tier from scratch, which started the team’s revenue stream.',
      'Delivered an async autofill engine with pause, resume and live progress that made skills entry 95% faster.',
      'Cut API request overhead by 50% with server-state caching across all data-fetching surfaces.',
      'Built a pipeline that detects and records job submissions automatically, so application tracking needs almost no manual input.',
      'Set up a multi-environment CI/CD matrix with 6 release variants across Chrome and Firefox.',
      'Hardened the extension with allowlist validation, authenticated request layers and a secure handshake protocol.',
      'Removed unnecessary re-renders across all extension surfaces under continuous live-page updates.',
    ],
  },
  {
    company: 'DTeam',
    role: 'Frontend Engineer',
    start: '2025-01',
    end: '2025-04',
    location: 'Remote',
    summary:
      'Enterprise AI content marketing platform that orchestrates OpenAI and Midjourney to produce brand-aligned ad copy and visuals, taking creative production from days to minutes.',
    stack: ['OpenAI', 'Midjourney', 'AI streaming'],
    highlights: [
      'Cut creative production cycles by 90%, from days to minutes per campaign.',
      'Built an AI copy engine with tone and language controls that raised copywriter throughput 5×.',
      'Built an automated AI visual pipeline that removed 80% of manual asset work.',
      'Delivered a real-time editing workshop that handles 1000+ AI-generated iterations per campaign cycle.',
      'Replaced third-party asset tools with a custom drag-and-drop media manager and made asset selection 60% faster.',
      'Reduced runtime errors by 70% with a type-safe architecture across complex AI data flows.',
      'Reached Lighthouse 90+ with sub-second responses on AI-streamed content.',
      'Raised task completion by 40% with resilient integrations for unstable third-party AI providers.',
      'Built a reusable, accessible design foundation for 20+ screens.',
    ],
  },
  {
    company: 'Raina',
    role: 'Frontend Engineer (React)',
    start: '2023-12',
    end: '2024-05',
    location: 'Remote',
    summary:
      'B2B SaaS dashboard for multi-venue music operations: IoT audio controllers, music libraries, event scheduling and real-time device monitoring across physical venues.',
    stack: ['React', 'PWA', 'Real-time monitoring'],
    highlights: [
      'Architected a modular SPA of 9 independent feature domains, cutting cross-domain coupling by 70% and letting teams work in parallel.',
      'Engineered a real-time sync layer for sub-second device monitoring with zero polling overhead.',
      'Built a concurrent multi-file upload pipeline with retries and duplicate detection, raising upload throughput 8×.',
      'Delivered an in-browser audio editor with waveform trimming and multi-track merging.',
      'Cut redundant API requests by 50% with normalized state and per-entity lifecycle tracking.',
      'Made the calendar 60% faster with a memoized, timezone-aware date service.',
      'Rendered thousands of music entries smoothly with virtualized lists and skeleton loading.',
      'Integrated session replay and error tracking with 100% capture on critical incidents.',
      'Shipped a PWA with offline resilience and better Core Web Vitals through full service worker coverage.',
    ],
  },
  {
    company: 'Second Chance',
    role: 'Frontend Engineer',
    start: '2022-11',
    end: '2025-11',
    location: 'Remote',
    summary:
      'Crypto trading SaaS with one real-time futures and spot dashboard across Binance, Bybit and OKX: portfolio management, analytics, risk controls and trade sharing for professional traders.',
    stack: ['Redux Toolkit', 'Zustand', 'WebSockets', 'Docker'],
    highlights: [
      'Unified Binance, Bybit and OKX in one modular codebase and removed 60% of duplicated logic.',
      'Engineered dual real-time data streams with auto-reconnection for sub-second portfolio sync.',
      'Halved WebSocket reconciliation latency with a hybrid Redux Toolkit and Zustand state layer for high-frequency updates.',
      'Virtualized trading tables with thousands of historical records, cutting rendering overhead by 70%.',
      'Ended token-race logouts with a transparent authentication flow and silent refresh.',
      'Built a trade analytics engine with live PnL charts, win-rate analysis and shareable trade cards.',
      'Delivered a risk management module that enforces capital protection thresholds across accounts.',
      'Set up a containerized CI/CD pipeline with reproducible staging and production environments.',
      'Built a shared UI library of 100+ components across 3 exchange surfaces and raised delivery velocity by 35%.',
    ],
  },
  {
    company: 'Discovery Studio',
    role: 'Frontend Developer',
    start: '2022-05',
    end: '2022-09',
    location: 'Bishkek',
    summary:
      'Two products on a shared foundation: a B2B CRM with a custom Kanban workflow engine and a gamified vocabulary-learning app, on web and mobile.',
    stack: ['Redux Toolkit', 'i18n'],
    highlights: [
      'Shipped two production-ready products in 4 months on a shared CRM and EdTech foundation.',
      'Built an interactive Kanban board with real-time drag-and-drop and optimistic updates that raised CRM productivity by 40%.',
      'Halved API request overhead with query batching and normalized caching.',
      'Tripled EdTech engagement with streaks, rewards and level progression.',
      'Implemented JWT authentication with role-based access and secure session persistence.',
      'Set up testing with 80%+ coverage on core business logic and cut the production defect rate by 60%.',
      'Built an internationalization layer with dynamic locale loading.',
      'Added real-time statistics dashboards that increased daily active usage by 45%.',
      'Moved state management to Redux Toolkit patterns and cut boilerplate by 70%.',
    ],
  },
  {
    company: 'Discovery Studio',
    role: 'Frontend Developer',
    start: '2021-10',
    end: '2022-04',
    location: 'Bishkek',
    summary:
      'Ethereum DeFi dApp with wallet integration, real-time transaction monitoring and on-chain asset management, plus a Vue 2 to Vue 3 migration under live production load.',
    stack: ['Vue 3', 'web3.js', 'MetaMask', 'Ethereum'],
    highlights: [
      'Migrated 100+ components from Vue 2 to Vue 3 with zero downtime: 35% faster runtime and a 30% smaller bundle.',
      'Built a secure wallet integration layer with 99.9% transaction reliability for a global user base.',
      'Halved “stuck transaction” support tickets with real-time blockchain monitoring and live confirmations.',
      'Introduced strict typing for blockchain data and improved frontend reliability by 40%.',
      'Architected global state for multi-step transaction flows and cut state-related defects by 60%.',
      'Streamlined the CI/CD pipeline with reproducible builds and sped up releases by 45%.',
      'Designed contract interaction forms with validation and human-readable errors.',
      'Owned live deployments and incident response for 24/7 availability.',
    ],
  },
  {
    company: 'Neobis',
    role: 'Frontend Developer',
    start: '2019-12',
    end: '2021-10',
    location: 'Bishkek',
    summary:
      'Booking platforms built in a venture studio: patient-to-clinic scheduling with on-site and telehealth visits, and a real-estate search, rental and booking marketplace.',
    highlights: [
      'Built reusable foundations across HealthTech and PropTech and halved time-to-market for new ventures.',
      'Engineered a real-time scheduling engine that cut patient booking from 10 minutes to under 90 seconds.',
      'Built map-based property search with dynamic booking and raised discovery engagement by 60%.',
      'Cut infrastructure costs by 40% with a backend-as-a-service layer during MVPs.',
      'Built a design system used across 80+ screens and cut UI development time by 45%.',
      'Introduced a normalized store architecture and cut state-related defects by 55%.',
      'Built lightweight backend services in parallel with the frontend and shortened delivery cycles by 30%.',
      'Led Agile delivery across distributed teams.',
      'Implemented role-based access control for medical and financial data.',
    ],
  },
];
