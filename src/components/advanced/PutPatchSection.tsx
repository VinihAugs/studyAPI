import { useState } from 'react';
import CodeSnippet from '@/components/CodeSnippet';

const originalJson = `{
  "id": 1,
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "telefone": "(11) 98765-4321",
  "endereco": {
    "rua": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP"
  },
  "role": "user",
  "ativo": true
}`;

const putJson = `// PUT /api/users/1
// Substitui o recurso INTEIRO — tudo precisa ser enviado

{
  "id": 1,
  "nome": "Ana Silva",
  "email": "ana.nova@email.com",     ← alterado
  "telefone": "(11) 98765-4321",      ← precisa reenviar
  "endereco": {                       ← precisa reenviar
    "rua": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP"
  },
  "role": "user",                     ← precisa reenviar
  "ativo": true                       ← precisa reenviar
}

// ⚠️ Se você esquecer de enviar um campo...
// PUT /api/users/1  (campo "telefone" omitido)
{
  "id": 1,
  "nome": "Ana Silva",
  "email": "ana.nova@email.com"
}
// → O telefone, endereço, role e ativo são REMOVIDOS!
// → O recurso agora só tem id, nome e email.`;

const patchJson = `// PATCH /api/users/1
// Atualiza APENAS os campos enviados

{
  "email": "ana.nova@email.com"    ← só o que mudou!
}

// Resultado no servidor:
{
  "id": 1,
  "nome": "Ana Silva",                ← mantido
  "email": "ana.nova@email.com",      ← atualizado!
  "telefone": "(11) 98765-4321",      ← mantido
  "endereco": {                       ← mantido
    "rua": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP"
  },
  "role": "user",                     ← mantido
  "ativo": true                       ← mantido
}

// ✅ Apenas o email mudou. Todo o resto permanece intacto.
// ✅ Payload menor = menos banda = mais rápido.`;

type ViewTab = 'visual' | 'code';

interface FieldDiff {
  field: string;
  original: string;
  putSent: boolean;
  putValue: string;
  patchSent: boolean;
  patchValue: string;
}

const fieldDiffs: FieldDiff[] = [
  { field: 'nome', original: 'Ana Silva', putSent: true, putValue: 'Ana Silva', patchSent: false, patchValue: 'Ana Silva' },
  { field: 'email', original: 'ana@email.com', putSent: true, putValue: 'ana.nova@email.com', patchSent: true, patchValue: 'ana.nova@email.com' },
  { field: 'telefone', original: '(11) 98765-4321', putSent: true, putValue: '(11) 98765-4321', patchSent: false, patchValue: '(11) 98765-4321' },
  { field: 'endereco', original: '{ rua: "..." }', putSent: true, putValue: '{ rua: "..." }', patchSent: false, patchValue: '{ rua: "..." }' },
  { field: 'role', original: 'user', putSent: true, putValue: 'user', patchSent: false, patchValue: 'user' },
  { field: 'ativo', original: 'true', putSent: true, putValue: 'true', patchSent: false, patchValue: 'true' },
];

export default function PutPatchSection() {
  const [view, setView] = useState<ViewTab>('visual');

  return (
    <section id="put-patch" data-section="put-patch" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 05</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-warning">PUT</span> vs <span className="gradient-text">PATCH</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ambos atualizam recursos, mas de formas fundamentalmente diferentes.
            <strong className="text-warning"> PUT</strong> substitui tudo,
            <strong className="text-accent"> PATCH</strong> modifica apenas o necessário.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="flex gap-2 mb-10 justify-center">
          <button
            onClick={() => setView('visual')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              view === 'visual'
                ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            📊 Comparação Visual
          </button>
          <button
            onClick={() => setView('code')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              view === 'code'
                ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            💻 Exemplos JSON
          </button>
        </div>

        {view === 'visual' && (
          <>
            <div className="mb-8">
              <h3 className="font-mono font-bold text-sm text-muted-foreground mb-3 text-center">
                📋 Recurso Original — <code className="text-primary">GET /api/users/1</code>
              </h3>
              <CodeSnippet code={originalJson} language="json" title="Estado atual" badge="Original" badgeColor="primary" />
            </div>

            <div className="glass rounded-xl border border-border/50 overflow-hidden mb-8">
              <div className="p-5 border-b border-border/30">
                <h3 className="font-mono font-bold text-lg text-foreground">
                  Objetivo: alterar apenas o <span className="text-accent">email</span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-border/30 text-muted-foreground">
                      <th className="text-left px-5 py-3">Campo</th>
                      <th className="text-center px-3 py-3 text-warning">PUT envia?</th>
                      <th className="text-center px-3 py-3 text-accent">PATCH envia?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldDiffs.map((f) => (
                      <tr key={f.field} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className={`px-5 py-3 ${f.field === 'email' ? 'text-accent font-bold' : 'text-foreground/70'}`}>
                          {f.field} {f.field === 'email' && '← mudou'}
                        </td>
                        <td className="text-center px-3 py-3">
                          <span className="text-warning">✅ Sim</span>
                        </td>
                        <td className="text-center px-3 py-3">
                          {f.patchSent
                            ? <span className="text-accent">✅ Sim</span>
                            : <span className="text-muted-foreground/50">— Não</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-border/30 flex flex-col sm:flex-row gap-4 text-xs font-mono">
                <div className="flex-1 p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <span className="text-warning font-bold">PUT:</span>
                  <span className="text-muted-foreground"> Envia 6 campos (~280 bytes) para alterar 1</span>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <span className="text-accent font-bold">PATCH:</span>
                  <span className="text-muted-foreground"> Envia 1 campo (~45 bytes) para alterar 1</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-5 border border-warning/30">
                <h4 className="font-mono font-bold text-warning mb-3">PUT — Quando usar</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Formulários completos (o user preenche tudo)</li>
                  <li>• Substituição total do recurso</li>
                  <li>• Quando precisa de idempotência garantida</li>
                  <li>• Importação/sync de dados externos</li>
                </ul>
              </div>
              <div className="glass rounded-xl p-5 border border-accent/30">
                <h4 className="font-mono font-bold text-accent mb-3">PATCH — Quando usar</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Atualizar campos isolados (toggle, status)</li>
                  <li>• Economia de banda (mobile, IoT)</li>
                  <li>• Campos que o client não conhece por completo</li>
                  <li>• Updates parciais em objetos grandes</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {view === 'code' && (
          <div className="grid gap-6">
            <CodeSnippet code={putJson} language="json" title="PUT /api/users/1" badge="Substituição Total" badgeColor="warning" />
            <CodeSnippet code={patchJson} language="json" title="PATCH /api/users/1" badge="Atualização Parcial" badgeColor="accent" />
          </div>
        )}
      </div>
    </section>
  );
}

