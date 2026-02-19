/**
 * Footer reutilizável
 */
import { ReactNode } from 'react';

interface FooterProps {
  children?: ReactNode;
  text?: string;
}

export const Footer = ({ children, text }: FooterProps) => {
  return (
    <footer className="py-16 px-6 text-center">
      <div className="neon-line max-w-xs mx-auto mb-8" />
      {children}
      {text && (
        <p className="text-muted-foreground text-sm font-mono">
          {text}
        </p>
      )}
    </footer>
  );
};

