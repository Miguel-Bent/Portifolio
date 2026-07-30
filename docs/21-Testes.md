# Testes

## Âmbito prioritário (Fase 1)

Testes **unitários** do Core, independentes de React.

## Alvos

| Módulo           | Casos mínimos                                      |
|------------------|----------------------------------------------------|
| `graph.ts`       | getNode, neighbors, weights, grafo conexo            |
| `priorityQueue.ts`| insert/extractMin ordem, fila vazia               |
| `heuristic.ts`   | depth diff, simetria, zero no destino              |
| `astar.ts`       | path óptimo, origem=destino, open/closed sets      |
| `states.ts`      | transições válidas/inválidas FSM                   |
| `machine.ts`     | step, tape, head movement                          |
| `eventBus.ts`    | on/emit/once/unsubscribe                           |
| `navigationEngine.ts` | ciclo completo H→C, eventos na ordem          |

## Critério

Navegação entre secções verificável em **console ou Vitest** sem UI.

## Tooling

- **Vitest** — runner e assertions
- Cobertura mínima em `src/algorithms/`, `src/turing/`, `src/engine/`
- Ficheiros: `*.test.ts` junto ao módulo ou em `__tests__/`

## Exemplo

```typescript
// astar.test.ts
import { describe, it, expect } from 'vitest';
import { astar } from './astar';
import { portfolioGraph } from '../data/graph';

describe('astar', () => {
  it('finds path from H to C', () => {
    const result = astar(portfolioGraph, 'H', 'C');
    expect(result.path[0]).toBe('H');
    expect(result.path.at(-1)).toBe('C');
    expect(result.cost).toBeGreaterThan(0);
  });
});
```

## Depois (Fase 2+)

- Testes de integração: Navigation → Animation events
- Smoke tests do Renderer (mount App sem crash)
- E2E opcional (Playwright) para fluxo Home → Contact

## Ver também

- `02-Core-Engine.md`
- `25-Deploy.md` — CI com testes
