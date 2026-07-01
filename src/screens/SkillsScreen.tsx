import { useState } from 'react'
import { content } from '../data/content'
import { XenoBackdrop } from '../components/XenoBackdrop'
import { SkillBadge, deriveTier } from '../components/SkillBadge'
import { SkillDetailPanel } from '../components/SkillDetailPanel'
import type { Skill, SkillTier } from '../data/types'

// Tier metadata — game name + plain-English label + level range + accent color.
// Rendered in this order (Hall of Fame first, Bronze last) so the highest
// proficiency appears at the top. Recruiters scan top-down.
const TIER_ROWS: {
  tier: SkillTier
  label: string
  plain: string
  range: string
  color: string
  chipBg: string
}[] = [
  {
    tier: 'hof',
    label: 'HALL OF FAME',
    plain: 'Expert · daily driver',
    range: '76–100',
    color: '#c084fc',
    chipBg: 'rgba(192,132,252,0.15)',
  },
  {
    tier: 'gold',
    label: 'GOLD',
    plain: 'Advanced · ship confidently',
    range: '51–75',
    color: '#f2c14e',
    chipBg: 'rgba(242,193,78,0.15)',
  },
  {
    tier: 'silver',
    label: 'SILVER',
    plain: 'Intermediate · productive',
    range: '26–50',
    color: '#d8d8d8',
    chipBg: 'rgba(216,216,216,0.12)',
  },
  {
    tier: 'bronze',
    label: 'BRONZE',
    plain: 'Learning · exposure',
    range: '0–25',
    color: '#e09155',
    chipBg: 'rgba(224,145,85,0.15)',
  },
]

function groupByTier(skills: Skill[]): Record<SkillTier, Skill[]> {
  const groups: Record<SkillTier, Skill[]> = { hof: [], gold: [], silver: [], bronze: [] }
  for (const s of skills) groups[deriveTier(s.level)].push(s)
  for (const t of Object.keys(groups) as SkillTier[]) {
    groups[t].sort((a, b) => b.level - a.level)
  }
  return groups
}

export function SkillsScreen() {
  const [activeId, setActiveId] = useState<string>(
    [...content.skills].sort((a, b) => b.level - a.level)[0]?.id ?? '',
  )
  const active = content.skills.find((s) => s.id === activeId) ?? content.skills[0]
  const grouped = groupByTier(content.skills)

  return (
    <XenoBackdrop heightClass="h-full min-h-[calc(100vh-6rem)]">
      <header className="flex items-center justify-between gap-4 px-8 pt-6">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full bg-ki-400 shadow-[0_0_30px_rgba(55,160,255,0.8)]" />
            <div className="absolute inset-[3px] rounded-full bg-ki-900" />
            <div className="absolute inset-3 rounded-full bg-gold/90" />
            <div className="absolute inset-[18px] rounded-full bg-ki-900" />
          </div>
          <div>
            <h1
              className="text-4xl font-black italic tracking-wider"
              style={{
                textShadow:
                  '0 2px 4px rgba(0,0,0,0.55), 0 0 18px rgba(159,208,255,0.55)',
              }}
            >
              Skills
            </h1>
            <p
              className="text-sm font-semibold text-ki-50/95 tracking-wide"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
            >
              Training Roster · sorted highest → lowest
            </p>
          </div>
        </div>

        <div className="hidden w-72 md:block">
          <div
            className="mb-1 flex justify-between text-[10px] font-bold tracking-wider text-white/90"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
          >
            <span>TOTAL MASTERY</span>
            <span>{content.trainingLevel}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full border border-gold/70 bg-ki-900/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold via-yellow-200 to-gold"
              style={{
                width: `${content.trainingLevel}%`,
                boxShadow: '0 0 12px rgba(242,193,78,0.7)',
              }}
            />
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          {TIER_ROWS.map(({ tier, label, plain, range, color, chipBg }) => {
            const skills = grouped[tier]
            if (skills.length === 0) return null
            return (
              <section
                key={tier}
                className="rounded-xl border-2 bg-ki-900/60 p-4 shadow-lg backdrop-blur-sm"
                style={{ borderColor: `${color}66` }}
              >
                <div
                  className="mb-3 flex items-center justify-between gap-3 border-b pb-2"
                  style={{ borderColor: `${color}55` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded px-3 py-1 text-xs font-black italic tracking-[0.25em]"
                      style={{
                        color,
                        background: chipBg,
                        border: `1px solid ${color}88`,
                        textShadow: `0 0 8px ${color}`,
                      }}
                    >
                      {label}
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white/85">
                      {plain}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-white/70"
                      style={{ background: 'rgba(0,0,0,0.35)' }}
                    >
                      Lv {range}
                    </span>
                    <span className="text-xs font-bold text-white/70">
                      {skills.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <SkillBadge
                      key={skill.id}
                      skill={skill}
                      selected={skill.id === activeId}
                      onSelect={() => setActiveId(skill.id)}
                      onHover={() => setActiveId(skill.id)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {active && (
          <div className="min-h-0">
            <SkillDetailPanel skill={active} />
          </div>
        )}
      </div>
    </XenoBackdrop>
  )
}
