import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validateKeywordRecords } from '../src/types/keyword.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const paths = {
  keywords: new URL('../src/data/generated/keywords.json', import.meta.url),
  manifest: new URL('../src/data/generated/manifest.json', import.meta.url),
  categoryMap: new URL('../src/data/category-map.json', import.meta.url),
  workbook: new URL('../data/Shopee_Keyword_Intelligence_Sprint2.xlsx', import.meta.url),
};

export function canonicalStringify(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalStringify).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex').toUpperCase();
}

export async function validateGeneratedData() {
  const [keywordText, manifestText, categoryMapText, workbookBytes] = await Promise.all([
    readFile(paths.keywords, 'utf8'), readFile(paths.manifest, 'utf8'), readFile(paths.categoryMap, 'utf8'), readFile(paths.workbook),
  ]);
  const records = JSON.parse(keywordText);
  const manifest = JSON.parse(manifestText);
  const categoryMap = JSON.parse(categoryMapText);
  const errors = validateKeywordRecords(records);
  if (records.length !== 30) errors.push(`Expected 30 records, received ${records.length}`);
  const contentHash = sha256(Buffer.from(canonicalStringify(records), 'utf8'));
  if (manifest.keywordHash !== contentHash || manifest.contentHash !== contentHash) errors.push('Manifest content hash does not match generated keyword data');
  const workbookHash = sha256(workbookBytes);
  if (manifest.sourceFileSha256 !== workbookHash) errors.push('Manifest sourceFileSha256 does not match workbook');
  if (manifest.recordCount !== records.length) errors.push('Manifest recordCount does not match keyword data');
  if (manifest.firstRank !== records[0]?.rank || manifest.lastRank !== records.at(-1)?.rank) errors.push('Manifest rank range does not match keyword data');
  for (const record of records) {
    const mapping = categoryMap[record.category];
    if (!mapping) errors.push(`Category lacks explicit mapping status: ${record.category}`);
    else if (mapping.siteCategorySlug !== record.siteCategorySlug) errors.push(`Category mapping mismatch: ${record.category}`);
  }
  return { errors, records, manifest, categoryMap, workbookHash, contentHash, root };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await validateGeneratedData();
  if (result.errors.length) {
    console.error(`Keyword validation failed:\n- ${result.errors.join('\n- ')}`);
    process.exitCode = 1;
  } else {
    console.log(`Validated ${result.records.length} keyword records; contentHash=${result.contentHash}`);
  }
}
