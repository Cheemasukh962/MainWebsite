import { useEffect, useState } from 'react'
import type { Project } from '../data/types'
import { CapsuleIcon, TIER_COLOR, TIER_LABEL } from './CapsuleIcon'
import { playClick } from '../sound/click'

export function ProjectDetailPanel({ project }: { project: Project }) {
  const tier = project.tier ?? 1
  const color = TIER_COLOR[tier]
  const hasImage = Boolean(project.image)
  const [modalOpen, setModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Close modal + reset error state when the active project changes.
  useEffect(() => {
    setModalOpen(false)
    setImageError(false)
  }, [project.id])

  // ESC closes the modal.
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen])

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-gold/80 bg-ki-900/85 shadow-2xl backdrop-blur-sm">
        <div
          key={project.id}
          className="relative flex h-72 items-center justify-center overflow-hidden border-b-2 border-gold/40"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(34,197,94,0.35) 0%, rgba(15,118,110,0.6) 60%, rgba(6,40,38,0.85) 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(74,222,128,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.35) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              mixBlendMode: 'screen',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(74,222,128,0.5) 0 1px, transparent 1px 3px)',
              mixBlendMode: 'screen',
            }}
          />

          <div
            aria-hidden="true"
            className="absolute left-3 top-3 rounded bg-black/45 px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] text-emerald-300"
          >
            ITEM INFORMATION
          </div>

          <div aria-hidden="true" className="absolute bottom-3 right-3 flex items-end gap-1">
            {[6, 10, 4, 12, 8, 14, 11].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-emerald-300"
                style={{ height: `${h}px`, opacity: 0.9 }}
              />
            ))}
          </div>

          {hasImage ? (
            <button
              type="button"
              onClick={() => { playClick(); setModalOpen(true) }}
              aria-label="View image"
              className="group relative z-10 flex flex-col items-center gap-3 focus:outline-none"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}66 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                }}
              />
              <div
                className="xeno-anim relative transition group-hover:scale-110"
                style={{ animation: 'ray-spin 6s linear infinite' }}
              >
                <CapsuleIcon tier={tier} letter="?" size={80} />
              </div>
              <span
                className="rounded-full border bg-black/60 px-4 py-1 text-[11px] font-black italic tracking-[0.25em] backdrop-blur-sm transition group-hover:border-gold group-hover:text-gold"
                style={{
                  borderColor: `${color}cc`,
                  color: color,
                  textShadow: `0 0 10px ${color}cc`,
                }}
              >
                VIEW IMAGE ↗
              </span>
            </button>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-32 w-32 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
                  filter: 'blur(8px)',
                }}
              />
              <div className="reveal relative z-10">
                <CapsuleIcon
                  tier={tier}
                  letter={project.icon ?? project.title[0]}
                  size={72}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-start justify-between gap-3 border-b border-gold/30 pb-3">
            <h2
              className="text-xl font-black italic tracking-wide text-white"
              style={{ textShadow: `0 0 12px ${color}66` }}
            >
              {project.title}
            </h2>
            <span
              className="rounded border px-2 py-0.5 text-[10px] font-black italic tracking-widest"
              style={{
                borderColor: color,
                color: color,
                textShadow: `0 0 8px ${color}`,
                background: 'rgba(0,0,0,0.35)',
              }}
            >
              {TIER_LABEL[tier]}
            </span>
          </div>

          <p className="reveal mb-4 text-[13px] leading-relaxed text-white/90" key={`desc-${project.id}`}>
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ki-200/40 bg-black/30 px-2 py-0.5 text-[10px] font-bold tracking-wider text-ki-100"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {project.links.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 border-t border-gold/30 pt-3">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border-2 border-gold/70 bg-black/30 px-3 py-1.5 text-xs font-bold tracking-wider text-gold transition hover:bg-gold hover:text-ki-900"
                >
                  {l.label.toUpperCase()} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalOpen && hasImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — full-size image`}
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
        >
          <div
            className="relative flex max-h-full max-w-6xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {imageError ? (
              <div className="rounded-lg border-2 border-gold bg-ki-900/90 px-10 py-16 text-center shadow-[0_0_50px_rgba(242,193,78,0.5)]">
                <p
                  className="text-2xl font-black italic tracking-wider text-gold"
                  style={{ textShadow: '0 0 12px rgba(242,193,78,0.7)' }}
                >
                  IMAGE NOT FOUND
                </p>
                <p className="mt-3 text-sm text-white/80">
                  Expected file at{' '}
                  <code className="rounded bg-black/40 px-2 py-0.5 text-ki-200">
                    {project.image}
                  </code>
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Save the file to that path and the modal will pick it up automatically.
                </p>
              </div>
            ) : (
              <img
                src={project.image!}
                alt={project.title}
                onError={() => setImageError(true)}
                className="max-h-[85vh] max-w-full rounded-lg border-2 border-gold shadow-[0_0_50px_rgba(242,193,78,0.5)]"
              />
            )}
            <p
              className="text-xs font-bold tracking-[0.3em] text-gold/90"
              style={{ textShadow: '0 0 8px rgba(242,193,78,0.7)' }}
            >
              {project.title.toUpperCase()}
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close image"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-black/70 text-lg font-black text-white transition hover:bg-white hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
