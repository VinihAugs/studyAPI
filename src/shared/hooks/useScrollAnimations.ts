/**
 * Hook para gerenciar animações de scroll com GSAP
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationsOptions {
  containerRef: React.RefObject<HTMLElement>;
  onSectionChange?: (sectionId: string) => void;
}

export const useScrollAnimations = ({ 
  containerRef, 
  onSectionChange 
}: UseScrollAnimationsOptions) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Detectar mudanças de seção
      const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            const sectionId = section.dataset.section || '';
            onSectionChange?.(sectionId);
          },
          onEnterBack: () => {
            const sectionId = section.dataset.section || '';
            onSectionChange?.(sectionId);
          },
        });
      });

      // Animações de entrada para seções
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
  }, [containerRef, onSectionChange]);
};

