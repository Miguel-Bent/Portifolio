import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ALGO_META, CS_GRAPH, NODE_ORDER } from '../theory/graph/cs-graph'
import { edgeKey, TOTAL_EDGE_COUNT } from '../theory/graph/edges'
import { useLab } from '../store/lab-store'
import { GraphEdges, nodeReached } from './GraphEdges'

// Mesmos valores dos tokens em global.css
const C = {
  surface: '#191917',
  void: '#121211',
  frontier: '#ecebe6',
  visited: '#929087',
  idle: '#45443e',
  label: '#b3b1a9',
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
  const pathColor = ALGO_META[algo].color

  return (
    <aside className="graph-panel" aria-label="Grafo de navegação">
      <div className="graph-panel__frame">
        <div className="graph-panel__header">
          <span className="graph-panel__title">Mapa do site</span>
          <span className="graph-panel__status">
            {booting
              ? 'a iniciar…'
              : graphComplete
                ? 'mapa completo'
                : busy
                  ? 'a calcular…'
                  : `${discoveredEdges.length} / ${TOTAL_EDGE_COUNT} arestas`}
          </span>
        </div>
        <svg className="graph-panel__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
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
                aria-label={active ? `${v.label} (secção actual)` : `Ir para ${v.label}`}
                aria-disabled={busy || undefined}
                style={{ cursor: busy ? 'wait' : 'pointer', opacity: reached ? 1 : 0.35 }}
                onClick={() => !busy && goto(id)}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter' && e.key !== ' ') return
                  e.preventDefault()
                  if (!busy) goto(id)
                }}
              >
                <circle
                  cx={v.pos.x * 100}
                  cy={v.pos.y * 100}
                  r={active ? 3.2 : 2.4}
                  fill={active ? pathColor : onPath ? `${pathColor}44` : C.surface}
                  stroke={
                    frontier.includes(id)
                      ? C.frontier
                      : visited.includes(id)
                        ? C.visited
                        : active
                          ? pathColor
                          : C.idle
                  }
                  strokeWidth="0.4"
                />
                <text
                  x={v.pos.x * 100}
                  y={v.pos.y * 100 + 0.5}
                  textAnchor="middle"
                  fontSize="1.65"
                  fill={active ? C.void : C.label}
                  fontFamily="IBM Plex Mono, monospace"
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
        <p className="card__tag">estás em</p>
        <p className="card__title">
          {CS_GRAPH.vertices[node].symbol} {CS_GRAPH.vertices[node].label}
        </p>
        <p className="text-note graph-panel__hint">
          {graphComplete
            ? 'Já percorreste todas as arestas.'
            : 'Clica num vértice para ir para essa secção. As arestas aparecem à medida que passas por elas.'}
        </p>
      </div>
    </aside>
  )
})
