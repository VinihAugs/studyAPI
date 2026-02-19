import CodeSnippet from '@/components/CodeSnippet';

const authFlow = `// 1. Login — Autenticação (quem é você?)
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'ana@email.com', password: 's3nh4_f0rt3' })
});

// Servidor valida credenciais e retorna um token JWT
const { token } = await response.json();
// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// 2. Acesso — Autorização (o que você pode fazer?)
// O token contém informações como: { role: "user", permissions: ["read"] }

// ✅ Requisição com token válido para recurso permitido
await fetch('/api/meu-perfil', {
  headers: { Authorization: \`Bearer \${token}\` }
});
// → 200 OK — autenticado + autorizado

// ❌ Requisição com token válido para recurso NÃO permitido
await fetch('/api/admin/usuarios', {
  headers: { Authorization: \`Bearer \${token}\` }
});
// → 403 Forbidden — autenticado, mas NÃO autorizado

// ❌ Requisição sem token
await fetch('/api/meu-perfil');
// → 401 Unauthorized — NÃO autenticado`;

const comparisons = [
  {
    status: '401',
    title: 'Unauthorized',
    subtitle: 'Autenticação',
    question: 'Quem é você?',
    color: 'warning' as const,
    icon: '🔐',
    meaning: 'O servidor não sabe quem você é. Credenciais ausentes, expiradas ou inválidas.',
    analogy: 'Você chegou na portaria do prédio sem crachá. O segurança pergunta: "Quem é você?"',
    fix: 'Enviar credenciais válidas (login, token JWT, API key).',
    headers: 'WWW-Authenticate: Bearer realm="api"',
  },
  {
    status: '403',
    title: 'Forbidden',
    subtitle: 'Autorização',
    question: 'O que você pode fazer?',
    color: 'destructive' as const,
    icon: '🚫',
    meaning: 'O servidor sabe quem você é, mas você não tem permissão para acessar esse recurso.',
    analogy: 'Você tem crachá, mas tenta entrar na sala da diretoria. O segurança diz: "Você não tem acesso aqui."',
    fix: 'Solicitar permissões adequadas ao administrador. Re-autenticar NÃO resolve.',
    headers: 'Nenhum header específico — a resposta pode incluir detalhes no body.',
  },
];

const colorMap = {
  warning: 'border-warning/40 text-warning bg-warning/10',
  destructive: 'border-destructive/40 text-destructive bg-destructive/10',
};

export default function AuthSection() {
  return (
    <section id="auth" data-section="auth" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 03</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Autenticação <span className="gradient-text">vs</span> Autorização
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dois conceitos frequentemente confundidos, mas fundamentalmente diferentes.
            O status <strong className="text-warning">401</strong> trata de <em>identidade</em>,
            enquanto o <strong className="text-destructive">403</strong> trata de <em>permissão</em>.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {comparisons.map((item) => (
            <div
              key={item.status}
              className={`glass rounded-xl p-6 border ${colorMap[item.color]} transition-all duration-500`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <span className="font-mono font-bold text-2xl">{item.status}</span>
                  <span className="text-sm text-muted-foreground ml-2">{item.title}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className={`text-xs font-mono px-2 py-1 rounded-full border ${colorMap[item.color]}`}>
                  {item.subtitle}: {item.question}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-foreground block mb-1">O que significa:</strong>
                  <p className="text-foreground/70 leading-relaxed">{item.meaning}</p>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Analogia:</strong>
                  <p className="text-foreground/70 leading-relaxed italic">{item.analogy}</p>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Como resolver:</strong>
                  <p className="text-foreground/70 leading-relaxed">{item.fix}</p>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Header relacionado:</strong>
                  <code className="text-xs font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded">
                    {item.headers}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl border border-border/50 p-6 mb-10">
          <h3 className="font-mono font-bold text-lg text-foreground mb-6 text-center">
            🔑 Resumo Visual
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono">
            <div className="rounded-lg p-4 border border-muted-foreground/30 text-center min-w-[140px]">
              <span className="text-2xl block mb-1">👤</span>
              <span className="text-foreground font-bold block">Usuário</span>
              <span className="text-muted-foreground text-xs">Quero acessar!</span>
            </div>
            <div className="text-primary text-xl">→</div>
            <div className="rounded-lg p-4 border border-warning/40 bg-warning/5 text-center min-w-[140px]">
              <span className="text-2xl block mb-1">🔐</span>
              <span className="text-warning font-bold block">Autenticação</span>
              <span className="text-muted-foreground text-xs">Quem é você?</span>
              <span className="text-warning/70 text-[10px] block mt-1">401 se falhar</span>
            </div>
            <div className="text-primary text-xl">→</div>
            <div className="rounded-lg p-4 border border-destructive/40 bg-destructive/5 text-center min-w-[140px]">
              <span className="text-2xl block mb-1">🚫</span>
              <span className="text-destructive font-bold block">Autorização</span>
              <span className="text-muted-foreground text-xs">Pode acessar?</span>
              <span className="text-destructive/70 text-[10px] block mt-1">403 se falhar</span>
            </div>
            <div className="text-primary text-xl">→</div>
            <div className="rounded-lg p-4 border border-success/40 bg-success/5 text-center min-w-[140px]">
              <span className="text-2xl block mb-1">✅</span>
              <span className="text-success font-bold block">Acesso</span>
              <span className="text-muted-foreground text-xs">200 OK</span>
            </div>
          </div>
        </div>

        <CodeSnippet
          code={authFlow}
          language="tsx"
          title="Fluxo Completo"
          badge="Auth"
          badgeColor="primary"
        />
      </div>
    </section>
  );
}

