import { profile } from '../content/profile'
import { FeaturedBadge } from '../ui/FeaturedBadge'
import { ViewFrame } from '../ui/ViewFrame'

export function TraceView() {
  return (
    <ViewFrame id="trace" title="Trace" subtitle="Percurso real — formação, projetos e marcos até ao TheoryLab.">
      <div>
        {profile.timeline.map((t, i) => (
          <article
            key={`${t.yr}-${t.title}`}
            className={['timeline-item', t.featured ? 'timeline-item--featured' : ''].filter(Boolean).join(' ')}
          >
            <p className="timeline-item__year">{t.yr}</p>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: t.featured ? 'var(--gold-bright)' : 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  entry {String(i + 1).padStart(2, '0')}
                </p>
                {t.featured && <FeaturedBadge label={t.award ?? 'Vencedor'} />}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginTop: '0.35rem',
                  color: t.featured ? 'var(--gold-bright)' : 'var(--text)',
                }}
              >
                {t.featured && (
                  <span className="featured-badge__crown" style={{ marginRight: '0.35rem' }} aria-hidden>
                    👑
                  </span>
                )}
                {t.title}
              </h2>
              <p style={{ marginTop: '0.5rem' }}>{t.text}</p>
            </div>
          </article>
        ))}
      </div>
    </ViewFrame>
  )
}
