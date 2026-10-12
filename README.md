# Maksat Batyrov — CV

https://maxthegrandmagus.github.io

Резюме-сайт на [Astro](https://astro.build) и чистом JavaScript: современное резюме в две колонки на листе A4 с тёмным сайдбаром. На выходе статический HTML/CSS; JS на клиенте нужен только для кнопок «Print or save as PDF» и «Copy email». Страница печатается в аккуратный A4 PDF прямо из браузера.

## Запуск

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # готовый сайт в dist/
npm run preview   # посмотреть собранную версию
```

## Где менять информацию

Весь текст лежит в `src/data/`. Вёрстку для правок трогать не нужно.

| Файл | Что внутри |
| --- | --- |
| `src/data/profile.js` | Имя, роль, ключевые поля (стаж, домены, город, формат работы), контакты, образование, языки, `<title>` и description |
| `src/data/results.js` | Блок «Key results»: стало / было |
| `src/data/experience.js` | Места работы: даты, описание, достижения (в резюме попадают первые четыре) |
| `src/data/skills.js` | Навыки по группам |

Что считается само:

- **Стаж** («6+ years») — из `careerStart` в `profile.js`. В тексте поля используйте `{years}`.
- **Длительность работы** («1 yr 3 mo») — из `start` и `end` в `experience.js`. `end: null` значит «Present».
- **Абзац «Profile»** — из полей Experience и Domains и первого результата в `results.js`.

В файлах есть JSDoc-типы и `// @ts-check`, поэтому VS Code подсказывает поля и подчёркивает опечатки.

### Частые правки

- **Новая работа:** добавьте объект в начало массива в `experience.js`.
- **Обновить PDF с резюме:** замените `public/maksat-batyrov-cv.pdf` (или поменяйте путь в `profile.cv`; `null` убирает кнопку).
- **Показать телефон:** раскомментируйте строку в `profile.links`.

## Структура

```
src/
  data/               ← контент
  pages/index.astro   страница резюме: разметка, стили, печать
  layouts/Base.astro  <html>/<head>, мета-теги, favicon
  lib/dates.js        форматирование дат и длительности
public/               favicon, PDF с резюме
legacy/               прежняя версия сайта (не публикуется)
```

Старая ссылка `/cv` (резюме в Markdown) теперь перенаправляет на главную — см. `redirects` в `astro.config.mjs`.

## Деплой

Сайт собирается и публикуется GitHub Actions (`.github/workflows/deploy.yml`) при каждом пуше в `master`.

Один раз нужно переключить источник публикации: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
