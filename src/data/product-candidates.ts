import { validateProductCandidate } from '../lib/product-candidate.ts';
import type { ProductCandidate } from '../types/product-candidate.ts';

export const pilotProductCandidate: ProductCandidate = Object.freeze({
  id: 'pilot-user-link-001',
  affiliateUrl: 'https://s.shopee.co.th/50Xf18I4hg',
  affiliateReady: false,
  verificationStatus: 'unverified',
  evidenceSources: Object.freeze(['user-provided-affiliate-link'] as const),
  name: null,
  brand: null,
  model: null,
  imageUrl: null,
  price: null,
  currency: null,
  rating: null,
  salesCount: null,
  storeName: null,
  specifications: Object.freeze({}),
  suitableFor: Object.freeze([]),
});

const validationErrors = validateProductCandidate(pilotProductCandidate);
if (validationErrors.length > 0) throw new Error(`Invalid pilot product candidate: ${validationErrors.join('; ')}`);
