import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { PageLayout } from '@/shared/components/PageLayout';
import { Footer } from '@/shared/components/Footer';
import { useScrollAnimations } from '@/shared/hooks/useScrollAnimations';
import { HeroContainer } from '@/containers/HeroContainer';
import { HttpMethodsContainer } from '@/containers/HttpMethodsContainer';
import { StatusCodesContainer } from '@/containers/StatusCodesContainer';
import { FrontendExamplesContainer } from '@/containers/FrontendExamplesContainer';
import { StateManagementContainer } from '@/containers/StateManagementContainer';
import { BackendExamplesContainer } from '@/containers/BackendExamplesContainer';
import { CallToActionContainer } from '@/containers/CallToActionContainer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollAnimations({
    containerRef,
    onSectionChange: setActiveSection,
  });

  return (
    <PageLayout
      activeSection={activeSection}
      navbar={<Navbar activeSection={activeSection} />}
    >
      <div ref={containerRef}>
        <HeroContainer />
        <HttpMethodsContainer />
        <StatusCodesContainer />
        <FrontendExamplesContainer />
        <StateManagementContainer />
        <BackendExamplesContainer />
        <CallToActionContainer />
        <Footer text="Guia Interativo de APIs realizado para fins de estudo e instrução de API." />
      </div>
    </PageLayout>
  );
};

export default Index;
