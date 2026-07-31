import { useLab } from '../store/lab-store'
import { ModuleNote } from '../ui/ModuleNote'
import { ViewFrame } from '../ui/ViewFrame'

const STRUCTURES = [
  {
    sym: '⌈⌉',
    label: 'Min-Heap',
    desc: 'Fronteira do Dijkstra/A* no pathfinding — o próximo nó é sempre o de menor custo acumulado.',
  },
  {
    sym: '[]',
    label: 'Stack (PDA)',
    desc: 'Caminho calculado empilhado em run; desempilha em walk — vês símbolo a símbolo na animação.',
  },
  {
    sym: '⟨⟩',
    label: 'Queue (BFS)',
    desc: 'FIFO na fronteira quando BFS está activo — visita por camadas, não por custo.',
  },
  {
    sym: '{}',
    label: 'Visited set',
    desc: 'Hash set evita reexpandir o mesmo vértice — frontier e visited aparecem no CS Lab durante scan→run.',
  },
]

export function MemoryView() {
  const goto = useLab((s) => s.goto)
  const toggle = useLab((s) => s.toggleLab)

  return (
    <ViewFrame
      id="memory"
      title="Memory"
      subtitle="As estruturas não estão no slide — estão expostas enquanto navegas."
    >
      <ModuleNote
        decision="Ligo cada algoritmo à estrutura que usa na prática: heap para Dijkstra/A*, fila para BFS, stack no PDA para animar o caminho. Não é diagrama estático — frontier, visited e stack actualizam em tempo real durante goto()."
        tryIt="Abre o CS Lab e navega para Trace: durante run, observa frontier e visited a encher; em walk, a stack do PDA encolhe enquanto a TM avança. As métricas finais mostram stack ops e expansions."
      />

      <div className="grid-3">
        {STRUCTURES.map((s) => (
          <div key={s.label} className="card">
            <p className="card__tag">{s.sym}</p>
            <p className="card__title">{s.label}</p>
            <p style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
        <button type="button" onClick={toggle} className="btn btn--accent">
          Abrir CS Lab
        </button>
        <button type="button" onClick={() => goto('proof')} className="btn btn--ghost">
          Proof →
        </button>
      </div>
    </ViewFrame>
  )
}
