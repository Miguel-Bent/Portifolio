import { useEffect } from 'react'
import { AutomataIntro } from '../ui/AutomataIntro'
import { ScrollSite } from '../ui/ScrollSite'
import { CSLab } from '../ui/CSLab'
import { useLab, wireLab } from '../store/lab-store'
import type { NodeId } from '../theory/types'
import { HomeView } from '../views/HomeView'
import { ReposView } from '../views/ReposView'
import { TraceView } from '../views/TraceView'
import { StructuresView } from '../views/StructuresView'
import { HowView } from '../views/HowView'
import { ContactView } from '../views/ContactView'
import { engine } from '../core/engine'

import { profile } from '../content/profile'

const META: Record<NodeId, { title: string; description: string }> = {
  init: { title: profile.name, description: profile.metaDescription },
  repos: { title: `Projetos · ${profile.name}`, description: 'Projetos em produção, com links e capturas.' },
  trace: { title: `Percurso · ${profile.name}`, description: 'Estágios e lançamentos por ordem cronológica.' },
  structures: { title: `Stack · ${profile.name}`, description: 'Tecnologias que uso, por camadas.' },
  how: {
    title: `Como funciona · ${profile.name}`,
    description: 'O grafo, os algoritmos (Dijkstra, A*, BFS) e os autômatos por trás da navegação.',
  },
  io: { title: `Contacto · ${profile.name}`, description: 'Email, telefone, GitHub e LinkedIn.' },
}

const VIEWS = {
  init: () => <HomeView />,
  repos: () => <ReposView />,
  trace: () => <TraceView />,
  structures: () => <StructuresView />,
  how: () => <HowView />,
  io: () => <ContactView />,
}

export default function App() {
  const node = useLab((s) => s.node)

  useEffect(() => wireLab(), [])

  useEffect(() => {
    void engine.boot()
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
