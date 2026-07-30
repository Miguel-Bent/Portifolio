# Métricas

## O que medir

| Métrica | Tipo | Quando |
|---------|------|--------|
| Tempo A* | ms | `SEARCH_STARTED` → `PATH_FOUND` |
| Nós expandidos | number | Fim do A* |
| Tamanho open set | number | Snapshot em `PATH_FOUND` |
| Tamanho closed set | number | Snapshot em `PATH_FOUND` |
| Comprimento do path | number | `path.length` |
| Duração animação | ms | `Traversing` → `ANIMATION_COMPLETED` |
| Pedidos rejeitados | count | FSM não Idle |

## Interface

```typescript
interface NavigationMetrics {
  astarDurationMs: number;
  nodesExpanded: number;
  pathLength: number;
  animationDurationMs: number;
  rejectedRequests: number;
}
```

## Exibição

- Painel no System View (`37-Inspector.md`).
- Opcional: `console.debug` em desenvolvimento.

## Uso

- Validar que A* com 7 nós é < 1 ms.
- Demonstrar custo real do algoritmo a visitantes técnicos.
- Regressão de performance em CI (opcional).

## Ver também

- `22-Performance.md`
- `04-AStar.md`
