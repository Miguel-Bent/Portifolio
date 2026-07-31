export type NodeId =
  | 'init'
  | 'automata'
  | 'graphs'
  | 'algo'
  | 'trace'
  | 'complexity'
  | 'repos'
  | 'structures'
  | 'memory'
  | 'proof'
  | 'io'

export type AlgoId = 'dijkstra' | 'astar' | 'bfs'

export type NavPhase = 'idle' | 'scan' | 'run' | 'walk' | 'render' | 'done'

export interface Vertex {
  id: NodeId
  label: string
  symbol: string
  depth: number
  pos: { x: number; y: number }
  neighbors: NodeId[]
  weight: Partial<Record<NodeId, number>>
}

export interface Graph {
  vertices: Record<NodeId, Vertex>
}

export interface PathResult {
  path: NodeId[]
  cost: number
  visited: NodeId[]
  frontier: NodeId[]
  expansions: number
  ms: number
  algo: AlgoId
  complexity: string
}

export interface DfaSnapshot {
  state: NavPhase
  transitions: { from: NavPhase; to: NavPhase; label: string }[]
}

export interface PdaSnapshot {
  state: string
  stack: string[]
  input: string[]
  head: number
}

export interface TmSnapshot {
  state: string
  tape: string[]
  head: number
}

export interface RunMetrics {
  algo: AlgoId
  ms: number
  expansions: number
  pathLen: number
  animMs: number
  stackOps: number
}

export type Pulse =
  | { type: 'GOTO'; target: NodeId }
  | { type: 'ALGO'; algo: AlgoId }
  | { type: 'PHASE'; phase: NavPhase }
  | { type: 'RUN_START'; from: NodeId; to: NodeId; algo: AlgoId }
  | { type: 'EXPAND'; node: NodeId; frontier: NodeId[]; visited: NodeId[] }
  | { type: 'PATH'; result: PathResult }
  | { type: 'DFA'; snap: DfaSnapshot }
  | { type: 'PDA'; snap: PdaSnapshot }
  | { type: 'TM'; snap: TmSnapshot }
  | { type: 'STEP'; node: NodeId; i: number; path: NodeId[] }
  | { type: 'DONE'; node: NodeId }
  | { type: 'LOG'; msg: string; warn?: boolean }
  | { type: 'METRICS'; data: RunMetrics }
  | { type: 'BOOT_START' }
  | { type: 'BOOT_DONE' }
  | { type: 'BOOT_HOLD_START' }
  | { type: 'BOOT_AUTO_ADVANCE' }
  | { type: 'INTRO_PASSED' }

export type Unsub = () => void
