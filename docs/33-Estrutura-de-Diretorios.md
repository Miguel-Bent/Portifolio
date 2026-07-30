# Estrutura de Diretórios

## `src/`

```text
src/
├── algorithms/
│   ├── astar.ts
│   ├── priorityQueue.ts
│   ├── heuristic.ts
│   └── graph.ts
├── engine/
│   ├── navigationEngine.ts
│   ├── animationEngine.ts
│   ├── cameraEngine.ts
│   └── eventBus.ts
├── turing/
│   ├── machine.ts
│   ├── tape.ts
│   ├── states.ts
│   └── transitionTable.ts
├── components/
│   ├── Shell.tsx
│   ├── GraphBackground.tsx
│   ├── NavMenu.tsx
│   ├── TapeDisplay.tsx
│   └── SystemViewPanel.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── JourneyPage.tsx
│   ├── ProjectsPage.tsx
│   ├── SkillsPage.tsx
│   ├── ExperiencePage.tsx
│   └── ContactPage.tsx
├── hooks/
│   ├── useEngineStore.ts
│   ├── useEngineSubscription.ts
│   └── useNavigateRequest.ts
├── data/
│   ├── graph.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── cameraPositions.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

## `docs/` (esta pasta)

```text
pasta compos/docs/
├── 00-Visao-Geral.md
├── 01-Arquitetura.md
├── ...
└── 39-Backlog.md
```

40 ficheiros numerados cobrindo visão, arquitetura, algoritmos, UI, testes, deploy e backlog.

## Raiz do projecto

```text
pasta compos/
├── docs/           # documentação
├── src/            # código (quando implementado)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Ver também

- `02-Core-Engine.md`
- `32-Convencoes-de-Codigo.md`
