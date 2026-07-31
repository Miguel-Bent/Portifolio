# Estrutura de Diretórios

Fonte de verdade para a organização actual do código.

## `src/`

```text
src/
├── app/
│   └── App.tsx                 # Root: vistas, meta SEO, boot do Cortex
├── content/
│   ├── profile.ts              # Dados pessoais (fonte única)
│   ├── data.ts                 # Dados derivados / auxiliares
│   └── types.ts                # Tipos do conteúdo
├── cortex/
│   ├── engine.ts               # Orquestrador (Cortex)
│   └── animator.ts             # Timeline de animação
├── hooks/
│   └── useScrollNavigation.ts  # Scroll ↔ navegação
├── navigation/
│   ├── graph-direction.ts      # Direcção no grafo
│   └── scroll-tour.ts          # Tour por secções
├── store/
│   └── lab-store.ts            # Zustand — estado do CS Lab
├── styles/
│   └── global.css              # Tailwind + tokens visuais
├── synapse/
│   └── bus.ts                  # Event bus (pub/sub)
├── theory/
│   ├── algorithms/
│   │   ├── pathfind.ts         # Dijkstra, A*, BFS
│   │   ├── pathfind.test.ts    # Testes Vitest
│   │   └── heuristic.ts
│   ├── automata/
│   │   ├── dfa.ts
│   │   ├── pda.ts
│   │   └── turing.ts
│   ├── graph/
│   │   ├── cs-graph.ts         # CS_GRAPH (11 nós)
│   │   ├── edges.ts
│   │   └── ops.ts
│   ├── structures/
│   │   ├── min-heap.ts
│   │   ├── queue.ts
│   │   └── stack.ts
│   └── types.ts                # NodeId, AlgoId, Pulse…
├── ui/
│   ├── AutomataIntro.tsx
│   ├── AutomataPanel.tsx
│   ├── CSLab.tsx
│   ├── DockNav.tsx
│   ├── FeaturedBadge.tsx
│   ├── GraphEdges.tsx
│   ├── GraphPanel.tsx
│   ├── LabGraph.tsx
│   ├── ScrollSite.tsx
│   ├── SiteHeader.tsx
│   ├── TapeBar.tsx
│   └── ViewFrame.tsx
├── views/
│   ├── HomeView.tsx
│   ├── AutomataView.tsx
│   ├── GraphsView.tsx
│   ├── AlgoView.tsx
│   ├── TraceView.tsx
│   ├── ComplexityView.tsx
│   ├── ReposView.tsx
│   ├── StructuresView.tsx
│   ├── MemoryView.tsx
│   ├── ProofView.tsx
│   └── ContactView.tsx
├── main.tsx
└── vite-env.d.ts
```

## `docs/`

```text
docs/
├── README.md                   # Índice da documentação
├── 00-Visao-Geral.md
├── 01-Arquitetura.md
├── …                           # 02–39 (algoritmos, UI, deploy, backlog)
└── 39-Backlog.md
```

40 ficheiros numerados + índice.

## Raiz do projecto

```text
pasta compos/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI: test + build
├── docs/                       # Documentação técnica
├── public/
│   └── favicon.svg
├── src/                        # Código fonte
├── CONTRIBUTING.md             # Guia de contribuição (resumo)
├── README.md                   # Entrada principal
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Convenções de naming

| Pasta | Conteúdo |
|-------|----------|
| `theory/` | Lógica pura — sem React |
| `cortex/` | Orquestração e animação |
| `ui/` | Componentes reutilizáveis |
| `views/` | Uma vista por secção do grafo |
| `content/` | Dados estáticos do portfólio |

## Ver também

- `01-Arquitetura.md`
- `32-Convencoes-de-Codigo.md`
- `17-Componentes.md`
- `18-Paginas.md`
