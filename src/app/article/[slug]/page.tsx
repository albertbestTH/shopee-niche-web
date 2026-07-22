import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, categories } from '@/data/site';

type ArticleProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

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

  return <main className="articlePage"><div className="container narrow">
    <div className="breadcrumb">หน้าแรก / {category?.name}</div>
    <span className="eyebrow">{article.badge} • ข้อมูลตัวอย่าง</span>
    <h1>{article.title}</h1>
    <p className="lead">{article.excerpt}</p>
    <div className="articleHero">{article.image}</div>
    <aside className="notice">บทความนี้เป็นเนื้อหาตัวอย่างสำหรับตรวจสอบโครงสร้างเว็บไซต์ ยังไม่มีข้อมูลสินค้าหรือลิงก์ Affiliate จริง</aside>
    <h2>สรุปแบบเร็ว</h2>
    <p>เลือกสินค้าที่ตรงกับรูปแบบการใช้งานจริงก่อนดูราคา รุ่นที่แพงกว่าไม่ได้ดีกว่าสำหรับทุกคน จุดสำคัญคือความเข้ากันได้ ความทนทาน การรับประกัน และรีวิวจากผู้ซื้อที่ใช้งานใกล้เคียงกับคุณ</p>
    <h2>เกณฑ์ที่ใช้ในการเลือก</h2>
    <ul><li>เหมาะกับงานและงบประมาณ</li><li>มีข้อมูลสเปกและเงื่อนไขรับประกันชัดเจน</li><li>ร้านค้ามีคะแนนและประวัติการขายน่าเชื่อถือ</li><li>มีรีวิวภาพหรือวิดีโอจากผู้ซื้อจริง</li></ul>
    <div className="buyBox"><div><small>ตัวอย่างโครงสร้าง</small><h3>ยังไม่เชื่อมข้อมูลสินค้า</h3><p>ส่วนนี้เป็น placeholder สำหรับตรวจสอบ layout เท่านั้น</p></div><span className="disabledAction" aria-disabled="true">ยังไม่มีลิงก์สินค้า</span></div>
    <h2>ข้อควรระวังก่อนซื้อ</h2>
    <p>อย่าตัดสินจากยอดขายเพียงอย่างเดียว ตรวจสอบชื่อรุ่น ขนาด อุปกรณ์ในกล่อง ระยะเวลาจัดส่ง และเงื่อนไขคืนสินค้า โดยเฉพาะสินค้าที่มีหลายตัวเลือกในหน้าร้านเดียวกัน</p>
  </div></main>;
}
