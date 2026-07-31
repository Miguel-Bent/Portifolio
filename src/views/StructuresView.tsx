import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

export function StructuresView() {
  return (
    <ViewFrame
      id="structures"
      title="Structures"
      subtitle="Competências técnicas do CV (Dez 2024) + stack dos projetos em produção."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {profile.skills.map((s) => (
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

      <div className="grid-2" style={{ marginTop: '2rem' }}>
        <div className="card">
          <p className="card__tag">idiomas</p>
          <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.1rem', color: 'var(--text-soft)' }}>
            {profile.languages.map((lang) => (
              <li key={lang.name} style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--text)' }}>{lang.name}</strong> — {lang.level}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <p className="card__tag">soft skills</p>
          <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.1rem', color: 'var(--text-soft)' }}>
            {profile.softSkills.map((skill) => (
              <li key={skill} style={{ marginBottom: '0.35rem' }}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ViewFrame>
  )
}
