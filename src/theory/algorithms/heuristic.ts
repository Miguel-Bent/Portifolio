import type { Graph, NodeId } from '../types'
import { dep } from '../graph/ops'

export function h(graph: Graph, n: NodeId, goal: NodeId): number {
  return Math.abs(dep(graph, n) - dep(graph, goal))
}
