import { useLab } from '../store/lab-store'
import { profile } from '../content/profile'
import { FeaturedBadge } from '../ui/FeaturedBadge'
import { ViewFrame } from '../ui/ViewFrame'

function projectHref(p: (typeof profile.projects)[number]) {
  if (p.url) return p.url.startsWith('http') ? p.url : `https://${p.url}`
  return undefined
}

export function ProofView() {
  const goto = useLab((s) => s.goto)
  const live = profile.projects.filter((p) => p.status === 'live')
  const featured = profile.projects.find((p) => p.featured)

  return (
    <ViewFrame id="proof" title="Proof" subtitle="Código em produção — não credenciais, resultados.">
      {featured && (
        <article className="card card--featured" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <p className="card__tag">destaque</p>
            <FeaturedBadge label={featured.award ?? 'Vencedor'} />
          </div>
          <h2
            className="card__title"
            style={{ fontSize: '1.5rem', color: 'var(--gold-bright)', marginTop: '0.5rem' }}
          >
            <span className="featured-badge__crown" style={{ marginRight: '0.35rem' }} aria-hidden>
              👑
            </span>
            {featured.name}
          </h2>
          <p style={{ marginTop: '0.75rem' }}>{featured.desc}</p>
          {featured.technical && (
            <p
              style={{
                marginTop: '0.75rem',
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                color: 'var(--text-soft)',
                lineHeight: 1.6,
              }}
            >
              {featured.technical}
            </p>
          )}
          {projectHref(featured) && (
            <a
              href={projectHref(featured)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              style={{ marginTop: '1.25rem', display: 'inline-flex' }}
            >
              Ver demo ↗
            </a>
          )}
        </article>
      )}

      <section>
        <p className="card__tag">em produção</p>
        <p style={{ marginTop: '0.75rem', color: 'var(--text-soft)' }}>
          {live.length} projetos deployados — stack real, utilizadores reais ou clientes com site no ar.
        </p>
        <ul style={{ margin: '1.25rem 0 0', padding: 0, listStyle: 'none' }}>
          {live.map((p) => {
            const href = projectHref(p)
            return (
              <li
                key={p.id}
                style={{
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-soft)',
                }}
              >
                <p style={{ fontWeight: 500, color: 'var(--text)' }}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {p.name} ↗
                    </a>
                  ) : (
                    p.name
                  )}
                </p>
                <p style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {p.tags.join(' · ')}
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
        <button type="button" onClick={() => goto('repos')} className="btn btn--accent">
          Ver todos os projetos
        </button>
        <button type="button" onClick={() => goto('trace')} className="btn btn--ghost">
          Trace →
        </button>
      </div>
    </ViewFrame>
  )
}
