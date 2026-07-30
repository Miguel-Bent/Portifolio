import type { AlgoId, Graph, NodeId, PathResult } from '../types'
import { nbrs, wgt } from '../graph/ops'
import { MinHeap } from '../structures/min-heap'
import { Queue } from '../structures/queue'
import { h } from './heuristic'

type Hit = (p: { node: NodeId; frontier: NodeId[]; visited: NodeId[] }) => void

export function dijkstra(
  g: Graph,
  start: NodeId,
  goal: NodeId,
  onHit?: Hit,
): PathResult {
  const t0 = performance.now()
  const heap = new MinHeap<NodeId>()
  const dist = new Map<NodeId, number>([[start, 0]])
  const from = new Map<NodeId, NodeId>()
  const visited = new Set<NodeId>()
  const frontier = new Set<NodeId>([start])
  let expansions = 0

  heap.push(start, 0)

  while (!heap.empty()) {
    const cur = heap.pop()!
    if (visited.has(cur)) continue
    if (cur === goal) break

    visited.add(cur)
    frontier.delete(cur)
    expansions++
    onHit?.({ node: cur, frontier: [...frontier], visited: [...visited] })

    for (const nxt of nbrs(g, cur)) {
      if (visited.has(nxt)) continue
      const alt = (dist.get(cur) ?? Infinity) + wgt(g, cur, nxt)
      if (alt < (dist.get(nxt) ?? Infinity)) {
        dist.set(nxt, alt)
        from.set(nxt, cur)
        frontier.add(nxt)
        heap.push(nxt, alt)
      }
    }
  }

  return pack('dijkstra', start, goal, from, dist, visited, frontier, expansions, t0)
}

export function astar(g: Graph, start: NodeId, goal: NodeId, onHit?: Hit): PathResult {
  const t0 = performance.now()
  const heap = new MinHeap<NodeId>()
  const gScore = new Map<NodeId, number>([[start, 0]])
  const from = new Map<NodeId, NodeId>()
  const visited = new Set<NodeId>()
  const frontier = new Set<NodeId>([start])
  let expansions = 0

  heap.push(start, h(g, start, goal))

  while (!heap.empty()) {
    const cur = heap.pop()!
    if (visited.has(cur)) continue
    if (cur === goal) break

    visited.add(cur)
    frontier.delete(cur)
    expansions++
    onHit?.({ node: cur, frontier: [...frontier], visited: [...visited] })

    for (const nxt of nbrs(g, cur)) {
      if (visited.has(nxt)) continue
      const tg = (gScore.get(cur) ?? Infinity) + wgt(g, cur, nxt)
      if (tg < (gScore.get(nxt) ?? Infinity)) {
        gScore.set(nxt, tg)
        from.set(nxt, cur)
        frontier.add(nxt)
        heap.push(nxt, tg + h(g, nxt, goal))
      }
    }
  }

  return pack('astar', start, goal, from, gScore, visited, frontier, expansions, t0)
}

export function bfs(g: Graph, start: NodeId, goal: NodeId, onHit?: Hit): PathResult {
  const t0 = performance.now()
  const q = new Queue<NodeId>()
  const from = new Map<NodeId, NodeId>()
  const visited = new Set<NodeId>([start])
  const frontier = new Set<NodeId>([start])
  let expansions = 0

  q.enqueue(start)

  while (!q.empty()) {
    const cur = q.dequeue()!
    if (cur === goal) break

    expansions++
    onHit?.({ node: cur, frontier: [...frontier], visited: [...visited] })

    for (const nxt of nbrs(g, cur)) {
      if (visited.has(nxt)) continue
      visited.add(nxt)
      from.set(nxt, cur)
      frontier.add(nxt)
      q.enqueue(nxt)
    }
  }

  return pack('bfs', start, goal, from, new Map(), visited, frontier, expansions, t0)
}

function pack(
  algo: AlgoId,
  start: NodeId,
  goal: NodeId,
  from: Map<NodeId, NodeId>,
  dist: Map<NodeId, number>,
  visited: Set<NodeId>,
  frontier: Set<NodeId>,
  expansions: number,
  t0: number,
): PathResult {
  const path = rebuild(from, goal, start)
  const complexity = algo === 'bfs' ? 'O(V+E)' : 'O((V+E) log V)'
  return {
    path,
    cost: dist.get(goal) ?? Math.max(0, path.length - 1),
    visited: [...visited],
    frontier: [...frontier],
    expansions,
    ms: performance.now() - t0,
    algo,
    complexity,
  }
}

function rebuild(from: Map<NodeId, NodeId>, goal: NodeId, start: NodeId): NodeId[] {
  if (goal === start) return [start]
  const path = [goal]
  let c = goal
  while (from.has(c)) {
    c = from.get(c)!
    path.unshift(c)
  }
  return path[0] === start ? path : [start]
}

export function runAlgo(
  algo: AlgoId,
  g: Graph,
  start: NodeId,
  goal: NodeId,
  onHit?: Hit,
): PathResult {
  if (algo === 'dijkstra') return dijkstra(g, start, goal, onHit)
  if (algo === 'astar') return astar(g, start, goal, onHit)
  return bfs(g, start, goal, onHit)
}
