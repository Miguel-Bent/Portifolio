import { memo } from 'react'

export const FeaturedBadge = memo(function FeaturedBadge({ label = 'Vencedor' }: { label?: string }) {
  return (
    <span className="featured-badge">
      <span className="featured-badge__crown" aria-hidden>
        👑
      </span>
      <span>{label}</span>
    </span>
  )
})
