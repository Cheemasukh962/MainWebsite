import type { SectionId } from '../state/useGameState'

const TABS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function JumpNav({
  active,
  onJump,
  onReturn,
}: {
  active: SectionId
  onJump: (s: SectionId) => void
  onReturn: () => void
}) {
  return (
    <nav className="flex items-center gap-2 border-b-2 border-gold bg-ki-900/80 px-4 py-2">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onJump(t.id)}
          aria-current={active === t.id ? 'page' : undefined}
          className={`rounded px-3 py-1 text-sm ${active === t.id ? 'bg-gold text-ki-900' : 'text-white hover:bg-ki-600/40'}`}
        >
          {t.label}
        </button>
      ))}
      <button onClick={onReturn} className="ml-auto rounded px-3 py-1 text-sm text-white hover:bg-ki-600/40">
        Return
      </button>
    </nav>
  )
}
