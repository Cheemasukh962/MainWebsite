import { useState } from 'react'
import { content } from '../data/content'
import { XenoBackdrop } from '../components/XenoBackdrop'
import { SkillBadge, PlaceholderBadge } from '../components/SkillBadge'
import { SkillDetailPanel } from '../components/SkillDetailPanel'

// Total badge slots shown in the grid. Real skills fill first; the rest are
// "???" placeholders. Bump this when you add more skills, or to leave empty
// slots for ones you plan to add later.
const GRID_TARGET = 16

export function SkillsScreen() {
  const [activeId, setActiveId] = useState<string>(content.skills[0]?.id ?? '')
  const active = content.skills.find((s) => s.id === activeId) ?? content.skills[0]

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
              Training Roster
            </p>
          </div>
        </div>

        <div className="hidden w-72 md:block">
          <div className="mb-1 flex justify-between text-[10px] font-bold tracking-wider text-white/90"
               style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
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
        <div className="rounded-xl border-2 border-gold/70 bg-ki-900/60 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between border-b border-gold/30 pb-2">
            <h2 className="text-xs font-black tracking-[0.3em] text-gold">BADGES</h2>
            <span className="text-[10px] font-bold tracking-wider text-ki-200">
              {content.skills.length} UNLOCKED
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
            {content.skills.map((skill) => (
              <SkillBadge
                key={skill.id}
                skill={skill}
                selected={skill.id === activeId}
                onSelect={() => setActiveId(skill.id)}
                onHover={() => setActiveId(skill.id)}
              />
            ))}
            {Array.from({ length: Math.max(0, GRID_TARGET - content.skills.length) }).map((_, i) => (
              <PlaceholderBadge key={`placeholder-${i}`} />
            ))}
          </div>
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
