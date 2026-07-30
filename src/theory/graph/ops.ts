import type { Graph, NodeId, Vertex } from '../types'

export function vtx(g: Graph, id: NodeId): Vertex {
  const v = g.vertices[id]
  if (!v) throw new Error(`vertex ${id} not found`)
  return v
}

export function nbrs(g: Graph, id: NodeId): NodeId[] {
  return vtx(g, id).neighbors
}

export function wgt(g: Graph, a: NodeId, b: NodeId): number {
  const w = vtx(g, a).weight[b]
  if (w === undefined) throw new Error(`no edge ${a}→${b}`)
  return w
}

export function dep(g: Graph, id: NodeId): number {
  return vtx(g, id).depth
}

export function allVtx(g: Graph): Vertex[] {
  return Object.values(g.vertices)
}
