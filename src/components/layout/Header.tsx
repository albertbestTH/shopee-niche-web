import Link from 'next/link';
import { Search } from 'lucide-react';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { LinkButton } from '../ui/LinkButton';

export const navigationLinks = [
  { href: '/#categories', label: 'หมวดหมู่' },
  { href: '/#guides', label: 'Buying Guides' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
] as const;

export function Header() {
  return <header className="site-header"><Container className="site-header__inner">
    <Link className="brand" href="/" aria-label="คัดของดีจริง หน้าแรก"><span className="brand__mark" aria-hidden="true">ค</span><span>คัดของดีจริง</span></Link>
    <nav className="desktop-nav" aria-label="เมนูหลัก">{navigationLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
    <Link className="header-search" href="/#guides" aria-label="ไปที่รายการคู่มือ"><Search aria-hidden="true" size={19} /></Link>
    <LinkButton className="header-cta" href="/#guides">อ่านคู่มือ</LinkButton>
    <MobileMenu links={navigationLinks} />
  </Container></header>;
}
