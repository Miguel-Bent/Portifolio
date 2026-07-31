import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CS_GRAPH, NODE_ORDER } from '../theory/graph/cs-graph'
import { edgeKey } from '../theory/graph/edges'
import { useLab } from '../store/lab-store'
import { GraphEdges, nodeReached } from './GraphEdges'

const ALGO_COLOR: Record<string, string> = {
  dijkstra: 'var(--lab-green)',
  astar: 'var(--lab-accent)',
  bfs: 'var(--lab-orange)',
}

export const LabGraph = memo(function LabGraph() {
  const path = useLab((s) => s.path)
  const node = useLab((s) => s.node)
  const algo = useLab((s) => s.algo)
  const frontier = useLab((s) => s.frontier)
  const visited = useLab((s) => s.visited)
  const choreoAt = useLab((s) => s.choreoAt)
  const discoveredEdges = useLab((s) => s.discoveredEdges)
  const graphComplete = useLab((s) => s.graphComplete)
  const reduce = useReducedMotion()

  const activePath = useMemo(
    () => new Set(path.slice(0, -1).map((_, i) => edgeKey(path[i], path[i + 1]))),
    [path],
  )

  const focus = CS_GRAPH.vertices[choreoAt ?? node]
  const pathColor = ALGO_COLOR[algo] ?? 'var(--lab-accent)'

  return (
    <div className="relative h-full w-full bg-[var(--lab-surface)]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--lab-grid) 1px, transparent 1px), linear-gradient(90deg, var(--lab-grid) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <svg className="relative h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <GraphEdges
          discovered={discoveredEdges}
          graphComplete={graphComplete}
          activePath={activePath}
          pathColor={pathColor}
          variant="lab"
        />

        {NODE_ORDER.map((id) => {
          const v = CS_GRAPH.vertices[id]
          const active = id === node
          const reached = nodeReached(id, discoveredEdges, graphComplete)
          return (
            <g key={id} style={{ opacity: reached ? 1 : 0.35 }}>
              <rect
                x={v.pos.x * 100 - (active ? 2.8 : 2)}
                y={v.pos.y * 100 - (active ? 2.8 : 2)}
                width={(active ? 2.8 : 2) * 2}
                height={(active ? 2.8 : 2) * 2}
                fill={active ? pathColor : 'var(--lab-bg)'}
                stroke={
                  frontier.includes(id)
                    ? 'var(--lab-accent)'
                    : visited.includes(id)
                      ? 'var(--lab-purple)'
                      : 'var(--lab-muted)'
                }
                strokeWidth="0.35"
              />
              <text
                x={v.pos.x * 100}
                y={v.pos.y * 100 + 0.6}
                textAnchor="middle"
                fontSize="1.5"
                fill={active ? 'var(--lab-bg)' : 'var(--lab-text)'}
                fontFamily="var(--mono)"
              >
                {v.symbol}
              </text>
            </g>
          )
        })}

        <motion.rect
          width="2.4"
          height="2.4"
          x={focus.pos.x * 100 - 1.2}
          y={focus.pos.y * 100 - 1.2}
          fill={pathColor}
          initial={false}
          animate={{
            x: focus.pos.x * 100 - 1.2,
            y: focus.pos.y * 100 - 1.2,
          }}
          transition={reduce ? { duration: 0 } : { duration: 0.35 }}
        />
      </svg>
    </div>
  )
})
