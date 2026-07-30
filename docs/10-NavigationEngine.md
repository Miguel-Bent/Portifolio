# Navigation Engine

## Papel

Orquestra o ciclo de vida completo de um pedido de navegação — desde `NAVIGATE_REQUEST` até `NAVIGATION_COMPLETED`.

## Sequência (happy path)

1. Receber `NAVIGATE_REQUEST { from, to }`.
2. Verificar FSM — só aceitar se `Idle` (ou enfileirar).
3. Transição FSM → `Searching`; emit `STATE_CHANGED`.
4. Atualizar Turing Machine → `Searching`; emit `TAPE_UPDATED`.
5. Executar A*(`from`, `to`) — emit `NODE_EXPANDED` por nó expandido.
6. Emit `PATH_FOUND` com path, cost, open/closed sets.
7. FSM → `Traversing`; Animation Engine recebe path.
8. Por cada `ANIMATION_STEP` → Turing move cabeça; emit `TAPE_UPDATED`.
9. FSM → `Rendering`; montar secção de destino.
10. FSM → `Completed` → `Idle`; emit `NAVIGATION_COMPLETED`.

## Ficheiro

`src/engine/navigationEngine.ts`

## API pública

```typescript
interface NavigationEngine {
  navigate(from: NodeId, to: NodeId): void;
  getCurrentSection(): NodeId;
  getFsmState(): NavState;
  cancel(): void;  // opcional
}
```

## Dependências

- Event Bus
- FSM (`states.ts`)
- Turing Machine (`machine.ts`)
- Grafo + A* (`graph.ts`, `astar.ts`)
- Animation Engine (`animationEngine.ts`)

## Critério de conclusão

**Toda** mudança de secção passa por este engine. Nunca usar `react-router` ou `window.location` diretamente para navegar entre secções do portfólio.

## Ver também

- `31-Fluxo-de-Eventos.md`
- `28-API-Interna.md`
