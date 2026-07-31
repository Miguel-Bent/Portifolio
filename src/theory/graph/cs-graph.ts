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
      pos: { x: 0.1, y: 0.5 },
      ...e(['graphs', 'structures', 'automata', 'algo'], {
        graphs: 1,
        structures: 2,
        automata: 1,
        algo: 5,
      }),
    },
    automata: {
      id: 'automata',
      label: 'Automata',
      symbol: 'M',
      depth: 1,
      pos: { x: 0.2, y: 0.74 },
      ...e(['init', 'graphs', 'algo', 'structures', 'trace'], {
        init: 1,
        graphs: 2,
        algo: 1,
        structures: 1,
        trace: 3,
      }),
    },
    graphs: {
      id: 'graphs',
      label: 'Graphs',
      symbol: 'G',
      depth: 1,
      pos: { x: 0.28, y: 0.2 },
      ...e(['init', 'automata', 'algo', 'trace', 'complexity'], {
        init: 1,
        automata: 2,
        algo: 1,
        trace: 1,
        complexity: 4,
      }),
    },
    algo: {
      id: 'algo',
      label: 'Algo',
      symbol: 'A',
      depth: 2,
      pos: { x: 0.4, y: 0.32 },
      ...e(['init', 'graphs', 'automata', 'trace', 'complexity'], {
        init: 5,
        graphs: 1,
        automata: 2,
        trace: 1,
        complexity: 2,
      }),
    },
    trace: {
      id: 'trace',
      label: 'Trace',
      symbol: 'T',
      depth: 2,
      pos: { x: 0.52, y: 0.12 },
      ...e(['graphs', 'automata', 'algo', 'repos', 'complexity', 'proof'], {
        graphs: 1,
        automata: 3,
        algo: 1,
        repos: 1,
        complexity: 1,
        proof: 2,
      }),
    },
    complexity: {
      id: 'complexity',
      label: 'Complexity',
      symbol: 'C',
      depth: 3,
      pos: { x: 0.54, y: 0.48 },
      ...e(['graphs', 'algo', 'trace', 'repos', 'proof', 'memory'], {
        graphs: 4,
        algo: 2,
        trace: 1,
        repos: 1,
        proof: 1,
        memory: 2,
      }),
    },
    repos: {
      id: 'repos',
      label: 'Repos',
      symbol: 'R',
      depth: 3,
      pos: { x: 0.72, y: 0.24 },
      ...e(['trace', 'complexity', 'structures', 'memory', 'io', 'proof'], {
        trace: 1,
        complexity: 1,
        structures: 1,
        memory: 1,
        io: 2,
        proof: 1,
      }),
    },
    structures: {
      id: 'structures',
      label: 'Structures',
      symbol: 'S',
      depth: 2,
      pos: { x: 0.3, y: 0.82 },
      ...e(['init', 'automata', 'repos', 'proof', 'memory'], {
        init: 2,
        automata: 1,
        repos: 1,
        proof: 1,
        memory: 1,
      }),
    },
    memory: {
      id: 'memory',
      label: 'Memory',
      symbol: 'H',
      depth: 3,
      pos: { x: 0.64, y: 0.74 },
      ...e(['structures', 'complexity', 'repos', 'proof'], {
        structures: 1,
        complexity: 2,
        repos: 1,
        proof: 1,
      }),
    },
    proof: {
      id: 'proof',
      label: 'Proof',
      symbol: 'P',
      depth: 3,
      pos: { x: 0.74, y: 0.6 },
      ...e(['trace', 'structures', 'complexity', 'memory', 'io', 'repos'], {
        trace: 2,
        structures: 1,
        complexity: 1,
        memory: 1,
        io: 1,
        repos: 1,
      }),
    },
    io: {
      id: 'io',
      label: 'I/O',
      symbol: 'Ω',
      depth: 4,
      pos: { x: 0.9, y: 0.44 },
      ...e(['repos', 'proof'], { repos: 2, proof: 1 }),
    },
  },
}

export const NODE_ORDER: NodeId[] = [
  'init',
  'automata',
  'graphs',
  'algo',
  'structures',
  'trace',
  'complexity',
  'memory',
  'proof',
  'repos',
  'io',
]

export const VERTEX_COUNT = NODE_ORDER.length

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
