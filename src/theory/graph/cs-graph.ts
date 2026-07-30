import type { AlgoId, Graph, NodeId } from '../types'

function e(n: NodeId[], w: Partial<Record<NodeId, number>>) {
  return { neighbors: n, weight: w }
}

export const CS_GRAPH: Graph = {
  vertices: {
    init: {
      id: 'init',
      label: 'Init',
      symbol: 'λ',
      depth: 0,
      pos: { x: 0.14, y: 0.5 },
      ...e(['graphs', 'structures'], { graphs: 1, structures: 2 }),
    },
    graphs: {
      id: 'graphs',
      label: 'Graphs',
      symbol: 'G',
      depth: 1,
      pos: { x: 0.3, y: 0.28 },
      ...e(['init', 'trace'], { init: 1, trace: 1 }),
    },
    trace: {
      id: 'trace',
      label: 'Trace',
      symbol: 'T',
      depth: 2,
      pos: { x: 0.48, y: 0.18 },
      ...e(['graphs', 'repos', 'proof'], { graphs: 1, repos: 1, proof: 2 }),
    },
    repos: {
      id: 'repos',
      label: 'Repos',
      symbol: 'R',
      depth: 3,
      pos: { x: 0.7, y: 0.3 },
      ...e(['trace', 'structures', 'io'], { trace: 1, structures: 1, io: 2 }),
    },
    structures: {
      id: 'structures',
      label: 'Structures',
      symbol: 'S',
      depth: 2,
      pos: { x: 0.32, y: 0.72 },
      ...e(['init', 'repos', 'proof'], { init: 2, repos: 1, proof: 1 }),
    },
    proof: {
      id: 'proof',
      label: 'Proof',
      symbol: 'P',
      depth: 3,
      pos: { x: 0.54, y: 0.74 },
      ...e(['trace', 'structures', 'io'], { trace: 2, structures: 1, io: 1 }),
    },
    io: {
      id: 'io',
      label: 'I/O',
      symbol: 'Ω',
      depth: 4,
      pos: { x: 0.86, y: 0.55 },
      ...e(['repos', 'proof'], { repos: 2, proof: 1 }),
    },
  },
}

export const NODE_ORDER: NodeId[] = [
  'init',
  'graphs',
  'trace',
  'repos',
  'structures',
  'proof',
  'io',
]

export const ALGO_META: Record<AlgoId, { name: string; complexity: string; desc: string }> = {
  dijkstra: {
    name: 'Dijkstra',
    complexity: 'O((V+E) log V)',
    desc: 'Caminho mínimo com pesos não-negativos. Usa priority queue.',
  },
  astar: {
    name: 'A*',
    complexity: 'O((V+E) log V)',
    desc: 'Heurística h(n)=|depth(n)−depth(goal)| guia a busca.',
  },
  bfs: {
    name: 'BFS',
    complexity: 'O(V+E)',
    desc: 'Menor número de arestas (camadas). Fila FIFO.',
  },
}
