const protocols = [
  {
    version: 'HTTP/0.9',
    year: '1991',
    color: 'text-muted-foreground',
    borderColor: 'border-border/40',
    features: [
      'Apenas método GET',
      'Sem headers',
      'Apenas HTML — sem imagens, sem CSS',
      'Uma requisição = uma conexão TCP',
    ],
    description: 'A versão original. Tim Berners-Lee criou para transferir documentos hipertexto simples. Sem status codes, sem headers, sem nada além de texto puro.',
  },
  {
    version: 'HTTP/1.0',
    year: '1996',
    color: 'text-accent',
    borderColor: 'border-accent/30',
    features: [
      'Headers de requisição e resposta',
      'Status codes (200, 404, 500...)',
      'Content-Type — suporte a imagens, CSS, JS',
      'Métodos POST e HEAD',
      'Ainda: uma requisição por conexão',
    ],
    description: 'A web ficou visual. Agora o servidor podia dizer o tipo do conteúdo e o status da operação. Mas cada requisição ainda abria e fechava uma conexão TCP.',
  },
  {
    version: 'HTTP/1.1',
    year: '1997',
    color: 'text-warning',
    borderColor: 'border-warning/30',
    features: [
      'Keep-Alive — conexões persistentes',
      'Pipelining — enviar múltiplas requisições sem esperar resposta',
      'Chunked Transfer Encoding',
      'Cache com ETag e If-None-Match',
      'Métodos PUT, PATCH, DELETE, OPTIONS',
      'Host header — múltiplos sites por IP',
    ],
    description: 'O padrão que dominou por ~18 anos. Conexões persistentes revolucionaram a performance. Mas sofria de Head-of-Line Blocking: se uma requisição travasse, todas atrás esperavam.',
  },
  {
    version: 'HTTP/2',
    year: '2015',
    color: 'text-primary',
    borderColor: 'border-primary/30',
    features: [
      'Multiplexação — múltiplos streams na mesma conexão',
      'Protocolo binário (não texto)',
      'Compressão de headers (HPACK)',
      'Server Push — servidor envia recursos antecipadamente',
      'Priorização de streams',
      'Resolve o Head-of-Line Blocking do HTTP',
    ],
    description: 'Baseado no SPDY do Google. A grande revolução: multiplexação. Múltiplas requisições e respostas trafegam simultaneamente na mesma conexão TCP sem bloqueio.',
  },
  {
    version: 'HTTP/3',
    year: '2022',
    color: 'text-success',
    borderColor: 'border-success/30',
    features: [
      'QUIC no lugar de TCP — baseado em UDP',
      'Handshake 0-RTT — conexão instantânea',
      'Sem Head-of-Line Blocking no transporte',
      'Migração de conexão (troca de rede sem reconectar)',
      'Criptografia TLS 1.3 obrigatória e integrada',
      'Melhor performance em redes móveis e instáveis',
    ],
    description: 'O futuro que já chegou. Troca TCP por QUIC (UDP). Se um pacote se perde, apenas aquele stream é afetado — os outros continuam. Ideal para mobile e redes instáveis.',
  },
];

const statusRelations = [
  { code: '101', label: 'Switching Protocols', relation: 'Upgrade de HTTP/1.1 para WebSocket ou HTTP/2' },
  { code: '426', label: 'Upgrade Required', relation: 'Servidor exige troca de protocolo para processar a requisição' },
  { code: '505', label: 'HTTP Version Not Supported', relation: 'Servidor não suporta a versão HTTP usada na requisição' },
];

export default function ProtocolsSection() {
  return (
    <section id="protocols" data-section="protocols" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 06</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Evolução dos <span className="gradient-text">Protocolos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            De documentos de texto simples em 1991 até streams multiplexados sobre UDP em 2022.
            A evolução do HTTP reflete as necessidades crescentes da web.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-muted-foreground/20 via-primary/40 to-success/40" />

          <div className="space-y-12">
            {protocols.map((proto, i) => (
              <div
                key={proto.version}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 mt-6" />

                <div className="hidden md:block md:w-1/2" />

                <div className={`ml-14 md:ml-0 md:w-1/2 glass rounded-xl p-6 border ${proto.borderColor} transition-all duration-500`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`font-mono font-bold text-2xl ${proto.color}`}>{proto.version}</span>
                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                      {proto.year}
                    </span>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                    {proto.description}
                  </p>
                  <ul className="space-y-1.5">
                    {proto.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs font-mono text-muted-foreground">
                        <span className={`mt-0.5 ${proto.color}`}>▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 glass rounded-xl border border-border/50 p-6">
          <h3 className="font-mono font-bold text-lg text-foreground mb-4 text-center">
            🔗 Status Codes Relacionados a Protocolos
          </h3>
          <div className="grid gap-3">
            {statusRelations.map((s) => (
              <div key={s.code} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-muted/20">
                <span className="font-mono font-bold text-primary text-lg min-w-[60px]">{s.code}</span>
                <span className="font-mono text-sm text-foreground/80 min-w-[200px]">{s.label}</span>
                <span className="text-xs text-muted-foreground">→ {s.relation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 glass rounded-xl border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/30">
            <h3 className="font-mono font-bold text-lg text-foreground">
              ⚡ Comparação de Performance
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-border/30 text-muted-foreground">
                  <th className="text-left px-5 py-3">Característica</th>
                  <th className="text-center px-3 py-3">HTTP/1.1</th>
                  <th className="text-center px-3 py-3">HTTP/2</th>
                  <th className="text-center px-3 py-3">HTTP/3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 text-foreground/70">Transporte</td>
                  <td className="text-center px-3 py-3 text-warning">TCP</td>
                  <td className="text-center px-3 py-3 text-primary">TCP</td>
                  <td className="text-center px-3 py-3 text-success">QUIC (UDP)</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 text-foreground/70">Multiplexação</td>
                  <td className="text-center px-3 py-3">❌</td>
                  <td className="text-center px-3 py-3">✅</td>
                  <td className="text-center px-3 py-3">✅</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 text-foreground/70">Compressão de headers</td>
                  <td className="text-center px-3 py-3">❌</td>
                  <td className="text-center px-3 py-3">✅ HPACK</td>
                  <td className="text-center px-3 py-3">✅ QPACK</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 text-foreground/70">Head-of-Line Blocking</td>
                  <td className="text-center px-3 py-3">❌ HTTP + TCP</td>
                  <td className="text-center px-3 py-3">⚠️ Só TCP</td>
                  <td className="text-center px-3 py-3">✅ Resolvido</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="px-5 py-3 text-foreground/70">Handshake</td>
                  <td className="text-center px-3 py-3">TCP + TLS (3 RTT)</td>
                  <td className="text-center px-3 py-3">TCP + TLS (2 RTT)</td>
                  <td className="text-center px-3 py-3 text-success">0-1 RTT</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-foreground/70">Migração de rede</td>
                  <td className="text-center px-3 py-3">❌</td>
                  <td className="text-center px-3 py-3">❌</td>
                  <td className="text-center px-3 py-3">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

