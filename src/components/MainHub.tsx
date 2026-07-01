import { useState, type ReactElement } from 'react'
import type { SectionId } from '../state/useGameState'
import { XenoSelectScreen, type XenoSelectItem } from './XenoSelectScreen'
import {
  AboutPreview,
  SkillsPreview,
  ProjectsPreview,
  ContactPreview,
} from './HubPreviews'

const OPTIONS: { id: SectionId; label: string; meta: string }[] = [
  { id: 'about', label: 'About Me', meta: 'Lv. ∞' },
  { id: 'skills', label: 'Skills', meta: 'Lv. 7' },
  { id: 'projects', label: 'Projects', meta: 'Lv. 8' },
  { id: 'contact', label: 'Contact', meta: 'Open' },
]

const ITEMS: XenoSelectItem[] = OPTIONS.map((o) => ({
  id: o.id,
  label: o.label,
  meta: o.meta,
}))

const PREVIEWS: Record<SectionId, ReactElement> = {
  about: <AboutPreview />,
  skills: <SkillsPreview />,
  projects: <ProjectsPreview />,
  contact: <ContactPreview />,
}

export function MainHub({ onSelect }: { onSelect: (s: SectionId) => void }) {
  const [activeId, setActiveId] = useState<SectionId>(OPTIONS[0].id)

  const rightPanel = (
    <div className="relative h-[420px] w-[360px]">
      {(Object.keys(PREVIEWS) as SectionId[]).map((id) => (
        <div
          key={id}
          aria-hidden={activeId !== id}
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out"
          style={{
            opacity: activeId === id ? 1 : 0,
            pointerEvents: activeId === id ? 'auto' : 'none',
          }}
        >
          {PREVIEWS[id]}
        </div>
      ))}
    </div>
  )

  return (
    <XenoSelectScreen
      title="Select Section"
      subtitle="Choose Your Path"
      items={ITEMS}
      selectedId={activeId}
      onSelect={(id) => onSelect(id as SectionId)}
      onActiveChange={(id) => setActiveId(id as SectionId)}
      rightPanel={rightPanel}
      bottomPrompts={[
        { key: 'A', label: 'Confirm' },
        { key: 'B', label: 'Return' },
      ]}
    />
  )
}
