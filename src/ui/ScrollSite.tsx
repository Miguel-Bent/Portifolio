import type { ReactNode, Ref } from 'react'
import { useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { flowToSlide } from '../navigation/graph-direction'
import { SiteHeader } from './SiteHeader'
import { DockNav } from './DockNav'
import { GraphPanel } from './GraphPanel'
import { useLab } from '../store/lab-store'
import type { NodeId } from '../theory/types'
import { useScrollNavigation } from '../hooks/useScrollNavigation'

const EASE = [0.45, 0, 0.25, 1] as const

interface ScrollSiteProps {
  views: Record<NodeId, () => ReactNode>
}

export function ScrollSite({ views }: ScrollSiteProps) {
  const node = useLab((s) => s.node)
  const phase = useLab((s) => s.phase)
  const path = useLab((s) => s.path)
  const flowDir = useLab((s) => s.flowDir)
  const booting = useLab((s) => s.booting)
  const transitioning = phase !== 'idle'
  const reduce = useReducedMotion()
  const slideRef = useRef<HTMLDivElement>(null)

  useScrollNavigation(slideRef, node)

  const slide = flowToSlide(flowDir)
  const duration = reduce ? 0.15 : 0.68

  return (
    <div className="shell" id="site-content">
      <SiteHeader />

      <div className="shell__main">
        <div className="graph-viewport">
          <AnimatePresence initial={false}>
            <motion.div
              key={node}
              ref={slideRef as Ref<HTMLDivElement>}
              className="graph-viewport__slide"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { x: slide.enterX, y: slide.enterY, opacity: 1 }
              }
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { x: slide.exitX, y: slide.exitY, opacity: 1 }
              }
              transition={{ duration, ease: EASE }}
            >
              <div
                data-node={node}
                className={[
                  'site-section',
                  'site-section--active',
                  transitioning && path.includes(node) ? 'site-section--path' : '',
                ].join(' ')}
              >
                <div className="site-section__inner">{views[node]()}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {!booting && (
            <p className="graph-viewport__hint" aria-hidden>
              no fim da página · scroll para avançar
            </p>
          )}
        </div>

        <GraphPanel />
      </div>

      {!booting && <DockNav />}
    </div>
  )
}
