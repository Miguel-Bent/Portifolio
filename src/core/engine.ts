import { CS_GRAPH } from '../theory/graph/cs-graph'
import { runAlgo } from '../theory/algorithms/pathfind'
import type { AlgoId, NodeId, RunMetrics } from '../theory/types'
import { NavDfa } from '../theory/automata/dfa'
import { PathPda } from '../theory/automata/pda'
import { TapeMachine } from '../theory/automata/turing'
import { bus } from './bus'
import { animator } from './animator'

import { profileNameBoot } from '../content/profile'

const BOOT_CHARS = profileNameBoot.split('')
export const BOOT_HOLD_MS = 2_000

class Engine {
  private dfa = new NavDfa()
  private pda = new PathPda()
  private tm = new TapeMachine()
  private here: NodeId = 'init'
  private algo: AlgoId = 'dijkstra'
  private busy = false
  private skipBoot = false

  constructor() {
    bus.on('GOTO', (p) => {
      if (p.type === 'GOTO') void this.go(p.target)
    })
    bus.on('ALGO', (p) => {
      if (p.type === 'ALGO' && !this.busy) this.algo = p.algo
    })
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

  /** Acaba a intro já: as esperas restantes do boot passam a zero. */
  skipIntro() {
    this.skipBoot = true
  }

  /** Espera que termina mais cedo se skipIntro() for chamado. */
  private async bootWait(ms: number) {
    const end = performance.now() + ms
    while (!this.skipBoot && performance.now() < end) {
      await animator.wait(Math.min(100, end - performance.now()))
    }
  }

  async boot() {
    if (this.busy) return
    this.busy = true

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stepMs = reduce ? 0 : 110

    bus.fire({ type: 'BOOT_START' })

    try {
      const tape = ['⊔', ...BOOT_CHARS, '⊔']
      this.dfa.setState('scan')
      this.tm.loadCustom(tape, 1, 'boot')
      this.pda.loadChars(BOOT_CHARS)

      bus.fire({ type: 'DFA', snap: this.dfa.snap() })
      bus.fire({ type: 'TM', snap: this.tm.snap() })
      bus.fire({ type: 'PDA', snap: this.pda.snap() })

      for (let i = 0; i < BOOT_CHARS.length; i++) {
        this.tm.loadCustom(tape, i + 1, 'boot')
        this.pda.bootTick()
        bus.fire({ type: 'TM', snap: this.tm.snap() })
        bus.fire({ type: 'PDA', snap: this.pda.snap() })
        if (stepMs > 0) await this.bootWait(stepMs)
      }

      for (const phase of ['run', 'walk', 'render', 'done'] as const) {
        this.dfa.setState(phase)
        bus.fire({ type: 'PHASE', phase })
        bus.fire({ type: 'DFA', snap: this.dfa.snap() })
        if (!reduce) await this.bootWait(80)
      }

      bus.fire({ type: 'PHASE', phase: 'idle' })
      this.dfa.reset()
      bus.fire({ type: 'DFA', snap: this.dfa.snap() })

      bus.fire({ type: 'BOOT_HOLD_START' })
      await this.bootWait(BOOT_HOLD_MS)
      bus.fire({ type: 'BOOT_AUTO_ADVANCE' })
    } finally {
      bus.fire({ type: 'BOOT_DONE' })
      this.busy = false
    }
  }

  async settleIntro() {
    if (this.busy) return
    this.tm.resetDefault()
    this.tm.seek('init')
    this.pda.reset()
    this.dfa.reset()
    bus.fire({ type: 'PHASE', phase: 'idle' })
    bus.fire({ type: 'TM', snap: this.tm.snap() })
    bus.fire({ type: 'PDA', snap: this.pda.snap() })
    bus.fire({ type: 'DFA', snap: this.dfa.snap() })
  }

  async go(target: NodeId) {
    if (this.busy) {
      bus.fire({ type: 'LOG', msg: `DFA ocupado, pedido ${target} ignorado`, warn: true })
      return
    }
    if (this.tm.snap().state === 'boot') {
      await this.settleIntro()
    }
    if (this.dfa.now() !== 'idle') {
      bus.fire({ type: 'LOG', msg: `DFA ocupado, pedido ${target} ignorado`, warn: true })
      return
    }
    if (target === this.here) {
      bus.fire({ type: 'LOG', msg: `Já em ${target}` })
      return
    }

    this.busy = true
    const from = this.here
    const algo = this.algo

    try {
      this.phase('scan')
      this.tm.seek(target)
      this.tm.setState('scan')
      bus.fire({ type: 'TM', snap: this.tm.snap() })
      bus.fire({ type: 'RUN_START', from, to: target, algo })
      bus.fire({ type: 'LOG', msg: `${algo.toUpperCase()} · ${from} → ${target}` })

      this.phase('run')
      this.tm.setState('compute')

      const result = runAlgo(algo, CS_GRAPH, from, target, (h) => {
        bus.fire({
          type: 'EXPAND',
          node: h.node,
          frontier: h.frontier,
          visited: h.visited,
        })
      })

      bus.fire({ type: 'PATH', result })
      bus.fire({ type: 'DFA', snap: this.dfa.snap() })

      this.pda.loadPath(result.path)
      bus.fire({ type: 'PDA', snap: this.pda.snap() })

      this.phase('walk')
      this.tm.setState('traverse')

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const stepMs = reduce ? 30 : 680

      for (let i = 0; i < result.path.length; i++) {
        bus.fire({ type: 'STEP', node: result.path[i], i, path: result.path })
        this.tm.seek(result.path[i])
        bus.fire({ type: 'TM', snap: this.tm.snap() })
        const pdaSnap = this.pda.tick()
        bus.fire({ type: 'PDA', snap: pdaSnap })
        if (i < result.path.length - 1) await animator.wait(stepMs)
      }

      while (this.pda.snap().stack.length > 0) {
        bus.fire({ type: 'PDA', snap: this.pda.tick() })
        if (!reduce) await animator.wait(140)
      }

      this.phase('render')
      await animator.wait(reduce ? 20 : 380)

      this.phase('done')
      this.tm.setState('halt')
      bus.fire({ type: 'TM', snap: this.tm.snap() })

      const metrics: RunMetrics = {
        algo,
        ms: result.ms,
        expansions: result.expansions,
        pathLen: result.path.length,
        animMs: result.path.length * stepMs,
        stackOps: this.pda.operationCount(),
      }
      bus.fire({ type: 'METRICS', data: metrics })
      bus.fire({ type: 'DONE', node: target })
      bus.fire({
        type: 'LOG',
        msg: `✓ ${result.path.join(' → ')} · custo ${result.cost} · ${result.complexity}`,
      })

      this.here = target
      this.phase('idle')
    } finally {
      this.busy = false
      if (this.dfa.now() !== 'idle') {
        this.dfa.reset()
        bus.fire({ type: 'PHASE', phase: 'idle' })
      }
    }
  }

  private phase(p: 'scan' | 'run' | 'walk' | 'render' | 'done' | 'idle') {
    if (p === 'idle') this.dfa.reset()
    else this.dfa.step(p)
    bus.fire({ type: 'PHASE', phase: p })
    bus.fire({ type: 'DFA', snap: this.dfa.snap() })
  }
}

export const engine = new Engine()
