import Link from 'next/link';
import { Activity, Bike, Laptop, TentTree, ArrowRight } from 'lucide-react';

const icons = { motorcycle: Bike, camping: TentTree, running: Activity, it: Laptop } as const;

export function CategoryCard({ category, articleCount }: { category: { slug: string; name: string; description: string }; articleCount: number }) {
  const Icon = icons[category.slug as keyof typeof icons] ?? Laptop;
  return <Link className="category-card" href={`/category/${category.slug}`}>
    <span className="category-card__icon"><Icon aria-hidden="true" size={24} /></span>
    <div><h3>{category.name}</h3><p>{category.description}</p></div>
    <span className="category-card__meta">{articleCount} บทความตัวอย่าง <ArrowRight aria-hidden="true" size={16} /></span>
  </Link>;
}
