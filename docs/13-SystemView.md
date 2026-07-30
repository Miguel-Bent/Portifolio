# System View

## Objetivo (Fase 4)

Expor o funcionamento interno dos algoritmos em **tempo real** — um inspector educativo activável sem quebrar a navegação normal.

## Entregas

- [ ] Botão/toggle "System View"
- [ ] Grafo em tempo real com nós e arestas
- [ ] Open Set / Closed Set visíveis durante A*
- [ ] Caminho ótimo destacado
- [ ] Fita da Máquina de Turing com cabeça
- [ ] FSM com estado actual destacado
- [ ] Logs do Navigation Engine
- [ ] Métricas de execução (ver `38-Metricas.md`)

## Fonte de dados

**Não recalcular A* na UI.** Subscrever Event Bus e/ou Zustand store:

```typescript
// System View apenas lê
const { openSet, closedSet, path, fsmState, tape, logs } = useEngineStore();
```

## UX

- Activável a qualquer momento (overlay ou painel lateral).
- Desktop: painel lateral com todos os painéis.
- Mobile: versão compacta ou colapsável.
- Não bloquear interacção com o portfólio.

## Docs relacionados

- `37-Inspector.md` — painéis individuais
- `38-Metricas.md` — o que medir
