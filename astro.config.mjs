// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Адрес сайта: нужен для canonical и og:url. Для репозитория <user>.github.io `base` не нужен.
  site: 'https://maxthegrandmagus.github.io',

  // Раньше по /cv открывалось резюме в Markdown — теперь эта ссылка ведёт на главную.
  redirects: {
    '/cv': '/',
  },

  // Панель Astro внизу экрана в dev-режиме перекрывает страницу — выключена.
  devToolbar: { enabled: false },
});
