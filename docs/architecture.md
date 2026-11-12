# Architecture

How the app is split into routes, components, hooks and utilities, and where each piece of state lives.

## Routes

All routes render inside `AppLayout` (header, navigation and `<Outlet />`).

| Path | Page | Purpose |
|---|---|---|
| `/` | — | Redirects to `/pokemon` |
| `/pokemon` | `PokemonCatalogPage` | First 60 Pokemon with name search |
| `/pokemon/:id` | `PokemonDetailsPage` | Details of one Pokemon; `:id` from `useParams` is the source of truth |
| `/favorites` | `FavoritesPage` | Saved Pokemon with their own search |
| `/compare` | `ComparePage` | Two Pokemon side by side |
| `*` | `NotFoundPage` | Any unknown URL: "Page not found" with a link back to the catalog |

## Data flow

```
PokéAPI ──fetch──> API types (types/pokeapi.ts)
        ──mappers (utils/pokemonMappers.ts)──> app types (types/pokemon.ts)
        ──hooks──> pages ──props──> components
```

- `usePokemonList` loads `/pokemon?limit=60` and maps each result to `PokemonSummary`.
- `usePokemonDetails(id)` calls `fetchPokemonDetails` (`utils/pokemonApi.ts`), which maps the response to `PokemonDetails` and returns `success`, `not-found` or `error`. A `null` id means `idle` (no request).
- `usePokemonList` returns `{ listRequest, retryList }`; `usePokemonDetails` returns `{ detailsRequest, retryDetails }`. Both abort the request on unmount or id change, and ignore stale responses.
- Each page that calls a hook loads its own data; there is no shared cache between pages.

## State ownership

| State | Owner | How it is shared |
|---|---|---|
| Pokemon list request | `usePokemonList` inside each page that needs it | `listRequest` / `retryList` returned to the page |
| Pokemon details request | `usePokemonDetails` inside `PokemonDetailsPage` and `Comparison` (once per side) | `detailsRequest` / `retryDetails` returned to the caller |
| Favorite ids | `FavoritesProvider` (wraps the whole app in `AppLayout`) | `useFavorites()` context: `favoriteIds`, `isFavorite`, `toggleFavorite`; persisted to `localStorage` under `pokemon-explorer:favorites` |
| Catalog / Favorites search text | The page (`useState`) | Controlled input; filtering by `filterPokemonByName` |
| Compare selection (`firstId`, `secondId`) | `ComparePage` (`useState`) | Passed to `PokemonSelect` and `Comparison` as props |
| Image load failure | `PokemonArtwork` (`useState`) | Local only; shows a fallback |
| Selected Pokemon on details page | URL (`/pokemon/:id`) | Read with `useParams` |

Components below the pages receive data through typed props. Favorites are read from context only by `FavoritesPage`, `PokemonDetailsPage` and `PokemonListItem`.

## Components

| Component | Responsibility | Props |
|---|---|---|
| `AppLayout` | Page frame: `FavoritesProvider`, header, brand link, `Navigation`, `<Outlet />` | — |
| `Navigation` | `NavLink`s to Pokemon, Favorites and Compare with an active style | — |
| `ScrollToTop` | Scrolls to the top when the path changes | — |
| `PokemonList` | Renders a grid of `PokemonListItem` keyed by id | `pokemonList` |
| `PokemonListItem` | Card linking to details, active style for the open Pokemon, favorite toggle | `pokemon` |
| `PokemonArtwork` | Pokemon image with a fallback when missing or broken | `pokemon` |
| `LoadingMessage` | Spinner with a message (`role="status"`) | `message` |
| `ErrorMessage` | Error with a Try again button (`role="alert"`) | `title`, `description?`, `headingLevel?`, `onRetry` |
| `EmptyMessage` | Simple no-results message | `title?`, `description?` |
| `EmptyState` | Icon card for empty or not-found states, optional extra content | `icon`, `iconVariant?`, `title`, `description`, `headingLevel?`, `children?` |
| `PokemonSelect` | Controlled select of loaded Pokemon, one option can be disabled | `id`, `label`, `pokemonList`, `value`, `disabledId`, `onChange` |
| `CompareColumn` | One comparison side: loading, error, not found or a card with image, types, height and weight | `side`, `request`, `onRetry` |
| `CompareStatsTable` | Base stats of both Pokemon by row, with bars and the higher value highlighted | `first`, `second` |

## Utilities and tests

| File | Responsibility | Tests |
|---|---|---|
| `utils/pokemonMappers.ts` | ID extraction from resource URLs, API-to-app mapping | `pokemonMappers.test.ts` |
| `utils/pokemonApi.ts` | Detail request with typed result | `pokemonApi.test.ts` |
| `utils/pokemonFilters.ts` | Trimmed, case-insensitive name filter | `pokemonFilters.test.ts` |
| `utils/favorites.ts` | Toggle, parse and safely read/write favorite ids | `favorites.test.ts` |
| `utils/compare.ts` | Distinct selection, stat pairing, stat leader, bar percent | `compare.test.ts` |
| `App.tsx` routes | Catalog and detail routes render their loading / invalid-id states; unknown URLs render `NotFoundPage` | `App.test.tsx` |
