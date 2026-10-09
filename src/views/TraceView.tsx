import { profile } from '../content/profile'
import { FeaturedBadge } from '../ui/FeaturedBadge'
import { ViewFrame } from '../ui/ViewFrame'

export function TraceView() {
  return (
    <ViewFrame id="trace" title="Percurso" subtitle="Estágios e lançamentos, por ordem cronológica.">
      <div>
        {profile.timeline.map((t) => (
          <article
            key={`${t.yr}-${t.title}`}
            className={t.featured ? 'timeline-item timeline-item--featured' : 'timeline-item'}
          >
            <p className="timeline-item__year">{t.yr}</p>
            <div>
              {t.featured && <FeaturedBadge label={t.award ?? 'Vencedor'} />}
              <h2 className="timeline-item__title">{t.title}</h2>
              <p className="timeline-item__text">{t.text}</p>
            </div>
          </article>
        ))}
      </div>
    </ViewFrame>
  )
}
