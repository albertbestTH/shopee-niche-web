import Link from 'next/link';
import { Info } from 'lucide-react';

export function AffiliateDisclosureNotice() {
  return <aside className="notice notice--affiliate"><Info aria-hidden="true" /><div><strong>ความโปร่งใสเรื่อง Affiliate</strong><p>เว็บไซต์อาจได้รับค่าคอมมิชชันจากลิงก์พันธมิตรในอนาคต โดยไม่มีค่าใช้จ่ายเพิ่มสำหรับผู้อ่าน ขณะนี้เนื้อหาตัวอย่างยังไม่มีลิงก์สินค้าจริง</p><Link href="/affiliate-disclosure">อ่านรายละเอียด Affiliate Disclosure</Link></div></aside>;
}
