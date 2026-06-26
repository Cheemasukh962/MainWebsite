import type { Skill, SkillTier } from '../data/types'

const SHIELD_CLIP =
  'polygon(50% 0%, 90% 8%, 100% 25%, 92% 75%, 50% 100%, 8% 75%, 0% 25%, 10% 8%)'

const TIER_GRADIENT: Record<SkillTier, string> = {
  bronze: 'linear-gradient(135deg, #e09155 0%, #8b4513 50%, #cd7f32 100%)',
  silver: 'linear-gradient(135deg, #f0f0f0 0%, #808080 50%, #d8d8d8 100%)',
  gold:   'linear-gradient(135deg, #fff2c4 0%, #b8851a 50%, #f2c14e 100%)',
  hof:    'linear-gradient(135deg, #f0abfc 0%, #a855f7 40%, #ec4899 70%, #c084fc 100%)',
}

const TIER_GLOW: Record<SkillTier, string> = {
  bronze: 'rgba(205, 127, 50, 0.45)',
  silver: 'rgba(200, 200, 200, 0.45)',
  gold:   'rgba(242, 193, 78, 0.55)',
  hof:    'rgba(192, 132, 252, 0.75)',
}

export function deriveTier(level: number): SkillTier {
  if (level >= 76) return 'hof'
  if (level >= 51) return 'gold'
  if (level >= 26) return 'silver'
  return 'bronze'
}

interface SkillBadgeProps {
  skill: Skill
  selected?: boolean
  onSelect: () => void
  onHover?: () => void
}

export function PlaceholderBadge() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center gap-1.5 rounded-lg p-3 opacity-50 grayscale"
    >
      <div className="relative h-[90px] w-20">
        <div
          className="absolute inset-0"
          style={{
            clipPath: SHIELD_CLIP,
            background: 'linear-gradient(135deg, #6b7280 0%, #374151 50%, #6b7280 100%)',
          }}
        />
        <div
          className="absolute inset-[3px] flex flex-col items-center justify-center"
          style={{
            clipPath: SHIELD_CLIP,
            background: 'linear-gradient(180deg, #1a2c4a 0%, #0a1426 100%)',
          }}
        >
          <span className="text-2xl font-black italic text-white/50">?</span>
          <span className="mt-0.5 text-[8px] font-bold tracking-[0.15em] text-white/30">
            LOCKED
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-white/40">???</span>
      <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-bold text-white/30">
        Lv —/—
      </span>
    </div>
  )
}

export function SkillBadge({ skill, selected, onSelect, onHover }: SkillBadgeProps) {
  const tier = deriveTier(skill.level)
  const max = skill.maxLevel ?? 25
  const lvl = Math.round((skill.level / 100) * max)
  const iconText = skill.icon ?? skill.name.slice(0, 2).toUpperCase()

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-label={skill.name}
      aria-current={selected ? 'true' : undefined}
      className={
        'group flex flex-col items-center gap-1.5 rounded-lg p-3 transition ' +
        (selected
          ? 'bg-cyan-400/25 shadow-[0_0_24px_rgba(34,211,238,0.6)] ring-2 ring-cyan-300'
          : 'hover:bg-white/10')
      }
    >
      <div
        className="relative h-[90px] w-20"
        style={{ filter: `drop-shadow(0 0 10px ${TIER_GLOW[tier]})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: SHIELD_CLIP,
            background: TIER_GRADIENT[tier],
          }}
        />
        <div
          className="absolute inset-[3px] flex flex-col items-center justify-center"
          style={{
            clipPath: SHIELD_CLIP,
            background: 'linear-gradient(180deg, #1a2c4a 0%, #0a1426 100%)',
          }}
        >
          <span
            className="text-xl font-black italic tracking-tight text-white"
            style={{ textShadow: `0 0 8px ${TIER_GLOW[tier]}` }}
          >
            {iconText}
          </span>
          <span className="mt-0.5 text-[8px] font-bold tracking-[0.15em] text-white/60">
            {tier === 'hof' ? 'HOF' : tier.toUpperCase()}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-white">{skill.name}</span>
      <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold text-ki-200">
        Lv {lvl}/{max}
      </span>
    </button>
  )
}
