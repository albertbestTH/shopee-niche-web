import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UnverifiedProductCard } from '@/components/content/UnverifiedProductCard';
import { Container } from '@/components/layout/Container';
import { pilotProductCandidate } from '@/data/product-candidates';
import { canShowVerificationCta } from '@/lib/product-candidate';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Development Product Verification Preview',
  robots: { index: false, follow: false, nocache: true },
};

export default function ProductPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();

  const showVerificationCta = canShowVerificationCta(pilotProductCandidate, {
    environment: 'development',
    isDevelopmentPreview: true,
  });

  return <main className="product-preview-page"><Container size="article">
    <p className="eyebrow">Development Preview · Noindex</p>
    <h1>ตรวจสอบ Product Candidate</h1>
    <p className="page-lead">พื้นที่ภายในสำหรับช่วยตรวจข้อมูลจากลิงก์ที่ผู้ใช้ให้มา ไม่ใช่หน้าบทความสาธารณะหรือรายการสินค้าแนะนำ</p>
    <UnverifiedProductCard candidate={pilotProductCandidate} showVerificationCta={showVerificationCta} />
  </Container></main>;
}
