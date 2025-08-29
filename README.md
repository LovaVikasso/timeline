### Quick Start / Быстрый запуск

#### EN

- Requirements: Node.js 18+ (works with 20/22), npm 9+
- Install:
  - npm: `npm install`
  - yarn: `yarn`
  - pnpm: `pnpm install`
- Run (dev server with HMR):
  - npm: `npm run dev` (or `npm start`)
  - yarn: `yarn dev` (or `yarn start`)
  - pnpm: `pnpm dev` (or `pnpm start`)
- Build (production):
  - npm: `npm run build`
  - yarn: `yarn build`
  - pnpm: `pnpm build`
- Port: Dev server usually runs at `http://localhost:8080/`, sometimes `http://localhost:3000/`.
  - Force a port: `npm run dev -- --port 3000` | `yarn dev --port 3000` | `pnpm dev -- --port 3000`

#### RU

- Требования: Node.js 18+ (подойдёт 20/22), npm 9+
- Установка:
  - npm: `npm install`
  - yarn: `yarn`
  - pnpm: `pnpm install`
- Запуск (dev‑сервер с HMR):
  - npm: `npm run dev` (или `npm start`)
  - yarn: `yarn dev` (или `yarn start`)
  - pnpm: `pnpm dev` (или `pnpm start`)
- Сборка (production):
  - npm: `npm run build`
  - yarn: `yarn build`
  - pnpm: `pnpm build`
- Порт: обычно `http://localhost:8080/`, иногда `http://localhost:3000/`.
  - Принудительно: `npm run dev -- --port 3000` | `yarn dev --port 3000` | `pnpm dev -- --port 3000`

## Timeline Block

Ниже краткая инструкция, как запустить проект локально и собрать продакшн-бандл.

### Требования

- **Node.js**: рекомендуется 18+ (подойдёт и 20/22)
- **npm**: 9+

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

Запустится dev-сервер Webpack с горячей перезагрузкой.

```bash
npm run dev
```

Альтернатива (без авто‑открытия браузера):

```bash
npm start
```

По умолчанию сервер доступен по адресу `http://localhost:8080/` (порт может отличаться, смотрите вывод в терминале).

Иногда dev‑сервер стартует на `http://localhost:3000/` (если 8080 занят). Чтобы принудительно указать порт, добавьте флаг после `--`:

```bash
npm run dev -- --port 3000
```

### Сборка продакшн-бандла

Соберёт оптимизированные файлы в папку `dist/`.

```bash
npm run build
```

### Структура основных скриптов

- **npm run dev**: `webpack serve --mode development --open`
- **npm start**: `webpack serve --mode development`
- **npm run build**: `webpack --mode production`

### Полезно знать

- Исходники находятся в `src/`, точка входа — `src/index.tsx`.
- HTML-шаблон — `public/index.html` (копируется в сборку).
- Стили: SCSS и CSS‑модули (см. `src/styles/` и `*.module.scss`).

### Мобильная версия

В проекте есть медиа‑запросы для мобильной версии (адаптивная верстка). Проверьте поведение на устройствах/эмуляторах с шириной экрана < 768px.

### Yarn / pnpm

Все команды эквивалентны для других менеджеров пакетов:

- Установка:

  - Yarn: `yarn`
  - pnpm: `pnpm install`

- Запуск dev‑сервера (с авто‑открытием):

  - Yarn: `yarn dev`
  - pnpm: `pnpm dev`

- Запуск dev‑сервера (без авто‑открытия):

  - Yarn: `yarn start`
  - pnpm: `pnpm start`

- Сборка:
  - Yarn: `yarn build`
  - pnpm: `pnpm build`

Принудительный порт (пример для всех менеджеров):

```bash
# npm	npm run dev -- --port 3000
# yarn	yarn dev --port 3000
# pnpm	pnpm dev -- --port 3000
```
