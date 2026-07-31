import { useLab } from '../store/lab-store'
import { ModuleNote } from '../ui/ModuleNote'
import { ViewFrame } from '../ui/ViewFrame'

export function AutomataView() {
  const goto = useLab((s) => s.goto)
  const toggle = useLab((s) => s.toggleLab)

  return (
    <ViewFrame
      id="automata"
      title="Autômatos"
      subtitle="Não é aula de teoria — é o motor que impede a navegação de partir ao meio."
    >
      <ModuleNote
        decision="Modelo cada salto entre secções com um DFA (idle → scan → run → walk → render → done). Enquanto uma transição corre, novos cliques são rejeitados — a animação, o pathfinding e o scroll nunca ficam em estados inválidos ao mesmo tempo."
        tryIt="Clica um nó no grafo à direita: vês a fase activa avançar, o PDA empilhar o caminho calculado e a TM mover a cabeça célula a célula. Abre o CS Lab para o log completo. Na intro, o boot usa os três modelos para escrever o nome antes de entrares no site."
      />

      <div className="grid-3">
        {[
          {
            sym: 'DFA',
            label: 'Fases de navegação',
            desc: 'Só permite transições válidas — scan antes de run, walk antes de render. busy = true bloqueia pedidos duplicados.',
          },
          {
            sym: 'PDA',
            label: 'Caminho empilhado',
            desc: 'Depois do pathfinding, o caminho vai para a stack e desempilha durante a animação — LIFO ligado ao que vês no ecrã.',
          },
          {
            sym: 'TM',
            label: 'Posição no grafo',
            desc: 'A cabeça segue o módulo actual e percorre a fita durante walk — boot escreve letra a letra na intro.',
          },
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
        <button type="button" onClick={toggle} className="btn btn--accent">
          Abrir CS Lab
        </button>
        <button type="button" onClick={() => goto('graphs')} className="btn btn--ghost">
          Grafos →
        </button>
      </div>
    </ViewFrame>
  )
}
