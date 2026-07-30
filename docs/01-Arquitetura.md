# Arquitetura

## Pipeline principal

```text
User
  ↓
Event Queue
  ↓
Navigation Engine
  ↓
Finite State Machine
  ↓
Turing Machine
  ↓
A* Search
  ↓
Animation Engine
  ↓
React Renderer
```

Cada camada tem uma responsabilidade única. Dados fluem de cima para baixo; eventos propagam-se lateralmente via Event Bus.

## Camadas

| Camada              | Responsabilidade                                      | Localização sugerida      |
|---------------------|-------------------------------------------------------|---------------------------|
| Event Queue / Bus   | Entrada de intenções do utilizador                    | `src/engine/eventBus.ts`  |
| Navigation Engine   | Orquestra FSM, Turing e A*                            | `src/engine/navigationEngine.ts` |
| FSM                 | Estados válidos da navegação                          | `src/turing/states.ts`    |
| Turing Machine      | Transições formais na fita de secções                 | `src/turing/`             |
| A*                  | Caminho ótimo no grafo                                | `src/algorithms/astar.ts` |
| Animation Engine    | Timeline visual do percurso                           | `src/engine/animationEngine.ts` |
| Camera Engine       | Interpolação de câmara ao longo do path              | `src/engine/cameraEngine.ts` |
| React Renderer      | Apresentação; sem lógica de pathfinding               | `src/components/`, `src/pages/` |

## Regras arquiteturais

1. **React não calcula rotas.** Componentes emitem `NAVIGATE_REQUEST`; o Engine responde.
2. **Algoritmos vivem fora da UI** — `src/algorithms/` e `src/turing/`.
3. **Engines emitem eventos; componentes subscrevem.** Sem chamadas diretas de UI ao A*.
4. **System View lê o mesmo estado** que o renderer, sem duplicar lógica.
5. **Fase 1 é testável sem React** — o core deve funcionar em Node/Vitest.

## Separação de responsabilidades

### Core (Fase 1)
Grafo, Priority Queue, heurística, A*, FSM, Turing Machine, Event Bus, Navigation Engine.

### Presentation (Fase 2–3)
Páginas, componentes, fundo animado, câmara, layout, conteúdo.

### Inspection (Fase 4)
System View / Inspector — painéis de grafo, open/closed set, fita, logs, métricas.

## Fluxo de dados

```text
[NAVIGATE_REQUEST]  →  Navigation Engine valida FSM
                     →  Turing avança na fita
                     →  A* retorna path
                     →  [PATH_FOUND] + open/closed sets
                     →  Animation Engine emite steps
                     →  Zustand store atualiza
                     →  React re-renderiza
```

## Ver também

- `02-Core-Engine.md` — escopo da Fase 1
- `30-Diagramas.md` — diagramas ASCII
- `29-Decisoes-de-Arquitetura.md` — ADRs
