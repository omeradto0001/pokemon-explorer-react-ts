# Pokemon Explorer

A new React + Vite + TypeScript course project generated from the [instructor's template](https://github.com/YarivGilad/react-project-starter).

## Current status

Only the starting point is implemented: an English landing page, React Router, Vitest/UI and ESLint.
Pokemon features are not implemented. Favorites and Compare are the approved additional functional pages.
Automatic prompt capture was verified with a real new user message on October 17, 2026. Task 1 setup is complete; Task 2 has not started.

## Run and check

Use Node.js 22.19 or newer compatible with Vite 8.

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:ui
```

The initial smoke test checks only the starting page. It does not replace the five meaningful application-logic tests required later.

## API

[PokéAPI](https://pokeapi.co/) is free and requires no key.
List: https://pokeapi.co/api/v2/pokemon?limit=60
Details: https://pokeapi.co/api/v2/pokemon/{id}
The catalog filter applies to the first 60 loaded Pokemon.

## Documents

- [Requirements map](docs/requirements-map.md)
- [Product requirements](PRD.md)
- [Tasks](tasks.md)
- [Setup status](docs/setup-status.md)
- [Prompt log](PROMPTS.md)
- [Agent guidelines](AGENTS.md)

## Submission

Public GitHub repository link on the college website by November 13, 2026, 09:00 (Asia/Jerusalem).
Approximately seven-minute individual defense on November 17, 2026, in the morning.
No video. Prepare to explain the actual code, data flow, routing and tests without agent assistance.
