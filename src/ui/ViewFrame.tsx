import { memo, type ReactNode } from 'react'
import { CS_GRAPH } from '../theory/graph/cs-graph'
import type { NodeId } from '../theory/types'

const INDEX: Record<NodeId, string> = {
  init: '00',
  graphs: '01',
  trace: '02',
  repos: '03',
  structures: '04',
  proof: '05',
  io: '06',
}

export const ViewFrame = memo(function ViewFrame({
  id,
  title,
  subtitle,
  children,
  hero,
}: {
  id: NodeId
  title: string
  subtitle?: string
  children: ReactNode
  hero?: boolean
}) {
  const v = CS_GRAPH.vertices[id]

  return (
    <article className="view">
      <header>
        <p className="view__eyebrow">
          {INDEX[id]} · depth {v.depth}
        </p>
        <h1
          className="view__title"
          style={hero ? { fontSize: 'clamp(3rem, 9vw, 5.5rem)' } : undefined}
        >
          {title}
        </h1>
        {subtitle && <p className="view__subtitle">{subtitle}</p>}
      </header>
      <div className="view__body">{children}</div>
    </article>
  )
})
