import { ModuleShell } from '../frame/ModuleShell'
import { useLab } from '../store/lab-store'

export function IO() {
  const toggle = useLab((s) => s.toggleLab)
  const goto = useLab((s) => s.goto)

  return (
    <ModuleShell id="io">
      <p className="text-[var(--text)]">I/O — abre o laboratório ou volta ao início.</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={toggle}
          className="rounded-md bg-[var(--purple)] px-5 py-2.5 font-mono text-xs uppercase text-white"
        >
          Theory Lab
        </button>
        <button
          type="button"
          onClick={() => goto('init')}
          className="rounded-md border border-[var(--border)] px-5 py-2.5 font-mono text-xs uppercase"
        >
          λ Init
        </button>
      </div>
      <p className="mt-6 font-mono text-xs text-[var(--muted)]">theory@lab.dev</p>
    </ModuleShell>
  )
}
