# UI Audit

## Current application structure

The Next.js App Router application has one shared root layout, four static pages, dynamic category and article routes generated from `src/data/site.ts`, metadata routes for robots and sitemap, and a custom not-found page. Shared UI is currently limited to the header, mobile menu, and footer.

## Data boundaries

`src/data/site.ts` is sample presentation data for the current MVP routes. It is not product research and must remain visibly labelled as sample content. The Excel workbook and generated keyword JSON are a separate planning dataset.

## Keyword pipeline boundaries

The source workbook, importer, schema, generated JSON, category mapping, manifest, and `src/lib/keywords.ts` data-access layer must remain unchanged by visual work. Only aggregate values returned by `getKeywordStats()` may be shown as an internal-planning preview. The 30 generated keywords are not rendered as 30 pages in this phase.

## Existing visual direction

The existing interface uses cream and dark green with large rounded blocks, emoji-led imagery, and dense one-file CSS. It communicates an early template more strongly than an editorial buying guide.

## Typography

Arial is the primary font and does not provide an intentional Thai reading system. Heading sizes are fixed, article measure is acceptable but inconsistent, and long Thai titles need more deliberate wrapping and fluid scale rules.

## Colors

The palette has useful contrast but no semantic token system. Component colors, hover colors, disabled states, and focus styles are coupled to legacy names such as `--green`, `--lime`, and `--cream`.

## Spacing

Spacing values are scattered across selectors. Section rhythm is generally generous on desktop but lacks a shared scale and becomes inconsistent on smaller screens.

## Components

Cards, notices, buttons, breadcrumbs, sections, and placeholders are repeated as page markup rather than reusable typed components. Icons are represented by emoji in source data and page visuals.

## Homepage

The homepage contains a hero, category grid, article grid, fake-looking scored/price product comparison, and disabled newsletter. The product comparison is clearly labelled but still risks implying invented product evidence. There is no real keyword-planning preview or explanation of the selection process.

## Category pages

Category pages correctly use existing routes and sample articles. They lack linked breadcrumbs, a shared article card, a real article count, and an explicit empty state.

## Article pages

Article pages preserve route metadata and 404 behavior. They have readable core content but lack a structured editorial hierarchy, linked breadcrumbs, related articles, reusable disclosure/sample notices, and a non-commercial product placeholder component.

## Legal pages

About, affiliate disclosure, and privacy pages are minimal and share legacy article styling. Their content is accurate in scope but needs consistent page headers, navigation context, and clearer information hierarchy.

## Desktop risks

- Four-column cards become narrow for long Thai titles.
- Fixed heading sizes and dense navigation can compete at intermediate widths.
- Emoji visuals make the experience feel like a template rather than an editorial publication.

## Mobile risks

- The menu has solid Escape and focus-return behavior, but open-state containment and page rhythm need browser verification.
- Several CTA groups and product rows were designed desktop-first.
- Long Thai titles and footer links need explicit overflow safeguards.

## Accessibility risks

- Focus styling only covers parts of navigation.
- Breadcrumbs are plain text rather than semantic navigation.
- The newsletter input has no visible label and a disabled field can confuse users.
- Emoji used as primary visual content have unclear accessible meaning.
- No global reduced-motion rule exists.

## Conversion risks

- Scores and sample prices can be mistaken for researched recommendations.
- Primary actions overemphasize “products” despite no real product URLs.
- Affiliate context appears late and is not consistently visible near content.

## Elements to preserve

- Existing category and article slugs and sample-data boundaries
- Static generation, metadata, canonical URLs, sitemap, robots, and 404 behavior
- Mobile menu ARIA, Escape-to-close, focus management, and close-on-link behavior
- Honest sample and affiliate disclosures
- Keyword pipeline and explicit category mapping

## Elements to redesign

- Semantic design tokens and Thai typography
- Header, mobile navigation presentation, footer, and page layout primitives
- Homepage hierarchy and honest keyword-planning preview
- Reusable category/article cards, notices, breadcrumbs, and placeholders
- Category, article, legal, and not-found page presentation

## Files that must not be modified

- `data/Shopee_Keyword_Intelligence_Sprint2.xlsx`
- `src/data/generated/keywords.json`
- `src/data/generated/manifest.json`
- `src/types/keyword.ts`
- `scripts/import-keywords.py`
- `src/data/category-map.json`
- `src/data/category-map.ts`
- `src/lib/keywords.ts`

Generated keyword data remains planning infrastructure and will not be rendered as 30 article routes in Design Phase 1.
