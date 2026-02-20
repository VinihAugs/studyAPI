import { forwardRef } from 'react';
import { Section } from '@/shared/components/Section';

export const HeroContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Section
      ref={ref}
      id="hero"
      dataSection="hero"
      className="min-h-screen flex items-center justify-center relative px-6"
    >
      <div className="max-w-3xl text-center z-10">
        <div className="inline-block mb-6">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase border border-primary/30 px-4 py-1.5 rounded-full glow-primary">
            Guia Interativo
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
          <span className="gradient-text">O que é</span>
          <br />
          <span className="text-foreground">uma API?</span>
        </h1>

        <div className="flex flex-col gap-6">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <strong className="text-foreground">Para entender de forma simples:</strong> Imagine que você está em um restaurante.
            Você escolhe um prato no cardápio, mas não pode entrar na cozinha para prepará-lo.
            A cozinha (o <em>servidor / Back-end</em>) tem todos os ingredientes, mas não interage com os clientes.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A <span className="text-primary font-semibold">API é o garçom</span>: ela anota o seu pedido,
            leva até a cozinha seguindo as regras da casa e retorna trazendo exatamente o que você solicitou,
            sem que você precise saber como a comida foi preparada.
          </p>
          <div className="max-w-2xl mx-auto border-l-4 border-primary pl-5 py-2 text-left bg-muted/20 rounded-r-md">
            <p className="text-base text-muted-foreground/90">
              <strong className="text-foreground block mb-2">Por baixo dos panos (O lado Técnico):</strong>
              Uma <span className="text-primary font-semibold">API</span> (<em>Application Programming Interface</em>)
              é um conjunto de protocolos e regras que atua como um contrato de comunicação entre diferentes sistemas.
              Ela recebe requisições estruturadas (via métodos HTTP), processa a lógica de negócios ou consulta bancos de dados,
              e devolve uma resposta padronizada (geralmente em formato JSON). Isso garante que a interface interaja com o servidor de forma segura e assíncrona, abstraindo toda a complexidade interna.
            </p>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground/50 text-sm font-mono">
          <span className="animate-pulse-glow">▼</span>
          <span>Role para explorar</span>
          <span className="animate-pulse-glow">▼</span>
        </div>
      </div>
    </Section>
  );
});

HeroContainer.displayName = 'HeroContainer';

