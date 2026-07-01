import type { ContactLink } from '../data/types'
import { LinkedInIcon, GitHubIcon, MailIcon, TwitterIcon, DiscordIcon, GlobeIcon } from './icons'

const ICONS = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  mail: MailIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
  globe: GlobeIcon,
} as const

export function ContactPortraitCard({ contact }: { contact: ContactLink }) {
  const Icon = ICONS[contact.icon as keyof typeof ICONS] ?? GlobeIcon

  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-gold/80 bg-ki-900/85 p-8 shadow-2xl backdrop-blur-sm">
      <div
        key={contact.id}
        className="reveal relative flex flex-1 flex-col items-center justify-center gap-5 text-center"
      >
        <div
          aria-hidden="true"
          className="absolute h-56 w-56 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(159,208,255,0.35) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          className="xeno-anim relative flex h-40 w-40 items-center justify-center"
          style={{ animation: 'float 3.6s ease-in-out infinite' }}
        >
          <Icon className="h-full w-full drop-shadow-[0_0_24px_rgba(55,160,255,0.7)]" />
        </div>

        <div>
          <h2
            className="text-3xl font-black italic tracking-wider text-white"
            style={{ textShadow: '0 0 18px rgba(159,208,255,0.6)' }}
          >
            {contact.label}
          </h2>
          {contact.handle && (
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.3em] text-ki-200">
              {contact.handle}
            </p>
          )}
        </div>

        {contact.description && (
          <p className="max-w-md text-sm italic leading-relaxed text-white/85">
            {contact.description}
          </p>
        )}

        <a
          href={contact.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 rounded border-2 border-gold bg-black/30 px-6 py-2 text-sm font-black italic tracking-widest text-gold transition hover:bg-gold hover:text-ki-900"
          style={{ textShadow: '0 0 10px rgba(242,193,78,0.8)' }}
        >
          OPEN PROFILE ↗
        </a>
      </div>
    </div>
  )
}
