import { CS_GRAPH } from '../theory/graph/cs-graph'
import { runAlgo } from '../theory/algorithms/pathfind'
import type { AlgoId, NodeId, RunMetrics } from '../theory/types'
import { NavDfa } from '../theory/automata/dfa'
import { PathPda } from '../theory/automata/pda'
import { TapeMachine } from '../theory/automata/turing'
import { synapse } from '../synapse/bus'
import { animator } from './animator'

export const OWNER_NAME = 'MIGUEL BENTO'
const BOOT_CHARS = OWNER_NAME.split('')
export const BOOT_HOLD_MS = 10_000

class Cortex {
  private dfa = new NavDfa()
  private pda = new PathPda()
  private tm = new TapeMachine()
  private here: NodeId = 'init'
  private algo: AlgoId = 'dijkstra'
  private busy = false

  constructor() {
    synapse.on('GOTO', (p) => {
      if (p.type === 'GOTO') void this.go(p.target)
    })
    synapse.on('ALGO', (p) => {
      if (p.type === 'ALGO' && !this.busy) this.algo = p.algo
    })
  }

  locate() {
    return this.here
  }

  algorithm() {
    return this.algo
  }

  dfaSnap() {
    return this.dfa.snap()
  }

  pdaSnap() {
    return this.pda.snap()
  }

  tmSnap() {
    return this.tm.snap()
  }

  async boot() {
    if (this.busy) return
    this.busy = true

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stepMs = reduce ? 0 : 110

    synapse.fire({ type: 'BOOT_START' })

    try {
      const tape = ['⊔', ...BOOT_CHARS, '⊔']
      this.dfa.setState('scan')
      this.tm.loadCustom(tape, 1, 'boot')
      this.pda.loadChars(BOOT_CHARS)

      synapse.fire({ type: 'DFA', snap: this.dfa.snap() })
      synapse.fire({ type: 'TM', snap: this.tm.snap() })
      synapse.fire({ type: 'PDA', snap: this.pda.snap() })

      for (let i = 0; i < BOOT_CHARS.length; i++) {
        this.tm.loadCustom(tape, i + 1, 'boot')
        this.pda.bootTick()
        synapse.fire({ type: 'TM', snap: this.tm.snap() })
        synapse.fire({ type: 'PDA', snap: this.pda.snap() })
        if (stepMs > 0) await animator.wait(stepMs)
      }

      for (const phase of ['run', 'walk', 'render', 'done'] as const) {
        this.dfa.setState(phase)
        synapse.fire({ type: 'PHASE', phase })
        synapse.fire({ type: 'DFA', snap: this.dfa.snap() })
        if (!reduce) await animator.wait(80)
      }

      synapse.fire({ type: 'PHASE', phase: 'idle' })
      this.dfa.reset()
      synapse.fire({ type: 'DFA', snap: this.dfa.snap() })

      synapse.fire({ type: 'BOOT_HOLD_START' })
      await animator.wait(BOOT_HOLD_MS)
      synapse.fire({ type: 'BOOT_AUTO_ADVANCE' })
    } finally {
      synapse.fire({ type: 'BOOT_DONE' })
      this.busy = false
    }
  }

  async settleIntro() {
    if (this.busy) return
    this.tm.resetDefault()
    this.tm.seek('init')
    this.pda.reset()
    this.dfa.reset()
    synapse.fire({ type: 'PHASE', phase: 'idle' })
    synapse.fire({ type: 'TM', snap: this.tm.snap() })
    synapse.fire({ type: 'PDA', snap: this.pda.snap() })
    synapse.fire({ type: 'DFA', snap: this.dfa.snap() })
  }

  async go(target: NodeId) {
    if (this.busy) {
      synapse.fire({ type: 'LOG', msg: `DFA ocupado — pedido ${target} ignorado`, warn: true })
      return
    }
    if (this.tm.snap().state === 'boot') {
      await this.settleIntro()
    }
    if (this.dfa.now() !== 'idle') {
      synapse.fire({ type: 'LOG', msg: `DFA ocupado — pedido ${target} ignorado`, warn: true })
      return
    }
    if (target === this.here) {
      synapse.fire({ type: 'LOG', msg: `Já em ${target}` })
      return
    }

    this.busy = true
    const from = this.here
    const algo = this.algo

    try {
      this.phase('scan')
      this.tm.seek(target)
      this.tm.setState('scan')
      synapse.fire({ type: 'TM', snap: this.tm.snap() })
      synapse.fire({ type: 'RUN_START', from, to: target, algo })
      synapse.fire({ type: 'LOG', msg: `${algo.toUpperCase()} · ${from} → ${target}` })

      this.phase('run')
      this.tm.setState('compute')

      const result = runAlgo(algo, CS_GRAPH, from, target, (h) => {
        synapse.fire({
          type: 'EXPAND',
          node: h.node,
          frontier: h.frontier,
          visited: h.visited,
        })
      })

      synapse.fire({ type: 'PATH', result })
      synapse.fire({ type: 'DFA', snap: this.dfa.snap() })

      this.pda.loadPath(result.path)
      synapse.fire({ type: 'PDA', snap: this.pda.snap() })

      this.phase('walk')
      this.tm.setState('traverse')

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const stepMs = reduce ? 30 : 680

      for (let i = 0; i < result.path.length; i++) {
        synapse.fire({ type: 'STEP', node: result.path[i], i, path: result.path })
        this.tm.seek(result.path[i])
        synapse.fire({ type: 'TM', snap: this.tm.snap() })
        const pdaSnap = this.pda.tick()
        synapse.fire({ type: 'PDA', snap: pdaSnap })
        if (i < result.path.length - 1) await animator.wait(stepMs)
      }

      while (this.pda.snap().stack.length > 0) {
        synapse.fire({ type: 'PDA', snap: this.pda.tick() })
        if (!reduce) await animator.wait(140)
      }

      this.phase('render')
      await animator.wait(reduce ? 20 : 380)

      this.phase('done')
      this.tm.setState('halt')
      synapse.fire({ type: 'TM', snap: this.tm.snap() })

      const metrics: RunMetrics = {
        algo,
        ms: result.ms,
        expansions: result.expansions,
        pathLen: result.path.length,
        animMs: result.path.length * stepMs,
        stackOps: this.pda.operationCount(),
      }
      synapse.fire({ type: 'METRICS', data: metrics })
      synapse.fire({ type: 'DONE', node: target })
      synapse.fire({
        type: 'LOG',
        msg: `✓ ${result.path.join(' → ')} · custo ${result.cost} · ${result.complexity}`,
      })

      this.here = target
      this.phase('idle')
    } finally {
      this.busy = false
      if (this.dfa.now() !== 'idle') {
        this.dfa.reset()
        synapse.fire({ type: 'PHASE', phase: 'idle' })
      }
    }
  }

  private phase(p: 'scan' | 'run' | 'walk' | 'render' | 'done' | 'idle') {
    if (p === 'idle') this.dfa.reset()
    else this.dfa.step(p)
    synapse.fire({ type: 'PHASE', phase: p })
    synapse.fire({ type: 'DFA', snap: this.dfa.snap() })
  }
}

export const cortex = new Cortex()
