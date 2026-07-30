import { ModuleShell } from '../frame/ModuleShell'
import { useLab } from '../store/lab-store'
import { AlgoSwitcher } from '../exhibit/AutomataStrip'

export function Init() {
  const goto = useLab((s) => s.goto)

  return (
    <ModuleShell id="init" hero>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--green)]">
        λ · entry point
      </p>
      <h1 className="font-display mt-4 text-[clamp(2.2rem,7vw,4rem)] font-bold leading-tight text-[var(--text)]">
        Learn CS
        <br />
        <span className="text-[var(--green)]">by navigating.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-[var(--text-dim)]">
        Dijkstra, A* e BFS no mesmo grafo. DFA, PDA e Máquina de Turing a
        trabalhar em paralelo. Escolhe o algoritmo e vê a teoria em acção.
      </p>
      <div className="mt-6">
        <AlgoSwitcher />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => goto('repos')}
          className="rounded-md bg-[var(--green)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--bg)]"
        >
          → Repos
        </button>
        <button
          type="button"
          onClick={() => goto('graphs')}
          className="rounded-md border border-[var(--border)] px-5 py-2.5 font-mono text-xs uppercase text-[var(--text-dim)]"
        >
          Graphs
        </button>
      </div>
    </ModuleShell>
  )
}
