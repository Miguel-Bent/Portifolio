import { ModuleShell } from '../frame/ModuleShell'
import { experience } from '../content/data'

export function Proof() {
  return (
    <ModuleShell id="proof">
      <ul>
        {experience.map((e) => (
          <li key={e.role} className="border-t border-[var(--border)] py-4 first:border-0">
            <p className="font-mono text-xs text-[var(--purple)]">{e.when}</p>
            <h2 className="font-display text-xl font-bold text-[var(--text)]">{e.role}</h2>
            <p className="text-sm text-[var(--muted)]">{e.org}</p>
            <p className="mt-2">{e.text}</p>
          </li>
        ))}
      </ul>
    </ModuleShell>
  )
}
