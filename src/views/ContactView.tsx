import { useLab } from '../store/lab-store'
import { profile } from '../content/profile'
import { toHref } from '../content/links'
import { ViewFrame } from '../ui/ViewFrame'

interface Channel {
  label: string
  value: string
  href?: string
  external?: boolean
}

export function ContactView() {
  const goto = useLab((s) => s.goto)
  const { links } = profile

  const channels: Channel[] = [
    { label: 'email', value: links.email, href: `mailto:${links.email}` },
    ...(links.phone ? [{ label: 'telefone', value: links.phone, href: `tel:${links.phone.replace(/\s/g, '')}` }] : []),
    { label: 'github', value: links.github, href: toHref(links.github), external: true },
    { label: 'linkedin', value: links.linkedin, href: toHref(links.linkedin), external: true },
    { label: 'localização', value: links.location },
  ]

  return (
    <ViewFrame id="io" title="Contacto" subtitle="Onde me encontrar.">
      <p>{profile.contactMessage}</p>

      <div className="grid-2">
        {channels.map((c) => (
          <div key={c.label} className="card">
            <p className="card__tag">{c.label}</p>
            {c.href ? (
              <a
                href={c.href}
                className="contact-value"
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {c.value}
              </a>
            ) : (
              <p className="contact-value">{c.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="actions">
        <a href={`mailto:${links.email}`} className="btn btn--accent">
          Enviar email
        </a>
        <button type="button" onClick={() => goto('init')} className="btn btn--ghost">
          Voltar ao início
        </button>
      </div>
    </ViewFrame>
  )
}
