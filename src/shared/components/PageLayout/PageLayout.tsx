/**
 * Layout base para páginas
 * Componente reutilizável que fornece estrutura comum (background, grid, etc.)
 */
import { ReactNode } from 'react';
import { WaveGridBackground } from '@/components/WaveGridBackground';

interface PageLayoutProps {
  children: ReactNode;
  activeSection: string;
  navbar: ReactNode;
}

export const PageLayout = ({ children, activeSection, navbar }: PageLayoutProps) => {
  return (
    <>
      {/* Wave Grid Background */}
      <WaveGridBackground className="pointer-events-none z-0" />

      {/* Navbar */}
      <div className="relative z-[20]">
        {navbar}
      </div>

      {/* Page Content */}
      <div className="relative min-h-screen z-10 pt-20 md:pt-24">
        {children}
      </div>
    </>
  );
};

