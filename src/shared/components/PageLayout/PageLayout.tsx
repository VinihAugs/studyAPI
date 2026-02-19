/**
 * Layout base para páginas
 * Componente reutilizável que fornece estrutura comum (background, grid, etc.)
 */
import { ReactNode, Suspense } from 'react';
import Scene3D from '@/components/Scene3D';

interface PageLayoutProps {
  children: ReactNode;
  activeSection: string;
  navbar: ReactNode;
}

export const PageLayout = ({ children, activeSection, navbar }: PageLayoutProps) => {
  return (
    <div className="relative bg-background min-h-screen">
      {/* Background 3D Scene */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
        <Suspense fallback={null}>
          <Scene3D activeSection={activeSection} />
        </Suspense>
      </div>

      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(185 100% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(185 100% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Navbar */}
      {navbar}

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

