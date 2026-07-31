import { memo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../content/profile'
import { useLab } from '../store/lab-store'
import { CS_GRAPH, ALGO_META } from '../theory/graph/cs-graph'
import { NAV_PHASES } from '../theory/automata/dfa'
import { LabGraph } from './LabGraph'
import { AlgoSwitcher, AutomataPanel } from './AutomataPanel'

export const CSLab = memo(function CSLab() {
  const open = useLab((s) => s.labOpen)
  const toggle = useLab((s) => s.toggleLab)
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '1rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-label="CS Lab"
        >
          <button
            type="button"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={toggle}
            aria-label="Fechar"
          />

          <motion.div
            className="lab-chamber"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '72rem',
              height: 'min(92vh, 800px)',
              border: '1px solid var(--lab-border)',
              overflow: 'hidden',
            }}
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <header
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--lab-border)',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--lab-muted)',
                  }}
                >
                  {profile.name}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--lab-text)',
                    margin: 0,
                  }}
                >
                  CS Lab
                </h2>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'var(--lab-muted)' }}>
                  Telemetria ao vivo — muda o algoritmo e navega no grafo para ver frontier, path e fases DFA.
                </p>
              </div>
              <button
                type="button"
                onClick={toggle}
                style={{
                  padding: '0.4rem 0.75rem',
                  border: '1px solid var(--lab-border)',
                  borderRadius: '6px',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--lab-muted)',
                }}
              >
                esc
              </button>
            </header>

            <div style={{ display: 'flex', flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <div
                style={{
                  display: 'grid',
                  flex: 1,
                  minHeight: 0,
                  gridTemplateColumns: '1fr',
                }}
                className="lab-grid"
              >
                <style>{`
                  @media (min-width: 768px) {
                    .lab-grid { grid-template-columns: 42% 1fr !important; }
                  }
                `}</style>

                <div
                  style={{
                    height: '200px',
                    borderBottom: '1px solid var(--lab-border)',
                  }}
                  className="lab-graph-area"
                >
                  <style>{`
                    @media (min-width: 768px) {
                      .lab-graph-area { height: auto !important; border-bottom: none !important; border-right: 1px solid var(--lab-border); }
                    }
                  `}</style>
                  <LabGraph />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
                  <section style={{ marginBottom: '1.25rem' }}>
                    <p
                      style={{
                        marginBottom: '0.5rem',
                        fontSize: '0.55rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--lab-muted)',
                      }}
                    >
                      algoritmo
                    </p>
                    <AlgoSwitcher />
                  </section>

                  <AutomataPanel />
                  <LabTelemetry />
                </div>
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
    <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.8rem' }}>
      <div
        style={{
          border: '1px solid var(--lab-border)',
          borderRadius: '8px',
          padding: '0.75rem',
        }}
      >
        <p style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--lab-muted)' }}>
          {ALGO_META[algo].name} · {ALGO_META[algo].complexity}
        </p>
        <p style={{ marginTop: '0.35rem', fontSize: '0.7rem', color: 'var(--lab-muted)' }}>
          {ALGO_META[algo].desc}
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.65rem', color: 'var(--lab-accent)' }}>
          phase: {phase}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <TagBox title="frontier" items={frontier} color="var(--lab-accent)" />
        <TagBox title="visited" items={visited} color="var(--lab-purple)" />
      </div>

      <div>
        <p style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--lab-muted)' }}>path</p>
        <p style={{ color: 'var(--lab-text)' }}>
          {path.length
            ? path.map((id) => CS_GRAPH.vertices[id].symbol).join(' → ')
            : '—'}
        </p>
        {result && (
          <p style={{ marginTop: '0.35rem', fontSize: '0.65rem', color: 'var(--lab-muted)' }}>
            cost {result.cost} · {result.ms.toFixed(2)} ms · {result.expansions} expansions
          </p>
        )}
      </div>

      {metrics && (
        <p style={{ fontSize: '0.65rem', color: 'var(--lab-muted)' }}>
          stack ops {metrics.stackOps} · anim ~{metrics.animMs} ms
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
        {NAV_PHASES.map((p) => (
          <span
            key={p}
            style={{
              padding: '0.15rem 0.4rem',
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              borderRadius: '3px',
              background: p === phase ? 'var(--lab-accent)' : 'transparent',
              color: p === phase ? 'var(--lab-bg)' : 'var(--lab-muted)',
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <ul
        style={{
          maxHeight: '6rem',
          overflowY: 'auto',
          borderTop: '1px solid var(--lab-border)',
          paddingTop: '0.75rem',
          listStyle: 'none',
          margin: 0,
          padding: '0.75rem 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          fontSize: '0.7rem',
        }}
      >
        {logs.length === 0 && <li style={{ color: 'var(--lab-muted)' }}>$ awaiting input_</li>}
        {logs.map((l) => (
          <li key={l.id} style={{ color: l.warn ? 'var(--lab-orange)' : 'var(--lab-muted)' }}>
            {l.msg}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TagBox({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--lab-border)',
        borderRadius: '8px',
        padding: '0.5rem',
      }}
    >
      <p style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--lab-muted)' }}>
        {title}
      </p>
      <div style={{ marginTop: '0.35rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem', fontSize: '0.65rem' }}>
        {items.length === 0 ? (
          <span style={{ color: 'var(--lab-muted)' }}>∅</span>
        ) : (
          items.map((id) => (
            <span
              key={id}
              style={{ color, border: `1px solid ${color}`, padding: '0 0.25rem', borderRadius: '2px' }}
            >
              {CS_GRAPH.vertices[id as keyof typeof CS_GRAPH.vertices]?.symbol ?? id}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
