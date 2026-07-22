'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from '../ui/IconButton';

type MobileMenuProps = { links: ReadonlyArray<{ href: string; label: string }> };

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

  return <div className="mobile-menu">
    <IconButton ref={buttonRef} className="mobile-menu__button" label={isOpen ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((value) => !value)}>
      {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
    </IconButton>
    <nav id="mobile-navigation" className="mobile-menu__panel" aria-label="เมนูมือถือ" hidden={!isOpen}>
      {links.map((link, index) => <Link ref={index === 0 ? firstLinkRef : undefined} key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>)}
    </nav>
  </div>;
}
