import { useLab } from '../store/lab-store'
import { AlgoSwitcher } from '../ui/AutomataPanel'
import { ALGO_META } from '../theory/graph/cs-graph'
import { ViewFrame } from '../ui/ViewFrame'

const ALGOS = [
  { id: 'dijkstra' as const, frontier: 'min-heap', goal: 'custo total' },
  { id: 'astar' as const, frontier: 'min-heap + h(n)', goal: 'custo total, com menos expansões' },
  { id: 'bfs' as const, frontier: 'fila FIFO', goal: 'número de saltos' },
]

export function HowView() {
  const goto = useLab((s) => s.goto)
  const toggle = useLab((s) => s.toggleLab)
  const algo = useLab((s) => s.algo)

  return (
    <ViewFrame
      id="how"
      title="Como funciona"
      subtitle="Este site é um grafo de seis vértices. Quando mudas de secção, o caminho é calculado e animado por algoritmos e autômatos que podes ver a correr."
    >
      <section className="how-section">
        <h2 className="how-section__title">O mapa</h2>
        <p>
          Cada secção é um vértice e as ligações entre elas têm peso. Há atalhos caros: ir directo do
          Início para aqui custa 4, enquanto passar pela Stack custa 3. As arestas só aparecem no painel
          depois de as percorreres, e o contador sobe até o mapa ficar completo.
        </p>
      </section>

      <section className="how-section">
        <h2 className="how-section__title">Três algoritmos</h2>
        <div className="how-table__wrap">
          <table className="how-table">
            <thead>
              <tr>
                <th>Algoritmo</th>
                <th>Complexidade</th>
                <th>Fronteira</th>
                <th>Minimiza</th>
              </tr>
            </thead>
            <tbody>
              {ALGOS.map((a) => (
                <tr key={a.id} className={a.id === algo ? 'how-table__row--active' : undefined}>
                  <td>{ALGO_META[a.id].name}</td>
                  <td className="how-table__mono">{ALGO_META[a.id].complexity}</td>
                  <td>{a.frontier}</td>
                  <td>{a.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Um hash set de visitados impede que o mesmo vértice seja expandido duas vezes. Do Início ao
          Contacto, o BFS vai por Projetos (2 saltos, custo 4) e o Dijkstra passa também pelo Percurso
          (3 saltos, custo 3).
        </p>
        <p className="how-section__note">{ALGO_META[algo].desc}</p>
        <AlgoSwitcher />
      </section>

      <section className="how-section">
        <h2 className="how-section__title">Autômatos</h2>
        <dl className="how-list">
          <dt>DFA</dt>
          <dd>
            Cada salto passa pelas fases idle → scan → run → walk → render → done. Enquanto uma
            transição corre, o site ignora cliques novos, para a animação, o pathfinding e o scroll não
            se dessincronizarem.
          </dd>
          <dt>PDA</dt>
          <dd>
            O caminho calculado é empilhado e depois desempilhado (LIFO) à medida que a animação avança,
            um símbolo por passo: O(k) para um caminho de comprimento k.
          </dd>
          <dt>TM</dt>
          <dd>A cabeça acompanha a secção actual na fita. Na intro, escreve o meu nome letra a letra.</dd>
        </dl>
      </section>

      <section className="how-section">
        <h2 className="how-section__title">Experimenta</h2>
        <p>
          Abre o CS Lab, escolhe BFS e vai até ao Contacto. Volta ao Início, troca para Dijkstra e
          repete. No log comparas o caminho, o custo, as expansões e as stack ops de cada um.
        </p>
      </section>

      <div className="actions">
        <button type="button" onClick={toggle} className="btn btn--accent">
          Abrir CS Lab
        </button>
        <button type="button" onClick={() => goto('io')} className="btn btn--ghost">
          Contacto →
        </button>
      </div>
    </ViewFrame>
  )
}
