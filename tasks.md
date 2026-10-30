# Implementation Tasks

One task at a time; stop for review. Commits need explicit user approval.
No completion marks carry over from the old project.

- [x] Task 1: Prepare and verify the English-authored TypeScript starting point.
  - Done when: Omer owns the new public template repository, the same local folder uses it, Router/Vitest/UI are installed, build/lint/smoke checks pass, the browser renders the starter, and a real new user message is automatically captured.
- [x] Task 2: Record the approved product scope and render a typed local Pokemon list.
  - Done when: `PRD.md` records Favorites, Compare, the 60-item filter scope and detail fields; a typed local `PokemonSummary` dataset renders through separate `PokemonList` and `PokemonListItem` components using `map` and stable ID keys; and no `any` is used.
- [x] Task 3: Add list/detail routing and navigation.
  - Done when: `/` redirects to `/pokemon`; `NavLink` reaches `/pokemon`, `/favorites` and `/compare`; every Pokemon links to `/pokemon/:id`; `useParams` supplies the detail identifier as the source of truth; and the corresponding list item is visually identified when the list is visible.
- [x] Task 4: Replace local samples with typed PokéAPI data and request states.
  - Done when: `fetch` inside `useEffect` loads `https://pokeapi.co/api/v2/pokemon?limit=60` and the selected result's detail URL into typed API response models; transformation functions produce app models; the detail page shows name, image or fallback, types, abilities, base stats, height and weight; and list/detail requests provide loading, error, empty and success states with retry after failure.
- [x] Task 5: Add meaningful application-logic tests.
  - Done when: tests cover implemented ID extraction and API-to-app data transformation, pass with `npm test`, and are visible with `npm run test:ui`.
- [x] Task 6: Add search or filtering.
  - Done when: a controlled input filters the 60 loaded Pokemon by trimmed, case-insensitive name; matching, no-results and clearing behavior work; and filter logic has meaningful tests.
- [ ] Task 7: Implement persistent Favorites.
  - Done when: users can favorite or unfavorite Pokemon from relevant catalog/detail controls; `/favorites` lists the current choices with links to details; identifiers persist safely in `localStorage` after refresh; invalid stored data falls back without crashing; and favorite logic is tested.
- [ ] Task 8: Implement Pokemon comparison.
  - Done when: `/compare` lets users select two distinct Pokemon from the loaded catalog, prevents comparing the same Pokemon twice, loads any required detail data, and displays types, height, weight and base stats side by side with loading, error and empty-selection feedback.
- [ ] Task 9: Complete reusable components and responsive CSS.
  - Done when: at least four custom non-page components such as `AppLayout`, `Navigation`, `PokemonList`, `PokemonListItem`, `LoadingMessage`, `ErrorMessage` or `PokemonStats` exist in separate files; typed props and state ownership are clear; active/favorite states are visually clear; and catalog, details, Favorites and Compare work on wide and narrow screens.
- [ ] Task 10: Complete five meaningful logic tests and regression checks.
  - Done when: at least five meaningful tests cover ID extraction, API mapping, filtering, favorite persistence and comparison rules; `npm test`, `npm run build` and `npm run lint` pass; and all routes, empty results, image fallback, API failures and retry behavior are verified in the browser.
- [ ] Task 11: Complete submission documentation and defense preparation.
  - Done when: README documents the implemented pages, API and all run/test commands; PRD/tasks match the final app; the public repository opens without login; prompt history is included; and the student can explain component responsibilities, state ownership, API mapping, routes, favorites, comparison and tests.

After each task, run available tests and browser checks. The student adds their own note about what they checked or changed.
