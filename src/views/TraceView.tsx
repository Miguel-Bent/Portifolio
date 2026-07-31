import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

export function TraceView() {
  return (
    <ViewFrame id="trace" title="Trace" subtitle="Percurso de aprendizagem em iterações.">
      <div>
        {profile.timeline.map((t, i) => (
          <article key={t.yr} className="timeline-item">
            <p className="timeline-item__year">{t.yr}</p>
            <div>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                entry {String(i + 1).padStart(2, '0')}
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginTop: '0.35rem',
                  color: 'var(--text)',
                }}
              >
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
