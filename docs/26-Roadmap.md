# Roadmap

## Fase 1 — Core Engine

**Objetivo:** núcleo computacional sem UI.

- Grafo, Priority Queue, heurística, A*
- FSM, Turing Machine, Event Bus
- Navigation Engine
- Testes unitários
- **Critério:** navegação H→C em console/testes

## Fase 2 — Renderer

**Objetivo:** ligar Engine ao React.

- Vite + React + TypeScript + Tailwind
- Framer Motion, layout base
- Camera Engine, GraphBackground
- Zustand + Event Bus → UI
- **Critério:** transições visuais acionadas pelo Engine

## Fase 3 — Conteúdo

**Objetivo:** portfólio real.

- 7 secções com conteúdo
- Timeline (Journey)
- Grafo de projetos, grafo de skills
- Responsivo, SEO básico

## Fase 4 — System View

**Objetivo:** inspector em tempo real.

- Toggle System View
- Open/closed set, path, fita, FSM, logs, métricas

## Ordem de dependência

```text
Fase 1  →  Fase 2  →  Fase 3
              ↓
           Fase 4 (pode começar em paralelo no fim da Fase 2)
```

## Ver também

- `39-Backlog.md` — checklist detalhada
- `02-Core-Engine.md`, `14-Renderer.md`, `13-SystemView.md`
