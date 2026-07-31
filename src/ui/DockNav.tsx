import { memo } from 'react'
import { NODE_ORDER, CS_GRAPH } from '../theory/graph/cs-graph'
import { useLab } from '../store/lab-store'

export const DockNav = memo(function DockNav() {
  const node = useLab((s) => s.node)
  const phase = useLab((s) => s.phase)
  const booting = useLab((s) => s.booting)
  const goto = useLab((s) => s.goto)
  const busy = phase !== 'idle' || booting

  return (
    <nav className="dock" aria-label="Navegação por módulos">
      {NODE_ORDER.map((id) => {
        const v = CS_GRAPH.vertices[id]
        const active = id === node
        return (
          <button
            key={id}
            type="button"
            disabled={busy && !active}
            onClick={() => goto(id)}
            aria-current={active ? 'page' : undefined}
            title={v.label}
            className={['dock__btn', active ? 'dock__btn--active' : ''].join(' ')}
          >
            <span className="dock__symbol">{v.symbol}</span>
            <span className="dock__label">{v.label}</span>
          </button>
        )
      })}
    </nav>
  )
})
