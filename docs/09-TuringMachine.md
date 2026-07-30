# Máquina de Turing

## Papel

Modelo formal que controla transições de estado na **fita de secções**. Serve propósito educativo e alimenta o System View com visualização da fita e cabeça.

## Fita

Símbolos correspondentes às secções do portfólio:

```text
□  H  A  J  P  S  E  C  □
    ↑
   head (posição inicial: H)
```

- `□` — célula em branco (início/fim da fita).
- Letras — secções ativas.

## Estados

Espelham a FSM de navegação:

| Estado      | Significado na fita                    |
|-------------|----------------------------------------|
| `Idle`      | Cabeça parada; fita estável            |
| `Searching` | A* a correr; cabeça pode piscar        |
| `Traversing`| Cabeça move-se ao longo do path       |
| `Rendering` | Secção de destino destacada            |
| `Completed` | Transição concluída                    |

## Componentes

| Ficheiro               | Responsabilidade                         |
|------------------------|------------------------------------------|
| `src/turing/tape.ts`   | Representação da fita, leitura/escrita   |
| `src/turing/states.ts` | Enum de estados e transições válidas   |
| `src/turing/transitionTable.ts` | Regras (estado, símbolo) → (novo estado, símbolo, direção) |
| `src/turing/machine.ts`| `step()`, `reset()`, `getSnapshot()`     |

## API sugerida

```typescript
interface TuringSnapshot {
  tape: string[];
  head: number;
  state: NavState;
}

class TuringMachine {
  step(): void;
  reset(): void;
  getSnapshot(): TuringSnapshot;
  writeSymbol(index: number, symbol: string): void;
  moveHead(direction: 'L' | 'R'): void;
}
```

## Integração

```text
Navigation Engine
  → Searching: machine.setState('Searching')
  → PATH_FOUND: mover cabeça ao longo do path (Traversing)
  → emit TAPE_UPDATED após cada step
  → Completed: machine.setState('Completed')
```

## System View

Exibir fita horizontal com cabeça destacada e estado atual da máquina. Atualizar em tempo real via eventos `TAPE_UPDATED`.

## Ver também

- `08-FiniteStateMachine.md`
- `37-Inspector.md` — painel da fita
