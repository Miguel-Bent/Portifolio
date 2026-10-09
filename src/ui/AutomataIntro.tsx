import { memo, useEffect, useRef, useState } from 'react'
import { profile } from '../content/profile'
import { useLab } from '../store/lab-store'
import { NAV_PHASES } from '../theory/automata/dfa'
import { BOOT_HOLD_MS, engine } from '../core/engine'
import { bus } from '../core/bus'
import { CS_GRAPH } from '../theory/graph/cs-graph'

const GRAPH_SYMBOLS = Object.values(CS_GRAPH.vertices).map((v) => v.symbol)
const SEEN_KEY = 'theorylab:intro-seen'

function introSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // sem storage (modo privado, etc.): a intro volta a aparecer, não faz mal
  }
}

function goToMain(settled: { current: boolean }) {
  if (settled.current) return
  settled.current = true
  markIntroSeen()
  void engine.settleIntro()
  bus.fire({ type: 'INTRO_PASSED' })
  const site = document.getElementById('site-content')
  site?.scrollIntoView({ behavior: 'smooth' })
  window.setTimeout(() => {
    if (site) window.scrollTo({ top: site.offsetTop, behavior: 'instant' })
  }, 700)
}

export const AutomataIntro = memo(function AutomataIntro() {
  const tm = useLab((s) => s.tm)
  const pda = useLab((s) => s.pda)
  const dfa = useLab((s) => s.dfa)
  const phase = useLab((s) => s.phase)
  const booting = useLab((s) => s.booting)
  const settled = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  // Corre antes do engine.boot() no App (efeitos dos filhos correm primeiro)
  useEffect(() => {
    if (introSeen()) engine.skipIntro()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !settled.current && !booting) {
          goToMain(settled)
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [booting])

  useEffect(() => {
    const unsub = bus.on('BOOT_AUTO_ADVANCE', () => goToMain(settled))
    return () => {
      unsub()
    }
  }, [])

  useEffect(() => {
    const onHold = () => {
      const total = Math.ceil(BOOT_HOLD_MS / 1000)
      setCountdown(total)
      const started = performance.now()
      const id = window.setInterval(() => {
        const left = Math.max(0, Math.ceil((BOOT_HOLD_MS - (performance.now() - started)) / 1000))
        setCountdown(left)
        if (left <= 0) clearInterval(id)
      }, 250)
      return id
    }

    let intervalId: number | undefined
    const unsub = bus.on('BOOT_HOLD_START', () => {
      intervalId = onHold()
    })

    return () => {
      unsub()
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (!booting) setCountdown(null)
  }, [booting])

  const isNameTape =
    tm.state === 'boot' ||
    tm.tape.some(
      (c) => c.length === 1 && c !== '⊔' && !GRAPH_SYMBOLS.includes(c),
    )

  return (
    <section ref={sectionRef} className="automata-hero" aria-label="Introdução com autômatos">

      <div className="automata-hero__inner">
        <header className="automata-hero__header">
          <p className="automata-hero__eyebrow">theorylab · a arrancar</p>
          <h1 className="automata-hero__title">
            {booting && !isNameTape ? 'A inicializar…' : profile.name}
          </h1>
        </header>

        <div className="automata-hero__machines">
          <div className="automata-hero__machine automata-hero__machine--dfa">
            <p className="automata-hero__machine-label">DFA · fases da navegação</p>
            <div className="automata-hero__dfa">
              {NAV_PHASES.map((p) => (
                <span
                  key={p}
                  className={[
                    'automata-hero__dfa-phase',
                    p === dfa.state ? 'automata-hero__dfa-phase--active' : '',
                  ].join(' ')}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="automata-hero__machine automata-hero__machine--tm">
            <p className="automata-hero__machine-label">TM · {booting ? 'boot' : phase}</p>
            <div className="automata-hero__tape">
              {tm.tape.map((cell, i) => (
                <div
                  key={i}
                  className={[
                    'automata-hero__tape-cell',
                    i === tm.head ? 'automata-hero__tape-cell--head' : '',
                    isNameTape && cell !== '⊔' ? 'automata-hero__tape-cell--name' : '',
                  ].join(' ')}
                >
                  <span>{cell === ' ' ? '·' : cell}</span>
                  {i === tm.head && <i className="automata-hero__tape-read">lê</i>}
                </div>
              ))}
            </div>
          </div>

          <div className="automata-hero__machine automata-hero__machine--pda">
            <p className="automata-hero__machine-label">PDA · stack · {pda.state}</p>
            <div className="automata-hero__stack">
              {pda.stack.length === 0 ? (
                <span className="automata-hero__stack-empty">ε</span>
              ) : (
                pda.stack.map((sym, i) => (
                  <div
                    key={i}
                    className="automata-hero__stack-block"
                    style={{ marginBottom: i * 4 }}
                  >
                    {sym === ' ' ? '·' : sym}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {countdown !== null && countdown > 0 && (
        <div className="automata-hero__countdown" aria-live="polite">
          <span>A ir para o site em</span>
          <strong>{countdown}s</strong>
        </div>
      )}

      {booting && (
        <button type="button" className="automata-hero__skip" onClick={() => engine.skipIntro()}>
          Saltar
        </button>
      )}
    </section>
  )
})
