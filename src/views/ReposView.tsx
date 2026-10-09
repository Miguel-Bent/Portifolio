import { profile } from '../content/profile'
import { stripProtocol, toHref } from '../content/links'
import type { ProjectEntry, ProjectStatus } from '../content/types'
import { FeaturedBadge } from '../ui/FeaturedBadge'
import { ViewFrame } from '../ui/ViewFrame'

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'no ar',
  wip: 'em desenvolvimento',
  archived: 'arquivado',
}

function projectHref(p: ProjectEntry) {
  const target = p.url ?? p.repo
  return target ? toHref(target) : undefined
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

function ProjectShot({ project: p, href }: Readonly<{ project: ProjectEntry; href?: string }>) {
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

  const viewportClass = p.image ? 'repo-card__viewport' : 'repo-card__viewport repo-card__viewport--empty'

  return (
    <div className="repo-card__media">
      <div className="repo-card__window">
        <div className="repo-card__chrome">
          <span className="repo-card__dots" aria-hidden>
            <i className="repo-card__dot" />
            <i className="repo-card__dot" />
            <i className="repo-card__dot" />
          </span>
          <span className="repo-card__addr">{stripProtocol(p.url ?? p.repo ?? 'localhost:5173')}</span>
        </div>
        {href && p.image ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={viewportClass} aria-label={`Abrir ${p.name}`}>
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
    <ViewFrame id="repos" title="Projetos" subtitle="Os projetos em que trabalhei, incluindo este portfólio.">
      <div className="grid-2">
        {projects.map((p) => {
          const href = projectHref(p)
          return (
            <article key={p.id} className={p.featured ? 'card repo-card card--featured' : 'card repo-card'}>
              <ProjectShot project={p} href={href} />

              <div className="repo-card__body">
                <div className="repo-card__badges">
                  <span className="status-badge--live">{STATUS_LABEL[p.status]}</span>
                  {p.featured && <FeaturedBadge label={p.award ?? 'Vencedor'} />}
                </div>

                <h2 className="card__title repo-card__name">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {p.name} ↗
                    </a>
                  ) : (
                    p.name
                  )}
                </h2>

                <p className="repo-card__desc">{p.desc}</p>
                {p.technical && <p className="repo-card__technical">{p.technical}</p>}

                {(p.url || p.repo) && (
                  <p className="repo-card__links">
                    {p.url && (
                      <a href={toHref(p.url)} target="_blank" rel="noopener noreferrer">
                        {stripProtocol(p.url)}
                      </a>
                    )}
                    {p.url && p.repo && ' · '}
                    {p.repo && (
                      <a href={toHref(p.repo)} target="_blank" rel="noopener noreferrer" className="repo-card__repo">
                        {stripProtocol(p.repo)}
                      </a>
                    )}
                  </p>
                )}

                <p className="repo-card__tags">{p.tags.join(' · ')}</p>
              </div>
            </article>
          )
        })}
      </div>
    </ViewFrame>
  )
}
