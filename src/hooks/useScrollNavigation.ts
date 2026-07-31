import { useEffect, useRef, type RefObject } from 'react'
import { useLab } from '../store/lab-store'
import { nextInTour, prevInTour } from '../navigation/scroll-tour'
import type { NodeId } from '../theory/types'

const EDGE_TOLERANCE = 20
const OVERSCROLL_THRESHOLD = 90
const COOLDOWN_MS = 650

function scrollEdges(el: HTMLElement) {
  const { scrollTop, clientHeight, scrollHeight } = el
  const fits = scrollHeight <= clientHeight + EDGE_TOLERANCE
  return {
    fits,
    atTop: fits || scrollTop <= EDGE_TOLERANCE,
    atBottom: fits || scrollTop + clientHeight >= scrollHeight - EDGE_TOLERANCE,
  }
}

function absorbEdge(e: WheelEvent, edges: ReturnType<typeof scrollEdges>) {
  const down = e.deltaY > 0
  const up = e.deltaY < 0
  if ((down && edges.atBottom) || (up && edges.atTop)) e.preventDefault()
}

export function useScrollNavigation(slideRef: RefObject<HTMLElement | null>, node: NodeId) {
  const goto = useLab((s) => s.goto)
  const overscroll = useRef(0)
  const lastIntent = useRef<'up' | 'down' | null>(null)
  const cooldown = useRef(0)

  // Nova página sempre começa no topo
  useEffect(() => {
    overscroll.current = 0
    lastIntent.current = null
    const slide = slideRef.current
    if (slide) slide.scrollTop = 0
  }, [node, slideRef])

  useEffect(() => {
    const slide = slideRef.current
    if (!slide) return

    const onWheel = (e: WheelEvent) => {
      const edges = scrollEdges(slide)
      const down = e.deltaY > 0
      const up = e.deltaY < 0
      const intent: 'up' | 'down' = down ? 'down' : 'up'

      const { booting, phase, node, labOpen, introPassed } = useLab.getState()

      // Bloqueado — absorve scroll no limite para não travar
      if (booting || phase !== 'idle' || labOpen) {
        absorbEdge(e, edges)
        return
      }

      if (Date.now() < cooldown.current) {
        absorbEdge(e, edges)
        return
      }

      // Página curta — usa só a direção do scroll
      if (edges.fits) {
        if (down) {
          if (!nextInTour(node)) {
            e.preventDefault()
            return
          }
        } else if (up) {
          if (!prevInTour(node)) {
            if (introPassed) e.preventDefault()
            return
          }
        }
        e.preventDefault()
        if (lastIntent.current !== intent) {
          overscroll.current = 0
          lastIntent.current = intent
        }
        overscroll.current += e.deltaY
        if (Math.abs(overscroll.current) < OVERSCROLL_THRESHOLD) return
        const target = down ? nextInTour(node) : prevInTour(node)
        if (!target) {
          overscroll.current = 0
          return
        }
        overscroll.current = 0
        cooldown.current = Date.now() + COOLDOWN_MS
        goto(target)
        return
      }

      // A meio da página — scroll normal
      if (down && !edges.atBottom) {
        overscroll.current = 0
        lastIntent.current = null
        return
      }
      if (up && !edges.atTop) {
        overscroll.current = 0
        lastIntent.current = null
        return
      }

      // Topo da primeira página
      if (up && edges.atTop && !prevInTour(node)) {
        overscroll.current = 0
        if (introPassed) e.preventDefault()
        return
      }

      const target = down ? nextInTour(node) : prevInTour(node)
      if (!target) {
        overscroll.current = 0
        e.preventDefault()
        return
      }

      e.preventDefault()
      if (lastIntent.current !== intent) {
        overscroll.current = 0
        lastIntent.current = intent
      }
      overscroll.current += e.deltaY

      if (Math.abs(overscroll.current) < OVERSCROLL_THRESHOLD) return

      overscroll.current = 0
      cooldown.current = Date.now() + COOLDOWN_MS
      goto(target)
    }

    slide.addEventListener('wheel', onWheel, { passive: false })
    return () => slide.removeEventListener('wheel', onWheel)
  }, [goto, slideRef, node])

  useEffect(() => {
    const site = document.getElementById('site-content')
    if (!site) return

    const lockWindow = () => {
      if (!useLab.getState().introPassed) return
      const minY = site.offsetTop
      if (window.scrollY < minY) window.scrollTo(0, minY)
    }

    const blockHeroWheel = (e: WheelEvent) => {
      if (!useLab.getState().introPassed) return
      const slide = slideRef.current
      if (slide?.contains(e.target as Node)) return
      if (window.scrollY <= site.offsetTop + 2 && e.deltaY < 0) e.preventDefault()
    }

    window.addEventListener('scroll', lockWindow, { passive: true })
    window.addEventListener('wheel', blockHeroWheel, { passive: false })
    return () => {
      window.removeEventListener('scroll', lockWindow)
      window.removeEventListener('wheel', blockHeroWheel)
    }
  }, [slideRef])
}
