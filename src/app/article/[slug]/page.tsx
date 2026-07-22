import type { Metadata } from 'next';
import { CheckCircle2, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import { AffiliateDisclosureNotice } from '@/components/content/AffiliateDisclosureNotice';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { ProductPlaceholderCard } from '@/components/content/ProductPlaceholderCard';
import { SampleContentNotice } from '@/components/content/SampleContentNotice';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { articles, categories } from '@/data/site';

type ArticleProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/article/${slug}` } } : {};
}

export default async function Article({ params }: ArticleProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const category = categories.find((item) => item.slug === article.category);
  const related = articles.filter((item) => item.slug !== slug).slice(0, 2);

  return <main className="editorial-page">
    <Container size="article"><Breadcrumbs items={[{ label: 'หน้าแรก', href: '/' }, { label: category?.name ?? 'หมวดหมู่', href: `/category/${article.category}` }, { label: article.title }]} />
      <header className="article-header"><div className="article-header__badges"><Badge tone="primary">ข้อมูลตัวอย่าง</Badge><Badge>{category?.name}</Badge></div><h1>{article.title}</h1><p className="page-lead">{article.excerpt}</p><p className="article-meta">เวลาอ่านโดยประมาณ {article.readTime}</p></header>
      <SampleContentNotice />
      <div className="article-hero-placeholder" role="img" aria-label="พื้นที่ภาพประกอบบทความตัวอย่าง"><FileText aria-hidden="true" size={44} /><span>พื้นที่ภาพประกอบสำหรับบทความจริงในอนาคต</span></div>
      <AffiliateDisclosureNotice />
      <nav className="table-of-contents" aria-labelledby="toc-title"><h2 id="toc-title">สารบัญ</h2><ol><li><a href="#quick-summary">สรุปแบบเร็ว</a></li><li><a href="#selection-criteria">เกณฑ์ที่ใช้เลือก</a></li><li><a href="#product-section">พื้นที่ข้อมูลสินค้า</a></li><li><a href="#buying-checklist">เช็กลิสต์ก่อนซื้อ</a></li></ol></nav>
      <article className="prose article-prose">
        <section id="quick-summary"><h2>สรุปแบบเร็ว</h2><div className="quick-summary"><p>เลือกสินค้าที่ตรงกับรูปแบบการใช้งานจริงก่อนดูราคา รุ่นที่แพงกว่าไม่ได้เหมาะกับทุกคน จุดสำคัญคือความเข้ากันได้ ความทนทาน การรับประกัน และข้อมูลจากผู้ใช้ที่มีบริบทใกล้เคียงกับคุณ</p></div></section>
        <section id="selection-criteria"><h2>เกณฑ์ที่ใช้ในการเลือก</h2><p>ส่วนนี้เป็นกรอบตัวอย่างสำหรับบทความในอนาคต ยังไม่ใช่ผลการทดสอบสินค้า</p><ul><li>เหมาะกับงานหลักและงบประมาณที่กำหนด</li><li>มีข้อมูลสเปกและเงื่อนไขรับประกันชัดเจน</li><li>ข้อจำกัดสำคัญถูกระบุ ไม่ซ่อนไว้หลังคำโฆษณา</li><li>ข้อมูลร้านค้าและเงื่อนไขคืนสินค้าตรวจสอบได้</li></ul></section>
        <section id="product-section"><h2>พื้นที่ข้อมูลสินค้า</h2><ProductPlaceholderCard /></section>
        <section id="buying-checklist"><h2>เช็กลิสต์ก่อนซื้อ</h2><ul className="checklist"><li><CheckCircle2 aria-hidden="true" />ตรวจชื่อรุ่น ขนาด และอุปกรณ์ในกล่อง</li><li><CheckCircle2 aria-hidden="true" />อ่านเงื่อนไขรับประกันและคืนสินค้า</li><li><CheckCircle2 aria-hidden="true" />เปรียบเทียบความต้องการกับข้อจำกัดของสินค้า</li><li><CheckCircle2 aria-hidden="true" />อย่าตัดสินจากยอดขายหรือข้อความโฆษณาเพียงอย่างเดียว</li></ul></section>
      </article>
    </Container>
    <section className="related-section" aria-labelledby="related-heading"><Container><h2 id="related-heading">บทความตัวอย่างที่เกี่ยวข้อง</h2><div className="article-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} categoryName={categories.find((entry) => entry.slug === item.category)?.name ?? ''} />)}</div></Container></section>
  </main>;
}
