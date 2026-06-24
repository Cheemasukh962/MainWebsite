import { content } from '../data/content'

export function SkillsScreen() {
  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-sm text-ki-200">
          <span>Total Training Level</span>
          <span>{content.trainingLevel}%</span>
        </div>
        <div className="h-4 rounded-full border-2 border-gold bg-ki-900">
          <div
            className="h-full rounded-full bg-gold"
            style={{ width: `${content.trainingLevel}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {content.skills.map((s) => (
          <div
            key={s.name}
            className="relative flex flex-col items-center rounded-lg border-2 border-ki-400 bg-ki-600/30 p-4"
          >
            {s.level >= 100 && (
              <span className="absolute -top-2 right-2 rotate-6 rounded bg-red-600 px-2 text-xs font-bold">
                COMPLETE
              </span>
            )}
            <span className="text-2xl font-bold text-gold">{s.rank}</span>
            <span className="mt-2 text-center text-sm">{s.name}</span>
            <div className="mt-2 h-2 w-full rounded-full bg-ki-900">
              <div className="h-full rounded-full bg-ki-400" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
