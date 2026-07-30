import { describe, expect, it } from 'vitest'
import { dijkstra, astar, bfs } from './pathfind'
import { CS_GRAPH } from '../graph/cs-graph'
import { MinHeap } from '../structures/min-heap'
import { Stack } from '../structures/stack'

describe('pathfinding', () => {
  it('dijkstra init→io', () => {
    const r = dijkstra(CS_GRAPH, 'init', 'io')
    expect(r.path[0]).toBe('init')
    expect(r.path.at(-1)).toBe('io')
    expect(r.algo).toBe('dijkstra')
  })

  it('astar init→io', () => {
    const r = astar(CS_GRAPH, 'init', 'io')
    expect(r.path.at(-1)).toBe('io')
  })

  it('bfs init→io', () => {
    const r = bfs(CS_GRAPH, 'init', 'io')
    expect(r.path.at(-1)).toBe('io')
    expect(r.complexity).toBe('O(V+E)')
  })
})

describe('structures', () => {
  it('min heap', () => {
    const h = new MinHeap<string>()
    h.push('b', 2)
    h.push('a', 1)
    expect(h.pop()).toBe('a')
  })

  it('stack LIFO', () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    expect(s.pop()).toBe(2)
  })
})
