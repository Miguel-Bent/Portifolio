import { memo, useEffect, useRef, useState } from 'react'
import { profile } from '../content/profile'
import { useLab } from '../store/lab-store'
import { NAV_PHASES } from '../theory/automata/dfa'
import { BOOT_HOLD_MS, cortex } from '../cortex/engine'
import { synapse } from '../synapse/bus'

function goToMain(settled: { current: boolean }) {
  if (settled.current) return
  settled.current = true
  void cortex.settleIntro()
  synapse.fire({ type: 'INTRO_PASSED' })
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
    const unsub = synapse.on('BOOT_AUTO_ADVANCE', () => goToMain(settled))
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
    const unsub = synapse.on('BOOT_HOLD_START', () => {
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
      (c) => c.length === 1 && c !== '⊔' && !['λ', 'G', 'T', 'R', 'S', 'P', 'Ω'].includes(c),
    )

  return (
    <section ref={sectionRef} className="automata-hero" aria-label="Introdução — autômatos">
      <div className="automata-hero__grid" />

      <div className="automata-hero__inner">
        <header className="automata-hero__header">
          <p className="automata-hero__eyebrow">theorylab · boot sequence</p>
          <h1 className="automata-hero__title">
            {booting && !isNameTape ? 'A inicializar…' : profile.name}
          </h1>
        </header>

        <div className="automata-hero__machines">
          <div className="automata-hero__machine automata-hero__machine--dfa">
            <p className="automata-hero__machine-label">DFA · navigation fsm</p>
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
                  {i === tm.head && <i className="automata-hero__tape-read">read</i>}
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

    </section>
  )
})
