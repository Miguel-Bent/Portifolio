import { memo, type ReactNode } from 'react'
import { useLab } from '../store/lab-store'
import { NAV_PHASES } from '../theory/automata/dfa'
import { ALGO_META } from '../theory/graph/cs-graph'
import type { AlgoId } from '../theory/types'

export const AutomataStrip = memo(function AutomataStrip() {
  const dfa = useLab((s) => s.dfa)
  const pda = useLab((s) => s.pda)
  const tm = useLab((s) => s.tm)

  return (
    <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
      <MiniPanel title="DFA" sub="Finite State Automaton">
        <div className="flex flex-wrap gap-1">
          {NAV_PHASES.map((p) => (
            <span
              key={p}
              className={[
                'rounded px-1.5 py-0.5 font-mono text-[9px] uppercase',
                p === dfa.state ? 'bg-[var(--green)] text-[var(--bg)]' : 'text-[var(--muted)]',
              ].join(' ')}
            >
              {p}
            </span>
          ))}
        </div>
      </MiniPanel>

      <MiniPanel title="PDA" sub="Pushdown Automaton · Stack">
        <div className="flex items-end gap-0.5">
          {pda.stack.length === 0 ? (
            <span className="font-mono text-[10px] text-[var(--muted)]">ε</span>
          ) : (
            pda.stack.map((s, i) => (
              <span
                key={i}
                className="flex h-6 w-5 items-center justify-center border border-[var(--orange)] bg-[var(--orange)]/10 font-mono text-[10px] text-[var(--orange)]"
                style={{ marginBottom: i * 2 }}
              >
                {s}
              </span>
            ))
          )}
        </div>
        <p className="mt-1 font-mono text-[9px] text-[var(--muted)]">state: {pda.state}</p>
      </MiniPanel>

      <MiniPanel title="TM" sub="Turing Machine · Tape">
        <div className="flex gap-0.5 overflow-x-auto">
          {tm.tape.map((c, i) => (
            <span
              key={i}
              className={[
                'flex h-6 min-w-6 items-center justify-center font-mono text-[10px]',
                i === tm.head
                  ? 'bg-[var(--purple)] text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)]',
              ].join(' ')}
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-1 font-mono text-[9px] text-[var(--muted)]">state: {tm.state}</p>
      </MiniPanel>
    </div>
  )
})

function MiniPanel({
  title,
  sub,
  children,
}: {
  title: string
  sub: string
  children: ReactNode
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5">
      <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--green)]">{title}</p>
      <p className="font-mono text-[8px] text-[var(--muted)]">{sub}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export const AlgoSwitcher = memo(function AlgoSwitcher() {
  const algo = useLab((s) => s.algo)
  const phase = useLab((s) => s.phase)
  const setAlgo = useLab((s) => s.setAlgo)
  const busy = phase !== 'idle'

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Algoritmo de pathfinding">
      {(['dijkstra', 'astar', 'bfs'] as AlgoId[]).map((a) => (
        <button
          key={a}
          type="button"
          disabled={busy}
          onClick={() => setAlgo(a)}
          title={ALGO_META[a].desc}
          className={[
            'rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition',
            algo === a
              ? 'border-[var(--green)] bg-[var(--green)]/15 text-[var(--green)]'
              : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--green)]/40',
            busy ? 'opacity-40' : '',
          ].join(' ')}
        >
          {ALGO_META[a].name}
        </button>
      ))}
    </div>
  )
})
