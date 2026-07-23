import type { ProductCandidate } from '../types/product-candidate.ts';

const ALLOWED_AFFILIATE_HOSTNAMES = new Set(['s.shopee.co.th', 'shopee.co.th']);

export function validateShopeeAffiliateUrl(value: string): string {
  if (value !== value.trim()) throw new Error('Affiliate URL must not contain surrounding whitespace.');

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Affiliate URL must be a valid absolute URL.');
  }

  if (url.protocol !== 'https:') throw new Error('Affiliate URL must use https.');
  if (!ALLOWED_AFFILIATE_HOSTNAMES.has(url.hostname)) throw new Error('Affiliate URL hostname is not allowed.');
  if (url.username || url.password) throw new Error('Affiliate URL must not include credentials.');

  return value;
}

export function validateProductCandidate(candidate: ProductCandidate): readonly string[] {
  const errors: string[] = [];
  try { validateShopeeAffiliateUrl(candidate.affiliateUrl); } catch (error) { errors.push((error as Error).message); }
  if (candidate.verificationStatus === 'unverified' && candidate.affiliateReady !== false) errors.push('Unverified product cannot be affiliate-ready.');
  if (!candidate.evidenceSources.includes('user-provided-affiliate-link')) errors.push('User-provided link evidence is required.');
  if (candidate.imageUrl === candidate.affiliateUrl) errors.push('Affiliate URL cannot be used as imageUrl.');
  return Object.freeze(errors);
}

export type VerificationPreviewContext = Readonly<{
  environment: 'development' | 'production' | 'test';
  isDevelopmentPreview: boolean;
}>;

export function canShowVerificationCta(candidate: ProductCandidate, context: VerificationPreviewContext): boolean {
  return candidate.verificationStatus === 'unverified'
    && context.environment === 'development'
    && context.isDevelopmentPreview;
}
