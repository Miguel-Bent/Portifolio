import { memo, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../content/profile'
import { useLab } from '../store/lab-store'
import { CS_GRAPH, ALGO_META } from '../theory/graph/cs-graph'
import type { NodeId } from '../theory/types'
import { LabGraph } from './LabGraph'
import { AlgoSwitcher, AutomataPanel } from './AutomataPanel'

export const CSLab = memo(function CSLab() {
  const open = useLab((s) => s.labOpen)
  const toggle = useLab((s) => s.toggleLab)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, toggle])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lab-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-label="CS Lab"
        >
          <button type="button" className="lab-overlay__backdrop" onClick={toggle} aria-label="Fechar" />

          <motion.div
            className="lab-chamber"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <header className="lab-header">
              <div>
                <p className="lab-label">{profile.name}</p>
                <h2 className="lab-header__title">CS Lab</h2>
                <p className="lab-header__hint">
                  Escolhe um algoritmo e clica numa secção para veres a fronteira, o caminho e as fases do DFA em
                  tempo real.
                </p>
              </div>
              <button type="button" onClick={toggle} className="lab-header__close" aria-keyshortcuts="Escape">
                Fechar
              </button>
            </header>

            <div className="lab-grid">
              <div className="lab-graph-area">
                <LabGraph />
              </div>

              <div className="lab-side">
                <section className="lab-side__algo">
                  <p className="lab-label">algoritmo</p>
                  <AlgoSwitcher />
                </section>

                <AutomataPanel />
                <LabTelemetry />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

function LabTelemetry() {
  const path = useLab((s) => s.path)
  const frontier = useLab((s) => s.frontier)
  const visited = useLab((s) => s.visited)
  const result = useLab((s) => s.result)
  const logs = useLab((s) => s.logs)
  const metrics = useLab((s) => s.metrics)
  const phase = useLab((s) => s.phase)
  const algo = useLab((s) => s.algo)

  return (
    <div className="lab-telemetry">
      <div className="lab-box">
        <p className="lab-label">
          {ALGO_META[algo].name} · {ALGO_META[algo].complexity}
        </p>
        <p className="lab-label lab-telemetry__desc">{ALGO_META[algo].desc}</p>
        <p className="lab-telemetry__phase">fase: {phase}</p>
      </div>

      <div className="lab-telemetry__sets">
        <TagBox title="fronteira" items={frontier} variant="frontier" />
        <TagBox title="visitados" items={visited} variant="visited" />
      </div>

      <div>
        <p className="lab-label">caminho</p>
        <p className="lab-telemetry__path">
          {path.length ? path.map((id) => CS_GRAPH.vertices[id].symbol).join(' → ') : '·'}
        </p>
        {result && (
          <p className="lab-label">
            custo {result.cost} · {result.ms.toFixed(2)} ms · {result.expansions} expansões
          </p>
        )}
      </div>

      {metrics && (
        <p className="lab-label">
          {metrics.stackOps} operações na stack · animação ~{metrics.animMs} ms
        </p>
      )}

      <ul className="lab-log">
        {logs.length === 0 && <li>O log aparece aqui quando mudares de secção.</li>}
        {logs.map((l) => (
          <li key={l.id} className={l.warn ? 'lab-log__warn' : undefined}>
            {l.msg}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TagBox({
  title,
  items,
  variant,
}: Readonly<{ title: string; items: NodeId[]; variant: 'frontier' | 'visited' }>) {
  return (
    <div className="lab-box">
      <p className="lab-label">{title}</p>
      <div className="lab-tags">
        {items.length === 0 ? (
          <span className="lab-empty">∅</span>
        ) : (
          items.map((id) => (
            <span key={id} className={`lab-tag lab-tag--${variant}`}>
              {CS_GRAPH.vertices[id].symbol}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
