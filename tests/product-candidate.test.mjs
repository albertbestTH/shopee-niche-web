import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { pilotProductCandidate } from '../src/data/product-candidates.ts';
import { canShowVerificationCta, validateProductCandidate, validateShopeeAffiliateUrl } from '../src/lib/product-candidate.ts';

const suppliedUrl = 'https://s.shopee.co.th/50Xf18I4hg';
const read = (path) => readFileSync(path, 'utf8');

test('accepts the exact user-provided Shopee affiliate URL without mutation', () => {
  assert.equal(validateShopeeAffiliateUrl(suppliedUrl), suppliedUrl);
  assert.equal(pilotProductCandidate.affiliateUrl, suppliedUrl);
  assert.deepEqual(validateProductCandidate(pilotProductCandidate), []);
});

test('rejects non-https and non-allowlisted affiliate URLs', () => {
  assert.throws(() => validateShopeeAffiliateUrl('http://s.shopee.co.th/50Xf18I4hg'), /must use https/);
  assert.throws(() => validateShopeeAffiliateUrl('https://example.com/50Xf18I4hg'), /hostname is not allowed/);
  assert.throws(() => validateShopeeAffiliateUrl('https://evil.shopee.co.th/50Xf18I4hg'), /hostname is not allowed/);
});

test('candidate contains only user-provided evidence and unknown values', () => {
  assert.equal(pilotProductCandidate.verificationStatus, 'unverified');
  assert.equal(pilotProductCandidate.affiliateReady, false);
  assert.deepEqual(pilotProductCandidate.evidenceSources, ['user-provided-affiliate-link']);
  for (const field of ['name', 'brand', 'model', 'imageUrl', 'price', 'currency', 'rating', 'salesCount', 'storeName']) assert.equal(pilotProductCandidate[field], null, field);
  assert.deepEqual(pilotProductCandidate.specifications, {});
  assert.deepEqual(pilotProductCandidate.suitableFor, []);
});

test('unverified CTA is limited to development preview', () => {
  assert.equal(canShowVerificationCta(pilotProductCandidate, { environment: 'production', isDevelopmentPreview: true }), false);
  assert.equal(canShowVerificationCta(pilotProductCandidate, { environment: 'development', isDevelopmentPreview: false }), false);
  assert.equal(canShowVerificationCta(pilotProductCandidate, { environment: 'development', isDevelopmentPreview: true }), true);
});

test('verification link uses required external-link relationship', () => {
  const card = read('src/components/content/UnverifiedProductCard.tsx');
  assert.ok(card.includes('target="_blank"'));
  assert.ok(card.includes('rel="sponsored nofollow noopener noreferrer"'));
  assert.ok(card.includes('เปิดลิงก์สินค้าเพื่อช่วยตรวจสอบ'));
  for (const prohibited of ['ซื้อเลย', 'รุ่นที่แนะนำ', 'ราคาดีที่สุด', 'ดูราคาล่าสุด', 'เหมาะกับคนเท้ากว้าง']) assert.doesNotMatch(card, new RegExp(prohibited));
});

test('preview is noindex, excluded from sitemap, and absent from public articles', () => {
  const preview = read('src/app/dev/product-preview/page.tsx');
  assert.ok(preview.includes("process.env.NODE_ENV !== 'development'"));
  assert.ok(preview.includes('index: false'));
  assert.ok(preview.includes('follow: false'));
  assert.doesNotMatch(read('src/app/sitemap.ts'), /product-preview|product-candidate|pilotProductCandidate/);
  assert.doesNotMatch(read('src/app/article/[slug]/page.tsx'), /UnverifiedProductCard|pilotProductCandidate/);
});

test('unverified card exposes no commerce values or Product schema', () => {
  const card = read('src/components/content/UnverifiedProductCard.tsx');
  const preview = read('src/app/dev/product-preview/page.tsx');
  for (const expression of ['candidate.name', 'candidate.imageUrl', 'candidate.price', 'candidate.rating', 'candidate.salesCount']) assert.ok(!card.includes(expression), expression);
  assert.doesNotMatch(`${card}\n${preview}`, /application\/ld\+json|Product schema|"@type"\s*:\s*"Product"/i);
});
