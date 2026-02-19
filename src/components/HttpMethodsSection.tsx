import { forwardRef, useState } from 'react';


type ColorKey = 'primary' | 'success' | 'warning' | 'destructive' | 'accent' | 'secondary';

interface HttpMethod {
  verb: string;
  label: string;
  description: string;
  example: string;
  statusExample: string;
  color: ColorKey;
  icon: string;
  section: string;
  safe: boolean;
  idempotent: boolean;
  cacheable: boolean;
}

const methods: HttpMethod[] = [
  {
    verb: 'GET',
    label: 'Buscar dados',
    description:
      'Recupera dados de um recurso. É o método mais comum. Seguro, idempotente e cacheável — como pedir o cardápio: você só olha, não altera nada.',
    example: 'GET /api/users → Lista todos os usuários',
    statusExample: '200 OK · 404 Not Found',
    color: 'primary',
    icon: '📥',
    section: 'get',
    safe: true,
    idempotent: true,
    cacheable: true,
  },
  {
    verb: 'HEAD',
    label: 'Apenas cabeçalhos',
    description:
      'Funciona igual ao GET, mas retorna apenas os cabeçalhos (headers), sem o corpo da resposta. Útil para verificar se um recurso existe ou checar o tamanho de um arquivo antes de baixá-lo.',
    example: 'HEAD /api/users → Retorna headers sem body',
    statusExample: '200 OK',
    color: 'secondary',
    icon: '🔍',
    section: 'head',
    safe: true,
    idempotent: true,
    cacheable: true,
  },
  {
    verb: 'POST',
    label: 'Criar recurso',
    description:
      'Envia dados para o servidor criar algo novo. Submete formulários e cria recursos. Não é idempotente — chamá-lo duas vezes pode criar dois recursos.',
    example: 'POST /api/users → Cria um novo usuário',
    statusExample: '201 Created · 400 Bad Request',
    color: 'success',
    icon: '📤',
    section: 'post',
    safe: false,
    idempotent: false,
    cacheable: false,
  },
  {
    verb: 'PUT',
    label: 'Substituir recurso',
    description:
      'Substitui um recurso ou sua representação por completo. É idempotente: executá-lo várias vezes produz o mesmo resultado que executá-lo uma única vez.',
    example: 'PUT /api/users/1 → Substitui o usuário #1 inteiro',
    statusExample: '200 OK · 204 No Content',
    color: 'warning',
    icon: '🔄',
    section: 'put',
    safe: false,
    idempotent: true,
    cacheable: false,
  },
  {
    verb: 'PATCH',
    label: 'Atualizar parcialmente',
    description:
      'Atualiza campos específicos de um recurso. Diferente do PUT, que substitui tudo, o PATCH modifica apenas o que foi enviado — cirúrgico e eficiente.',
    example: 'PATCH /api/users/1 → Atualiza o e-mail do usuário #1',
    statusExample: '200 OK · 422 Unprocessable Entity',
    color: 'accent',
    icon: '✏️',
    section: 'patch',
    safe: false,
    idempotent: false,
    cacheable: false,
  },
  {
    verb: 'DELETE',
    label: 'Remover recurso',
    description:
      'Remove um recurso permanentemente. É idempotente: a primeira chamada remove; chamadas posteriores não encontram nada para remover, mas não falham.',
    example: 'DELETE /api/users/1 → Remove o usuário #1',
    statusExample: '204 No Content · 404 Not Found',
    color: 'destructive',
    icon: '🗑️',
    section: 'delete',
    safe: false,
    idempotent: true,
    cacheable: false,
  },
  {
    verb: 'OPTIONS',
    label: 'Opções de comunicação',
    description:
      'Retorna os métodos HTTP suportados pelo recurso. Muito usado em requisições CORS (cross-origin) — o navegador envia um OPTIONS antes de requisições complexas para saber o que é permitido.',
    example: 'OPTIONS /api/users → Allow: GET, POST, OPTIONS',
    statusExample: '200 OK · 204 No Content',
    color: 'primary',
    icon: '⚙️',
    section: 'options',
    safe: true,
    idempotent: true,
    cacheable: false,
  },
  {
    verb: 'TRACE',
    label: 'Depuração de caminho',
    description:
      'Executa um loop-back de teste pelo caminho até o recurso. Ferramenta de debugging que mostra como a requisição foi recebida pelo servidor. Geralmente desabilitado em produção por segurança.',
    example: 'TRACE /api/users → Ecoa a requisição recebida',
    statusExample: '200 OK',
    color: 'secondary',
    icon: '🔬',
    section: 'trace',
    safe: true,
    idempotent: true,
    cacheable: false,
  },
];


const debugTools = [
  {
    title: 'DevTools do Navegador',
    icon: '🌐',
    description:
      'Clique com botão direito → Inspecionar → aba Network. Recarregue a página e veja cada requisição com seu status code, tamanho e tempo. Filtre por status para encontrar erros rapidamente.',
    tip: 'Chrome, Firefox, Safari e Edge — todos funcionam da mesma forma.',
  },
  {
    title: 'curl -I',
    icon: '⌨️',
    description:
      'No terminal, use curl com a flag -I para receber apenas os headers (incluindo o status code). Rápido, direto e ideal para scripts.',
    tip: 'curl -I https://api.example.com/users',
  },
  {
    title: 'WebSniffer',
    icon: '🔎',
    description:
      'Ferramenta online — acesse websniffer.cc, insira a URL, escolha o tipo de requisição (GET, POST, HEAD) e o client. Veja como a página carrega em diferentes navegadores e até no Googlebot.',
    tip: 'Sem instalação necessária — funciona direto no browser.',
  },
  {
    title: 'Extensões de Navegador',
    icon: '🧩',
    description:
      'Extensões como Redirect Path ou Link Checker escaneiam páginas inteiras e destacam os status codes visualmente. Vermelho = problemas, verde = tudo OK.',
    tip: 'Ótimo para checar múltiplas URLs de uma vez.',
  },
];


const colorMap: Record<ColorKey, string> = {
  primary: 'border-primary/40 glow-primary',
  success: 'border-success/40 glow-success',
  warning: 'border-warning/40 glow-warning',
  destructive: 'border-destructive/40 glow-destructive',
  accent: 'border-accent/40 glow-accent',
  secondary: 'border-border/60',
};

const textColorMap: Record<ColorKey, string> = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  accent: 'text-accent',
  secondary: 'text-muted-foreground',
};

const bgBadge: Record<ColorKey, string> = {
  primary: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  destructive: 'bg-destructive/15 text-destructive',
  accent: 'bg-accent/15 text-accent',
  secondary: 'bg-muted text-muted-foreground',
};


function PropBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${active
          ? 'border-primary/50 bg-primary/10 text-primary'
          : 'border-border/40 bg-muted/30 text-muted-foreground/50 line-through'
        }`}
    >
      {label}
    </span>
  );
}


type ViewTab = 'methods' | 'tools';


const HttpMethodsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeView, setActiveView] = useState<ViewTab>('methods');

  return (
    <section ref={ref} id="methods" data-section="methods" className="py-32 px-6">
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
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${activeView === 'methods'
                ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
              }`}
          >
            8 Métodos
          </button>
          <button
            onClick={() => setActiveView('tools')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${activeView === 'tools'
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
              {methods.map((method) => (
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
                    {methods.map((m) => (
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
    </section>
  );
});

HttpMethodsSection.displayName = 'HttpMethodsSection';
export default HttpMethodsSection;
