interface ModuleNoteProps {
  decision: string
  tryIt: string
}

export function ModuleNote({ decision, tryIt }: Readonly<ModuleNoteProps>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      <div className="card" style={{ padding: '1.25rem' }}>
        <p className="card__tag">porquê aqui</p>
        <p style={{ marginTop: '0.75rem' }}>{decision}</p>
      </div>
      <div className="card" style={{ padding: '1.25rem' }}>
        <p className="card__tag">experimenta</p>
        <p style={{ marginTop: '0.75rem', color: 'var(--text-soft)' }}>{tryIt}</p>
      </div>
    </div>
  )
}
