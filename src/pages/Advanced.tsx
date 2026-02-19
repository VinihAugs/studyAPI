import { useEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from '@/components/Scene3D';
import HeadersSection from '@/components/advanced/HeadersSection';
import IdempotencySection from '@/components/advanced/IdempotencySection';
import AuthSection from '@/components/advanced/AuthSection';
import CacheSection from '@/components/advanced/CacheSection';
import PutPatchSection from '@/components/advanced/PutPatchSection';
import ProtocolsSection from '@/components/advanced/ProtocolsSection';
import AdvancedNavbar from '@/components/advanced/AdvancedNavbar';

gsap.registerPlugin(ScrollTrigger);

const Advanced = () => {
  const [activeSection, setActiveSection] = useState('adv-hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveSection(section.dataset.section || 'adv-hero'),
          onEnterBack: () => setActiveSection(section.dataset.section || 'adv-hero'),
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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
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

      <AdvancedNavbar activeSection={activeSection} />

      <div className="relative z-10">
        <section id="adv-hero" data-section="adv-hero" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
          <div className="max-w-3xl text-center z-10 flex flex-col items-center gap-6">
            <Link
              to="/"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              ← Voltar ao Guia Principal
            </Link>
            <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase border border-primary/30 px-4 py-1.5 rounded-full glow-primary">
              Aprofundamento
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1] tracking-tight">
              <span className="gradient-text">Conceitos</span>
              <br />
              <span className="text-foreground">Avançados</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Aprofunde-se nos detalhes do protocolo HTTP: cabeçalhos, cache, autenticação,
              idempotência e a evolução dos protocolos web.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground/50 text-sm font-mono">
              <span className="animate-pulse-glow">▼</span>
              <span>Role para explorar</span>
              <span className="animate-pulse-glow">▼</span>
            </div>
          </div>
        </section>

        <HeadersSection />
        <IdempotencySection />
        <AuthSection />
        <CacheSection />
        <PutPatchSection />
        <ProtocolsSection />

        <footer className="py-16 px-6 text-center">
          <div className="neon-line max-w-xs mx-auto mb-8" />
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors mb-4"
          >
            ← Voltar ao Guia Principal
          </Link>
          <p className="text-muted-foreground text-sm font-mono">
            Guia Interativo de APIs — Conceitos Avançados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Advanced;

