import Link from 'next/link';
import { MobileMenu } from './MobileMenu';

export const navigationLinks = [
  { href: '/#categories', label: 'หมวดหมู่' },
  { href: '/#latest', label: 'บทความ' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
] as const;

export function Header() {
  return <header className="header"><div className="container nav">
    <Link className="brand" href="/"><span>คัดของดี</span><b>จริง</b></Link>
    <nav className="desktopNav" aria-label="เมนูหลัก">{navigationLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
    <Link className="navCta" href="/#latest">ดูของน่าใช้</Link>
    <MobileMenu links={navigationLinks} />
  </div></header>;
}
