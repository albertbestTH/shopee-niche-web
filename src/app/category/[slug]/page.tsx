import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { EmptyState } from '@/components/content/EmptyState';
import { SampleContentNotice } from '@/components/content/SampleContentNotice';
import { Container } from '@/components/layout/Container';
import { articles, categories } from '@/data/site';

type CategoryProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return category ? { title: category.name, description: category.description, alternates: { canonical: `/category/${slug}` } } : {};
}

export default async function Category({ params }: CategoryProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const list = articles.filter((article) => article.category === slug);

  return <main className="listing-page"><Container>
    <Breadcrumbs items={[{ label: 'หน้าแรก', href: '/' }, { label: 'หมวดหมู่', href: '/#categories' }, { label: category.name }]} />
    <header className="page-header"><p className="eyebrow">หมวดหมู่ · ข้อมูลตัวอย่าง</p><h1>{category.name}</h1><p className="page-lead">{category.description}</p><p className="page-count">{list.length} บทความตัวอย่าง</p></header>
    <SampleContentNotice />
    <section className="listing-content" aria-labelledby="category-articles"><h2 id="category-articles" className="visually-hidden">บทความในหมวด {category.name}</h2>{list.length > 0 ? <div className="article-grid">{list.map((article) => <ArticleCard key={article.slug} article={article} categoryName={category.name} />)}</div> : <EmptyState title="ยังไม่มีบทความในหมวดนี้" description="เราจะเพิ่มเนื้อหาเมื่อมีข้อมูลที่เหมาะสมและผ่านการตรวจสอบขอบเขตแล้ว" />}</section>
  </Container></main>;
}
