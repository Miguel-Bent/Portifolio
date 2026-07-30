import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CS_GRAPH, NODE_ORDER } from '../theory/graph/cs-graph'
import { allVtx } from '../theory/graph/ops'
import { useLab } from '../store/lab-store'
import type { NodeId } from '../theory/types'

const ALGO_COLOR: Record<string, string> = {
  dijkstra: 'var(--cyan)',
  astar: 'var(--accent)',
  bfs: 'var(--pink)',
}

function pair(a: NodeId, b: NodeId) {
  return a < b ? `${a}|${b}` : `${b}|${a}`
}

export const GraphViz = memo(function GraphViz() {
  const path = useLab((s) => s.path)
  const node = useLab((s) => s.node)
  const algo = useLab((s) => s.algo)
  const frontier = useLab((s) => s.frontier)
  const visited = useLab((s) => s.visited)
  const choreoAt = useLab((s) => s.choreoAt)
  const reduce = useReducedMotion()

  const lit = useMemo(
    () => new Set(path.slice(0, -1).map((_, i) => pair(path[i], path[i + 1]))),
    [path],
  )

  const edges = useMemo(() => {
    const out: { key: string; x1: number; y1: number; x2: number; y2: number }[] = []
    const seen = new Set<string>()
    for (const v of allVtx(CS_GRAPH)) {
      for (const t of v.neighbors) {
        const key = pair(v.id, t)
        if (seen.has(key)) continue
        seen.add(key)
        const b = CS_GRAPH.vertices[t]
        out.push({
          key,
          x1: v.pos.x * 100,
          y1: v.pos.y * 100,
          x2: b.pos.x * 100,
          y2: b.pos.y * 100,
        })
      }
    }
    return out
  }, [])

  const focus = CS_GRAPH.vertices[choreoAt ?? node]
  const pathColor = ALGO_COLOR[algo] ?? 'var(--green)'

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <svg className="absolute right-0 top-0 h-full w-[52%] md:w-[46%]" viewBox="0 0 100 100">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map((e) => (
          <line
            key={e.key}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke={lit.has(e.key) ? pathColor : 'var(--grid)'}
            strokeWidth={lit.has(e.key) ? 1 : 0.35}
            strokeLinecap="round"
            opacity={lit.has(e.key) ? 1 : 0.5}
            filter={lit.has(e.key) ? 'url(#glow)' : undefined}
            style={{ transition: reduce ? undefined : 'stroke 0.4s ease' }}
          />
        ))}

        {NODE_ORDER.map((id) => {
          const v = CS_GRAPH.vertices[id]
          const active = id === node
          return (
            <g key={id}>
              <circle
                cx={v.pos.x * 100}
                cy={v.pos.y * 100}
                r={active ? 2.8 : 2}
                fill={active ? pathColor : 'var(--bg)'}
                stroke={
                  frontier.includes(id)
                    ? 'var(--blue)'
                    : visited.includes(id)
                      ? 'var(--purple)'
                      : 'var(--muted)'
                }
                strokeWidth="0.4"
              />
              <text
                x={v.pos.x * 100}
                y={v.pos.y * 100 + 0.5}
                textAnchor="middle"
                fontSize="1.6"
                fill={active ? 'var(--bg)' : 'var(--text)'}
                fontFamily="var(--mono)"
              >
                {v.symbol}
              </text>
            </g>
          )
        })}

        <motion.circle
          r="1.2"
          fill={pathColor}
          filter="url(#glow)"
          initial={false}
          animate={{ cx: focus.pos.x * 100, cy: focus.pos.y * 100 }}
          transition={reduce ? { duration: 0 } : { duration: 0.4 }}
        />
      </svg>
    </div>
  )
})
