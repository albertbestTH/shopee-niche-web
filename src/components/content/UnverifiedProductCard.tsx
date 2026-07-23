import { ExternalLink, Link2 } from 'lucide-react';
import type { ProductCandidate } from '@/types/product-candidate';
import { Badge } from '../ui/Badge';

export function UnverifiedProductCard({ candidate, showVerificationCta }: { candidate: ProductCandidate; showVerificationCta: boolean }) {
  return <article className="unverified-product-card">
    <div className="unverified-product-card__symbol"><Link2 aria-hidden="true" size={28} /></div>
    <div className="unverified-product-card__body">
      <Badge tone="warning">ยังไม่ยืนยันข้อมูล</Badge>
      <h2>มีลิงก์สินค้าแล้ว กำลังตรวจสอบรายละเอียด</h2>
      <p>ยังไม่มีรายละเอียดสินค้าที่ผ่านการยืนยัน จึงแสดงเฉพาะสถานะและแหล่งที่มาของลิงก์สำหรับกระบวนการตรวจสอบภายใน</p>
      {showVerificationCta && <div className="verification-action"><Badge tone="primary">โหมดตรวจสอบข้อมูล</Badge><a className="button button--secondary" href={candidate.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">เปิดลิงก์สินค้าเพื่อช่วยตรวจสอบ <ExternalLink aria-hidden="true" size={16} /></a></div>}
    </div>
  </article>;
}
