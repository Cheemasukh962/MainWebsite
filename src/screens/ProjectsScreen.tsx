import { useState } from 'react'
import { content } from '../data/content'
import { XenoBackdrop } from '../components/XenoBackdrop'
import { ProjectCapsuleRow } from '../components/ProjectCapsuleRow'
import { ProjectDetailPanel } from '../components/ProjectDetailPanel'

export function ProjectsScreen() {
  const [selectedId, setSelectedId] = useState(content.projects[0]?.id)
  const selected = content.projects.find((p) => p.id === selectedId)

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
              Projects
            </h1>
            <p
              className="text-sm font-semibold text-ki-50/95 tracking-wide"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
            >
              Capsule Inventory
            </p>
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-[1fr_380px]">
        {selected && (
          <div className="min-h-0 lg:order-1">
            <ProjectDetailPanel project={selected} />
          </div>
        )}

        <div className="flex flex-col rounded-xl border-2 border-gold/80 bg-ki-900/70 shadow-2xl backdrop-blur-sm lg:order-2">
          <div className="flex items-center justify-center border-b-2 border-gold/40 py-2">
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-white/40 bg-black/40 px-1.5 py-0.5 text-[9px] font-bold text-white/80">
                LB
              </span>
              <span
                className="rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 px-6 py-1 text-sm font-black italic tracking-[0.3em] text-ki-900 shadow-[0_0_18px_rgba(242,193,78,0.6)]"
              >
                PROJECTS
              </span>
              <span className="rounded-md border border-white/40 bg-black/40 px-1.5 py-0.5 text-[9px] font-bold text-white/80">
                RB
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2 text-[10px] font-bold tracking-wider text-ki-200">
            <span>CAPSULE</span>
            <span>YEAR</span>
          </div>
          <ul className="flex-1 space-y-1 overflow-y-auto px-2 pb-3">
            {content.projects.map((p) => (
              <li key={p.id}>
                <ProjectCapsuleRow
                  project={p}
                  selected={p.id === selectedId}
                  onSelect={() => setSelectedId(p.id)}
                  onHover={() => setSelectedId(p.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </XenoBackdrop>
  )
}
