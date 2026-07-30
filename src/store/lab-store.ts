import { create } from 'zustand'
import type {
  AlgoId,
  DfaSnapshot,
  NavPhase,
  NodeId,
  PathResult,
  PdaSnapshot,
  RunMetrics,
  TmSnapshot,
} from '../theory/types'
import { cortex } from '../cortex/engine'
import { synapse } from '../synapse/bus'

interface LogLine {
  id: number
  msg: string
  warn: boolean
}

interface LabState {
  node: NodeId
  phase: NavPhase
  algo: AlgoId
  path: NodeId[]
  frontier: NodeId[]
  visited: NodeId[]
  result: PathResult | null
  dfa: DfaSnapshot
  pda: PdaSnapshot
  tm: TmSnapshot
  choreoAt: NodeId | null
  labOpen: boolean
  logs: LogLine[]
  metrics: RunMetrics | null
  goto: (t: NodeId) => void
  setAlgo: (a: AlgoId) => void
  toggleLab: () => void
}

let lid = 0
let raf = 0
let pending: { frontier: NodeId[]; visited: NodeId[] } | null = null

function flush() {
  raf = 0
  if (!pending) return
  const p = pending
  pending = null
  useLab.setState({ frontier: p.frontier, visited: p.visited })
}

export const useLab = create<LabState>((set) => ({
  node: 'init',
  phase: 'idle',
  algo: 'dijkstra',
  path: [],
  frontier: [],
  visited: [],
  result: null,
  dfa: cortex.dfaSnap(),
  pda: cortex.pdaSnap(),
  tm: cortex.tmSnap(),
  choreoAt: null,
  labOpen: false,
  logs: [],
  metrics: null,
  goto: (t) => synapse.fire({ type: 'GOTO', target: t }),
  setAlgo: (a) => {
    set({ algo: a })
    synapse.fire({ type: 'ALGO', algo: a })
  },
  toggleLab: () => set((s) => ({ labOpen: !s.labOpen })),
}))

export function wireLab(): () => void {
  return synapse.on('*', (p) => {
    switch (p.type) {
      case 'PHASE':
        useLab.setState({ phase: p.phase })
        break
      case 'PATH':
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
          pending = null
        }
        useLab.setState({
          result: p.result,
          path: p.result.path,
          frontier: p.result.frontier,
          visited: p.result.visited,
          algo: p.result.algo,
        })
        break
      case 'EXPAND':
        pending = { frontier: p.frontier, visited: p.visited }
        if (!raf) raf = requestAnimationFrame(flush)
        break
      case 'STEP':
        useLab.setState({ choreoAt: p.node, node: p.node })
        break
      case 'DFA':
        useLab.setState({ dfa: p.snap })
        break
      case 'PDA':
        useLab.setState({ pda: p.snap })
        break
      case 'TM':
        useLab.setState({ tm: p.snap })
        break
      case 'DONE':
        useLab.setState({ node: p.node, choreoAt: null })
        break
      case 'LOG': {
        const open = useLab.getState().labOpen
        if (!open && !p.warn) break
        useLab.setState((s) => ({
          logs: [{ id: ++lid, msg: p.msg, warn: !!p.warn }, ...s.logs].slice(0, 80),
        }))
        break
      }
      case 'METRICS':
        useLab.setState({ metrics: p.data })
        break
    }
  })
}
