import type { Project } from '../data/types'
import { CapsuleIcon, TierStars } from './CapsuleIcon'
import { playClick } from '../sound/click'

interface ProjectCapsuleRowProps {
  project: Project
  selected: boolean
  onSelect: () => void
  onHover?: () => void
}

export function ProjectCapsuleRow({
  project,
  selected,
  onSelect,
  onHover,
}: ProjectCapsuleRowProps) {
  const tier = project.tier ?? 1
  return (
    <button
      type="button"
      onClick={() => { playClick(); onSelect() }}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-label={project.title}
      aria-current={selected ? 'true' : undefined}
      className={
        'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ' +
        (selected
          ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-ki-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),0_0_20px_rgba(242,193,78,0.5)]'
          : 'text-white hover:bg-ki-600/30')
      }
    >
      <TierStars tier={tier} size={11} />
      <CapsuleIcon tier={tier} letter={project.icon ?? project.title[0]} size={22} />
      <span className={'flex-1 truncate text-sm font-semibold tracking-wide ' + (selected ? '' : 'group-hover:text-gold')}>
        {project.title}
      </span>
      {project.meta && (
        <span className={'text-xs font-bold ' + (selected ? 'text-ki-900/80' : 'text-ki-200')}>
          {project.meta}
        </span>
      )}
    </button>
  )
}
