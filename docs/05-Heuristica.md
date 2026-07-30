# Heurística

## Definição

```
h(n) = |depth(n) - depth(destino)|
```

Onde `depth(n)` é a profundidade conceptual do nó `n` no grafo (metadado, não posição na tela).

## Exemplo

| Nó | depth | h(n) para destino C (depth=4) |
|----|-------|-------------------------------|
| H  | 0     | 4                             |
| A  | 1     | 3                             |
| J  | 2     | 2                             |
| C  | 4     | 0                             |

## Propriedades desejadas

| Propriedade   | Descrição                                              |
|---------------|--------------------------------------------------------|
| Admissível    | Nunca superestima o custo real (garante optimalidade*) |
| Consistente   | h(n) ≤ cost(n,n') + h(n') para vizinhos               |
| O(1)          | Cálculo instantâneo por expansão                       |
| Interpretável | Visível no System View como "distância conceptual"     |

\* Com pesos uniformes e depth monotónico ao longo do caminho principal, a heurística por depth é admissível. Revalidar se a topologia ou pesos mudarem.

## Uso no A*

Em cada expansão de vizinho:

```typescript
const h = heuristic(neighborId, goalId, graph);
const f = gScore.get(neighborId)! + h;
```

## Ficheiro

`src/algorithms/heuristic.ts`

```typescript
export function heuristic(
  current: NodeId,
  goal: NodeId,
  graph: Graph
): number {
  return Math.abs(graph.getDepth(current) - graph.getDepth(goal));
}
```

## Notas de design

- **Depth não é distância UI** — dois nós na mesma profundidade podem estar longe no grafo; a heurística subestima nesse caso (ainda admissível se pesos ≥ diferença de depth).
- **Alterações de topologia** exigem rever valores de `depth` e admissibilidade.
- No System View, mostrar `h(n)` ao lado de cada nó expandido ajuda o visitante a entender o algoritmo.

## Ver também

- `03-Grafo.md` — definição de depth
- `04-AStar.md` — integração
