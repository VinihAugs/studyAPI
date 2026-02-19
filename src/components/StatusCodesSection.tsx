import { forwardRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface StatusCode {
  code: string;
  label: string;
  description: string;
}

interface StatusCategory {
  range: string;
  title: string;
  subtitle: string;
  color: 'info' | 'success' | 'redirect' | 'warning' | 'destructive';
  section: string;
  codes: StatusCode[];
}

const categories: StatusCategory[] = [
  {
    range: '1XX',
    title: 'Informational',
    subtitle: 'Esses códigos trabalham nos bastidores. Usuários nunca os veem.',
    color: 'info',
    section: 'status-1xx',
    codes: [
      { code: '100', label: 'Continue', description: 'O servidor recebeu os cabeçalhos e está pronto para o corpo da requisição. O cliente deve continuar enviando dados. Isso evita desperdício de banda em requisições que o servidor vai rejeitar.' },
      { code: '101', label: 'Switching Protocols', description: 'O servidor concordou em trocar de protocolo. Acontece ao fazer upgrade de HTTP para WebSocket ou para HTTP/2. A mudança só ocorre se beneficia ambos os lados.' },
      { code: '102', label: 'Processing', description: 'O servidor ainda está processando sua requisição. Aparece quando operações demoram mais do que o esperado. Previne timeouts em processos lentos.' },
      { code: '103', label: 'Early Hints', description: 'O servidor avisa o navegador para começar a carregar recursos enquanto prepara a resposta completa. Acelera a renderização permitindo que o browser busque CSS e JavaScript antecipadamente.' },
    ],
  },
  {
    range: '2XX',
    title: 'Success',
    subtitle: 'Códigos de sucesso confirmam que sua requisição funcionou.',
    color: 'success',
    section: 'status-2xx',
    codes: [
      { code: '200', label: 'OK', description: 'A requisição foi bem-sucedida. O significado depende do método HTTP: GET buscou a página, POST enviou o formulário, PUT atualizou o recurso, DELETE o removeu.' },
      { code: '201', label: 'Created', description: 'O servidor criou um novo recurso. Aparece após requisições POST ou PUT. A resposta inclui um header Location apontando para o novo recurso ou a URI que você requisitou.' },
      { code: '202', label: 'Accepted', description: 'O servidor aceitou sua requisição mas ainda não a processou. Funciona para operações em lote onde o servidor processa requisições de forma assíncrona.' },
      { code: '203', label: 'Non-Authoritative Information', description: 'A requisição funcionou, mas um proxy modificou a resposta. Os dados podem diferir do que o servidor de origem enviou.' },
      { code: '204', label: 'No Content', description: 'O servidor processou a requisição com sucesso mas não está enviando conteúdo de volta. Use para ações que não precisam atualizar a view do navegador.' },
      { code: '205', label: 'Reset Content', description: 'A requisição foi bem-sucedida e o cliente deve resetar a visualização do documento. Limpe o formulário. Resete o canvas. Volte ao estado padrão.' },
      { code: '206', label: 'Partial Content', description: 'O servidor está enviando parte do recurso. Acontece quando clientes usam o header Range para requisitar chunks específicos. Habilita downloads resumíveis e streaming de vídeo.' },
      { code: '207', label: 'Multi-Status', description: 'A resposta contém status codes para múltiplos recursos. Você receberá um XML com um elemento raiz multi-status. Cada recurso recebe seu próprio status.' },
      { code: '208', label: 'Already Reported', description: 'Este código aparece dentro de respostas DAV para prevenir listagens duplicadas. Quando coleções contêm membros internos, apenas um recurso reporta 200 OK.' },
      { code: '226', label: 'IM Used', description: 'O servidor processou um GET e aplicou manipulações de instância ao recurso. O conteúdo foi modificado com base em regras de transformação.' },
    ],
  },
  {
    range: '3XX',
    title: 'Redirect',
    subtitle: 'Códigos de redirecionamento indicam que o conteúdo mudou de lugar. Alguns preservam valor de SEO, outros não.',
    color: 'redirect',
    section: 'status-3xx',
    codes: [
      { code: '300', label: 'Multiple Choices', description: 'Múltiplas respostas existem e o cliente precisa escolher uma. Acontece quando recursos têm versões de idioma. A resposta lista opções com detalhes e localizações.' },
      { code: '301', label: 'Moved Permanently', description: 'O recurso mudou permanentemente para uma nova URL. Todas as requisições futuras devem usar o novo endereço. Motores de busca transferem o ranking da página antiga para a nova.' },
      { code: '302', label: 'Found', description: 'O recurso temporariamente vive em uma URI diferente. Continue usando o endereço original para requisições futuras, a menos que instruído de outra forma.' },
      { code: '303', label: 'See Other', description: 'O servidor redireciona o cliente para um recurso diferente usando GET. Após envio de formulário, redireciona para uma página de confirmação.' },
      { code: '304', label: 'Not Modified', description: 'O recurso não mudou. Use sua versão em cache. Aparece com GET ou HEAD que incluem headers condicionais como If-None-Match ou If-Modified-Since. Economiza banda.' },
      { code: '307', label: 'Temporary Redirect', description: 'O servidor redireciona temporariamente para outra URI. Diferente do 302, o cliente deve manter o mesmo método HTTP. POST continua POST.' },
      { code: '308', label: 'Permanent Redirect', description: 'O recurso moveu permanentemente para uma nova URI. Funciona como 301, exceto que clientes não podem mudar o método da requisição. POST continua POST.' },
    ],
  },
  {
    range: '4XX',
    title: 'Client Error',
    subtitle: 'Algo está errado com a requisição. O problema está no lado do cliente.',
    color: 'warning',
    section: 'status-4xx',
    codes: [
      { code: '400', label: 'Bad Request', description: 'O servidor não consegue processar sua requisição. Erro no cliente. Sintaxe inválida, roteamento errado, parâmetros incorretos.' },
      { code: '401', label: 'Unauthorized', description: 'O servidor rejeitou sua requisição por falta de autenticação válida. Se você incluiu credenciais, elas estavam erradas.' },
      { code: '402', label: 'Payment Required', description: 'Reservado para sistemas de pagamento digital mas raramente usado. Não existem regras claras de implementação.' },
      { code: '403', label: 'Forbidden', description: 'O servidor entendeu sua requisição mas negou acesso. Geralmente por permissões insuficientes. Re-autenticação não vai ajudar.' },
      { code: '404', label: 'Not Found', description: 'O servidor não encontra o recurso solicitado. No navegador, o link está quebrado ou errado. Em APIs, o endpoint existe mas o recurso não.' },
      { code: '405', label: 'Method Not Allowed', description: 'O servidor reconhece o método da requisição mas o recurso não o suporta. Você tentou DELETE em um recurso somente-leitura.' },
      { code: '406', label: 'Not Acceptable', description: 'O servidor não encontra conteúdo correspondente aos critérios nos seus headers Accept. Você pediu JSON mas o servidor só serve XML.' },
      { code: '407', label: 'Proxy Authentication Required', description: 'Você está usando um proxy e precisa de autenticação válida. Diferente do 401, você se autentica com o servidor proxy, não o de origem.' },
      { code: '408', label: 'Request Timeout', description: 'O servidor não recebeu a requisição completa dentro do tempo permitido. Você pode reenviar a requisição sem alterações.' },
      { code: '409', label: 'Conflict', description: 'O servidor não pode processar a requisição devido a conflito com o recurso. Comum com PUT quando recursos entram em conflito.' },
      { code: '410', label: 'Gone', description: 'O recurso desapareceu permanentemente. Sem endereço de encaminhamento. Motores de busca removem essas páginas do índice.' },
      { code: '411', label: 'Length Required', description: 'O servidor rejeitou a requisição porque precisa de um header Content-Length. Adicione o header e tente novamente.' },
      { code: '412', label: 'Precondition Failed', description: 'O servidor não atendeu uma ou mais condições nos headers da requisição. Sua requisição condicional falhou na validação.' },
      { code: '413', label: 'Payload Too Large', description: 'Sua requisição é grande demais para processar. O servidor pode fechar a conexão e incluir um header Retry-After.' },
      { code: '414', label: 'URI Too Long', description: 'A URI da requisição excede o que o servidor pode processar. Raro, mas acontece quando clientes convertem POST em GET com dados excessivos.' },
      { code: '415', label: 'Unsupported Media Type', description: 'O servidor rejeitou a requisição porque o recurso usa um formato de mídia não suportado.' },
      { code: '416', label: 'Range Not Satisfiable', description: 'O servidor não pode processar o range na sua requisição. O range não existe no recurso ou o valor é inválido.' },
      { code: '417', label: 'Expectation Failed', description: 'O servidor não consegue atender os requisitos no header Expect da requisição.' },
      { code: '418', label: "I'm a Teapot", description: 'Uma piada de 1º de Abril do Hyper Text Coffee Pot Control Protocol. O servidor é um bule e não pode fazer café. 🫖' },
      { code: '421', label: 'Misdirected Request', description: 'O cliente enviou uma requisição para o servidor errado. O servidor não pode responder à URL fornecida.' },
      { code: '422', label: 'Unprocessable Entity', description: 'O servidor recebeu a requisição mas não pode processá-la devido a erros semânticos. Estrutura de dados válida mas valores incorretos.' },
      { code: '423', label: 'Locked', description: 'O recurso está bloqueado. A resposta inclui detalhes sobre o status do bloqueio.' },
      { code: '424', label: 'Failed Dependency', description: 'A requisição falhou porque dependia de uma requisição anterior que também falhou. Cadeia quebrada.' },
      { code: '425', label: 'Too Early', description: 'O servidor recusa processar a requisição porque ela pode ser reproduzida depois. Precaução de segurança.' },
      { code: '426', label: 'Upgrade Required', description: 'O servidor não processará a requisição a menos que o cliente troque para o protocolo exigido no header Upgrade.' },
      { code: '428', label: 'Precondition Required', description: 'O servidor precisa de uma requisição condicional para garantir que o cliente está usando a versão correta do recurso.' },
      { code: '429', label: 'Too Many Requests', description: 'Você enviou requisições demais em pouco tempo. Rate limited. O servidor pode incluir um header Retry-After.' },
      { code: '431', label: 'Request Header Fields Too Large', description: 'Os headers da sua requisição são grandes demais para processar. Reduza o tamanho e reenvie.' },
      { code: '451', label: 'Unavailable for Legal Reasons', description: 'O recurso foi removido por motivos legais. Site bloqueado, página removida, conformidade legal.' },
    ],
  },
  {
    range: '5XX',
    title: 'Server Error',
    subtitle: 'Erros do servidor significam que algo quebrou do lado da hospedagem. Não é culpa sua.',
    color: 'destructive',
    section: 'status-5xx',
    codes: [
      { code: '500', label: 'Internal Server Error', description: 'Erro genérico. O servidor encontrou um problema inesperado que impediu de completar a requisição.' },
      { code: '501', label: 'Not Implemented', description: 'O servidor não suporta a funcionalidade necessária para completar a requisição. Servidores só precisam lidar com GET e HEAD por padrão.' },
      { code: '502', label: 'Bad Gateway', description: 'O gateway ou proxy recebeu uma resposta inválida ao tentar completar a requisição. Algo quebrou na cadeia de servidores.' },
      { code: '503', label: 'Service Unavailable', description: 'O servidor não pode lidar com a requisição devido a sobrecarga temporária ou manutenção. Condição temporária.' },
      { code: '504', label: 'Gateway Timeout', description: 'O gateway ou proxy não recebeu resposta do servidor upstream a tempo. Problema de rede ou sobrecarga do servidor.' },
      { code: '505', label: 'HTTP Version Not Supported', description: 'O servidor não suporta a versão HTTP usada na requisição.' },
      { code: '506', label: 'Variant Also Negotiates', description: 'Erro de configuração do servidor. A variante escolhida está configurada para negociação de conteúdo mas não é um endpoint válido.' },
      { code: '507', label: 'Insufficient Storage', description: 'O servidor não tem armazenamento suficiente para completar a requisição. Disco cheio.' },
      { code: '508', label: 'Loop Detected', description: 'O servidor parou uma operação porque detectou um loop infinito. O processo falhou.' },
      { code: '510', label: 'Not Extended', description: 'O servidor precisa de extensões adicionais para completar a requisição. As capacidades atuais não são suficientes.' },
      { code: '511', label: 'Network Authentication Required', description: 'Você precisa se autenticar para acessar a rede. Comum com portais cativos de Wi-Fi público.' },
    ],
  },
];

const tabs = categories.map((c) => c.range);
type Tab = (typeof tabs)[number];

const categoryColors = {
  info: {
    bg: 'bg-primary/10 border-primary/30',
    badge: 'bg-primary/20 text-primary',
    dot: 'bg-primary glow-primary',
    code: 'text-primary',
    headerBg: 'hover:bg-primary/5',
    tab: 'bg-primary/20 text-primary border border-primary/40 glow-primary',
  },
  success: {
    bg: 'bg-success/10 border-success/30',
    badge: 'bg-success/20 text-success',
    dot: 'bg-success glow-success',
    code: 'text-success',
    headerBg: 'hover:bg-success/5',
    tab: 'bg-success/20 text-success border border-success/40 glow-success',
  },
  redirect: {
    bg: 'bg-accent/10 border-accent/30',
    badge: 'bg-accent/20 text-accent',
    dot: 'bg-accent glow-accent',
    code: 'text-accent',
    headerBg: 'hover:bg-accent/5',
    tab: 'bg-accent/20 text-accent border border-accent/40 glow-accent',
  },
  warning: {
    bg: 'bg-warning/10 border-warning/30',
    badge: 'bg-warning/20 text-warning',
    dot: 'bg-warning glow-warning',
    code: 'text-warning',
    headerBg: 'hover:bg-warning/5',
    tab: 'bg-warning/20 text-warning border border-warning/40 glow-warning',
  },
  destructive: {
    bg: 'bg-destructive/10 border-destructive/30',
    badge: 'bg-destructive/20 text-destructive',
    dot: 'bg-destructive glow-destructive',
    code: 'text-destructive',
    headerBg: 'hover:bg-destructive/5',
    tab: 'bg-destructive/20 text-destructive border border-destructive/40 glow-destructive',
  },
};

const StatusCodesSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState<Tab>('2XX');
  const activeCategory = categories.find((c) => c.range === activeTab)!;
  const colors = categoryColors[activeCategory.color];

  return (
    <section ref={ref} id="status" data-section="status" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Seção 03</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Status <span className="gradient-text">Codes</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            O servidor sempre responde com um código numérico que indica o resultado da operação. Aqui está a referência completa.
          </p>
          <div className="neon-line mt-8 max-w-xs mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          {categories.map((category) => {
            const tabColors = categoryColors[category.color];
            const isActive = activeTab === category.range;
            return (
              <button
                key={category.range}
                onClick={() => setActiveTab(category.range)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                  isActive
                    ? tabColors.tab
                    : 'text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                {category.range}
              </button>
            );
          })}
        </div>

        {/* Conteúdo da aba ativa */}
        <div
          data-section={activeCategory.section}
          className={`glass rounded-xl border ${colors.bg} overflow-hidden transition-all duration-500`}
        >
          {/* Category Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
              <span className={`font-mono font-bold text-3xl ${colors.code}`}>
                {activeCategory.range}
              </span>
              <span className={`text-sm font-mono px-2 py-0.5 rounded-full ${colors.badge}`}>
                {activeCategory.title}
              </span>
              <span className="text-xs text-muted-foreground/60 font-mono ml-auto">
                {activeCategory.codes.length} códigos
              </span>
            </div>
            <p className="text-muted-foreground text-sm ml-6">{activeCategory.subtitle}</p>
          </div>

          {/* Status Codes Accordion */}
          <Accordion type="multiple" className="px-6 pb-4">
            {activeCategory.codes.map((status) => (
              <AccordionItem
                key={status.code}
                value={status.code}
                className="border-border/30"
              >
                <AccordionTrigger
                  className={`py-3 hover:no-underline ${colors.headerBg} rounded-lg px-3 -mx-3`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold text-lg ${colors.code}`}>
                      {status.code}
                    </span>
                    <span className="text-sm text-foreground/80 font-mono">
                      {status.label}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3">
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {status.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
});

StatusCodesSection.displayName = 'StatusCodesSection';
export default StatusCodesSection;
