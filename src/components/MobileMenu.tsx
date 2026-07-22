'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type MobileMenuProps = {
  links: ReadonlyArray<{ href: string; label: string }>;
};

export function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return <div className="mobileMenu">
    <button
      ref={buttonRef}
      className="mobileMenuButton"
      type="button"
      aria-label={isOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      onClick={() => setIsOpen((current) => !current)}
    >
      <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
    </button>
    <nav id="mobile-navigation" className="mobileNav" aria-label="เมนูมือถือ" hidden={!isOpen}>
      {links.map((link, index) => <Link ref={index === 0 ? firstLinkRef : undefined} key={link.href} href={link.href} onClick={closeMenu}>{link.label}</Link>)}
    </nav>
  </div>;
}
