# Backlog

Checklist de tarefas por fase. Marcar `[x]` à medida que forem concluídas.

## Fase 1 — Core Engine

- [ ] `src/algorithms/graph.ts` — 7 nós, arestas, pesos
- [ ] `src/algorithms/priorityQueue.ts` — insert, extractMin
- [ ] `src/algorithms/heuristic.ts` — depth diff
- [ ] `src/algorithms/astar.ts` — path + open/closed
- [ ] `src/engine/eventBus.ts` — on, emit, once
- [ ] `src/turing/states.ts` — FSM
- [ ] `src/turing/tape.ts` + `machine.ts` + `transitionTable.ts`
- [ ] `src/engine/navigationEngine.ts` — orquestração
- [ ] Testes unitários para todos os módulos acima
- [ ] Demo console: `navigate('H', 'C')`

## Fase 2 — Renderer

- [ ] Scaffold Vite + React + TS
- [ ] Tailwind + Framer Motion
- [ ] `useEngineSubscription` + Zustand store
- [ ] `Shell`, `NavMenu`, `ActivePage`
- [ ] `animationEngine.ts` + integração UI
- [ ] `cameraEngine.ts` (se 3D)
- [ ] `GraphBackground` — fundo com grafo real
- [ ] Navegação Home → Contact visual

## Fase 3 — Conteúdo

- [ ] 7 páginas com conteúdo real
- [ ] Timeline em Journey
- [ ] Grafo de projetos
- [ ] Grafo de skills
- [ ] Responsivo mobile/tablet/desktop
- [ ] SEO: title, meta, OG

## Fase 4 — System View

- [ ] Toggle System View
- [ ] Painel grafo + open/closed + path
- [ ] Fita Turing + FSM badge
- [ ] Log stream
- [ ] Métricas (ver `38-Metricas.md`)

## Ideias futuras

- Comparar A* vs Dijkstra no inspector
- Replay de navegação (gravar eventos e reproduzir)
- Modo lab: editar grafo em runtime
- Exportar snapshot do System View como PNG/JSON

## Ver também

- `26-Roadmap.md`
- `02-Core-Engine.md`
