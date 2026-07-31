import { ViewFrame } from '../ui/ViewFrame'
import { ALGO_META } from '../theory/graph/cs-graph'

const ALGOS = [
  {
    id: 'dijkstra' as const,
    icon: '◆',
    highlight: 'Custo mínimo garantido com pesos não-negativos.',
  },
  {
    id: 'astar' as const,
    icon: '◇',
    highlight: 'Heurística h(n) = |depth(n) − depth(goal)| guia a busca.',
  },
  {
    id: 'bfs' as const,
    icon: '○',
    highlight: 'Menor número de arestas — ignora pesos, percorre por camadas.',
  },
]

export function GraphsView() {
  return (
    <ViewFrame
      id="graphs"
      title="Grafos"
      subtitle="Onze vértices, arestas ponderadas com atalhos, três algoritmos no mesmo grafo."
    >
      <div className="grid-3">
        {ALGOS.map((a) => {
          const meta = ALGO_META[a.id]
          return (
            <article key={a.id} className="card">
              <p className="card__tag">
                {a.icon} {meta.name}
              </p>
              <p className="card__title">{meta.complexity}</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{a.highlight}</p>
              <p
                style={{
                  marginTop: '0.75rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                }}
              >
                {meta.desc}
              </p>
            </article>
          )
        })}
      </div>

      <div className="card" style={{ marginTop: '0.5rem' }}>
        <p className="card__tag">automata trinity</p>
        <div className="grid-3" style={{ marginTop: '1rem' }}>
          {[
            { name: 'DFA', desc: 'Controla fases: idle → scan → run → walk → render → done' },
            { name: 'PDA', desc: 'Empilha símbolos do caminho — demonstra LIFO em tempo real' },
            { name: 'TM', desc: 'Fita de módulos com cabeça móvel — visível na barra inferior' },
          ].map((a) => (
            <div key={a.name}>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                }}
              >
                {a.name}
              </p>
              <p style={{ marginTop: '0.35rem', fontSize: '0.85rem' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ViewFrame>
  )
}
