import { memo } from 'react'
import { NODE_ORDER, CS_GRAPH } from '../theory/graph/cs-graph'
import { useLab } from '../store/lab-store'

export const NodeRail = memo(function NodeRail() {
  const node = useLab((s) => s.node)
  const phase = useLab((s) => s.phase)
  const goto = useLab((s) => s.goto)
  const busy = phase !== 'idle'

  return (
    <nav className="flex flex-wrap justify-center gap-1.5" aria-label="Módulos">
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
            className={[
              'rounded-md border px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition',
              active
                ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--green)]/30',
              busy && !active ? 'opacity-35' : '',
            ].join(' ')}
          >
            <span className="mr-1 opacity-60">{v.symbol}</span>
            {v.label}
          </button>
        )
      })}
    </nav>
  )
})
