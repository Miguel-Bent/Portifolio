# Event Bus

## Papel

Desacopla o **Core Engine** do **React Renderer** e do **System View** via pub/sub. Nenhum módulo chama diretamente componentes React.

## Fluxo

```text
UI / Input
  → emit NAVIGATE_REQUEST
  → Navigation Engine (subscreve)
  → emit SEARCH_STARTED, NODE_EXPANDED, PATH_FOUND, ...
  → Animation Engine, Zustand store, System View (subscrevem)
  → React re-renderiza
```

## Tipos de evento

| Evento                  | Payload (resumo)                    | Emissor            |
|-------------------------|-------------------------------------|--------------------|
| `NAVIGATE_REQUEST`      | `{ from, to }`                      | UI                 |
| `SEARCH_STARTED`        | `{ from, to }`                      | Navigation Engine  |
| `NODE_EXPANDED`         | `{ nodeId, f, g, h }`               | Navigation Engine  |
| `PATH_FOUND`            | `{ path, cost, openSet, closedSet }`| Navigation Engine |
| `STATE_CHANGED`         | `{ from, to }` (FSM)                | Navigation Engine  |
| `TAPE_UPDATED`          | `{ tape, head, state }`             | Turing Machine     |
| `ANIMATION_STEP`        | `{ nodeId, progress }`              | Animation Engine   |
| `ANIMATION_COMPLETED`   | `{ path }`                          | Animation Engine   |
| `NAVIGATION_COMPLETED`  | `{ from, to, path }`                | Navigation Engine  |

## API sugerida

```typescript
type EventHandler<T = unknown> = (payload: T) => void;

interface EventBus {
  on<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>): () => void;
  once<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>): void;
  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void;
}
```

`on` retorna função de unsubscribe — essencial para cleanup em React `useEffect`.

## Ficheiro

`src/engine/eventBus.ts`

## Regras

1. **Payloads tipados** — usar `EventMap` central (ver `34-Interfaces-TypeScript.md`).
2. **Sem lógica de negócio no bus** — apenas encaminhar eventos.
3. **Nomes estáveis** — System View e testes dependem deles.
4. **Um bus por aplicação** — singleton ou contexto React no topo.

## Ver também

- `31-Fluxo-de-Eventos.md` — sequência completa
- `28-API-Interna.md` — superfície pública
