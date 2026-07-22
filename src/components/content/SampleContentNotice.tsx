import { FileText } from 'lucide-react';

export function SampleContentNotice({ compact = false }: { compact?: boolean }) {
  return <aside className={`notice notice--sample${compact ? ' notice--compact' : ''}`}><FileText aria-hidden="true" /><div><strong>ข้อมูลตัวอย่าง</strong>{!compact && <p>หน้านี้ใช้ข้อมูลตัวอย่างเพื่อทดสอบโครงสร้างเว็บไซต์ ยังไม่ใช่ผลการรีวิวสินค้า การทดสอบ หรือคำแนะนำให้ซื้อ</p>}</div></aside>;
}
