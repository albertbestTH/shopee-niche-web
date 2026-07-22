import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, categories } from '@/data/site';

type CategoryProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function Category({ params }: CategoryProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const list = articles.filter((article) => article.category === slug);

  return <main className="section container">
    <span className="eyebrow">{category.icon} หมวดหมู่ • ข้อมูลตัวอย่าง</span>
    <h1>{category.name}</h1>
    <p className="lead">{category.description}</p>
    <div className="articleGrid categoryArticles">{list.map((article) => <article className="articleCard" key={article.slug}>
      <div className="articleVisual">{article.image}</div>
      <div className="articleBody"><small>{article.readTime}</small><h3>{article.title}</h3><p>{article.excerpt}</p><Link href={`/article/${article.slug}`}>อ่านตัวอย่าง →</Link></div>
    </article>)}</div>
  </main>;
}
