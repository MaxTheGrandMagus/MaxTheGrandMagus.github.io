# Maksat Batyrov — CV

https://maxthegrandmagus.github.io

Сайт-резюме на [Astro](https://astro.build) и чистом JavaScript. Слева закреплённая колонка с профилем, живыми часами Бишкека и навигацией, которая подсвечивает текущий раздел; справа Overview, Results, Experience, Skills и Contact. На телефонах навигация превращается в липкую панель вкладок сверху.

На выходе статический HTML/CSS. JS на клиенте нужен только для подсветки навигации, часов и кнопки «Copy email»; без него страница читается полностью. Есть стили для печати.

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
| `src/data/profile.js` | Имя, роль, вводная фраза, город, формат работы, домены, контакты, образование, языки, `<title>` и description |
| `src/data/results.js` | Раздел «Results»: было / стало |
| `src/data/experience.js` | Места работы: даты, описание, стек, достижения |
| `src/data/skills.js` | Навыки по группам |

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
  data/               ← контент
  pages/index.astro   страница: разметка, стили, скрипты навигации и часов
  layouts/Base.astro  <html>/<head>, мета-теги, favicon
  lib/dates.js        форматирование дат и длительности
public/               favicon, PDF с резюме
legacy/               прежняя версия сайта (не публикуется)
```

Старая ссылка `/cv` (резюме в Markdown) теперь перенаправляет на главную — см. `redirects` в `astro.config.mjs`.

## Деплой

Сайт собирается и публикуется GitHub Actions (`.github/workflows/deploy.yml`) при каждом пуше в `master`.

Один раз нужно переключить источник публикации: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
