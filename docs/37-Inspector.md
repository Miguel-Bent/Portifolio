# Inspector

Sinónimo de **System View** — painel de inspecção da Fase 4.

## Painéis

| Painel | Dados | Evento principal |
|--------|-------|------------------|
| Grafo | Nós, arestas, highlight | `PATH_FOUND` |
| Open Set | Lista de IDs | `NODE_EXPANDED` |
| Closed Set | Lista de IDs | `NODE_EXPANDED` |
| Caminho | `path[]` ordenado | `PATH_FOUND` |
| Fita Turing | tape, head, state | `TAPE_UPDATED` |
| FSM | Estado actual | `STATE_CHANGED` |
| Logs | Mensagens do Engine | Todos |
| Métricas | ms, nós expandidos | `NAVIGATION_COMPLETED` |

## Implementação

- Componentes em `src/components/` (`SystemViewPanel`, `OpenSetList`, etc.).
- Toggle global no header ou FAB.
- Dados via `useEngineStore()` — sem recalcular A*.

```tsx
function SystemViewPanel() {
  const { openSet, closedSet, path, tape, fsmState, logs, metrics } = useEngineStore();
  return (
    <aside aria-label="System View">
      <GraphPanel path={path} openSet={openSet} closedSet={closedSet} />
      <TapeDisplay snapshot={tape} />
      <FsmBadge state={fsmState} />
      <LogStream logs={logs} />
      <MetricsPanel metrics={metrics} />
    </aside>
  );
}
```

## Ver também

- `13-SystemView.md`
- `38-Metricas.md`
