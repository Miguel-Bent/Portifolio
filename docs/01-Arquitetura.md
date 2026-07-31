# Arquitetura

## Pipeline principal

```text
User
  ↓
Synapse (Event Bus)
  ↓
Cortex (Engine)
  ├── NavDfa (FSM)
  ├── PathPda (stack)
  ├── TapeMachine (Turing)
  └── runAlgo (Dijkstra / A* / BFS)
  ↓
Animator
  ↓
Zustand (lab-store)
  ↓
React Renderer (views + ui)
```

Cada camada tem uma responsabilidade única. Dados fluem de cima para baixo; eventos propagam-se via Synapse.

## Camadas

| Camada | Responsabilidade | Localização |
|--------|-------------------|-------------|
| Event Bus | Entrada de intenções (`GOTO`, `ALGO`) | `src/synapse/bus.ts` |
| Cortex | Orquestra DFA, PDA, TM e pathfinding | `src/cortex/engine.ts` |
| Animator | Timeline visual do percurso | `src/cortex/animator.ts` |
| Theory / Graph | Grafo CS_GRAPH, arestas, pesos | `src/theory/graph/` |
| Theory / Algorithms | Dijkstra, A*, BFS | `src/theory/algorithms/` |
| Theory / Automata | DFA, PDA, Turing Machine | `src/theory/automata/` |
| Theory / Structures | Min-heap, queue, stack | `src/theory/structures/` |
| Store | Estado partilhado Engine ↔ UI | `src/store/lab-store.ts` |
| UI + Views | Apresentação; sem pathfinding | `src/ui/`, `src/views/` |
| Content | Dados do portfólio | `src/content/` |

## Regras arquitecturais

1. **React não calcula rotas.** Componentes emitem `GOTO` via Synapse; o Cortex responde.
2. **Algoritmos vivem em `src/theory/`** — fora da UI.
3. **Cortex emite eventos; componentes subscrevem** via Zustand e Synapse.
4. **CS Lab lê o mesmo estado** que o renderer, sem duplicar lógica.
5. **O core é testável sem React** — pathfinding em Vitest.

## Separação de responsabilidades

### Core (`src/theory/` + `src/cortex/`)
Grafo, min-heap, heurística, pathfinding, DFA, PDA, Turing Machine, Synapse, Cortex, Animator.

### Presentation (`src/ui/` + `src/views/`)
Scroll site, dock de navegação, fita, grafo visual, layout, conteúdo.

### Inspection (`src/ui/CSLab.tsx`)
CS Lab — painéis de grafo, open/closed set, fita, logs, métricas.

## Fluxo de dados

```text
[GOTO target]  →  Cortex valida DFA
               →  runAlgo retorna path
               →  PDA empilha símbolos
               →  TM avança na fita
               →  [PATH] + frontier/visited
               →  Animator emite steps
               →  lab-store actualiza
               →  React re-renderiza
```

## Ver também

- `02-Core-Engine.md` — módulos do núcleo
- `30-Diagramas.md` — diagramas ASCII
- `29-Decisoes-de-Arquitetura.md` — ADRs
- `33-Estrutura-de-Diretorios.md` — árvore de ficheiros
