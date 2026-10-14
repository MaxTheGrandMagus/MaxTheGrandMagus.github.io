// @ts-check
import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/', '.astro/', 'legacy/']),
  js.configs.recommended,
  // .astro files: the frontmatter runs in Node, <script> tags in the browser.
  astro.configs.recommended,
  {
    files: ['src/scripts/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['*.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
]);
