# A*

## Papel

O algoritmo **A\*** calcula o caminho de custo mínimo entre a secção atual e a secção pedida pelo utilizador. É invocado pelo Navigation Engine após validação da FSM e atualização da Turing Machine.

## Função de custo

```
f(n) = g(n) + h(n)
```

- **g(n)** — custo acumulado desde a origem até `n` (soma dos pesos das arestas).
- **h(n)** — heurística estimada de `n` até o destino (ver `05-Heuristica.md`).
- **f(n)** — custo total estimado; a Priority Queue extrai sempre o menor `f`.

## Estruturas de dados

| Estrutura   | Tipo                        | Uso                              |
|-------------|-----------------------------|----------------------------------|
| Open Set    | Priority Queue              | Nós a explorar, ordenados por f  |
| Closed Set  | `Set<NodeId>`               | Nós já expandidos                |
| gScore      | `Map<NodeId, number>`       | Melhor g conhecido por nó        |
| cameFrom    | `Map<NodeId, NodeId>`       | Reconstrução do caminho          |

## Fluxo resumido

1. Inserir origem no open set com `f = h(origem, destino)`.
2. Enquanto open set não estiver vazio:
   - Extrair nó com menor `f`.
   - Se for o destino → reconstruir e retornar caminho.
   - Adicionar a closed set.
   - Para cada vizinho não fechado:
     - Calcular `tentativeG = g(current) + weight(current, neighbor)`.
     - Se melhor que g conhecido → atualizar g, cameFrom, f e inserir/atualizar no open set.
3. Se open set esvaziar → sem caminho (erro — grafo deve ser conexo).

## Resultado

```typescript
interface AStarResult {
  path: NodeId[];
  cost: number;
  openSet: NodeId[];    // snapshot para System View
  closedSet: NodeId[];
  nodesExpanded: number;
}
```

## Integração

```text
Navigation Engine  →  astar(graph, origin, destination)
                   ←  AStarResult
                   →  emit PATH_FOUND
                   →  Animation Engine recebe path[]
```

## Ficheiro

`src/algorithms/astar.ts`

## Testes mínimos

- Caminho direto entre vizinhos.
- Caminho com múltiplos saltos (ex.: H → C).
- Origem igual ao destino → path de um elemento.
- Verificar que open/closed sets são preenchidos corretamente.

## Ver também

- `05-Heuristica.md`
- `06-PriorityQueue.md`
- `38-Metricas.md` — tempo e nós expandidos
