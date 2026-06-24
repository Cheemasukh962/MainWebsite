import { content } from '../data/content'

export function ContactScreen() {
  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {content.contacts.map((c) => (
          <a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-ki-400 bg-ki-600/30 text-center hover:border-gold hover:bg-ki-400/30"
          >
            <span className="text-sm font-bold">{c.label}</span>
          </a>
        ))}
      </div>
      {content.experience.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-gold">Experience</h2>
          <ul className="space-y-2">
            {content.experience.map((e) => (
              <li key={e.id} className="rounded border-l-4 border-gold bg-ki-600/20 px-4 py-2">
                <span className="font-bold">{e.role}</span> — {e.org}{' '}
                <span className="text-ki-200">({e.period})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
