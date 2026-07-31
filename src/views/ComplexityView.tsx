import { useLab } from '../store/lab-store'
import { ViewFrame } from '../ui/ViewFrame'

const CLASSES = [
  { sym: 'O(1)', label: 'Constante', desc: 'Lookup em tabela hash, push/pop na stack' },
  { sym: 'O(log n)', label: 'Logarítmico', desc: 'Heap, binary search, priority queue' },
  { sym: 'O(V+E)', label: 'Linear', desc: 'BFS, DFS — percorre todo o grafo' },
  { sym: 'O((V+E) log V)', label: 'Quase-linear', desc: 'Dijkstra e A* com heap binário' },
]

export function ComplexityView() {
  const goto = useLab((s) => s.goto)

  return (
    <ViewFrame
      id="complexity"
      title="Complexidade"
      subtitle="Classes assintóticas que medem o custo de cada operação no grafo."
    >
      <p>
        Cada aresta tem peso. Atalhos existem mas custam mais — forçando trade-offs entre
        caminho curto em arestas vs. custo total.
      </p>

      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>
        {CLASSES.map((c) => (
          <div key={c.sym} className="card">
            <p className="card__tag">{c.sym}</p>
            <p className="card__title">{c.label}</p>
            <p style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
        <button type="button" onClick={() => goto('memory')} className="btn btn--accent">
          Memória →
        </button>
        <button type="button" onClick={() => goto('proof')} className="btn btn--ghost">
          Proof
        </button>
      </div>
    </ViewFrame>
  )
}
