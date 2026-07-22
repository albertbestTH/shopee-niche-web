# Baseline Audit

Audit date: 2026-07-22

## Repository state

- Repository: `https://github.com/albertbestTH/shopee-niche-web`
- Branch: `main`
- Starting commit: `7525f2bae5413f48a505428c77c60bf2ccbab86e`
- Pull result: already up to date
- Starting worktree: clean
- Stabilization commit: `77a0430a4499f4c54816aed66550ee288eee59a0`
- No force push or history rewrite was used.

## Stack

- Node.js: `v24.18.0`
- npm: `11.16.0`
- Next.js before stabilization: `16.0.0`
- Next.js after stabilization: `16.2.11`
- React / React DOM: `19.2.0`
- TypeScript: `^5.7.2`, strict mode enabled, no emit, bundler module resolution
- ESLint: `^9` with `eslint-config-next@16.2.11`
- Added a flat `eslint.config.mjs` because the baseline had no ESLint configuration.

## Commands executed

- `git status --short --branch`
- `git pull --ff-only origin main`
- `node --version`
- `npm --version`
- `npm ci`
- `npm audit`
- `npm run lint` (before and after stabilization)
- `npm run build` (before and after stabilization)
- `npm run dev`
- HTTP requests against every route listed below
- Source scans for `href="#"`, placeholder URLs, forms, metadata, canonical, sitemap, robots, images, and `notFound`
- `git diff --check`

Final command results:

- `npm run lint`: PASS
- `npm run build`: PASS; 14 static/SSG pages generated
- `npm audit --audit-level=high`: FAIL; 3 transitive advisories remain (1 moderate, 2 high) through Next.js dependencies (`postcss` and `sharp`). npm proposes only an unsafe breaking downgrade through `--force`, which was not applied.

## Routes tested

Valid routes returning HTTP 200:

- `/`
- `/about`
- `/affiliate-disclosure`
- `/privacy`
- `/category/motorcycle`
- `/category/camping`
- `/category/running`
- `/category/it`
- `/article/best-motorcycle-intercom`
- `/article/family-camping-tent`
- `/article/wide-feet-running-shoes`
- `/article/budget-home-camera`

Invalid routes returning HTTP 404:

- `/category/invalid-slug`
- `/article/invalid-slug`

Missing routes returning HTTP 404:

- `/robots.txt`
- `/sitemap.xml`

All valid static, category, and article routes return distinct titles after stabilization. Invalid dynamic slugs correctly invoke `notFound()`.

## Desktop review

- Required viewport: 1440×900.
- HTTP rendering and source/CSS review completed.
- Interactive visual verification, browser console inspection, hydration warning inspection, exact horizontal-overflow measurement, and screenshot review could not be completed because the required in-app browser backend was unavailable in this environment.
- Desktop layout is therefore not signed off.

## Mobile review

- Required viewport: 390×844.
- Responsive CSS breakpoints exist at 900px and 560px; desktop navigation is hidden below 900px and the CTA is hidden below 560px.
- There is no replacement mobile navigation control. This is a confirmed usability defect.
- Interactive visual verification, exact overflow measurement, touch/navigation testing, console inspection, and screenshot review could not be completed because the required in-app browser backend was unavailable.
- Mobile layout is therefore not signed off.

## Excel data inspection

- File: `data/Shopee_Keyword_Intelligence_Sprint2.xlsx`
- Exists: yes
- Size: 73,305 bytes
- SHA-256: `5A9CA7CBE7984CEB0B2AAB4836AAFF6A21A1C88B158B6084117F0828B357AE9B`
- XLSX package integrity: PASS; all 26 ZIP package entries were readable and required workbook package entries were present.
- Git diff for workbook: none; the workbook was not modified.
- Sheet names, row counts, and columns for `Sprint 2 - Top 30`: not verified. The spreadsheet artifact dependency loader required by the spreadsheet inspection workflow was not available in this session. No alternative library was used and no values were guessed.

## Confirmed defects

Fixed during this phase:

- Root `app/.gitkeep` caused Next.js to select an empty root App Router directory and ignore `src/app`; the original build generated only `/404`.
- ESLint 9 had no flat configuration, so `npm run lint` failed immediately.
- `tsconfig.json` contained duplicate Windows-form generated type paths; stale `.next/dev` types caused build type-check failure.
- Next.js 16.0.0 had published critical/high security advisories.
- Product and article CTAs used `href="#"` and placeholder product URLs.
- Product scores/prices, article content, and newsletter UI could be mistaken for live product data or working functionality.
- Static, category, and article routes inherited the same site-wide title.

Still open:

- Mobile navigation disappears without a replacement control.
- `robots.txt` is missing.
- `sitemap.xml` is missing.
- Canonical metadata is missing; a production base URL is not yet defined and was not invented during this audit.
- `npm audit` still reports 1 moderate and 2 high transitive vulnerabilities; npm's suggested `--force` action is a breaking downgrade and was rejected.
- No custom not-found page exists, although correct HTTP 404 behavior is present.
- Browser-only checks (console, hydration, viewport layout, overflow, and interactive links) remain unverified due to unavailable browser backend.
- Workbook sheet-level inspection remains incomplete due to unavailable spreadsheet runtime.

## Risks

- The current example articles contain repeated generic body sections. They are explicitly labeled as sample content, but should not be treated as production SEO content.
- Missing canonical, sitemap, and robots output prevents SEO-readiness.
- The absent mobile menu blocks complete mobile usability.
- Residual dependency advisories require a safe upstream-compatible dependency path rather than `npm audit fix --force`.
- Visual and workbook audits must be completed before importing keyword data.

## Recommended next task

Complete a focused baseline follow-up before Keyword Import:

1. Re-run the desktop and mobile browser review in an environment with the in-app browser backend available.
2. Inspect the workbook with the approved spreadsheet runtime and record every sheet name, row count, and the exact `Sprint 2 - Top 30` columns without modifying the file.
3. Add a real mobile navigation pattern.
4. Define the production site origin, then add canonical metadata, `sitemap.xml`, and `robots.txt`.
5. Reassess and safely resolve the remaining dependency advisories without force or a breaking downgrade.

Do not begin Keyword Import until these checks are complete.

## Verdict

NOT READY
