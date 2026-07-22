import Link from 'next/link';
import type { ComponentProps } from 'react';

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: 'primary' | 'secondary' | 'quiet';
};

export function LinkButton({ className = '', variant = 'primary', ...props }: LinkButtonProps) {
  return <Link className={`button button--${variant} ${className}`.trim()} {...props} />;
}
