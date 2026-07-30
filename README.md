# THEORYLAB — Computer Science Portfolio

Portfólio-laboratório que demonstra conceitos reais de **Ciência da Computação** de forma interactiva.

## O que aprendes aqui

| Área | Implementação |
|------|---------------|
| **Dijkstra** | Caminho mínimo com priority queue — `O((V+E) log V)` |
| **A\*** | Heurística por profundidade — guia a busca |
| **BFS** | Menor número de arestas — fila FIFO `O(V+E)` |
| **DFA** | Controla fases de navegação (idle → scan → run → walk → render → done) |
| **PDA** | Empilha símbolos do caminho — demonstra LIFO |
| **Turing Machine** | Fita de módulos com cabeça móvel |

## Inovações

1. **Algorithm Arena** — alterna Dijkstra / A* / BFS e vê caminhos diferentes no mesmo grafo
2. **Automata Trinity** — DFA + PDA + TM visíveis em tempo real no header
3. **Theory Lab** — painel lateral com frontier, visited, complexidade e logs
4. **Stack animation** — PDA empilha e desempilha durante a navegação
5. **Terminal aesthetic** — grid verde sobre fundo escuro estilo GitHub

## Arquitectura

```
src/
├── theory/
│   ├── graph/          # CS_GRAPH
│   ├── algorithms/     # dijkstra, astar, bfs
│   ├── structures/     # min-heap, queue, stack
│   └── automata/       # DFA, PDA, Turing Machine
├── cortex/             # Orchestrator
├── synapse/            # Event bus
├── exhibit/            # GraphViz, LabDock, AutomataStrip
├── modules/            # 7 secções de conteúdo
└── frame/              # NodeRail, ModuleShell
```

## Início

```bash
npm install
npm run dev
```

## Módulos

λ Init · G Graphs · T Trace · R Repos · S Structures · P Proof · Ω I/O
