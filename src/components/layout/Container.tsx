import type { ElementType, ReactNode } from 'react';

export function Container({ children, as: Tag = 'div', size = 'default', className = '' }: { children: ReactNode; as?: ElementType; size?: 'default' | 'wide' | 'article'; className?: string }) {
  return <Tag className={`container container--${size} ${className}`.trim()}>{children}</Tag>;
}
