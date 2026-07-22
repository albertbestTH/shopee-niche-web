# Workbook Inspection

Inspection date: 2026-07-22

## File identity

- File: `data/Shopee_Keyword_Intelligence_Sprint2.xlsx`
- Inspection method: Python `openpyxl 3.1.5`
- Open mode: `load_workbook(filename, read_only=True, data_only=True)`
- The workbook was closed without saving.

## Workbook sheets

Sheets in workbook order:

1. `Dashboard`
2. `Keyword Intelligence`
3. `Content Plan 30 ار¹`
4. `Lists`
5. `Sprint 2 - Top 30`
6. `Product Research`

## Sheet dimensions

Dimensions count the last row and column containing a non-empty value.

| Sheet | Rows | Columns |
| --- | ---: | ---: |
| Dashboard | 28 | 5 |
| Keyword Intelligence | 953 | 10 |
| Content Plan 30 ار¹ | 31 | 12 |
| Lists | 5 | 2 |
| Sprint 2 - Top 30 | 31 | 16 |
| Product Research | 151 | 10 |

## Headers

- `Dashboard`: `Shopee Keyword Intelligence Dashboard`; remaining cells in the first row are blank.
- `Keyword Intelligence`: `Keyword`, `Normalized`, `Currency`, `Avg. monthly searches`, `Category`, `Intent`, `Priority Score`, `Quality Flags`, `Duplicate`, `Decision`.
- `Content Plan 30 ار¹`: `Day`, `Keyword`, `Category`, `Intent`, `Search Volume`, `Score`, `Proposed Title`, `Article Type`, `Status`, `Shopee Product URL`, `Affiliate URL`, `Published URL`.
- `Lists`: `Status`, `Priority`.
- `Sprint 2 - Top 30`: `Rank`, `Keyword`, `Cluster`, `Category`, `Intent`, `Search Volume`, `Score`, `Priority`, `Page Type`, `SEO Title`, `Product Research`, `Target Products`, `Selected Product 1`, `Selected Product 2`, `Selected Product 3`, `Notes`.
- `Product Research`: `Keyword`, `Product Name`, `Shop`, `Price`, `Rating`, `Sold`, `Mall/Official`, `Affiliate URL`, `Why Selected`, `Status`.

## Sprint 2 - Top 30 validation

- Data rows excluding header: 30
- Columns in order: `Rank`, `Keyword`, `Cluster`, `Category`, `Intent`, `Search Volume`, `Score`, `Priority`, `Page Type`, `SEO Title`, `Product Research`, `Target Products`, `Selected Product 1`, `Selected Product 2`, `Selected Product 3`, `Notes`
- Duplicate Rank values: none
- Blank Keyword values: none
- Duplicate Keyword values: none
- Blank Cluster values: none
- Blank Category values: none
- Blank Intent values: none
- Blank Page Type values: none
- Blank SEO Title values: none

## Data quality issues

- No blocking issue was found in the required `Sprint 2 - Top 30` checks.
- The sheet name `Content Plan 30 ار¹` is recorded exactly as returned by the workbook and contains an unusual suffix; confirm whether this is intentional before building any import mapping.
- While reading dimensions, openpyxl warned that an unknown worksheet extension and a conditional-formatting extension are unsupported. The workbook was opened read-only and never saved, so these extensions were not removed from the source file.

## File integrity

- SHA-256 before inspection: `5A9CA7CBE7984CEB0B2AAB4836AAFF6A21A1C88B158B6084117F0828B357AE9B`
- SHA-256 after inspection: `5A9CA7CBE7984CEB0B2AAB4836AAFF6A21A1C88B158B6084117F0828B357AE9B`
- Expected SHA-256 matched: yes
- Workbook modified: no

## Verdict

PASS WITH WARNINGS
