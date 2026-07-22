export const KEYWORD_SCHEMA_VERSION = 1 as const;

export type KeywordSourceValues = Readonly<Record<string, string | number | null>>;

export type KeywordRecord = Readonly<{
  id: string;
  rank: number;
  keyword: string;
  normalizedKeyword: string;
  slug: string;
  cluster: string;
  category: string;
  siteCategorySlug: string | null;
  intent: string;
  pageType: string;
  averageMonthlySearches: number;
  currency: string | null;
  priorityScore: number;
  priority: string;
  seoTitle: string;
  status: string | null;
  sourceSheet: string;
  sourceRow: number;
  generatedAt: string;
  schemaVersion: typeof KEYWORD_SCHEMA_VERSION;
  sourceValues: KeywordSourceValues;
}>;

export function validateKeywordRecords(records: readonly KeywordRecord[]): string[] {
  const errors: string[] = [];
  const seenRanks = new Set<number>();
  const seenKeywords = new Set<string>();
  const seenNormalized = new Set<string>();
  const seenSlugs = new Set<string>();
  let previousRank = 0;

  for (const record of records) {
    const label = `source row ${record.sourceRow}`;
    if (!Number.isInteger(record.rank) || record.rank <= 0) errors.push(`${label}: rank must be a positive integer`);
    if (!record.keyword.trim()) errors.push(`${label}: keyword is required`);
    if (!record.normalizedKeyword.trim()) errors.push(`${label}: normalizedKeyword is required`);
    if (!record.slug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)) errors.push(`${label}: slug is invalid`);
    if (!record.cluster.trim() || !record.category.trim() || !record.intent.trim() || !record.pageType.trim() || !record.seoTitle.trim()) errors.push(`${label}: required classification field is blank`);
    if (!Number.isFinite(record.averageMonthlySearches) || record.averageMonthlySearches < 0) errors.push(`${label}: averageMonthlySearches is invalid`);
    if (!Number.isFinite(record.priorityScore)) errors.push(`${label}: priorityScore is invalid`);
    if (!Number.isInteger(record.sourceRow) || record.sourceRow < 2) errors.push(`${label}: sourceRow is invalid`);
    if (record.schemaVersion !== KEYWORD_SCHEMA_VERSION) errors.push(`${label}: schemaVersion is invalid`);
    if (seenRanks.has(record.rank)) errors.push(`${label}: duplicate rank ${record.rank}`);
    if (seenKeywords.has(record.keyword)) errors.push(`${label}: duplicate keyword ${record.keyword}`);
    if (seenNormalized.has(record.normalizedKeyword)) errors.push(`${label}: duplicate normalizedKeyword ${record.normalizedKeyword}`);
    if (seenSlugs.has(record.slug)) errors.push(`${label}: duplicate slug ${record.slug}`);
    if (record.rank < previousRank) errors.push(`${label}: records are not sorted by rank`);
    seenRanks.add(record.rank); seenKeywords.add(record.keyword); seenNormalized.add(record.normalizedKeyword); seenSlugs.add(record.slug);
    previousRank = record.rank;
  }
  return errors;
}
