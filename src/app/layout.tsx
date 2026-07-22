import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSiteUrl } from '@/lib/site-url';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

export const metadata: Metadata={metadataBase:getSiteUrl(),title:{default:'คัดของดีจริง | รีวิวของน่าใช้ก่อนซื้อ',template:'%s | คัดของดีจริง'},description:'รีวิว เปรียบเทียบ และคู่มือเลือกซื้อสินค้า Shopee ภาษาไทย แบบเข้าใจง่ายและตรงไปตรงมา'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th" className={notoSansThai.variable}><body><Header/>{children}<Footer/></body></html>}
