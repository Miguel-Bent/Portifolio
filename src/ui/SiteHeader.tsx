import { memo } from 'react'
import { useLab } from '../store/lab-store'
import { CS_GRAPH, ALGO_META } from '../theory/graph/cs-graph'

export const SiteHeader = memo(function SiteHeader() {
  const phase = useLab((s) => s.phase)
  const booting = useLab((s) => s.booting)
  const algo = useLab((s) => s.algo)
  const path = useLab((s) => s.path)
  const toggleLab = useLab((s) => s.toggleLab)
  const goto = useLab((s) => s.goto)

  const pathStr =
    path.length > 0
      ? path.map((id) => CS_GRAPH.vertices[id].symbol).join(' → ')
      : '—'

  return (
    <header className="site-header">
      <a
        href="#init"
        className="wordmark"
        onClick={(e) => {
          e.preventDefault()
          if (!booting) goto('init')
        }}
      >
        <span className="wordmark__glyph">λ</span>
        <div>
          <span className="wordmark__name">Miguel Bento</span>
          <span className="wordmark__tag"> · theorylab</span>
        </div>
      </a>

      <div className="telemetry">
        <div className="telemetry__item">
          <span className="telemetry__label">algorithm</span>
          <span className="telemetry__value telemetry__value--accent">
            {ALGO_META[algo].name}
          </span>
        </div>
        <div className="telemetry__item">
          <span className="telemetry__label">dfa phase</span>
          <span className="telemetry__value">{phase}</span>
        </div>
        <div className="telemetry__item">
          <span className="telemetry__label">path</span>
          <span className="telemetry__value">{pathStr}</span>
        </div>
      </div>

      <button type="button" onClick={toggleLab} className="btn btn--accent">
        CS Lab
      </button>
    </header>
  )
})
