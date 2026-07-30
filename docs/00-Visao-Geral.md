# Visão Geral

## O que é

O **Computational Portfolio** não é um portfólio tradicional. É uma demonstração prática de conceitos de Ciência da Computação, em que a navegação entre secções é um problema de grafo resolvido por algoritmos.

O utilizador interage com um site pessoal — Home, About, Journey, Projects, Skills, Experience, Contact — mas por trás de cada transição corre um pipeline computacional: fila de eventos, máquina de estados, máquina de Turing, A* e motor de animação.

## Objetivos

- Navegação controlada pelo algoritmo **A\***.
- Heurística baseada na diferença de profundidade entre nós.
- **Máquina de Turing** a controlar transições de estado na fita de secções.
- **React** apenas como camada de renderização.
- **System View** para inspecionar algoritmos em tempo real.

## Princípio central

A UI não decide o caminho. O utilizador pede um destino; o **Core Engine** calcula o percurso, valida estados e emite eventos. O React observa e anima.

```
Pedido do utilizador  →  Engine calcula  →  React renderiza
```

Nunca o inverso para pathfinding, FSM ou Turing.

## Secções (nós do grafo)

| ID | Secção    | Símbolo na fita |
|----|-----------|-----------------|
| H  | Home      | H               |
| A  | About     | A               |
| J  | Journey   | J               |
| P  | Projects  | P               |
| S  | Skills    | S               |
| E  | Experience| E               |
| C  | Contact   | C               |

Cada secção é um nó do grafo de navegação.

## Stack

| Tecnologia        | Papel                              |
|-------------------|------------------------------------|
| React + TypeScript| Renderização e composição de UI    |
| Vite              | Build e dev server                 |
| Tailwind CSS      | Estilos utilitários                |
| Framer Motion     | Animações de transição             |
| Zustand           | Estado partilhado Engine ↔ UI      |
| React Three Fiber | Fundo 3D / grafo (opcional)        |

## Fases de desenvolvimento

| Fase | Foco                         | Critério de conclusão                          |
|------|------------------------------|------------------------------------------------|
| 1    | Engine e algoritmos          | Navegação funciona em console/testes           |
| 2    | Renderer e animações         | Transições visuais acionadas pelo Engine       |
| 3    | Conteúdo do portfólio        | 7 secções com conteúdo real e SEO básico       |
| 4    | Inspector / System View      | Algoritmos visíveis em tempo real              |

## Documentação

Esta pasta `docs/` cobre arquitetura, algoritmos, engines, UI, testes, deploy e backlog. Começar por `01-Arquitetura.md` e `02-Core-Engine.md`.
