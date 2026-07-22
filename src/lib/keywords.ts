import keywordData from '../data/generated/keywords.json' with { type: 'json' };
import { validateKeywordRecords, type KeywordRecord } from '../types/keyword.ts';

const records = keywordData as KeywordRecord[];
const validationErrors = validateKeywordRecords(records);
if (validationErrors.length) throw new Error(`Generated keyword data is invalid: ${validationErrors.join('; ')}`);

const keywords: readonly KeywordRecord[] = Object.freeze(records.map((record) => Object.freeze({
  ...record,
  sourceValues: Object.freeze({ ...record.sourceValues }),
})));

export type KeywordStats = Readonly<{
  totalKeywords: number;
  totalSearchVolume: number;
  categoryCount: number;
  clusterCount: number;
  intentCount: number;
  mappedCategoryCount: number;
  unmappedCategoryCount: number;
}>;

export function getAllKeywords(): readonly KeywordRecord[] {
  return keywords;
}

export function getKeywordBySlug(slug: string): KeywordRecord | undefined {
  return keywords.find((record) => record.slug === slug);
}

export function getKeywordsByCategory(category: string): readonly KeywordRecord[] {
  return keywords.filter((record) => record.category === category);
}

export function getKeywordsByCluster(cluster: string): readonly KeywordRecord[] {
  return keywords.filter((record) => record.cluster === cluster);
}

export function getKeywordsByIntent(intent: string): readonly KeywordRecord[] {
  return keywords.filter((record) => record.intent === intent);
}

export function getTopKeywords(limit: number): readonly KeywordRecord[] {
  if (!Number.isInteger(limit) || limit < 0) throw new RangeError('limit must be a non-negative integer');
  return keywords.slice(0, limit);
}

export function getKeywordStats(): KeywordStats {
  const categories = new Map<string, boolean>();
  const clusters = new Set<string>();
  const intents = new Set<string>();
  let totalSearchVolume = 0;
  for (const record of keywords) {
    categories.set(record.category, record.siteCategorySlug !== null);
    clusters.add(record.cluster);
    intents.add(record.intent);
    totalSearchVolume += record.averageMonthlySearches;
  }
  const mappingStates = [...categories.values()];
  return Object.freeze({
    totalKeywords: keywords.length,
    totalSearchVolume,
    categoryCount: categories.size,
    clusterCount: clusters.size,
    intentCount: intents.size,
    mappedCategoryCount: mappingStates.filter(Boolean).length,
    unmappedCategoryCount: mappingStates.filter((mapped) => !mapped).length,
  });
}
