import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CS_GRAPH, NODE_ORDER } from '../theory/graph/cs-graph'
import { edgeKey, TOTAL_EDGE_COUNT } from '../theory/graph/edges'
import { useLab } from '../store/lab-store'
import { GraphEdges, nodeReached } from './GraphEdges'

const ALGO_COLOR: Record<string, string> = {
  dijkstra: '#4ade80',
  astar: '#00e5c3',
  bfs: '#ff8a5c',
}

export const GraphPanel = memo(function GraphPanel() {
  const path = useLab((s) => s.path)
  const node = useLab((s) => s.node)
  const algo = useLab((s) => s.algo)
  const phase = useLab((s) => s.phase)
  const frontier = useLab((s) => s.frontier)
  const visited = useLab((s) => s.visited)
  const choreoAt = useLab((s) => s.choreoAt)
  const booting = useLab((s) => s.booting)
  const discoveredEdges = useLab((s) => s.discoveredEdges)
  const graphComplete = useLab((s) => s.graphComplete)
  const goto = useLab((s) => s.goto)
  const busy = phase !== 'idle' || booting
  const reduce = useReducedMotion()

  const activePath = useMemo(
    () => new Set(path.slice(0, -1).map((_, i) => edgeKey(path[i], path[i + 1]))),
    [path],
  )

  const focus = CS_GRAPH.vertices[choreoAt ?? node]
  const pathColor = ALGO_COLOR[algo] ?? '#00e5c3'

  return (
    <aside className="graph-panel" aria-label="Grafo de navegação">
      <div className="graph-panel__frame">
        <div className="graph-panel__header">
          <span className="graph-panel__title">Navigation Graph</span>
          <span className="graph-panel__status">
            {booting
              ? 'booting…'
              : graphComplete
                ? 'map complete'
                : busy
                  ? 'tracing…'
                  : `${discoveredEdges.length} edges`}
          </span>
        </div>
        <svg className="graph-panel__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <GraphEdges
            discovered={discoveredEdges}
            graphComplete={graphComplete}
            activePath={activePath}
            pathColor={pathColor}
            variant="panel"
          />

          {NODE_ORDER.map((id) => {
            const v = CS_GRAPH.vertices[id]
            const active = id === node
            const onPath = path.includes(id)
            const reached = nodeReached(id, discoveredEdges, graphComplete)
            return (
              <g
                key={id}
                role="button"
                tabIndex={0}
                style={{ cursor: busy ? 'wait' : 'pointer', opacity: reached ? 1 : 0.35 }}
                onClick={() => !busy && goto(id)}
                onKeyDown={(e) => e.key === 'Enter' && !busy && goto(id)}
              >
                <circle
                  cx={v.pos.x * 100}
                  cy={v.pos.y * 100}
                  r={active ? 3.2 : 2.4}
                  fill={active ? pathColor : onPath ? `${pathColor}44` : '#0e0e12'}
                  stroke={
                    frontier.includes(id)
                      ? '#00e5c3'
                      : visited.includes(id)
                        ? '#9b7dff'
                        : active
                          ? pathColor
                          : '#3a3a48'
                  }
                  strokeWidth="0.4"
                  filter={active ? 'url(#glow)' : undefined}
                />
                <text
                  x={v.pos.x * 100}
                  y={v.pos.y * 100 + 0.5}
                  textAnchor="middle"
                  fontSize="1.65"
                  fill={active ? '#060608' : '#a8a6a0'}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={active ? 600 : 400}
                >
                  {v.symbol}
                </text>
              </g>
            )
          })}

          <motion.circle
            r="1.6"
            fill={pathColor}
            initial={false}
            animate={{
              cx: focus.pos.x * 100,
              cy: focus.pos.y * 100,
            }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
            opacity={0.6}
          />
        </svg>
      </div>

      <div className="card">
        <p className="card__tag">active module</p>
        <p className="card__title">
          {CS_GRAPH.vertices[node].symbol} {CS_GRAPH.vertices[node].label}
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {graphComplete
            ? 'mapa completo · todas as arestas reveladas'
            : `percorre o grafo · ${discoveredEdges.length} / ${TOTAL_EDGE_COUNT} arestas`}
        </p>
      </div>
    </aside>
  )
})
