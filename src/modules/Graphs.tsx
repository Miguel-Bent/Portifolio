import { ModuleShell } from '../frame/ModuleShell'

export function Graphs() {
  return (
    <ModuleShell id="graphs">
      <p className="text-[var(--text)]">
        <strong className="text-[var(--green)]">THEORYLAB</strong> é um portfólio que
        demonstra conceitos reais de Ciência da Computação.
      </p>
      <p>
        O grafo tem 7 vértices e arestas ponderadas. Podes alternar entre{' '}
        <strong>Dijkstra</strong> (custo mínimo), <strong>A*</strong> (heurística) e{' '}
        <strong>BFS</strong> (menos saltos) e ver caminhos diferentes.
      </p>
      <p>
        Três autômatos correm em paralelo: o <strong>DFA</strong> controla as fases de
        navegação, o <strong>PDA</strong> empilha símbolos do caminho (LIFO), e a{' '}
        <strong>TM</strong> percorre a fita de módulos.
      </p>
    </ModuleShell>
  )
}
