import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '@/shared/components/Section';

export const CallToActionContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Section
      ref={ref}
      id="cta"
      dataSection="cta"
      className="py-20 px-6"
    >
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
    </Section>
  );
});

CallToActionContainer.displayName = 'CallToActionContainer';

