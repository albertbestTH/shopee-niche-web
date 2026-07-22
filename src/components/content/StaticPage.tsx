import type { ReactNode } from 'react';
import { Container } from '../layout/Container';
import { Breadcrumbs } from './Breadcrumbs';

export function StaticPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: ReactNode }) {
  return <main className="static-page"><Container size="article"><Breadcrumbs items={[{ label: 'หน้าแรก', href: '/' }, { label: eyebrow }]} /><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-lead">{lead}</p><div className="prose">{children}</div></Container></main>;
}
