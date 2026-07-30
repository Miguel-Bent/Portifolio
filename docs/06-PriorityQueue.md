# Priority Queue

## Papel

Implementa o **open set** do A*. Deve sempre extrair o elemento com menor prioridade (menor `f(n)`).

## Requisitos

- Implementação **manual** — sem usar heap de biblioteca externa na Fase 1.
- Suportar inserção e extração eficientes para ~7 nós (simplicidade > micro-otimização).
- Prioridade = `f(n)`; empate pode resolver por ordem de inserção ou por `h(n)`.

## API sugerida

```typescript
interface PriorityQueue<T> {
  insert(item: T, priority: number): void;
  extractMin(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  contains(item: T): boolean;       // opcional, útil para A*
  decreaseKey?(item: T, priority: number): void;  // opcional
}
```

## Implementação sugerida

Para o tamanho do grafo (~7 nós), um **array ordenado** ou **busca linear do mínimo** é aceitável:

```typescript
// Inserção O(n), extração O(n) — suficiente para Fase 1
class MinPriorityQueue<T> {
  private items: { value: T; priority: number }[] = [];

  insert(value: T, priority: number): void {
    this.items.push({ value, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  extractMin(): T | undefined {
    return this.items.shift()?.value;
  }
  // ...
}
```

Para versões futuras com grafos maiores, migrar para binary heap.

## Ficheiro

`src/algorithms/priorityQueue.ts`

## Testes

| Caso                         | Expectativa                          |
|------------------------------|--------------------------------------|
| Inserir 3, 1, 2              | extractMin → 1, 2, 3                 |
| Fila vazia                   | extractMin → undefined               |
| Prioridades iguais           | ordem estável ou determinística      |
| Muitas inserções intercaladas| sempre extrai o menor                |

## Ver também

- `04-AStar.md` — consumidor principal
- `21-Testes.md`
