import { useEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import HttpMethodsSection from '@/components/HttpMethodsSection';
import StatusCodesSection from '@/components/StatusCodesSection';
import FrontendExamples from '@/components/FrontendExamples';
import StateManagementSection from '@/components/StateManagementSection';
import BackendExamples from '@/components/BackendExamples';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveSection(section.dataset.section || 'hero'),
          onEnterBack: () => setActiveSection(section.dataset.section || 'hero'),
        });
      });

      const allSections = containerRef.current?.querySelectorAll('section');
      allSections?.forEach((section) => {
        gsap.fromTo(
          section.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-background min-h-screen">
      <div
        ref={sceneRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
      >
        <Suspense fallback={null}>
          <Scene3D activeSection={activeSection} />
        </Suspense>
      </div>

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

      <Navbar activeSection={activeSection} />

      <div className="relative z-10">
        <HeroSection />
        <HttpMethodsSection />
        <StatusCodesSection />
        <FrontendExamples />
        <StateManagementSection />
        <BackendExamples />

        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass rounded-2xl p-10 border border-primary/20 hover:border-primary/40 transition-all duration-500">
              <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Indo além</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                Pronto para o <span className="gradient-text">próximo nível</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Aprofunde-se em HTTP Headers, Cache, Autenticação vs Autorização,
                PUT vs PATCH com exemplos visuais e a evolução dos protocolos HTTP.
              </p>
              <Link
                to="/advanced"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 text-primary border border-primary/40 glow-primary font-mono text-sm hover:bg-primary/30 transition-all duration-300"
              >
                Conceitos Avançados →
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-16 px-6 text-center">
          <div className="neon-line max-w-xs mx-auto mb-8" />
          <p className="text-muted-foreground text-sm font-mono">
            Guia Interativo de APIs realizado para fins de estudo e instrução de API.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
