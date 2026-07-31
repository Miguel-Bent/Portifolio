import { memo } from 'react'
import { useLab } from '../store/lab-store'

export const TapeBar = memo(function TapeBar() {
  const tm = useLab((s) => s.tm)
  const phase = useLab((s) => s.phase)
  const booting = useLab((s) => s.booting)

  return (
    <div className="tape-bar" aria-label="Máquina de Turing">
      <div className="tape-bar__inner">
        <span className="tape-bar__label" style={booting ? { color: 'var(--accent)' } : undefined}>
          TM · {booting ? 'boot' : phase}
        </span>
        <div className="tape-bar__cells">
          {tm.tape.map((cell, i) => (
            <span
              key={i}
              className={['tape-bar__cell', i === tm.head ? 'tape-bar__cell--head' : ''].join(' ')}
              style={
                booting && cell !== '⊔'
                  ? { color: 'var(--accent)', borderColor: 'var(--accent)', background: 'var(--accent-glow)' }
                  : undefined
              }
            >
              {cell === ' ' ? '·' : cell}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})
