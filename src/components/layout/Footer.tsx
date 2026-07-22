import Link from 'next/link';
import { categories } from '@/data/site';
import { Container } from './Container';

export function Footer() {
  return <footer className="site-footer"><Container>
    <div className="footer-grid">
      <div className="footer-intro"><Link className="brand" href="/"><span className="brand__mark" aria-hidden="true">ค</span><span>คัดของดีจริง</span></Link><p>คู่มือเลือกซื้อภาษาไทยที่ช่วยจัดคำถามให้ชัด บอกข้อดีและข้อจำกัด โดยไม่ขายเกินจริง</p><p className="footer-disclosure">บางลิงก์อาจเป็น Affiliate Link ในอนาคต โดยไม่มีค่าใช้จ่ายเพิ่มสำหรับผู้อ่าน</p></div>
      <nav aria-label="ลิงก์หมวดหมู่"><h2>หมวดหมู่</h2>{categories.map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.name}</Link>)}</nav>
      <nav aria-label="ลิงก์ข้อมูล"><h2>ข้อมูล</h2><Link href="/about">เกี่ยวกับเรา</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">นโยบายความเป็นส่วนตัว</Link></nav>
    </div>
    <p className="copyright">© 2026 คัดของดีจริง — เว็บไซต์ MVP พร้อมข้อมูลตัวอย่าง</p>
  </Container></footer>;
}
