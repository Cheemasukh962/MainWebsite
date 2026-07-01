import { useState } from 'react'
import { content } from '../data/content'
import { XenoBackdrop } from '../components/XenoBackdrop'
import { ContactPortraitCard } from '../components/ContactPortraitCard'
import { ContactRosterTile } from '../components/ContactRosterTile'

export function ContactScreen() {
  const [activeId, setActiveId] = useState<string>(content.contacts[0]?.id ?? '')
  const active =
    content.contacts.find((c) => c.id === activeId) ?? content.contacts[0]

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
            Contact
          </h1>
          <p
            className="text-sm font-semibold text-ki-50/95 tracking-wide"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
          >
            Select Fighter
          </p>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-8 py-6">
        <div className="w-full max-w-2xl">
          {active && <ContactPortraitCard contact={active} />}
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="rounded-xl border-2 border-gold/80 bg-ki-900/70 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between border-b border-gold/40 pb-2">
            <h3 className="text-xs font-black tracking-[0.3em] text-gold">ROSTER</h3>
            <span className="text-[10px] font-bold tracking-wider text-ki-200">
              {content.contacts.length} FIGHTERS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {content.contacts.map((c) => (
              <ContactRosterTile
                key={c.id}
                contact={c}
                selected={c.id === activeId}
                onSelect={() => setActiveId(c.id)}
                onHover={() => setActiveId(c.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </XenoBackdrop>
  )
}
