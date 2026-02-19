import CodeSnippet from '@/components/CodeSnippet';

const cacheExample = `// Ciclo completo de cache HTTP

// 1️⃣ PRIMEIRA REQUISIÇÃO — Cache vazio
GET /api/produtos/42 HTTP/1.1
Host: api.loja.com

// Resposta do servidor:
HTTP/1.1 200 OK
Cache-Control: public, max-age=3600    ← "Cachear por 1 hora"
ETag: "abc123"                          ← "Impressão digital" do recurso
Last-Modified: Mon, 15 Jan 2026 10:00:00 GMT

{ "id": 42, "nome": "Notebook", "preco": 4500 }

// 2️⃣ SEGUNDA REQUISIÇÃO (dentro de 1h) — Cache HIT
// O navegador nem envia a requisição! Usa a cópia local.
// → Latência ZERO, sem consumo de banda.

// 3️⃣ TERCEIRA REQUISIÇÃO (após 1h) — Revalidação
GET /api/produtos/42 HTTP/1.1
If-None-Match: "abc123"                ← "Ainda é a mesma versão?"
If-Modified-Since: Mon, 15 Jan 2026 10:00:00 GMT

// Se NADA mudou:
HTTP/1.1 304 Not Modified              ← Resposta sem body!
// → Navegador usa o cache. Economizou a transferência inteira.

// Se o recurso MUDOU:
HTTP/1.1 200 OK
ETag: "def456"                          ← Nova impressão digital
{ "id": 42, "nome": "Notebook Pro", "preco": 5200 }`;

const cacheDirectives = [
  {
    directive: 'public',
    description: 'Qualquer intermediário (CDN, proxy) pode cachear a resposta. Ideal para conteúdo que não muda por usuário.',
    example: 'Cache-Control: public, max-age=86400',
    color: 'text-success',
  },
  {
    directive: 'private',
    description: 'Apenas o navegador do usuário pode cachear. Nenhum proxy ou CDN intermediário deve armazenar. Usado para dados pessoais.',
    example: 'Cache-Control: private, max-age=600',
    color: 'text-warning',
  },
  {
    directive: 'no-cache',
    description: 'O navegador PODE cachear, mas DEVE revalidar com o servidor antes de usar. Não significa "não cachear" — significa "sempre perguntar antes".',
    example: 'Cache-Control: no-cache',
    color: 'text-accent',
  },
  {
    directive: 'no-store',
    description: 'Proíbe qualquer armazenamento. Nenhum cache, nenhuma cópia. A resposta deve ser buscada do servidor toda vez. Usado para dados sensíveis.',
    example: 'Cache-Control: no-store',
    color: 'text-destructive',
  },
  {
    directive: 'max-age=N',
    description: 'A resposta é válida por N segundos. Após esse tempo, o cache expira e precisa ser revalidado. max-age=3600 = 1 hora.',
    example: 'Cache-Control: max-age=3600',
    color: 'text-primary',
  },
  {
    directive: 'stale-while-revalidate=N',
    description: 'Serve o cache expirado imediatamente enquanto revalida em background. O usuário vê a resposta rápida e os dados são atualizados silenciosamente.',
    example: 'Cache-Control: max-age=60, stale-while-revalidate=30',
    color: 'text-primary',
  },
];

const steps = [
  { icon: '📤', label: 'Requisição', desc: 'Cliente envia GET' },
  { icon: '💾', label: 'Cache?', desc: 'Tem cópia válida?' },
  { icon: '🔄', label: 'Revalidar', desc: 'If-None-Match / If-Modified-Since' },
  { icon: '📥', label: 'Resposta', desc: '200 (novo) ou 304 (mesmo)' },
];

export default function CacheSection() {
  return (
    <section id="cache" data-section="cache" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 04</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Mecanismos de <span className="gradient-text">Cache</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cache HTTP é o que torna a web rápida. Entender como <strong className="text-foreground">Cache-Control</strong>,{' '}
            <strong className="text-foreground">ETag</strong> e <strong className="text-foreground">304 Not Modified</strong>{' '}
            funcionam juntos é essencial para performance.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="glass rounded-xl border border-border/50 p-6 mb-10">
          <h3 className="font-mono font-bold text-lg text-foreground mb-6 text-center">
            ⚡ Ciclo de Vida do Cache
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-mono">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="glass rounded-lg p-4 border border-primary/20 text-center min-w-[120px]">
                  <span className="text-2xl block mb-1">{step.icon}</span>
                  <span className="text-primary font-bold block text-xs">{step.label}</span>
                  <span className="text-muted-foreground text-[10px]">{step.desc}</span>
                </div>
                {i < steps.length - 1 && <span className="text-primary text-lg hidden sm:block">→</span>}
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-mono font-bold text-xl text-foreground mb-6 text-center">
          🎛️ Diretivas do Cache-Control
        </h3>
        <div className="grid gap-4 mb-10">
          {cacheDirectives.map((d) => (
            <div key={d.directive} className="glass rounded-xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <span className={`font-mono font-bold text-lg ${d.color}`}>{d.directive}</span>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed mb-2">{d.description}</p>
              <code className="text-xs font-mono text-muted-foreground bg-background/50 px-3 py-1.5 rounded-md block">
                {d.example}
              </code>
            </div>
          ))}
        </div>

        <CodeSnippet
          code={cacheExample}
          language="tsx"
          title="Ciclo completo de cache"
          badge="HTTP Cache"
          badgeColor="primary"
        />
      </div>
    </section>
  );
}

