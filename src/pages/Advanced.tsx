import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AdvancedNavbar from '@/components/advanced/AdvancedNavbar';
import { PageLayout } from '@/shared/components/PageLayout';
import { Footer } from '@/shared/components/Footer';
import { useScrollAnimations } from '@/shared/hooks/useScrollAnimations';
import { AdvancedHeroContainer } from '@/containers/AdvancedHeroContainer';
import { AdvancedSectionsContainer } from '@/containers/AdvancedSectionsContainer';

const Advanced = () => {
  const [activeSection, setActiveSection] = useState('adv-hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useScrollAnimations({
    containerRef,
    onSectionChange: setActiveSection,
  });

  return (
    <PageLayout
      activeSection={activeSection}
      navbar={<AdvancedNavbar activeSection={activeSection} />}
    >
      <div ref={containerRef}>
        <AdvancedHeroContainer />
        <AdvancedSectionsContainer />
        <Footer>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors mb-4"
          >
            ← Voltar ao Guia Principal
          </Link>
          <p className="text-muted-foreground text-sm font-mono">
            Guia Interativo de APIs — Conceitos Avançados
          </p>
        </Footer>
      </div>
    </PageLayout>
  );
};

export default Advanced;

