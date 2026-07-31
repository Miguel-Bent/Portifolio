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

import { profile } from '../content/profile'

const META: Record<NodeId, { title: string; description: string }> = {
  init: { title: profile.name, description: profile.metaDescription },
  automata: { title: `Autômatos · ${profile.name}`, description: 'DFA que bloqueia navegação inválida durante animações.' },
  graphs: { title: `Grafos · ${profile.name}`, description: 'Mapa ponderado com revelação progressiva de arestas.' },
  algo: { title: `Algoritmos · ${profile.name}`, description: 'Dijkstra, A* e BFS no mesmo grafo de navegação.' },
  trace: { title: `Trace · ${profile.name}`, description: 'Linha temporal — estágios e lançamentos.' },
  complexity: { title: `Complexidade · ${profile.name}`, description: 'Custo medido nos saltos reais do grafo.' },
  repos: { title: `Repos · ${profile.name}`, description: 'Projetos em produção.' },
  structures: { title: `Structures · ${profile.name}`, description: 'Stack dos projetos.' },
  memory: { title: `Memory · ${profile.name}`, description: 'Heap, stack e fila expostos durante a navegação.' },
  proof: { title: `Proof · ${profile.name}`, description: 'Projetos em produção e destaques.' },
  io: { title: `I/O · ${profile.name}`, description: 'Contacto.' },
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

  useEffect(() => {
    document.title = profile.name
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.metaDescription)
  }, [])

  return (
    <div className="page">
      <AutomataIntro />
      <ScrollSite views={VIEWS} />
      <CSLab />
    </div>
  )
}
