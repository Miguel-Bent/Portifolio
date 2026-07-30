# Performance

## Objetivos

| Métrica                    | Alvo (grafo ~7 nós)     |
|----------------------------|-------------------------|
| Tempo A*                   | < 1 ms                  |
| FPS animações              | 60 fps                  |
| System View updates        | Throttle a 10–15 fps    |
| First Contentful Paint     | < 2 s (produção)        |

## Práticas

1. **Zustand com selectors** — componentes subscrevem só o que precisam.
2. **Throttle no inspector** — `NODE_EXPANDED` pode chegar rápido; agrupar updates na UI.
3. **Limitar draw calls 3D** — instancing para nós do grafo em R3F.
4. **Code-split System View** — `React.lazy(() => import('./SystemViewPanel'))`.
5. **Memoização** — `GraphBackground` com `React.memo`; path só muda em navegação.

## O que NÃO optimizar prematuramente

- Priority Queue para 7 nós — array ordenado é suficiente.
- A* — O(n log n) com n=7 é irrelevante; clareza > velocidade.

## Métricas

Ver `38-Metricas.md` para medição e exibição no System View.

## Ver também

- `38-Metricas.md`
- `13-SystemView.md`
