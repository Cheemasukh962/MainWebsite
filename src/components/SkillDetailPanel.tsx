import type { Skill } from '../data/types'
import { content } from '../data/content'
import { deriveTier } from './SkillBadge'

const TIER_LABEL = {
  bronze: 'BRONZE',
  silver: 'SILVER',
  gold:   'GOLD',
  hof:    'HALL OF FAME',
} as const

const TIER_ACCENT = {
  bronze: '#e09155',
  silver: '#d8d8d8',
  gold:   '#f2c14e',
  hof:    '#c084fc',
} as const

export function SkillDetailPanel({ skill }: { skill: Skill }) {
  const tier = deriveTier(skill.level)
  const accent = TIER_ACCENT[tier]
  const max = skill.maxLevel ?? 25
  const lvl = Math.round((skill.level / 100) * max)
  const pct = Math.round(skill.level)
  const projects = (skill.projects ?? [])
    .map((pid) => content.projects.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-gold/80 bg-ki-900/85 p-6 shadow-2xl backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-gold/30 pb-4">
        <div>
          <h2
            className="text-2xl font-black italic tracking-wide text-white"
            style={{ textShadow: `0 0 14px ${accent}66` }}
          >
            {skill.name}
          </h2>
          <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.2em] text-ki-200">
            Lv {lvl} / {max}
          </p>
        </div>
        <span
          className="rounded border px-3 py-1 text-xs font-black italic tracking-widest"
          style={{
            borderColor: accent,
            color: accent,
            textShadow: `0 0 8px ${accent}`,
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          {TIER_LABEL[tier]}
        </span>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-[10px] font-bold tracking-wider text-ki-200">
          <span>MASTERY</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full border border-white/20 bg-black/40">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${accent}, #fff8)`,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
        </div>
      </div>

      {skill.description && (
        <p className="mb-4 text-sm italic leading-relaxed text-white/85">{skill.description}</p>
      )}

      {skill.mastery && skill.mastery.length > 0 && (
        <section className="mt-2">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-black tracking-[0.25em] text-gold">
            <span className="h-2 w-2 rotate-45 bg-gold shadow-[0_0_8px_#f2c14e]" />
            MASTERY
          </h3>
          <ul className="space-y-1 pl-1 text-sm text-white/90">
            {skill.mastery.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ki-200" />
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-5">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-black tracking-[0.25em] text-gold">
            <span className="h-2 w-2 rotate-45 bg-gold shadow-[0_0_8px_#f2c14e]" />
            DEPLOYED IN
          </h3>
          <ul className="space-y-1 pl-1 text-sm text-white/90">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_6px_#f2c14e]" />
                {p.title}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
