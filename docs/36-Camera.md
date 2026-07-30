# Câmara

## Papel

Enquadrar a secção activa e mover-se suavemente entre nós do path durante `Traversing`.

## Comportamento

| Momento | Acção |
|---------|-------|
| Repouso (`Idle`) | Câmara focada na secção actual |
| `Traversing` | Interpola entre `cameraMap[current]` e `cameraMap[next]` |
| System View activo | Zoom-out opcional para ver grafo completo |
| Mobile | Limitar amplitude de movimento (evitar motion sickness) |

## Stack

- **Camera Engine** — lógica de posição/alvo/progresso
- **React Three Fiber** — `<PerspectiveCamera>` ou `useFrame` para lerp
- Fallback 2D: pan/zoom CSS no layout sem R3F

## Mapeamento

```typescript
// src/data/cameraPositions.ts
export const cameraMap: Record<NodeId, CameraPose> = { /* ... */ };
```

Actualizar quando secções ganharem posição visual no fundo 3D.

## Ver também

- `12-CameraEngine.md`
- `15-Background.md`
