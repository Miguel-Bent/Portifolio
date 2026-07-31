import { useLab } from '../store/lab-store'
import { AlgoSwitcher } from '../ui/AutomataPanel'
import { ModuleNote } from '../ui/ModuleNote'
import { ALGO_META } from '../theory/graph/cs-graph'
import { ViewFrame } from '../ui/ViewFrame'

export function AlgoView() {
  const goto = useLab((s) => s.goto)
  const toggle = useLab((s) => s.toggleLab)
  const algo = useLab((s) => s.algo)

  return (
    <ViewFrame
      id="algo"
      title="Algoritmos"
      subtitle="Três pathfinders no mesmo grafo — a escolha muda o caminho, não só a cor da linha."
    >
      <ModuleNote
        decision="Correr Dijkstra, A* e BFS sobre o mesmo CS_GRAPH permite comparar trade-offs reais: custo total vs. número de saltos vs. nós explorados. Não é demo isolada — é a mesma função goto() que alimenta o painel lateral e o scroll."
        tryIt="Muda o algoritmo abaixo, depois navega duas vezes para o mesmo destino (ex.: Repos). No CS Lab, compara path, custo, expansões e tempo no log — o BFS frequentemente escolhe menos vértices, o Dijkstra um custo menor."
      />

      <div className="card" style={{ padding: '1.5rem' }}>
        <p className="card__tag">activo · {ALGO_META[algo].name}</p>
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
        <button type="button" onClick={toggle} className="btn btn--accent">
          Ver expansões no CS Lab
        </button>
        <button type="button" onClick={() => goto('complexity')} className="btn btn--ghost">
          Complexidade →
        </button>
      </div>
    </ViewFrame>
  )
}
