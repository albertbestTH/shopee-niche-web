import type { ReactNode } from 'react';

export function SectionHeader({ eyebrow, title, description, action, id }: { eyebrow?: string; title: string; description?: string; action?: ReactNode; id?: string }) {
  return <header className="section-header">
    <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 id={id}>{title}</h2>{description && <p className="section-header__description">{description}</p>}</div>
    {action && <div className="section-header__action">{action}</div>}
  </header>;
}
