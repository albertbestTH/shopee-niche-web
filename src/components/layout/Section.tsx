import type { ReactNode } from 'react';
import { Container } from './Container';

export function Section({ children, tone = 'default', id, className = '', labelledBy }: { children: ReactNode; tone?: 'default' | 'muted' | 'raised'; id?: string; className?: string; labelledBy?: string }) {
  return <section id={id} aria-labelledby={labelledBy} className={`section section--${tone} ${className}`.trim()}><Container>{children}</Container></section>;
}
