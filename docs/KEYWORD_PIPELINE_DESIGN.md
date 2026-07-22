# Keyword Pipeline Design

## Current MVP data model

- Sample categories, articles, and product placeholders remain in `src/data/site.ts`.
- Category slugs are manually defined by each sample category's `slug` property.
- Article slugs are manually defined by each sample article's `slug` property.
- The homepage, category routes, article routes, route metadata, and sitemap consume the sample arrays.
- Phase 2 adds a separate generated keyword dataset and does not replace these arrays, create keyword routes, or change UI content.
- Future integration may connect keyword records to routes only after category mapping and content governance are approved.

## Source and generated boundaries

- Source workbook: `data/Shopee_Keyword_Intelligence_Sprint2.xlsx`
- Source sheet discovered in workbook: `Sprint 2 - Top 30`
- Importer: `scripts/import-keywords.py`
- Source mapping configuration: `src/data/category-map.json`
- Generated records: `src/data/generated/keywords.json`
- Generated manifest: `src/data/generated/manifest.json`
- Canonical TypeScript contract: `src/types/keyword.ts`
- Runtime data access: `src/lib/keywords.ts`

The importer opens the workbook with `read_only=True` and `data_only=True`, never saves it, and verifies its SHA-256 after import. Generated files must not be edited manually.

## Header mapping

| Workbook header | Canonical field | Treatment |
| --- | --- | --- |
| Rank | `rank` | Source integer, unchanged |
| Keyword | `keyword`, `normalizedKeyword`, `slug` | Raw value retained in `sourceValues`; canonical/derived values normalized deterministically |
| Cluster | `cluster` | Trimmed and Unicode-normalized |
| Category | `category`, `siteCategorySlug` | Source category preserved; site mapping is explicit and nullable |
| Intent | `intent` | Trimmed and Unicode-normalized |
| Search Volume | `averageMonthlySearches` | Source numeric value, unchanged |
| Score | `priorityScore` | Source numeric value, unchanged |
| Priority | `priority` | Source label preserved after normalization |
| Page Type | `pageType` | Source value preserved after normalization |
| SEO Title | `seoTitle` | Source value preserved after normalization |
| Product Research | `status` | Source workflow status; no product data is introduced |
| All headers | `sourceValues` | Exact data-only cell values for row traceability |

`currency` is `null` because the source sheet has no Currency header. Product URLs, affiliate URLs, prices, ratings, and invented product names are excluded.

## Normalization rules

1. Convert values to strings only for textual canonical fields.
2. Apply Unicode NFKC normalization.
3. Collapse repeated whitespace to one space and trim both ends.
4. Apply Unicode case folding only to `normalizedKeyword`.
5. Preserve exact workbook cell values in `sourceValues`.
6. Sort records by numeric rank.
7. Reject blank required classifications, invalid numeric values, duplicates, and collisions.

## Deterministic slug strategy

The slug format is:

```text
<explicit-category-prefix>-<up-to-four-existing-ascii-tokens>-<first-10-sha256-chars>
```

- The hash input is `normalizedKeyword` encoded as UTF-8.
- Thai-only keywords use the explicit category prefix plus hash fallback.
- Existing ASCII tokens such as model sizes or brand text are retained when present.
- Slugs are lowercase, URL-safe, independent of rank/time/random values, and collision-checked.
- A collision fails the import; it is never silently resolved with a random suffix.

## Reproducibility and traceability

- `id` is derived from the first 16 SHA-256 characters of `normalizedKeyword`.
- `sourceSheet` and `sourceRow` point to the original Excel location.
- `sourceValues` stores the full original row values.
- `generatedAt` is the latest timestamp embedded in the XLSX ZIP entries (`2026-07-20T10:15:24`), not the time the command runs.
- `keywordHash` and `contentHash` hash canonical JSON with sorted object keys.
- Running the importer repeatedly against the same source produces byte-identical JSON files.

## Data access contract

`src/lib/keywords.ts` reads generated JSON only and exposes immutable rank-ordered records through:

- `getAllKeywords()`
- `getKeywordBySlug(slug)`
- `getKeywordsByCategory(category)` using the canonical workbook category
- `getKeywordsByCluster(cluster)`
- `getKeywordsByIntent(intent)`
- `getTopKeywords(limit)`; limit must be a non-negative integer
- `getKeywordStats()`

There is no network call and no runtime Excel parsing.

## Deferred work

- Do not replace sample articles or categories yet.
- Do not create 30 keyword routes yet.
- Do not add real product or affiliate data.
- Resolve unmapped/review-required categories before route generation.
