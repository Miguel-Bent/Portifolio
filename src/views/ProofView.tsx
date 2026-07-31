import { ViewFrame } from '../ui/ViewFrame'
import { experience } from '../content/data'

export function ProofView() {
  return (
    <ViewFrame id="proof" title="Proof" subtitle="Experiência, contexto e impacto.">
      <div>
        {experience.map((e, i) => (
          <article key={e.role} className="timeline-item">
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
