import { PackageSearch } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function ProductPlaceholderCard() {
  return <article className="product-placeholder">
    <div className="product-placeholder__visual"><PackageSearch aria-hidden="true" size={34} /></div>
    <div><Badge tone="warning">โครงสร้างตัวอย่าง</Badge><h3>พื้นที่สำหรับข้อมูลสินค้าที่ผ่านการค้นคว้า</h3><p>ส่วนนี้ยังไม่มีชื่อสินค้า ราคา คะแนน ยอดขาย หรือลิงก์ Affiliate และจะไม่เปิดให้คลิกจนกว่าจะมีข้อมูลจริงที่ตรวจสอบแหล่งที่มาแล้ว</p></div>
  </article>;
}
