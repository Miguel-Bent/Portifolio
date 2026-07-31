import { CS_GRAPH } from './cs-graph'
import { allVtx } from './ops'
import type { NodeId } from '../types'

export function edgeKey(a: NodeId, b: NodeId) {
  return a < b ? `${a}|${b}` : `${b}|${a}`
}

export interface GraphEdge {
  key: string
  x1: number
  y1: number
  x2: number
  y2: number
  len: number
}

export const ALL_GRAPH_EDGES: GraphEdge[] = (() => {
  const out: GraphEdge[] = []
  const seen = new Set<string>()
  for (const v of allVtx(CS_GRAPH)) {
    for (const t of v.neighbors) {
      const key = edgeKey(v.id, t)
      if (seen.has(key)) continue
      seen.add(key)
      const b = CS_GRAPH.vertices[t]
      const x1 = v.pos.x * 100
      const y1 = v.pos.y * 100
      const x2 = b.pos.x * 100
      const y2 = b.pos.y * 100
      out.push({ key, x1, y1, x2, y2, len: Math.hypot(x2 - x1, y2 - y1) })
    }
  }
  return out
})()

export const TOTAL_EDGE_COUNT = ALL_GRAPH_EDGES.length

export function edgesFromPath(path: NodeId[]) {
  const keys: string[] = []
  for (let i = 1; i < path.length; i++) {
    keys.push(edgeKey(path[i - 1], path[i]))
  }
  return keys
}

export function mergeEdges(existing: string[], added: string[]) {
  const set = new Set(existing)
  for (const k of added) set.add(k)
  return [...set]
}
