# Guia Interativo de APIs

Um guia completo e imersivo sobre APIs, construído com scrollytelling 3D em duas páginas. O projeto aborda métodos HTTP, status codes, consumo no front-end, gerenciamento de estado, construção de rotas no back-end e conceitos avançados como HTTP Headers, Cache, Autenticação vs Autorização, PUT vs PATCH e evolução de protocolos — tudo de forma visual e didática.

## Stack Tecnológica

### Core

| Tecnologia | Versão | Papel |
|---|---|---|
| **React** | 18 | Biblioteca de UI — componentização, reatividade e ecossistema maduro |
| **TypeScript** | 5.8 | Tipagem estática que previne bugs em tempo de desenvolvimento e melhora a DX com autocomplete |
| **Vite** | 5 | Bundler ultra-rápido com HMR instantâneo. Usa ESBuild em dev e Rollup em build |

### Estilização

| Tecnologia | Por quê? |
|---|---|
| **Tailwind CSS 3** | Utility-first — estilos diretamente no JSX, sem arquivos CSS separados por componente. Resultado: bundle CSS mínimo via purge automático |
| **shadcn/ui** | Componentes acessíveis (Radix UI) copiados para o projeto — sem dependência de runtime. Total controle sobre o código |
| **tailwindcss-animate** | Animações declarativas via classes utilitárias, sem JavaScript adicional |

### 3D e Animações

| Tecnologia | Por quê? |
|---|---|
| **Three.js + @react-three/fiber** | Renderização 3D declarativa no React. Fiber abstrai o loop imperativo do Three.js em componentes JSX |
| **@react-three/drei** | Helpers prontos (câmera, controles, geometrias) que aceleram o desenvolvimento 3D |
| **GSAP + ScrollTrigger** | Animações de scroll performáticas. GSAP é o padrão da indústria para animações web complexas — roda a 60fps com facilidade |

### Roteamento e Estado

| Tecnologia | Por quê? |
|---|---|
| **React Router DOM 6** | Roteamento client-side com API moderna (loaders, actions). Padrão de mercado para SPAs React |
| **TanStack React Query 5** | Cache inteligente de dados do servidor, deduplicação de requests e revalidação automática |

### Qualidade de Código

| Tecnologia | Por quê? |
|---|---|
| **ESLint 9** | Linting com flat config — regras para hooks, refresh e boas práticas TypeScript |
| **Vitest** | Test runner nativo do Vite — roda testes com a mesma config do bundler, sem setup extra |

## Decisões Técnicas

### Por que Vite e não CRA ou Next.js?

O projeto é uma SPA estática sem necessidade de SSR ou rotas de API. Vite entrega dev server instantâneo e builds otimizados sem o overhead de um framework full-stack.

### Por que shadcn/ui e não Material UI ou Chakra?

shadcn/ui copia os componentes para dentro do projeto. Isso significa zero dependência externa em runtime e liberdade total para customizar cada detalhe visual. Os componentes são construídos sobre Radix UI, garantindo acessibilidade (WAI-ARIA) de fábrica.

### Por que GSAP para animações?

CSS animations são limitadas para scrollytelling complexo. Framer Motion é excelente mas pesado para timelines sincronizadas com scroll. GSAP + ScrollTrigger é a combinação mais performática e controlável para esse tipo de experiência.

### Por que Three.js via React Three Fiber?

Escrever Three.js imperativo dentro de componentes React gera problemas de lifecycle e memory leaks. R3F resolve isso tratando a cena 3D como árvore de componentes React, com garbage collection automático e integração nativa com o estado do React.

## Como Rodar

```bash
# Clonar o repositório
git clone <URL_DO_REPO>
cd <NOME_DO_PROJETO>

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto roda em `http://localhost:8080`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção otimizado |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Verificação de código com ESLint |
| `npm run test` | Executa testes com Vitest |

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Guia principal — O que é API, Métodos HTTP, Status Codes, Front-end, Gerenciamento de Estado, Back-end |
| `/advanced` | Conceitos avançados — HTTP Headers, Idempotência, Autenticação vs Autorização, Cache, PUT vs PATCH, Evolução de Protocolos |

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                    # Componentes base (shadcn/ui)
│   ├── advanced/              # Seções da página avançada
│   │   ├── AdvancedNavbar.tsx
│   │   ├── HeadersSection.tsx
│   │   ├── IdempotencySection.tsx
│   │   ├── AuthSection.tsx
│   │   ├── CacheSection.tsx
│   │   ├── PutPatchSection.tsx
│   │   └── ProtocolsSection.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── HttpMethodsSection.tsx
│   ├── StatusCodesSection.tsx
│   ├── FrontendExamples.tsx
│   ├── StateManagementSection.tsx
│   ├── BackendExamples.tsx
│   ├── CodeSnippet.tsx
│   └── Scene3D.tsx
├── pages/
│   ├── Index.tsx              # Página principal
│   └── Advanced.tsx           # Página avançada
├── hooks/
├── lib/
└── index.css
```
