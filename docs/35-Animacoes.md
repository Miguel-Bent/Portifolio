# Animações

## Fonte da verdade

**Animation Engine** define timing e progresso. **Framer Motion** (2D) e **R3F** (3D) executam a interpolação visual. React não inventa durações.

## Motions mínimos

| Motion | Trigger | Tecnologia |
|--------|---------|------------|
| Transição de secção ao longo do path | `ANIMATION_STEP` | Framer Motion `AnimatePresence` |
| Highlight de arestas/nós no fundo | `PATH_FOUND` + steps | Canvas/R3F |
| Fita Turing / badge FSM | `TAPE_UPDATED`, `STATE_CHANGED` | CSS/Framer |

## Regras

1. Sincronizar com estados `Traversing` e `Rendering` da FSM.
2. `prefers-reduced-motion: reduce` → duração ~0, salto directo ao destino.
3. Não usar motion decorativo que sugira falso estado algorítmico (ex.: nó a "pulsar" sem estar no open set).
4. Easing consistente — `easeInOut` para transições de secção.

## Configuração sugerida

```typescript
const animationConfig = {
  stepDurationMs: 400,
  totalMaxMs: 2000,
  easing: [0.4, 0, 0.2, 1] as const,
};
```

## Ver também

- `11-AnimationEngine.md`
- `35-Animacoes.md` → `36-Camera.md`
- `23-Acessibilidade.md`
