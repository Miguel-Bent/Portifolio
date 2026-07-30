# Camera Engine

## Papel

Controla posição, alvo e interpolação da **câmara** ao longo do path de navegação. Acionado pelo Animation Engine durante `Traversing`.

## Responsabilidades

- Definir posição/alvo por `NodeId` (mapeamento em `src/data/cameraPositions.ts`).
- Interpolar (lerp) entre posições durante transições.
- Zoom e framing por secção.
- Suporte a `prefers-reduced-motion` — saltos instantâneos.

## Integração

```text
Animation Engine  →  ANIMATION_STEP { nodeId, progress }
Camera Engine     →  interpola entre pos[current] e pos[next]
                  →  atualiza store { cameraPosition, cameraTarget }
React Three Fiber →  lê store e aplica à câmara
```

## Ficheiro sugerido

`src/engine/cameraEngine.ts`

## Configuração por nó

```typescript
const cameraMap: Record<NodeId, { position: [number, number, number]; target: [number, number, number] }> = {
  H: { position: [0, 2, 5], target: [0, 0, 0] },
  A: { position: [2, 2, 4], target: [1, 0, 0] },
  // ...
};
```

## Ver também

- `36-Camera.md` — detalhe de comportamento
- `11-AnimationEngine.md`
