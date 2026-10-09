# theorylab

O meu portfólio. As seis secções estão ligadas como um grafo com pesos, e mudar de secção calcula o caminho com Dijkstra, A* ou BFS. Um DFA controla as fases de cada transição, um PDA empilha o caminho durante a animação e uma máquina de Turing acompanha a posição numa fita. O CS Lab (botão no header) mostra tudo isto a acontecer.

Fiz isto para juntar duas coisas que me interessam: projetos que estão no ar e a teoria que estou a estudar no ISUTC.

## Correr localmente

Precisa de Node.js 20 ou mais recente.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # testes do pathfinding e do grafo (Vitest)
npm run build    # gera dist/
```

## Secções

| Vértice | id | Secção |
|---|---|---|
| λ | `init` | Início |
| R | `repos` | Projetos |
| T | `trace` | Percurso |
| S | `structures` | Stack |
| G | `how` | Como funciona |
| Ω | `io` | Contacto |

O grafo está em `src/theory/graph/cs-graph.ts`. Os pesos foram escolhidos para que os algoritmos discordem: de `init` a `io`, o BFS vai por `repos` (custo 4) e o Dijkstra passa também por `trace` (custo 3). Há testes que garantem isto, porque a secção "Como funciona" cita esses números.

## Editar o conteúdo

Bio, projetos, percurso, competências e contactos estão todos em `src/content/profile.ts`. As capturas dos projetos ficam em `public/projects/`.

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Zustand e Vitest.

Como o código está organizado: [`docs/arquitetura.md`](docs/arquitetura.md).

## Licença

Projeto privado, todos os direitos reservados.
