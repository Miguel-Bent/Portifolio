import { useLab } from '../store/lab-store'
import { AlgoSwitcher } from '../ui/AutomataPanel'
import { ALGO_META } from '../theory/graph/cs-graph'
import { ViewFrame } from '../ui/ViewFrame'

export function AlgoView() {
  const goto = useLab((s) => s.goto)
  const algo = useLab((s) => s.algo)

  return (
    <ViewFrame
      id="algo"
      title="Algoritmos"
      subtitle="Arena de pathfinding — Dijkstra, A* e BFS no mesmo grafo ponderado."
    >
      <div className="card" style={{ padding: '1.5rem' }}>
        <p className="card__tag">active · {ALGO_META[algo].name}</p>
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
          {ALGO_META[algo].desc}
        </p>
        <p
          style={{
            marginTop: '0.5rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
          }}
        >
          {ALGO_META[algo].complexity}
        </p>
        <div style={{ marginTop: '1rem' }}>
          <AlgoSwitcher />
        </div>
      </div>

      <p>
        Com 11 vértices e múltiplos atalhos, o algoritmo activo escolhe caminhos distintos para o
        mesmo destino — compara expansões no CS Lab.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button type="button" onClick={() => goto('trace')} className="btn btn--accent">
          Trace →
        </button>
        <button type="button" onClick={() => goto('complexity')} className="btn btn--ghost">
          Complexidade
        </button>
      </div>
    </ViewFrame>
  )
}
