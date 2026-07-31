import { useLab } from '../store/lab-store'
import { ViewFrame } from '../ui/ViewFrame'

export function AutomataView() {
  const goto = useLab((s) => s.goto)

  return (
    <ViewFrame
      id="automata"
      title="Autômatos"
      subtitle="DFA, PDA e máquina de Turing — modelos formais que governam a navegação deste site."
    >
      <p>
        Cada transição entre módulos passa por um FSM de navegação. O PDA empilha símbolos do
        caminho e a TM reescreve a fita durante o boot.
      </p>

      <div className="grid-3">
        {[
          { sym: 'DFA', label: 'Finite State', desc: 'Fases idle → scan → run → walk → render' },
          { sym: 'PDA', label: 'Pushdown', desc: 'Stack LIFO com símbolos dos nós visitados' },
          { sym: 'TM', label: 'Turing', desc: 'Fita bidirecional com cabeça de leitura' },
        ].map((m) => (
          <div key={m.sym} className="card">
            <p className="card__tag">{m.sym}</p>
            <p className="card__title">{m.label}</p>
            <p style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
        <button type="button" onClick={() => goto('algo')} className="btn btn--accent">
          Algoritmos →
        </button>
        <button type="button" onClick={() => goto('graphs')} className="btn btn--ghost">
          Grafos
        </button>
      </div>
    </ViewFrame>
  )
}
