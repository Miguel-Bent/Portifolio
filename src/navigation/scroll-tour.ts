import type { NodeId } from '../theory/types'

/** Ordem do scroll. Cada passo segue uma aresta do grafo. */
export const SCROLL_TOUR: NodeId[] = ['init', 'repos', 'trace', 'structures', 'how', 'io']

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
