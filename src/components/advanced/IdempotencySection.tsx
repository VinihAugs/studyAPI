import CodeSnippet from '@/components/CodeSnippet';

const postExample = `// ❌ POST não é idempotente — cada chamada cria um novo recurso
// O usuário clica "Enviar" 3 vezes por acidente...

fetch('/api/pedidos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ produto: 'Notebook', quantidade: 1 })
});

// Resultado: 3 pedidos criados! 😱
// Pedido #101 — Notebook (R$ 4.500)
// Pedido #102 — Notebook (R$ 4.500)
// Pedido #103 — Notebook (R$ 4.500)
// Total cobrado: R$ 13.500 ao invés de R$ 4.500`;

const putExample = `// ✅ PUT é idempotente — múltiplas chamadas = mesmo resultado
// O usuário clica "Salvar" 3 vezes por acidente...

fetch('/api/pedidos/101', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ produto: 'Notebook', quantidade: 1, status: 'confirmado' })
});

// Resultado: O pedido #101 foi atualizado 3 vezes...
// ...mas o estado final é sempre o mesmo! ✅
// Pedido #101 — Notebook, confirmado (R$ 4.500)
// Sem duplicatas, sem cobranças extras.`;

const idempotencyKeyExample = `// 🛡️ Solução: Idempotency Key para tornar POST seguro
// O client gera um ID único para cada intenção de ação

const idempotencyKey = crypto.randomUUID();

fetch('/api/pedidos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': idempotencyKey  // ← chave única
  },
  body: JSON.stringify({ produto: 'Notebook', quantidade: 1 })
});

// Se a requisição for enviada 3 vezes com a MESMA chave:
// → 1ª vez: 201 Created (pedido criado)
// → 2ª vez: 200 OK (retorna o pedido já criado)
// → 3ª vez: 200 OK (retorna o pedido já criado)
// Resultado: apenas 1 pedido! 🎉`;

const scenarios = [
  {
    title: 'Retry automático',
    icon: '🔄',
    description: 'A conexão cai no meio da requisição. O client reenvia automaticamente. Com métodos idempotentes (GET, PUT, DELETE), isso é seguro. Com POST, pode duplicar dados.',
  },
  {
    title: 'Timeout + reenvio',
    icon: '⏱️',
    description: 'O servidor processou a requisição mas a resposta não chegou a tempo. O client assume que falhou e reenvia. Se o método não é idempotente, o recurso é criado duas vezes.',
  },
  {
    title: 'Duplo clique do usuário',
    icon: '👆👆',
    description: 'O usuário clica no botão "Comprar" duas vezes rápido. Sem proteção no front-end, duas requisições POST são enviadas. Duas compras são registradas.',
  },
  {
    title: 'Filas de mensagem',
    icon: '📨',
    description: 'Em sistemas distribuídos, mensagens podem ser entregues mais de uma vez. Operações idempotentes garantem que o processamento duplicado não cause efeitos colaterais.',
  },
];

export default function IdempotencySection() {
  return (
    <section id="idempotency" data-section="idempotency" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 02</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Idempotência e <span className="gradient-text">Segurança</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entender idempotência não é só teoria — é o que separa uma API robusta de uma que gera
            cobranças duplicadas, pedidos fantasma e dados inconsistentes.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="glass rounded-xl border border-border/50 overflow-hidden mb-10">
          <div className="p-5 border-b border-border/30">
            <h3 className="font-mono font-bold text-lg text-foreground">
              🔑 Conceitos-Chave
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 text-muted-foreground font-mono">
                  <th className="text-left px-5 py-3">Propriedade</th>
                  <th className="text-left px-5 py-3">Significado</th>
                  <th className="text-left px-5 py-3">Exemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 font-mono font-bold text-primary">Safe</td>
                  <td className="px-5 py-3 text-foreground/70">Não modifica nada no servidor. Apenas leitura.</td>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">GET, HEAD, OPTIONS</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 font-mono font-bold text-success">Idempotent</td>
                  <td className="px-5 py-3 text-foreground/70">Repetir N vezes = mesmo resultado que 1 vez.</td>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">GET, PUT, DELETE</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-mono font-bold text-destructive">Não-Idempotent</td>
                  <td className="px-5 py-3 text-foreground/70">Cada chamada pode gerar um efeito diferente.</td>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">POST, PATCH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-mono font-bold text-xl text-foreground mb-6 text-center">
          ⚠️ Cenários onde idempotência importa
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {scenarios.map((s) => (
            <div key={s.title} className="glass rounded-xl p-5 border border-warning/20 hover:border-warning/40 transition-all duration-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{s.icon}</span>
                <h4 className="font-mono font-bold text-foreground">{s.title}</h4>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6">
          <CodeSnippet
            code={postExample}
            language="tsx"
            title="POST — O problema"
            badge="Não-Idempotente"
            badgeColor="destructive"
          />
          <CodeSnippet
            code={putExample}
            language="tsx"
            title="PUT — A segurança"
            badge="Idempotente"
            badgeColor="success"
          />
          <CodeSnippet
            code={idempotencyKeyExample}
            language="tsx"
            title="Idempotency Key — A solução"
            badge="Padrão de Mercado"
            badgeColor="primary"
          />
        </div>
      </div>
    </section>
  );
}

