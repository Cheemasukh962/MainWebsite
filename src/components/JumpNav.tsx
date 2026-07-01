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
    <nav className="flex items-center gap-3 py-2 pl-4">
      <button
        type="button"
        onClick={onReturn}
        className="group flex items-center gap-2 rounded-md border border-gold/80 bg-black/40 px-3 py-1.5 text-[10px] font-black italic tracking-[0.25em] text-gold transition hover:bg-gold hover:text-ki-900"
        style={{ textShadow: '0 0 8px rgba(242,193,78,0.5)' }}
      >
        <span
          aria-hidden="true"
          className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[8px] font-bold not-italic tracking-normal"
        >
          B
        </span>
        RETURN
      </button>

      <span aria-hidden="true" className="h-6 w-px bg-gold/40" />

      <div className="flex items-center gap-1">
        {TABS.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onJump(t.id)}
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 px-4 py-1.5 text-[11px] font-black italic tracking-[0.25em] text-ki-900 shadow-[0_0_16px_rgba(242,193,78,0.55),inset_0_0_0_1px_rgba(255,255,255,0.5)]'
                  : 'rounded-full px-4 py-1.5 text-[11px] font-bold italic tracking-[0.2em] text-white/80 transition hover:bg-ki-600/40 hover:text-gold'
              }
            >
              {t.label.toUpperCase()}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
