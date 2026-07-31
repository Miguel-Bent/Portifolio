import { useLab } from '../store/lab-store'
import { ModuleNote } from '../ui/ModuleNote'
import { ViewFrame } from '../ui/ViewFrame'

const TRADEOFFS = [
  {
    sym: 'BFS',
    label: 'O(V + E)',
    desc: 'Fila FIFO — explora por camadas. Neste site: caminho com menos cliques, mesmo que o custo ponderado seja maior.',
  },
  {
    sym: 'Dijkstra / A*',
    label: 'O((V + E) log V)',
    desc: 'Min-heap na fronteira — paga log V por inserção para garantir (ou aproximar) o custo mínimo com pesos.',
  },
  {
    sym: 'PDA walk',
    label: 'O(k)',
    desc: 'k = comprimento do caminho — cada passo da animação desempilha um símbolo; stack ops aparecem nas métricas.',
  },
]

export function ComplexityView() {
  const goto = useLab((s) => s.goto)
  const toggle = useLab((s) => s.toggleLab)

  return (
    <ViewFrame
      id="complexity"
      title="Complexidade"
      subtitle="O que custa cada salto — medido no grafo real, não num slide."
    >
      <ModuleNote
        decision="Os pesos das arestas não são decoração: atalhos existem mas custam mais, forçando escolhas entre rota curta em número de vértices e custo total. Com 11 nós o tempo em ms é irrelevante — o que importa é ver como a estrutura de dados muda o comportamento."
        tryIt="Faz o mesmo salto (ex.: init → repos) com BFS e depois com Dijkstra no CS Lab. Compara expansions e cost no painel de métricas — a diferença é visível mesmo num grafo pequeno."
      />

      <div className="grid-3">
        {TRADEOFFS.map((c) => (
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
        <button type="button" onClick={toggle} className="btn btn--accent">
          Medir no CS Lab
        </button>
        <button type="button" onClick={() => goto('memory')} className="btn btn--ghost">
          Memória →
        </button>
      </div>
    </ViewFrame>
  )
}
