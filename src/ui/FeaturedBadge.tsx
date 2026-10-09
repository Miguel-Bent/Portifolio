import { memo } from 'react'

export const FeaturedBadge = memo(function FeaturedBadge({ label = 'Vencedor' }: { label?: string }) {
  return <span className="featured-badge">{label}</span>
})
