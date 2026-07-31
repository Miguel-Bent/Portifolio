import { useLab } from '../store/lab-store'
import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

function linkHref(value: string) {
  if (value.startsWith('http')) return value
  return `https://${value}`
}

export function ContactView() {
  const toggle = useLab((s) => s.toggleLab)
  const goto = useLab((s) => s.goto)
  const { links } = profile

  const channels = [
    { label: 'email', value: links.email, href: `mailto:${links.email}` },
    ...(links.phone
      ? [{ label: 'telefone', value: links.phone, href: `tel:${links.phone.replace(/\s/g, '')}` }]
      : []),
    { label: 'github', value: links.github, href: linkHref(links.github) },
    { label: 'linkedin', value: links.linkedin, href: linkHref(links.linkedin) },
    { label: 'localização', value: links.location },
  ]

  return (
    <ViewFrame id="io" title="I/O" subtitle="Entrada e saída — contacto, links e comandos.">
      <div className="grid-2">
        {channels.map((c) => (
          <div key={c.label} className="card">
            <p className="card__tag">{c.label}</p>
            {c.href ? (
              <a
                href={c.href}
                target={c.label !== 'email' && c.label !== 'telefone' ? '_blank' : undefined}
                rel={c.label !== 'email' && c.label !== 'telefone' ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                {c.value}
              </a>
            ) : (
              <p
                style={{
                  marginTop: '0.5rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                }}
              >
                {c.value}
              </p>
            )}
          </div>
        ))}
      </div>

      <p>{profile.contactMessage}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button type="button" onClick={toggle} className="btn btn--accent">
          Abrir CS Lab
        </button>
        <button type="button" onClick={() => goto('init')} className="btn btn--ghost">
          λ Voltar ao início
        </button>
      </div>
    </ViewFrame>
  )
}
