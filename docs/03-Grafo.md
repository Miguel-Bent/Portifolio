# Grafo

## Papel

Cada secção do portfólio é um **nó** do grafo de navegação. As ligações entre secções são **arestas** com pesos. O A* usa este grafo para calcular o caminho ótimo.

## Modelo

```typescript
interface GraphNode {
  id: NodeId;           // 'H' | 'A' | 'J' | 'P' | 'S' | 'E' | 'C'
  label: string;        // 'Home', 'About', ...
  depth: number;        // profundidade conceptual (0–6)
  neighbors: NodeId[];
  weights: Record<NodeId, number>;  // peso por vizinho
}
```

## Propriedades do nó

| Campo       | Tipo              | Descrição                                      |
|-------------|-------------------|------------------------------------------------|
| `id`        | `NodeId`          | Identificador único (uma letra)                |
| `label`     | `string`          | Nome legível da secção                         |
| `depth`     | `number`          | Profundidade usada pela heurística             |
| `neighbors` | `NodeId[]`        | Nós alcançáveis diretamente                    |
| `weights`   | `Record<NodeId, number>` | Custo de cada aresta                  |

## Topologia sugerida

```text
        [H] depth=0
         |
        [A] depth=1
       /   \
    [J]     [P]   depth=2
     |       |
    [S]     [E]   depth=3
       \   /
        [C] depth=4
```

Topologia ilustrativa — ajustar conforme UX desejada. O importante é que `depth` seja coerente com a heurística.

## Operações da API

| Função              | Assinatura                              | Descrição                    |
|---------------------|-----------------------------------------|------------------------------|
| `getNode`           | `(id: NodeId) => GraphNode`             | Retorna nó por ID            |
| `getNeighbors`      | `(id: NodeId) => NodeId[]`              | Lista vizinhos               |
| `getEdgeWeight`     | `(from, to: NodeId) => number`          | Peso da aresta               |
| `getDepth`          | `(id: NodeId) => number`                | Profundidade do nó           |
| `getAllNodes`       | `() => GraphNode[]`                     | Todos os nós (System View)   |

## Ficheiro

`src/algorithms/graph.ts`

Dados estáticos podem viver em `src/data/graph.ts` e ser importados pelo módulo.

## Invariantes

1. Todos os IDs de secção (`H`–`C`) existem no grafo.
2. Pesos são ≥ 0.
3. Se `B` é vizinho de `A`, existe entrada em `weights` para `B`.
4. O grafo é conexo — qualquer par de nós tem caminho.
5. `depth` é metadado conceptual, não distância euclidiana na UI.

## Ver também

- `04-AStar.md` — como o grafo é consumido
- `05-Heuristica.md` — uso de `depth`
- `34-Interfaces-TypeScript.md` — tipos completos
