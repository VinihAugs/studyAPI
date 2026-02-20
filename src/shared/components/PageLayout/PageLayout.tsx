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
      <WaveGridBackground className="pointer-events-none z-0" />

      <div className="relative z-[20]">
        {navbar}
      </div>

      <div className="relative min-h-screen z-10 pt-20 md:pt-24">
        {children}
      </div>
    </>
  );
};

