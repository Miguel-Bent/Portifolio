import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

export function ProofView() {
  return (
    <ViewFrame id="proof" title="Proof" subtitle="Experiência, formação e impacto.">
      {profile.education.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <p className="card__tag">education</p>
          {profile.education.map((edu) => (
            <article key={`${edu.school}-${edu.when}`} className="timeline-item">
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}
              >
                {edu.when}
              </p>
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginTop: '0.35rem',
                    color: 'var(--text)',
                  }}
                >
                  {edu.degree}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{edu.school}</p>
                {edu.text && <p style={{ marginTop: '0.75rem' }}>{edu.text}</p>}
              </div>
            </article>
          ))}
        </section>
      )}

      <div>
        {profile.experience.map((e, i) => (
          <article key={`${e.role}-${e.org}`} className="timeline-item">
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
              }}
            >
              {e.when}
            </p>
            <div>
              <p className="card__tag">record {String(i + 1).padStart(2, '0')}</p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginTop: '0.35rem',
                  color: 'var(--text)',
                }}
              >
                {e.role}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{e.org}</p>
              <p style={{ marginTop: '0.75rem' }}>{e.text}</p>
            </div>
          </article>
        ))}
      </div>
    </ViewFrame>
  )
}
