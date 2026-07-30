import { memo, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CS_GRAPH } from '../theory/graph/cs-graph'
import type { NodeId } from '../theory/types'

export const ModuleShell = memo(function ModuleShell({
  id,
  children,
  hero,
}: {
  id: NodeId
  children: ReactNode
  hero?: boolean
}) {
  const reduce = useReducedMotion()
  const v = CS_GRAPH.vertices[id]

  return (
    <motion.article
      key={id}
      initial={reduce ? false : { opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? undefined : { opacity: 0, x: 16 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 max-w-lg"
    >
      {!hero && (
        <header className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--green)]">
            module · depth {v.depth}
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold text-[var(--text)] md:text-5xl">
            {v.label}
          </h1>
        </header>
      )}
      <div className={hero ? '' : 'space-y-4 text-[1.05rem] leading-relaxed text-[var(--text-dim)]'}>
        {children}
      </div>
    </motion.article>
  )
})
