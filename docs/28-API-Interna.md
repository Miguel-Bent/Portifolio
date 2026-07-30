# API Interna

## Superfícies públicas

| API | Módulo | Uso |
|-----|--------|-----|
| `eventBus.on/emit` | `engine/eventBus.ts` | Toda a app |
| `navigationEngine.navigate()` | `engine/navigationEngine.ts` | UI via hook |
| `astar(graph, from, to)` | `algorithms/astar.ts` | Navigation Engine |
| `heuristic(current, goal, graph)` | `algorithms/heuristic.ts` | A* |
| `turingMachine.getSnapshot()` | `turing/machine.ts` | System View |
| `useEngineStore()` | `hooks/useEngineStore.ts` | React components |

## Contratos

- Tipos em `34-Interfaces-TypeScript.md`.
- Nomes de eventos estáveis — ver `07-EventBus.md`.
- `navigate(from, to)` é idempotente se já em `Idle` no destino.

## Não exportar para UI

| Interno | Motivo |
|---------|--------|
| Priority Queue | Detalhe de implementação do A* |
| `transitionTable` da Turing | Expor só via `getSnapshot()` |
| `gScore` / `cameFrom` maps | Incluídos em `PATH_FOUND` se necessário |

A UI recebe **snapshots** (path, sets, tape), não manipula estruturas internas.

## Hooks recomendados

```typescript
// useNavigateRequest — única forma da UI pedir navegação
function useNavigateRequest() {
  return (to: NodeId) => {
    const from = useEngineStore.getState().currentSection;
    eventBus.emit('NAVIGATE_REQUEST', { from, to });
  };
}
```

## Ver também

- `34-Interfaces-TypeScript.md`
- `07-EventBus.md`
