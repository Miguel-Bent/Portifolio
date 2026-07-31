import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ALL_GRAPH_EDGES } from '../theory/graph/edges'
import type { NodeId } from '../theory/types'

interface GraphEdgesProps {
  discovered: readonly string[]
  graphComplete: boolean
  activePath: ReadonlySet<string>
  pathColor: string
  variant?: 'panel' | 'lab'
}

export const GraphEdges = memo(function GraphEdges({
  discovered,
  graphComplete,
  activePath,
  pathColor,
  variant = 'panel',
}: GraphEdgesProps) {
  const reduce = useReducedMotion()
  const discoveredSet = new Set(discovered)
  const dim = variant === 'lab' ? 'var(--lab-border)' : '#2a2a34'
  const dur = reduce ? 0 : 0.65

  return (
    <>
      {ALL_GRAPH_EDGES.map((e) => {
        const known = graphComplete || discoveredSet.has(e.key)
        if (!known) return null

        const lit = activePath.has(e.key)
        const stroke = lit ? pathColor : graphComplete ? dim : pathColor
        const width = lit ? 0.75 : graphComplete ? 0.28 : 0.55
        const opacity = lit ? 1 : graphComplete ? 0.45 : 0.85
        const isNew = discoveredSet.has(e.key) && !graphComplete

        return (
          <motion.line
            key={`${e.key}-${discoveredSet.has(e.key) ? 'on' : 'off'}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke={stroke}
            strokeWidth={width}
            strokeLinecap="round"
            opacity={opacity}
            strokeDasharray={e.len}
            initial={{ strokeDashoffset: isNew ? e.len : 0 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: dur, ease: [0.45, 0, 0.25, 1] }}
          />
        )
      })}
    </>
  )
})

export function nodeReached(id: NodeId, discovered: readonly string[], graphComplete: boolean) {
  if (graphComplete || id === 'init') return true
  return discovered.some((k) => k.split('|').includes(id))
}
