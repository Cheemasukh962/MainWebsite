import type { ReactNode } from 'react'
import { ButtonPromptBar } from './ButtonPromptBar'

const PARTICLES: { left: number; size: number; duration: number; delay: number }[] = [
  { left: 6,  size: 3, duration: 18, delay: 0 },
  { left: 14, size: 2, duration: 24, delay: 6 },
  { left: 22, size: 4, duration: 20, delay: 2 },
  { left: 33, size: 2, duration: 26, delay: 10 },
  { left: 41, size: 3, duration: 22, delay: 4 },
  { left: 52, size: 2, duration: 28, delay: 14 },
  { left: 63, size: 4, duration: 19, delay: 1 },
  { left: 72, size: 3, duration: 23, delay: 8 },
  { left: 81, size: 2, duration: 26, delay: 12 },
  { left: 91, size: 3, duration: 21, delay: 5 },
]

export interface XenoSelectItem {
  id: string
  label: string
  meta?: string
}

export interface XenoSelectScreenProps {
  title: string
  subtitle?: string
  items: XenoSelectItem[]
  selectedId?: string
  onSelect: (id: string) => void
  onActiveChange?: (id: string) => void
  rightPanel?: ReactNode
  bottomPrompts?: { key: string; label: string }[]
}

export function XenoSelectScreen({
  title,
  subtitle,
  items,
  selectedId,
  onSelect,
  onActiveChange,
  rightPanel,
  bottomPrompts,
}: XenoSelectScreenProps) {
  return (
    <div
      data-testid="xeno-select-screen"
      className="relative flex min-h-screen flex-col overflow-hidden text-white"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, #b8e0ff 0%, #6fb5e8 35%, #2d7cba 72%, #0f3a6b 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="xeno-anim pointer-events-none absolute -inset-1/2 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 10deg, rgba(255,255,255,0.18) 10deg 11deg)',
          animation: 'ray-spin 80s linear infinite, bg-pulse 9s ease-in-out infinite',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="xeno-anim absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-white/25 blur-3xl"
          style={{ animation: 'drift-a 32s ease-in-out infinite' }}
        />
        <div
          className="xeno-anim absolute right-[12%] top-[28%] h-80 w-80 rounded-full bg-white/20 blur-3xl"
          style={{ animation: 'drift-b 46s ease-in-out infinite' }}
        />
        <div
          className="xeno-anim absolute bottom-[15%] left-[32%] h-56 w-56 rounded-full bg-white/15 blur-3xl"
          style={{ animation: 'drift-c 38s ease-in-out infinite' }}
        />
        <div
          className="xeno-anim absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-ki-50/30 blur-3xl"
          style={{ animation: 'drift-a 52s ease-in-out infinite reverse' }}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="xeno-anim absolute block rounded-full bg-white/70"
            style={{
              left: `${p.left}%`,
              bottom: `-${p.size}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 8px rgba(255,255,255,0.8)',
              animation: `ki-rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 flex items-center gap-4 px-8 pt-6">
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
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-sm font-semibold text-ki-50/95 tracking-wide"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="relative z-10 flex flex-1 items-center gap-6 px-8 py-6 md:gap-12">
        <div className="w-full max-w-xl flex-1">
          <div className="rounded-xl border-2 border-gold/80 bg-ki-900/85 p-2 shadow-2xl backdrop-blur-sm">
            <ul>
              {items.map((item) => {
                const selected = item.id === selectedId
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      onMouseEnter={() => onActiveChange?.(item.id)}
                      onFocus={() => onActiveChange?.(item.id)}
                      aria-label={item.label}
                      aria-current={selected ? 'true' : undefined}
                      className={
                        'group flex w-full items-center justify-between rounded-lg px-5 py-3 text-left transition ' +
                        (selected
                          ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-ki-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_0_24px_rgba(242,193,78,0.55)]'
                          : 'text-white hover:bg-ki-600/40 hover:shadow-[inset_0_0_0_1px_rgba(159,208,255,0.35)]')
                      }
                    >
                      <span
                        className={
                          'text-lg font-semibold tracking-wide ' +
                          (selected ? '' : 'group-hover:text-gold')
                        }
                      >
                        {item.label}
                      </span>
                      {item.meta && (
                        <span
                          className={
                            'text-sm font-bold ' +
                            (selected ? 'text-ki-900/80' : 'text-ki-200')
                          }
                        >
                          {item.meta}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {rightPanel && (
          <div className="hidden flex-1 items-end justify-center md:flex">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-12 -z-10 rounded-full bg-ki-200/30 blur-3xl"
              />
              {rightPanel}
            </div>
          </div>
        )}
      </div>

      {bottomPrompts && bottomPrompts.length > 0 && (
        <div className="relative z-10">
          <ButtonPromptBar prompts={bottomPrompts} />
        </div>
      )}
    </div>
  )
}
