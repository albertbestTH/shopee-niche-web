import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = { title: 'นโยบายความเป็นส่วนตัว' };

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
