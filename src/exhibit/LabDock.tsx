import { memo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLab } from '../store/lab-store'
import { CS_GRAPH, ALGO_META } from '../theory/graph/cs-graph'
import { NAV_PHASES } from '../theory/automata/dfa'
import { AutomataStrip, AlgoSwitcher } from './AutomataStrip'

export const LabDock = memo(function LabDock() {
  const open = useLab((s) => s.labOpen)
  const toggle = useLab((s) => s.toggleLab)
  const reduce = useReducedMotion()

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-[var(--accent)]/40 bg-[var(--glass)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[var(--accent-bright)] shadow-[var(--glow)] backdrop-blur-xl hover:border-[var(--accent)]"
      >
        {open ? '✕ fechar' : '◈ cs lab'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={reduce ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 z-40 w-full max-w-md overflow-y-auto border-r border-[var(--border)] bg-[var(--bg)]/95 p-6 backdrop-blur-2xl"
            aria-label="Theory Lab"
          >
            <header className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                blavkvocIA · cs
              </p>
              <h2 className="font-display mt-1 text-3xl font-bold">
                <span className="brand-blavk">blavk</span>
                <span className="brand-voc">voc</span>
                <span className="brand-ia">IA</span>
                <span className="ml-2 text-lg text-[var(--muted)]">lab</span>
              </h2>
              <button type="button" onClick={toggle} className="mt-2 font-mono text-[10px] underline text-[var(--muted)]">
                fechar
              </button>
            </header>

            <section className="mb-6">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">
                algoritmo activo
              </p>
              <AlgoSwitcher />
            </section>

            <AutomataStrip />

            <LabBody />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
})

function LabBody() {
  const path = useLab((s) => s.path)
  const frontier = useLab((s) => s.frontier)
  const visited = useLab((s) => s.visited)
  const result = useLab((s) => s.result)
  const logs = useLab((s) => s.logs)
  const metrics = useLab((s) => s.metrics)
  const phase = useLab((s) => s.phase)
  const algo = useLab((s) => s.algo)

  return (
    <div className="mt-6 space-y-4 font-mono text-sm">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
        <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">
          {ALGO_META[algo].name} · {ALGO_META[algo].complexity}
        </p>
        <p className="mt-1 text-[11px] text-[var(--text-dim)]">{ALGO_META[algo].desc}</p>
        <p className="mt-2 text-[10px] text-[var(--green)]">phase: {phase}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SetBox title="frontier" items={frontier} color="var(--blue)" />
        <SetBox title="visited" items={visited} color="var(--purple)" />
      </div>

      <div>
        <p className="text-[9px] uppercase text-[var(--muted)]">path</p>
        <p className="text-[var(--text)]">
          {path.length
            ? path.map((id) => CS_GRAPH.vertices[id].symbol).join(' → ')
            : '—'}
        </p>
        {result && (
          <p className="mt-1 text-[10px] text-[var(--muted)]">
            cost {result.cost} · {result.ms.toFixed(2)} ms · {result.expansions} expansions
          </p>
        )}
      </div>

      {metrics && (
        <p className="text-[10px] text-[var(--muted)]">
          stack ops {metrics.stackOps} · anim ~{metrics.animMs} ms
        </p>
      )}

      <div className="flex flex-wrap gap-1">
        {NAV_PHASES.map((p) => (
          <span
            key={p}
            className={[
              'rounded px-2 py-0.5 text-[9px] uppercase',
              p === phase ? 'bg-[var(--green)] text-[var(--bg)]' : 'text-[var(--muted)]',
            ].join(' ')}
          >
            {p}
          </span>
        ))}
      </div>

      <ul className="max-h-36 space-y-1 overflow-y-auto border-t border-[var(--border)] pt-3 text-[11px]">
        {logs.length === 0 && <li className="text-[var(--muted)]">$ awaiting input_</li>}
        {logs.map((l) => (
          <li key={l.id} className={l.warn ? 'text-[var(--orange)]' : 'text-[var(--text-dim)]'}>
            {l.msg}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SetBox({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
      <p className="text-[9px] uppercase text-[var(--muted)]">{title}</p>
      <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
        {items.length === 0 ? (
          <span className="text-[var(--muted)]">∅</span>
        ) : (
          items.map((id) => (
            <span key={id} style={{ color, background: `${color}18` }} className="rounded px-1">
              {CS_GRAPH.vertices[id as keyof typeof CS_GRAPH.vertices]?.symbol ?? id}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
