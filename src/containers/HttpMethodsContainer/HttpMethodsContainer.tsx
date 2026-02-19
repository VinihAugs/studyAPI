/**
 * Container para a seção de Métodos HTTP
 * Encapsula toda a lógica e apresentação da seção
 */
import { forwardRef, useState } from 'react';
import { Section } from '@/shared/components/Section';
import { httpMethods, debugTools } from '@/features/HttpMethods/data';
import { colorMap, textColorMap, bgBadge } from '@/features/HttpMethods/constants';
import { PropBadge } from '@/features/HttpMethods/components/PropBadge';
import type { ViewTab } from '@/features/HttpMethods/types';

export const HttpMethodsContainer = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeView, setActiveView] = useState<ViewTab>('methods');

  return (
    <Section
      ref={ref}
      id="methods"
      dataSection="methods"
      className="py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 02</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Métodos <span className="gradient-text">HTTP</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada requisição carrega um verbo que define a intenção da ação.
            Métodos <strong className="text-foreground">seguros</strong> não modificam nada no servidor.{' '}
            <strong className="text-foreground">Idempotentes</strong> produzem o mesmo resultado independente de quantas vezes você os execute.{' '}
            <strong className="text-foreground">Cacheáveis</strong> permitem que navegadores e proxies salvem respostas para reutilização.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-foreground">(Nomenclaturas escolhidas para entendimento didático, não são regras)</strong>
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="flex gap-2 mb-10 justify-center">
          <button
            onClick={() => setActiveView('methods')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              activeView === 'methods'
                ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            8 Métodos
          </button>
          <button
            onClick={() => setActiveView('tools')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              activeView === 'tools'
                ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            🛠 Ferramentas de Debug
          </button>
        </div>

        {activeView === 'methods' && (
          <>
            <div className="flex flex-wrap gap-4 justify-center mb-8 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" /> Safe
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" /> Idempotent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-warning" /> Cacheable
              </span>
            </div>

            <div className="grid gap-6">
              {httpMethods.map((method) => (
                <div
                  key={method.verb}
                  data-section={method.section}
                  className={`glass rounded-xl p-6 border ${colorMap[method.color]} transition-all duration-500`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{method.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className={`font-mono font-bold text-xl ${textColorMap[method.color]}`}>
                          {method.verb}
                        </span>
                        <span className="text-sm text-muted-foreground">— {method.label}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <PropBadge label="Safe" active={method.safe} />
                        <PropBadge label="Idempotent" active={method.idempotent} />
                        <PropBadge label="Cacheable" active={method.cacheable} />
                      </div>

                      <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                        {method.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <code className="text-xs font-mono text-muted-foreground bg-background/50 px-3 py-1.5 rounded-md">
                          {method.example}
                        </code>
                        <span className={`text-xs font-mono px-2 py-1 rounded-md ${bgBadge[method.color]}`}>
                          {method.statusExample}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 glass rounded-xl border border-border/50 overflow-hidden">
              <div className="p-5 border-b border-border/30">
                <h3 className="font-mono font-bold text-lg text-foreground">
                  📋 Resumo — Propriedades dos Métodos
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Uma requisição GET retorna <code className="text-primary font-mono text-xs">200 OK</code> quando funciona
                  ou <code className="text-destructive font-mono text-xs">404 Not Found</code> quando o recurso não existe.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-border/30 text-muted-foreground">
                      <th className="text-left px-5 py-3">Método</th>
                      <th className="text-center px-3 py-3">Safe</th>
                      <th className="text-center px-3 py-3">Idempotent</th>
                      <th className="text-center px-3 py-3">Cacheable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {httpMethods.map((m) => (
                      <tr
                        key={m.verb}
                        className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                      >
                        <td className={`px-5 py-3 font-bold ${textColorMap[m.color]}`}>{m.verb}</td>
                        <td className="text-center px-3 py-3">
                          {m.safe ? '✅' : '❌'}
                        </td>
                        <td className="text-center px-3 py-3">
                          {m.idempotent ? '✅' : '❌'}
                        </td>
                        <td className="text-center px-3 py-3">
                          {m.cacheable ? '✅' : '❌'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeView === 'tools' && (
          <div className="space-y-8">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Como Checar <span className="gradient-text">Status Codes</span>
              </h3>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                Precisa ver os status codes durante o debugging? Estas ferramentas facilitam sua vida.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {debugTools.map((tool) => (
                <div
                  key={tool.title}
                  className="glass rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <h4 className="font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h4>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-3">
                    {tool.description}
                  </p>
                  <div className="flex items-start gap-2 bg-background/50 rounded-md px-3 py-2">
                    <span className="text-primary text-xs mt-0.5">💡</span>
                    <code className="text-xs font-mono text-muted-foreground leading-relaxed">
                      {tool.tip}
                    </code>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl border border-primary/20 p-5 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Dica:</strong> Combine essas ferramentas!
                Use o <span className="text-primary font-mono">DevTools</span> para desenvolvimento local,{' '}
                <span className="text-primary font-mono">curl</span> para scripts automatizados e{' '}
                <span className="text-primary font-mono">extensões</span> para auditorias em lote de URLs.
              </p>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
});

HttpMethodsContainer.displayName = 'HttpMethodsContainer';

