import { HttpMethod, DebugTool } from './types';

export const httpMethods: HttpMethod[] = [
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

export const debugTools: DebugTool[] = [
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

