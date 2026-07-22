import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getAllKeywords, getKeywordBySlug, getKeywordsByCategory, getKeywordsByCluster, getKeywordsByIntent, getKeywordStats, getTopKeywords } from '../src/lib/keywords.ts';
import { KEYWORD_SCHEMA_VERSION, validateKeywordRecords } from '../src/types/keyword.ts';
import { canonicalStringify, validateGeneratedData } from '../scripts/validate-keywords.mjs';

const records = getAllKeywords();
const manifest = JSON.parse(readFileSync('src/data/generated/manifest.json', 'utf8'));
const categoryMap = JSON.parse(readFileSync('src/data/category-map.json', 'utf8'));
const digest = (path) => createHash('sha256').update(readFileSync(path)).digest('hex').toUpperCase();

test('import contains exactly 30 sorted records', () => {
  assert.equal(records.length, 30);
  assert.deepEqual(records.map(({ rank }) => rank), [...records].map(({ rank }) => rank).sort((a, b) => a - b));
});

test('rank, keyword, normalized keyword, and slug are unique', () => {
  for (const field of ['rank', 'keyword', 'normalizedKeyword', 'slug']) assert.equal(new Set(records.map((record) => record[field])).size, records.length, field);
});

test('slugs are deterministic and URL safe', () => {
  for (const record of records) {
    assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(record.slug.endsWith(createHash('sha256').update(record.normalizedKeyword).digest('hex').slice(0, 10)));
  }
});

test('required fields, source rows, and schema version are valid', () => {
  assert.deepEqual(validateKeywordRecords(records), []);
  for (const record of records) {
    assert.ok(record.keyword && record.cluster && record.category && record.intent && record.pageType && record.seoTitle);
    assert.ok(record.sourceRow >= 2);
    assert.equal(record.schemaVersion, KEYWORD_SCHEMA_VERSION);
  }
});

test('manifest hashes and workbook hash match', async () => {
  const result = await validateGeneratedData();
  assert.deepEqual(result.errors, []);
  assert.equal(result.contentHash, manifest.keywordHash);
  assert.equal(result.workbookHash, '5A9CA7CBE7984CEB0B2AAB4836AAFF6A21A1C88B158B6084117F0828B357AE9B');
  assert.equal(manifest.keywordHash, createHash('sha256').update(canonicalStringify(records)).digest('hex').toUpperCase());
});

test('category mappings are explicit and unmapped categories stay null', () => {
  for (const record of records) {
    const mapping = categoryMap[record.category];
    assert.ok(mapping);
    assert.ok(['MAPPED', 'UNMAPPED', 'REVIEW REQUIRED'].includes(mapping.status));
    assert.equal(record.siteCategorySlug, mapping.siteCategorySlug);
    if (mapping.status !== 'MAPPED') assert.equal(record.siteCategorySlug, null);
  }
});

test('keyword access functions return deterministic rank order', () => {
  const sample = records[0];
  assert.equal(getKeywordBySlug(sample.slug)?.id, sample.id);
  assert.equal(getKeywordBySlug('unknown-slug'), undefined);
  assert.ok(getKeywordsByCategory(sample.category).every((record) => record.category === sample.category));
  assert.ok(getKeywordsByCluster(sample.cluster).every((record) => record.cluster === sample.cluster));
  assert.ok(getKeywordsByIntent(sample.intent).every((record) => record.intent === sample.intent));
});

test('top keyword limits and invalid limits are handled', () => {
  assert.equal(getTopKeywords(5).length, 5);
  assert.equal(getTopKeywords(0).length, 0);
  assert.throws(() => getTopKeywords(-1), RangeError);
  assert.throws(() => getTopKeywords(1.5), RangeError);
});

test('keyword stats reconcile to source records', () => {
  const stats = getKeywordStats();
  assert.equal(stats.totalKeywords, 30);
  assert.equal(stats.totalSearchVolume, records.reduce((sum, record) => sum + record.averageMonthlySearches, 0));
  assert.equal(stats.categoryCount, new Set(records.map(({ category }) => category)).size);
  assert.equal(stats.clusterCount, new Set(records.map(({ cluster }) => cluster)).size);
  assert.equal(stats.intentCount, new Set(records.map(({ intent }) => intent)).size);
});

test('second import is byte-for-byte deterministic', () => {
  const before = [digest('src/data/generated/keywords.json'), digest('src/data/generated/manifest.json')];
  execFileSync('python', ['scripts/import-keywords.py'], { stdio: 'pipe' });
  const after = [digest('src/data/generated/keywords.json'), digest('src/data/generated/manifest.json')];
  assert.deepEqual(after, before);
});
