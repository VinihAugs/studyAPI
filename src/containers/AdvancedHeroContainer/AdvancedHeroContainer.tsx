/**
 * Container para o Hero da página Advanced
 */
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '@/shared/components/Section';

export const AdvancedHeroContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Section
      ref={ref}
      id="adv-hero"
      dataSection="adv-hero"
      className="min-h-screen flex items-center justify-center relative px-6 pt-20"
    >
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
    </Section>
  );
});

AdvancedHeroContainer.displayName = 'AdvancedHeroContainer';

