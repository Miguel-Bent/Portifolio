import { CS_GRAPH } from '../theory/graph/cs-graph'
import type { NodeId } from '../theory/types'

export interface FlowDir {
  dx: number
  dy: number
}

export function flowBetween(from: NodeId, to: NodeId): FlowDir {
  const a = CS_GRAPH.vertices[from].pos
  const b = CS_GRAPH.vertices[to].pos
  return { dx: b.x - a.x, dy: b.y - a.y }
}

const THRESHOLD = 0.012

export interface FlowSlide {
  enterX: string | number
  enterY: string | number
  exitX: string | number
  exitY: string | number
}

/**
 * Converte o delta do grafo num slide completo de ecrã.
 * dx+ → entra pela direita, sai pela esquerda
 * dy+ (baixo no grafo) → entra por baixo, sai por cima
 */
export function flowToSlide({ dx, dy }: FlowDir): FlowSlide {
  const slideX = Math.abs(dx) > THRESHOLD ? (dx > 0 ? 1 : -1) : 0
  const slideY = Math.abs(dy) > THRESHOLD ? (dy > 0 ? 1 : -1) : 0

  const enterX = slideX > 0 ? '100%' : slideX < 0 ? '-100%' : 0
  const exitX = slideX > 0 ? '-100%' : slideX < 0 ? '100%' : 0
  const enterY = slideY > 0 ? '100%' : slideY < 0 ? '-100%' : 0
  const exitY = slideY > 0 ? '-100%' : slideY < 0 ? '100%' : 0

  return { enterX, enterY, exitX, exitY }
}
