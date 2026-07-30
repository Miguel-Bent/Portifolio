import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Fundo estilo blavkvocIA — ondas de voz + glow IA */
export const VoiceField = memo(function VoiceField() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* gradient orbs */}
      <div className="absolute -left-[20%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-[var(--accent)] opacity-[0.12] blur-[120px]" />
      <div className="absolute -right-[10%] bottom-[5%] h-[40vh] w-[40vh] rounded-full bg-[var(--cyan)] opacity-[0.08] blur-[100px]" />

      {/* voice waveforms */}
      <svg className="absolute bottom-0 left-0 h-48 w-full opacity-30 md:h-64" preserveAspectRatio="none" viewBox="0 0 1200 200">
        {!reduce &&
          [0, 1, 2].map((layer) => (
            <motion.path
              key={layer}
              fill="none"
              stroke={layer === 0 ? 'var(--accent)' : layer === 1 ? 'var(--cyan)' : 'var(--pink)'}
              strokeWidth={layer === 0 ? 1.5 : 1}
              strokeOpacity={0.5 - layer * 0.12}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2 + layer, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              d={`M0,${100 + layer * 8} Q300,${60 - layer * 20} 600,${100 + layer * 5} T1200,${90 + layer * 10}`}
            />
          ))}
      </svg>

      {/* scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)',
        }}
      />

      {/* noise */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc2VkPSIyIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />
    </div>
  )
})
