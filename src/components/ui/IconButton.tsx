import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ label, children, className = '', type = 'button', ...props }, ref) {
  return <button ref={ref} aria-label={label} className={`icon-button ${className}`.trim()} type={type} {...props}>{children}</button>;
});
