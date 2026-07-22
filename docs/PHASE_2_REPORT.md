# Phase 2 Report

## Source data

- Workbook: `data/Shopee_Keyword_Intelligence_Sprint2.xlsx`
- SHA-256: `5A9CA7CBE7984CEB0B2AAB4836AAFF6A21A1C88B158B6084117F0828B357AE9B`
- Sheet: `Sprint 2 - Top 30`
- Source records: 30, ranks 1–30
- The workbook was opened read-only/data-only and was not saved or modified.

## Schema

Schema version 1 supports identity, rank, source/normalized keyword, deterministic slug, classifications, search volume, nullable currency/site mapping, priority score/label, SEO title, workflow status, source sheet/row, deterministic generation timestamp, and full source row values.

## Import pipeline

`scripts/import-keywords.py` verifies the exact header row, maps source fields, validates required/numeric values, normalizes text, applies explicit category mapping, detects duplicates/collisions, sorts by rank, writes UTF-8 JSON, and verifies the workbook hash after reading.

## Normalization rules

- Unicode NFKC
- Trim and collapse whitespace
- Case-fold derived `normalizedKeyword`
- Keep exact cell values in `sourceValues`
- Never alter source rank, keyword cell, search volume, or score

## Slug strategy

Slugs combine an explicit category prefix, existing ASCII keyword tokens when available, and a 10-character SHA-256 suffix from `normalizedKeyword`. The result is deterministic, lowercase, URL-safe, and collision-checked without random values.

## Category mapping

- Mapped: 2 categories / 8 records
- Unmapped: 3 categories
- Review required: 1 category
- Unmapped or review-required records: 22
- No category route was created and no record was silently forced into another category.

## Generated outputs

- `src/data/generated/keywords.json`: 30 records
- `src/data/generated/manifest.json`: schema/source identity, rank range, deterministic hashes, generator version, and actual warnings
- Manifest keyword/content hash: `3D2FEFE7F27C48E543B36B4ED85F1FF3B5407818AC41ED71CAA4814CE733D0D7`
- `generatedAt`: `2026-07-20T10:15:24`, derived from source archive metadata

## Validation

- Rank, keyword, normalized keyword, and slug: unique
- Required fields: present
- Rank/search volume/priority score: valid
- Source rows: valid
- Manifest data hash and workbook hash: matched
- Repeated import: byte-identical generated files
- Currency: `null` because the source sheet has no Currency column

## Tests

Node built-in tests cover schema/data uniqueness, deterministic slugs/import, manifest/workbook hashes, category mapping, data access functions, invalid limits, statistics, and existing SEO/MVP invariants.

## Risks

- 22 records do not yet have a mapped current site category.
- The generic `อื่น ๆ` category requires review.
- Unicode NFKC may make a derived canonical string differ in code-point composition from the source; exact source values remain traceable in `sourceValues`.
- The pipeline requires Python and `openpyxl` in the developer environment.

## Remaining work

- Approve category destinations before generating keyword routes.
- Define content and product-research governance in a later phase.
- Do not treat generated keyword records as published articles or product recommendations.

## Verdict

READY WITH WARNINGS
