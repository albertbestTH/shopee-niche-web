import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = { title: 'Affiliate Disclosure' };

export default function AffiliateDisclosureLayout({ children }: { children: ReactNode }) {
  return children;
}
