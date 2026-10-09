import { memo, type ReactNode } from 'react'
import { useLab } from '../store/lab-store'
import { NAV_PHASES } from '../theory/automata/dfa'
import { ALGO_META } from '../theory/graph/cs-graph'
import type { AlgoId } from '../theory/types'

const ALGOS: AlgoId[] = ['dijkstra', 'astar', 'bfs']

export const AlgoSwitcher = memo(function AlgoSwitcher() {
  const algo = useLab((s) => s.algo)
  const phase = useLab((s) => s.phase)
  const setAlgo = useLab((s) => s.setAlgo)
  const busy = phase !== 'idle'

  return (
    <div className="algo-switcher" role="group" aria-label="Algoritmo">
      {ALGOS.map((a) => (
        <button
          key={a}
          type="button"
          disabled={busy}
          onClick={() => setAlgo(a)}
          title={ALGO_META[a].desc}
          aria-pressed={algo === a}
          className="algo-switcher__btn"
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
    <div className="automata-panel">
      <Cell title="DFA" sub="fases da navegação">
        <div className="automata-panel__row">
          {NAV_PHASES.map((p) => (
            <span key={p} className={p === dfa.state ? 'lab-chip lab-chip--on' : 'lab-chip'}>
              {p}
            </span>
          ))}
        </div>
      </Cell>

      <Cell title="PDA" sub={`stack · ${pda.state}`}>
        <div className="automata-panel__stack">
          {pda.stack.length === 0 ? (
            <span className="lab-empty">ε</span>
          ) : (
            pda.stack.map((s, i) => (
              // degraus: cada símbolo empilhado fica um pouco mais alto
              <span key={i} className="automata-panel__stack-cell" style={{ marginBottom: i * 2 }}>
                {s}
              </span>
            ))
          )}
        </div>
      </Cell>

      <Cell title="TM" sub={`fita · ${tm.state}`}>
        <div className="automata-panel__tape">
          {tm.tape.map((c, i) => (
            <span
              key={i}
              className={i === tm.head ? 'automata-panel__tape-cell automata-panel__tape-cell--head' : 'automata-panel__tape-cell'}
            >
              {c}
            </span>
          ))}
        </div>
      </Cell>
    </div>
  )
})

function Cell({ title, sub, children }: Readonly<{ title: string; sub: string; children: ReactNode }>) {
  return (
    <div className="lab-box">
      <p className="lab-box__title">{title}</p>
      <p className="lab-label">{sub}</p>
      <div className="lab-box__body">{children}</div>
    </div>
  )
}
