import { ModuleShell } from '../frame/ModuleShell'
import { timeline } from '../content/data'

export function Trace() {
  return (
    <ModuleShell id="trace">
      <p className="text-[var(--text)]">Percurso de aprendizagem — trace log.</p>
      <ol className="mt-2">
        {timeline.map((t) => (
          <li key={t.yr} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[var(--border)] py-4 first:border-0">
            <span className="font-mono text-xs text-[var(--green)]">{t.yr}</span>
            <div>
              <h2 className="font-display text-lg font-bold text-[var(--text)]">{t.title}</h2>
              <p className="mt-1">{t.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </ModuleShell>
  )
}
