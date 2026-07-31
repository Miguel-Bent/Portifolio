import { memo, type ReactNode } from 'react'
import { useLab } from '../store/lab-store'
import { NAV_PHASES } from '../theory/automata/dfa'
import { ALGO_META } from '../theory/graph/cs-graph'
import type { AlgoId } from '../theory/types'

export const AlgoSwitcher = memo(function AlgoSwitcher() {
  const algo = useLab((s) => s.algo)
  const phase = useLab((s) => s.phase)
  const setAlgo = useLab((s) => s.setAlgo)
  const busy = phase !== 'idle'

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} role="group" aria-label="Algoritmo">
      {(['dijkstra', 'astar', 'bfs'] as AlgoId[]).map((a) => (
        <button
          key={a}
          type="button"
          disabled={busy}
          onClick={() => setAlgo(a)}
          title={ALGO_META[a].desc}
          style={{
            padding: '0.4rem 0.75rem',
            borderRadius: '6px',
            border: `1px solid ${algo === a ? 'var(--accent)' : 'var(--border)'}`,
            background: algo === a ? 'var(--accent-glow)' : 'transparent',
            color: algo === a ? 'var(--accent)' : 'var(--text-muted)',
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: busy ? 0.4 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          {ALGO_META[a].name}
        </button>
      ))}
    </div>
  )
})

export const AutomataPanel = memo(function AutomataPanel() {
  const dfa = useLab((s) => s.dfa)
  const pda = useLab((s) => s.pda)
  const tm = useLab((s) => s.tm)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
      <Cell title="DFA" sub="navigation fsm">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {NAV_PHASES.map((p) => (
            <span
              key={p}
              style={{
                padding: '0.15rem 0.4rem',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                borderRadius: '3px',
                background: p === dfa.state ? 'var(--lab-accent)' : 'transparent',
                color: p === dfa.state ? 'var(--lab-bg)' : 'var(--lab-muted)',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </Cell>

      <Cell title="PDA" sub={`stack · ${pda.state}`}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
          {pda.stack.length === 0 ? (
            <span style={{ fontSize: '0.65rem', color: 'var(--lab-muted)' }}>ε</span>
          ) : (
            pda.stack.map((s, i) => (
              <span
                key={i}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '1.25rem',
                  height: '1.5rem',
                  border: '1px solid var(--lab-orange)',
                  fontSize: '0.6rem',
                  color: 'var(--lab-orange)',
                  marginBottom: i * 2,
                }}
              >
                {s}
              </span>
            ))
          )}
        </div>
      </Cell>

      <Cell title="TM" sub={`tape · ${tm.state}`}>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto' }}>
          {tm.tape.map((c, i) => (
            <span
              key={i}
              style={{
                display: 'grid',
                placeItems: 'center',
                minWidth: '1.5rem',
                height: '1.5rem',
                fontSize: '0.6rem',
                background: i === tm.head ? 'var(--lab-purple)' : 'var(--lab-bg)',
                color: i === tm.head ? 'white' : 'var(--lab-muted)',
                borderRadius: '3px',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </Cell>
    </div>
  )
})

function Cell({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--lab-border)',
        background: 'var(--lab-bg)',
        borderRadius: '8px',
        padding: '0.75rem',
      }}
    >
      <p
        style={{
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--lab-accent)',
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: '0.5rem', color: 'var(--lab-muted)' }}>{sub}</p>
      <div style={{ marginTop: '0.5rem' }}>{children}</div>
    </div>
  )
}
