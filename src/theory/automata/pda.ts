import type { NodeId, PdaSnapshot, Vertex } from '../types'
import { CS_GRAPH } from '../graph/cs-graph'
import { Stack } from '../structures/stack'

const SYM: Record<NodeId, string> = Object.fromEntries(
  (Object.values(CS_GRAPH.vertices) as Vertex[]).map((v) => [v.id, v.symbol]),
) as Record<NodeId, string>

/** PDA: empilha símbolos ao percorrer o caminho — demonstra LIFO */
export class PathPda {
  private stack = new Stack<string>()
  private state = 'q0'
  private input: string[] = []
  private head = 0
  private ops = 0

  loadPath(path: NodeId[]) {
    this.input = path.map((id) => SYM[id])
    this.head = 0
    this.stack = new Stack()
    this.state = 'q0'
    this.ops = 0
    this.snap()
  }

  /** Simula leitura + push por símbolo */
  tick(): PdaSnapshot {
    if (this.head < this.input.length) {
      const sym = this.input[this.head]
      this.stack.push(sym)
      this.ops++
      this.state = 'push'
      this.head++
    } else if (this.stack.size() > 0) {
      this.stack.pop()
      this.ops++
      this.state = 'pop'
    } else {
      this.state = 'accept'
    }
    return this.snap()
  }

  snap(): PdaSnapshot {
    return {
      state: this.state,
      stack: this.stack.toArray(),
      input: [...this.input],
      head: this.head,
    }
  }

  operationCount() {
    return this.ops
  }
}
