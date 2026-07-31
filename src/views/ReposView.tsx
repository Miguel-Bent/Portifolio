import { ViewFrame } from '../ui/ViewFrame'
import { projects } from '../content/data'

export function ReposView() {
  return (
    <ViewFrame id="repos" title="Repos" subtitle="Experimentos, builds e provas de conceito.">
      <div className="grid-2">
        {projects.map((p, i) => (
          <article key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className="card__tag">repo {String(i + 1).padStart(2, '0')}</p>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  padding: '0.2rem 0.5rem',
                  border: '1px solid var(--accent)',
                  borderRadius: '4px',
                }}
              >
                {p.status}
              </span>
            </div>
            <h2 className="card__title" style={{ fontSize: '1.4rem' }}>
              {p.name}
            </h2>
            <p style={{ marginTop: '0.5rem', flex: 1 }}>{p.desc}</p>
            <p
              style={{
                marginTop: '1rem',
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
              }}
            >
              {p.tags.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </ViewFrame>
  )
}
