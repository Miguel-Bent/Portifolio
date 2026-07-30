# Diagramas

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

## Grafo de secções

```text
        [H] depth=0
         |
        [A] depth=1
       /   \
    [J]     [P]   depth=2
     |       |
    [S]     [E]   depth=3
       \   /
        [C] depth=4
```

## Ciclo FSM

```text
  ┌──────────────────────────────────────┐
  │                                      │
  ▼                                      │
Idle → Searching → Traversing → Rendering → Completed
```

## Fita Turing

```text
  □   H   A   J   P   S   E   C   □
          ↑
        head (exemplo: em A)
  state: Traversing
```

## Ver também

- `01-Arquitetura.md`
- `31-Fluxo-de-Eventos.md`
