# Fluxo de Eventos

## Happy path (H → C)

1. UI emite `NAVIGATE_REQUEST { from: 'H', to: 'C' }`
2. Navigation Engine: FSM `Idle` → `Searching`; emit `STATE_CHANGED`
3. Turing: state `Searching`; emit `TAPE_UPDATED`
4. Emit `SEARCH_STARTED { from, to }`
5. A* expande nós; por cada um emit `NODE_EXPANDED { nodeId, f, g, h }`
6. Emit `PATH_FOUND { path: ['H','A','J','S','C'], cost, openSet, closedSet }`
7. FSM → `Traversing`; Animation Engine inicia timeline
8. Por step: emit `ANIMATION_STEP`; Turing move cabeça; emit `TAPE_UPDATED`
9. Emit `ANIMATION_COMPLETED`
10. FSM → `Rendering` → monta `ContactPage`
11. FSM → `Completed` → `Idle`; emit `NAVIGATION_COMPLETED`

## System View

Subscreve os mesmos eventos (passos 2–11). **Não emite** `NAVIGATE_REQUEST` excepto se houver modo "lab" futuro.

## Cancelamento e fila

| Estado actual | Novo NAVIGATE_REQUEST | Política sugerida |
|---------------|----------------------|-------------------|
| Idle          | Aceitar imediato     | —                 |
| Searching     | Enfileirar           | Processar após PATH_FOUND ou cancel |
| Traversing    | Enfileirar           | Processar após ANIMATION_COMPLETED |
| Rendering     | Enfileirar           | Idem              |

Política final a documentar quando implementada em `navigationEngine.ts`.

## Diagrama temporal

```text
t0   NAVIGATE_REQUEST
t1   STATE_CHANGED (Searching)
t2   SEARCH_STARTED
t3   NODE_EXPANDED × N
t4   PATH_FOUND
t5   ANIMATION_STEP × len(path)
t6   ANIMATION_COMPLETED
t7   STATE_CHANGED (Rendering)
t8   NAVIGATION_COMPLETED
t9   STATE_CHANGED (Idle)
```

## Ver também

- `07-EventBus.md`
- `10-NavigationEngine.md`
