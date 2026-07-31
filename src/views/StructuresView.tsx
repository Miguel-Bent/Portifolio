import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

export function StructuresView() {
  return (
    <ViewFrame
      id="structures"
      title="Structures"
      subtitle="Tecnologias que aparecem nos projetos — sem auto-avaliação, a prova está nos repos."
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {profile.skills.map((s) => (
          <span
            key={s.id}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-soft)',
              color: 'var(--text-soft)',
              background: 'var(--surface)',
            }}
          >
            {s.name}
          </span>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <p className="card__tag">idiomas</p>
        <p style={{ marginTop: '0.75rem', color: 'var(--text-soft)' }}>
          {profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(' · ')}
        </p>
      </div>
    </ViewFrame>
  )
}
