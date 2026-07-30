import type { DfaSnapshot, NavPhase } from '../types'

const EDGES: Record<NavPhase, NavPhase[]> = {
  idle: ['scan'],
  scan: ['run', 'idle'],
  run: ['walk', 'idle'],
  walk: ['render', 'idle'],
  render: ['done', 'idle'],
  done: ['idle'],
}

const LABELS: Record<NavPhase, string> = {
  idle: 'q₀ idle',
  scan: 'q₁ scan',
  run: 'q₂ run',
  walk: 'q₃ walk',
  render: 'q₄ render',
  done: 'q₅ done',
}

export const NAV_PHASES: NavPhase[] = ['idle', 'scan', 'run', 'walk', 'render', 'done']

export class NavDfa {
  private state: NavPhase = 'idle'
  private log: { from: NavPhase; to: NavPhase; label: string }[] = []

  snap(): DfaSnapshot {
    return { state: this.state, transitions: [...this.log].slice(-8) }
  }

  label() {
    return LABELS[this.state]
  }

  now() {
    return this.state
  }

  step(to: NavPhase): boolean {
    if (!EDGES[this.state].includes(to)) return false
    this.log.push({ from: this.state, to, label: `${LABELS[this.state]} → ${LABELS[to]}` })
    this.state = to
    return true
  }

  reset() {
    this.state = 'idle'
  }
}
