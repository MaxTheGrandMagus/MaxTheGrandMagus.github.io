# Maksat Batyrov — CV

https://maxthegrandmagus.github.io

Сайт-резюме на [Astro](https://astro.build) и чистом JavaScript. Слева закреплённая колонка с профилем, живыми часами Бишкека и навигацией, которая подсвечивает текущий раздел; справа Overview, Results, Experience, Skills и Contact. На телефонах навигация превращается в липкую панель вкладок сверху.

Светлая и тёмная тема: по умолчанию страница следует системной настройке, а кнопка с луной/солнцем рядом с аватаром переключает тему вручную. Выбор запоминается в `localStorage` и применяется ещё до отрисовки, так что страница не мигает.

Анимации:

- **Вход** — при загрузке профиль и блок «Now» появляются по очереди.
- **Счётчики** — в Results старое значение зачёркивается, новое отсчитывается (25 → 2 min, 600 → 90 s, 0 → 99.9%).
- **Появление при прокрутке** — блоки ниже первого экрана мягко поднимаются, когда доходят до экрана.
- **Отклик на действия** — плавное раскрытие опыта, нажатие кнопок, пружинистая полоска навигации, подсветка чипов.
- **Живые детали** — пульсирующая точка у «Now», мигающее двоеточие в часах.
- **Смена темы** — новая тема расходится кругом от кнопки (View Transitions; где их нет — просто переключается).

Если в системе включено «уменьшение движения», анимаций нет. Без JS и при печати страница показывает финальное состояние.

На выходе статический HTML/CSS. JS на клиенте нужен для переключателя темы, анимаций, подсветки навигации, часов и кнопки «Copy email»; без него страница читается полностью (в системной теме). Есть стили для печати — печать всегда светлая.

## Запуск

```bash
npm install
npm run dev           # http://localhost:4321
npm run build         # готовый сайт в dist/
npm run preview       # посмотреть собранную версию
npm run lint          # ESLint: ошибки в .js и .astro
npm run format        # Prettier: отформатировать все файлы
npm run format:check  # только проверить форматирование
```

## Где менять информацию

Весь текст лежит в `src/data/`. Вёрстку для правок трогать не нужно.

| Файл                     | Что внутри                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `src/data/profile.js`    | Имя, роль, вводная фраза, город, формат работы, домены, контакты, образование, языки, `<title>` и description |
| `src/data/results.js`    | Раздел «Results»: было / стало                                                                                |
| `src/data/experience.js` | Места работы: даты, описание, стек, достижения                                                                |
| `src/data/skills.js`     | Навыки по группам                                                                                             |

Что считается само:

- **Стаж** («6+ years») — из `careerStart` в `profile.js`.
- **Длительность работы** («1 yr 3 mo») — из `start` и `end` в `experience.js`. `end: null` значит «Present».
- **Время в Бишкеке** — из `timezone` в `profile.js`.

В файлах есть JSDoc-типы и `// @ts-check`, поэтому VS Code подсказывает поля и подчёркивает опечатки.

### Частые правки

- **Новая работа:** добавьте объект в начало массива в `experience.js`. Первая работа без `end` показывается в блоке «Now».
- **Обновить PDF с резюме:** замените `public/maksat-batyrov-cv.pdf` (или поменяйте путь в `profile.cv`; `null` убирает кнопку).
- **Показать телефон:** раскомментируйте строку в `profile.links`.

## Структура

```
src/
  data/                     ← контент
  pages/index.astro         страница: из каких частей собрана и в каком порядке
  layouts/BaseLayout.astro  <html>/<head>: мета-теги, шрифт, глобальные стили, тема до отрисовки
  components/
    profile/                левая колонка
    sections/               разделы справа
    ui/                     мелкие общие части
    SiteFooter.astro
  scripts/                  поведение в браузере, по модулю на задачу
  styles/                   глобальный CSS
  lib/                      функции для сборки: даты, текст, поля профиля
public/                     favicon, PDF с резюме
legacy/                     прежняя версия сайта (не публикуется)
```

| Что                                                       | Где                                                                                    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Аватар, имя, факты, кнопки                                | `components/profile/ProfileHeader.astro`                                               |
| Переключатель темы                                        | `components/profile/ThemeToggle.astro` + `scripts/theme-toggle.js`                     |
| Живые часы                                                | `components/profile/LocalTime.astro` + `scripts/local-time.js`                         |
| Навигация по разделам                                     | `components/profile/SectionNav.astro` + `scripts/section-nav.js`                       |
| Ссылки на профили внизу колонки                           | `components/profile/ProfileLinks.astro`                                                |
| Заголовок и отступы любого раздела                        | `components/sections/Section.astro`                                                    |
| Overview и блок «Now»                                     | `components/sections/Overview.astro`, `NowCard.astro`                                  |
| Results и счётчики                                        | `components/sections/Results.astro` + `scripts/count-up.js`                            |
| Experience и строка работы                                | `components/sections/Experience.astro`, `JobItem.astro`                                |
| Skills, образование и языки                               | `components/sections/Skills.astro`, `Background.astro`                                 |
| Contact и «Copy email»                                    | `components/sections/Contact.astro`, `CopyEmailButton.astro` + `scripts/copy-email.js` |
| Чипы                                                      | `components/ui/ChipList.astro`                                                         |
| Цвета светлой и тёмной темы, шрифт, размеры               | `styles/tokens.css`                                                                    |
| Сброс стилей, ссылки, фокус, утилиты (`.sr-only`, `.num`) | `styles/base.css`                                                                      |
| Общие паттерны разделов (`.label`, `.pair`, `.rows`)      | `styles/content.css`                                                                   |
| Сетка страницы: колонка слева, одна колонка на мобильных  | `styles/layout.css`                                                                    |
| Анимация входа и появления при прокрутке                  | `styles/motion.css` + `scripts/reveal.js`                                              |

## Как устроен код

- **Компонент — один файл.** Сверху импорты и props, потом разметка, `<script>` и `<style>`. Стили в компоненте scoped: действуют только на его разметку.
- **Контент приходит через props.** Из `src/data/` импортирует только `pages/index.astro`, компоненты получают всё через props.
- **Глобальный CSS — только в `src/styles/`.** Цвета обеих тем — в `tokens.css`. Цвет панели браузера (`theme-color`) задан в `BaseLayout.astro`, его меняйте вместе с `--bg`.
- **Логика — в `src/scripts/`.** Каждый модуль экспортирует функцию `init…()`, компонент только вызывает её. Скрипты находят элементы по `data-*`-атрибутам, а не по классам, так что классы можно переименовывать, не ломая JS.
- **Анимации** живут внутри `@media screen and (prefers-reduced-motion: no-preference)`, а в JS — после проверки `canAnimate()` из `scripts/motion.js`.
- **Адаптивность:** до 1024px (`64rem`) страница в одну колонку. Разделы подстраиваются под ширину своей колонки через container queries (`@container content (…)`), а не под ширину окна.
- **Импорты через алиасы** из `jsconfig.json`: `@components/…`, `@data/…`, `@layouts/…`, `@lib/…`, `@scripts/…`, `@styles/…`.
- **Кодстайл** держат Prettier и ESLint с плагинами для Astro, а также `.editorconfig`. VS Code предложит нужные расширения из `.vscode/extensions.json`.

Astro вставляет `<script>` компонента прямо на место компонента. Поэтому селектор соседа `+` может перестать срабатывать: между двумя разделами окажется тег `<script>`. Для отступов между соседями используйте `~`, как в `Section.astro`.

### Новый раздел

1. Создайте компонент в `src/components/sections/` и оберните разметку в `<Section id={id} title={title}>`.
2. В `src/pages/index.astro` добавьте раздел в объект `sections` и в `<main>`, а если он нужен в навигации — ещё и в массив `nav`.
3. Блокам, которые должны подниматься при прокрутке, добавьте атрибут `data-reveal`.

Старая ссылка `/cv` (резюме в Markdown) теперь перенаправляет на главную — см. `redirects` в `astro.config.mjs`.

## Деплой

Сайт собирается и публикуется GitHub Actions (`.github/workflows/deploy.yml`) при каждом пуше в `master`.

Один раз нужно переключить источник публикации: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
