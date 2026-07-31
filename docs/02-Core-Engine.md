# Core Engine

## Objetivo

Núcleo computacional separado da UI. A navegação entre secções funciona por algoritmos, verificável em testes unitários (Vitest) sem montar React.

## Módulos (implementação actual)

| Módulo | Ficheiro | Responsabilidade |
|--------|----------|------------------|
| Grafo | `src/theory/graph/cs-graph.ts` | CS_GRAPH — 11 nós, arestas, pesos |
| Edges / Ops | `src/theory/graph/edges.ts`, `ops.ts` | Utilitários de grafo |
| Pathfinding | `src/theory/algorithms/pathfind.ts` | Dijkstra, A*, BFS |
| Heurística | `src/theory/algorithms/heuristic.ts` | `h(n) = \|depthAtual - depthDestino\|` |
| Min-heap | `src/theory/structures/min-heap.ts` | Open set (Dijkstra / A*) |
| Queue | `src/theory/structures/queue.ts` | Fila FIFO (BFS) |
| Stack | `src/theory/structures/stack.ts` | Pilha LIFO (PDA) |
| DFA | `src/theory/automata/dfa.ts` | Fases `idle → … → done` |
| PDA | `src/theory/automata/pda.ts` | Empilha símbolos do path |
| Turing | `src/theory/automata/turing.ts` | Fita de secções |
| Event Bus | `src/synapse/bus.ts` | Pub/sub (`GOTO`, `ALGO`, `PATH`…) |
| Cortex | `src/cortex/engine.ts` | Orquestra todo o ciclo |
| Animator | `src/cortex/animator.ts` | Timeline de steps visuais |
| Store | `src/store/lab-store.ts` | Estado Zustand para a UI |

## Entregas (estado actual)

- [x] Grafo com 11 nós (`init` … `io`)
- [x] Nós com `id`, `depth`, `neighbors`, `weight`
- [x] Min-heap implementado manualmente
- [x] Dijkstra, A* e BFS com open/closed set
- [x] Heurística por diferença de profundidade
- [x] DFA com transições de fase
- [x] PDA com stack animável
- [x] Máquina de Turing com fita de símbolos
- [x] Synapse com eventos tipados (`Pulse`)
- [x] Cortex ligando todos os módulos
- [x] Testes unitários (`pathfind.test.ts`)

## Critério de conclusão

Dado um par `(origem, destino)` e um algoritmo:

1. O Cortex retorna o caminho correcto.
2. O DFA percorre as fases até `done`.
3. A fita da Turing reflecte o estado actual.
4. Os eventos são emitidos na ordem correcta.
5. Funciona **sem React** (testável em Node).

## Exemplo de uso

```typescript
import { cortex } from './cortex/engine'
import { synapse } from './synapse/bus'

synapse.emit({ type: 'GOTO', target: 'io' })
// → RUN_START, EXPAND…, PATH, STEP…, DONE
```

## Dependências entre módulos

```text
cs-graph.ts  ←  heuristic.ts  ←  pathfind.ts
                    ↑
min-heap.ts ────────┘
queue.ts (BFS)

synapse/bus.ts  ←  cortex/engine.ts  →  animator.ts
                      ↑
              automata/ (dfa, pda, turing)
```

## Ver também

- `03-Grafo.md`
- `07-EventBus.md`
- `21-Testes.md`
- `33-Estrutura-de-Diretorios.md`
