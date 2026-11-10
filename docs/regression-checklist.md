# Regression checklist (Task 10)

Date: 2026-11-10

## Automated checks

Run by the agent on the current code.

| Command | Result |
|---|---|
| `npm test` | Passed: 6 test files, 37 tests |
| `npm run build` | Passed |
| `npm run lint` | Passed, no errors or warnings |

| Test file | What it covers |
|---|---|
| `src/utils/pokemonMappers.test.ts` | ID extraction from resource URLs, API-to-app mapping |
| `src/utils/pokemonApi.test.ts` | Detail request URL, success mapping, 404 not found, server error, network failure |
| `src/utils/pokemonFilters.test.ts` | Trimmed, case-insensitive name filter, no matches, empty query |
| `src/utils/favorites.test.ts` | Toggle, parsing, invalid stored data fallback, storage read/write |
| `src/utils/compare.test.ts` | Distinct selection, stat pairing, stat leader, bar percent |
| `src/App.test.tsx` | Catalog and detail routes render loading / invalid-id states |

## Manual browser checks

Checked manually in the browser by the student. Result: all passed.

| Area | Check | Result |
|---|---|---|
| Routes | `/` redirects to `/pokemon` | Passed |
| Routes | `/pokemon`, `/pokemon/:id`, `/favorites` and `/compare` open; active navigation link is highlighted | Passed |
| Empty results | Catalog search with no match shows "No matches found" | Passed |
| Empty results | Favorites search with no match; empty Favorites shows "No favorite Pokemon yet" | Passed |
| Not found | `/pokemon/99999` and `/pokemon/abc` show "Pokemon not found" with a link back to the catalog | Passed |
| Image fallback | A blocked or missing image shows "No image available" | Passed |
| API failure | Offline: catalog, details and one Compare side show an error | Passed |
| Retry | Back online: Try again reloads the data | Passed |
| Favorites | A favorite stays selected after a page refresh | Passed |
| Compare | Same Pokemon cannot be chosen twice; types, height, weight and base stats show side by side | Passed |
| Responsive | Catalog, details, Favorites and Compare work on wide and narrow screens | Passed (checked in Task 9) |
