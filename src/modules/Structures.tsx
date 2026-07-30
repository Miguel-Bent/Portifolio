import { ModuleShell } from '../frame/ModuleShell'
import { skills } from '../content/data'

export function Structures() {
  return (
    <ModuleShell id="structures">
      <p className="text-[var(--text)]">Estruturas de dados e teoria — skills graph.</p>
      <ul className="mt-4 space-y-4">
        {skills.map((s) => (
          <li key={s.id}>
            <div className="flex justify-between">
              <span className="font-medium text-[var(--text)]">{s.name}</span>
              <span className="font-mono text-[10px] text-[var(--muted)]">{s.lvl}/5</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded bg-[var(--border)]">
              <div
                className="h-full bg-[var(--green)]"
                style={{ width: `${(s.lvl / 5) * 100}%` }}
              />
            </div>
            <p className="mt-1 font-mono text-[9px] text-[var(--muted)]">{s.links.join(' → ')}</p>
          </li>
        ))}
      </ul>
    </ModuleShell>
  )
}
