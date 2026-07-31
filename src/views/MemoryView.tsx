import { useLab } from '../store/lab-store'
import { ViewFrame } from '../ui/ViewFrame'

const STRUCTURES = [
  { sym: '⌈⌉', label: 'Min-Heap', desc: 'Fila de prioridade para Dijkstra e A*' },
  { sym: '[]', label: 'Stack', desc: 'LIFO — PDA e DFS iterativo' },
  { sym: '⟨⟩', label: 'Queue', desc: 'FIFO — BFS por camadas' },
  { sym: '{}', label: 'Hash Set', desc: 'Visited / frontier em O(1)' },
]

export function MemoryView() {
  const goto = useLab((s) => s.goto)

  return (
    <ViewFrame
      id="memory"
      title="Memory"
      subtitle="Estruturas de dados que suportam os algoritmos de pathfinding."
    >
      <p>
        Cada algoritmo escolhe estruturas diferentes para a fronteira de exploração — o CS Lab
        expõe heap, stack e queue em tempo real.
      </p>

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
        <button type="button" onClick={() => goto('proof')} className="btn btn--accent">
          Proof →
        </button>
        <button type="button" onClick={() => goto('structures')} className="btn btn--ghost">
          Structures
        </button>
      </div>
    </ViewFrame>
  )
}
