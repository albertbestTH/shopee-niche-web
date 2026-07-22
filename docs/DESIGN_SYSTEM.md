# Design System

## Brand direction

คัดของดีจริง uses a modern white editorial direction: calm, practical, and premium through restraint rather than decoration. It behaves like a buying assistant, not a storefront.

## Design principles

- Lead with the reader's use case, constraints, and trade-offs.
- Separate sample, planning, editorial, and affiliate states visibly.
- Prefer whitespace, clear hierarchy, and a small number of purposeful actions.
- Never imply testing, verification, pricing, ratings, or sales evidence without a source.
- Keep Thai content readable and mobile-first.

## Color palette

Semantic custom properties live in `src/styles/tokens.css`. White is the background; near-black and neutral grays carry content; muted surfaces separate sections. Warm coral (`--color-primary`) is the main action color, while restrained teal (`--color-accent`) supports trust-oriented details. Status colors and a blue focus color are reserved for meaning.

## Typography

Noto Sans Thai is loaded through `next/font` with Thai and Latin subsets and system fallbacks. Fluid `clamp()` tokens cover display and heading levels. Body copy is 16–19px with generous Thai line height; editorial content is constrained by `--article-width`.

## Spacing

The spacing scale covers 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, and 120px equivalents through `--space-1` to `--space-30`. Page padding and section spacing are fluid tokens.

## Radius

Use `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, and `--radius-pill`. Larger radii belong to editorial panels, not every element.

## Shadows

Use `--shadow-subtle`, `--shadow-card`, `--shadow-card-hover`, and `--shadow-floating`. Borders remain the default separator; shadows communicate elevation only.

## Layout

`Container` supports default, wide, and article measures. `Section` owns vertical rhythm and surface tone. Cards use one column on mobile, two around tablet widths, and up to three or four where content remains readable.

## Components

- UI: Button, LinkButton, IconButton, Badge, SearchField
- Layout: Container, Section, Header, MobileMenu, Footer
- Content: SectionHeader, Breadcrumbs, CategoryCard, ArticleCard, ProductPlaceholderCard, TrustNotice, AffiliateDisclosureNotice, SampleContentNotice, EmptyState, StaticPage

Buttons are actions; links navigate. No component uses `href="#"`. Product placeholders have no commerce CTA until a real URL exists.

## Responsive rules

The intended review matrix is 1440×900, 1024×768, 768×1024, 390×844, and 360×800. Layouts collapse at 64rem and 42rem, use min-width safeguards, wrap Thai text, and preserve 44px interactive targets.

## Accessibility

Use semantic landmarks, ordered breadcrumb navigation, one meaningful H1, visible labels, `aria-current`, and global `:focus-visible`. The mobile menu exposes expanded/control state, moves focus into the menu, closes with Escape or link selection, and returns focus. Motion is reduced under `prefers-reduced-motion`.

## Content guidelines

Use neutral Thai, state uncertainty, explain limitations, and distinguish estimated reading time from evidence. Avoid “verified”, “tested”, “guaranteed”, superlatives, or invented authors/dates unless supported.

## Keyword data UI rules

Only aggregate values from `src/lib/keywords.ts` may appear in this phase. They must be labelled as internal planning data. Do not create routes, sitemap entries, or published-article claims from the 30 keyword records. Unmapped records remain unmapped.

## Affiliate UI rules

Affiliate disclosure must be visible near editorial buying content and in the footer. Do not show a Shopee CTA without a real reviewed destination. Commission never substitutes for selection rationale.

## Do and Don’t

Do use tokens, shared components, real routes, honest empty states, and sample labels. Do not scatter one-off colors/spacing, use emoji as primary imagery, invent commerce evidence, add nonfunctional filters, or hide the distinction between planning data and published content.
