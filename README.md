# THEORYLAB — Portfólio de Ciência da Computação

Portfólio-laboratório interactivo de **Miguel Bento** (ISUTC, Maputo). A navegação entre secções é um problema de grafo resolvido por algoritmos reais — Dijkstra, A* e BFS — com autômatos (DFA, PDA, TM) visíveis em tempo real.

## Funcionalidades

| Área | Implementação |
|------|---------------|
| **Dijkstra** | Caminho mínimo com priority queue — `O((V+E) log V)` |
| **A\*** | Heurística por profundidade — guia a busca |
| **BFS** | Menor número de arestas — fila FIFO `O(V+E)` |
| **DFA** | Fases de navegação (`idle → scan → run → walk → render → done`) |
| **PDA** | Empilha símbolos do caminho — demonstra LIFO |
| **Turing Machine** | Fita de módulos com cabeça móvel |
| **CS Lab** | Painel lateral com frontier, visited, complexidade e logs |
| **Scroll site** | 11 secções com conteúdo de portfólio real |

## Início rápido

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
npm test         # Vitest (pathfinding)
```

**Requisitos:** Node.js 20+

## Secções (nós do grafo)

| Símbolo | ID | Vista | Conteúdo |
|---------|-----|-------|----------|
| λ | `init` | Home | Apresentação e CTA |
| M | `automata` | Automata | DFA, PDA e TM |
| G | `graphs` | Graphs | Teoria de grafos |
| A | `algo` | Algo | Dijkstra, A*, BFS |
| T | `trace` | Trace | Percurso de aprendizagem |
| C | `complexity` | Complexity | Classes assintóticas |
| R | `repos` | Repos | Projetos e experimentos |
| S | `structures` | Structures | Competências técnicas |
| H | `memory` | Memory | Heap, stack, queue, hash |
| P | `proof` | Proof | Experiência profissional |
| Ω | `io` | Contact | Contacto |

## Estrutura do projecto

```text
pasta compos/
├── docs/                 # Documentação técnica (40 ficheiros)
├── public/               # Assets estáticos (favicon)
├── src/
│   ├── app/              # App root (App.tsx)
│   ├── content/          # Dados do portfólio (profile.ts)
│   ├── cortex/           # Orquestrador (engine + animator)
│   ├── hooks/            # React hooks (scroll navigation)
│   ├── navigation/       # Grafo direccional e scroll tour
│   ├── store/            # Zustand (lab-store)
│   ├── styles/           # CSS global (Tailwind)
│   ├── synapse/          # Event bus (pub/sub)
│   ├── theory/
│   │   ├── algorithms/   # pathfind, heuristic
│   │   ├── automata/     # DFA, PDA, Turing
│   │   ├── graph/        # CS_GRAPH, edges, ops
│   │   └── structures/   # min-heap, queue, stack
│   ├── ui/               # Componentes (CSLab, ScrollSite, DockNav…)
│   └── views/            # Uma vista por secção
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

## Arquitectura

```text
Utilizador  →  Synapse (event bus)  →  Cortex (engine)
                    ↓                        ↓
              Zustand store  ←  Animator  ←  Theory (grafo + algos + autômatos)
                    ↓
              React (views + ui)
```

A UI não calcula rotas. O **Cortex** resolve pathfinding, valida estados e emite eventos; o React observa e anima.

## Personalizar conteúdo

Edita `src/content/profile.ts` — fonte única para nome, bio, educação, experiência, projetos e links.

## Documentação

Índice completo em [`docs/README.md`](docs/README.md). Pontos de entrada:

- [Visão geral](docs/00-Visao-Geral.md)
- [Arquitectura](docs/01-Arquitetura.md)
- [Estrutura de diretórios](docs/33-Estrutura-de-Diretorios.md)
- [Deploy](docs/25-Deploy.md)
- [Contribuição](docs/27-Contribuicao.md)

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion · Zustand · Vitest

## Licença

Projecto privado — todos os direitos reservados.
