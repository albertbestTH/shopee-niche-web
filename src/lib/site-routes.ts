type SlugRecord = { slug: string };

export const staticSitePaths = ['/', '/about', '/affiliate-disclosure', '/privacy'] as const;

export function getSitePaths(categories: ReadonlyArray<SlugRecord>, articles: ReadonlyArray<SlugRecord>): string[] {
  return [
    ...staticSitePaths,
    ...categories.map(({ slug }) => `/category/${slug}`),
    ...articles.map(({ slug }) => `/article/${slug}`),
  ];
}
