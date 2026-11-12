# Pokemon Explorer

A new React + Vite + TypeScript course project generated from the [instructor's template](https://github.com/YarivGilad/react-project-starter).

## Current status

Tasks 1–12 are complete: the catalog loads the first 60 Pokemon from PokéAPI with name search, each Pokemon has a detail page, and Favorites are saved in `localStorage` with their own search.
Loading, error (with retry), empty and not-found states are shared components.
Compare (`/compare`) lets you choose two different Pokemon and shows their types, height, weight and base stats side by side, highlighting the higher value of each stat.
Automatic prompt capture was verified with a real new user message on October 17, 2026.

## Pages

| Route | Page |
|---|---|
| `/` | Redirects to `/pokemon` |
| `/pokemon` | Catalog of the first 60 Pokemon with name search and favorite toggles |
| `/pokemon/:id` | Details: image or fallback, types, abilities, base stats, height and weight |
| `/favorites` | Saved favorites with their own name search |
| `/compare` | Two different Pokemon side by side |
| any other URL | "Page not found" with a link back to the catalog (bonus) |

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

Tests cover ID extraction, API-to-app mapping, the detail request (success, not found, errors), name filtering, favorites persistence, comparison rules (distinct selection, stat pairing, higher value), and basic rendering of the catalog, detail and unknown (404) routes.

## API

[PokéAPI](https://pokeapi.co/) is free and requires no key.
List: https://pokeapi.co/api/v2/pokemon?limit=60
Details: https://pokeapi.co/api/v2/pokemon/{id}
The catalog filter applies to the first 60 loaded Pokemon.

## Documents

- [Architecture: components and state ownership](docs/architecture.md)
- [Regression checklist](docs/regression-checklist.md)
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
