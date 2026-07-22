import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSiteUrl } from '@/lib/site-url';
export const metadata: Metadata={metadataBase:getSiteUrl(),title:{default:'คัดของดีจริง | รีวิวของน่าใช้ก่อนซื้อ',template:'%s | คัดของดีจริง'},description:'รีวิว เปรียบเทียบ และคู่มือเลือกซื้อสินค้า Shopee ภาษาไทย แบบเข้าใจง่ายและตรงไปตรงมา'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body><Header/>{children}<Footer/></body></html>}
