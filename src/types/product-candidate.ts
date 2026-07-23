export type ProductVerificationStatus = 'unverified' | 'verified';
export type ProductEvidenceSource = 'user-provided-affiliate-link';

export type ProductCandidate = Readonly<{
  id: string;
  affiliateUrl: string;
  affiliateReady: false;
  verificationStatus: ProductVerificationStatus;
  evidenceSources: readonly ProductEvidenceSource[];
  name: string | null;
  brand: string | null;
  model: string | null;
  imageUrl: string | null;
  price: number | null;
  currency: string | null;
  rating: number | null;
  salesCount: number | null;
  storeName: string | null;
  specifications: Readonly<Record<string, string>>;
  suitableFor: readonly string[];
}>;
