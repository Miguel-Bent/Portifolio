import type { NodeId } from '../theory/types'

/** Percorso DFS pela árvore do grafo — cada passo é uma aresta real */
export const SCROLL_TOUR: NodeId[] = [
  'init',
  'automata',
  'graphs',
  'algo',
  'trace',
  'complexity',
  'memory',
  'proof',
  'structures',
  'repos',
  'io',
]

export function tourIndex(id: NodeId) {
  return SCROLL_TOUR.indexOf(id)
}

export function nextInTour(id: NodeId): NodeId | null {
  const i = tourIndex(id)
  return i >= 0 && i < SCROLL_TOUR.length - 1 ? SCROLL_TOUR[i + 1] : null
}

export function prevInTour(id: NodeId): NodeId | null {
  const i = tourIndex(id)
  return i > 0 ? SCROLL_TOUR[i - 1] : null
}
