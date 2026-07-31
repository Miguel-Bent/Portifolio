import { useLab } from '../store/lab-store'
import { ModuleNote } from '../ui/ModuleNote'
import { ViewFrame } from '../ui/ViewFrame'
import { ALGO_META } from '../theory/graph/cs-graph'

const ALGOS = [
  {
    id: 'dijkstra' as const,
    icon: '◆',
    why: 'Custo mínimo garantido — escolho quando o peso das arestas importa (atalhos caros vs. rota longa).',
  },
  {
    id: 'astar' as const,
    icon: '◇',
    why: 'h(n) = |depth(n) − depth(goal)| corta expansões inúteis neste grafo em camadas, mantendo o óptimo.',
  },
  {
    id: 'bfs' as const,
    icon: '○',
    why: 'Menor número de saltos entre secções — ignora pesos, útil para comparar com Dijkstra no mesmo destino.',
  },
]

export function GraphsView() {
  const toggle = useLab((s) => s.toggleLab)

  return (
    <ViewFrame
      id="graphs"
      title="Grafos"
      subtitle="O mapa do portfólio é um grafo ponderado — não um menu estático."
    >
      <ModuleNote
        decision="Onze vértices, arestas com peso e atalhos dispendiosos (ex.: init → algo custa 5). As arestas só aparecem depois de as percorreres — revelação progressiva em vez de mostrar o labirinto inteiro no primeiro load."
        tryIt="Clica vértices no painel à direita: cada salto calcula rota, anima o caminho e revela novas arestas. O contador sobe até o mapa ficar completo. Abre o CS Lab para ver frontier e visited em tempo real."
      />

      <div className="grid-3">
        {ALGOS.map((a) => {
          const meta = ALGO_META[a.id]
          return (
            <article key={a.id} className="card">
              <p className="card__tag">
                {a.icon} {meta.name}
              </p>
              <p className="card__title">{meta.complexity}</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{a.why}</p>
            </article>
          )
        })}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={toggle} className="btn btn--outline">
          Comparar algoritmos no CS Lab
        </button>
      </div>
    </ViewFrame>
  )
}
