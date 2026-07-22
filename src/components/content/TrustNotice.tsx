import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

export function TrustNotice({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="notice notice--trust"><ShieldCheck aria-hidden="true" /><div><strong>{title}</strong><div>{children}</div></div></aside>;
}
