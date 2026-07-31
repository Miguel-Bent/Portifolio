import { ViewFrame } from '../ui/ViewFrame'
import { skills } from '../content/data'

export function StructuresView() {
  return (
    <ViewFrame id="structures" title="Structures" subtitle="Mapa de competências técnicas ligadas por contexto.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {skills.map((s) => (
          <div
            key={s.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: '1px solid var(--border-soft)',
            }}
          >
            <div>
              <p style={{ fontWeight: 500, color: 'var(--text)' }}>{s.name}</p>
              <p
                style={{
                  marginTop: '0.25rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  color: 'var(--text-muted)',
                }}
              >
                {s.links.join(' → ')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '8rem' }}>
              <div className="skill-bar" style={{ flex: 1, width: '5rem' }}>
                <div className="skill-bar__fill" style={{ width: `${(s.lvl / 5) * 100}%` }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                }}
              >
                {s.lvl}/5
              </span>
            </div>
          </div>
        ))}
      </div>
    </ViewFrame>
  )
}
