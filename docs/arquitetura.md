# Arquitetura

A regra principal: os componentes React não calculam rotas. Pedem uma navegação, o motor faz o trabalho e emite eventos, e o React só desenha o estado que resulta desses eventos. Assim a parte teórica (`src/theory/`) testa-se sem DOM.

## Pastas

```text
src/
  app/          App.tsx: liga as vistas aos vértices e actualiza o <title>
  content/      profile.ts com todo o texto pessoal
  core/
    engine.ts   orquestra cada navegação (boot, go)
    bus.ts      pub/sub tipado com os eventos (tipo Pulse)
    animator.ts espera baseada em requestAnimationFrame
  store/        lab-store.ts: estado Zustand alimentado pelos eventos
  theory/
    graph/      o grafo, arestas e helpers
    algorithms/ dijkstra, astar, bfs e a heurística
    automata/   DFA de fases, PDA do caminho, máquina de Turing
    structures/ min-heap, fila e stack
  navigation/   ordem do scroll e direcção das transições
  hooks/        useScrollNavigation (scroll no fim da página muda de secção)
  ui/           componentes partilhados (header, dock, painel do grafo, CS Lab, intro)
  views/        uma vista por secção
```

## O que acontece num clique

1. Um componente chama `goto(id)` no store, que emite `GOTO` no bus.
2. `engine.go()` recusa o pedido se já houver uma transição a correr (o DFA não está em `idle`).
3. Fase `scan`: emite `RUN_START`.
4. Fase `run`: corre o algoritmo activo. Cada expansão emite `EXPAND` com a fronteira e os visitados, e o resultado final sai em `PATH`.
5. Fase `walk`: o caminho entra no PDA e cada passo emite `STEP`, que move a vista e revela a aresta percorrida. No fim a stack é esvaziada.
6. Fases `render` e `done`: emite `METRICS` e `DONE`, e o DFA volta a `idle`.

O `wireLab()` em `lab-store.ts` é o único sítio que traduz eventos em estado. As actualizações de `EXPAND` são agrupadas por frame para não re-renderizar a cada nó.

## O grafo

Cada vértice tem profundidade, posição no painel (0 a 1) e pesos para os vizinhos. A heurística do A* é `|depth(n) − depth(goal)|`. Ela só é admissível porque nenhum peso é menor que a diferença de profundidade entre as pontas, e há um teste que o verifica. Se mudares o grafo, corre `npm test`.

A ordem do scroll (`navigation/scroll-tour.ts`) tem de seguir arestas que existam.

## Intro

Ao abrir o site, `engine.boot()` escreve o nome na fita da TM e na stack do PDA, espera `BOOT_HOLD_MS` e passa para o conteúdo. Com `prefers-reduced-motion` as esperas ficam quase a zero.
