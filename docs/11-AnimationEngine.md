# Animation Engine

## Papel

Traduz o caminho A* numa **timeline de animação** — nós, arestas, progresso, duração. Não desenha DOM; emite eventos que Framer Motion e R3F consomem.

## Entrada

- Lista ordenada de `NodeId[]` (path do A*).
- Duração total ou por step (ms).
- Curva de easing (`easeInOut`, `linear`, etc.).
- Eventos FSM para pausar/cancelar.

## Saída

| Evento                | Payload                          |
|-----------------------|----------------------------------|
| `ANIMATION_STEP`      | `{ nodeId, progress, stepIndex }`|
| `ANIMATION_COMPLETED` | `{ path }`                       |

## Princípios

1. **Não desenha** — apenas emite estado e progresso.
2. **Sincronizado com FSM** — só anima em `Traversing`.
3. **Respeita reduced motion** — duração → 0 ou skip.
4. **Uma fonte de verdade** — React lê progresso do store, não calcula.

## Exemplo de timeline

```text
path: [H, A, J, S, C]
step 0: H → progress 0.0
step 1: A → progress 0.25
step 2: J → progress 0.50
step 3: S → progress 0.75
step 4: C → progress 1.0  → ANIMATION_COMPLETED
```

## Ficheiro

`src/engine/animationEngine.ts`

## Relação com Camera Engine

- **Animation Engine** decide *quando* avançar no path.
- **Camera Engine** decide *como* a câmara se move entre posições (ver `12-CameraEngine.md`).

## Ver também

- `35-Animacoes.md`
- `12-CameraEngine.md`
