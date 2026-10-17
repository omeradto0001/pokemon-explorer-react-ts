# Requirements Map

Baseline: October 17, 2026. This records requirements, not completion claims.

## Sources and precedence

- O: [Original project instructions](https://app.notion.com/p/3e41d753ff1581888b56d9b3070748ab).
- N: [Updated course 2883 instructions](https://app.notion.com/p/2883-3f91d753ff15812c853ee8f8379750a4). These override O wherever the update changes a requirement.
- T: [Instructor template README](https://github.com/YarivGilad/react-project-starter#readme).
- U: User decisions: Pokemon; English agent-authored project content with verbatim prompts allowed in Hebrew; Favorites with `localStorage`; Compare; client-side filtering of 60 loaded Pokemon; same local folder; new repository omeradto0001/pokemon-explorer-react-ts; no unapproved commits.

Unchanged requirements from O remain in force. N replaces the old eight-task limit, JavaScript scope, optional Router/TypeScript/tests, video submission and earlier submission details. T governs repository setup and prompt logging. U governs product choices and local workflow where it does not conflict with the course requirements. Old local project documents are not authoritative.

## Product requirements

| ID | Requirement | Source | Verification |
|---|---|---|---|
| R01 | React + Vite + TypeScript, frontend only | N 1–2 | Development without console errors and successful build |
| R02 | Types for API and props; no any | N 2 | Review types/source, not just build output |
| R03 | List, individual details and two additional useful pages | N 1–2 | Four page types; static About does not count |
| R04 | React Router, URLs, Link/NavLink | N 1–2 | Navigate and inspect URLs |
| R05 | Selection opens details; useParams reads ID | N 2 | Different URLs show corresponding data |
| R06 | Four custom components excluding pages, separate files | N 2 | Review count and responsibilities |
| R07 | map and unique keys | N 2 | Review rendering |
| R08 | Props and appropriate state ownership | N 2, 4 | Explain data flow |
| R09 | Free keyless public API; fetch in useEffect | N 1–2 | Verify actual requests; local JSON only for initial development |
| R10 | Loading, error, data | N 2 | Exercise slow, failed, successful requests |
| R11 | Search/filter | N 2 | Define scope; verify matches, empty result and clearing |
| R12 | Five meaningful Vitest logic tests | N 2, 4 | npm test passes and tests exercise real logic |
| R13 | Vitest UI, test:ui script | N 2 | Inspect npm run test:ui in browser |
| R14 | Custom CSS, narrow-screen usability, clean code | N 2, 4 | Browser checks and review |

## Process requirements

| ID | Requirement | Source | Verification |
|---|---|---|---|
| P01 | New template repository; rebuild incrementally | N introduction | Verify template provenance, no old app reuse |
| P02 | Public repository | N 2, 8 | Opens without login |
| P03 | Verify actual prompt capture before Vite setup | T setup 3 | Real message recorded automatically; synthetic test is insufficient |
| P04 | Generate react-ts inside template, preserve existing files | N 2; T setup 4 | Ignore files and continue |
| P05 | PRD: audience, purpose, pages, 3–5 observable acceptance statements | N 2, 7 | Review against mapping |
| P06 | Up to 12 ordered tasks, each with Done when | N 7 | Count and review |
| P07 | One task at a time; incremental commits | N 2, 7; U | Review and explicit commit approval |
| P08 | Tests, browser checks, prompt log after tasks | N 7; T | Report only checks performed |
| P09 | README, PRD, tasks, PROMPTS in repo | N 2 | README includes run/test/API |
| P10 | Honest attempt/check/fix history and student's own notes | N 4; T | No fabricated or polished history |
| P11 | Troubleshoot logger; label manual fallback and report failure | T troubleshooting | Check Node/cwd; do not claim automatic success |
| P12 | Repo link on college website by Nov 13, 2026, 09:00 Asia/Jerusalem | N 8 | No ZIP, Drive or video; later commits not assessed |
| P13 | Seven-minute defense Nov 17, 2026, morning | N 3 | Class or Zoom, signup through Classroom sheet, app/editor ready |
| P14 | Explain code, state, routes, tests without agent/search | N 3–4 | Practice on actual code; defense validates project marks too |
| P15 | Same local path, English authoring, no unapproved commits | U | Check filesystem, files and Git actions |

## Recommendations and choices

Recommended order (N 7): typed JSON, routing, API/states, tests, extra pages/search/styling.
Favorites/localStorage is a course bonus selected by the user as an additional page (N 2; U).
Comparison is a suggested additional page selected by the user (N 1; U). Component tests and 404 remain optional bonuses.
Architecture docs are encouraged and should be linked from PRD (N 2).
API selection guidance: 20+ items, 3–4 useful fields, unique IDs, early fetch check. If CORS blocks access, choose another API instead of a proxy (N 6).
No backend/database/auth; avoid Redux, Next.js and heavy UI libraries (N 1–2).

Approved product choices: Favorites persisted in `localStorage`, two-Pokemon comparison, a 60-item initial catalog, client-side name filtering, and detail fields covering image/fallback, types, abilities, base stats, height and weight.
Do not silently add other choices from the old project.

## Validation

Map every product requirement to PRD/design and every process requirement to workflow/submission checks.
Every extra feature needs a recorded decision.
Remove obsolete video submission, Classroom submission, eight-task limit and optional TypeScript/Router/Vitest instructions.

## Grading

N 4: project 60 (functionality 18, React/TypeScript 12, routes 8, API 8, tests 8, code/design 6);
process 20 (commits 8, planning 6, prompts 6); defense 20. This is not a score guarantee.
