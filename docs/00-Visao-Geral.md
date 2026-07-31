# Visão Geral

## O que é

O **THEORYLAB** não é um portfólio tradicional. É uma demonstração prática de conceitos de Ciência da Computação, em que a navegação entre secções é um problema de grafo resolvido por algoritmos.

O utilizador interage com um site pessoal — Init, Automata, Graphs, Algo, Trace, Complexity, Repos, Structures, Memory, Proof, I/O — mas por trás de cada transição corre um pipeline computacional: event bus, máquina de estados, máquina de Turing, pathfinding e motor de animação.

## Objetivos

- Navegação controlada por **Dijkstra**, **A\*** ou **BFS** (seleccionável no CS Lab).
- Heurística baseada na diferença de profundidade entre nós.
- **DFA**, **PDA** e **Máquina de Turing** visíveis em tempo real.
- **React** como camada de renderização — sem lógica de pathfinding na UI.
- **CS Lab** para inspecionar algoritmos, frontier, visited e logs.

## Princípio central

A UI não decide o caminho. O utilizador pede um destino; o **Cortex** calcula o percurso, valida estados e emite eventos. O React observa e anima.

```text
Pedido do utilizador  →  Cortex calcula  →  React renderiza
```

Nunca o inverso para pathfinding, FSM ou Turing.

## Secções (nós do grafo)

| ID | Secção | Símbolo | Vista |
|----|--------|---------|-------|
| `init` | Init | λ | HomeView |
| `automata` | Automata | M | AutomataView |
| `graphs` | Graphs | G | GraphsView |
| `algo` | Algo | A | AlgoView |
| `trace` | Trace | T | TraceView |
| `complexity` | Complexity | C | ComplexityView |
| `repos` | Repos | R | ReposView |
| `structures` | Structures | S | StructuresView |
| `memory` | Memory | H | MemoryView |
| `proof` | Proof | P | ProofView |
| `io` | I/O | Ω | ContactView |

Cada secção é um nó do grafo `CS_GRAPH` em `src/theory/graph/cs-graph.ts`.

## Stack

| Tecnologia | Papel |
|------------|-------|
| React 19 + TypeScript | Renderização e composição de UI |
| Vite 7 | Build e dev server |
| Tailwind CSS 4 | Estilos utilitários |
| Framer Motion | Animações de transição |
| Zustand | Estado partilhado Cortex ↔ UI |
| Vitest | Testes unitários (pathfinding) |

## Fases de desenvolvimento

| Fase | Foco | Estado |
|------|------|--------|
| 1 | Engine e algoritmos | ✅ Implementado (`src/theory/`, `src/cortex/`) |
| 2 | Renderer e animações | ✅ Scroll site + Framer Motion |
| 3 | Conteúdo do portfólio | ✅ `src/content/profile.ts` |
| 4 | Inspector / CS Lab | ✅ Painel lateral activo |

## Documentação

Esta pasta `docs/` cobre arquitetura, algoritmos, engines, UI, testes, deploy e backlog.

- Índice: [`README.md`](README.md)
- Começar: [`01-Arquitetura.md`](01-Arquitetura.md) e [`02-Core-Engine.md`](02-Core-Engine.md)
- Estrutura actual: [`33-Estrutura-de-Diretorios.md`](33-Estrutura-de-Diretorios.md)
