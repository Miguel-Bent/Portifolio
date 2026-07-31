import { profile } from '../content/profile'
import { FeaturedBadge } from '../ui/FeaturedBadge'
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
          <article
            key={`${e.role}-${e.org}`}
            className={['timeline-item', e.featured ? 'timeline-item--featured' : ''].filter(Boolean).join(' ')}
          >
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: e.featured ? 'var(--gold-bright)' : 'var(--text-muted)',
              }}
            >
              {e.when}
            </p>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <p className="card__tag">record {String(i + 1).padStart(2, '0')}</p>
                {e.featured && <FeaturedBadge label={e.award ?? 'Vencedor'} />}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginTop: '0.35rem',
                  color: e.featured ? 'var(--gold-bright)' : 'var(--text)',
                }}
              >
                {e.featured && (
                  <span className="featured-badge__crown" style={{ marginRight: '0.35rem' }} aria-hidden>
                    👑
                  </span>
                )}
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
