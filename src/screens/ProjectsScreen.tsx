import { useState } from 'react'
import { content } from '../data/content'

export function ProjectsScreen() {
  const [selectedId, setSelectedId] = useState(content.projects[0]?.id)
  const selected = content.projects.find((p) => p.id === selectedId)
  return (
    <div className="grid grid-cols-1 gap-4 p-6 text-white md:grid-cols-2">
      <ul className="space-y-2">
        {content.projects.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => setSelectedId(p.id)}
              className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left ${
                p.id === selectedId ? 'border-gold bg-ki-400/30' : 'border-ki-400 bg-ki-600/20'
              }`}
            >
              <span className="h-6 w-6 rounded-full bg-ki-400 shadow-[0_0_12px] shadow-ki-200" />
              {p.title}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <div className="rounded-lg border-2 border-gold bg-ki-600/30 p-5">
          <h2 className="text-xl font-bold text-gold">{selected.title}</h2>
          <p className="mt-3 leading-relaxed">{selected.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.tags.map((t) => (
              <span key={t} className="rounded-full border border-ki-200 px-2 py-0.5 text-xs text-ki-200">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {selected.links.map((l) => (
              <a key={l.url} href={l.url} className="text-gold underline" target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
