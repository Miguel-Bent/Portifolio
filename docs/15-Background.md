# Background

## Conceito

Fundo animado que **materializa o grafo de navegação** — não é decoração genérica, reflecte o estado real do Engine.

## Elementos

| Elemento    | Representação                          |
|-------------|----------------------------------------|
| Nós         | Secções do portfólio (H, A, J, ...)    |
| Arestas     | Transições possíveis                   |
| Highlight   | Path A* actual / nó activo             |
| Pesos       | Opcional — espessura ou label na aresta|

## Tecnologias (escolher uma principal)

| Abordagem | Prós                          | Contras                |
|-----------|-------------------------------|------------------------|
| Canvas 2D | Leve, fácil de debugar        | Menos "wow"            |
| SVG       | Escalável, CSS-friendly       | Muitos nós = pesado    |
| R3F 3D    | Imersivo, alinha com câmara   | Mais complexo          |

Recomendação: **R3F** se Camera Engine estiver activo; **Canvas** para MVP rápido.

## Modos

| Modo        | Comportamento                                      |
|-------------|----------------------------------------------------|
| Portfolio   | Atmosfera subtil; path highlight durante navegação |
| System View | Grafo completo com open/closed set visíveis        |

## Critério

O background **deve** reflectir estado real (`currentNode`, `path`, `openSet`). Animação puramente decorativa que contradiz o algoritmo é proibida.

## Ficheiro sugerido

`src/components/GraphBackground.tsx`

## Ver também

- `03-Grafo.md`
- `13-SystemView.md`
