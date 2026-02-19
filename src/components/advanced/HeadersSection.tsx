import { useState } from 'react';

type HeaderTab = 'request' | 'response';

interface HeaderItem {
  name: string;
  example: string;
  description: string;
}

const requestHeaders: HeaderItem[] = [
  { name: 'Accept', example: 'Accept: application/json', description: 'Informa ao servidor qual formato de resposta o cliente espera receber. Se o servidor não conseguir atender, retorna 406 Not Acceptable.' },
  { name: 'Authorization', example: 'Authorization: Bearer eyJhbGci...', description: 'Envia credenciais de autenticação. O formato mais comum é Bearer Token (JWT). Sem esse header, o servidor pode retornar 401 Unauthorized.' },
  { name: 'Content-Type', example: 'Content-Type: application/json', description: 'Define o formato dos dados sendo enviados no corpo da requisição. O servidor usa essa informação para saber como interpretar os dados recebidos.' },
  { name: 'Content-Length', example: 'Content-Length: 348', description: 'Indica o tamanho do corpo da requisição em bytes. Alguns servidores exigem esse header e retornam 411 Length Required se ausente.' },
  { name: 'If-None-Match', example: 'If-None-Match: "33a64df5"', description: 'Envia o ETag de uma versão cacheada do recurso. Se o servidor identificar que nada mudou, retorna 304 Not Modified — economizando banda.' },
  { name: 'If-Modified-Since', example: 'If-Modified-Since: Wed, 21 Oct 2024 07:28:00 GMT', description: 'Pede ao servidor para enviar o recurso apenas se foi modificado após a data informada. Trabalha junto com o cache para evitar transferências desnecessárias.' },
  { name: 'User-Agent', example: 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)', description: 'Identifica o cliente que está fazendo a requisição — navegador, bot, app mobile. Servidores podem servir conteúdo diferente baseado nessa informação.' },
  { name: 'Origin', example: 'Origin: https://meusite.com', description: 'Indica de onde a requisição está vindo. Fundamental para CORS — o servidor usa esse header para decidir se permite ou bloqueia a requisição cross-origin.' },
];

const responseHeaders: HeaderItem[] = [
  { name: 'Content-Type', example: 'Content-Type: application/json; charset=utf-8', description: 'Define o formato e encoding da resposta. O navegador usa essa informação para renderizar o conteúdo corretamente.' },
  { name: 'Location', example: 'Location: /api/users/42', description: 'Aponta para a URL do novo recurso criado (com status 201) ou para onde redirecionar (com status 301/302/307/308).' },
  { name: 'WWW-Authenticate', example: 'WWW-Authenticate: Bearer realm="api"', description: 'Enviado junto com 401 Unauthorized. Indica ao cliente qual esquema de autenticação o servidor aceita (Bearer, Basic, etc.).' },
  { name: 'Retry-After', example: 'Retry-After: 120', description: 'Informa ao cliente quanto tempo esperar antes de tentar novamente. Aparece com 429 Too Many Requests e 503 Service Unavailable.' },
  { name: 'Cache-Control', example: 'Cache-Control: public, max-age=3600', description: 'Controla como e por quanto tempo a resposta pode ser cacheada. É o header mais importante do sistema de cache HTTP.' },
  { name: 'ETag', example: 'ETag: "33a64df5"', description: 'Uma "impressão digital" do recurso. Se o conteúdo muda, o ETag muda. Funciona junto com If-None-Match para validação de cache.' },
  { name: 'Access-Control-Allow-Origin', example: 'Access-Control-Allow-Origin: https://meusite.com', description: 'Header de CORS que define quais origens podem acessar o recurso. Sem ele, requisições cross-origin são bloqueadas pelo navegador.' },
  { name: 'Upgrade', example: 'Upgrade: websocket', description: 'Indica que o servidor aceita trocar de protocolo. Usado na resposta 101 Switching Protocols ao fazer upgrade para WebSocket ou HTTP/2.' },
];

export default function HeadersSection() {
  const [activeTab, setActiveTab] = useState<HeaderTab>('request');
  const headers = activeTab === 'request' ? requestHeaders : responseHeaders;

  return (
    <section id="headers" data-section="headers" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 01</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Cabeçalhos <span className="gradient-text">HTTP</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Headers são metadados que viajam junto com cada requisição e resposta.
            Eles controlam <strong className="text-foreground">autenticação</strong>,{' '}
            <strong className="text-foreground">cache</strong>,{' '}
            <strong className="text-foreground">formato de dados</strong> e muito mais.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        <div className="flex gap-2 mb-10 justify-center">
          <button
            onClick={() => setActiveTab('request')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              activeTab === 'request'
                ? 'bg-primary/20 text-primary border border-primary/40 glow-primary'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            📤 Request Headers
          </button>
          <button
            onClick={() => setActiveTab('response')}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              activeTab === 'response'
                ? 'bg-success/20 text-success border border-success/40 glow-success'
                : 'text-muted-foreground hover:text-foreground border border-border/50'
            }`}
          >
            📥 Response Headers
          </button>
        </div>

        <div className="grid gap-4">
          {headers.map((header) => (
            <div
              key={header.name + activeTab}
              className={`glass rounded-xl p-5 border transition-all duration-500 ${
                activeTab === 'request'
                  ? 'border-primary/30 hover:border-primary/50'
                  : 'border-success/30 hover:border-success/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <span className={`font-mono font-bold text-lg ${activeTab === 'request' ? 'text-primary' : 'text-success'}`}>
                  {header.name}
                </span>
              </div>
              <code className="block text-xs font-mono text-muted-foreground bg-background/50 px-3 py-2 rounded-md mb-3">
                {header.example}
              </code>
              <p className="text-foreground/70 text-sm leading-relaxed">{header.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass rounded-xl border border-border/50 p-6">
          <h3 className="font-mono font-bold text-lg text-foreground mb-4 text-center">
            📡 Fluxo de uma Requisição HTTP
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono">
            <div className="glass rounded-lg p-4 border border-primary/30 text-center min-w-[160px]">
              <span className="text-primary font-bold block mb-1">Cliente</span>
              <span className="text-muted-foreground text-xs">Request Headers</span>
              <div className="text-[10px] text-muted-foreground/60 mt-1">Accept, Auth, Origin...</div>
            </div>
            <div className="text-primary text-2xl">→</div>
            <div className="glass rounded-lg p-4 border border-accent/30 text-center min-w-[160px]">
              <span className="text-accent font-bold block mb-1">Servidor</span>
              <span className="text-muted-foreground text-xs">Processa</span>
              <div className="text-[10px] text-muted-foreground/60 mt-1">Valida, executa, responde</div>
            </div>
            <div className="text-success text-2xl">→</div>
            <div className="glass rounded-lg p-4 border border-success/30 text-center min-w-[160px]">
              <span className="text-success font-bold block mb-1">Resposta</span>
              <span className="text-muted-foreground text-xs">Response Headers</span>
              <div className="text-[10px] text-muted-foreground/60 mt-1">Cache, ETag, CORS...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

