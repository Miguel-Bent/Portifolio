import { useLab } from '../store/lab-store'
import { profile } from '../content/profile'
import { ViewFrame } from '../ui/ViewFrame'

export function HomeView() {
  const goto = useLab((s) => s.goto)

  return (
    <ViewFrame id="init" title={profile.name} subtitle={profile.headline}>
      <p>{profile.bio}</p>

      <div className="actions">
        <button type="button" onClick={() => goto('repos')} className="btn btn--accent">
          Ver projetos
        </button>
        <button type="button" onClick={() => goto('io')} className="btn btn--outline">
          Contacto
        </button>
      </div>

      <p className="text-note">
        As secções deste site estão ligadas como um grafo, e cada salto calcula o caminho com Dijkstra,
        A* ou BFS. Podes clicar nos vértices do painel ou fazer scroll.{' '}
        <button type="button" onClick={() => goto('how')} className="link-button">
          Como funciona
        </button>
      </p>
    </ViewFrame>
  )
}
