import { StaticPage } from '@/components/content/StaticPage';
import { AffiliateDisclosureNotice } from '@/components/content/AffiliateDisclosureNotice';

export default function Page() {
  return <StaticPage eyebrow="เกี่ยวกับเรา" title="ช่วยให้คุณเลือกของได้ตรงงานกว่าเดิม" lead="คัดของดีจริงเป็นเว็บไซต์รีวิวและ Buying Guide ภาษาไทยที่เน้นการอธิบายอย่างเป็นกลาง อ่านง่าย และไม่ขายเกินจริง">
    <h2>หลักการของเรา</h2><p>เราเริ่มจากโจทย์การใช้งาน ข้อจำกัด และงบประมาณ แทนการเชียร์สินค้าที่แพงที่สุด เนื้อหาควรบอกทั้งข้อดีและสิ่งที่ต้องแลก เพื่อให้ผู้อ่านตัดสินใจด้วยข้อมูลที่เหมาะกับตัวเอง</p>
    <h2>สถานะปัจจุบัน</h2><p>เว็บไซต์นี้ยังเป็น MVP บทความและหมวดหมู่ที่เห็นเป็นข้อมูลตัวอย่างสำหรับตรวจโครงสร้างและประสบการณ์ใช้งาน ยังไม่ใช่ผลการทดสอบหรือคำแนะนำสินค้าจริง</p>
    <AffiliateDisclosureNotice />
  </StaticPage>;
}
