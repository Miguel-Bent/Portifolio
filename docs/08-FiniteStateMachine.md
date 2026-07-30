# Finite State Machine (FSM)

## Papel

Garante que a navegação só ocorre em **estados válidos**. Impede condições de corrida — por exemplo, iniciar um novo A* enquanto uma animação ainda corre.

## Estados

| Estado      | Descrição                                      |
|-------------|------------------------------------------------|
| `Idle`      | Pronto para receber pedido de navegação        |
| `Searching` | A* em execução                                 |
| `Traversing`| A percorrer o caminho (animação de transição)  |
| `Rendering` | A montar conteúdo da secção de destino         |
| `Completed` | Navegação concluída; breve pausa antes de Idle |

## Diagrama de transições

```text
     NAVIGATE_REQUEST
Idle ─────────────────→ Searching
  ↑                         │
  │                    PATH_FOUND
  │                         ↓
  │                    Traversing
  │                         │
  │                  ANIMATION_STEP...
  │                         ↓
  │                    Rendering
  │                         │
  │                  NAVIGATION_DONE
  │                         ↓
  └────────────────── Completed
```

## Transições inválidas

| De          | Pedido           | Ação sugerida                    |
|-------------|------------------|----------------------------------|
| Searching   | NAVIGATE_REQUEST | Enfileirar ou ignorar            |
| Traversing  | NAVIGATE_REQUEST | Enfileirar (política TBD)      |
| Rendering   | NAVIGATE_REQUEST | Enfileirar                       |

Documentar a política final em `31-Fluxo-de-Eventos.md`.

## Relação com Turing Machine

| Aspecto   | FSM                          | Turing Machine                    |
|-----------|------------------------------|-----------------------------------|
| Papel     | Ciclo de vida da navegação   | Modelo formal na fita de secções  |
| Estados   | Idle, Searching, ...         | Mesmos nomes, semântica paralela  |
| Uso       | Gate de transições           | Educação + System View            |

São complementares: FSM controla *quando* navegar; Turing formaliza *o quê* está na fita.

## Observabilidade

- Emitir `STATE_CHANGED` em cada transição.
- System View destaca o estado atual com cor/badge.
- Testes unitários: todas as transições válidas e rejeição das inválidas.

## Ficheiro

`src/turing/states.ts` (ou `src/engine/fsm.ts` se separado da Turing)

## Ver também

- `09-TuringMachine.md`
- `10-NavigationEngine.md`
