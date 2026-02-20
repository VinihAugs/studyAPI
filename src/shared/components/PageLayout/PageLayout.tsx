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
    <div className="relative min-h-screen">
      {/* Wave Grid Background */}
      <WaveGridBackground className="pointer-events-none" style={{ zIndex: 0 }} />

      {/* Navbar */}
      <div style={{ zIndex: 20 }}>
        {navbar}
      </div>

      {/* Page Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

