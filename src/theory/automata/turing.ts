import type { NodeId, TmSnapshot, Vertex } from '../types'
import { CS_GRAPH } from '../graph/cs-graph'

const SYMS = (Object.values(CS_GRAPH.vertices) as Vertex[]).map((v) => v.symbol)

export class TapeMachine {
  private tape = ['⊔', ...SYMS, '⊔']
  private head = 1
  private state = 'halt'

  snap(): TmSnapshot {
    return { state: this.state, tape: [...this.tape], head: this.head }
  }

  loadCustom(cells: string[], head = 0, state = 'boot') {
    this.tape = cells
    this.head = head
    this.state = state
  }

  resetDefault() {
    this.tape = ['⊔', ...SYMS, '⊔']
    this.head = 1
    this.state = 'halt'
  }

  seek(id: NodeId) {
    const s = CS_GRAPH.vertices[id].symbol
    const i = this.tape.indexOf(s)
    if (i >= 0) this.head = i
  }

  setState(s: string) {
    this.state = s
  }

  step(dir: 'L' | 'R' | 'S' = 'S', newState?: string) {
    if (newState) this.state = newState
    if (dir === 'L') this.head = Math.max(0, this.head - 1)
    if (dir === 'R') this.head = Math.min(this.tape.length - 1, this.head + 1)
    return this.snap()
  }
}
