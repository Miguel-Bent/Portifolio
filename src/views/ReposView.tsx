import { profile } from '../content/profile'
import { FeaturedBadge } from '../ui/FeaturedBadge'
import { ViewFrame } from '../ui/ViewFrame'

function projectHref(p: (typeof profile.projects)[number]) {
  if (p.url) return p.url.startsWith('http') ? p.url : `https://${p.url}`
  if (p.repo) return p.repo.startsWith('http') ? p.repo : `https://${p.repo}`
  return undefined
}

function monogram(name: string) {
  const initials = name
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (initials || name.slice(0, 2)).toUpperCase()
}

function ProjectShot({
  project: p,
  href,
}: Readonly<{
  project: (typeof profile.projects)[number]
  href?: string
}>) {
  const address = (p.url ?? p.repo ?? 'localhost:5173').replace(/^https?:\/\//, '')

  const viewport = p.image ? (
    <img
      src={p.image}
      alt={p.imageAlt ?? `Captura de ${p.name}`}
      className="repo-card__img"
      width={1349}
      height={643}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span className="repo-card__mono" aria-hidden>
      {monogram(p.name)}
    </span>
  )

  const viewportClass = [
    'repo-card__viewport',
    p.image ? '' : 'repo-card__viewport--empty',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="repo-card__media">
      <div className="repo-card__window">
        <div className="repo-card__chrome">
          <span className="repo-card__dots" aria-hidden>
            <i className="repo-card__dot" />
            <i className="repo-card__dot" />
            <i className="repo-card__dot" />
          </span>
          <span className="repo-card__addr">{address}</span>
        </div>
        {href && p.image ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={viewportClass}
            aria-label={`Abrir ${p.name}`}
          >
            {viewport}
          </a>
        ) : (
          <div className={viewportClass}>{viewport}</div>
        )}
      </div>
    </div>
  )
}

export function ReposView() {
  const projects = [...profile.projects].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <ViewFrame
      id="repos"
      title="Repos"
      subtitle="Projetos reais — builds, deploys e iterações do portfólio."
    >
      <div className="grid-2">
        {projects.map((p, i) => {
          const href = projectHref(p)
          return (
            <article
              key={p.id}
              className={['card repo-card', p.featured ? 'card--featured' : ''].filter(Boolean).join(' ')}
            >
              <ProjectShot project={p} href={href} />

              <div className="repo-card__body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="card__tag">repo {String(i + 1).padStart(2, '0')}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {p.featured && <FeaturedBadge label={p.award ?? 'Vencedor'} />}
                    <span
                      className={['status-badge--live', p.featured ? 'status-badge--featured' : '']
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                <h2
                  className="card__title"
                  style={{
                    fontSize: '1.4rem',
                    color: p.featured ? 'var(--gold-bright)' : undefined,
                  }}
                >
                  {p.featured && (
                    <span className="featured-badge__crown" style={{ marginRight: '0.35rem' }} aria-hidden>
                      👑
                    </span>
                  )}
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
                </h2>
                <p style={{ marginTop: '0.5rem', flex: 1 }}>{p.desc}</p>
                {p.technical && (
                  <p
                    style={{
                      marginTop: '0.75rem',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-soft)',
                      lineHeight: 1.55,
                    }}
                  >
                    {p.technical}
                  </p>
                )}
                {(p.url || p.repo) && (
                  <p
                    style={{
                      marginTop: '0.75rem',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.6rem',
                      color: 'var(--text-soft)',
                    }}
                  >
                    {p.url && (
                      <a
                        href={p.url.startsWith('http') ? p.url : `https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: p.featured ? 'var(--gold-bright)' : 'var(--accent)',
                          textDecoration: 'none',
                        }}
                      >
                        {p.url.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    {p.url && p.repo && ' · '}
                    {p.repo && (
                      <a
                        href={p.repo.startsWith('http') ? p.repo : `https://${p.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                      >
                        {p.repo.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </p>
                )}
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
              </div>
            </article>
          )
        })}
      </div>
    </ViewFrame>
  )
}
