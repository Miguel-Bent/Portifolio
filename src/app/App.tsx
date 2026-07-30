import { useEffect, useDeferredValue } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { GraphViz } from '../exhibit/GraphViz'
import { VoiceField } from '../exhibit/VoiceField'
import { AutomataStrip, AlgoSwitcher } from '../exhibit/AutomataStrip'
import { LabDock } from '../exhibit/LabDock'
import { NodeRail } from '../frame/NodeRail'
import { useLab, wireLab } from '../store/lab-store'
import type { NodeId } from '../theory/types'
import { CS_GRAPH } from '../theory/graph/cs-graph'
import { Init } from '../modules/Init'
import { Graphs } from '../modules/Graphs'
import { Trace } from '../modules/Trace'
import { Repos } from '../modules/Repos'
import { Structures } from '../modules/Structures'
import { Proof } from '../modules/Proof'
import { IO } from '../modules/IO'
import '../cortex/engine'

const META: Record<NodeId, { title: string; description: string }> = {
  init: { title: 'blavkvocIA', description: 'CS Lab — Dijkstra, A*, BFS, DFA, PDA, TM.' },
  graphs: { title: 'Graphs · blavkvocIA', description: 'Teoria de grafos.' },
  trace: { title: 'Trace · blavkvocIA', description: 'Percurso.' },
  repos: { title: 'Repos · blavkvocIA', description: 'Projetos.' },
  structures: { title: 'Structures · blavkvocIA', description: 'Estruturas de dados.' },
  proof: { title: 'Proof · blavkvocIA', description: 'Experiência.' },
  io: { title: 'I/O · blavkvocIA', description: 'Contacto.' },
}

const MODULES: Record<NodeId, () => ReactNode> = {
  init: () => <Init />,
  graphs: () => <Graphs />,
  trace: () => <Trace />,
  repos: () => <Repos />,
  structures: () => <Structures />,
  proof: () => <Proof />,
  io: () => <IO />,
}

export default function App() {
  const node = useLab((s) => s.node)
  const path = useLab((s) => s.path)
  const phase = useLab((s) => s.phase)
  const deferred = useDeferredValue(node)

  useEffect(() => wireLab(), [])

  useEffect(() => {
    const m = META[node]
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
  }, [node])

  const pathStr =
    path.length > 0
      ? path.map((id) => CS_GRAPH.vertices[id].symbol).join(' → ')
      : null

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      <VoiceField />
      <GraphViz />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-8 pt-6 md:px-8">
        <header className="glass-panel mb-2 px-5 py-5 md:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--muted)]">
                voice · intelligence · code
              </p>
              <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                <span className="brand-blavk">blavk</span>
                <span className="brand-voc">voc</span>
                <span className="brand-ia">IA</span>
              </h1>
              <p className="mt-1 font-mono text-[10px] text-[var(--text-dim)]">
                theorylab · computer science
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                dfa phase
              </p>
              <p className="font-mono text-sm text-[var(--cyan)]">{phase}</p>
              {pathStr && (
                <p className="mt-1 font-mono text-[10px] text-[var(--accent-bright)]">{pathStr}</p>
              )}
            </div>
          </div>

          <div className="mt-4 hidden md:block">
            <AlgoSwitcher />
          </div>
          <AutomataStrip />
        </header>

        <main className="flex flex-1 items-center py-8 md:py-12">
          <AnimatePresence mode="wait">
            <div key={deferred}>{MODULES[deferred]()}</div>
          </AnimatePresence>
        </main>

        <footer className="glass-panel mt-auto px-4 py-4">
          <NodeRail />
        </footer>
      </div>

      <LabDock />
    </div>
  )
}
