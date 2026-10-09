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

  // Os exemplos citados na secção "Como funciona"
  it('bfs e dijkstra escolhem rotas diferentes para init→io', () => {
    expect(bfs(CS_GRAPH, 'init', 'io').path).toEqual(['init', 'repos', 'io'])
    const d = dijkstra(CS_GRAPH, 'init', 'io')
    expect(d.path).toEqual(['init', 'repos', 'trace', 'io'])
    expect(d.cost).toBe(3)
  })

  it('o atalho init→how custa mais que a rota pela stack', () => {
    const d = dijkstra(CS_GRAPH, 'init', 'how')
    expect(d.path).toEqual(['init', 'structures', 'how'])
    expect(d.cost).toBe(3)
  })

  it('astar encontra o mesmo custo que dijkstra', () => {
    const ids = Object.keys(CS_GRAPH.vertices) as (keyof typeof CS_GRAPH.vertices)[]
    for (const a of ids) {
      for (const b of ids) {
        if (a === b) continue
        expect(astar(CS_GRAPH, a, b).cost).toBe(dijkstra(CS_GRAPH, a, b).cost)
      }
    }
  })
})

describe('graph', () => {
  it('arestas simétricas e pesos ≥ diferença de profundidade', () => {
    for (const v of Object.values(CS_GRAPH.vertices)) {
      for (const n of v.neighbors) {
        const u = CS_GRAPH.vertices[n]
        expect(u.neighbors).toContain(v.id)
        expect(u.weight[v.id]).toBe(v.weight[n])
        expect(v.weight[n]!).toBeGreaterThanOrEqual(Math.abs(v.depth - u.depth))
      }
    }
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
