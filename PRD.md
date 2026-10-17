# Pokemon Explorer — Product Requirements

Planning baseline for the new TypeScript project. Source: [requirements map](docs/requirements-map.md).
This replaces the old JavaScript plan. Pokemon is the user-approved topic.

## Audience and goal

Help people explore Pokemon through a searchable catalog and individual detail pages using live PokéAPI data.
Keep the code simple enough for the student to understand and explain.

## Pages

| Page | Purpose | Status |
|---|---|---|
| Pokemon catalog (`/pokemon`) | Browse and filter the first 60 loaded Pokemon | Required and approved |
| Pokemon details (`/pokemon/:id`) | Display a Pokemon at its own URL | Required and approved |
| Favorites (`/favorites`) | Add, remove and revisit favorites persisted in `localStorage` | Approved additional page |
| Compare (`/compare`) | Select two Pokemon and compare their data side by side | Approved additional page |

A static About page does not count as an additional functional page.

## Acceptance criteria

1. When I open the catalog, I see loading feedback followed by live data, or a clear request error.
2. When I enter a name filter, I see case-insensitive matches from the 60 loaded Pokemon, a clear no-results state when appropriate, and the full list again after clearing the input.
3. When I select a Pokemon, I see its details at its own URL, with its identifier read using useParams.
4. When I favorite or unfavorite a Pokemon, the Favorites page updates and the choice remains after a page refresh.
5. When I choose two different Pokemon on the Compare page, I see their types, height, weight and base stats side by side.

The catalog and details must remain readable and operable on narrow screens.

## Technical requirements

- React + Vite + TypeScript; frontend only; development and production build without errors.
- Types for API data and component props; no any.
- React Router, Link/NavLink navigation, useParams for detail identifiers.
- At least four custom components in separate files, excluding pages.
- map and stable unique keys; clear state ownership and props.
- Public free keyless API; fetch inside useEffect.
- Loading/error/success states, search or filtering, project-owned responsive CSS.
- Load the initial catalog from `https://pokeapi.co/api/v2/pokemon?limit=60`; filtering applies to those 60 loaded results.
- Display name, image or fallback, types, abilities, base stats, height and weight on the detail page.
- Persist favorite identifiers in `localStorage`; comparison uses two distinct Pokemon and does not need persistence.
- At least five meaningful Vitest application-logic tests; npm test and Vitest UI.
- README, PRD, tasks and honest prompt history; incremental commits after user approval.

## Scope and decisions

No backend, database, authentication, paid API, Redux, Next.js or heavy UI framework.
Component tests and a 404 page remain optional. `localStorage` is included because persistent Favorites was explicitly approved.
Same local folder; new public GitHub repository owned by omeradto0001.
