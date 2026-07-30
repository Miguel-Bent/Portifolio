# Core Engine

## Objetivo (Fase 1)

Construir todo o núcleo computacional **sem interface gráfica**. A navegação entre secções deve funcionar integralmente por algoritmos, verificável em console ou testes unitários.

## Módulos

| Módulo            | Ficheiro                          | Responsabilidade                    |
|-------------------|-----------------------------------|-------------------------------------|
| Grafo             | `src/algorithms/graph.ts`         | Nós, arestas, pesos, vizinhos       |
| Priority Queue    | `src/algorithms/priorityQueue.ts` | Open set do A*                      |
| Heurística        | `src/algorithms/heuristic.ts`     | `h(n) = \|depthAtual - depthDestino\|` |
| A*                | `src/algorithms/astar.ts`         | Pathfinding                         |
| Event Bus         | `src/engine/eventBus.ts`          | Pub/sub entre módulos               |
| Navigation Engine | `src/engine/navigationEngine.ts`  | Orquestração do ciclo de navegação  |
| Animation Engine  | `src/engine/animationEngine.ts`   | Timeline (sem DOM na Fase 1)        |
| FSM               | `src/turing/states.ts`            | Estados Idle → Completed            |
| Turing Machine    | `src/turing/machine.ts`           | Fita, cabeça, tabela de transição   |

## Entregas

- [ ] Estrutura do grafo com 7 nós (secções)
- [ ] Nós com `id`, `depth`, `neighbors`, `weights`
- [ ] Priority Queue implementada manualmente
- [ ] Algoritmo A* com open/closed set e `cameFrom`
- [ ] Heurística por diferença de profundidade
- [ ] Máquina de Estados (FSM) com transições válidas
- [ ] Máquina de Turing com fita `□ H A J P S E C □`
- [ ] Event Bus com eventos tipados
- [ ] Navigation Engine ligando todos os módulos
- [ ] Testes unitários para cada módulo

## Critério de conclusão

Dado um par `(origem, destino)`:

1. O Engine retorna o caminho ótimo.
2. A FSM percorre Idle → Searching → Traversing → Rendering → Completed → Idle.
3. A fita da Turing reflete o estado atual.
4. Os eventos são emitidos na ordem correta.
5. Tudo funciona **sem React**.

## Exemplo de uso (console)

```typescript
import { navigationEngine } from './engine/navigationEngine';

navigationEngine.navigate('H', 'C');
// → emite SEARCH_STARTED, NODE_EXPANDED..., PATH_FOUND, NAVIGATION_COMPLETED
```

## Dependências entre módulos

```text
graph.ts  ←  heuristic.ts  ←  astar.ts
                ↑
priorityQueue.ts ─┘

eventBus.ts  ←  navigationEngine.ts  →  animationEngine.ts
                      ↑
              states.ts + machine.ts
```

## Ver também

- `03-Grafo.md` até `09-TuringMachine.md` — detalhe por módulo
- `21-Testes.md` — estratégia de testes
