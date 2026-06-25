const GEM_CLIP =
  'polygon(0 6%, 6% 0, 94% 0, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0 94%)'

const TIERS = {
  ruby:    { border: 'linear-gradient(135deg, #ff4d6d, #8a0011, #ff4d6d, #ffd1d8, #8a0011)', accent: '#ff4d6d' },
  emerald: { border: 'linear-gradient(135deg, #4dff8a, #008a3b, #4dff8a, #c4ffd1, #008a3b)', accent: '#4dff8a' },
  sapphire:{ border: 'linear-gradient(135deg, #4d8aff, #001f8a, #4d8aff, #c4d1ff, #001f8a)', accent: '#4d8aff' },
  gold:    { border: 'linear-gradient(135deg, #f2c14e, #8a6510, #fff2c4, #f2c14e, #8a6510)', accent: '#f2c14e' },
  diamond: { border: 'linear-gradient(135deg, #b8e0ff, #4d8aff, #ffffff, #b8e0ff, #4d8aff)', accent: '#b8e0ff' },
} as const

export type CardTier = keyof typeof TIERS

interface PlayerCardProps {
  src: string
  alt: string
  name: string
  level: string
  stars: number
  tier: CardTier
  badge?: string
  seasonCode?: string
}

export function PlayerCard({
  src,
  alt,
  name,
  level,
  stars,
  tier,
  badge,
  seasonCode,
}: PlayerCardProps) {
  const t = TIERS[tier]
  return (
    <div
      data-testid="player-card"
      className="relative h-[480px] w-[330px] shadow-2xl"
      style={{
        clipPath: GEM_CLIP,
        background: t.border,
        filter: `drop-shadow(0 0 22px ${t.accent}88)`,
      }}
    >
      <div
        className="absolute inset-[5px] flex flex-col"
        style={{
          clipPath: GEM_CLIP,
          background: 'linear-gradient(180deg, #1a2c4a 0%, #0a1426 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'repeating-linear-gradient(135deg, transparent 0 18px, rgba(159,208,255,0.18) 18px 20px)',
          }}
        />

        <div className="relative h-[330px] overflow-hidden">
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,20,38,0) 0%, rgba(10,20,38,0.85) 100%)',
            }}
          />
          {badge && (
            <div
              className="absolute right-2 top-2 rounded px-2 py-0.5 text-[10px] font-black tracking-widest text-white"
              style={{ background: t.accent, color: '#0a1426' }}
            >
              {badge}
            </div>
          )}
        </div>

        <div className="relative z-10 bg-black/55 px-4 py-1.5 text-center text-base font-black tracking-[0.2em] text-white">
          {name}
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-between gap-2 bg-gradient-to-r from-ki-900 via-black to-ki-900 px-3 py-3">
          <div className="flex flex-col items-center leading-none">
            <span className="text-[10px] font-bold tracking-wider text-ki-200">LVL</span>
            <span
              className="text-2xl font-black italic"
              style={{ color: t.accent, textShadow: `0 0 12px ${t.accent}` }}
            >
              {level}
            </span>
          </div>

          <div className="flex flex-1 justify-center">
            <span
              className="rounded border px-3 py-1 text-base font-black italic tracking-wider"
              style={{
                borderColor: t.accent,
                color: t.accent,
                textShadow: `0 0 10px ${t.accent}`,
                background: 'rgba(0,0,0,0.4)',
              }}
            >
              {tier.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col items-center leading-none">
            <span className="text-base" style={{ color: t.accent, textShadow: `0 0 8px ${t.accent}` }}>★</span>
            <span className="mt-1 text-[11px] font-bold text-white">{stars}/5</span>
          </div>
        </div>

        {seasonCode && (
          <div className="relative z-10 bg-black/60 py-0.5 text-center text-[10px] font-bold tracking-widest text-ki-200">
            {seasonCode}
          </div>
        )}
      </div>
    </div>
  )
}
