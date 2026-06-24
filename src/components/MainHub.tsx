import type { SectionId } from '../state/useGameState'

const OPTIONS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function MainHub({ onSelect }: { onSelect: (s: SectionId) => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-ki-900">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(o.id)}
          className="w-72 rounded border-2 border-gold bg-ki-600/40 px-6 py-3 text-left text-xl text-white hover:bg-ki-400/40"
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
