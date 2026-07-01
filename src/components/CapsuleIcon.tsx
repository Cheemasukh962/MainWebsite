import type { ProjectTier } from '../data/types'

export const TIER_COLOR: Record<ProjectTier, string> = {
  1: '#5d8df5',
  2: '#4ade80',
  3: '#a855f7',
  4: '#f2c14e',
}

export const TIER_LABEL: Record<ProjectTier, string> = {
  1: 'COMMON',
  2: 'RARE',
  3: 'EPIC',
  4: 'LEGENDARY',
}

interface CapsuleIconProps {
  tier: ProjectTier
  letter?: string
  size?: number
  className?: string
}

export function CapsuleIcon({ tier, letter, size = 36, className }: CapsuleIconProps) {
  const color = TIER_COLOR[tier]
  return (
    <svg
      viewBox="0 0 60 100"
      width={size}
      height={(size / 60) * 100}
      className={className}
      aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
    >
      <defs>
        <linearGradient id={`cap-body-${tier}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cccccc" />
        </linearGradient>
        <linearGradient id={`cap-fill-${tier}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.95" />
          <stop offset="1" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="12" y="18" width="36" height="68" rx="18" fill={`url(#cap-body-${tier})`} stroke="#3a3a3a" strokeWidth="1.5" />
      <rect x="8" y="12" width="44" height="14" rx="3" fill="#9aa3b2" stroke="#3a3a3a" strokeWidth="1.5" />
      <rect x="14" y="18" width="32" height="3" fill="#7a8290" />
      <circle cx="30" cy="55" r="14" fill={`url(#cap-fill-${tier})`} stroke={color} strokeWidth="1.5" />
      {letter ? (
        <text
          x="30"
          y="60"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fontStyle="italic"
          fill="#fff"
          fontFamily="system-ui, sans-serif"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        >
          {letter}
        </text>
      ) : (
        <path d="M 25 50 Q 30 42 35 50 Q 30 58 25 50 Z" fill="#fff" opacity="0.85" />
      )}
    </svg>
  )
}

export function TierStars({ tier, size = 12 }: { tier: ProjectTier; size?: number }) {
  const color = TIER_COLOR[tier]
  return (
    <div className="flex items-center gap-0.5" aria-label={`${TIER_LABEL[tier]} tier`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < tier ? color : 'rgba(255,255,255,0.15)',
            fontSize: `${size}px`,
            textShadow: i < tier ? `0 0 6px ${color}` : 'none',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
