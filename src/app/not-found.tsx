import Link from 'next/link';
import { ArrowRight, FileQuestion } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { LinkButton } from '@/components/ui/LinkButton';
import { categories } from '@/data/site';

export default function NotFound() {
  return <main className="not-found-page"><Container size="article"><FileQuestion aria-hidden="true" size={42} /><p className="eyebrow">404 · ไม่พบหน้า</p><h1>ลิงก์นี้อาจไม่ถูกต้อง หรือหน้านี้ไม่มีอยู่</h1><p className="page-lead">ลองกลับไปเริ่มที่หน้าแรก หรือเลือกจากหมวดหมู่ตัวอย่างที่มีอยู่จริง</p><LinkButton href="/">กลับหน้าแรก</LinkButton><nav aria-label="หมวดหมู่ที่แนะนำ"><h2>เลือกดูหมวดหมู่</h2>{categories.map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.name}<ArrowRight aria-hidden="true" size={16} /></Link>)}</nav></Container></main>;
}
