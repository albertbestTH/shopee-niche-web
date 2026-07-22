import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return <nav aria-label="เส้นทางนำทาง" className="breadcrumbs"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>
    {index > 0 && <ChevronRight aria-hidden="true" size={14} />}
    {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
  </li>)}</ol></nav>;
}
