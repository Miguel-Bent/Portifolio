import type { Pulse } from '../theory/types'

type Fn = (p: Pulse) => void

class Synapse {
  private m = new Map<Pulse['type'] | '*', Set<Fn>>()

  on(t: Pulse['type'] | '*', fn: Fn) {
    if (!this.m.has(t)) this.m.set(t, new Set())
    this.m.get(t)!.add(fn)
    return () => this.m.get(t)?.delete(fn)
  }

  fire(p: Pulse) {
    this.m.get(p.type)?.forEach((f) => f(p))
    this.m.get('*')?.forEach((f) => f(p))
  }
}

export const synapse = new Synapse()
