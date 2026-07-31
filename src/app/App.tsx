import { useEffect } from 'react'
import { AutomataIntro } from '../ui/AutomataIntro'
import { ScrollSite } from '../ui/ScrollSite'
import { CSLab } from '../ui/CSLab'
import { useLab, wireLab } from '../store/lab-store'
import type { NodeId } from '../theory/types'
import { HomeView } from '../views/HomeView'
import { AutomataView } from '../views/AutomataView'
import { GraphsView } from '../views/GraphsView'
import { AlgoView } from '../views/AlgoView'
import { TraceView } from '../views/TraceView'
import { ComplexityView } from '../views/ComplexityView'
import { ReposView } from '../views/ReposView'
import { StructuresView } from '../views/StructuresView'
import { MemoryView } from '../views/MemoryView'
import { ProofView } from '../views/ProofView'
import { ContactView } from '../views/ContactView'
import { cortex } from '../cortex/engine'

const OWNER = 'Miguel Bento'

const META: Record<NodeId, { title: string; description: string }> = {
  init: { title: OWNER, description: 'Portfólio CS com CS Lab interactivo.' },
  automata: { title: `Autômatos · ${OWNER}`, description: 'DFA, PDA e máquina de Turing.' },
  graphs: { title: `Grafos · ${OWNER}`, description: 'Teoria de grafos e pathfinding.' },
  algo: { title: `Algoritmos · ${OWNER}`, description: 'Dijkstra, A* e BFS.' },
  trace: { title: `Trace · ${OWNER}`, description: 'Percurso de aprendizagem.' },
  complexity: { title: `Complexidade · ${OWNER}`, description: 'Classes assintóticas.' },
  repos: { title: `Repos · ${OWNER}`, description: 'Projetos e experimentos.' },
  structures: { title: `Structures · ${OWNER}`, description: 'Competências técnicas.' },
  memory: { title: `Memory · ${OWNER}`, description: 'Heap, stack, queue e hash.' },
  proof: { title: `Proof · ${OWNER}`, description: 'Experiência.' },
  io: { title: `I/O · ${OWNER}`, description: 'Contacto.' },
}

const VIEWS = {
  init: () => <HomeView />,
  automata: () => <AutomataView />,
  graphs: () => <GraphsView />,
  algo: () => <AlgoView />,
  trace: () => <TraceView />,
  complexity: () => <ComplexityView />,
  repos: () => <ReposView />,
  structures: () => <StructuresView />,
  memory: () => <MemoryView />,
  proof: () => <ProofView />,
  io: () => <ContactView />,
}

export default function App() {
  const node = useLab((s) => s.node)

  useEffect(() => wireLab(), [])

  useEffect(() => {
    void cortex.boot()
  }, [])

  useEffect(() => {
    const m = META[node]
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
  }, [node])

  return (
    <div className="page">
      <AutomataIntro />
      <ScrollSite views={VIEWS} />
      <CSLab />
    </div>
  )
}
