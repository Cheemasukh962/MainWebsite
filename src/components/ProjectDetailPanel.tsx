import type { Project } from '../data/types'
import { CapsuleIcon, TIER_COLOR, TIER_LABEL } from './CapsuleIcon'

export function ProjectDetailPanel({ project }: { project: Project }) {
  const tier = project.tier ?? 1
  const color = TIER_COLOR[tier]
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-gold/80 bg-ki-900/85 shadow-2xl backdrop-blur-sm">
      <div
        key={project.id}
        className="relative flex h-44 items-center justify-center overflow-hidden border-b-2 border-gold/40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(34,197,94,0.35) 0%, rgba(15,118,110,0.6) 60%, rgba(6,40,38,0.85) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-3 top-3 text-[9px] font-bold tracking-[0.2em] text-emerald-300/80"
        >
          ITEM INFORMATION
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex items-end gap-1"
        >
          {[6, 10, 4, 12, 8, 14, 11].map((h, i) => (
            <span
              key={i}
              className="w-1 bg-emerald-300"
              style={{ height: `${h}px`, opacity: 0.8 }}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-32 w-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
        <div className="reveal relative z-10">
          <CapsuleIcon tier={tier} letter={project.icon ?? project.title[0]} size={72} />
        </div>
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

        <p className="reveal mb-4 text-sm leading-relaxed text-white/90" key={`desc-${project.id}`}>
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
  )
}
