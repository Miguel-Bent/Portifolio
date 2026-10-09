import type { AlgoId, Graph, NodeId } from '../types'

function e(n: NodeId[], w: Partial<Record<NodeId, number>>) {
  return { neighbors: n, weight: w }
}

// Os pesos nunca são menores que a diferença de profundidade entre as pontas,
// por isso a heurística do A* (|depth(n) − depth(goal)|) continua admissível.
export const CS_GRAPH: Graph = {
  vertices: {
    init: {
      id: 'init',
      label: 'Início',
      symbol: 'λ',
      depth: 0,
      pos: { x: 0.1, y: 0.5 },
      ...e(['repos', 'structures', 'how'], { repos: 1, structures: 2, how: 4 }),
    },
    repos: {
      id: 'repos',
      label: 'Projetos',
      symbol: 'R',
      depth: 1,
      pos: { x: 0.32, y: 0.26 },
      ...e(['init', 'trace', 'structures', 'io'], { init: 1, trace: 1, structures: 2, io: 3 }),
    },
    structures: {
      id: 'structures',
      label: 'Stack',
      symbol: 'S',
      depth: 1,
      pos: { x: 0.32, y: 0.76 },
      ...e(['init', 'repos', 'trace', 'how'], { init: 2, repos: 2, trace: 1, how: 1 }),
    },
    trace: {
      id: 'trace',
      label: 'Percurso',
      symbol: 'T',
      depth: 2,
      pos: { x: 0.58, y: 0.16 },
      ...e(['repos', 'structures', 'io'], { repos: 1, structures: 1, io: 1 }),
    },
    how: {
      id: 'how',
      label: 'Como funciona',
      symbol: 'G',
      depth: 2,
      pos: { x: 0.6, y: 0.74 },
      ...e(['init', 'structures', 'io'], { init: 4, structures: 1, io: 3 }),
    },
    io: {
      id: 'io',
      label: 'Contacto',
      symbol: 'Ω',
      depth: 3,
      pos: { x: 0.88, y: 0.46 },
      ...e(['repos', 'trace', 'how'], { repos: 3, trace: 1, how: 3 }),
    },
  },
}

export const NODE_ORDER: NodeId[] = ['init', 'repos', 'trace', 'structures', 'how', 'io']

// color: cor do caminho nos dois grafos (painel lateral e CS Lab)
export const ALGO_META: Record<AlgoId, { name: string; complexity: string; desc: string; color: string }> = {
  dijkstra: {
    name: 'Dijkstra',
    color: '#e0a243',
    complexity: 'O((V+E) log V)',
    desc: 'Encontra o custo mínimo com pesos ≥ 0. É o que uso quando importa escolher entre um atalho caro e uma rota longa.',
  },
  astar: {
    name: 'A*',
    color: '#8fb0c4',
    complexity: 'O((V+E) log V)',
    desc: 'h(n)=|depth(n)−depth(goal)| reduz expansões neste grafo em camadas, mantendo o óptimo.',
  },
  bfs: {
    name: 'BFS',
    color: '#c9866a',
    complexity: 'O(V+E)',
    desc: 'Encontra o caminho com menos saltos e ignora os pesos. Bom para comparar com o Dijkstra no mesmo destino.',
  },
}
