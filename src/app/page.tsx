import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, RefreshCw, Scale, ShieldCheck } from 'lucide-react';
import { ArticleCard } from '@/components/content/ArticleCard';
import { CategoryCard } from '@/components/content/CategoryCard';
import { SectionHeader } from '@/components/content/SectionHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { SearchField } from '@/components/ui/SearchField';
import { articles, categories } from '@/data/site';
import { getAllKeywords, getKeywordStats } from '@/lib/keywords';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const principles = [
  { icon: Scale, title: 'เทียบตามการใช้งาน', description: 'เริ่มจากโจทย์ งบ และข้อจำกัด แทนการเลือกจากกระแสเพียงอย่างเดียว' },
  { icon: ShieldCheck, title: 'เปิดเผยอย่างตรงไปตรงมา', description: 'แยกข้อมูลตัวอย่าง ข้อมูลวางแผน และ Affiliate ให้ผู้อ่านเห็นชัด' },
  { icon: RefreshCw, title: 'มีรอบตรวจข้อมูล', description: 'เนื้อหาจริงในอนาคตต้องระบุแหล่งข้อมูลและทบทวนเมื่อรายละเอียดเปลี่ยน' },
];

export default function Home() {
  const keywordStats = getKeywordStats();
  const keywordRecords = getAllKeywords();
  const mappedRecords = keywordRecords.filter((record) => record.siteCategorySlug !== null).length;
  const waitingRecords = keywordRecords.length - mappedRecords;

  return <main>
    <section className="home-hero"><Container className="hero-grid">
      <div className="hero-copy"><Badge tone="primary">MVP · เนื้อหาตัวอย่าง</Badge><h1>เลือกของให้ตรงกับการใช้งาน <span>ไม่ใช่แค่ตามกระแส</span></h1><p>คู่มือเลือกซื้อภาษาไทยที่ช่วยแยกสิ่งจำเป็นออกจากคำโฆษณา พร้อมบอกข้อดี ข้อจำกัด และสิ่งที่ควรเช็กก่อนตัดสินใจ</p><SearchField /><div className="hero-actions"><LinkButton href="/#guides">ดู Buying Guides <ArrowRight aria-hidden="true" size={17} /></LinkButton><LinkButton href="/about" variant="secondary">รู้จักแนวทางของเรา</LinkButton></div></div>
      <div className="hero-editorial" aria-label="ตัวอย่างกระบวนการเลือกซื้อ"><div className="hero-editorial__accent" aria-hidden="true" /><p className="eyebrow">Decision brief</p><h2>ก่อนซื้อ ให้ตอบ 3 คำถาม</h2><ol><li><span>01</span>ใช้กับงานอะไรเป็นหลัก</li><li><span>02</span>ข้อจำกัดที่ยอมไม่ได้คืออะไร</li><li><span>03</span>งบรวมและเงื่อนไขหลังการขายเหมาะไหม</li></ol><p className="hero-editorial__note">ตัวอย่างกรอบคิด ไม่ใช่คำแนะนำสินค้า</p></div>
    </Container></section>

    <section className="trust-strip" aria-label="หลักความน่าเชื่อถือ"><Container><ul>{principles.map(({ icon: Icon, title }) => <li key={title}><Icon aria-hidden="true" size={19} /><span>{title}</span></li>)}</ul></Container></section>

    <Section id="categories" labelledBy="categories-heading"><SectionHeader id="categories-heading" eyebrow="เริ่มจากเรื่องที่สนใจ" title="หมวดหมู่ยอดนิยม" description="หมวดที่แสดงคือ routes ตัวอย่างที่มีอยู่จริงใน MVP เท่านั้น ยังไม่เพิ่มหมวดจาก keyword ที่รอการพิจารณา" /><div className="category-grid">{categories.map((category) => <CategoryCard key={category.slug} category={category} articleCount={articles.filter((article) => article.category === category.slug).length} />)}</div></Section>

    <Section id="guides" tone="muted" labelledBy="featured-heading"><SectionHeader id="featured-heading" eyebrow="อ่านก่อนตัดสินใจ" title="Buying Guide เด่น" description="ตัวอย่างรูปแบบบทความที่เน้นคำถามสำคัญและข้อจำกัด โดยยังไม่มีข้อมูลสินค้า ราคา หรือคะแนนจริง" /><ArticleCard article={articles[0]} categoryName={categories.find((category) => category.slug === articles[0].category)?.name ?? ''} featured /></Section>

    <Section id="latest" labelledBy="latest-heading"><SectionHeader id="latest-heading" eyebrow="คลังเนื้อหาตัวอย่าง" title="บทความล่าสุด" description="ใช้ข้อมูลตัวอย่างเดิมเพื่อทดสอบระบบหน้าเว็บและเส้นทางเท่านั้น" /><div className="article-grid">{articles.slice(1).map((article) => <ArticleCard key={article.slug} article={article} categoryName={categories.find((category) => category.slug === article.category)?.name ?? ''} />)}</div></Section>

    <Section tone="raised" labelledBy="method-heading"><SectionHeader id="method-heading" eyebrow="วิธีคิดของเรา" title="เลือกอย่างมีเหตุผล ก่อนมองหาสินค้า" description="กรอบการทำงานนี้เป็นแนวทางสำหรับเนื้อหาในอนาคต ไม่ใช่การอ้างว่าเราได้ทดสอบสินค้าปัจจุบันแล้ว" /><div className="principle-grid">{principles.map(({ icon: Icon, title, description }, index) => <article key={title}><span className="principle-number">0{index + 1}</span><Icon aria-hidden="true" size={24} /><h3>{title}</h3><p>{description}</p></article>)}</div></Section>

    <Section labelledBy="keyword-heading"><div className="keyword-preview"><div><Badge>ข้อมูลวางแผนภายใน</Badge><h2 id="keyword-heading">Keyword Intelligence พร้อมสำหรับขั้นวางแผน</h2><p>สถิตินี้อ่านจาก Phase 2 data access layer โดยตรง และไม่ใช่จำนวนบทความที่เผยแพร่แล้ว</p></div><dl><div><dt>Keyword ทั้งหมด</dt><dd>{keywordStats.totalKeywords}</dd></div><div><dt>Mapped แล้ว</dt><dd>{mappedRecords}</dd></div><div><dt>รอพิจารณา</dt><dd>{waitingRecords}</dd></div></dl><p className="keyword-preview__note"><CheckCircle2 aria-hidden="true" size={17} /> มี {keywordStats.mappedCategoryCount} หมวดที่ mapping แล้ว โดยยังไม่สร้าง 30 keyword pages</p></div></Section>

    <Section tone="muted" labelledBy="newsletter-heading"><div className="newsletter-placeholder"><div><p className="eyebrow">ฟังก์ชันที่วางแผนไว้</p><h2 id="newsletter-heading">รับสรุปคู่มือใหม่ในอนาคต</h2><p>ระบบรับข่าวสารยังไม่เปิดใช้งาน และยังไม่มีการรับหรือจัดเก็บอีเมล</p></div><form aria-label="ตัวอย่างฟอร์มรับข่าวสาร"><label htmlFor="newsletter-email">อีเมล</label><div><input id="newsletter-email" type="email" placeholder="name@example.com" disabled /><button className="button button--primary" type="button" disabled>ยังไม่เปิดใช้งาน</button></div></form></div></Section>
  </main>;
}
