import type { ContactLink } from '../data/types'
import { LinkedInIcon, GitHubIcon, MailIcon, TwitterIcon, DiscordIcon, GlobeIcon } from './icons'
import { playClick } from '../sound/click'

const ICONS = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  mail: MailIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
  globe: GlobeIcon,
} as const

interface Props {
  contact: ContactLink
  selected: boolean
  onSelect: () => void
  onHover?: () => void
}

export function ContactRosterTile({ contact, selected, onSelect, onHover }: Props) {
  const Icon = ICONS[contact.icon as keyof typeof ICONS] ?? GlobeIcon
  return (
    <button
      type="button"
      onClick={() => { playClick(); onSelect() }}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-label={contact.label}
      aria-current={selected ? 'true' : undefined}
      className={
        'flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition ' +
        (selected
          ? 'border-gold bg-gold/20 shadow-[0_0_20px_rgba(242,193,78,0.6)]'
          : 'border-ki-200/30 bg-ki-900/40 hover:border-gold/60 hover:bg-ki-600/30')
      }
    >
      <div className="h-12 w-12">
        <Icon className="h-full w-full" />
      </div>
      <span className="text-[10px] font-bold tracking-wide text-white">
        {contact.label}
      </span>
    </button>
  )
}
