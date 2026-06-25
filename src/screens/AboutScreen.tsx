import { content } from '../data/content'
import { XenoBackdrop } from '../components/XenoBackdrop'
import { PlayerCard } from '../components/PlayerCard'
import type { InfoRow } from '../data/types'

function StatSection({ title, items }: { title: string; items: InfoRow[] }) {
  return (
    <section className="mt-5 first:mt-0">
      <h2 className="mb-3 flex items-center gap-2 border-b border-gold/40 pb-1 text-sm font-black tracking-[0.3em] text-gold">
        <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_10px_#f2c14e]" />
        {title.toUpperCase()}
      </h2>
      <dl className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="contents">
            <dt className="text-sm font-semibold text-ki-200">{item.label}</dt>
            <dd className="text-sm font-bold text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function AboutScreen() {
  const { name, role, bio, avatar, profile, loadout, card } = content.about
  return (
    <XenoBackdrop heightClass="h-full min-h-[calc(100vh-6rem)]">
      <header className="flex items-center gap-4 px-8 pt-6">
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
            About Me
          </h1>
          <p
            className="text-sm font-semibold text-ki-50/95 tracking-wide"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
          >
            Profile
          </p>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-6 md:flex-row md:items-center md:gap-12">
        <PlayerCard
          src={avatar}
          alt={name}
          name={name}
          level={card.level}
          stars={card.stars}
          tier={card.tier}
          badge={card.badge}
          seasonCode={card.seasonCode}
        />

        <div className="w-full max-w-xl">
          <div className="rounded-xl border-2 border-gold/80 bg-ki-900/85 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-4 border-b border-gold/30 pb-3">
              <p className="text-3xl font-black italic tracking-wide text-white">{name}</p>
              <p className="mt-0.5 text-sm font-bold uppercase tracking-wider text-ki-200">
                {role}
              </p>
              <p className="mt-3 text-sm italic leading-relaxed text-white/85">{bio}</p>
            </div>

            <StatSection title="Profile" items={profile} />
            <StatSection title="Loadout" items={loadout} />
          </div>
        </div>
      </div>
    </XenoBackdrop>
  )
}
