import { ModuleShell } from '../frame/ModuleShell'
import { projects } from '../content/data'

export function Repos() {
  return (
    <ModuleShell id="repos">
      <p className="text-[var(--text)]">Repositórios de experimentos.</p>
      <ul className="mt-2">
        {projects.map((p) => (
          <li key={p.id} className="border-t border-[var(--border)] py-4 first:border-0">
            <h2 className="font-display text-xl font-bold text-[var(--text)]">{p.name}</h2>
            <p className="mt-1 font-mono text-[10px] text-[var(--blue)]">{p.tags.join(' · ')}</p>
            <p className="mt-2">{p.desc}</p>
          </li>
        ))}
      </ul>
    </ModuleShell>
  )
}
