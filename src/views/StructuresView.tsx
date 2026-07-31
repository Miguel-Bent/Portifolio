import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

type Layer = { key: string; label: string; hint: string; ids: string[] }

const LAYERS: Layer[] = [
  {
    key: 'frontend',
    label: 'UI',
    hint: 'interface & client',
    ids: ['next', 'react', 'ts', 'js', 'tailwind', 'htmlcss', 'vite', 'pwa'],
  },
  {
    key: 'backend',
    label: 'API',
    hint: 'serviços & lógica',
    ids: ['nestjs', 'node', 'express', 'prisma', 'php', 'java'],
  },
  {
    key: 'data',
    label: 'DATA',
    hint: 'persistência & cms',
    ids: ['postgres', 'sql', 'strapi', 'wordpress'],
  },
  {
    key: 'infra',
    label: 'OPS',
    hint: 'deploy & suporte',
    ids: ['git', 'vercel', 'railway', 'networks', 'hardware'],
  },
  {
    key: 'design',
    label: 'UX',
    hint: 'protótipo',
    ids: ['figma', 'xd'],
  },
]

export function StructuresView() {
  const byId = new Map(profile.skills.map((s) => [s.id, s]))
  const used = new Set<string>()

  const layers = LAYERS.map((layer) => {
    const items = layer.ids
      .map((id) => byId.get(id))
      .filter((s): s is (typeof profile.skills)[number] => Boolean(s))
    items.forEach((s) => used.add(s.id))
    return { ...layer, items }
  }).filter((layer) => layer.items.length > 0)

  const leftover = profile.skills.filter((s) => !used.has(s.id))
  const allLayers = leftover.length
    ? [...layers, { key: 'more', label: '…', hint: 'outras', ids: [], items: leftover }]
    : layers

  return (
    <ViewFrame
      id="structures"
      title="Structures"
      subtitle="Camadas da stack — do browser ao deploy. Sem níveis, a prova está nos repos."
    >
      <div className="skills-stack" role="list">
        {allLayers.map((layer, i) => (
          <section key={layer.key} className="skills-layer" role="listitem">
            <div className="skills-layer__rail">
              <span className="skills-layer__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="skills-layer__code">{layer.label}</span>
              <span className="skills-layer__hint">{layer.hint}</span>
            </div>
            <div className="skills-layer__body">
              {layer.items.map((s) => (
                <span key={s.id} className="skills-token">
                  <span className="skills-token__hash" aria-hidden>
                    #
                  </span>
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ViewFrame>
  )
}
