import { useLab } from '../store/lab-store'
import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'
import { AlgoSwitcher } from '../ui/AutomataPanel'
import { ALGO_META } from '../theory/graph/cs-graph'

export function HomeView() {
  const goto = useLab((s) => s.goto)
  const toggle = useLab((s) => s.toggleLab)
  const algo = useLab((s) => s.algo)

  return (
    <ViewFrame
      id="init"
      title={profile.siteName}
      subtitle={`${profile.headline} — grafos, autômatos e pathfinding em tempo real.`}
    >
      <p>{profile.bio}</p>

      <div className="card" style={{ padding: '1.5rem' }}>
        <p className="card__tag">algorithm arena</p>
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
          {ALGO_META[algo].desc}
        </p>
        <div style={{ marginTop: '1rem' }}>
          <AlgoSwitcher />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button type="button" onClick={() => goto('repos')} className="btn btn--accent">
          Ver projetos
        </button>
        <button type="button" onClick={toggle} className="btn btn--outline">
          Abrir CS Lab
        </button>
        <button type="button" onClick={() => goto('automata')} className="btn btn--ghost">
          Autômatos →
        </button>
      </div>

      <div className="grid-3" style={{ marginTop: '1rem' }}>
        {[
          { sym: 'G', label: 'Grafos', desc: '3 algoritmos comparáveis' },
          { sym: 'T', label: 'Trace', desc: profile.headline },
          { sym: 'Ω', label: 'I/O', desc: profile.links.location },
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
    </ViewFrame>
  )
}
