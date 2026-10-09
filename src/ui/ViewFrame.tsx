import { memo, type ReactNode } from 'react'
import { CS_GRAPH, NODE_ORDER } from '../theory/graph/cs-graph'
import type { NodeId } from '../theory/types'

const index = (id: NodeId) => String(NODE_ORDER.indexOf(id)).padStart(2, '0')

export const ViewFrame = memo(function ViewFrame({
  id,
  title,
  subtitle,
  children,
}: Readonly<{
  id: NodeId
  title: string
  subtitle?: string
  children: ReactNode
}>) {
  return (
    <article className="view">
      <header>
        <p className="view__eyebrow">
          {index(id)} · profundidade {CS_GRAPH.vertices[id].depth}
        </p>
        <h1 className="view__title">{title}</h1>
        {subtitle && <p className="view__subtitle">{subtitle}</p>}
      </header>
      <div className="view__body">{children}</div>
    </article>
  )
})
